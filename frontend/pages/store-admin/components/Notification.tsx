import React, { useEffect } from 'react';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
}

const typeClasses = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-blue-600',
};

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 z-50 p-4 rounded-lg text-white shadow-lg flex items-center ${typeClasses[type]}`}>
      <span className="flex-grow">{message}</span>
      <button onClick={onClose} className="ml-4 font-bold text-xl">&times;</button>
    </div>
  );
};

export default Notification;
