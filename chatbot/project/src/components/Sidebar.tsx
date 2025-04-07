import React from 'react';
import { Message } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X, Square } from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  messages: Message[];
  onDeleteChat: (id: string) => void;
  onClearAll: () => void;
  onNewChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  messages,
  onDeleteChat,
  onClearAll,
  onNewChat
}) => {
  // Group messages by chat session
  const chatSessions = messages.reduce<{ [key: string]: Message[] }>((sessions, message) => {
    const sessionId = message.sessionId || 'default';
    if (!sessions[sessionId]) {
      sessions[sessionId] = [];
    }
    sessions[sessionId].push(message);
    return sessions;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="h-screen border-r border-dark-600 bg-dark-800/50 backdrop-blur-sm overflow-hidden"
        >
          <div className="p-4 border-b border-dark-600 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-200">Chat History</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={onClearAll}
                className="p-2 hover:bg-dark-600 rounded-lg transition-colors text-gray-400 hover:text-red-400"
              >
                <Trash2 size={18} />
              </button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onNewChat}
                className="p-2 hover:bg-dark-600 rounded-lg transition-all duration-300 group"
              >
                <Square className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
              </motion.button>
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-64px)] custom-scrollbar">
            {Object.entries(chatSessions).map(([sessionId, msgs]) => (
              <div key={sessionId} className="p-4">
                <div className="text-sm text-gray-400 mb-2">
                  {new Date(msgs[0].timestamp).toLocaleDateString()}
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="group relative p-3 hover:bg-dark-700 rounded-lg transition-colors cursor-pointer mb-2"
                >
                  <div className="text-sm text-gray-300 truncate">
                    {msgs[0].content}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {msgs.length} messages
                  </div>
                  <button
                    onClick={() => onDeleteChat(sessionId)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 hover:bg-dark-600 rounded transition-all text-gray-400 hover:text-red-400"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};