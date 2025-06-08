
import React from 'react';
import { toPersianDigits } from '../../utils';
import { PlusIcon, ScaleIcon, BuildingOfficeIcon, WalletIcon, ListBulletIcon, ChartPieIcon, TrendingUpIcon } from '../shared/AppIcons';
import { Asset } from '../../types/financeTypes';
import DebtListItem, { Debt } from './DebtListItem'; 
import AssetListItem from './AssetListItem';

interface NetWorthTrackerProps {
  assets: Asset[];
  debts: Debt[];
  onAddAsset: () => void;
  onEditAsset: (asset: Asset) => void;
  onDeleteAsset: (assetId: string) => void;
}

const NetWorthTracker: React.FC<NetWorthTrackerProps> = ({
    assets,
    debts,
    onAddAsset,
    onEditAsset,
    onDeleteAsset
}) => {
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = debts.reduce((sum, debt) => sum + debt.remainingAmount, 0);
  const netWorth = totalAssets - totalLiabilities;

  const netWorthColorClass = netWorth >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h4 className="text-md font-semibold text-gray-700 mb-4 flex items-center">
        <ScaleIcon className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 text-indigo-600"/>
        {toPersianDigits("پیگیری ارزش خالص دارایی‌ها")}
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-center">
        <div className="p-2 bg-green-50 rounded-md border border-green-200">
          <p className="text-xs text-green-700">{toPersianDigits("کل دارایی‌ها")}</p>
          <p className="text-lg font-bold text-green-600">{toPersianDigits(totalAssets.toLocaleString('fa-IR'))} <span className="text-xs">{toPersianDigits("تومان")}</span></p>
        </div>
        <div className="p-2 bg-red-50 rounded-md border border-red-200">
          <p className="text-xs text-red-700">{toPersianDigits("کل بدهی‌ها")}</p>
          <p className="text-lg font-bold text-red-600">{toPersianDigits(totalLiabilities.toLocaleString('fa-IR'))} <span className="text-xs">{toPersianDigits("تومان")}</span></p>
        </div>
        <div className={`p-2 rounded-md border ${netWorth >= 0 ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'}`}>
          <p className={`text-xs ${netWorth >= 0 ? 'text-green-800' : 'text-red-800'}`}>{toPersianDigits("ارزش خالص")}</p>
          <p className={`text-xl font-bold ${netWorthColorClass}`}>{toPersianDigits(netWorth.toLocaleString('fa-IR'))} <span className="text-xs">{toPersianDigits("تومان")}</span></p>
        </div>
      </div>
      
      <div className="mb-3">
         <button onClick={onAddAsset} className="w-full text-sm bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-md flex items-center justify-center">
           <PlusIcon className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0"/> {toPersianDigits("افزودن دارایی جدید")}
         </button>
      </div>

      {assets.length > 0 && (
        <div className="mb-3">
            <h5 className="text-xs font-semibold text-gray-600 mb-2 flex items-center">
                <ListBulletIcon className="w-3.5 h-3.5 mr-1 rtl:ml-1 rtl:mr-0 text-gray-500"/>
                {toPersianDigits("لیست دارایی‌ها:")}
            </h5>
            <ul className="space-y-2 max-h-48 overflow-y-auto pr-1 rtl:pl-1 rtl:pr-0 scrollbar-thin">
                {assets.map(asset => (
                    <AssetListItem 
                        key={asset.id} 
                        asset={asset} 
                        onEdit={onEditAsset} 
                        onDelete={onDeleteAsset} 
                    />
                ))}
            </ul>
        </div>
      )}
       {assets.length === 0 && (
            <p className="text-xs text-gray-500 text-center py-2">{toPersianDigits("هنوز دارایی ثبت نشده است.")}</p>
       )}

      <div className="mt-3 p-3 bg-gray-100 rounded-md text-center text-gray-500 text-xs flex items-center justify-center">
        <TrendingUpIcon className="w-4 h-4 text-gray-400 mr-2 rtl:ml-2 rtl:mr-0"/>
        {toPersianDigits("[نمودار روند تغییرات ارزش خالص در اینجا نمایش داده خواهد شد - به زودی]")}
      </div>
       <p className="text-[10px] text-gray-400 mt-3 text-center">{toPersianDigits("بدهی‌های شما از بخش 'مدیریت بدهی‌ها' در این محاسبه لحاظ می‌شوند.")}</p>
    </div>
  );
};

export default NetWorthTracker;