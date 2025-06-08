import React, { useState } from 'react';
import { UserGeneratedContent } from '../../types/learningTypes';
import { toPersianDigits } from '../../utils';
import { XMarkIcon, DocumentArrowUpIcon, LinkIcon, BookIcon } from '../shared/AppIcons';

interface UGCSubmissionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitUGC: (ugcData: Omit<UserGeneratedContent, 'id' | 'authorId' | 'authorName' | 'submissionDate' | 'status'>) => void;
}

type UGCSubmissionType = UserGeneratedContent['type'];

const UGCSubmissionFormModal: React.FC<UGCSubmissionFormModalProps> = ({
  isOpen,
  onClose,
  onSubmitUGC,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<UGCSubmissionType>('article');
  const [contentData, setContentData] = useState(''); // For article text or link
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || (type !== 'path' && !contentData.trim())) {
      alert(toPersianDigits("لطفاً تمام فیلدهای الزامی را پر کنید."));
      return;
    }

    let dataPayload: any;
    if (type === 'article') {
      dataPayload = { text: contentData };
    } else if (type === 'resource_link') {
      // Basic URL validation (can be improved)
      if (!contentData.startsWith('http://') && !contentData.startsWith('https://')) {
        alert(toPersianDigits("لطفاً یک URL معتبر برای لینک منبع وارد کنید."));
        return;
      }
      dataPayload = { url: contentData };
    } else if (type === 'path') {
      // For 'path', contentData might be a more complex object or structured later
      // For now, we'll pass it as is, or it could be built through a separate UI
      dataPayload = { pathStructure: contentData || "ساختار مسیر در اینجا (نمونه)" }; 
    }

    onSubmitUGC({
      title,
      description,
      type,
      contentData: dataPayload,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    });
    // Reset form or close modal
    // onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1001] p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ugc-modal-title"
      dir="rtl"
    >
      <div 
        className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-700 modal-scroll-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="ugc-modal-title" className="text-xl sm:text-2xl font-semibold text-sky-300">{toPersianDigits("اشتراک‌گذاری محتوای آموزشی")}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ugcTitle" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("عنوان محتوا*:")}</label>
            <input
              type="text" id="ugcTitle" value={title} onChange={(e) => setTitle(e.target.value)} required
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
              placeholder={toPersianDigits("مثال: آموزش مقدماتی پایتون")}
            />
          </div>
          <div>
            <label htmlFor="ugcDescription" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("توضیحات کوتاه*:")}</label>
            <textarea
              id="ugcDescription" value={description} onChange={(e) => setDescription(e.target.value)} required rows={3}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm resize-y"
              placeholder={toPersianDigits("خلاصه‌ای از محتوای شما...")}
            />
          </div>
          <div>
            <label htmlFor="ugcType" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("نوع محتوا*:")}</label>
            <select
              id="ugcType" value={type} onChange={(e) => setType(e.target.value as UGCSubmissionType)}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
            >
              <option value="article">{toPersianDigits("مقاله")}</option>
              <option value="resource_link">{toPersianDigits("لینک منبع مفید")}</option>
              <option value="path">{toPersianDigits("مسیر یادگیری (نمونه)")}</option>
              {/* Add other types like video later if needed */}
            </select>
          </div>

          {type === 'article' && (
            <div>
              <label htmlFor="ugcArticleContent" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("متن مقاله*:")}</label>
              <textarea
                id="ugcArticleContent" value={contentData} onChange={(e) => setContentData(e.target.value)} required rows={8}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm resize-y"
                placeholder={toPersianDigits("محتوای مقاله خود را اینجا وارد کنید...")}
              />
            </div>
          )}
          {type === 'resource_link' && (
            <div>
              <label htmlFor="ugcResourceLink" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("لینک منبع*:")}</label>
              <input
                type="url" id="ugcResourceLink" value={contentData} onChange={(e) => setContentData(e.target.value)} required
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm ltr text-left"
                placeholder="https://example.com/resource"
              />
            </div>
          )}
           {type === 'path' && (
            <p className="text-xs text-gray-400 bg-slate-700 p-2 rounded-md border border-slate-600">
                {toPersianDigits("قابلیت تعریف کامل مسیر یادگیری توسط کاربر در نسخه‌های بعدی اضافه خواهد شد. در حال حاضر، می‌توانید یک توضیح کلی از مسیر پیشنهادی خود ارائه دهید.")}
                 <textarea
                    id="ugcPathStructure" value={contentData} onChange={(e) => setContentData(e.target.value)} rows={3}
                    className="w-full mt-1 p-2 bg-slate-600 border border-slate-500 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm resize-y"
                    placeholder={toPersianDigits("توضیح کلی ساختار مسیر...")}
                />
            </p>
          )}
           {/* Placeholder for file upload if we add 'video' or other file types */}


          <div>
            <label htmlFor="ugcTags" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("برچسب‌ها (جدا شده با کاما):")}</label>
            <input
              type="text" id="ugcTags" value={tags} onChange={(e) => setTags(e.target.value)}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
              placeholder={toPersianDigits("مثال: پایتون, برنامه‌نویسی, یادگیری ماشین")}
            />
          </div>
          
          <p className="text-xs text-gray-400">{toPersianDigits("محتوای شما پس از ارسال توسط تیم پلتفرم بررسی و در صورت تایید منتشر خواهد شد.")}</p>

          <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-slate-700">
            <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium text-gray-300 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center">
              <DocumentArrowUpIcon className="w-4 h-4 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
              {toPersianDigits("ارسال برای بررسی")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UGCSubmissionFormModal;
