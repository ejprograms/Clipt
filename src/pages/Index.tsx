
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AuthModal } from '@/components/AuthModal';
import { HistoryModal } from '@/components/HistoryModal';
import { TimeRangeSelector } from '@/components/TimeRangeSelector';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from '@/components/ui/progress';
import { Link2, Scissors, Download, History, LogOut } from 'lucide-react';

const Index = () => {
  const { user, logout, addToHistory } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoData, setVideoData] = useState<any>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [outputFormat, setOutputFormat] = useState<'mp4-video-audio' | 'mp4-video' | 'mp3-audio'>('mp4-video-audio');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

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

    // Simulate video data loading (in real app, you'd use YouTube API)
    const mockVideoData = {
      id: videoId,
      title: 'Sample Video Title',
      duration: 3600, // 1 hour in seconds
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    };

    setVideoData(mockVideoData);
    setEndTime(mockVideoData.duration);
  };

  const handleClip = async () => {
    if (!videoData) return;

    setIsProcessing(true);
    setProgress(0);

    // Simulate processing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }

    if (user) {
      addToHistory({
        videoTitle: videoData.title,
        videoId: videoData.id,
        startTime,
        endTime,
        format: outputFormat
      });
    }

    setIsProcessing(false);
    setProgress(0);
    alert('Video clipped successfully!');
  };

  return (
    <div className="min-h-screen grid-bg font-inter">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="animate-float">
          <h1 className="text-4xl font-bold text-white gradient-white bg-clip-text animate-gradient-shift">
            CLIPT
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button
                onClick={() => setShowHistoryModal(true)}
                className="gradient-white text-white hover:bg-white/20 transition-all duration-300 animate-gradient-shift"
              >
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
              <Button
                onClick={logout}
                className="gradient-white text-white hover:bg-white/20 transition-all duration-300 animate-gradient-shift"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setShowAuthModal(true)}
              className="gradient-white text-white hover:bg-white/20 transition-all duration-300 animate-gradient-shift"
            >
              Login / Sign Up
            </Button>
          )}
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

        {/* How it works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up">
          <div className="translucent-white rounded-lg p-6 text-center">
            <Link2 className="w-12 h-12 text-white mx-auto mb-4" />
            <p className="text-white">Paste Your YouTube Link Below</p>
          </div>
          <div className="translucent-white rounded-lg p-6 text-center">
            <Scissors className="w-12 h-12 text-white mx-auto mb-4" />
            <p className="text-white">Select Your Time Frame</p>
          </div>
          <div className="translucent-white rounded-lg p-6 text-center">
            <Download className="w-12 h-12 text-white mx-auto mb-4" />
            <p className="text-white">Download Your Clip</p>
          </div>
        </div>

        {/* Main Action Box */}
        <div className="translucent-white rounded-lg p-8 space-y-6 animate-fade-in-up">
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
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoData.id}`}
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Time Range Selector */}
              <div className="gradient-white rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">Select Time Frame</h3>
                <TimeRangeSelector
                  duration={videoData.duration}
                  startTime={startTime}
                  endTime={endTime}
                  onTimeChange={(start, end) => {
                    setStartTime(start);
                    setEndTime(end);
                  }}
                />
              </div>

              {/* Output Format */}
              <div className="gradient-white rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">Output Format</h3>
                <Select value={outputFormat} onValueChange={(value: any) => setOutputFormat(value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="mp4-video-audio">MP4 (Video + Audio)</SelectItem>
                    <SelectItem value="mp4-video">MP4 (Video Only)</SelectItem>
                    <SelectItem value="mp3-audio">MP3 (Audio Only)</SelectItem>
                  </SelectContent>
                </Select>
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

      {/* Modals */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <HistoryModal isOpen={showHistoryModal} onClose={() => setShowHistoryModal(false)} />
    </div>
  );
};

export default Index;
