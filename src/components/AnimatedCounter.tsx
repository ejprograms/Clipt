
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
    const totalSteps = countDown ? 50 : Math.abs(end - start); // More steps for smoother countdown
    const stepDuration = duration / totalSteps;

    let stepCount = 0;
    const timer = setInterval(() => {
      stepCount++;
      
      if (countDown) {
        const progress = stepCount / totalSteps;
        const currentValue = start - (start - end) * progress;
        
        if (stepCount >= totalSteps) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.round(currentValue * 10) / 10);
        }
      } else {
        const increment = (end - start) / totalSteps;
        const currentValue = start + increment * stepCount;
        
        if (stepCount >= totalSteps) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.round(currentValue));
        }
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
