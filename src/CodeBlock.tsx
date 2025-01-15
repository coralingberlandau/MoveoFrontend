import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './codeblock.css';
import CodeInput from './CodeInput.tsx';

const CodeBlock: React.FC = () => {

  const { title } = useParams<{ title: string }>();
  const [code, setCode] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [studentsCount, setStudentsCount] = useState<number>(0);
  const [isMentor, setIsMentor] = useState<boolean>(false);
  const [isMentorInRoom, setIsMentorInRoom] = useState<boolean>(false);
  const navigate = useNavigate();
  const [solutionText, setsolutionText] = useState('');
  const [studentMessage, setStudentMessage] = useState('');
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://moveobackend.onrender.com/ws/${title?.replace(/\s+/g, "")}/`);
    socketRef.current = ws;
    ws.addEventListener("open", () => {
      console.log("WebSocket connection established.");
    });

    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'code_update') {
        console.log('Code updated:', data.code);
        setCode(data.code);
      }

      if (data.type === "redirect") {
        navigate("/");
      }

      if (data.type === 'is_mentor') {
        setIsMentor(true)
      }

      if (data.message) {
        const count = parseInt(data.message.split(":")[1].trim());
        setStudentsCount(count);
      }
    });

    ws.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });

    ws.addEventListener("close", () => {
      console.log("WebSocket connection closed.");
    });

    return () => {
      ws.close();
    };

  }, [title]);

  useEffect(() => {
    if (studentsCount === 1) {
      setIsMentorInRoom(true);
      setStudentMessage("No students are in the room");
    }
    if (studentsCount >= 2) {
      setIsMentorInRoom(true);
      setStudentMessage(`${studentsCount - 1} students are in the room`);
    } else {
      setStudentMessage("No students are in the room");
    }
  }, [studentsCount]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://moveobackend.onrender.com/codeblocks/title/${title}/`);
      const data = response.data;
      setSolution(data.solution);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [title]);

  const handleCodeChange = (newCode) => {
    const ws = socketRef.current;
    if (ws) {
      ws.send(JSON.stringify({
        type: 'code_update',
        code: newCode
      }));
    }
  };

  const checkSolution = () => {
    if (code === solution) {
      setsolutionText('😊 You solved it! ✅ ');
    } else {
      setsolutionText('❌ Incorrect solution');
    }
  };

  const onBack = () => {
    navigate("/");
  };

  return (
    <div className="editor-container">
      <h1 className="h1">{title}</h1>
      <CodeInput code={code} setCode={setCode} handleOnChange={handleCodeChange} isMentor={isMentor} />
      <div
        className={`solution_text ${solutionText ? 'visible' : ''} ${solutionText.includes('😊') ? 'correct' : solutionText.includes('❌') ? 'incorrect' : ''
          }`}>
        {solutionText}
      </div>
      <div className="button-container">
        <button onClick={checkSolution}>Check Solution</button>
        <button className="button-back" onClick={onBack}>Back</button>
      </div>
      <div className="students-count">
        <p>{studentMessage}</p>
        <p>{isMentorInRoom ? "Mentor is present" : "No mentor yet"}</p>
      </div>
    </div>
  );
};

export default CodeBlock;
