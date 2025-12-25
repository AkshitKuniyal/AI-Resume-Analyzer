import React from 'react'
import Navbar from '../components/navbar'
import {useState} from 'react'
import FileUploader from '../components/FileUploader';
import { usePuterStore } from '../lib/puter';
import { useNavigate } from 'react-router';
import { convertPdfToImage } from '../lib/pdf2img';
import { generateUUID, cleanAIJSON } from '../lib/utils';
import { prepareInstructions, AIResponseFormat } from '../../constants/index';
const upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate=useNavigate();
    const [statusText, setStatusText]=useState('')
    const [selectedFile, setSelectedFile]=useState<File | null>(null);
    const handleFileSelect=(file:File | null)=>{
        setSelectedFile(file);

    }
    const [isProcessing, setIsProcessing]=useState(false);
    const handleAnalyze = async({companyName, jobTitle, jobDescription, file}: {companyName: string, jobTitle: string, jobDescription: string, file: File})=>{ 
        try {

            setIsProcessing(true);
            setStatusText('Scanning your resume...');
            
            const uploadedFileResponse = await fs.upload([file]);
            
            const uploadedFile = Array.isArray(uploadedFileResponse) ? uploadedFileResponse[0] : uploadedFileResponse;
            if(!uploadedFile || !uploadedFile.path){
                console.error("Failed to get uploaded file path:", uploadedFile);
                setStatusText('Failed to upload file');
                setIsProcessing(false);
                return;
            }


            setStatusText('Analyzing your resume...');

            const imageFile=await convertPdfToImage(file);
            if(!imageFile.file){
                console.error("PDF to Image conversion failed:", imageFile.error);
                setStatusText('Failed to convert PDF to image');
                setIsProcessing(false);
                return;
            }


            setStatusText('Analyzing your resume...');
            const uploadedImageResponse = await fs.upload([imageFile.file]);
            
            const uploadedImage = Array.isArray(uploadedImageResponse) ? uploadedImageResponse[0] : uploadedImageResponse;
            if(!uploadedImage || !uploadedImage.path){
                console.error("Failed to get uploaded image path:", uploadedImage);
                setStatusText('Failed to upload image');
                setIsProcessing(false);
                return;
            }   


            setStatusText('Analyzing your resume...');
            const uuid = generateUUID();

            

            const feedback = await ai.feedback(
                uploadedFile.path,
                prepareInstructions({
                    jobTitle,
                    jobDescription,
                    AIResponseFormat,
                })
            );



            if (!feedback) {
                console.error("AI feedback returned null or undefined");
                setStatusText('Error - failed to analyze resume');
                setIsProcessing(false);
                return;
            }

            const feedbackRawContent = typeof feedback.message.content === 'string' 
                ? feedback.message.content 
                : (feedback.message.content[0]?.text || JSON.stringify(feedback.message.content[0]));



            const cleanedJSON = cleanAIJSON(feedbackRawContent);
            const parsedFeedback = JSON.parse(cleanedJSON);

            const data = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName,
                jobTitle,
                jobDescription,
                feedback: parsedFeedback,
            };

            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            
            setStatusText('Resume analyzed successfully');
            console.log(data);
            
            setIsProcessing(false);
            navigate(`/resume/${uuid}`);
            
        } catch (error) {
            console.error("Error during analysis:", error);
            setStatusText('An unexpected error occurred during analysis');
            setIsProcessing(false);
        }
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!form) return;

        const formData = new FormData(form);
        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!selectedFile) {
            setStatusText('Please select a file first');
            return;
        }

        await handleAnalyze({
            companyName,
            jobTitle,
            jobDescription,
            file: selectedFile
        });
    }
                         return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
   
    <section className="main-section">

        <div className="page-heading py-16">
            <h1>Smart Feedback for your dream job...</h1>
            {isProcessing?(<><h2>{statusText}</h2>
            <img src="/images/resume-scan.gif" alt="" className='w-100' /></>):(<h2>Upload your resume for ATS analysis</h2>)}
            {!isProcessing && (
                <form action="" id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                    <div className="form-div">
                        <label htmlFor="company-name">Company Name</label>
                        <input type="text" name="company-name" placeholder="Company Name"id="company-name" />
                    </div>
                     <div className="form-div">
                        <label htmlFor="job-title">Job Title</label>
                        <input type="text" name="job-title" placeholder="Job Title"id="job-title" />
                    </div>
                     <div className="form-div">
                        <label htmlFor="job-description">Job Description</label>
                        <textarea rows={5} name="job-description" placeholder="Job Description"id="job-description" />
                    </div>
                     <div className="form-div">
                        <label htmlFor="Uploader">Upload Resume</label>
                       <FileUploader file={selectedFile} onFileSelect={handleFileSelect}/>
                    </div>
                    <button className="primary-button" >Submit Resume</button>




                </form>
            )}
        </div>
    </section>
    </main>
  )
}

export default upload