'use client';

import { getColorForUser } from '@/lib/store';

interface StudentAvatarProps {
  userId: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export function StudentAvatar({ userId, name, size = 'md' }: StudentAvatarProps) {
  const color = getColorForUser(userId);
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full font-bold ${color} ${sizeClasses[size]}`}
    >
      {initials}
    </div>
  );
}
