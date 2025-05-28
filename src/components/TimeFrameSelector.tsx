
import React from 'react';
import { TimeInput } from '@/components/TimeInput';

interface TimeFrameSelectorProps {
  videoDuration: number;
  onTimeChange: (type: 'start' | 'end', timeInSeconds: number) => void;
}

export const TimeFrameSelector: React.FC<TimeFrameSelectorProps> = ({
  videoDuration,
  onTimeChange
}) => {
  return (
    <div className="time-input-box rounded-lg p-6">
      <h3 className="text-white font-semibold mb-4">Set Time Frame</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TimeInput
          label="Start Time"
          maxDuration={videoDuration}
          onChange={(time) => onTimeChange('start', time)}
        />
        <TimeInput
          label="End Time"
          maxDuration={videoDuration}
          onChange={(time) => onTimeChange('end', time)}
        />
      </div>
    </div>
  );
};
