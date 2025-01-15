import React, { useEffect, useState } from 'react';
import Card from './Card.tsx';
import './home.css';
import axios from "axios";

const Home: React.FC = () => {
    const [codeBlocks, setCodeBlocks] = useState<{ title: string }[]>([]);

    useEffect(() => {
        const fetchCodeBlocks = async () => {
            try {
                const response = await axios.get("https://moveobackend.onrender.com/codeblocks/");
                const codeblocks = response.data;
                setCodeBlocks(codeblocks);
            } catch (error) {
                console.error("Error fetching codeblocks:", error);
            }
        };
        fetchCodeBlocks();
    }, []);

    return (

        <div className="scrollable-content">
            <div className="home-page">
                <h2 className="proud-heading">Learn JavaScript with Fun</h2>
                <h1> Choose code block</h1>
                <div className="cards-container">
                    {codeBlocks.map((block, index) => (
                        <Card
                            key={index}
                            title={block.title} />
                    ))}
                    <Card title="+" />
                </div>
            </div>
        </div>
    );
};

export default Home;
