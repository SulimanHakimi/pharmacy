"use client";

import Navbar from "@/components/Navbar";
import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    setResult(null);

    try {
      // Convert to base64 without prefix
      const base64Data = preview.split(',')[1];

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          image: base64Data,
          mimeType: file.type
        }),
      });
      
      const data = await response.json();
      setResult(data.analysis);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a192f] text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">د نسخې تحلیل کونکی</h1>
          <p className="text-gray-400">د درملو او کارولو لارښوونو پیژندلو لپاره د خپلې نسخې عکس اپلوډ کړئ.</p>
        </div>

        <div className="bg-[#112240] rounded-xl p-6 sm:p-8 shadow-xl border border-gray-800">
          <div 
            className="border-2 border-dashed border-gray-600 rounded-xl p-10 text-center cursor-pointer hover:border-[#64ffda] transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
            
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                <div className="mt-4 text-[#64ffda] flex items-center justify-center gap-2">
                  <CheckCircle size={20} /> عکس غوره شو
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 text-gray-400">
                <Upload size={48} />
                <p>د اپلوډ کولو لپاره کلیک وکړئ یا عکس دلته راکش کړئ</p>
                <p className="text-sm">ملاتړ شوي فارمیټونه: JPG, PNG</p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
              onClick={handleUpload}
              disabled={!file || isLoading}
              className="w-full bg-[#64ffda] text-[#0a192f] py-4 rounded-lg font-bold text-lg hover:bg-[#4fd1c5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" /> تحلیل کیږي...
                </>
              ) : (
                <>
                  <FileText size={20} /> نسخه تحلیل کړئ
                </>
              )}
            </button>
          </div>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-[#112240] rounded-xl p-6 sm:p-8 shadow-xl border border-gray-800"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <CheckCircle className="text-[#64ffda]" /> د تحلیل پایله
            </h2>
            <div className="prose prose-invert max-w-none text-right">
              <div className="whitespace-pre-wrap text-gray-300">{result}</div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
