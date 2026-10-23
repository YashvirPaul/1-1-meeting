import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export default function OfflineNotice() {
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setTimeout(() => setShowReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 z-50 p-3 rounded-2xl shadow-lg border text-xs flex items-center gap-2.5 transition-all ${
        isOnline
          ? 'bg-emerald-900/90 text-emerald-100 border-emerald-700'
          : 'bg-amber-950/90 text-amber-100 border-amber-800'
      }`}
      role="status"
    >
      {isOnline ? (
        <>
          <Wifi className="w-4 h-4 text-emerald-400" />
          <span>Back online. Your offline actions are synced.</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Offline mode active. Your booking draft is preserved locally.</span>
        </>
      )}
    </div>
  );
}
