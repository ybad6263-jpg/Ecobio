import React from 'react';

interface LayoutWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutWrapper({ children, className = '' }: LayoutWrapperProps) {
  return (
    <div className={`mx-auto max-w-4xl px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
