
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

interface TimeInputProps {
  label: string;
  maxDuration: number;
  onChange: (timeInSeconds: number) => void;
}

export const TimeInput: React.FC<TimeInputProps> = ({ label, maxDuration, onChange }) => {
  const [time, setTime] = useState('00:00:00');

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const parseTime = (timeString: string) => {
    const parts = timeString.split(':');
    if (parts.length !== 3) return 0;
    
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    const seconds = parseInt(parts[2]) || 0;
    
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleTimeChange = (value: string) => {
    setTime(value);
    const timeInSeconds = parseTime(value);
    
    if (timeInSeconds <= maxDuration) {
      onChange(timeInSeconds);
    }
  };

  const handleBlur = () => {
    const timeInSeconds = parseTime(time);
    if (timeInSeconds > maxDuration) {
      const formattedTime = formatTime(maxDuration);
      setTime(formattedTime);
      onChange(maxDuration);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-white/80 text-sm font-medium">{label}</label>
      <Input
        value={time}
        onChange={(e) => handleTimeChange(e.target.value)}
        onBlur={handleBlur}
        placeholder="HH:MM:SS"
        className="bg-white/10 border-white/30 text-white placeholder:text-white/50 text-center font-mono"
      />
    </div>
  );
};
