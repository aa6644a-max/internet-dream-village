# Handoff: 인터넷 드림마을 웹앱 개발

**날짜:** 2026-05-25  
**상태:** PRD 전체 완료 (PRD1~4), 개발 미착수

---

## 현재 상태

PRD 1~4 전체 설계 완료. 랜딩페이지 완성. GitHub 이슈 4개 등록. 코드 작성 미시작.

### 산출물 목록

| 파일 | 설명 |
|---|---|
| `인터넷드림마을_PRD.md` (PRD1) | Phase 1 MVP 전체 기획 + 아키텍처 |
| `인터넷드림마을_PRD2.md` | Phase 2 EFT 미래의 나 AI 자화상 |
| `인터넷드림마을_PRD3.md` | Phase 3 미로 게임 + SVG 고도화 + 그래프 + 수퍼바이저 |
| `인터넷드림마을_PRD4.md` | Phase 4 Expo 전환 + 부모 모니터링 + Android 앱 |
| `landing.html` | 전체 서비스 소개 랜딩페이지 |

### GitHub

- **리포:** https://github.com/aa6644a-max/internet-dream-village
- **이슈 #1:** PRD1 Phase 1 MVP
- **이슈 #2:** PRD2 Phase 2 EFT
- **이슈 #3:** PRD3 Phase 3 게임&고도화
- **이슈 #4:** PRD4 Phase 4 모바일&부모

---

## 확정 아키텍처 결정사항 (Phase 1~3 기준)

| 항목 | 결정 |
|---|---|
| 프레임워크 | Next.js 14 (App Router) + Tailwind CSS + shadcn/ui |
| DB/Auth | Supabase (PostgreSQL + RLS + Storage) |
| 배포 | Vercel |
| AI | Gemini API (감정 분석, 이미지 생성, 위기신호 감지) |
| PDF 저장 | html2canvas + jsPDF (`usePDFExport` 공통 훅) |
| 이메일 알림 | Resend (위기신호, 7일 미접속, 구독 만료) |
| SMS/OTP | Twilio (Phase 4 부모 계정) |
| 학생 로그인 | username 기반 → `{username}@drm.internal` 변환 |
| 수퍼바이저 계정 | 환경변수 자동 생성 |
| 학생 계정 생성 | 개별 폼 + CSV 일괄 업로드 |
| 감정 꽃 SVG | 프리셋 8종 (Phase 3에서 AI 파라미터 고도화) |
| 자가진단 문항 | 하드코딩 (SAS+PHQ-A 기반 10문항) |
| 이미지 저장 | Supabase Storage, WebP 720px 압축 |

---

## Phase별 핵심 결정사항

### PRD2 — Phase 2 (EFT 미래의 나)

| 항목 | 결정 |
|---|---|
| 이미지 생성 API | Gemini API |
| 아바타 방식 | 텍스트 묘사 기반 txt2img |
| 대화 UI | 마법사 4단계 + AI 재질문 혼합형 |
| 이미지 생성 순서 | 5년후 → 리플렉션 → "10년후도?" 선택 |
| 리플렉션 노트 | 3문항 순차 표시 |
| 갤러리 | 슬라이드쇼 (시간순) |
| 세션 주기 | 월 5회 디폴트, 관리자 조정 가능 |
| 외모 앵커 | 첫 세션 입력 + 이후 수정 가능 |
| 오류 처리 | 자동 재시도 3회, 횟수 미차감, "현재 사용량이 많아서..." |

### PRD3 — Phase 3 (게임 & 고도화)

| 항목 | 결정 |
|---|---|
| 미로 컴포넌트 | 기존 `브레인-리셋_-10단계-미로-프로젝트` Maze.tsx 이식 |
| 미로 원본 경로 | `D:\다운로드\브레인-리셋_-10단계-미로-프로젝트` |
| 난이도 강화 | 시야 제한(안개) + 타이머 + 힌트 시스템 |
| 시야 범위 | Lv1~3: 7×7 / Lv4~7: 5×5 / Lv8~10: 3×3 |
| 타이머 | 초과 시 경고만, 제한 내 클리어 시 보너스 |
| 힌트 | 판당 3회, 정답 경로 3초 표시, 사용 시 보너스 미지급 |
| 입력 | 스와이프 + 화면 버튼 + 키보드 동시 |
| 레벨 진행 | 순서대로, 10단계 후 랜덤 |
| 일일 시간 제한 | 디폴트 15분, 관리자 설정 가능 |
| 뱃지 | 5종 (첫클리어, 스피드런, 노힌트, 전레벨, 개근왕) |
| 꽃 SVG | 프리셋 베이스 + AI 파라미터 조절 (bloom/droop/color 등) |
| 스마트폰 사용량 | 매일 슬라이더 자기보고 (0~12시간) |
| 상관관계 그래프 | 상하 이중 선 그래프 (Recharts), 날짜 축 동기화 |
| 수퍼바이저 | PRD1 범위 + 관리자 비밀번호 초기화 추가 |

### PRD4 — Phase 4 (모바일 & 부모)

| 항목 | 결정 |
|---|---|
| 모바일 앱 | React Native (Expo), Android 전용 (iOS 추후) |
| 코드베이스 | Expo 단일 (웹+앱 동시 지원) |
| 관리자 접속 | Expo Web (PC 브라우저), 레이아웃 분기 |
| 학생 접속 | Android 앱 (Google Play) |
| 배포 | EAS Build + Google Play (법인 계정) |
| OTA 업데이트 | Expo Updates |
| 아바타 일관성 | 첫 세션 이미지 → 이후 세션 style reference (img2img) |
| 부모 계정 생성 | 직접 가입 + 연결 코드 (DRM-XXXX, 24시간 유효) |
| 부모 인증 | 전화번호 + Twilio OTP |
| 부모 열람 | 접속현황 + 자가진단 수준 + 스마트폰 사용시간 (일기/이미지 불가) |
| 부모 알림 | 위기신호: SMS+푸시 동시 / 일반: 푸시만 |
| 전환 시점 | Phase 1~3 Next.js 완성 후 Expo 전환 |

---

## 보유 인프라 계정

| 서비스 | 상태 |
|---|---|
| Supabase | 계정 있음 (프로젝트 생성 필요) |
| Vercel | 계정 있음 |
| Gemini API | 키 있음 |
| GitHub | aa6644a-max 계정, 리포 생성 완료 |
| Resend | 계정 없음 — 생성 필요 |
| Twilio | 계정 없음 — Phase 4 때 생성 |
| Claude API | 없음 — 추후 선택 |
| Google Play | 법인 계정 — Phase 4 때 사업자 등록 후 생성 |

---

## 개발 체크리스트

### PRD 설계

- [x] PRD1 — Phase 1 MVP 설계 완료
- [x] PRD2 — Phase 2 EFT 미래의 나 설계 완료
- [x] PRD3 — Phase 3 게임 & 고도화 설계 완료
- [x] PRD4 — Phase 4 모바일 & 부모 설계 완료
- [x] GitHub 이슈 #1~4 등록 완료
- [x] 랜딩페이지 (`landing.html`) 완성

### Phase 1 개발 (다음 세션 시작점)

- [ ] Supabase 프로젝트 생성 (프로젝트명, DB 리전 설정)
- [ ] Next.js 프로젝트 생성 (`npx create-next-app@latest`, App Router, TypeScript, Tailwind)
- [ ] `.env.local` 환경변수 설정 (Supabase URL/Key, Gemini API Key)
- [ ] Resend 계정 생성 + API 키 발급
- [ ] DB 스키마 마이그레이션 (PRD1 5장 데이터 모델 기준)
- [ ] Supabase RLS 정책 설정
- [ ] 3-Tier 인증 구현 (username 기반 로그인 + 미들웨어)
- [ ] 수퍼바이저 계정 자동 생성 (환경변수 기반)
- [ ] 학생 계정 생성 UI (개별 폼 + CSV 업로드)
- [ ] 마음일기 — 텍스트 작성 + Gemini 감정 분석
- [ ] 감정 꽃 SVG 프리셋 8종 구현
- [ ] 감정 꽃 갤러리 (날짜별)
- [ ] 위기신호 감지 → Resend 이메일 알림
- [ ] 자가진단 10문항 + 점수 + 추이 그래프
- [ ] 관리자 대시보드 (학생 목록 + 개별 상세)
- [ ] 수퍼바이저 대시보드 기초
- [ ] 첫 커밋 & Vercel 연동
- [ ] `usePDFExport` 공통 훅 구현 (html2canvas + jsPDF, 스마트 페이지 분할)
- [ ] PDF 저장 — 학생 자가진단 결과 (결과 화면 하단 버튼)

### Phase 2 개발

- [ ] DB 스키마 추가 (`ciref_sessions`, `student_appearance`, `future_images` 확장)
- [ ] 외모 앵커 입력 UI
- [ ] CIREF 4단계 마법사 UI + AI 재질문
- [ ] Gemini 이미지 생성 파이프라인 (WebP 압축 → Supabase 업로드)
- [ ] 프로그레시브 리빌 UX (5년후 → 리플렉션 → 10년후 선택)
- [ ] 슬라이드쇼 갤러리
- [ ] 세션 횟수 관리 (월 초기화)
- [ ] 관리자 대시보드 Phase 2 항목 추가
- [ ] PDF 저장 — 학생 CIREF 결과 (이미지 + 리플렉션 노트, CORS 처리)

### Phase 3 개발

- [ ] 미로 컴포넌트 이식 (`Maze.tsx`, `levels.ts`)
- [ ] 시야 제한 (안개 SVG 오버레이)
- [ ] 게임 메카닉 (타이머, 힌트, 입력)
- [ ] 포인트 & 뱃지 시스템
- [ ] 일일 시간 제한
- [ ] 꽃 SVG 파라미터화 + Gemini 연동
- [ ] 스마트폰 사용량 수집 (슬라이더)
- [ ] 상관관계 이중 선 그래프
- [ ] 수퍼바이저 구독 관리 완성 + 관리자 비밀번호 초기화
- [ ] PDF 저장 — 관리자 학생 개별 리포트 (풀스펙)
- [ ] PDF 저장 — 관리자 전체 학생 요약 리포트
- [ ] PDF 저장 — 관리자 위기신호 이력 리포트

### Phase 4 개발

- [ ] Expo 프로젝트 초기화
- [ ] 컴포넌트 마이그레이션 (Next.js → Expo)
- [ ] 미로 SVG → react-native-svg
- [ ] 차트 → Victory Native
- [ ] 레이아웃 분기 (모바일/PC 웹)
- [ ] 부모 계정 시스템 (연결 코드 + 전화번호 OTP)
- [ ] Expo Push Notifications
- [ ] 아바타 일관성 (img2img)
- [ ] EAS Build 설정
- [ ] Google Play 법인 계정 등록 + 배포

---

## 다음 세션 시작점

**Phase 1 개발 시작.** 순서:

1. Supabase 프로젝트 생성
2. `npx create-next-app@latest` (App Router, TypeScript, Tailwind)
3. `.env.local` 환경변수
4. DB 스키마 + RLS 마이그레이션
5. 3-Tier 인증 구현
6. Vercel 연동

---

## 주의사항

- 학생 데이터는 미성년자 개인정보 → 일기 텍스트 암호화 필수
- AI 위기 감지는 보조 도구 — 최종 판단은 관리자(상담사)
- SAS·PHQ-A 문항 하드코딩 — 관리자 임의 수정 불가 (임상 타당도 보장)
- API 키, 비밀번호 등 민감정보는 이 문서에 기록 안 함
- 미로 원본 파일: `D:\다운로드\브레인-리셋_-10단계-미로-프로젝트` (Phase 3 이식 시 사용)
- Phase 4 전 사업자 등록 필요 (Google Play 법인 계정)

---

## 제안 스킬

다음 세션에서 유용한 스킬:

- `/grill-me` — DB 스키마 설계, RLS 정책 구조 결정 시
- `/to-issues` — Phase 1 구현을 GitHub 이슈 단위로 세분화할 때
- `/caveman-review` — PR 코드 리뷰 시
- `/run` — 개발 서버 실행 및 기능 검증 시
- `/verify` — 기능 구현 후 실제 동작 확인 시
