'use client';

interface ActionButtonProps {
  label: string;
  showPlus?: boolean;
  onClick?: () => void;
}

export default function ActionButton({
  label,
  showPlus = true,
  onClick,
}: ActionButtonProps) {
  return (
    <button type="button" style={styles.button} onClick={onClick}>
      {showPlus && <span style={styles.plus}>+</span>}
      <span style={styles.label}>{label}</span>
    </button>
  );
}

const styles = {
  button: {
    display: 'flex',
    width: '100%',
    height: 'var(--dimension-600, 48px)',
    padding: `0 var(--vapor-size-space-150)`,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 'var(--vapor-size-space-050)',
    borderRadius: 'var(--vapor-size-borderRadius-300, 8px)',
    border: '1px solid #E1E1E1',
    backgroundColor: 'var(--vapor-color-background-normal, #fff)',
    cursor: 'pointer',
    fontFamily: 'Pretendard, sans-serif',
  },
  plus: {
    color: 'var(--vapor-color-gray-900, #333)',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: 'normal',
  },
  label: {
    color: 'var(--vapor-color-gray-900, #333)',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 'normal',
  },
} as const;
