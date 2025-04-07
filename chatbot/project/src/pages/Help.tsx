import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const Help: React.FC = () => {
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
              <HelpCircle size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold">Help Center</h1>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
              <p className="text-gray-300 leading-relaxed">
                Welcome to the AI Analysis Assistant! This guide will help you understand how to use our platform effectively.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">FAQ</h2>
              <div className="space-y-4">
                <div className="border border-dark-600 rounded-xl p-4">
                  <h3 className="font-medium mb-2">How do I upload files?</h3>
                  <p className="text-sm text-gray-400">
                    Click the upload icon in the chat input or drag and drop your files directly into the chat area.
                  </p>
                </div>
                <div className="border border-dark-600 rounded-xl p-4">
                  <h3 className="font-medium mb-2">What file types are supported?</h3>
                  <p className="text-sm text-gray-400">
                    We support CSV files for data analysis, as well as various document formats including PDF, DOC, and TXT.
                  </p>
                </div>
                <div className="border border-dark-600 rounded-xl p-4">
                  <h3 className="font-medium mb-2">How can I export my analysis?</h3>
                  <p className="text-sm text-gray-400">
                    Look for the export button in the data visualization panel after analyzing your data.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
              <p className="text-gray-300 mb-4">
                Need more help? Our support team is available 24/7.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg"
              >
                Contact Support
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};