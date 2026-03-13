import { useScrollReveal } from '../../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  stagger?: boolean;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  stagger = false,
  delay = 0,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.12);

  const baseClass = stagger
    ? 'scroll-reveal-stagger'
    : direction === 'left'
    ? 'scroll-reveal-left'
    : direction === 'right'
    ? 'scroll-reveal-right'
    : 'scroll-reveal';

  return (
    <div
      ref={ref}
      className={`${baseClass} ${isVisible ? 'visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
