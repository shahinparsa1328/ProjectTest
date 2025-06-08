import React, { useState, useEffect, useMemo } from 'react';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, SearchIcon, PencilIcon, TrashIcon, DatabaseIcon } from '../shared/AppIcons';
import { ViewableModuleData } from '../../types/privacyTypes';

interface ModuleDataViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleId: string; // e.g., "goals", "tasks"
  moduleName: string; // Persian name, e.g., "اهداف"
}

// Extended simulated data for demonstration
const allSimulatedData: Record<string, ViewableModuleData[]> = {
  goals: [
    { id: 'g_data_1', timestamp: '1403/01/10 09:15', type: 'ایجاد هدف', summary: 'هدف "یادگیری زبان فرانسه" ایجاد شد.', details: {description: 'هدف اصلی: رسیدن به سطح B1 مکالمه. تاریخ هدف: پایان سال ۱۴۰۳', status: 'فعال'} },
    { id: 'g_data_2', timestamp: '1403/01/12 14:00', type: 'به‌روزرسانی پیشرفت', summary: 'پیشرفت هدف "یادگیری زبان فرانسه" به ۲۰٪ رسید.', details: { oldProgress: 10, newProgress: 20 } },
    { id: 'g_data_3', timestamp: '1403/02/01 11:30', type: 'ایجاد هدف', summary: 'هدف "نوشتن کتاب" ایجاد شد.', details: {description: 'نوشتن یک رمان علمی-تخیلی ۱۰۰ هزار کلمه‌ای', status: 'برنامه‌ریزی شده'} },
  ],
  tasks: [
    { id: 't_data_1', timestamp: '1403/04/01 10:00', type: 'ایجاد وظیفه', summary: 'وظیفه "ارسال گزارش هفتگی" ایجاد شد.', details: {priority: 'بالا', dueDate: '1403/04/05', relatedGoal: 'تکمیل پروژه X'} },
    { id: 't_data_2', timestamp: '1403/04/03 16:30', type: 'تکمیل وظیفه', summary: 'وظیفه "پاسخ به ایمیل مشتری Y" تکمیل شد.', details: {timeSpent: '۳۰ دقیقه', resolution: 'مشکل حل شد'} },
    { id: 't_data_3', timestamp: '1403/04/04 09:00', type: 'ایجاد وظیفه', summary: 'وظیفه "خرید مواد غذایی" ایجاد شد.', details: {priority: 'متوسط', tags: ['خانه', 'خرید']} },
  ],
  health: [
    { id: 'h_data_1', timestamp: '1403/03/20 22:30', type: 'گزارش خواب', summary: 'خواب: ۷ ساعت و ۳۰ دقیقه', details: { quality: 'خوب', interruptions: 0, notes: 'احساس شادابی هنگام بیدار شدن' } },
    { id: 'h_data_2', timestamp: '1403/03/21 08:00', type: 'گزارش فعالیت', summary: 'فعالیت: پیاده‌روی ۳۰ دقیقه‌ای', details: { steps: 3500, caloriesBurned: 150, intensity: 'متوسط' } },
    { id: 'h_data_3', timestamp: '1403/03/21 12:30', type: 'گزارش تغذیه', summary: 'ناهار: سالاد مرغ', details: {calories: 450, protein: '30g', carbs: '20g', fat: '20g'} },
  ],
  learning: [
    { id: 'l_data_1', timestamp: '1403/02/15 11:00', type: 'شروع دوره', summary: 'شروع دوره "مبانی پایتون".', details: {platform: 'کورسا', instructor: 'دکتر الف', estimatedDuration: '۴ هفته'} },
    { id: 'l_data_2', timestamp: '1403/02/25 17:45', type: 'تکمیل ماژول', summary: 'تکمیل ماژول "حلقه‌ها و شرط‌ها" در دوره پایتون.', details: { moduleName: 'حلقه‌ها و شرط‌ها', quizScore: '۹۰٪', notes: 'مفهوم حلقه‌های تو در تو کمی چالش‌برانگیز بود.'} },
    { id: 'l_data_3', timestamp: '1403/03/01 09:00', type: 'افزودن علاقه‌مندی', summary: 'افزودن "یادگیری ماشین" به علاقه‌مندی‌ها.', details: {} },
  ],
};

const ModuleDataViewerModal: React.FC<ModuleDataViewerModalProps> = ({ isOpen, onClose, moduleId, moduleName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<ViewableModuleData[]>([]);

  useEffect(() => {
    if (isOpen) {
      setData(allSimulatedData[moduleId.toLowerCase()] || []);
      setSearchTerm('');
    }
  }, [isOpen, moduleId]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const lowerSearchTerm = toPersianDigits(searchTerm.toLowerCase());
    return data.filter(item => 
      toPersianDigits(item.summary.toLowerCase()).includes(lowerSearchTerm) ||
      toPersianDigits(item.type.toLowerCase()).includes(lowerSearchTerm) ||
      (item.details && typeof item.details === 'string' && toPersianDigits(item.details.toLowerCase()).includes(lowerSearchTerm)) ||
      (item.details && typeof item.details === 'object' && JSON.stringify(item.details).toLowerCase().includes(lowerSearchTerm.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))))) // Search in stringified object details
    );
  }, [data, searchTerm]);

  const handleDeleteItem = (itemId: string) => {
    setData(prev => prev.filter(item => item.id !== itemId));
    alert(toPersianDigits(`آیتم با شناسه ${itemId} حذف شد (شبیه‌سازی).`));
  };

  const handleEditItem = (item: ViewableModuleData) => {
    alert(toPersianDigits(`ویرایش آیتم: ${item.summary} (شبیه‌سازی).`));
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="module-data-viewer-title"
    >
      <div 
        className="bg-white p-5 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200 flex-shrink-0">
          <h2 id="module-data-viewer-title" className="text-lg font-semibold text-gray-800 flex items-center">
            <DatabaseIcon className="w-5 h-5 text-indigo-600 mr-2 rtl:ml-2 rtl:mr-0"/>
            {toPersianDigits(`مشاهده داده‌های ماژول: ${moduleName}`)}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-3 flex-shrink-0">
          <div className="relative">
            <input 
              type="text" 
              placeholder={toPersianDigits("جستجو در داده‌ها...")}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full p-2 pr-8 rtl:pl-8 rtl:pr-2 border border-gray-300 rounded-md text-xs focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="absolute inset-y-0 right-0 rtl:left-0 rtl:right-auto flex items-center pr-2 rtl:pl-2 text-gray-400 pointer-events-none">
              <SearchIcon className="w-4 h-4"/>
            </div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto space-y-2 pr-1 scrollbar-thin">
          {filteredData.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-4">{toPersianDigits("داده‌ای برای نمایش یافت نشد.")}</p>
          ) : (
            filteredData.map(item => (
              <div key={item.id} className="bg-gray-50 p-2.5 rounded-md border border-gray-200 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-700">{toPersianDigits(item.type)}: <span className="font-normal">{toPersianDigits(item.summary)}</span></p>
                    <p className="text-[10px] text-gray-500">{toPersianDigits(item.timestamp)}</p>
                  </div>
                  <div className="flex-shrink-0 space-x-1 space-x-reverse">
                    <button onClick={() => handleEditItem(item)} className="p-1 text-yellow-500 hover:bg-yellow-100 rounded-full" aria-label={toPersianDigits("ویرایش")}>
                      <PencilIcon className="w-3.5 h-3.5"/>
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} className="p-1 text-red-500 hover:bg-red-100 rounded-full" aria-label={toPersianDigits("حذف")}>
                      <TrashIcon className="w-3.5 h-3.5"/>
                    </button>
                  </div>
                </div>
                {item.details && (
                  <details className="mt-1 text-[10px]">
                    <summary className="cursor-pointer text-indigo-600 hover:underline">{toPersianDigits("نمایش جزئیات")}</summary>
                    <pre className="mt-1 p-1.5 bg-gray-100 rounded text-gray-600 whitespace-pre-wrap text-left dir-ltr">
                      {typeof item.details === 'string' ? toPersianDigits(item.details) : JSON.stringify(item.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))
          )}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200 text-right rtl:text-left flex-shrink-0">
            <button 
                type="button" 
                onClick={onClose} 
                className="py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-xs"
            >
                {toPersianDigits("بستن")}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleDataViewerModal;
