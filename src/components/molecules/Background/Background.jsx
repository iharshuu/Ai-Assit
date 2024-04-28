import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaUser } from 'react-icons/fa'; // Import React icons for bot and user

import './styles.css'; // Make sure to import the CSS
import Navbar from '../../organisms/Navbar';

const ChatApp = () => {
  const [messages, setMessages] = useState([{ text: "Hi there! What can I help you with today?", sender: "bot" }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = synth.getVoices().find(voice => voice.lang === "en-US") || synth.getVoices()[0];
    synth.speak(utterance);
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === "user") {
      setIsLoading(true);
      setTimeout(() => {
        setMessages([...messages, { text: "typing...", sender: "bot", typing: true }]);
        setTimeout(() => {
          const responseMessage = { text: "Ok, we received your message! ", sender: "bot", typing: false };
          setMessages(prev => prev.map(msg => (msg.typing ? responseMessage : msg)));
          setIsLoading(false);
        }, 2000);
      }, 1000);
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput('');
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[70vw]">
        <div className="overflow-y-auto no-scrollbar h-96 mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === "bot" ? "justify-start" : "justify-end"} mb-2`}>
             <div className={` flex flex-wrap items-center p-3 ${message.sender === "bot" ? "bg-blue-500 text-white rounded-lg" : "bg-gray-200 text-gray-700 rounded-[19px] rounded-tl-[19px] rounded-tr-[0px] rounded-bl-[19px]"} max-w-sm relative`}>
  {message.typing ? (
    <div className="typing-animation" style={{ width: '100%' }}></div>
  ) : (
    <div>
       {message.sender === "bot" ? (
        <div className='flex flex-row items-center'>
        <FaRobot className="w-6 h-6 mr-2 " />
        <span className='text-lg font-bold text-black'>
        Example
        </span>
        </div>
      ) : (
        <div className='flex flex-row items-center'>
        <FaUser className="w-6 h-6 mr-2 " />
        <span className='text-lg font-bold text-black'>
        User
        </span>
        </div>
      )}
    <div className='flex flex-row items-center p-2 '>
     
      <span className='overflow-x-auto no-scrollbar max-w-sm flex text-left '>{message.text}</span>
      {message.sender === "bot" && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => speak(message.text)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h2m2 0h10m2 0h2M4 6h16M4 18h16"></path>
          </svg>
        </button>
      )}
    </div>
    </div>
  )}
</div>

            </div>
          ))}
        </div>
        <form className="flex" onSubmit={sendMessage}>
          {isLoading ? (
            <button
              type="submit"
              className="bg-blue-500 flex mx-auto hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg cursor-not-allowed opacity-50"
              disabled={true}
            >
              Generating Result...
            </button>
          ) : (
            <>
              <input
                className="border rounded-l-lg p-3 flex-1 focus:outline-none bg-gray-100"
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white ml-4 font-bold py-3 px-6 rounded-lg"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M7.60304 14.4388L13.9405 14.43M11.6869 5.56489L21.6924 10.5677C26.1826 12.8127 26.1737 16.4809 21.6924 18.7348L11.6869 23.7375C4.96053 27.1051 2.20281 24.3474 5.57041 17.6211L7.05533 14.6512L5.57041 11.6814C2.20281 4.95501 4.95169 2.20614 11.6869 5.56489Z" stroke="white" strokeWidth="2.10714" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
