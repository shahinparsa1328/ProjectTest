import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../../utils';
import { XMarkIcon, TrashIcon } from '../../shared/AppIcons';
import { Task } from '../TasksPage'; // Import Task type

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit: Task;
  onSaveTask: (updatedTask: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, taskToEdit, onSaveTask }) => {
  const [title, setTitle] = useState(taskToEdit.title);
  const [description, setDescription] = useState(taskToEdit.description || '');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(taskToEdit.priority);
  const [dueDate, setDueDate] = useState(taskToEdit.dueDate || '');
  const [tags, setTags] = useState((taskToEdit.tags || []).join(', '));
  const [context, setContext] = useState(taskToEdit.context || '');
  const [relatedGoal, setRelatedGoal] = useState(taskToEdit.relatedGoal || '');

  useEffect(() => {
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description || '');
    setPriority(taskToEdit.priority);
    setDueDate(taskToEdit.dueDate || '');
    setTags((taskToEdit.tags || []).join(', '));
    setContext(taskToEdit.context || '');
    setRelatedGoal(taskToEdit.relatedGoal || '');
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert(toPersianDigits("عنوان وظیفه نمی‌تواند خالی باشد."));
      return;
    }
    const updatedTask: Task = {
      ...taskToEdit,
      title,
      description,
      priority,
      dueDate: dueDate || undefined, // Ensure undefined if empty
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      context: context || undefined,
      relatedGoal: relatedGoal || undefined,
    };
    onSaveTask(updatedTask);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-task-modal-title"
      dir="rtl"
    >
      <div 
        className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-700 modal-scroll-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="edit-task-modal-title" className="text-xl sm:text-2xl font-semibold text-sky-300">{toPersianDigits("ویرایش وظیفه")}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="editTaskTitle" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("عنوان وظیفه*")}</label>
            <input
              type="text"
              id="editTaskTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
            />
          </div>

          <div>
            <label htmlFor="editTaskDescription" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("توضیحات")}</label>
            <textarea
              id="editTaskDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="editTaskPriority" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("اولویت")}</label>
              <select
                id="editTaskPriority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
                className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
              >
                <option value="low">{toPersianDigits("پایین")}</option>
                <option value="medium">{toPersianDigits("متوسط")}</option>
                <option value="high">{toPersianDigits("بالا")}</option>
              </select>
            </div>
            <div>
              <label htmlFor="editTaskDueDate" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("تاریخ سررسید")}</label>
              <input
                type="date"
                id="editTaskDueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="editTaskTags" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("برچسب‌ها (جدا شده با کاما)")}</label>
            <input
              type="text"
              id="editTaskTags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
              placeholder={toPersianDigits("مثال: کار, شخصی, فوری")}
            />
          </div>
           <div>
            <label htmlFor="editTaskContext" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("زمینه")}</label>
            <input
              type="text"
              id="editTaskContext"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
              placeholder={toPersianDigits("مثال: در خانه, در محل کار")}
            />
          </div>
           <div>
            <label htmlFor="editTaskRelatedGoal" className="block text-sm font-medium text-sky-400 mb-1">{toPersianDigits("هدف مرتبط")}</label>
            <input
              type="text"
              id="editTaskRelatedGoal"
              value={relatedGoal}
              onChange={(e) => setRelatedGoal(e.target.value)}
              className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-gray-200 text-sm"
              placeholder={toPersianDigits("مثال: تکمیل پروژه وبسایت")}
            />
          </div>

          <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t border-slate-700">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-300 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
              {toPersianDigits("انصراف")}
            </button>
            <button type="submit" className="px-6 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
              {toPersianDigits("ذخیره تغییرات")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;