import React from 'react';
import { LearningResourceProps as PrivacyLearningResource } from '../../types/privacyTypes';
import LearningResourceCard from './LearningResourceCard';
import { toPersianDigits } from '../../utils';

interface LearningHubSectionProps {
  resources: PrivacyLearningResource[];
  onCompleteResource: (resourceId: string, pointsAwarded: number, badgeIdToAward?: string) => void;
  earnedBadgeIds: Set<string>;
}

const LearningHubSection: React.FC<LearningHubSectionProps> = ({ resources, onCompleteResource, earnedBadgeIds }) => {
  if (!resources || resources.length === 0) {
    return <p className="text-xs text-gray-500 text-center py-3">{toPersianDigits("در حال حاضر منبع آموزشی در دسترس نیست.")}</p>;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {resources.map(res => {
        // Check if a badge related to this resource is already earned
        const isResourceCompletedForBadge = res.badgeAwardedOnCompletion ? earnedBadgeIds.has(res.badgeAwardedOnCompletion) : false;
        // Or, more generally, you might need a way to track individual resource completion if points can be re-earned or if there's no badge
        // For simplicity now, we'll use badge completion as a proxy for resource completion if a badge exists.
        // A more robust system would track completion of each resourceId independently.
        // Let's assume for now quizzes are "completed" once attempted and scored, and articles/videos on click.
        const isQuizResourceCompleted = res.type === 'quiz' && false; // Placeholder: quiz completion state needs to be managed per quiz

        return (
          <LearningResourceCard 
            key={res.id} 
            resource={res} 
            onCompleteResource={onCompleteResource}
            isCompleted={isResourceCompletedForBadge || isQuizResourceCompleted} // Pass completion status
          />
        );
      })}
    </div>
  );
};

export default LearningHubSection;
