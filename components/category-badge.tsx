'use client';

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  const categoryColors: Record<string, string> = {
    '#Biology': 'bg-emerald-100 text-emerald-700',
    '#Chemistry': 'bg-orange-100 text-orange-700',
    '#Physics': 'bg-blue-100 text-blue-700',
    '#Economics': 'bg-purple-100 text-purple-700',
    '#English': 'bg-rose-100 text-rose-700',
    '#Mathematics': 'bg-cyan-100 text-cyan-700',
    '#University': 'bg-indigo-100 text-indigo-700',
    '#General': 'bg-primary/10 text-primary',
  };

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
        categoryColors[category] || categoryColors['#General']
      } ${className}`}
    >
      {category}
    </span>
  );
}
