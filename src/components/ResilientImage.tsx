import React, { useState, useEffect } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'RBT Dental & Implant Center',
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#dff2e5] via-[#eef8f1] to-[#cdebd8] text-[#0d281d] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          className="w-12 h-12 mb-3 opacity-80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3c-3.2 0-5.5 1.8-6 4.7-.4 2.4.6 4.6 1.2 6.8.5 1.8.8 4.5 2 4.5 1.1 0 1.5-2.5 2.8-2.5s1.7 2.5 2.8 2.5c1.2 0 1.5-2.7 2-4.5.6-2.2 1.6-4.4 1.2-6.8C17.5 4.8 15.2 3 12 3Z" />
          <path d="M9.5 11h5" />
          <path d="M10 13.5h4" />
        </svg>
        <p className="font-display font-semibold text-sm max-w-xs">{fallbackTitle}</p>
        <p className="text-xs opacity-75 mt-1">DHA Phase 5, Lahore</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
