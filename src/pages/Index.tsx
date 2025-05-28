
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { StatsSection } from '@/components/StatsSection';
import { VideoProcessor } from '@/components/VideoProcessor';
import { DownloadNotification } from '@/components/DownloadNotification';

const Index = () => {
  const [showDownloadComplete, setShowDownloadComplete] = useState(false);

  const handleProcessingComplete = () => {
    setShowDownloadComplete(true);
    
    setTimeout(() => {
      setShowDownloadComplete(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen grid-bg font-inter">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Slogan */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-6xl font-bold text-white mb-4 animate-gradient-shift">
            Paste. Clip. Download.
          </h2>
        </div>

        <StatsSection />

        <VideoProcessor onProcessingComplete={handleProcessingComplete} />
      </main>

      <DownloadNotification show={showDownloadComplete} />
    </div>
  );
};

export default Index;
