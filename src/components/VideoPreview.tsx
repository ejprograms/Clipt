
import React, { forwardRef } from 'react';

interface VideoPreviewProps {
  videoId: string;
}

export const VideoPreview = forwardRef<HTMLIFrameElement, VideoPreviewProps>(
  ({ videoId }, ref) => {
    return (
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          ref={ref}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }
);

VideoPreview.displayName = 'VideoPreview';
