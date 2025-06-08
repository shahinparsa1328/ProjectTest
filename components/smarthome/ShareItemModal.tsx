
import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, ShareIcon, MegaphoneIcon, LightBulbOutlineIcon } from '../shared/AppIcons';
import { CommunityFeedItemType } from '../../types/smartHomeTypes';

interface ShareItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmShare: (title: string, content: string, type: CommunityFeedItemType, isAnonymous: boolean) => void;
  initialItemName?: string; // For pre-filling title, e.g., automation rule name
  initialItemType?: CommunityFeedItemType; // Pre-select type if sharing existing item
}

const ShareItemModal: React.FC<ShareItemModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirmShare,
  initialItemName = '',
  initialItemType = 'ایده خانه هوشمند'
}) => {
  const [title, setTitle] = useState(initialItemName);
  const [content, setContent] = useState('');
  const [itemType, setItemType] = useState<CommunityFeedItemType>(initialItemType);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle(initialItemName);
      setItemType(initialItemType);
      setContent(''); // Reset content for new share
      setIsAnonymous(false);
    }
  }, [isOpen, initialItemName, initialItemType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || (itemType !== 'روتین اتوماسیون' && !content.trim())) {
      alert(toPersianDigits("لطفاً عنوان و محتوا را برای اشتراک‌گذاری وارد کنید."));
      return;
    }
    // For automation rules, 'content' might be a pre-filled description or stringified rule
    const shareContent = itemType === 'روتین اتوماسیون' ? (initialItemName ? `جزئیات روتین '${initialItemName}'` : 'جزئیات روتین اتوماسیون.') : content;
    onConfirmShare(title, shareContent, itemType, isAnonymous);
  };

  if (!isOpen) return null;

  const itemTypeOptions: { value: CommunityFeedItemType, label: string, icon: React.ReactNode }[] = [
    { value: 'ایده خانه هوشمند', label: toPersianDigits("ایده خانه هوشمند"), icon: <LightBulbOutlineIcon className="w-4 h-4" /> },
    { value: 'نکته صرفه‌جویی در انرژی', label: toPersianDigits("نکته صرفه‌جویی در انرژی"), icon: <MegaphoneIcon className="w-4 h-4" /> },
    { value: 'روتین اتوماسیون', label: toPersianDigits("روتین اتوماسیون"), icon: <MegaphoneIcon className="w-4 h-4" /> }, // Re-using icon for simplicity
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1001] p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-item-modal-title"
    >
      <div 
        className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-700 modal-scroll-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="share-item-modal-title" className="text-xl font-semibold text-sky-300 flex items-center">
            <ShareIcon className="w-6 h-6 text-sky-400 mr-2 rtl:ml-2 rtl:mr-0" />
            {toPersianDigits("اشتراک‌گذاری با انجمن")}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label htmlFor="itemTypeShare" className="block text-xs font-medium text-sky-400 mb-1">{toPersianDigits("نوع اشتراک‌گذاری:")}</label>
            <select 
              id="itemTypeShare" 
              value={itemType} 
              onChange={(e) => {
                setItemType(e.target.value as CommunityFeedItemType);
                if (e.target.value === 'روتین اتوماسیون' && initialItemName) {
                  setTitle(initialItemName);
                } else if (itemType === 'روتین اتوماسیون' && e.target.value !== 'روتین اتوماسیون') {
                  // If switching away from routine and title was prefilled, clear it unless user modified it.
                  // This logic might need refinement based on desired UX.
                  // For now, let's allow manual title for everything.
                }
              }}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-xs"
              disabled={!!initialItemType && initialItemType === 'روتین اتوماسیون'} // Disable if sharing an existing routine
            >
              {itemTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="shareTitle" className="block text-xs font-medium text-sky-400 mb-1">{toPersianDigits("عنوان اشتراک‌گذاری*:")}</label>
            <input 
              type="text" 
              id="shareTitle" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-xs"
              placeholder={toPersianDigits("مثال: ایده برای نورپردازی هوشمند پذیرایی")}
            />
          </div>

          {itemType !== 'روتین اتوماسیون' && (
            <div>
              <label htmlFor="shareContent" className="block text-xs font-medium text-sky-400 mb-1">{toPersianDigits("محتوا/توضیحات*:")}</label>
              <textarea 
                id="shareContent" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                rows={4} 
                required 
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-xs resize-y"
                placeholder={toPersianDigits("ایده، نکته یا توضیحات خود را اینجا بنویسید...")}
              />
            </div>
          )}
          {itemType === 'روتین اتوماسیون' && initialItemName && (
             <p className="text-xs text-gray-400 p-2 bg-slate-700/50 rounded-md border border-slate-600">
                {toPersianDigits(`شما در حال اشتراک‌گذاری روتین "${initialItemName}" هستید. یک توضیح کوتاه در مورد کاربرد آن اضافه کنید اگر مایلید، یا عنوان را ویرایش کنید.`)}
             </p>
          )}


          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="shareAnonymous" 
              checked={isAnonymous} 
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="h-3.5 w-3.5 text-sky-500 bg-slate-600 border-slate-500 rounded focus:ring-sky-400"
            />
            <label htmlFor="shareAnonymous" className="mr-2 rtl:ml-2 rtl:mr-0 text-xs text-gray-300">{toPersianDigits("اشتراک‌گذاری به صورت ناشناس")}</label>
          </div>
          
          <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-slate-700">
            <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium text-gray-300 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center">
              <ShareIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> 
              {toPersianDigits("اشتراک‌گذاری")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareItemModal;