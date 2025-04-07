import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle, Settings, LogOut, HelpCircle, Key } from 'lucide-react';

export const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: UserCircle, label: 'View Profile', path: '/profile' },
    { icon: Key, label: 'Update Password', path: '/password' },
    { icon: Settings, label: 'API', path: '/api' },
    { icon: HelpCircle, label: 'Help Center', path: '/help' },
    { icon: LogOut, label: 'Logout', action: () => console.log('Logout') },
  ];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-dark-700 rounded-lg transition-colors flex items-center gap-2"
      >
        <UserCircle size={24} className="text-gray-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="absolute right-0 mt-2 w-64 p-2 bg-dark-800 rounded-xl shadow-xl border border-dark-600 z-40"
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="w-full flex items-center gap-3 p-3 text-left text-gray-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    if (item.path) {
                      navigate(item.path);
                    } else if (item.action) {
                      item.action();
                    }
                  }}
                >
                  <item.icon size={18} />
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};