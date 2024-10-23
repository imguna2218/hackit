import React, { useEffect, useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { ShieldCheck } from "lucide-react";
import ChatInterface from './History';
import { useRecoilValue } from 'recoil';
import chatAtom from '../atoms/chatAtom'

// Header Component
const Header = () => (
  <header className="p-4 text-center">
    <h1
      className="text-xl sm:text-2xl md:text-3xl font-bold text-green-500"
      style={{ textShadow: '0 4px 6px rgba(16, 185, 129, 0.75)' }}
    >
      TrueSecure AI Assistant
    </h1>
  </header>
);

// Chat Area Component
const ChatArea = ({ data }) => (
  <main className="flex-grow overflow-auto p-6">
    <div className="flex flex-col items-center justify-center h-full">
      {/* <ShieldCheck className="w-20 h-20 sm:w-32 sm:h-32 text-green-500 opacity-70a mb-4" />
      <p className="text-lg sm:text-xl text-center text-gray-400">
        Welcome to TrueSecure AI Assistant.
      </p>
      <p>How can I help you with your cybersecurity needs today?</p> */}
      <ChatInterface data={data} />
    </div>
  </main>
);

// Input Area Component with Fixed Height Textarea and Paperclip for File Upload
const InputArea = ({ inputValue, handleInputChange, handleSubmit, handleFileUpload }) => {
  return (
    <footer className="p-4 border-t border-gray-700">
      <form onSubmit={handleSubmit} className="flex items-center max-w-3xl mx-auto w-full">
        <button
          type="button"
          className="p-3 bg-gray-800 text-white rounded-l-md hover:bg-gray-700 transition-colors"
        >
          <label htmlFor="file-upload" className="cursor-pointer">
            <Paperclip className="w-5 h-5 md:w-6 md:h-6" />
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
        </button>

        <textarea
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Send a message..."
          className="flex-grow p-3 bg-gray-800  text-white border-0 text-sm md:text-base transition-all resize-none overflow-hidden"
          rows="2"
          style={{ height: '50px' }}
        />
        <button
          type="submit"
          className="bg-green-500 text-black p-3 rounded-r-md hover:bg-green-600 transition-colors"
        >
          <Send className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </form>
    </footer>
  );
};

// Background Animation Component
const BackgroundAnimation = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black"></div>
    <div className="absolute inset-0 bg-black/50"></div>
  </div>
);

// Main CyberChat Component
export default function CyberChat() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const [data, setData] = useState();
  useEffect(() => {
    window.scroll(0, 0);
    const fetchData = async () => {
      try {
        const response = await fetch('/api/chat/history');
        const jsonData = await response.json();
        console.log("jsonData", jsonData)
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted:', inputValue);
    try {
      const res = await fetch('/api/chat/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputValue }),
      });
      const data = await res.json();

      if (data.error) {
        alert(data.error);
        console.log(data.error);
        return;
      }
      console.log("erg", data)
      setData(data);
      console.log('AI response:', data);
    } catch (error) {
      alert(error.message);
      console.log(error);
    } finally {
      setInputValue('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log('Uploaded file:', file);
  };



  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Header />
      <ChatArea data={data} />
      <InputArea
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleFileUpload={handleFileUpload}  // File upload handler
      />
      <BackgroundAnimation />
    </div>
  );
}


