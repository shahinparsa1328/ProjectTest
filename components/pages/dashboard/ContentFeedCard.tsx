
import React from 'react';
import { toPersianDigits } from '../../../utils';
import { LinkIcon, BookmarkIcon, FilmIcon, BookIcon as ArticleIcon, SparklesIconNav as TipIcon } from '../../shared/AppIcons';

export interface PersonalizedContentItem {
  id: string;
  type: 'article' | 'video' | 'podcast' | 'course' | 'tip';
  title: string;
  source: string;
  thumbnailUrl?: string; 
  url: string; 
}

interface ContentFeedCardProps {
  item: PersonalizedContentItem;
}

const ContentFeedCard: React.FC<ContentFeedCardProps> = ({ item }) => {
  const getIconForType = (type: PersonalizedContentItem['type']) => {
    switch (type) {
      case 'article':
        return <ArticleIcon className="w-8 h-8 text-sky-400" />;
      case 'video':
        return <FilmIcon className="w-8 h-8 text-red-400" />;
      case 'podcast':
        // Using a generic icon for podcast for now, can be replaced with a specific one
        return <svg className="w-8 h-8 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>;
      case 'course':
        return <FilmIcon className="w-8 h-8 text-orange-400" />;
      case 'tip':
        return <TipIcon className="w-8 h-8 text-yellow-400" />;
      default:
        return <LinkIcon className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <div className="bg-slate-700/60 p-4 rounded-lg shadow-md border border-slate-600 flex flex-col flex-shrink-0 w-60 md:w-64 h-[280px] hover:border-sky-600/70 transition-all duration-300 group">
      {item.thumbnailUrl ? (
        <img src={item.thumbnailUrl} alt={toPersianDigits(item.title)} className="w-full h-32 object-cover rounded-md mb-3 group-hover:opacity-90 transition-opacity" />
      ) : (
        <div className="w-full h-32 bg-slate-600/70 rounded-md mb-3 flex items-center justify-center group-hover:bg-slate-600 transition-colors">
          {getIconForType(item.type)}
        </div>
      )}
      <h4 className="text-sm font-semibold text-sky-300 mb-1.5 flex-grow min-h-[40px] line-clamp-2 leading-tight">{toPersianDigits(item.title)}</h4>
      <p className="text-xs text-gray-400 mb-3 truncate">{toPersianDigits(`منبع: ${item.source}`)}</p>
      <div className="mt-auto flex justify-between items-center text-xs">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center py-1.5 px-3 bg-sky-600 hover:bg-sky-500 text-white rounded-md transition-colors text-[11px]"
          aria-label={`${toPersianDigits("مشاهده")} ${toPersianDigits(item.title)}`}
        >
          <LinkIcon className="w-3.5 h-3.5 mr-1.5" />
          {toPersianDigits("مشاهده")}
        </a>
        <button 
          onClick={() => console.log('Save item:', item.id)}
          className="flex items-center py-1.5 px-3 bg-slate-500 hover:bg-slate-400 text-gray-200 rounded-md transition-colors text-[11px]"
          aria-label={`${toPersianDigits("ذخیره")} ${toPersianDigits(item.title)}`}
        >
          <BookmarkIcon className="w-3.5 h-3.5 mr-1.5" />
          {toPersianDigits("ذخیره")}
        </button>
      </div>
    </div>
  );
};

export default ContentFeedCard;
