
import React from 'react';
import { toPersianDigits } from '../../utils';
import { Asset, AssetType } from '../../types/financeTypes';
import { PencilIcon, TrashIcon, WalletIcon, BuildingOfficeIcon, TrendingUpIcon, PlusIcon } from '../shared/AppIcons'; // Ensured relative path

interface AssetListItemProps {
  asset: Asset;
  onEdit: (asset: Asset) => void;
  onDelete: (assetId: string) => void;
}

const getAssetTypeIcon = (type: AssetType): React.ReactNode => {
  switch (type) {
    case 'cash': return <WalletIcon className="w-4 h-4 text-green-500" />;
    case 'stocks': return <TrendingUpIcon className="w-4 h-4 text-blue-500" />;
    case 'real_estate': return <BuildingOfficeIcon className="w-4 h-4 text-orange-500" />;
    case 'crypto': return <WalletIcon className="w-4 h-4 text-purple-500" />; // Placeholder, replace with a better crypto icon
    case 'vehicle': return <WalletIcon className="w-4 h-4 text-gray-500" />; // Placeholder, maybe a CarIcon
    case 'collectibles': return <WalletIcon className="w-4 h-4 text-yellow-500" />; // Placeholder, maybe a DiamondIcon
    case 'other': return <PlusIcon className="w-4 h-4 text-gray-500" />;
    default: return <WalletIcon className="w-4 h-4 text-gray-500" />;
  }
};

const assetTypeTranslations: Record<AssetType, string> = {
  cash: toPersianDigits("وجه نقد"),
  stocks: toPersianDigits("سهام/اوراق"),
  real_estate: toPersianDigits("املاک"),
  crypto: toPersianDigits("ارز دیجیتال"),
  vehicle: toPersianDigits("وسیله نقلیه"),
  collectibles: toPersianDigits("کلکسیون"),
  other: toPersianDigits("سایر"),
};


const AssetListItem: React.FC<AssetListItemProps> = ({ asset, onEdit, onDelete }) => {
  const formattedValue = `${toPersianDigits(asset.value.toLocaleString('fa-IR'))} ${toPersianDigits("تومان")}`;
  const assetIcon = getAssetTypeIcon(asset.type);
  const assetTypePersian = assetTypeTranslations[asset.type] || toPersianDigits("نامشخص");

  return (
    <li className="bg-gray-50 p-2.5 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors duration-150 flex items-center justify-between">
      <div className="flex items-center flex-grow min-w-0">
        <div className="p-1.5 rounded-full mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0 bg-gray-200">
          {assetIcon}
        </div>
        <div className="flex-grow min-w-0">
          <p className="text-xs font-medium text-gray-700 truncate" title={toPersianDigits(asset.name)}>{toPersianDigits(asset.name)}</p>
          <p className="text-[10px] text-gray-500">{assetTypePersian}</p>
        </div>
      </div>

      <div className="flex items-center flex-shrink-0 ml-2 rtl:mr-2 rtl:ml-0">
        <p className="text-xs font-semibold text-green-600 mr-2 rtl:ml-2 rtl:mr-0">{formattedValue}</p>
        <button 
            onClick={() => onEdit(asset)} 
            className="p-1 text-yellow-500 hover:text-yellow-700 hover:bg-yellow-100/50 rounded-full"
            aria-label={toPersianDigits("ویرایش دارایی")}
        >
            <PencilIcon className="w-3.5 h-3.5" />
        </button>
        <button 
            onClick={() => onDelete(asset.id)} 
            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100/50 rounded-full"
            aria-label={toPersianDigits("حذف دارایی")}
        >
            <TrashIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </li>
  );
};

export default AssetListItem;
