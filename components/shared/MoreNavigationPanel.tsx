
import React from 'react';
import { PageName } from '../../App';
import { toPersianDigits } from '../../utils';
import { 
  RepeatIcon, HeartIcon, BookIcon, WalletIcon, RocketLaunchIcon, 
  SmartHomeIcon, FamilyIcon, CommunityIcon, PersonalizationIcon, 
  PrivacyIcon, InfrastructureIcon, XMarkIcon, ReportsIcon
} from './AppIcons';

interface MoreNavigationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  navigateTo: (page: PageName) => void;
  currentPage: PageName;
}

interface MoreNavItem {
  name: PageName;
  label: string;
  icon: React.ReactElement;
}

const MoreNavigationPanel: React.FC<MoreNavigationPanelProps> = ({ isOpen, onClose, navigateTo, currentPage }) => {
  if (!isOpen) return null;

  const navItems: MoreNavItem[] = [
    { name: 'Habits', label: 'عادات', icon: <RepeatIcon className="w-5 h-5" /> },
    { name: 'Health', label: 'سلامت', icon: <HeartIcon className="w-5 h-5" /> },
    { name: 'Learning', label: 'یادگیری', icon: <BookIcon className="w-5 h-5" /> },
    { name: 'Finance', label: 'مالی', icon: <WalletIcon className="w-5 h-5" /> },
    { name: 'LifeProjects', label: 'پروژه‌های زندگی', icon: <RocketLaunchIcon className="w-5 h-5" /> }, 
    { name: 'SmartHome', label: 'خانه هوشمند', icon: <SmartHomeIcon className="w-5 h-5" /> },
    { name: 'Family', label: 'خانواده', icon: <FamilyIcon className="w-5 h-5" /> },
    { name: 'Community', label: 'انجمن', icon: <CommunityIcon className="w-5 h-5" /> },
    { name: 'Reports', label: 'گزارش‌ها', icon: <ReportsIcon className="w-5 h-5" /> },
    { name: 'Personalization', label: 'شخصی‌سازی', icon: <PersonalizationIcon className="w-5 h-5" /> },
    { name: 'Privacy', label: 'حریم خصوصی', icon: <PrivacyIcon className="w-5 h-5" /> },
    { name: 'Infrastructure', label: 'زیرساخت', icon: <InfrastructureIcon className="w-5 h-5" /> },
  ]; 

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] flex items-end justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="more-navigation-title"
    >
      <div
        className="bg-white w-full max-w-md rounded-t-2xl shadow-xl p-4 transform transition-transform duration-300 ease-out"
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 id="more-navigation-title" className="text-lg font-semibold text-gray-700">{toPersianDigits("بخش‌های بیشتر")}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <ul className="space-y-1 max-h-[60vh] overflow-y-auto">
          {navItems.map(item => (
            <li key={item.name}>
              <button
                onClick={() => navigateTo(item.name)}
                className={`w-full flex items-center p-3 rounded-lg text-sm transition-colors
                            ${currentPage === item.name 
                              ? 'bg-indigo-100 text-indigo-700 font-medium' 
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                            }`}
              >
                <span className="mr-3 rtl:ml-3 rtl:mr-0 text-indigo-500">{item.icon}</span>
                {toPersianDigits(item.label)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoreNavigationPanel;
