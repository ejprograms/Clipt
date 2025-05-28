
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Link2, Zap, ArrowRight } from 'lucide-react';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { TimeInput } from '@/components/TimeInput';
import { OutputFormatSelector } from '@/components/OutputFormatSelector';
import { FadingInstructions } from '@/components/FadingInstructions';

const Index = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoData, setVideoData] = useState<any>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [outputFormat, setOutputFormat] = useState<'mp4-video-audio' | 'mp4-video' | 'mp3-audio'>('mp4-video-audio');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDownloadComplete, setShowDownloadComplete] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleUrlSubmit = async () => {
    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    const mockVideoData = {
      id: videoId,
      title: 'Sample Video Title',
      duration: 3600,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    };

    setVideoData(mockVideoData);
    setEndTime(mockVideoData.duration);
  };

  const handleTimeChange = (type: 'start' | 'end', timeInSeconds: number) => {
    if (type === 'start') {
      setStartTime(timeInSeconds);
    } else {
      setEndTime(timeInSeconds);
    }
    
    // Jump to the time in the video
    if (videoRef.current && videoData) {
      const iframe = videoRef.current;
      const newSrc = `https://www.youtube.com/embed/${videoData.id}?start=${timeInSeconds}&autoplay=1`;
      iframe.src = newSrc;
    }
  };

  const handleClip = async () => {
    if (!videoData) return;

    setIsProcessing(true);
    setProgress(0);

    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }

    setIsProcessing(false);
    setProgress(0);
    setShowDownloadComplete(true);
    
    setTimeout(() => {
      setShowDownloadComplete(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen grid-bg font-inter">
      {/* Header */}
      <header className="flex justify-center items-center p-6">
        <div className="animate-float">
          <h1 className="text-4xl font-bold text-white gradient-white bg-clip-text animate-gradient-shift">
            CLIPT
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Slogan */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-6xl font-bold text-white mb-4 animate-gradient-shift">
            Paste. Clip. Download.
          </h2>
        </div>

        {/* Stats and Info Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up">
          <div className="stats-box rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Videos Clipped</h3>
            <AnimatedCounter target={4965} suffix="+" duration={3000} className="text-3xl font-bold text-white" />
          </div>
          <div className="stats-box rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Processing Speed</h3>
            <AnimatedCounter target={1.3} suffix=" seconds" duration={3000} startFrom={10} className="text-3xl font-bold text-white" countDown />
          </div>
          <div className="stats-box rounded-lg p-6 text-center">
            <FadingInstructions />
          </div>
        </div>

        {/* Main Action Box */}
        <div className="main-action-box rounded-lg p-8 space-y-6 animate-fade-in-up">
          {/* URL Input */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Paste your YouTube URL here..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button
                onClick={handleUrlSubmit}
                className="gradient-white text-white hover:bg-white/20 transition-all duration-300"
              >
                Load Video
              </Button>
            </div>
          </div>

          {/* Video Preview */}
          {videoData && (
            <div className="space-y-6">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  ref={videoRef}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoData.id}`}
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Time Input */}
              <div className="time-input-box rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">Set Time Frame</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TimeInput
                    label="Start Time"
                    maxDuration={videoData.duration}
                    onChange={(time) => handleTimeChange('start', time)}
                  />
                  <TimeInput
                    label="End Time"
                    maxDuration={videoData.duration}
                    onChange={(time) => handleTimeChange('end', time)}
                  />
                </div>
              </div>

              {/* Output Format */}
              <div className="time-input-box rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">Output Format</h3>
                <OutputFormatSelector
                  selected={outputFormat}
                  onSelect={setOutputFormat}
                />
              </div>

              {/* Clip Button */}
              <div className="flex justify-center">
                {isProcessing ? (
                  <div className="w-full max-w-md space-y-2">
                    <Progress value={progress} className="w-full" />
                    <p className="text-white text-center text-sm">Processing... {progress}%</p>
                  </div>
                ) : (
                  <Button
                    onClick={handleClip}
                    className="gradient-white text-white hover:bg-white/20 transition-all duration-300 px-12 py-3 text-lg font-semibold animate-gradient-shift"
                  >
                    CLIP
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Download Complete Notification */}
      {showDownloadComplete && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="download-notification rounded-lg px-6 py-3">
            <p className="text-white font-semibold">Download Complete!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
