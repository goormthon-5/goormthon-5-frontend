'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: '홈', href: '/', icon: '/icons/home-icon.svg' },
  { label: '지도', href: '/map', icon: '/icons/location-icon.svg' },
  { label: '예약', href: '/reservation', icon: '/icons/bookmark-icon.svg' },
  { label: '마이', href: '/my', icon: '/icons/user-icon.svg' },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav style={styles.nav}>
      <div style={styles.wrapper}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={styles.item}>
              <Image
                src={item.icon}
                alt={item.label}
                width={23}
                height={23}
                style={{
                  filter: isActive
                    ? 'brightness(0)'
                    : 'brightness(0) opacity(0.4)',
                }}
              />
              <span
                style={{
                  ...styles.label,
                  color: isActive ? '#111' : '#989898',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed' as const,
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',

    width: '100%',
    maxWidth: '390px',
    height: '80px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',

    backgroundColor: '#ffffff',
    borderTop: '1px solid #F3F3F3',
    zIndex: 1000,
    boxSizing: 'border-box' as const,
  },
  wrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    width: '80px',
    height: '80px',
    padding: '20px 29px 18px 28px',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
  },
  label: {
    color: '#989898',
    textAlign: 'center' as const,
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    textTransform: 'capitalize' as const,
  },
} as const;
