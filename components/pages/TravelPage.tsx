
import React, { useState, useEffect } from 'react';
import { toPersianDigits } from '../../utils';
import { 
  GlobeAltIcon as PageIcon, 
  SearchIcon, // Corrected: Was MagnifyingGlassIcon
  MapPinIcon, 
  CalendarDaysIcon,
  SparklesIconNav as AiIcon,
  PlusIcon
} from '../shared/AppIcons';
import { PageName } from '../../App'; // Assuming PageName is in App.tsx

interface TravelPageProps {
  userName: string;
  navigateTo: (page: PageName | string, params?: any) => void;
}

const TravelPage: React.FC<TravelPageProps> = ({ userName, navigateTo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [destinationIdeas, setDestinationIdeas] = useState<any[]>([]); // Replace any with actual type
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder for fetching travel ideas or itineraries
  useEffect(() => {
    // Simulate fetching data
    // setDestinationIdeas([...mockData]);
  }, []);

  const handleSearch = () => {
    // Placeholder for search functionality
    alert(toPersianDigits(`جستجو برای: ${searchTerm}`));
  };

  return (
    <div className="page bg-travel-page">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="flex items-center mb-3 sm:mb-0">
          <PageIcon className="w-7 h-7 text-blue-600 mr-3 rtl:ml-3 rtl:mr-0" />
          <h1 className="text-2xl font-semibold text-gray-800">{toPersianDigits("سفر، اوقات فراغت و تجربیات")}</h1>
        </div>
        <button
          onClick={() => alert(toPersianDigits("افزودن برنامه سفر جدید (به زودی)"))}
          className="w-full sm:w-auto flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors shadow hover:shadow-md"
        >
          <PlusIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
          {toPersianDigits("برنامه سفر جدید")}
        </button>
      </header>

      <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
          <AiIcon className="w-5 h-5 text-yellow-500 mr-2 rtl:ml-2 rtl:mr-0" />
          {toPersianDigits("کجا دوست دارید سفر کنید، ")} {toPersianDigits(userName)}؟
        </h2>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={toPersianDigits("جستجوی مقصد، فعالیت یا نوع سفر...")}
            className="w-full p-2.5 pr-10 rtl:pl-10 rtl:pr-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="absolute left-2 rtl:right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-blue-500 hover:text-blue-700 rounded-full"
            aria-label={toPersianDigits("جستجو")}
          >
            <SearchIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Placeholder for displaying travel ideas, itineraries, etc. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example Card Structure */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="w-full h-32 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
            <MapPinIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-sm font-semibold text-gray-700 mb-1">{toPersianDigits("مقصد نمونه ۱")}</h3>
          <p className="text-xs text-gray-500 line-clamp-2">{toPersianDigits("توضیحات کوتاه در مورد این مقصد شگفت‌انگیز برای سفر بعدی شما.")}</p>
           <button className="mt-3 text-xs text-blue-600 hover:underline">{toPersianDigits("مشاهده جزئیات")}</button>
        </div>
        {/* Add more cards or content here */}
      </div>

       <p className="text-xs text-gray-400 mt-8 text-center italic">
        {toPersianDigits("این صفحه در حال توسعه است. ویژگی‌های بیشتر به زودی اضافه خواهند شد!")}
      </p>
    </div>
  );
};

export default TravelPage;
