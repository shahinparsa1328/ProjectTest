import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@/shared/AppIcons'; // Changed import
import { toPersianDigits } from '@/utils'; // Changed import

interface CollapsibleSectionProps {
  title: string;
  children?: React.ReactNode;
  isOpen: boolean; 
  onToggle: () => void; 
  className?: string;
  icon?: React.ReactElement<{ className?: string }>;
  titleClassName?: string; 
  titleColorClass?: string; 
  titleSizeClass?: string;  
  contentClassName?: string;
  id?: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  isOpen, 
  onToggle, 
  className = "", 
  icon, 
  titleClassName: customFullTitleClassName, 
  titleColorClass,                     
  titleSizeClass,                      
  contentClassName = "text-sm text-gray-600 pt-2", 
  id 
}) => {
  const contentId = id || `collapsible-content-${title.replace(/\s+/g, '-').toLowerCase()}`;

  let effectiveTitleClasses = "text-md font-semibold text-gray-700"; 

  if (customFullTitleClassName) { 
    effectiveTitleClasses = customFullTitleClassName;
  } else { 
    const size = titleSizeClass || "text-md font-semibold"; 
    const color = titleColorClass || "text-gray-700";      
    effectiveTitleClasses = `${size} ${color}`;
  }

  return (
    <div className={`py-1 ${className}`} id={id}>
      <button
        onClick={onToggle} 
        className={`w-full flex justify-between items-center text-right py-2 ${effectiveTitleClasses} hover:opacity-80 transition-opacity`}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="flex items-center">
          {icon && React.isValidElement(icon) && React.cloneElement(
            icon, 
            { className: `w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 opacity-90` }
          )}
          {toPersianDigits(title)}
        </span>
        {isOpen ? <ChevronUpIcon className="w-5 h-5 flex-shrink-0" /> : <ChevronDownIcon className="w-5 h-5 flex-shrink-0" />}
      </button>
      {isOpen && (
        <div id={contentId} className={`mt-1 ${contentClassName} overflow-hidden animate-fadeIn`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;