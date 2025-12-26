import React from 'react'
import ScoreGauge from './ScoreGauge'
import ScoreBadge from './ScoreBadge'
interface SummaryProps {
  feedback: any;
}
interface ATS {
  score: number;
  tips: string[];
}
interface Summary {
  overallScore: number;
}
const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor=score>=70 ? "text-green-600" : score>=49 ? "text-yellow-600" : "text-red-600";
  return (
    <div className="resume-summary">
      <div className="category grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <p className="text-left">{title}</p>
        <ScoreBadge score={score} />
        <p className="text-2xl text-right">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  )
}
const Summary = ({ feedback }: SummaryProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md w-full">
      <div className="flex flex-row items-center p-4 gap-8">
        <ScoreGauge score={feedback.overallScore || 0}/>
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">Your Resume Score</h2>
      <p className="text=sm text-gra-500"> This score is calculated based on the variables listed below :</p>
    </div>
      </div>
      <Category title="Tone & Style" score={feedback.toneAndStyle.score || 0}/>
      <Category title="Content" score={feedback.content.score || 0}/>
      <Category title="Structure" score={feedback.structure.score || 0}/>
      <Category title="Skills" score={feedback.skills.score || 0}/>
    </div>
  )
}

export default Summary