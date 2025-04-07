import React, { useState } from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: Message;
  onEdit?: (id: string, content: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const isBot = message.role === 'assistant';

  const handleSave = () => {
    if (onEdit) {
      onEdit(message.id, editedContent);
    }
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex gap-4 px-6 py-4 max-w-4xl mx-auto group"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="p-2 hover:bg-dark-700 rounded-lg transition-all duration-300 group"
      >
        {isBot ? (
          <Bot className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
        ) : (
          <User className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
        )}
      </motion.div>
      <div className="flex-1">
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="flex-1 bg-dark-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-100 leading-relaxed"
          >
            {message.content}
          </motion.p>
        )}
      </div>
      {!isBot && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100 p-2 hover:bg-dark-700 rounded-lg transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        </button>
      )}
    </motion.div>
  );
}