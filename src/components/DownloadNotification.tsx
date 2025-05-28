
import React from 'react';

interface DownloadNotificationProps {
  show: boolean;
}

export const DownloadNotification: React.FC<DownloadNotificationProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="download-notification rounded-lg px-6 py-3">
        <p className="text-white font-semibold">Download Complete!</p>
      </div>
    </div>
  );
};
