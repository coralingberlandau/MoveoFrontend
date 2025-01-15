import React, { useState } from 'react';
import axios from 'axios';
import './addnewcodeblock.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import CodeInput from './CodeInput.tsx';


const AddNewCodeblock: React.FC = () => {
    const [title, setTitle] = useState('');
    const [solution, setSolution] = useState('');
    const [code, setCode] = useState<string>("");
    const navigate = useNavigate();

    const handleBackToHome = () => {
        window.location.href = '/';
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleAddClick = async () => {
        if (!title || !code) {
            toast.error('Please provide both a title and a solution.', { autoClose: 1000 });
            return;
        }
        try {
            const response = await axios.post('https://moveobackend.onrender.com/codeblocks/', {
                title: title,
                solution: code,
            });

            if (response.status === 201) {
                toast.success('Codeblock added successfully!', { autoClose: 1000 });
                navigate('/');
            }
        } catch (error) {
            console.error('Error adding new codeblock:', error);
            toast.error('Failed to add new codeblock.', { autoClose: 1000 });
        }
    };

    return (
        <div className="add-codeblock-container">
            <h2>Add New Codeblock</h2>
            <div>
                <label><strong>Title:</strong></label>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter title" />
            </div>
            <div>
                <label><strong>Solution:</strong></label>
                <CodeInput code={code} setCode={setCode} />
            </div>
            <button className="add-codeblock-button" onClick={handleAddClick}>Add Codeblock</button>
            <button className="back-to-home-button" onClick={handleBackToHome}>Back</button>
        </div>
    );
};

export default AddNewCodeblock;
