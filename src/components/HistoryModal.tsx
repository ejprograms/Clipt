
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Download, ExternalLink } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const openVideo = (videoId: string, startTime: number) => {
    const url = `https://www.youtube.com/watch?v=${videoId}&t=${startTime}s`;
    window.open(url, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="gradient-white border-white/30 max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-center text-xl font-semibold flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />
            Clip History
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!user?.history.length ? (
            <div className="text-center py-8">
              <p className="text-white/80">No clips yet! Start clipping some videos.</p>
            </div>
          ) : (
            user.history.map((clip) => (
              <div key={clip.id} className="translucent-white rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-white font-medium truncate">{clip.videoTitle}</h3>
                    <p className="text-white/70 text-sm">
                      {formatTime(clip.startTime)} - {formatTime(clip.endTime)}
                    </p>
                    <p className="text-white/60 text-xs">
                      {formatDate(clip.date)} • {clip.format.toUpperCase()}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => openVideo(clip.videoId, clip.startTime)}
                    size="sm"
                    className="gradient-white text-white hover:bg-white/20 transition-all duration-300 flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Video
                  </Button>
                  <Button
                    size="sm"
                    className="gradient-white text-white hover:bg-white/20 transition-all duration-300 flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
