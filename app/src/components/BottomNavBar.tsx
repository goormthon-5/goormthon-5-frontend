'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HStack, Text, VStack } from '@vapor-ui/core';

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
      <HStack
        $css={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #F3F3F3',
          boxSizing: 'border-box',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ textDecoration: 'none' }}
            >
              <VStack
                style={styles.itemPadding}
                $css={{
                  width: '80px',
                  height: '80px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
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
                <Text
                  style={{
                    color: isActive ? '#111' : '#989898',
                    fontWeight: isActive ? 600 : 400,
                  }}
                  $css={{
                    textAlign: 'center',
                    fontFamily: 'Preendard, sans-serif',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                    textTransform: 'capitalize',
                  }}
                >
                  {item.label}
                </Text>
              </VStack>
            </Link>
          );
        })}
      </HStack>
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
    zIndex: 1000,
  },
  itemPadding: {
    paddingTop: 'var(--vapor-size-space-250)',
    paddingRight: '29px',
    paddingBottom: 'var(--vapor-size-space-225)',
    paddingLeft: '28px',
  },
} as const;
