export const meta = () =>([
    {title:"Resumind - Resume Review"},
    {name:"description",content:"View your resume analysis"}
])
import React from 'react'
import Summary from '../components/Summary';
import Details from '../components/Details';
import ATS from '../components/ATS';
import { useParams } from 'react-router';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { usePuterStore } from '../lib/puter';
const Resume = () => {
    const {auth,kv,isLoading,fs}=usePuterStore();
    const { id } = useParams();
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<any>(null);
    const navigate=useNavigate();
    useEffect(()=>{
   if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`); 
},[auth.isAuthenticated,isLoading,id])
  useEffect(()=>{
    const loadResume=async()=>{
     const resume=await kv.get(`resume:${id}`) 
     
     if(!resume){
      return;  
     }
     const data=JSON.parse(resume);
     const resumeBlob = await fs.read(data.resumePath);
     if (resumeBlob) {
       const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
       const url = URL.createObjectURL(pdfBlob);
       setResumeUrl(url);
       const imageData = await fs.read(data.imagePath);
       if (!imageData)  return;

       const imageBlob = new Blob([imageData], { type: 'image/png' });
       const imageUrl = URL.createObjectURL(imageBlob);
       setImageUrl(imageUrl);
       setFeedback(data.feedback);
       console.log({resumeUrl,imageUrl,feedback});
       
     }
    }
    loadResume();
    
  },[id])
  return (
   <main className="pt-0!">
    <nav className="resume-nav">
        <Link to ="/" className="back-button">
        <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
        <span className="text-gray-800 text-sm font-semibold">Back to Home</span>
        
        </Link>
    </nav>
    <div className="flex flex-row w-full max-lg:flex-rol-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-screen sticky top-0 items-center justify-center">{imageUrl && resumeUrl &&(
                <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-w-xl:h-fit w-fit">
                    
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                    <img src={imageUrl} 
                    className="w-full h-full object-contain rounded-2xl" title="Resume" alt="Resume" />
                </a>
                </div>
            )}
            </section>
        <section className="feedback-section">
            <h2 className="text-4xl text-black font-bold ">Resume Review</h2>
            {feedback ? (
                <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                    <Summary feedback={feedback}/>
                   
                    <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []}/>
                     <Details feedback={feedback}/>
                </div>
            ):
            (
                <img src="/images/resume-scan-2.gif" alt="" className="w-full" />
            )}
        </section>
    </div>
   </main>
  )
}

export default Resume