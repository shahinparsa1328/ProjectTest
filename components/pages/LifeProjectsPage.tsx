
import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../utils';
import { RocketLaunchIcon as PageIcon, PlusIcon } from '../shared/AppIcons';
import LifeProjectCard from './life-projects/LifeProjectCard';
import LifeProjectDetailView from './life-projects/LifeProjectDetailView';
import { LifeProject, LearningSuggestion, LearningPath, LearningContent } from '../../types/learningTypes';
import { PageName } from '../../App';

// Mock Data - In a real app, this would come from state management or API
const mockLifeProjectsData: LifeProject[] = [
  {
    id: 'lpj1',
    title: toPersianDigits('نوشتن کتاب علمی-تخیلی'),
    description: toPersianDigits('تکمیل اولین رمان علمی-تخیلی با حداقل ۸۰ هزار کلمه، بررسی تم‌های امید و اکتشاف در آینده بشریت.'),
    relatedGoalIds: ['g_creative_writing'],
    requiredSkillIds: ['skill_creative_writing', 'skill_storytelling', 'skill_self_discipline', 'skill_world_building'],
    learningPathSuggestions: [
        { id: 'sugg_lpj1_lp1', type: 'path', itemId: 'lp-creativewriting', title: toPersianDigits('مسیر جامع نویسندگی خلاق'), description: toPersianDigits('مهارت‌های داستان‌سرایی و تکنیک‌های نویسندگی خود را تقویت کنید.'), sourceModule: 'LifeProjects', triggerContext: toPersianDigits('پروژه زندگی: نوشتن کتاب') }
    ],
    tasks: [
      { id: 'lpj1_t1', title: toPersianDigits('طراحی کلی داستان و شخصیت‌های اصلی'), status: 'completed', dueDate: '1403-03-15' },
      { id: 'lpj1_t2', title: toPersianDigits('نوشتن پیش‌نویس فصل اول تا پنجم'), status: 'in_progress', dueDate: '1403-05-10' },
      { id: 'lpj1_t3', title: toPersianDigits('تحقیق در مورد فناوری‌های آینده‌نگر'), status: 'pending' },
      { id: 'lpj1_t4', title: toPersianDigits('بازبینی و ویرایش پیش‌نویس اولیه'), status: 'pending' },
    ],
    overallProgress: 35, // Updated progress
    status: 'active',
    coverImageUrl: 'https://picsum.photos/seed/sci-fi-novel/600/300',
  },
  {
    id: 'lpj2',
    title: toPersianDigits('راه‌اندازی کسب و کار آنلاین شخصی'),
    description: toPersianDigits('ایجاد یک فروشگاه آنلاین برای فروش محصولات دست‌ساز و رسیدن به ۱۰۰ فروش اولیه در ۶ ماه اول.'),
    relatedGoalIds: ['g_entrepreneurship', 'g_financial_independence'],
    requiredSkillIds: ['skill_ecommerce', 'skill_digital_marketing', 'skill_product_photography', 'skill_customer_service'],
     learningPathSuggestions: [
        { id: 'sugg_lpj2_lp2', type: 'path', itemId: 'lp-dm', title: toPersianDigits('اصول بازاریابی دیجیتال'), description: toPersianDigits('یادگیری استراتژی‌های بازاریابی آنلاین برای رشد کسب و کار.'), sourceModule: 'LifeProjects', triggerContext: toPersianDigits('پروژه زندگی: کسب و کار آنلاین') }
    ],
    tasks: [
      { id: 'lpj2_t1', title: toPersianDigits('تحقیق بازار و انتخاب پلتفرم فروشگاه'), status: 'completed', dueDate: '1403-02-25' },
      { id: 'lpj2_t2', title: toPersianDigits('طراحی و ساخت اولیه وبسایت فروشگاه'), status: 'in_progress', dueDate: '1403-04-15' },
      { id: 'lpj2_t3', title: toPersianDigits('تهیه و عکاسی از ۱۰ محصول اولیه'), status: 'pending' },
      { id: 'lpj2_t4', title: toPersianDigits('اجرای کمپین تبلیغاتی اولیه در شبکه‌های اجتماعی'), status: 'pending' },
    ],
    overallProgress: 15,
    status: 'active',
    coverImageUrl: 'https://picsum.photos/seed/ecommerce-startup/600/300',
  },
];

interface LifeProjectsPageProps {
  navigateTo: (page: PageName | string, params?: any) => void;
  learningPaths?: LearningPath[];
  learningContent?: LearningContent[];
  view?: string; // To handle detail view, e.g., 'detail'
  projectId?: string; // ID of the project to show in detail view
}

const LifeProjectsPage: React.FC<LifeProjectsPageProps> = ({ 
  navigateTo, 
  learningPaths = [], 
  learningContent = [],
  view: initialView, // from App.tsx pageParams
  projectId: initialProjectId // from App.tsx pageParams
}) => {
  const [projects, setProjects] = useState<LifeProject[]>(mockLifeProjectsData);
  const [currentView, setCurrentView] = useState<'list' | 'detail'>(initialView === 'detail' && initialProjectId ? 'detail' : 'list');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(initialProjectId || null);
  
  useEffect(() => {
    if (initialView === 'detail' && initialProjectId) {
      setCurrentView('detail');
      setSelectedProjectId(initialProjectId);
    } else {
      setCurrentView('list');
      setSelectedProjectId(null);
    }
  }, [initialView, initialProjectId]);


  const handleAddProject = () => {
    alert(toPersianDigits("قابلیت افزودن پروژه جدید به زودی اضافه خواهد شد!"));
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentView('detail');
    // Update URL or app state if deep linking is desired, for now simple state change
    // navigateTo('LifeProjects', { view: 'detail', projectId }); // This would re-render App.tsx
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedProjectId(null);
    // navigateTo('LifeProjects'); // This would re-render App.tsx
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  if (currentView === 'detail' && selectedProject) {
    return <LifeProjectDetailView 
              project={selectedProject} 
              learningPaths={learningPaths}
              learningContent={learningContent}
              onBack={handleBackToList} 
              navigateTo={navigateTo}
            />;
  }

  return (
    <div className="page">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <div className="flex items-center">
          <PageIcon className="w-7 h-7 text-indigo-600 mr-3 rtl:ml-3 rtl:mr-0" />
          <h1 className="text-2xl font-semibold text-gray-800">{toPersianDigits("پروژه‌های زندگی من")}</h1>
        </div>
        <button
          onClick={handleAddProject}
          className="w-full sm:w-auto flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors shadow hover:shadow-md"
        >
          <PlusIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
          {toPersianDigits("افزودن پروژه جدید")}
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-10 bg-gray-100 rounded-xl shadow-inner border border-gray-200 min-h-[300px] flex flex-col justify-center items-center">
          <PageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-70" />
          <p className="text-gray-600 font-semibold">{toPersianDigits("هنوز پروژه زندگی تعریف نکرده‌اید.")}</p>
          <p className="text-sm text-gray-500 mt-1">{toPersianDigits("یک پروژه بزرگ تعریف کنید و با کمک هوش مصنوعی به سمت آن حرکت کنید!")}</p>
          <button
            onClick={handleAddProject}
            className="mt-4 flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors"
            >
            <PlusIcon className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {toPersianDigits("شروع اولین پروژه")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <LifeProjectCard key={project.id} project={project} onSelectProject={handleSelectProject} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LifeProjectsPage;
