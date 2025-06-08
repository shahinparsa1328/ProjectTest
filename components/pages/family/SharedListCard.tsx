import React, { useState } from 'react';
import { toPersianDigits } from '../../../utils';
import { SharedList, SharedListItem } from '../../../types/familyTypes';
import { TrashIcon, PlusIcon } from '../../shared/AppIcons';

interface SharedListCardProps {
  list: SharedList;
  onDeleteItem: (listId: string, itemId: string) => void; // Changed signature
  onToggleItem: (listId: string, itemId: string) => void; // Changed signature
  onAddItem: (listId: string, itemText: string) => void; // Changed signature
  onDeleteList: (listId: string) => void; // Changed signature
}

const SharedListCard: React.FC<SharedListCardProps> = ({ list, onDeleteItem, onToggleItem, onAddItem, onDeleteList }) => {
  const [newItemText, setNewItemText] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    onAddItem(list.id, newItemText.trim());
    setNewItemText('');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-150 flex flex-col">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
        <h3 className="text-md font-semibold text-purple-700 truncate" title={toPersianDigits(list.name)}>
          {toPersianDigits(list.name)}
        </h3>
        <button onClick={() => onDeleteList(list.id)} className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full" aria-label={toPersianDigits("حذف لیست")}>
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      <ul className="space-y-1.5 flex-grow mb-3 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
        {list.items.length === 0 && <p className="text-xs text-gray-400 text-center py-2">{toPersianDigits("این لیست خالی است.")}</p>}
        {list.items.map(item => (
          <li key={item.id} className="flex items-center group text-sm">
            <input 
              type="checkbox" 
              checked={item.completed} 
              onChange={() => onToggleItem(list.id, item.id)}
              className="form-checkbox h-4 w-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 cursor-pointer ml-2 rtl:mr-2 rtl:ml-0"
              aria-labelledby={`listitem-label-${item.id}`}
            />
            <span id={`listitem-label-${item.id}`} className={`flex-grow ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {toPersianDigits(item.text)}
            </span>
            <button 
              onClick={() => onDeleteItem(list.id, item.id)} 
              className="p-0.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={toPersianDigits("حذف آیتم")}
            >
              <TrashIcon className="w-3.5 h-3.5" />
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddItem} className="mt-auto flex items-center gap-2 pt-2 border-t border-gray-100">
        <input 
          type="text" 
          value={newItemText} 
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder={toPersianDigits("افزودن آیتم جدید...")}
          className="flex-grow p-1.5 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-xs"
        />
        <button type="submit" className="p-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded-md" aria-label={toPersianDigits("افزودن آیتم")}>
          <PlusIcon className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default SharedListCard;