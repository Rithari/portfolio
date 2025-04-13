import {AlertCircle, Info, X} from "lucide-react";
import {useState} from "react";

export type AnnouncementType = "warning" | "info";

interface AnnouncementBannerProps {
  announcement: string;
  type?: AnnouncementType;
  className?: string;
}

export function AnnouncementBanner({
  announcement,
  type = "warning",
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

  // Determine the styles based on the announcement type
  const styles = {
    warning: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      text: "text-red-700 dark:text-red-300",
      hover: "hover:bg-red-100 dark:hover:bg-red-800/40",
      icon: <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-700 dark:text-blue-300",
      hover: "hover:bg-blue-100 dark:hover:bg-blue-800/40",
      icon: <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
    }
  };

  const currentStyle = styles[type];

  return (
    <div 
      className={`${currentStyle.bg} border ${currentStyle.border} ${currentStyle.text} p-3 rounded-md flex items-start justify-between mb-6 max-w-3xl mx-auto animate-fadeIn ${className}`}
    >
      <div className="flex items-start gap-2">
        {currentStyle.icon}
        <div className="flex flex-col gap-1">
          {paragraphs}
        </div>
      </div>

      <button 
        onClick={() => setIsVisible(false)}
        className={`rounded-full p-1 ${currentStyle.hover} transition-colors ml-3 flex-shrink-0`}
        aria-label="Close announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}