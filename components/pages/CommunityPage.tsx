
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toPersianDigits, parseJsonFromString } from '../../utils';
import { 
    UsersIcon as PageIcon,
    LightbulbIcon, 
    HeartIcon, 
    UserGroupIcon as GrowthIcon,
    UserCircleIcon, 
    PencilSquareIcon,
    ChatBubbleOvalLeftEllipsisIcon as ForumIcon, 
    SparklesIconNav as AIWelcomeIcon,
    StarIcon,
    PlusIcon as AddTopicIcon,
    CogIcon,
    FolderIcon,
    TargetIcon,
    AcademicCapIcon, 
    UserPlusIcon,    
    UserMinusIcon,   
    RssIcon,         
    ChevronDownIcon,
    ChevronUpIcon,
    UserGroupIcon, 
    BoldIcon,
    ItalicIcon,
    ListUnorderedIcon,
    ListOrderedIcon,
    LinkIcon,
    QuoteIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    TagIcon,
    SparklesIconNav, 
    XMarkIcon,
    ClipboardDocumentCheckIcon,
    CalendarDaysIcon,
    MegaphoneIcon,
    TrophyIcon,
    ShieldExclamationIcon,
    PaperClipIcon,
    ListIcon as ListBulletIcon,
} from '../shared/AppIcons';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PageName } from '../../App';
import CollapsibleSection from '../shared/CollapsibleSection';
import ForumCategoryCard, { ForumCategory } from '../community/ForumCategoryCard'; 
import { IconProps } from '../shared/AppIcons'; 
import { 
    CommunityUserProfile, BasicUser, CommunityActivityFeedItem, ForumTopic, ForumPost, ForumReply,
    Group, UserTemplate, TemplateComment, CommunityEvent, CommunityChallenge // New types
} from '../../types/communityTypes';
import { Badge, Skill } from '../../types/learningTypes'; 
import LoadingSpinner from '../shared/LoadingSpinner';

const AI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
const CURRENT_USER_ID_PLACEHOLDER = "currentUser";


// Basic HTML Sanitizer
const allowedTags = ['b', 'strong', 'i', 'em', 'ul', 'ol', 'li', 'a', 'blockquote', 'p', 'br', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'img', 'figure', 'figcaption'];
const allowedAttributes = ['href', 'target', 'rel', 'src', 'alt', 'title', 'style', 'class'];

const sanitizeHtml = (htmlString: string): string => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    const sanitizeNode = (node: Node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            if (!allowedTags.includes(element.tagName.toLowerCase())) {
                 while (element.firstChild) {
                    element.parentNode?.insertBefore(element.firstChild, element);
                }
                element.parentNode?.removeChild(element);
                return;
            }
            
            const attributes = Array.from(element.attributes);
            attributes.forEach(attr => {
                if (!allowedAttributes.includes(attr.name.toLowerCase()) && !attr.name.startsWith('data-')) {
                    element.removeAttribute(attr.name);
                }
                if (attr.name.toLowerCase() === 'href' && (attr.value.startsWith('javascript:') || !attr.value.match(/^(https?:\/\/|mailto:|\/|#)/))) {
                     element.removeAttribute(attr.name);
                }
                if (attr.name.toLowerCase() === 'style') { // Basic style sanitization
                    const styles = element.style;
                    const allowedStyles = ['color', 'background-color', 'text-align', 'font-weight', 'font-style', 'text-decoration', 'margin-left', 'margin-right', 'padding-left', 'padding-right'];
                    let newStyle = '';
                    for (const s of allowedStyles) {
                        if (styles.getPropertyValue(s)) {
                            newStyle += `${s}: ${styles.getPropertyValue(s)}; `;
                        }
                    }
                    element.setAttribute('style', newStyle.trim());
                }
            });
        }
        Array.from(node.childNodes).forEach(sanitizeNode);
    };

    sanitizeNode(tempDiv);
    return tempDiv.innerHTML;
};


const mockForumCategories: ForumCategory[] = [ /* ... same as before ... */ ];
const mockBadges: Badge[] = [ /* ... same as before ... */ ];
const mockSkills: Skill[] = [ /* ... same as before ... */ ];


export interface CommunityPageProps {
    userName: string;
    navigateTo: (page: PageName | string, params?: any) => void;
    showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
    geminiAIInstance?: GoogleGenAI | null;
    earnedBadges?: Badge[]; 
    skills?: Skill[];       
}


export const CommunityPage: React.FC<CommunityPageProps> = ({ 
    userName, navigateTo, showToast, geminiAIInstance,
    earnedBadges: propEarnedBadges = [], 
    skills: propSkills = []             
}) => {
  const ai = geminiAIInstance || (process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null);
  
  // Existing States
  const [communityProfileData, setCommunityProfileData] = useState<CommunityUserProfile>(() => {
      const saved = localStorage.getItem('communityUserProfile_v1');
      return saved ? JSON.parse(saved) : { id: CURRENT_USER_ID_PLACEHOLDER, userName: userName, seekingHelpIn: [], canHelpWith: [], joinedGroupIds: [] };
  });
  const [friendsList, setFriendsList] = useState<BasicUser[]>(() => {
      const saved = localStorage.getItem('communityFriendsList_v1');
      return saved ? JSON.parse(saved) : [{id: 'friend1', name: toPersianDigits("همیار نمونه ۱"), avatarUrl: `https://picsum.photos/seed/${Math.random()}/40`}];
  });
  const [friendActivities, setFriendActivities] = useState<CommunityActivityFeedItem[]>([]);
  const [isProfileSectionOpen, setIsProfileSectionOpen] = useState(false);
  const [isNetworkSectionOpen, setIsNetworkSectionOpen] = useState(false);
  const [isFeedSectionOpen, setIsFeedSectionOpen] = useState(false);
  const [newSeekingHelp, setNewSeekingHelp] = useState('');
  const [newCanHelp, setNewCanHelp] = useState('');
  
  // Forum States
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>(() => {
    const savedTopics = localStorage.getItem('forumTopics_v3'); // Updated key for new structure
    return savedTopics ? JSON.parse(savedTopics) : [];
  });
  const [isForumSectionOpen, setIsForumSectionOpen] = useState(true);
  const [showCreateTopicForm, setShowCreateTopicForm] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');
  const [newTopicTags, setNewTopicTags] = useState('');
  const [currentReplyingTopicId, setCurrentReplyingTopicId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const richTextEditorRef = useRef<HTMLDivElement>(null);
  const replyRichTextEditorRef = useRef<HTMLDivElement>(null);

  // Phase 2.3: Specialized Groups States
  const [groups, setGroups] = useState<Group[]>(() => {
    const saved = localStorage.getItem('communityGroups_v1');
    return saved ? JSON.parse(saved) : [];
  });
  const [isGroupsSectionOpen, setIsGroupsSectionOpen] = useState(false);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupIsPrivate, setNewGroupIsPrivate] = useState(false);
  const [newGroupTags, setNewGroupTags] = useState('');
  const [aiGroupSuggestions, setAiGroupSuggestions] = useState<Group[]>([]); // Mocked

  // Phase 2.4: UGC Templates States
  const [userTemplates, setUserTemplates] = useState<UserTemplate[]>(() => {
    const saved = localStorage.getItem('communityTemplates_v1');
    return saved ? JSON.parse(saved) : [];
  });
  const [isTemplatesSectionOpen, setIsTemplatesSectionOpen] = useState(false);
  const [showSubmitTemplateForm, setShowSubmitTemplateForm] = useState(false);
  // Add state for new template form fields if needed (e.g., title, description, type, content, tags)

  // Phase 2.5: Events & Challenges States
  const [communityEvents, setCommunityEvents] = useState<CommunityEvent[]>(() => {
    const saved = localStorage.getItem('communityEvents_v1');
    return saved ? JSON.parse(saved) : [];
  });
  const [communityChallenges, setCommunityChallenges] = useState<CommunityChallenge[]>(() => {
    const saved = localStorage.getItem('communityChallenges_v1');
    return saved ? JSON.parse(saved) : [];
  });
  const [isEventsChallengesSectionOpen, setIsEventsChallengesSectionOpen] = useState(false);
  // Add state for event/challenge creation forms

  const displayBadges = propEarnedBadges.length > 0 ? propEarnedBadges : mockBadges;
  const displaySkills = propSkills.length > 0 ? propSkills : mockSkills;
  
  // useEffect for localStorage persistence (add new states here)
  useEffect(() => { localStorage.setItem('communityUserProfile_v1', JSON.stringify(communityProfileData)); }, [communityProfileData]);
  useEffect(() => { localStorage.setItem('communityFriendsList_v1', JSON.stringify(friendsList)); }, [friendsList]);
  useEffect(() => { localStorage.setItem('forumTopics_v3', JSON.stringify(forumTopics)); }, [forumTopics]);
  useEffect(() => { localStorage.setItem('communityGroups_v1', JSON.stringify(groups)); }, [groups]);
  useEffect(() => { localStorage.setItem('communityTemplates_v1', JSON.stringify(userTemplates)); }, [userTemplates]);
  useEffect(() => { localStorage.setItem('communityEvents_v1', JSON.stringify(communityEvents)); }, [communityEvents]);
  useEffect(() => { localStorage.setItem('communityChallenges_v1', JSON.stringify(communityChallenges)); }, [communityChallenges]);

  // --- Existing Handlers (Profile, Forum, etc.) ---
  const formatText = (command: string, valueArg?: string) => { /* ... same as before ... */ };
  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => { /* ... same as before ... */ };
  const handleCreateTopic = () => { /* ... same as before ... */ };
  const handleAddReply = (topicId: string) => { /* ... same as before ... */ };
  const handleVote = (itemId: string, itemType: 'topic' | 'reply', voteType: 'up' | 'down', topicId?: string) => { /* ... same as before ... */ };
  const handleAISummarize = async (topicId: string) => { /* ... same as before ... */ };

  // --- Phase 2.3: Specialized Groups Handlers ---
  const handleCreateGroup = () => {
    if (!newGroupName.trim() || !newGroupDescription.trim()) {
      showToast(toPersianDigits("نام و توضیحات گروه الزامی است."), "error");
      return;
    }
    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name: newGroupName,
      description: newGroupDescription,
      creatorId: CURRENT_USER_ID_PLACEHOLDER,
      creatorName: userName,
      isPrivate: newGroupIsPrivate,
      memberIds: [CURRENT_USER_ID_PLACEHOLDER],
      adminIds: [CURRENT_USER_ID_PLACEHOLDER],
      tags: newGroupTags.split(',').map(t => t.trim()).filter(Boolean),
      creationTimestamp: new Date().toISOString(),
    };
    setGroups(prev => [newGroup, ...prev]);
    // Simulate adding to user's joined groups
    setCommunityProfileData(prev => ({...prev, joinedGroupIds: [...(prev.joinedGroupIds || []), newGroup.id]}));
    setShowCreateGroupForm(false);
    setNewGroupName(''); setNewGroupDescription(''); setNewGroupIsPrivate(false); setNewGroupTags('');
    showToast(toPersianDigits(`گروه "${newGroup.name}" ایجاد شد. (شبیه‌سازی تایید مدیر)`), "success");
  };

  // --- Phase 2.4: UGC Templates Handlers ---
  // Placeholder for handleSubmitTemplate, handleRateTemplate, handleAddTemplateComment

  // --- Phase 2.5: Events & Challenges Handlers ---
  // Placeholder for handleCreateEvent, handleCreateChallenge, handleJoinEvent, handleJoinChallenge

  // --- Phase 2.6: AI Facilitation Logic (Simulated) ---
  const identifyExpertsForTopic = (topicTags: string[]): BasicUser[] => {
    // Simulated: find users whose `canHelpWith` matches topic tags
    const experts: BasicUser[] = [];
    // In a real app, you'd iterate through all user profiles. For now, check current user and mock friends.
    if (communityProfileData.canHelpWith?.some(skill => topicTags.includes(skill))) {
      experts.push({ id: communityProfileData.id, name: userName, avatarUrl: `https://picsum.photos/seed/${userName}/40` });
    }
    friendsList.forEach(friend => {
      // Simulate friends having skills - in real app this data would be fetched
      const mockFriendSkills = Math.random() > 0.5 ? topicTags.slice(0,1) : [];
      if (mockFriendSkills.some(skill => topicTags.includes(skill))) {
        experts.push(friend);
      }
    });
    return experts.slice(0,2); // Limit to 2 for display
  };

  const flagInappropriateContent = async (content: string, itemId: string, itemType: 'topic' | 'post') => {
    // Simulated AI check
    const keywords = ["نامناسب", "توهین", "اسپم"];
    const isFlagged = keywords.some(kw => content.toLowerCase().includes(kw));
    if (isFlagged) {
      showToast(toPersianDigits(`محتوا برای "${itemId}" به دلیل احتمال نامناسب بودن برای بازبینی پرچم‌گذاری شد.`), "warning");
      // In a real app, update state of the item:
      // setForumTopics(prev => prev.map(t => t.id === itemId ? {...t, aiFlaggedStatus: 'pending_review'} : t)); // for topic
      // or find reply in topic and update for posts
    }
    return isFlagged;
  };

  const generatePersonalizedActivityFeed = useCallback(() => {
    // Simulate more personalized feed
    const activities: CommunityActivityFeedItem[] = [];
    // 1. Friend activities (Simplified - should be real data)
    friendsList.forEach(friend => {
        if (Math.random() < 0.3) {
            activities.push({
                id: `act-friend-${friend.id}-${Date.now()}`, userId: friend.id, userName: friend.name, userAvatarUrl: friend.avatarUrl,
                activityText: toPersianDigits(`یک پست جدید در انجمن "بحث آزاد" ایجاد کرد.`), timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
                link: '#', relatedContentType: 'forum_topic'
            });
        }
    });

    // 2. Activities from joined groups
    (communityProfileData.joinedGroupIds || []).forEach(groupId => {
        const group = groups.find(g => g.id === groupId);
        if (group && Math.random() < 0.5) {
             const randomTopic = forumTopics.find(ft => ft.groupId === groupId) || forumTopics.find(ft => Math.random() < 0.1); // find a topic in this group or a random one
             if (randomTopic) {
                activities.push({
                    id: `act-group-${group.id}-${Date.now()}`, groupName: group.name, groupId: group.id,
                    activityText: toPersianDigits(`بحث جدیدی در گروه "${group.name}" با عنوان "${randomTopic.title}" آغاز شد.`),
                    timestamp: randomTopic.creationTimestamp, link: '#', relatedContentType: 'forum_topic', relatedContentId: randomTopic.id
                });
            }
        }
    });
    
    // 3. New popular templates matching user interests (simulated)
    const userInterests = communityProfileData.interests || [];
    userTemplates.filter(t => t.status === 'approved' && (t.averageRating || 0) > 4).forEach(template => {
        if (userInterests.some(interest => template.tags.includes(interest)) && Math.random() < 0.2) {
             activities.push({
                id: `act-template-${template.id}-${Date.now()}`,
                activityText: toPersianDigits(`الگوی محبوب جدید: "${template.title}" در دسته "${template.type}"`),
                timestamp: template.submissionDate, link: '#', relatedContentType: 'template', relatedContentId: template.id
            });
        }
    });

    // 4. New relevant events/challenges (simulated)
    [...communityEvents, ...communityChallenges].forEach(item => {
         if (Math.random() < 0.15) { // Randomly pick some
            activities.push({
                id: `act-item-${item.id}-${Date.now()}`,
                activityText: toPersianDigits(`${'goalDescription' in item ? "چالش" : "رویداد"} جدید: "${item.title}"`),
                timestamp: new Date().toISOString(), // Use current time for new items for simplicity
                link: '#', relatedContentType: 'goalDescription' in item ? 'challenge' : 'event', relatedContentId: item.id
            });
        }
    });


    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setFriendActivities(activities.slice(0, 10)); // Show top 10
  }, [friendsList, communityProfileData.joinedGroupIds, communityProfileData.interests, groups, userTemplates, communityEvents, communityChallenges, forumTopics]);


  useEffect(() => {
    generatePersonalizedActivityFeed();
  }, [generatePersonalizedActivityFeed]);


  const filteredTopics = forumTopics.filter(topic => { /* ... same as before ... */ }).sort((a, b) => new Date(b.lastActivityTimestamp).getTime() - new Date(a.lastActivityTimestamp).getTime());

  // UI Rendering for new sections
  const renderGroupsSection = () => (
    <CollapsibleSection title={toPersianDigits("گروه‌های تخصصی")} icon={<FolderIcon />} isOpen={isGroupsSectionOpen} onToggle={() => setIsGroupsSectionOpen(!isGroupsSectionOpen)}>
        <button onClick={() => setShowCreateGroupForm(true)} className="btn-primary-green text-xs mb-2">ایجاد گروه جدید</button>
        {showCreateGroupForm && ( /* Form for creating group */ <div>...</div> )}
        {/* List Groups */}
        {groups.length === 0 ? <p className="text-xs text-gray-500">هنوز گروهی ایجاد نشده.</p> : 
         groups.map(group => <div key={group.id} className="p-2 border rounded my-1 text-xs"><strong>{group.name}</strong> ({group.memberIds.length} عضو) - {group.description}</div>)
        }
        {/* AI Group Suggestions */}
    </CollapsibleSection>
  );

  const renderTemplatesSection = () => (
    <CollapsibleSection title={toPersianDigits("الگوهای اشتراک گذاشته شده (UGC)")} icon={<ClipboardDocumentCheckIcon />} isOpen={isTemplatesSectionOpen} onToggle={() => setIsTemplatesSectionOpen(!isTemplatesSectionOpen)}>
       <button onClick={() => setShowSubmitTemplateForm(true)} className="btn-primary-green text-xs mb-2">ارسال الگوی جدید</button>
       {showSubmitTemplateForm && ( /* Form for submitting template */ <div>...</div> )}
       {/* List User Templates */}
       {userTemplates.filter(t => t.status === 'approved').length === 0 ? <p className="text-xs text-gray-500">هنوز الگویی تایید نشده.</p> :
        userTemplates.filter(t => t.status === 'approved').map(template => <div key={template.id} className="p-2 border rounded my-1 text-xs"><strong>{template.title}</strong> (امتیاز: {template.averageRating || 'N/A'}) - {template.description}</div>)
       }
    </CollapsibleSection>
  );

  const renderEventsChallengesSection = () => (
     <CollapsibleSection title={toPersianDigits("رویدادها و چالش‌های گروهی")} icon={<CalendarDaysIcon />} isOpen={isEventsChallengesSectionOpen} onToggle={() => setIsEventsChallengesSectionOpen(!isEventsChallengesSectionOpen)}>
        {/* UI for Events */}
        {/* UI for Challenges */}
        <p className="text-xs text-gray-500">بخش رویدادها و چالش‌ها در اینجا نمایش داده خواهد شد.</p>
    </CollapsibleSection>
  );


  return (
    <div className="page bg-gray-50">
      {/* Header and AI Welcome Card (same as before) */}
      <header className="text-center mb-6 p-4 bg-gradient-to-br from-emerald-600 to-green-700 rounded-b-xl shadow-lg text-white">
        <PageIcon className="w-10 h-10 mx-auto mb-2" />
        <h1 className="text-xl font-bold">{toPersianDigits("به ارکستر همدلی و رشد بپیوندید")}</h1>
        <p className="text-xs opacity-90">{toPersianDigits(`جامعه هوشمند شما برای اشتراک و پیشرفت، ${userName}.`)}</p>
      </header>

      {/* Existing Profile Section */}
      <CollapsibleSection title={toPersianDigits("پروفایل پیشرفته من")} icon={<UserCircleIcon className="w-5 h-5 text-emerald-600"/>} isOpen={isProfileSectionOpen} onToggle={() => setIsProfileSectionOpen(!isProfileSectionOpen)} className="mb-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200/80" titleColorClass="text-md font-semibold text-gray-700">
            <p className="text-xs text-gray-500">{toPersianDigits("جزئیات پروفایل در اینجا نمایش داده می‌شود...")}</p>
      </CollapsibleSection>

      {/* Community Forums - Enhanced */}
      <CollapsibleSection title={toPersianDigits("انجمن‌های گفتگو")} icon={<ForumIcon className="w-5 h-5 text-emerald-600"/>} isOpen={isForumSectionOpen} onToggle={() => setIsForumSectionOpen(!isForumSectionOpen)} className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200/80" titleColorClass="text-md font-semibold text-gray-700">
        {/* ... Forum UI and logic from previous step, with potential for expert tags and content flags ... */}
        <p className="text-xs text-gray-500">{toPersianDigits("انجمن‌های گفتگو با قابلیت‌های پیشرفته در اینجا نمایش داده می‌شوند.")}</p>
         {filteredTopics.map(topic => (
          <div key={topic.id} className="border-b py-2">
            <h5 className="text-sm font-bold">{topic.title}</h5>
            {identifyExpertsForTopic(topic.tags).map(expert => (
              <span key={expert.id} className="text-xs bg-yellow-200 text-yellow-800 px-1 rounded-full mr-1">{expert.name} (کارشناس)</span>
            ))}
            <div dangerouslySetInnerHTML={{__html: sanitizeHtml(topic.content)}} className="text-xs"/>
            <button onClick={() => flagInappropriateContent(topic.content, topic.id, 'topic')} className="text-xs text-red-500">پرچم‌گذاری (شبیه‌سازی)</button>
          </div>
        ))}
      </CollapsibleSection>
      
      {/* NEW SECTIONS */}
      {renderGroupsSection()}
      {renderTemplatesSection()}
      {renderEventsChallengesSection()}

      {/* Enhanced Activity Feed Section */}
       <CollapsibleSection title={toPersianDigits("فید فعالیت شخصی‌سازی شده شما")} icon={<RssIcon className="w-5 h-5 text-emerald-600"/>} isOpen={isFeedSectionOpen} onToggle={() => setIsFeedSectionOpen(!isFeedSectionOpen)} className="mb-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200/80" titleColorClass="text-md font-semibold text-gray-700">
        {friendActivities.length === 0 ? <p className="text-xs text-gray-500 text-center py-2">{toPersianDigits("فعالیت جدیدی برای نمایش وجود ندارد.")}</p> : (
          <ul className="space-y-2 max-h-80 overflow-y-auto scrollbar-thin">
            {friendActivities.map(activity => (
              <li key={activity.id} className="p-2 bg-gray-50 rounded-md text-xs">
                <div className="flex items-center">
                  {activity.userAvatarUrl && <img src={activity.userAvatarUrl} alt={activity.userName} className="w-6 h-6 rounded-full mr-2"/>}
                  <p>
                    {activity.userName && <strong className="text-emerald-700">{toPersianDigits(activity.userName)} </strong>}
                    {toPersianDigits(activity.activityText)}
                  </p>
                </div>
                <span className="text-[10px] text-gray-400 block text-left">{toPersianDigits(new Date(activity.timestamp).toLocaleTimeString('fa-IR'))}</span>
              </li>
            ))}
          </ul>
        )}
      </CollapsibleSection>

      <p className="text-xs text-gray-500 text-center mt-6">{toPersianDigits("سایر بخش‌های صفحه انجمن (چرا جامعه، شروع سریع، دسته‌بندی انجمن‌ها) در اینجا قرار می‌گیرند.")}</p>
    </div>
  );
};
export default CommunityPage;
