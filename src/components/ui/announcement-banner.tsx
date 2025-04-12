import { AlertCircle, X } from "lucide-react";
import { useState } from "react";

interface AnnouncementBannerProps {
  announcement: string;
  className?: string;
}

export function AnnouncementBanner({
  announcement,
  className = "",
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || !announcement) {
    return null;
  }

  // Split the announcement by newline characters and create paragraph elements
  const paragraphs = announcement.split('\n').map((line, i) => (
    <p key={i} className="text-sm">{line}</p>
  ));

  return (
    <div 
      className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-3 rounded-md flex items-start justify-between mb-6 max-w-3xl mx-auto animate-fadeIn ${className}`}
    >
      <div className="flex items-start gap-2">
        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          {paragraphs}
        </div>
      </div>

      <button 
        onClick={() => setIsVisible(false)}
        className="rounded-full p-1 hover:bg-red-100 dark:hover:bg-red-800/40 transition-colors ml-3 flex-shrink-0"
        aria-label="Close announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}