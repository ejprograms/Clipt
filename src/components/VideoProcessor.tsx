
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VideoPreview } from '@/components/VideoPreview';
import { TimeFrameSelector } from '@/components/TimeFrameSelector';
import { OutputFormatSelector } from '@/components/OutputFormatSelector';
import { ClipButton } from '@/components/ClipButton';

interface VideoProcessorProps {
  onProcessingComplete: () => void;
}

export const VideoProcessor: React.FC<VideoProcessorProps> = ({ onProcessingComplete }) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoData, setVideoData] = useState<any>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [outputFormat, setOutputFormat] = useState<'mp4-video-audio' | 'mp4-video' | 'mp3-audio'>('mp4-video-audio');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
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
    onProcessingComplete();
  };

  return (
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
          <VideoPreview ref={videoRef} videoId={videoData.id} />

          {/* Time Input */}
          <TimeFrameSelector
            videoDuration={videoData.duration}
            onTimeChange={handleTimeChange}
          />

          {/* Output Format */}
          <div className="time-input-box rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Output Format</h3>
            <OutputFormatSelector
              selected={outputFormat}
              onSelect={setOutputFormat}
            />
          </div>

          {/* Clip Button */}
          <ClipButton
            isProcessing={isProcessing}
            progress={progress}
            onClip={handleClip}
          />
        </div>
      )}
    </div>
  );
};
