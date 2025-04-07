import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Message, FileAnalysis } from './types';
import { ChatMessage } from './components/ChatMessage';
import { FileUpload } from './components/FileUpload';
import { DataVisualizer } from './components/DataVisualizer';
import { Send, Bot, Terminal, BarChart3, Menu, ChevronRight, ChevronLeft, Trash2, UserCircle, Settings, LogOut, HelpCircle, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Papa from 'papaparse';
import { ProfileDropdown } from './components/ProfileDropdown';
import { Sidebar } from './components/Sidebar';
import { Profile } from './pages/Profile';
import { Password } from './pages/Password';
import { ApiDocs } from './pages/ApiDocs';
import { Help } from './pages/Help';

function MainChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [fileAnalysis, setFileAnalysis] = useState<FileAnalysis | null>(null);
  const [showVisualizer, setShowVisualizer] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentSessionId, setCurrentSessionId] = useState<string>(Date.now().toString());

  const handleFileUpload = useCallback(async (files: File[]) => {
    const file = files[0];
    
    if (file.type === 'text/csv') {
      Papa.parse(file, {
        complete: (results) => {
          const data = results.data as string[][];
          setFileAnalysis({
            fileName: file.name,
            type: file.type,
            size: file.size,
            data: data,
            summary: `CSV file with ${data.length} rows and ${data[0]?.length || 0} columns`
          });

          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            content: `I've analyzed your CSV file "${file.name}". It contains ${data.length} rows of data. How would you like to analyze this data?`,
            role: 'assistant',
            timestamp: new Date(),
            sessionId: currentSessionId
          }]);
        }
      });
    } else {
      setFileAnalysis({
        fileName: file.name,
        type: file.type,
        size: file.size,
        summary: `File uploaded: ${file.name}`
      });

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: `I see you've uploaded ${file.name}. What would you like to know about this file?`,
        role: 'assistant',
        timestamp: new Date(),
        sessionId: currentSessionId
      }]);
    }
  }, [currentSessionId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
      sessionId: currentSessionId
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm analyzing your request. How can I help you with the data?",
        role: 'assistant',
        timestamp: new Date(),
        sessionId: currentSessionId
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleEditMessage = (id: string, newContent: string) => {
    setMessages(prev =>
      prev.map(message =>
        message.id === id ? { ...message, content: newContent } : message
      )
    );
  };

  const clearAllChats = () => {
    setMessages([]);
    setFileAnalysis(null);
  };

  const deleteChat = (sessionId: string) => {
    setMessages(prev => prev.filter(message => message.sessionId !== sessionId));
  };

  const startNewChat = () => {
    setCurrentSessionId(Date.now().toString());
    setInput('');
    setFileAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 relative overflow-hidden flex">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        messages={messages}
        onDeleteChat={deleteChat}
        onClearAll={clearAllChats}
        onNewChat={startNewChat}
      />

      <div className="flex-1 flex flex-col min-h-screen relative">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-6 border-b border-dark-600 bg-dark-900/50 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
              >
                {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Terminal size={24} className="text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI Analysis Assistant
                </h1>
                <p className="text-sm text-gray-400">Powered by Advanced Analytics</p>
              </div>
            </div>

            <ProfileDropdown />
          </motion.div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          <AnimatePresence initial={false}>
            {messages
              .filter(message => message.sessionId === currentSessionId)
              .map(message => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onEdit={handleEditMessage}
                />
              ))}
          </AnimatePresence>
        </div>

        <div className="p-6 bg-dark-900/50 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <FileUpload onFileUpload={handleFileUpload} />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message AI Analysis Assistant..."
                className="w-full bg-dark-800 rounded-2xl pl-14 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-100 placeholder-gray-400 shadow-lg transition-shadow duration-300 group-hover:shadow-blue-500/10"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="p-2 hover:bg-dark-600 rounded-lg transition-all duration-300 group"
                >
                  <Send className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                </motion.button>
              </div>
            </form>
          </div>
        </div>

        <AnimatePresence>
          {fileAnalysis?.data && showVisualizer && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="fixed right-6 top-24 w-96"
            >
              <div className="bg-dark-800 rounded-2xl p-4 shadow-xl border border-dark-600">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={20} className="text-blue-400" />
                    <h3 className="font-medium">Data Visualization</h3>
                  </div>
                  <button
                    onClick={() => setShowVisualizer(false)}
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    ×
                  </button>
                </div>
                <DataVisualizer
                  data={{
                    labels: ['Sample 1', 'Sample 2', 'Sample 3'],
                    datasets: [{
                      label: 'Data Points',
                      data: [10, 20, 15]
                    }]
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainChat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/password" element={<Password />} />
        <Route path="/api" element={<ApiDocs />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;