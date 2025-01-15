import React, { useCallback } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

interface CodeInputProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  handleOnChange?: (e) => void
  isMentor?: boolean
}

const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, handleOnChange, isMentor }) => {
  const colorMode = 'dark';
  const editorHeight = '60vh'; 
  const editorWidth = '100%';  

  const onChange = useCallback((value) => {    
    setCode(value);
    handleOnChange && handleOnChange(value)
  }, []);
  
  return (
    <div>
      <div>
        <ReactCodeMirror
          value={code}
          theme={colorMode}
          height={editorHeight}
          width={editorWidth}
          extensions={[javascript()]}
          onChange={onChange}
          readOnly={isMentor || false}
        />
      </div>
    </div>
  );
};

export default CodeInput;
