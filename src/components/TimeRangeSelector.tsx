
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';

interface TimeRangeSelectorProps {
  duration: number;
  startTime: number;
  endTime: number;
  onTimeChange: (start: number, end: number) => void;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  duration,
  startTime,
  endTime,
  onTimeChange
}) => {
  const [range, setRange] = useState([startTime, endTime]);

  useEffect(() => {
    setRange([startTime, endTime]);
  }, [startTime, endTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRangeChange = (newRange: number[]) => {
    setRange(newRange);
    onTimeChange(newRange[0], newRange[1]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-white/80 text-sm">Start: {formatTime(range[0])}</span>
        <span className="text-white/80 text-sm">End: {formatTime(range[1])}</span>
      </div>
      
      <div className="px-3">
        <Slider
          value={range}
          onValueChange={handleRangeChange}
          max={duration}
          min={0}
          step={1}
          className="w-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)'
          }}
        />
      </div>
      
      <div className="flex justify-between text-white/60 text-xs">
        <span>0:00</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};
