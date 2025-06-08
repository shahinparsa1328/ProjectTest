import React from 'react';
import { toPersianDigits } from '../../../../utils'; // Corrected path
import { PhotoAlbum, Photo } from '../../../../types/familyTypes'; // Corrected path
import { ArrowRightIcon, CameraIcon } from '../../../shared/AppIcons'; // Corrected path

interface AlbumViewProps {
  album: PhotoAlbum;
  onBackToDashboard: () => void;
  onUploadPhoto: (albumId: string, photoDataUrl: string, photoName: string) => void;
}

const AlbumView: React.FC<AlbumViewProps> = ({ album, onBackToDashboard, onUploadPhoto }) => {
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUploadPhoto(album.id, reader.result as string, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-1">
      <button onClick={onBackToDashboard} className="flex items-center text-xs text-indigo-600 hover:underline mb-3">
        <ArrowRightIcon className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0 transform scale-x-[-1]" />
        {toPersianDigits("بازگشت به لیست آلبوم‌ها")}
      </button>
      <div className="flex justify-between items-center mb-4">
        <div>
            <h4 className="text-sm font-semibold text-gray-700">{toPersianDigits(album.name)}</h4>
            {album.description && <p className="text-xs text-gray-500">{toPersianDigits(album.description)}</p>}
        </div>
        <label htmlFor={`photo-upload-${album.id}`} className="flex items-center text-xs bg-green-500 hover:bg-green-600 text-white py-1.5 px-3 rounded-md transition-colors cursor-pointer">
            <CameraIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0"/> {toPersianDigits("افزودن عکس")}
            <input type="file" id={`photo-upload-${album.id}`} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
        </label>
      </div>

      {album.photoUrls.length === 0 ? (
        <p className="text-xs text-gray-500 text-center py-4">{toPersianDigits("این آلبوم خالی است. اولین عکس خود را اضافه کنید!")}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {album.photoUrls.map((photoUrl, index) => (
            <div key={index} className="aspect-square bg-gray-100 rounded-md overflow-hidden shadow-sm border border-gray-200">
              <img 
                src={photoUrl} 
                alt={toPersianDigits(`عکس ${index + 1}`)} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumView;