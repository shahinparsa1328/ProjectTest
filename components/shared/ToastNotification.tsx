import React, { useEffect, useState } from 'react';
import { toPersianDigits } from '../../utils';
import { CheckCircleIcon, XCircleIcon, LightbulbIcon } from './AppIcons'; // Assuming LightbulbIcon for info

interface ToastNotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message, type, isVisible, onClose }) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    if (isVisible) {
      const timer = setTimeout(() => {
        setShow(false);
        // Wait for fade-out animation before calling onClose to ensure smooth transition
        setTimeout(onClose, 300); // Matches the transition duration
      }, 2800); // Duration slightly less than CSS animation for smooth exit
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const typeStyles = {
    success: {
      bg: 'bg-green-500/90 backdrop-blur-sm border-green-600',
      icon: <CheckCircleIcon className="w-5 h-5 text-white" />,
      text: 'text-white',
    },
    error: {
      bg: 'bg-red-500/90 backdrop-blur-sm border-red-600',
      icon: <XCircleIcon className="w-5 h-5 text-white" />,
      text: 'text-white',
    },
    info: {
      bg: 'bg-sky-500/90 backdrop-blur-sm border-sky-600',
      icon: <LightbulbIcon className="w-5 h-5 text-white" />,
      text: 'text-white',
    },
  };

  const styles = typeStyles[type];

  return (
    <div
      dir="rtl"
      className={`fixed bottom-[var(--toast-bottom-spacing,80px)] left-1/2 -translate-x-1/2 
                  py-2.5 px-4 rounded-lg shadow-2xl border
                  flex items-center space-x-3 space-x-reverse z-[1100]
                  transition-all duration-300 ease-in-out
                  ${styles.bg} ${styles.text}
                  ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95 pointer-events-none'}`}
      role="alert"
      aria-live="assertive"
    >
      {styles.icon}
      <p className="text-sm font-medium">{toPersianDigits(message)}</p>
      <button 
        onClick={() => { setShow(false); setTimeout(onClose, 300);}} // Immediate visual feedback + delayed actual close
        className={`ml-auto -mr-1 rtl:-ml-1 rtl:mr-auto p-1 rounded-full hover:bg-black/20 transition-colors ${styles.text}`} 
        aria-label={toPersianDigits("بستن اعلان")}
      >
        <XCircleIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ToastNotification;