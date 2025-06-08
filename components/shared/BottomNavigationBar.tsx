
import React from 'react';
import { PageName } from '../../App'; 
import { toPersianDigits } from '../../utils';
import { 
  HomeIcon, TargetIcon, ListIcon, GlobeAltIcon, 
  Squares2X2Icon 
} from './AppIcons';

interface NavItemProps {
  label: string;
  icon: React.ReactElement<{ className?: string }>;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`nav-item ${isActive ? 'active' : ''}`}
    aria-label={label}
    aria-current={isActive ? "page" : undefined}
  >
    {React.cloneElement(icon, { className: "w-[22px] h-[22px]" })}
    <span>{toPersianDigits(label)}</span>
  </button>
);

interface BottomNavigationBarProps {
  currentPage: PageName;
  navigateTo: (page: PageName) => void;
  onMoreClick: () => void; 
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({ currentPage, navigateTo, onMoreClick }) => {
  const primaryNavItems: { name: PageName; label: string; icon: React.ReactElement }[] = [
    { name: 'Dashboard', label: 'داشبورد', icon: <HomeIcon /> },
    { name: 'Goals', label: 'اهداف', icon: <TargetIcon /> },
    { name: 'Tasks', label: 'وظایف', icon: <ListIcon /> },
    { name: 'Travel', label: 'سفر و فراغت', icon: <GlobeAltIcon /> }, 
  ];
  
  const moreMenuPages: PageName[] = [
    'Habits', 'Health', 'Learning', 'Finance', 
    'LifeProjects', // Added LifeProjects here
    'SmartHome', 'Family', 'Community', 'Personalization', 'Privacy', 'Infrastructure', 'Reports'
  ];

  return (
    <nav className="app-footer-nav fixed bottom-0 inset-x-0 bg-white border-t border-gray-200/80 shadow-top-md z-50 print:hidden">
      <div className="flex items-center justify-around h-[68px] max-w-md mx-auto px-0.5">
        {primaryNavItems.map((item) => (
          <NavItem
            key={item.name}
            label={item.label}
            icon={item.icon}
            isActive={currentPage === item.name}
            onClick={() => navigateTo(item.name)}
          />
        ))}
        <NavItem
            label="بیشتر"
            icon={<Squares2X2Icon />}
            isActive={moreMenuPages.includes(currentPage)} 
            onClick={onMoreClick}
        />
      </div>
    </nav>
  );
};

export default BottomNavigationBar;