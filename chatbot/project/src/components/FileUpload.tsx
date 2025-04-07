import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileUpload(acceptedFiles);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    noClick: false,
    noKeyboard: true
  });

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative"
    >
      <div
        {...getRootProps()}
        className="cursor-pointer p-2 hover:bg-dark-600 rounded-lg transition-all duration-300 group"
      >
        <input {...getInputProps()} />
        <Upload className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
      </div>
      {isDragActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-dark-600 text-sm text-gray-200 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm border border-dark-500"
        >
          Drop files here
        </motion.div>
      )}
    </motion.div>
  );
};