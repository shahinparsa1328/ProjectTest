
import React, { useState } from 'react';
import { toPersianDigits } from '../../../utils';
import { TimeCapsuleItem, FamilyMember } from '../../../types/familyTypes';
import { ArchiveBoxIcon, PlusIcon } from '../../shared/AppIcons';
import TimeCapsuleItemCard from './timecapsule/TimeCapsuleItemCard';
import AddTimeCapsuleItemModal from './timecapsule/AddTimeCapsuleItemModal';

interface TimeCapsuleSectionProps {
  themeClasses: { // Use the same theme structure as FamilyPage
    primaryAccentClass: string;
    secondaryAccentClass: string;
    buttonBgClass: string;
    buttonHoverBgClass: string;
  };
  familyMembers: FamilyMember[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  currentUserId: string; // Needed for creatorId
}

const TimeCapsuleSection: React.FC<TimeCapsuleSectionProps> = ({ themeClasses, familyMembers, showToast, currentUserId }) => {
  const [timeCapsuleItems, setTimeCapsuleItems] = useState<TimeCapsuleItem[]>(() => {
    // Load from localStorage or start with mock data
    const storedItems = localStorage.getItem('familyTimeCapsules');
    if (storedItems) {
      try {
        return JSON.parse(storedItems);
      } catch (e) {
        console.error("Error parsing time capsules from localStorage", e);
      }
    }
    // Mock data if nothing in localStorage
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return [
      { id: 'tc1', title: 'پیام برای تولد ۱۸ سالگی پسرم', contentType: 'text', content: 'پسرم، امیدوارم در این سن به تمام آرزوهایت رسیده باشی. همیشه به یاد داشته باش که چقدر دوستت داریم.', recipientMemberId: familyMembers.find(fm => fm.relationship === 'فرزند اول')?.id, openDate: new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString().split('T')[0], opened: false, creatorId: currentUserId },
      { id: 'tc2', title: 'خاطره اولین سفر خانوادگی', contentType: 'text', content: 'اولین سفرمان به شمال خیلی خوش گذشت. یادت هست چقدر در ساحل بازی کردیم؟', openDate: yesterday.toISOString().split('T')[0], opened: false, creatorId: currentUserId },
      { id: 'tc3', title: 'آرزوها برای سال نو', contentType: 'text', content: 'امیدوارم سال جدید پر از شادی، سلامتی و موفقیت برای همه ما باشد.', openDate: oneMonthFromNow.toISOString().split('T')[0], opened: true, creatorId: currentUserId },
    ];
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCapsule, setEditingCapsule] = useState<TimeCapsuleItem | null>(null);

  const saveItemsToLocalStorage = (items: TimeCapsuleItem[]) => {
    localStorage.setItem('familyTimeCapsules', JSON.stringify(items));
  };

  const handleSaveItem = (itemData: Omit<TimeCapsuleItem, 'id' | 'opened' | 'creatorId'>) => {
    let newItems;
    if (editingCapsule) {
      newItems = timeCapsuleItems.map(item => 
        item.id === editingCapsule.id ? { ...editingCapsule, ...itemData } : item
      );
      showToast(toPersianDigits("کپسول زمان با موفقیت ویرایش شد."), "success");
    } else {
      const newItem: TimeCapsuleItem = {
        ...itemData,
        id: `tc-${Date.now()}`,
        opened: false,
        creatorId: currentUserId, // Set current user as creator
      };
      newItems = [newItem, ...timeCapsuleItems];
      showToast(toPersianDigits("کپسول زمان جدید ایجاد شد."), "success");
    }
    setTimeCapsuleItems(newItems);
    saveItemsToLocalStorage(newItems);
    setIsAddModalOpen(false);
    setEditingCapsule(null);
  };
  
  const handleOpenCapsule = (itemId: string) => {
    setTimeCapsuleItems(prevItems => {
        const updatedItems = prevItems.map(item => 
            item.id === itemId ? { ...item, opened: true } : item
        );
        saveItemsToLocalStorage(updatedItems);
        return updatedItems;
    });
    showToast(toPersianDigits("کپسول زمان باز شد!"), "info");
  };

  const isOpeningDateAllowed = (openDate: string): boolean => {
    return new Date(openDate) <= new Date();
  };

  const handleEditCapsule = (item: TimeCapsuleItem) => {
    setEditingCapsule(item);
    setIsAddModalOpen(true);
  };


  return (
    <>
      <div className={`p-3 rounded-lg border ${themeClasses.secondaryAccentClass} bg-white`}>
        <div className="flex justify-between items-center mb-3">
          <h4 className={`text-sm font-semibold ${themeClasses.primaryAccentClass} flex items-center`}>
            <ArchiveBoxIcon className={`w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 ${themeClasses.primaryAccentClass}`} />
            {toPersianDigits("کپسول زمان دیجیتال")}
          </h4>
          <button
            onClick={() => { setEditingCapsule(null); setIsAddModalOpen(true); }}
            className={`flex items-center text-xs py-1 px-2.5 rounded-md text-white ${themeClasses.buttonBgClass} ${themeClasses.buttonHoverBgClass}`}
          >
            <PlusIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0" /> {toPersianDigits("ایجاد کپسول جدید")}
          </button>
        </div>
        {timeCapsuleItems.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-3">{toPersianDigits("هنوز هیچ کپسول زمانی ایجاد نشده است.")}</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
                {timeCapsuleItems.map(item => (
                    <TimeCapsuleItemCard 
                        key={item.id} 
                        item={item} 
                        onOpen={handleOpenCapsule} 
                        isOpeningAllowed={isOpeningDateAllowed}
                        themeClasses={themeClasses}
                    />
                ))}
            </div>
        )}
      </div>

      <AddTimeCapsuleItemModal
        isOpen={isAddModalOpen}
        onClose={() => { setIsAddModalOpen(false); setEditingCapsule(null);}}
        onSave={handleSaveItem}
        familyMembers={familyMembers}
        editingItem={editingCapsule}
      />
    </>
  );
};

export default TimeCapsuleSection;
