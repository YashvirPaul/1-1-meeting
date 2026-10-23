import { useState } from 'react';
import { Share2, MessageCircle, Twitter, Linkedin, Copy, Check } from 'lucide-react';

export default function SocialShareBar() {
  const [copied, setCopied] = useState(false);

  const shareTitle = "fdryash — 1:1 Live WhatsApp Video Consultation. 25m=₹199, 35m=₹299, 45m=₹499.";
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://yash-consultation.com';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareTitle} ${shareUrl}`
  )}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareTitle
  )}&url=${encodeURIComponent(shareUrl)}`;

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;

  return (
    <div className="py-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        <div className="flex items-center gap-2 text-neutral-500 font-mono">
          <Share2 className="w-3.5 h-3.5" />
          <span>Share fdryash 1:1 Consultation</span>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>WhatsApp</span>
          </a>

          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors flex items-center gap-1.5"
          >
            <Twitter className="w-3.5 h-3.5" />
            <span>X</span>
          </a>

          <a
            href={linkedinShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <button
            type="button"
            onClick={handleCopyLink}
            className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
