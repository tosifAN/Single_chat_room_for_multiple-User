import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css'; 

const socket = io('http://localhost:4000'); 

function App() {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [chatStarted, setChatStarted] = useState(false);

    useEffect(() => {
        socket.on('message', (message) => {
            console.log('Received message:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleMessageChange = (event) => {
        setCurrentMessage(event.target.value);
    };

    const sendMessage = () => {
        if (currentMessage.trim() !== '') {
            socket.emit('message', currentMessage);
            setCurrentMessage('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const startChat = () => {
        setChatStarted(true);
    };

    return (
        <div className="container">
            <h1>Chat App</h1>
            {chatStarted ? (
                <div>
                    <div className="message-container">
                        {messages.map((message, index) => (
                            <div key={index} className="message">{message}</div>
                        ))}
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            className="input-field"
                            value={currentMessage}
                            onChange={handleMessageChange}
                            onKeyPress={handleKeyPress}
                        />
                        <button className="send-button" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            ) : (
                <button className="start-chat-button" onClick={startChat}>Start chatting</button>
            )}
        </div>
    );
}

export default App;
