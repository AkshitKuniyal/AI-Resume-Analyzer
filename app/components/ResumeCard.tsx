import React, { useEffect, useState } from 'react'
import { Link } from "react-router";
import ScoreCircle from '../components/ScoreCircle'
import { usePuterStore } from '../lib/puter'
const ResumeCard = ({resume}: {resume: Resume}) => {
    const {fs}=usePuterStore();
    const [resumeUrl,setResumeUrl]=useState<string>("");
    useEffect(()=>{
      const loadResume=async()=>{
        const blob= await fs.read(resume.imagePath)
        if(!blob){
          return;
        }
    
       let url = URL.createObjectURL(blob);
        setResumeUrl(url);
      }
      loadResume();
    },[resume.imagePath])
  return (
    <Link to={`/resume/${resume.id}`} className="resume-card  animate-in fade-in duration-1000 ">
        <div className="resume-card-header">
        <div className="flex flex-col gap-2">
            {resume.companyName && <h2 className="text-black font-bold wrap-break-word">{resume.companyName}</h2>}
            {resume.jobTitle && <h3 className="text-lg wrap-break-word text-gray-500">{resume.jobTitle}</h3>}
            {!resume.companyName && !resume.jobTitle && <h2 className="text-black font-bold wrap-break-word">Resume</h2>}
        </div>
        <div className="shrink-0">
            
            <ScoreCircle score={resume.feedback.overallScore}/>
        </div>
        </div>
        {resumeUrl && <div className="gradient-border animate-in fade-in duration-1000">
            <div className="w-full h-full align-center justify-center items-center flex">
                {resumeUrl && <img src={resumeUrl} alt=" resume"
                className="w-[300px] h-[350px] max-sm:h-[250px] object-top" />}
            </div>

        </div>}
    </Link>
  )
}

export default ResumeCard