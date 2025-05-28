
import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  startFrom?: number;
  countDown?: boolean;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  duration = 2000,
  startFrom,
  countDown = false,
  className = ''
}) => {
  const [count, setCount] = useState(countDown ? (startFrom || target * 2) : 0);

  useEffect(() => {
    const start = countDown ? (startFrom || target * 2) : 0;
    const end = target;
    const increment = countDown ? -1 : 1;
    const steps = Math.abs(end - start);
    const stepDuration = duration / steps;

    let current = start;
    const timer = setInterval(() => {
      current += increment * (Math.abs(end - start) / steps);
      
      if (countDown ? current <= end : current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.round(current * 10) / 10);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target, duration, startFrom, countDown]);

  return (
    <span className={className}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};
