import React from 'react'
import Home from './Home.tsx'
import AddNewCodeblock from './AddNewCodeblock.tsx'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';  
import CodeBlock from './CodeBlock.tsx';


const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addblock" element={<AddNewCodeblock/>} />
        <Route path="/codeblock/:title" element={<CodeBlock />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App

