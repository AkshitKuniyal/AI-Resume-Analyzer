import React from 'react'

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  let badgeColor = '';
  let textColor = '';
  let label = '';

  if (score > 70) {
    badgeColor = 'bg-green-100';
    textColor = 'text-green-600';
    label = 'Strong';
  } else if (score > 49) {
    badgeColor = 'bg-yellow-100';
    textColor = 'text-yellow-600';
    label = 'Good Start';
  } else {
    badgeColor = 'bg-red-100';
    textColor = 'text-red-600';
    label = 'Needs Work';
  }

  return (
    <div className={`${badgeColor} ${textColor} px-3 py-1 rounded-full text-sm font-semibold inline-block`}>
      <p>{label}</p>
    </div>
  )
}

export default ScoreBadge