import type { Route } from "./+types/home";
import Navbar from "../components/navbar";
import { resumes } from "../../constants/index";
import ResumeCard from "../components/ResumeCard";
import { usePuterStore } from "../lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind - AI Resume Analyzer" },
    { name: "description", content: "Welcome to Resumind - AI Resume Analyzer!" },
  ];
}

export default function Home() {
  const {isLoading, auth}=usePuterStore();
const navigate = useNavigate();
useEffect(()=>{
   if(!auth.isAuthenticated) navigate("/"); 
},[auth.isAuthenticated])
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
   
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track your applications & Resume Ratings</h1>
        <h2>Review you submission and get insights on how to improve your resume</h2>
      </div>

    </section>
    {resumes.length >0 && (
      <div className="resumes-section ">
         {resumes.map((resume)=>(
   <ResumeCard key={resume.id} resume={resume}/>
  ))}
    </div>
    )}
 
  </main>;
}
