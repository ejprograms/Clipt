
import React from 'react';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { FadingInstructions } from '@/components/FadingInstructions';
import { Sparkles } from 'lucide-react';

export const StatsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up">
      <div className="stats-box rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Videos Clipped</h3>
        <AnimatedCounter target={4965} suffix="+" duration={3000} className="text-4xl font-bold text-white" />
      </div>
      <div className="stats-box rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Processing Speed</h3>
        <AnimatedCounter target={1.3} suffix=" seconds" duration={3000} startFrom={10} className="text-4xl font-bold text-white" countDown />
      </div>
      <div className="stats-box rounded-lg p-6 text-center">
        <div className="flex items-center justify-center mb-2">
          <Sparkles className="w-6 h-6 text-white mr-2" />
          <h3 className="text-lg font-semibold text-white">How it works</h3>
        </div>
        <FadingInstructions />
      </div>
    </div>
  );
};
