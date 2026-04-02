FROM node:18

# pnpm 설치
RUN npm install -g pnpm

# 앱 디렉토리 설정
WORKDIR /app

# 먼저 package.json과 pnpm-lock.yaml만 복사 (캐시 최적화)
COPY app/package.json app/pnpm-lock.yaml ./

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 전체 앱 소스 복사
COPY app/ .

# 빌드 시 환경변수 주입
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_KAKAO_MAP_KEY
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_KAKAO_MAP_KEY=$NEXT_PUBLIC_KAKAO_MAP_KEY

# 앱 빌드
RUN pnpm build

# 포트 노출
EXPOSE 3000

# Next.js 실행
CMD ["pnpm", "start"]
