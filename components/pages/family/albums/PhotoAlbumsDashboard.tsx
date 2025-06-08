import React from 'react';
import { toPersianDigits } from '../../../../utils'; 
import { PhotoAlbum } from '../../../../types/familyTypes'; 
import { PlusIcon, FolderIcon, PencilIcon, TrashIcon } from '../../../shared/AppIcons'; 

interface PhotoAlbumsDashboardProps {
  albums: PhotoAlbum[];
  onSelectAlbum: (albumId: string) => void;
  onOpenAddAlbumModal: (albumToEdit?: PhotoAlbum | null) => void; // Modified to accept album for editing
  onDeleteAlbum: (albumId: string) => void;
}

const PhotoAlbumsDashboard: React.FC<PhotoAlbumsDashboardProps> = ({ albums, onSelectAlbum, onOpenAddAlbumModal, onDeleteAlbum }) => {
  return (
    <div className="p-1">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-semibold text-gray-700">{toPersianDigits("آلبوم‌های عکس شما")}</h4>
        <button
          onClick={() => onOpenAddAlbumModal(null)} // Call with null for new album
          className="flex items-center text-xs bg-green-500 hover:bg-green-600 text-white py-1.5 px-3 rounded-md transition-colors"
        >
          <PlusIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0"/> {toPersianDigits("ایجاد آلبوم جدید")}
        </button>
      </div>

      {albums.length === 0 ? (
        <p className="text-xs text-gray-500 text-center py-4">{toPersianDigits("هنوز آلبومی ایجاد نشده است.")}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {albums.map(album => (
            <div 
                key={album.id} 
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-300 transition-all text-center aspect-square flex flex-col justify-between items-center"
            >
              <button
                onClick={() => onSelectAlbum(album.id)}
                className="w-full flex flex-col items-center flex-grow focus:outline-none mb-1"
                aria-label={toPersianDigits(album.name)}
              >
                <FolderIcon className="w-10 h-10 text-indigo-400 mb-1.5" />
                <span className="text-xs font-medium text-gray-700 truncate w-full">{toPersianDigits(album.name)}</span>
                <span className="text-[10px] text-gray-500">{toPersianDigits(`${album.photoUrls.length} عکس`)}</span>
              </button>
              <div className="flex justify-center items-center space-x-1 space-x-reverse mt-1 pt-1 border-t border-gray-100 w-full">
                <button onClick={(e) => {e.stopPropagation(); onOpenAddAlbumModal(album);}} className="p-1 text-yellow-500 hover:bg-yellow-100 rounded-full" aria-label={toPersianDigits("ویرایش آلبوم")}>
                  <PencilIcon className="w-3 h-3" />
                </button>
                <button onClick={(e) => {e.stopPropagation(); onDeleteAlbum(album.id);}} className="p-1 text-red-500 hover:bg-red-100 rounded-full" aria-label={toPersianDigits("حذف آلبوم")}>
                  <TrashIcon className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoAlbumsDashboard;