import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: { iconSize: 'w-7 h-7', textSize: 'text-base', subSize: 'text-[9px]' },
    md: { iconSize: 'w-10 h-10', textSize: 'text-xl', subSize: 'text-[11px]' },
    lg: { iconSize: 'w-14 h-14', textSize: 'text-3xl', subSize: 'text-xs' },
  };

  const current = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* Monogram Icon */}
      <div className={`relative ${current.iconSize} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,102,255,0.4)]" fill="none">
          <defs>
            <linearGradient id="mBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A3FF" />
              <stop offset="50%" stopColor="#0066FF" />
              <stop offset="100%" stopColor="#0044CC" />
            </linearGradient>
            <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Left Wing */}
          <path d="M 12 25 L 38 65 L 38 90 L 12 90 Z" className="fill-slate-900 group-hover:fill-slate-800 transition-colors" />
          <path d="M 12 25 L 38 65 L 50 50 L 22 15 Z" className="fill-slate-800" />

          {/* Center to Right Blue Column */}
          <path d="M 38 65 L 68 90 L 68 35 L 82 25 L 82 90 L 38 90 Z" fill="url(#mBlueGrad)" />
          <path d="M 38 65 L 50 50 L 68 35 L 68 90 Z" fill="#0055EE" />

          {/* Upward Yellow Arrow */}
          <polygon points="70,22 88,8 86,30" fill="url(#arrowGrad)" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`${current.textSize} leading-none font-black tracking-widest text-white`}>
            LE<span className="relative inline-block">A<span className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-xs"></span></span>RN
          </span>
          <span className={`${current.subSize} tracking-[0.3em] font-bold text-blue-400 uppercase mt-0.5`}>
            — WITH MAYANK —
          </span>
        </div>
      )}
    </div>
  );
};
