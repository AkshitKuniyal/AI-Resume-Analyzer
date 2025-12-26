import type { Route } from "./+types/home";
import Navbar from "../components/navbar";
import ResumeCard from "../components/ResumeCard";
import { usePuterStore } from "../lib/puter";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind - AI Resume Analyzer" },
    { name: "description", content: "Welcome to Resumind - AI Resume Analyzer!" },
  ];
}

export default function Home() {
  const {isLoading, auth,fs, kv}=usePuterStore();
const navigate = useNavigate();
const [resumes  ,setResumes]=useState<Resume[]>([]);
const[loadingResumes,setLoadingResumes]=useState<boolean>(true);



useEffect(()=>{
   if(!auth.isAuthenticated) navigate("/auth?next=/"); 
},[auth.isAuthenticated])


  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
   
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track your applications & Resume Ratings</h1>
        <h2>Review you submission and get insights on how to improve your resume</h2>
      </div>


    </section>
    <section className="relative py-28">
  <div className="max-w-6xl mx-auto px-6">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* Card 1 */}
      <div
        className="
          relative rounded-3xl p-8
          bg-white/70 backdrop-blur-xl
          shadow-[0_20px_60px_-20px_rgba(99,102,241,0.35)]
          hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_rgba(99,102,241,0.45)]
          transition-all duration-300
        "
      >
        <div className="mb-4 h-1 w-12 rounded-full bg-indigo-500"></div>
        <h3 className="text-2xl font-semibold text-gray-900">
          ATS Score Analysis
        </h3>
        <p className="mt-4 text-gray-600 leading-relaxed">
          AI-powered ATS scoring that evaluates keywords, formatting, and relevance to job descriptions.
        </p>
      </div>

      {/* Card 2 */}
      <div
        className="
          relative rounded-3xl p-8
          bg-white/70 backdrop-blur-xl
          shadow-[0_20px_60px_-20px_rgba(168,85,247,0.35)]
          hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_rgba(168,85,247,0.45)]
          transition-all duration-300
        "
      >
        <div className="mb-4 h-1 w-12 rounded-full bg-violet-500"></div>
        <h3 className="text-2xl font-semibold text-gray-900">
          Smart Resume Feedback
        </h3>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Clear, actionable insights to improve structure, skill alignment, and overall impact.
        </p>
      </div>

      {/* Card 3 */}
      <div
        className="
          relative rounded-3xl p-8
          bg-white/70 backdrop-blur-xl
          shadow-[0_20px_60px_-20px_rgba(236,72,153,0.35)]
          hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_rgba(236,72,153,0.45)]
          transition-all duration-300
        "
      >
        <div className="mb-4 h-1 w-12 rounded-full bg-pink-500"></div>
        <h3 className="text-2xl font-semibold text-gray-900">
          Suggestions
        </h3>
        <p className="mt-4 text-gray-600 leading-relaxed">
        AI-generated suggestions to improve your resume based on job requirements.
        </p>
      </div>

    </div>

  </div>
</section>


      

   
    
 
  </main>;
}
