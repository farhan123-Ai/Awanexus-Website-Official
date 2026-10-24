import React, { useState, useEffect } from 'react';
import { EXPERIENCE_STATS } from '../data/initialData';
import { GraduationCap, Palette, Video, Table, Bot, Code2, Award, Clock } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Teaching & Education': <GraduationCap className="w-6 h-6 text-emerald-600" />,
  'Graphic Design': <Palette className="w-6 h-6 text-purple-600" />,
  'Video Editing': <Video className="w-6 h-6 text-rose-600" />,
  'Microsoft Office & Excel': <Table className="w-6 h-6 text-teal-600" />,
  'Artificial Intelligence Work': <Bot className="w-6 h-6 text-blue-600" />,
  'Python Programming': <Code2 className="w-6 h-6 text-amber-600" />,
};

export const ExperienceCounter: React.FC = () => {
  const [animatedYears, setAnimatedYears] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const duration = 1200; // ms
    const steps = 24;
    const stepDuration = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);

      setAnimatedYears(
        EXPERIENCE_STATS.map((item) => Math.round(item.years * eased))
      );

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedYears(EXPERIENCE_STATS.map((item) => item.years));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXPERIENCE_STATS.map((item, idx) => (
          <div
            key={item.field}
            className="group relative rounded-3xl p-6 bg-white border border-slate-200 hover:border-sky-400 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {iconMap[item.field] || <Award className="w-6 h-6 text-blue-600" />}
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {item.highlight}
                </span>
              </div>

              <div className="flex items-baseline space-x-1.5 mb-2">
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  {animatedYears[idx]}+
                </span>
                <span className="text-lg font-bold text-sky-600">Years</span>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-2">
                {item.field}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.details}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              <span>Dedicated Professional Domain Experience</span>
            </div>
          </div>
        ))}
      </div>

      {/* Experience clarification callout */}
      <div className="mt-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
        <p className="text-xs text-slate-600">
          <span className="font-bold text-slate-900">Verified Experience Record:</span> Each duration represents dedicated individual professional work and academic coaching, presented transparently without misleading cumulative totals.
        </p>
      </div>
    </div>
  );
};
