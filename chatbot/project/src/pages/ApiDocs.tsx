import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export const ApiDocs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 p-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Chat
      </motion.button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-dark-800 rounded-2xl p-8 shadow-xl border border-dark-600">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Code size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold">API Documentation</h1>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Authentication</h2>
              <div className="bg-dark-700 rounded-xl p-4">
                <pre className="text-sm text-gray-300">
                  <code>{`
const response = await fetch('https://api.example.com/chat', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});`}
                </code>
                </pre>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Endpoints</h2>
              <div className="space-y-4">
                <div className="border border-dark-600 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-400">POST</span>
                    <span className="text-gray-300">/api/chat</span>
                  </div>
                  <p className="text-sm text-gray-400">Send a message to the AI assistant</p>
                </div>
                <div className="border border-dark-600 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-400">GET</span>
                    <span className="text-gray-300">/api/history</span>
                  </div>
                  <p className="text-sm text-gray-400">Retrieve chat history</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};