'use client';

export const TAG_COLORS = {
  blue: '#4BC2FF',
  orange: '#FFB632',
  green: '#00E284',
} as const;

interface CategoryTagProps {
  label: string;
  color?: string;
}

export default function CategoryTag({
  label,
  color = '#4BC2FF',
}: CategoryTagProps) {
  return (
    <div
      style={{
        display: 'flex',
        height: '23px',
        padding: '0 9px 0 3px',
        alignItems: 'center',
        gap: '3px',
        borderRadius: '15px',
        backgroundColor: color,
      }}
    >
      <div
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
        }}
      />
      <span
        style={{
          color: '#fff',
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '10.206px',
          fontWeight: 400,
          lineHeight: 'normal',
        }}
      >
        {label}
      </span>
    </div>
  );
}
