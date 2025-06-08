
import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, TargetIcon, ListIcon, RepeatIcon } from './AppIcons'; 
import { toPersianDigits } from '../../utils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface FloatingActionButtonProps {
  onAddGoalClick?: () => void;
  onAddTaskClick?: () => void; 
  onAddHabitClick?: () => void;
  // Removed QuickNote and AIChat from FAB as per new checklist
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  onAddGoalClick, 
  onAddTaskClick, 
  onAddHabitClick,
 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const fabActions = [
    // Order based on commonality or checklist if specified, for now: Task, Goal, Habit
    { id: 'task', label: toPersianDigits('وظیفه جدید'), icon: <ListIcon className="w-5 h-5"/>, action: onAddTaskClick || (() => console.warn('Add Task Action (No handler)')) },
    { id: 'goal', label: toPersianDigits('هدف جدید'), icon: <TargetIcon className="w-5 h-5"/>, action: onAddGoalClick || (() => console.warn('Add Goal Action (No handler)')) },
    { id: 'habit', label: toPersianDigits('عادت جدید'), icon: <RepeatIcon className="w-5 h-5"/>, action: onAddHabitClick || (() => console.warn('Add Habit Action (No handler)')) },
  ];
  
  const nodeRefs = useRef(fabActions.map(() => React.createRef<HTMLDivElement>()));

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const fabContainer = document.querySelector('.fab-container');
      if (fabContainer && !fabContainer.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fab-container print:hidden"> 
      <TransitionGroup component={null}>
        {isOpen &&
          fabActions.map((item, index) => (
            <CSSTransition
              key={item.id}
              nodeRef={nodeRefs.current[index]}
              timeout={250} // Matches CSS transition duration
              classNames={{
                enter: 'fab-options-enter',
                enterActive: 'fab-options-active',
                exit: 'fab-options-exit',
                exitActive: 'fab-options-exit-active'
              }}
              unmountOnExit
            >
              <div 
                ref={nodeRefs.current[index]}
                className="fab-option-item" 
                style={{ transitionDelay: `${index * 30}ms` }} // Stagger options from bottom up
                onClick={() => { item.action(); setIsOpen(false); }}
              >
                <span className="ml-2 rtl:mr-2 rtl:ml-0">{item.label}</span> 
                {React.cloneElement(item.icon, { className: "w-5 h-5"})}
              </div>
            </CSSTransition>
          ))}
      </TransitionGroup>
      <button
        onClick={toggleMenu}
        className={`fab-button ${isOpen ? 'bg-red-500 hover:bg-red-600 rotate-45' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        aria-expanded={isOpen}
        aria-label={isOpen ? toPersianDigits("بستن منو") : toPersianDigits("افزودن سریع")}
      >
        {/* Main FAB icon is Plus (+) as per checklist section 2 */}
        <PlusIcon className={`w-7 h-7 transition-transform duration-300`} /> 
      </button>
    </div>
  );
};

// Ensure FAB option transitions are defined in global CSS or here if not already.
// The global CSS in index.html already has these.

export default FloatingActionButton;
