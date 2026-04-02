'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { HStack, Text, VStack, Box } from '@vapor-ui/core';
import CategoryTag from './CategoryTag';
import HouseCard from './HouseCard';
import IcWifiO from '@/assets/icons/wifi-o.svg';
import IcWifiX from '@/assets/icons/wifi-x.svg';

interface HostInfo {
  personality?: string | null;
  trait?: string | null;
  cleanlinessLevel?: string | null;
  hasWifi?: boolean | null;
}

interface SamchonCardProps {
  imageUrl: string;
  bgColor?: string;
  location: string;
  name: string;
  cost?: number | null;
  hostInfo?: HostInfo | null;
  tags: { label: string; color?: string }[];
  onClick?: () => void;
  renderRightTop?: ReactNode;
  children?: ReactNode;
}

const CLEAN_LABEL: Record<string, string> = {
  LV1: '보통',
  LV2: '깔끔',
  LV3: '매우 깔끔',
};

export default function SamchonCard({
  imageUrl,
  bgColor = '#E0F4FF',
  location,
  name,
  cost,
  hostInfo,
  tags,
  onClick,
  renderRightTop,
  children,
}: SamchonCardProps) {
  return (
    <VStack
      onClick={onClick}
      $css={{
        cursor: 'pointer',
        width: '100%',
        maxWidth: '350px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <HouseCard imageUrl={imageUrl} bgColor={bgColor} />

      <VStack
        style={{
          padding: '17px',
          minHeight: '113px',
          gap: '5px',
        }}
        $css={{
          border: '1px solid #E1E1E1',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
        }}
      >
        <HStack
          $css={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <VStack $css={{ gap: '2px' }}>
            <Text style={styles.location}>{location}</Text>
            <Text style={styles.name}>{name}</Text>
          </VStack>

          <Box $css={{ flexShrink: 0 }}>{renderRightTop}</Box>
        </HStack>

        <HStack style={{ gap: '6px', marginTop: '4px' }}>
          {tags.map((tag) => (
            <CategoryTag key={tag.label} label={tag.label} color={tag.color} />
          ))}
        </HStack>

        {/* 가격 */}
        {cost != null && (
          <Text style={styles.cost}>
            {cost.toLocaleString()}원
            <span style={{ fontSize: '11px', fontWeight: 400, color: '#A1A1A1' }}> /박</span>
          </Text>
        )}

        {/* 호스트 정보 */}
        {hostInfo && (hostInfo.personality || hostInfo.trait || hostInfo.cleanlinessLevel || hostInfo.hasWifi != null) && (
          <HStack style={{ gap: '5px', marginTop: '2px', flexWrap: 'wrap' }}>
            {hostInfo.personality && (
              <Box style={styles.infoTag}>
                <Text style={styles.infoTagText}>{hostInfo.personality}</Text>
              </Box>
            )}
            {hostInfo.trait && (
              <Box style={styles.infoTag}>
                <Text style={styles.infoTagText}>{hostInfo.trait}</Text>
              </Box>
            )}
            {hostInfo.cleanlinessLevel && (
              <Box style={styles.infoTag}>
                <Text style={styles.infoTagText}>{CLEAN_LABEL[hostInfo.cleanlinessLevel] || hostInfo.cleanlinessLevel}</Text>
              </Box>
            )}
            {hostInfo.hasWifi != null && (
              <Box style={{
                ...styles.infoTag,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3px 6px',
              }}>
                <Image
                  src={hostInfo.hasWifi ? IcWifiO : IcWifiX}
                  alt={hostInfo.hasWifi ? 'Wi-Fi 가능' : 'Wi-Fi 불가'}
                  width={14}
                  height={14}
                />
              </Box>
            )}
          </HStack>
        )}

        {children && <Box style={{ marginTop: '5px' }}>{children}</Box>}
      </VStack>
    </VStack>
  );
}

const styles = {
  location: {
    fontSize: 'var(--vapor-typography-fontSize-050, 12px)',
    fontWeight: 500,
    lineHeight: 'var(--vapor-typography-lineHeight-050, 18px)',
    color: '#A1A1A1',
  },
  name: {
    fontSize: 'var(--vapor-typography-fontSize-200, 18px)',
    fontWeight: 700,
    lineHeight: 'var(--vapor-typography-lineHeight-200, 26px)',
    letterSpacing: 'var(--vapor-typography-letterSpacing-100, -0.1px)',
    color: '#262626',
    margin: 0,
  },
  cost: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#2B343B',
    margin: 0,
    marginTop: '2px',
  },
  infoTag: {
    backgroundColor: '#F5F5F5',
    borderRadius: '12px',
    padding: '2px 8px',
  },
  infoTagText: {
    fontSize: '10.5px',
    fontWeight: 500,
    color: '#666',
    whiteSpace: 'nowrap' as const,
  },
} as const;
