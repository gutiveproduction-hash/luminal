import React from 'react';

export interface LuminalLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  compact?: boolean;
  className?: string;
}

export const LuminalLogo: React.FC<LuminalLogoProps> = ({
  size = 'md',
  showText = true,
  compact = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Geometric SVG Luminal Prism Aperture Logo with Elegant Dark Gold Accent */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} rounded-sm bg-[#0C0C0C] border border-[#C5A059]/40 shadow-[0_0_20px_rgba(197,160,89,0.2)] group`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
        >
          {/* Outer Geometric Hexagonal Luminal Frame */}
          <path
            d="M20 3.5L33.5 11.2V28.8L20 36.5L6.5 28.8V11.2L20 3.5Z"
            className="stroke-[#C5A059]"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />

          {/* Inner Refraction Facets (Luminescence) */}
          <path
            d="M20 9L30 14.8V25.2L20 31L10 25.2V14.8L20 9Z"
            fill="url(#luminalGradient)"
            fillOpacity="0.22"
            className="stroke-[#C5A059]/70"
            strokeWidth="1.2"
          />

          {/* Central Luminal Aperture Beam & Focal Node */}
          <circle cx="20" cy="20" r="3.6" className="fill-[#4ADE80]" />
          <line x1="20" y1="9" x2="20" y2="16.4" className="stroke-[#C5A059]" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="23.6" x2="20" y2="31" className="stroke-[#C5A059]" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="10.5" y1="20" x2="16.4" y2="20" className="stroke-[#C5A059]" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="23.6" y1="20" x2="29.5" y2="20" className="stroke-[#C5A059]" strokeWidth="1.5" strokeLinecap="round" />

          {/* Satellite Quantum Coordinates */}
          <circle cx="15" cy="14" r="1.2" className="fill-[#C5A059]" />
          <circle cx="25" cy="14" r="1.2" className="fill-[#C5A059]" />
          <circle cx="15" cy="26" r="1.2" className="fill-[#C5A059]" />
          <circle cx="25" cy="26" r="1.2" className="fill-[#C5A059]" />

          <defs>
            <linearGradient id="luminalGradient" x1="10" y1="9" x2="30" y2="31" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C5A059" />
              <stop offset="0.6" stopColor="#E5C784" />
              <stop offset="1" stopColor="#4ADE80" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ambient indicator dot */}
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ADE80]"></span>
        </span>
      </div>

      {showText && (
        <div className="flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className={`font-light tracking-[0.2em] sm:tracking-[0.25em] text-white font-sans ${compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'} leading-tight`}>
              LUMINAL
            </span>
            {!compact && (
              <span className="px-1.5 py-0.5 rounded-sm text-[10px] font-sans font-semibold tracking-wider bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 uppercase">
                v2.4
              </span>
            )}
          </div>
          {!compact && (
            <span className="text-[10px] font-sans font-medium tracking-wider uppercase text-[#888] leading-none mt-1 truncate">
              Agent Control Plane
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Export alias for backward compatibility
export const GardaLogo = LuminalLogo;
export type GardaLogoProps = LuminalLogoProps;
