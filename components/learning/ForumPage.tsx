
import React, { useState } from 'react';
import { ForumTopic, StudyGroup, Webinar, MentorshipProfile } from '../../types/learningTypes'; // Added MentorshipProfile
import { toPersianDigits } from '../../utils';
import Breadcrumbs from './Breadcrumbs';
import { CalendarDaysIcon, PlusIcon, FunnelIcon, UsersIcon as MentoringIcon, ChatBubbleOvalLeftEllipsisIcon as ForumTabIcon, UserGroupIcon as StudyGroupsTabIcon, PlayCircleIcon as WebinarsTabIcon } from '../shared/AppIcons'; // Updated icons
import StudyGroupCard from './StudyGroupCard';
import WebinarCard from './WebinarCard';
import MentorCard from './MentorCard'; // New import for Phase 3.3

interface ForumPageProps {
  forumTopics: ForumTopic[];
  studyGroups: StudyGroup[];
  webinars: Webinar[];
  mentorProfiles?: MentorshipProfile[]; // Added for Phase 3.3
  onBackToLibrary: () => void;
  onNavigateToGateway?: () => void;
  onRequestMentorship?: (mentorId: string) => void; // Added for Phase 3.3
}

type ActiveTab = 'forum' | 'studyGroups' | 'webinars' | 'mentoring'; // Added 'mentoring'

const ForumPage: React.FC<ForumPageProps> = ({
  forumTopics,
  studyGroups,
  webinars,
  mentorProfiles = [], // Default to empty array
  onBackToLibrary,
  onNavigateToGateway,
  onRequestMentorship = () => alert(toPersianDigits("درخواست مربیگری (شبیه‌سازی شده)")), // Default handler
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('forum');

  const breadcrumbSegments = [
    ...(onNavigateToGateway ? [{ label: toPersianDigits('صفحه اصلی یادگیری'), onClick: onNavigateToGateway }] : []),
    { label: toPersianDigits('کتابخانه'), onClick: onBackToLibrary },
    { label: toPersianDigits('انجمن، گروه‌ها و رویدادها') }
  ];

  const TabButton: React.FC<{label: string, value: ActiveTab, icon: React.ReactNode}> = ({label, value, icon}) => (
    <button
        onClick={() => setActiveTab(value)}
        className={`flex-1 sm:flex-none flex items-center justify-center px-3 py-2.5 text-xs sm:text-sm font-medium rounded-t-lg border-b-2 transition-all
                    ${activeTab === value 
                        ? 'border-indigo-600 text-indigo-700 bg-indigo-50' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'}`}
    >
       {icon} <span className="mr-1.5 rtl:ml-1.5 rtl:mr-0">{label}</span>
    </button>
  );


  return (
    <div className="page bg-learning-page">
      <Breadcrumbs segments={breadcrumbSegments} className="mb-4 px-1 sm:px-0" />
      
      <header className="mb-6 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-200/80 text-center">
        <ForumTabIcon className="w-12 h-12 text-indigo-600 mx-auto mb-3"/>
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-2">
          {toPersianDigits("انجمن، گروه‌ها، وبینارها و مربیگری")}
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          {toPersianDigits("با دیگر یادگیرندگان ارتباط برقرار کنید، در گروه‌های مطالعاتی عضو شوید، در وبینارهای تخصصی شرکت کنید و مربی پیدا کنید.")}
        </p>
      </header>

      <div className="mb-5 border-b border-gray-200">
        <nav className="-mb-px flex space-x-1 sm:space-x-2 space-x-reverse overflow-x-auto" aria-label="Tabs">
          <TabButton label={toPersianDigits("انجمن گفتگو")} value="forum" icon={<ForumTabIcon className="w-4 h-4"/>} />
          <TabButton label={toPersianDigits("گروه‌های مطالعاتی")} value="studyGroups" icon={<StudyGroupsTabIcon className="w-4 h-4"/>} />
          <TabButton label={toPersianDigits("وبینارها")} value="webinars" icon={<WebinarsTabIcon className="w-4 h-4"/>} />
          <TabButton label={toPersianDigits("همتایابی و مربیگری")} value="mentoring" icon={<MentoringIcon className="w-4 h-4"/>} />
        </nav>
      </div>

      {activeTab === 'forum' && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">{toPersianDigits("آخرین موضوعات انجمن")}</h2>
            <button className="flex items-center text-xs bg-indigo-500 hover:bg-indigo-600 text-white py-1.5 px-3 rounded-md transition-colors">
              <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("ایجاد موضوع جدید (به زودی)")}
            </button>
          </div>
          <div className="space-y-3">
            {forumTopics.map(topic => (
              <div key={topic.id} className="bg-white p-3 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <h4 className="text-sm font-medium text-indigo-600 hover:underline cursor-pointer">{toPersianDigits(topic.title)}</h4>
                <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                  <span>{toPersianDigits(`نویسنده: ${topic.author}`)}</span>
                  <span>{toPersianDigits(`آخرین فعالیت: ${new Date(topic.lastActivity).toLocaleDateString('fa-IR')}`)}</span>
                  <span>{toPersianDigits(`${topic.repliesCount} پاسخ`)}</span>
                  <span>{toPersianDigits(`${topic.viewCount} بازدید`)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'studyGroups' && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">{toPersianDigits("گروه‌های مطالعاتی فعال")}</h2>
            <button className="flex items-center text-xs bg-indigo-500 hover:bg-indigo-600 text-white py-1.5 px-3 rounded-md transition-colors">
              <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("ایجاد گروه جدید (به زودی)")}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyGroups.map(group => <StudyGroupCard key={group.id} group={group} />)}
          </div>
        </section>
      )}

      {activeTab === 'webinars' && (
        <section>
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-semibold text-gray-700">{toPersianDigits("وبینارهای آموزشی")}</h2>
            {/* Placeholder for webinar filters if needed */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {webinars.map(webinar => <WebinarCard key={webinar.id} webinar={webinar} />)}
          </div>
        </section>
      )}

      {activeTab === 'mentoring' && ( // Phase 3.3
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">{toPersianDigits("پیدا کردن مربی یا همتا")}</h2>
            <button className="flex items-center text-xs bg-indigo-500 hover:bg-indigo-600 text-white py-1.5 px-3 rounded-md transition-colors">
              <FunnelIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("فیلتر مربیان (به زودی)")}
            </button>
          </div>
           {mentorProfiles.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-6">{toPersianDigits("در حال حاضر پروفایل مربی برای نمایش وجود ندارد.")}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mentorProfiles.map(mentor => (
                    <MentorCard key={mentor.userId} mentor={mentor} onRequestMentorship={onRequestMentorship} />
                    ))}
                </div>
            )}
             <p className="text-xs text-gray-500 mt-4 text-center">{toPersianDigits("سیستم درخواست و پذیرش مربیگری و ابزارهای ارتباطی درون‌برنامه‌ای در نسخه‌های بعدی توسعه داده خواهند شد.")}</p>
        </section>
      )}
      
      <div className="mt-8 text-center">
        <button 
          onClick={onBackToLibrary}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-colors"
        >
          {toPersianDigits("بازگشت به کتابخانه")}
        </button>
      </div>
    </div>
  );
};

export default ForumPage;
