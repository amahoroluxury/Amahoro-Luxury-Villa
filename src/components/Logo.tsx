import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
  height?: number | string;
  variant?: 'full' | 'icon';
  theme?: 'dark' | 'light';
}

const Logo: React.FC<LogoProps> = ({ className, height = 60, variant = 'full', theme = 'dark' }) => {
  // Determine height class if predefined
  const heightClass = typeof height === 'number' && [60, 70, 80, 90, 120, 140, 200].includes(height) 
    ? styles[`height_${height}`] 
    : '';

  // Color schemes based on theme
  const colors = theme === 'light' 
    ? { primary: '#FFFFFF', secondary: '#F5E6D3', accent: '#D4C4B0', mountain: '#FFFFFF' }
    : { primary: '#4B3621', secondary: '#F5E6D3', accent: '#36454F', mountain: '#4B3621' };

  return (
    <div className={`${styles.logoContainer} ${heightClass} ${className || ''}`}>
      <svg 
        viewBox="0 0 400 120" 
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(10, 10) scale(0.8)">
          <path d="M20 60 C 20 20, 100 20, 100 60" fill="none" stroke={colors.secondary} strokeWidth="4" strokeLinecap="round" />
          <path d="M30 55 C 30 25, 90 25, 90 55" fill="none" stroke={colors.secondary} strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" />
          <path d="M10 100 Q 40 10, 60 70" fill="none" stroke={colors.mountain} strokeWidth="8" strokeLinecap="round" />
          <path d="M50 75 Q 70 20, 110 90" fill="none" stroke={colors.mountain} strokeWidth="8" strokeLinecap="round" />
          <path d="M30 80 C 50 60, 80 60, 100 85" fill="none" stroke={colors.accent} strokeWidth="6" strokeLinecap="round" />
        </g>
        {variant === 'full' && (
          <g transform="translate(120, 65)">
            <text x="0" y="0" fontFamily="var(--font-serif), Georgia, serif" fontSize="48" fontWeight="500" fill={colors.primary} letterSpacing="0.05em">AMAHORO</text>
            <text x="2" y="30" fontFamily="var(--font-sans), Arial, sans-serif" fontSize="16" fontWeight="600" fill={theme === 'light' ? colors.accent : colors.accent} letterSpacing="0.4em" className={styles.luxuryVillaText}>LUXURY VILLA</text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default Logo;
