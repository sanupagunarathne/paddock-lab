import React, { useState } from 'react';

interface StepItem {
  num: string;
  badge: string;
  title: string;
  desc: string;
  meta: string;
}

const STEPS: StepItem[] = [
  {
    num: '01',
    badge: 'NON-INVASIVE',
    title: 'Strap On & Connect in 90 Seconds',
    desc: 'The self-powered unit mounts onto standard kart steering wheels without wiring cuts. Twin AS5600 contactless magnetic induction sensors monitor throttle and brake travel without touching the hydraulic lines.',
    meta: 'Operator-approved • Zero frame drill',
  },
  {
    num: '02',
    badge: 'FAIL-SAFE LOGGING',
    title: '100Hz Central Clock & Local Buffering',
    desc: 'The dual-core ESP32-S3 acquisition clock samples IMU motion at 100Hz and high-rate GNSS fixes, continuously logging to local 32GB Class 10 storage to ensure zero session records are lost.',
    meta: 'Timestamped records • MicroSD backup',
  },
  {
    num: '03',
    badge: 'DATA PIPELINE',
    title: 'Sector Alignment & Feature Extraction',
    desc: 'The processing pipeline filters chassis vibration noise, detects directional start/finish crossings along the SpeedBay track reference, and isolates corner entry, apex, and exit speeds.',
    meta: 'Directional crossings • Clean lap comparison',
  },
  {
    num: '04',
    badge: 'EVIDENCE-BASED AI',
    title: 'Personalized AI Driver Debrief',
    desc: 'A compact decision-tree model compares driver runs against instructor baselines, ranking opportunities by measured time loss and outputting at most two actionable practice targets per session.',
    meta: 'Max 2 targets • No hallucinated advice',
  },
];

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <section className="bg-[#f0eded] text-[#171719] py-20 px-6 font-sans" id="how-it-works">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-[#f0edef] border border-[#171719]/10 rounded-full px-4 py-2 mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#701820] animate-pulse"></span>
            <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#171719]">HOW IT WORKS // SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">From Sensor Clock to Driver Debrief</h2>
          <p className="text-[#85858c] text-base leading-relaxed">
            A staged, scientifically grounded engineering pipeline designed to satisfy both academic rigour and fast-paced trackside demands.
          </p>
        </div>

        {/* 4-Stage Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => {
            const isActive = activeStep === step.num;
            return (
              <article
                key={step.num}
                onClick={() => setActiveStep(isActive ? null : step.num)}
                className={`bg-[#d9d9de] border rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'border-[#701820] shadow-xl -translate-y-1.5' 
                    : 'border-[#171719]/10 hover:border-[#c75a5e] hover:-translate-y-1.5 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-2xl font-bold ${isActive ? 'text-[#701820]' : 'text-[#171719]/30'}`}>{step.num}</span>
                    <span className="font-mono text-[10px] font-bold uppercase text-[#701820] bg-[#f0edef] border border-[#701820]/20 px-2.5 py-1 rounded-full">
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight mb-3 text-[#171719]">{step.title}</h3>
                  <p className="text-[#85858c] text-sm leading-relaxed mb-6">{step.desc}</p>
                </div>
                <div className="pt-4 border-t border-[#171719]/10 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#701820] shrink-0"></span>
                  <span className="font-mono text-xs text-[#85858c] font-medium">{step.meta}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};