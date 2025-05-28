
import React from 'react';
import { Button } from '@/components/ui/button';

interface OutputFormatSelectorProps {
  selected: 'mp4-video-audio' | 'mp4-video' | 'mp3-audio';
  onSelect: (format: 'mp4-video-audio' | 'mp4-video' | 'mp3-audio') => void;
}

export const OutputFormatSelector: React.FC<OutputFormatSelectorProps> = ({ selected, onSelect }) => {
  const formats = [
    { id: 'mp4-video-audio', label: 'MP4 (Video + Audio)', icon: '🎬' },
    { id: 'mp4-video', label: 'MP4 (Video Only)', icon: '📹' },
    { id: 'mp3-audio', label: 'MP3 (Audio Only)', icon: '🎵' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {formats.map((format) => (
        <Button
          key={format.id}
          onClick={() => onSelect(format.id as any)}
          className={`p-4 h-auto flex flex-col items-center gap-2 transition-all duration-300 ${
            selected === format.id
              ? 'bg-white/20 border-white/40 text-white'
              : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
          }`}
          variant="outline"
        >
          <span className="text-2xl">{format.icon}</span>
          <span className="text-sm font-medium">{format.label}</span>
        </Button>
      ))}
    </div>
  );
};
