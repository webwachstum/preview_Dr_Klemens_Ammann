import React from 'react';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children, className = '' }) => {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-start gap-4 transition-all hover:shadow-md ${className}`}>
      <div className="p-3 bg-medical-50 text-medical-800 rounded-xl">
        {icon}
      </div>
      <div>
        <h3 className="font-display font-semibold text-lg text-slate-900 mb-2">{title}</h3>
        <div className="text-slate-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};