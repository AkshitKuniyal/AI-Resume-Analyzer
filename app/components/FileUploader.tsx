import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { useState } from "react";
import { formatSize } from "../lib/utils";
 
interface FileUploaderProps{
    file: File | null;
    onFileSelect :(file:File | null)=>void;
}
const FileUploader=({ file, onFileSelect }: FileUploaderProps)=>{
    
  const onDrop = useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];  
        onFileSelect?.(file);
  }, [onFileSelect])
  const {getRootProps, getInputProps, isDragActive,acceptedFiles} = useDropzone({onDrop,multiple:false,accept:{'application/pdf': ['.pdf']},maxSize:25*1024*1024})


  return (
    <div className="w-full gradient-border p-4 rounded-2xl"><div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        <div className="space-y-4 cursor-pointer">
           
            {file?
            <div className="uploader-selected-file " onClick={(e)=>e.stopPropagation()}    >
                <img src="/images/pdf.png" alt="file" className="size-10 " />
            <div className="flex items-center space-x-3  ">
                


                <div className="text-sm font-medium text -gray-700 truncate max-w-xs"><p className="text-sm font-medium text-gray-500 truncate max-w-xs">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatSize(file.size)}</p>
                    </div>
            </div> 
            <div 
                role="button"
                tabIndex={0}
                className="p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors" 
                onClick={(e)=> {
                    e.stopPropagation();
                    onFileSelect?.(null);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        onFileSelect?.(null);
                    }
                }}
            >
                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4"/>
            </div>
            </div>
            :
            <div>
                 <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                <img src="/icons/info.svg" alt="upload" className="size-20" />
            </div>
                <p className="text-lg text-gray-500 ">
                    <span className="font-semibold">Drag and drop your resume</span> to upload
                </p>
                <p className="text-lg text-gray-500">PDF (Max. 25MB)</p>
                </div>}
        </div>
      }
    </div>

    </div>
  )
}

export default FileUploader