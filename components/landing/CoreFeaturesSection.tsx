
import React from 'react';
import FeatureCard, { FeatureCardProps } from './FeatureCard';
import { toPersianDigits } from '@/utils'; 
import { BrainIcon, TargetIcon, HeartIcon } from '../shared/AppIcons'; 

const features: FeatureCardProps[] = [
  {
    icon: <BrainIcon />, 
    title: toPersianDigits('دستیار هوش مصنوعی چندوجهی و تطبیق‌پذیر'),
    description: toPersianDigits('هوش مصنوعی که متن، گفتار، تصاویر و زمینه را درک می‌کند و از شما می‌آموزد تا بینش‌های شخصی‌سازی شده و پشتیبانی فعال ارائه دهد.'),
  },
  {
    icon: <TargetIcon />,
    title: toPersianDigits('مدیریت جامع اهداف و وظایف'),
    description: toPersianDigits('از رویاپردازی‌های بزرگ تا اجرای روزانه، با کمک هوش مصنوعی برای اولویت‌بندی هوشمند، برنامه‌ریزی و پیگیری پیشرفت.'),
  },
  {
    icon: <HeartIcon />,
    title: toPersianDigits('سلامت و تندرستی جامع'),
    description: toPersianDigits('راهنمایی هوشمند تغذیه، مربیگری تناسب اندام شخصی، پشتیبانی سلامت روان و مدیریت هوشمند سوابق پزشکی.'),
  },
];

const CoreFeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-5">
            {toPersianDigits("هر جنبه از زندگی خود را ارکستره کنید")}
          </h2>
          <div className="section-title-underline"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-8">
            {toPersianDigits("کشف کنید که چگونه ویژگی‌های مبتنی بر هوش مصنوعی ما می‌توانند به شما در دستیابی به تعادل، رشد و اوج عملکرد کمک کنند.")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreFeaturesSection;