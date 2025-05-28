
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ClipButtonProps {
  isProcessing: boolean;
  progress: number;
  onClip: () => void;
}

export const ClipButton: React.FC<ClipButtonProps> = ({
  isProcessing,
  progress,
  onClip
}) => {
  return (
    <div className="flex justify-center">
      {isProcessing ? (
        <div className="w-full max-w-md space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-white text-center text-sm">Processing... {progress}%</p>
        </div>
      ) : (
        <Button
          onClick={onClip}
          className="gradient-white text-white hover:bg-white/20 transition-all duration-300 px-12 py-3 text-lg font-semibold animate-gradient-shift"
        >
          CLIP
        </Button>
      )}
    </div>
  );
};
