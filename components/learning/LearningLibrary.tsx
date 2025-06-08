
import React, { useState, useMemo } from 'react';
import { LearningCategory, LearningPath, LearningContent, GoalRelevanceFilter, Badge, WeeklyChallenge, UserProgress, UserGeneratedContent, AI360FeedbackItem, PredictiveSkillSuggestion } from '../../types/learningTypes'; // Added UGC, AI360FeedbackItem, PredictiveSkillSuggestion
import { toPersianDigits, highlightText } from '../../utils';
import { SearchIcon, ListIcon, Squares2X2Icon as GridIcon, FunnelIcon, BookIcon, AdjustmentsVerticalIcon as FilterAdjustIcon, ChevronDownIcon, ChevronUpIcon, XCircleIcon, AcademicCapIcon, SparklesIconNav, LightbulbIcon, JournalIcon, TrophyIcon, UserGroupIcon as ForumIconIcon, PlusIcon as AddUGCIcon, PencilSquareIcon } from '../shared/AppIcons'; // Added AddUGCIcon, PencilSquareIcon
import LearningCategoryCard from './LearningCategoryCard';
import LearningPathCard from './LearningPathCard';
import LearningContentCard from './LearningContentCard';
import LearningProgressDashboard from './LearningProgressDashboard';
import SkeletonPathCard from './skeletons/SkeletonPathCard';
import SkeletonContentCard from './skeletons/SkeletonContentCard';
import Breadcrumbs from './Breadcrumbs';
import WeeklyChallengeWidget from './WeeklyChallengeWidget'; 
import UGCSubmissionFormModal from './UGCSubmissionFormModal'; // New import for Phase 3.3

interface LearningLibraryProps {
  isLoadingData: boolean; 
  categories: LearningCategory[];
  paths: LearningPath[];
  contentItems: LearningContent[];
  userGeneratedContent?: UserGeneratedContent[]; 
  hyperPersonalizedContent?: LearningContent[]; 
  goalRelevanceFilters: GoalRelevanceFilter[];
  bookmarkedContentIds: Set<string>;
  earnedBadges: Badge[];
  userProgress: UserProgress; 
  onSelectPath: (pathId: string) => void;
  onToggleBookmark: (contentId: string) => void;
  onNavigateToGateway?: () => void; 
  onNavigateToSkillsMap?: () => void; 
  onNavigateToJournal?: () => void; 
  activeWeeklyChallenge: WeeklyChallenge | null; 
  onStartChallenge: (challengeId: string) => void; 
  onAwardPoints: (points: number, action: string) => void;
  onNavigateToAchievements?: () => void;
  onNavigateToForum?: () => void;
  onNavigateToSimulator?: () => void; 
  onNavigateToCreativeWorkspace?: () => void; 
  ai360FeedbackItems?: AI360FeedbackItem[]; 
  onSubmitUGC?: (ugcData: Omit<UserGeneratedContent, 'id' | 'authorId' | 'authorName' | 'submissionDate' | 'status'>) => void;
  predictiveSkills?: PredictiveSkillSuggestion[]; // Added for Phase 3.4
  onViewLearningPath?: (pathId: string) => void; // Added for Phase 3.4
  onOpenLearningReportModal?: () => void; // Added for Phase 3.4
}

type LibraryViewMode = 'grid' | 'list';
type ContentTypeFilter = 'all' | LearningContent['type'] | 'ugc'; // Added 'ugc'

const LearningLibrary: React.FC<LearningLibraryProps> = ({
  isLoadingData, 
  categories,
  paths,
  contentItems,
  userGeneratedContent = [], 
  hyperPersonalizedContent = [], 
  goalRelevanceFilters,
  bookmarkedContentIds,
  earnedBadges,
  userProgress,
  onSelectPath,
  onToggleBookmark,
  onNavigateToGateway,
  onNavigateToSkillsMap, 
  onNavigateToJournal, 
  activeWeeklyChallenge, 
  onStartChallenge, 
  onAwardPoints,
  onNavigateToAchievements,
  onNavigateToForum,
  onNavigateToSimulator,
  onNavigateToCreativeWorkspace,
  ai360FeedbackItems,
  onSubmitUGC, 
  predictiveSkills, // Destructure new prop
  onViewLearningPath, // Destructure new prop
  onOpenLearningReportModal, // Destructure new prop
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<string>>(new Set());
  const [selectedGoalRelevanceIds, setSelectedGoalRelevanceIds] = useState<Set<string>>(new Set());
  const [selectedContentType, setSelectedContentType] = useState<ContentTypeFilter>('all');
  const [pathViewMode, setPathViewMode] = useState<LibraryViewMode>('grid');
  const [contentViewMode, setContentViewMode] = useState<LibraryViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showUGCModal, setShowUGCModal] = useState(false); // Phase 3.3

  const accentColor = 'var(--color-primary-accent, #4f46e5)'; 
  const aiAssistantName = "دانا"; 

  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim() || !showSearchSuggestions) return [];
    const lowerSearchTerm = searchTerm.toLowerCase();
    const pathSuggestions = paths
      .filter(p => p.title.toLowerCase().includes(lowerSearchTerm))
      .slice(0, 2)
      .map(p => ({ id: p.id, title: p.title, type: 'path' as 'path' | 'content' | 'ugc' }));
    const contentSuggestions = contentItems
      .filter(c => c.title.toLowerCase().includes(lowerSearchTerm))
      .slice(0, 2)
      .map(c => ({ id: c.id, title: c.title, type: 'content' as 'path' | 'content' | 'ugc' }));
    const ugcSuggestions = userGeneratedContent
      .filter(u => u.title.toLowerCase().includes(lowerSearchTerm) && u.status === 'approved')
      .slice(0,1)
      .map(u => ({ id: u.id, title: u.title, type: 'ugc' as 'path' | 'content' | 'ugc'}));
    return [...pathSuggestions, ...contentSuggestions, ...ugcSuggestions].slice(0, 5);
  }, [searchTerm, paths, contentItems, userGeneratedContent, showSearchSuggestions]);


  const generateSnippet = (text: string, term: string): string | undefined => {
    if (!term.trim()) return undefined;
    const lowerText = text.toLowerCase();
    const lowerTerm = term.toLowerCase();
    const index = lowerText.indexOf(lowerTerm);
    if (index === -1) return undefined;

    const start = Math.max(0, index - 30);
    const end = Math.min(text.length, index + term.length + 30);
    let snippet = text.substring(start, end);
    if (start > 0) snippet = "..." + snippet;
    if (end < text.length) snippet = snippet + "...";
    return snippet;
  };

  const filteredPaths = useMemo(() => {
    if (isLoadingData) return []; 
    return paths
      .filter(path => {
        const matchesCategory = selectedCategoryIds.size === 0 || path.categoryIds.some(catId => selectedCategoryIds.has(catId));
        const matchesGoalRelevance = selectedGoalRelevanceIds.size === 0 || (path.goalRelevanceIds || []).some(grId => selectedGoalRelevanceIds.has(grId));
        const matchesSearch = searchTerm === '' || 
          path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          path.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch && matchesCategory && matchesGoalRelevance;
      })
      .map(path => ({
        ...path,
        searchMatchSnippet: generateSnippet(path.description, searchTerm) || generateSnippet(path.title, searchTerm)
      }));
  }, [paths, searchTerm, selectedCategoryIds, selectedGoalRelevanceIds, isLoadingData]);

  const filteredPlatformContent = useMemo(() => {
    if (isLoadingData) return []; 
    return contentItems
      .filter(content => {
        const matchesCategory = selectedCategoryIds.size === 0 || content.categoryIds.some(catId => selectedCategoryIds.has(catId));
        const matchesGoalRelevance = selectedGoalRelevanceIds.size === 0 || (content.goalRelevanceIds || []).some(grId => selectedGoalRelevanceIds.has(grId));
        const matchesContentType = selectedContentType === 'all' || content.type === selectedContentType;
        const matchesSearch = searchTerm === '' || 
          content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesSearch && matchesCategory && matchesGoalRelevance && matchesContentType;
      })
      .map(content => ({
        ...content,
        searchMatchSnippet: generateSnippet(content.description, searchTerm) || generateSnippet(content.title, searchTerm)
      }));
  }, [contentItems, searchTerm, selectedCategoryIds, selectedGoalRelevanceIds, selectedContentType, isLoadingData]);
  
  const filteredUGC = useMemo(() => {
    if (isLoadingData || selectedContentType !== 'ugc' && selectedContentType !== 'all') return [];
    return userGeneratedContent
        .filter(ugc => ugc.status === 'approved') // Only show approved UGC
        .filter(ugc => {
            const matchesSearch = searchTerm === '' ||
                ugc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ugc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ugc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesSearch;
        })
        .map(ugc => ({
            ...ugc, // Spread UGC properties
            // Map UGC to a LearningContent-like structure for display by LearningContentCard
            id: ugc.id,
            type: ugc.type as LearningContent['type'], // Cast UGC type
            categoryIds: [], // UGC might not have categories in the same way
            description: ugc.description,
            tags: ugc.tags,
            estimatedTime: toPersianDigits("متغیر"), // Or derive from ugc.contentData
            difficultyLevel: 'Easy', // Or derive from ugc.contentData or user rating
            author: ugc.authorName,
            publishDate: ugc.submissionDate,
            searchMatchSnippet: generateSnippet(ugc.description, searchTerm) || generateSnippet(ugc.title, searchTerm),
            isUGC: true // Custom flag
        }));
  }, [userGeneratedContent, searchTerm, selectedContentType, isLoadingData]);

  const displayableContent = useMemo(() => {
    if (selectedContentType === 'ugc') return filteredUGC;
    if (selectedContentType === 'all') return [...filteredPlatformContent, ...filteredUGC];
    return filteredPlatformContent;
  }, [filteredPlatformContent, filteredUGC, selectedContentType]);


  const toggleCategoryFilter = (categoryId: string) => { setSelectedCategoryIds(prev => { const newSet = new Set(prev); if (newSet.has(categoryId)) newSet.delete(categoryId); else newSet.add(categoryId); return newSet; }); };
  const toggleGoalRelevanceFilter = (filterId: string) => { setSelectedGoalRelevanceIds(prev => { const newSet = new Set(prev); if (newSet.has(filterId)) newSet.delete(filterId); else newSet.add(filterId); return newSet; }); };
  const clearAllFilters = () => { setSearchTerm(''); setSelectedCategoryIds(new Set()); setSelectedGoalRelevanceIds(new Set()); setSelectedContentType('all'); setShowSearchSuggestions(false); };

  const breadcrumbSegments = [ ...(onNavigateToGateway ? [{ label: toPersianDigits('صفحه اصلی یادگیری'), onClick: onNavigateToGateway }] : []), { label: toPersianDigits('کتابخانه و مسیرها') } ];
  
  const contentTypeOptions: {label: string, value: ContentTypeFilter}[] = [
    {label: toPersianDigits("همه انواع"), value: "all"}, {label: toPersianDigits("مقاله"), value: "article"},
    {label: toPersianDigits("ویدیو"), value: "video"}, {label: toPersianDigits("اینفوگرافیک"), value: "infographic"},
    {label: toPersianDigits("دوره"), value: "course"}, {label: toPersianDigits("آزمون"), value: "quiz"},
    {label: toPersianDigits("محتوای کاربران"), value: "ugc"}, // Phase 3.3
  ];

  const handleUGCSubmit = (ugcData: Omit<UserGeneratedContent, 'id' | 'authorId' | 'authorName' | 'submissionDate' | 'status'>) => {
    if (onSubmitUGC) {
      onSubmitUGC(ugcData);
      alert(toPersianDigits("محتوای شما برای بررسی ارسال شد. متشکریم!")); // Simulate success
    }
    setShowUGCModal(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 p-1 sm:p-0">
      <Breadcrumbs segments={breadcrumbSegments} className="mb-2 sm:mb-4" />
      
      <LearningProgressDashboard 
        isLoadingData={isLoadingData} 
        learningPaths={paths} 
        learningContent={contentItems} 
        bookmarkedContentIds={bookmarkedContentIds}
        earnedBadges={earnedBadges}
        userProgress={userProgress}
        onNavigateToSkillsMap={onNavigateToSkillsMap} 
        onNavigateToAchievements={onNavigateToAchievements}
        ai360FeedbackItems={ai360FeedbackItems} 
        onNavigateToSimulator={onNavigateToSimulator} 
        onNavigateToCreativeWorkspace={onNavigateToCreativeWorkspace} 
        predictiveSkills={predictiveSkills}
        onViewLearningPath={onViewLearningPath}
        onOpenLearningReportModal={onOpenLearningReportModal}
      />
      
      <div className="my-4 sm:my-6">
        <WeeklyChallengeWidget challenge={activeWeeklyChallenge} onStartChallenge={onStartChallenge} onAwardPoints={onAwardPoints} />
      </div>
      
      <div className="my-4 sm:my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
         {onNavigateToJournal && ( <button onClick={onNavigateToJournal} className={`bg-purple-500 hover:bg-purple-600 text-white font-medium py-2.5 px-5 rounded-lg text-xs sm:text-sm transition-colors flex items-center justify-center w-full shadow-md`} > <JournalIcon className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0"/> {toPersianDigits("دفترچه یادداشت")} </button> )}
         {onNavigateToForum && ( <button onClick={onNavigateToForum} className={`bg-teal-500 hover:bg-teal-600 text-white font-medium py-2.5 px-5 rounded-lg text-xs sm:text-sm transition-colors flex items-center justify-center w-full shadow-md`} > <ForumIconIcon className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0"/> {toPersianDigits("انجمن و رویدادها")} </button> )}
      </div>

      {hyperPersonalizedContent.length > 0 && !isLoadingData && (
        <section className="mb-6 sm:mb-8 p-4 sm:p-5 bg-white rounded-xl shadow-lg border border-gray-200/80">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center"> <SparklesIconNav className={`w-6 h-6 text-yellow-500 ml-2 rtl:mr-2 rtl:ml-0`} /> {toPersianDigits(`ویژه شما: پیشنهادات یادگیری این هفته از ${aiAssistantName}`)} </h2>
          <div className="flex overflow-x-auto space-x-4 space-x-reverse pb-2 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-sky-100">
            {hyperPersonalizedContent.map(content => (
              <div key={content.id} className="flex-shrink-0 w-64">
                <LearningContentCard content={content} onToggleBookmark={onToggleBookmark} isBookmarked={bookmarkedContentIds.has(content.id)} viewMode="grid" searchTerm="" />
                {content.aiRationale && ( <p className="text-xs text-gray-500 mt-1.5 p-1 bg-sky-50 rounded-md border border-sky-100 leading-relaxed"> <LightbulbIcon className="w-3 h-3 inline mr-1 rtl:ml-1 rtl:mr-0 text-yellow-600" /> {toPersianDigits(content.aiRationale)} </p> )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="bg-white p-4 sm:p-5 rounded-xl shadow-lg border border-gray-200/80">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
          {/* Search Bar (same as before) */}
           <div className="relative w-full sm:flex-grow">
            <input type="text" placeholder={toPersianDigits("جستجو در مسیرها و محتوا...")} value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setShowSearchSuggestions(true); }} onFocus={() => setShowSearchSuggestions(true)} onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 150)} className={`w-full p-2.5 pr-10 rtl:pl-10 rtl:pr-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm`} aria-label={toPersianDigits("جستجو")} />
            <div className={`absolute inset-y-0 right-0 rtl:left-0 rtl:right-auto flex items-center pr-3 rtl:pl-3 pointer-events-none text-gray-400`}> <SearchIcon className="w-5 h-5" /> </div>
            {showSearchSuggestions && searchSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                {searchSuggestions.map(suggestion => (
                  <li key={`${suggestion.type}-${suggestion.id}`} onClick={() => { setSearchTerm(suggestion.title); setShowSearchSuggestions(false);}} className="px-3 py-2 text-sm text-gray-700 hover:bg-sky-50 cursor-pointer" >
                    {toPersianDigits(suggestion.title)}
                    <span className="text-xs text-gray-400 ml-2 rtl:mr-2 rtl:ml-0">({suggestion.type === 'path' ? toPersianDigits('مسیر') : suggestion.type === 'content' ? toPersianDigits('محتوا') : toPersianDigits('محتوای کاربر')})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={`w-full sm:w-auto flex items-center justify-center text-sm py-2.5 px-4 rounded-full transition-colors ${showFilters ? `bg-sky-600 text-white` : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} shadow-sm`} aria-expanded={showFilters} aria-controls="filter-panel" > <FilterAdjustIcon className={`w-5 h-5 ml-1.5 rtl:mr-1.5 rtl:ml-0`} /> {toPersianDigits("فیلترها")} {showFilters ? <ChevronUpIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0"/> : <ChevronDownIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0"/>} </button>
        </div>

        {showFilters && ( <div id="filter-panel" className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4 space-y-4"> {/* Filter UI (same as before, ensure contentTypeOptions includes UGC) */} 
            <div> <h4 className="text-sm font-semibold text-gray-700 mb-2">{toPersianDigits("دسته‌بندی‌ها:")}</h4> <div className="flex flex-wrap gap-2"> {categories.map(cat => ( <LearningCategoryCard key={cat.id} category={cat} onSelectCategory={toggleCategoryFilter} isSelected={selectedCategoryIds.has(cat.id)} viewMode="list" /> ))} </div> </div>
            <div> <h4 className="text-sm font-semibold text-gray-700 mb-2">{toPersianDigits("ارتباط با اهداف:")}</h4> <div className="flex flex-wrap gap-2"> {goalRelevanceFilters.map(filter => ( <button key={filter.id} onClick={() => toggleGoalRelevanceFilter(filter.id)} className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${selectedGoalRelevanceIds.has(filter.id) ? `bg-sky-600 text-white border-sky-700` : 'bg-white text-gray-600 border-gray-300 hover:border-sky-400'}`} aria-pressed={selectedGoalRelevanceIds.has(filter.id)} > {toPersianDigits(filter.name)} </button> ))} </div> </div>
            <div> <label htmlFor="contentTypeFilter" className="text-sm font-semibold text-gray-700 mb-1 block">{toPersianDigits("نوع محتوا:")}</label> <select id="contentTypeFilter" value={selectedContentType} onChange={(e) => setSelectedContentType(e.target.value as ContentTypeFilter)} className={`w-full sm:w-auto p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sky-400`} > {contentTypeOptions.map(opt => ( <option key={opt.value} value={opt.value}>{opt.label}</option> ))} </select> </div>
            {(selectedCategoryIds.size > 0 || selectedGoalRelevanceIds.size > 0 || selectedContentType !== 'all' || searchTerm) && ( <button onClick={clearAllFilters} className="text-xs text-red-600 hover:text-red-800 flex items-center"> <XCircleIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" /> {toPersianDigits("پاک کردن همه فیلترها")} </button> )}
        </div> )}

        {/* Learning Paths Section (same as before) */}
        <section className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-3"> <h3 className="text-lg font-semibold text-gray-800 flex items-center"> <AcademicCapIcon className={`w-6 h-6 text-sky-600 ml-2 rtl:mr-2 rtl:ml-0`}/> {toPersianDigits("مسیرهای یادگیری")} </h3> <div className="flex items-center space-x-1 space-x-reverse bg-gray-100 rounded-full p-0.5"> <button onClick={() => setPathViewMode('grid')} className={`p-1.5 rounded-full ${pathViewMode === 'grid' ? `bg-sky-600 text-white shadow-sm` : 'text-gray-500 hover:bg-gray-200'}`} aria-label={toPersianDigits("نمایش شبکه‌ای")}><GridIcon className="w-4 h-4"/></button> <button onClick={() => setPathViewMode('list')} className={`p-1.5 rounded-full ${pathViewMode === 'list' ? `bg-sky-600 text-white shadow-sm` : 'text-gray-500 hover:bg-gray-200'}`} aria-label={toPersianDigits("نمایش لیستی")}><ListIcon className="w-4 h-4"/></button> </div> </div>
          {isLoadingData ? ( <div className={`grid gap-4 sm:gap-5 ${pathViewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}> {[...Array(3)].map((_, i) => <SkeletonPathCard key={i} viewMode={pathViewMode} />)} </div> ) : filteredPaths.length > 0 ? ( <div className={`grid gap-4 sm:gap-5 ${pathViewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}> {filteredPaths.map(path => <LearningPathCard key={path.id} path={path} onSelectPath={onSelectPath} viewMode={pathViewMode} searchTerm={searchTerm} />)} </div> ) : ( <p className="text-sm text-gray-500 text-center py-4">{toPersianDigits("هیچ مسیر یادگیری با فیلترهای فعلی یافت نشد.")}</p> )}
        </section>

        {/* Learning Content Section */}
        <section>
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <BookIcon className={`w-6 h-6 text-sky-600 ml-2 rtl:mr-2 rtl:ml-0`}/>
                    {selectedContentType === 'ugc' ? toPersianDigits("محتوای تولید شده توسط کاربران") : toPersianDigits("محتوای آموزشی")}
                </h3>
                <div className="flex items-center gap-2">
                    {onSubmitUGC && (
                        <button onClick={() => setShowUGCModal(true)} className="flex items-center text-xs bg-green-500 hover:bg-green-600 text-white py-1.5 px-3 rounded-md transition-colors">
                            <PencilSquareIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("ارسال محتوا")}
                        </button>
                    )}
                    <div className="flex items-center space-x-1 space-x-reverse bg-gray-100 rounded-full p-0.5">
                        <button onClick={() => setContentViewMode('grid')} className={`p-1.5 rounded-full ${contentViewMode === 'grid' ? `bg-sky-600 text-white shadow-sm` : 'text-gray-500 hover:bg-gray-200'}`} aria-label={toPersianDigits("نمایش شبکه‌ای")}><GridIcon className="w-4 h-4"/></button>
                        <button onClick={() => setContentViewMode('list')} className={`p-1.5 rounded-full ${contentViewMode === 'list' ? `bg-sky-600 text-white shadow-sm` : 'text-gray-500 hover:bg-gray-200'}`} aria-label={toPersianDigits("نمایش لیستی")}><ListIcon className="w-4 h-4"/></button>
                    </div>
                </div>
            </div>
           {isLoadingData ? ( <div className={`grid gap-3 sm:gap-4 ${contentViewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}> {[...Array(contentViewMode === 'grid' ? 4 : 3)].map((_, i) => <SkeletonContentCard key={i} viewMode={contentViewMode} />)} </div>
          ) : displayableContent.length > 0 ? (
            <div className={`grid gap-3 sm:gap-4 ${contentViewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
              {displayableContent.map(content => <LearningContentCard key={content.id} content={content as any} onToggleBookmark={onToggleBookmark} isBookmarked={bookmarkedContentIds.has(content.id)} viewMode={contentViewMode} searchTerm={searchTerm} />)}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">{toPersianDigits("هیچ محتوایی با فیلترهای فعلی یافت نشد.")}</p>
          )}
        </section>
      </div>
      {onSubmitUGC && (
        <UGCSubmissionFormModal 
            isOpen={showUGCModal}
            onClose={() => setShowUGCModal(false)}
            onSubmitUGC={handleUGCSubmit}
        />
      )}
    </div>
  );
};

export default LearningLibrary;