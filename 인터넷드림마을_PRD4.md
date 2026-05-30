# 인터넷 드림마을 (Internet Dream Village)
## Phase 4 — 추후 고도화 PRD
**버전:** v1.0  
**작성일:** 2026-05-25  
**선행 문서:** PRD1 (Phase 1), PRD2 (Phase 2), PRD3 (Phase 3)  
**개발 방식:** Claude Code (Vibe Coding)

---

## 1. 개요

### 1.1 Phase 4 범위
- Next.js → Expo 전환 (웹 + Android 앱 단일 코드베이스)
- 아바타 일관성 (Consistent Character Generation)
- 부모 모니터링 계정
- Google Play 배포 (법인 계정)

### 1.2 선행 조건
**Phase 1~3 Next.js 완성 및 검증 후 착수.** Phase 4는 전체 플랫폼 전환이므로 이전 Phase 기능이 안정화된 후 진행.

---

## 2. 플랫폼 전환 — Next.js → Expo

### 2.1 전략

**단일 코드베이스로 웹 + Android 앱 동시 지원:**

```
동일 Expo 코드
  → eas build (Android APK/AAB) → Google Play
  → expo web (브라우저 접속) → Vercel 배포
```

**사용자별 접속 환경:**

| 사용자 | 접속 방식 | UI |
|---|---|---|
| 학생 | Android 앱 (Google Play 설치) | 모바일 앱 UI |
| 관리자 | PC 브라우저 (Expo Web) | 대시보드 UI |
| 수퍼바이저 | PC 브라우저 (Expo Web) | 대시보드 UI |
| 부모 | Android 앱 또는 브라우저 | 모니터링 UI |

### 2.2 기술 스택 전환

| 항목 | Phase 1~3 (Next.js) | Phase 4 (Expo) |
|---|---|---|
| 프레임워크 | Next.js 14 App Router | Expo SDK (최신) |
| 스타일링 | Tailwind CSS | NativeWind |
| UI 컴포넌트 | shadcn/ui | React Native 컴포넌트 |
| 라우팅 | Next.js App Router | Expo Router |
| API | Next.js API Routes | Supabase 직접 호출 + Edge Functions |
| 배포 (웹) | Vercel | Vercel (Expo Web) |
| 배포 (앱) | 없음 | EAS Build → Google Play |
| 푸시 알림 | 없음 | Expo Push Notifications |
| OTA 업데이트 | 없음 | Expo Updates |

### 2.3 레이아웃 분기 전략

```typescript
// 플랫폼별 레이아웃 분기
import { Platform } from 'react-native';
import { useWindowDimensions } from 'react-native';

const isWeb = Platform.OS === 'web';
const isDesktop = width >= 1024;

// 관리자 대시보드: PC 웹 → 풀 대시보드 레이아웃
// 학생: 모바일 앱 → 앱 UI 레이아웃
```

### 2.4 전환 작업 범위

```
1. Expo 프로젝트 초기화 (Expo Router + NativeWind)
2. Supabase 클라이언트 React Native 호환 설정
3. 컴포넌트 마이그레이션:
   - div → View
   - p/span → Text
   - img → Image
   - Tailwind 클래스 → NativeWind 클래스
4. 네비게이션 → Expo Router 파일 기반 라우팅
5. 미로 컴포넌트 → React Native SVG로 전환
6. 차트 → Victory Native (Recharts → React Native 호환)
7. 웹 레이아웃 → PC 반응형 분기
```

### 2.5 배포 설정

```json
// eas.json
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

```
Google Play 배포 흐름:
  eas build → AAB 생성 → Google Play Console 업로드
  → 심사 (미성년자 대상 앱 정책 준수 확인)
  → 배포

OTA 업데이트:
  JS 변경 시 → eas update → 앱 재시작 시 자동 적용
  (앱스토어 재심사 불필요)
```

---

## 3. 아바타 일관성 (Consistent Character Generation)

### 3.1 현재 (Phase 2) vs Phase 4

| | Phase 2 | Phase 4 |
|---|---|---|
| 방식 | 텍스트 앵커만 | 첫 세션 이미지 → style reference |
| 일관성 | 중간 (텍스트 묘사 의존) | 높음 (이미지 참조) |
| API | txt2img | img2img |

### 3.2 구현 방식

```
첫 CIREF 세션
  → 이미지 생성 (txt2img, 텍스트 앵커 기반)
  → Supabase Storage 저장
  → `avatar_reference_url` 컬럼에 저장

이후 CIREF 세션
  → avatar_reference_url 이미지 로드
  → Gemini img2img API 호출
      입력: 참조 이미지 + 새 장면 프롬프트
      출력: 동일 인물 스타일의 새 이미지
```

**프롬프트 구조 (Phase 4):**
```
[참조 이미지] (첫 세션 생성 이미지)
+ [고정 접두어] 한국인 청소년, 수채화 스타일, 1인칭 시점
+ [외모 앵커] 텍스트 묘사 (보조)
+ [새 장면 묘사] CIREF 답변 기반 AI 생성
+ [시간 변수] 5년 후 / 10년 후
```

### 3.3 데이터 모델 추가

```sql
-- student_appearance 테이블 컬럼 추가
student_appearance
  + avatar_reference_url  -- 첫 세션 생성 이미지 URL
  + avatar_created_at     -- 참조 이미지 생성 일시
```

### 3.4 미결 사항

- Gemini img2img API 지원 여부 → 개발 시점 확인 필요
- 미지원 시 대안: fal.ai IP-Adapter 또는 Replicate

---

## 4. 부모 모니터링 계정

### 4.1 계정 생성 흐름

**연결 코드 방식 (학생 주도, 동의 기반):**

```
① 학생 앱 → [부모 연결하기]
    → 6자리 연결 코드 생성 (예: DRM-4829)
    → 유효시간 24시간
    → 카카오/문자로 부모에게 전달

② 부모 앱/웹 → 회원가입
    → 전화번호 입력
    → Twilio OTP SMS 인증
    → 비밀번호 설정
    → 연결 코드 입력 (DRM-4829)
    → 자녀 계정 자동 연결

③ 학생 앱 → "부모 연결 완료" 알림
    → 학생이 언제든 연결 해제 가능
```

### 4.2 부모 열람 가능 항목

| 항목 | 부모 열람 | 이유 |
|---|---|---|
| 자녀 마지막 접속일 | ✅ | 참여도 확인 |
| 자가진단 수준 (관심/주의/위험) | ✅ | 점수 아닌 수준만 |
| 스마트폰 사용 시간 추이 | ✅ | |
| 위기 신호 알림 수신 | ✅ | |
| 마음일기 전문 | ❌ | 프라이버시 → 솔직한 기록 방해 |
| 미래 이미지 갤러리 | ❌ | 학생 동의 없이 내면 노출 |
| 자가진단 세부 점수 | ❌ | 수준만으로 충분 |

### 4.3 부모 알림

| 상황 | 채널 |
|---|---|
| 위기 신호 감지 | SMS (Twilio) + 앱 푸시 동시 |
| 자가진단 수준 위험 진입 | SMS + 앱 푸시 동시 |
| 7일 미접속 | 앱 푸시만 |
| 자가진단 수준 개선 | 앱 푸시만 (긍정 알림) |

### 4.4 데이터 모델

```sql
parents
  - id
  - phone_number       -- 전화번호 (Supabase Auth)
  - name
  - created_at
  - last_login_at

parent_student_links
  - id
  - parent_id
  - student_id
  - linked_at

parent_link_codes
  - id
  - code               -- "DRM-4829" (6자리)
  - student_id
  - expires_at         -- 24시간
  - used               -- boolean
  - created_at
```

### 4.5 부모 UI 화면 구성

```
부모 홈
  ├── 자녀 프로필 카드
  │     - 이름 / 마지막 접속일
  │     - 자가진단 수준 뱃지 (관심 / 주의 / 위험)
  │
  ├── 스마트폰 사용 시간 그래프 (최근 7일)
  │
  ├── 위기 신호 알림 이력
  │
  └── 연결 해제 버튼
```

---

## 5. Google Play 배포

### 5.1 배포 주체
- **법인/기관 계정** — 사업자 등록 후 Google Play Console 등록
- 등록비: $25 (1회)

### 5.2 미성년자 대상 앱 정책 준수 체크리스트

```
□ 개인정보 처리방침 명시 (학생 데이터 수집 항목, 보관 기간)
□ 행동 기반 광고 없음
□ 제3자 SDK 최소화
□ 학부모 동의 메커니즘 (부모 연결 코드 시스템으로 충족)
□ 앱 콘텐츠 등급: 청소년 (13세 이상)
□ 데이터 안전 섹션 작성 (Play Console)
```

### 5.3 배포 흐름

```
eas build --platform android --profile production
  → AAB 파일 생성
  → Google Play Console 업로드
  → 내부 테스트 → 비공개 테스트 → 공개 출시
```

---

## 6. 푸시 알림 시스템

### 6.1 Expo Push Notifications 설정

```
학생/부모 앱 최초 실행 시:
  → 푸시 알림 권한 요청
  → Expo Push Token 발급
  → Supabase users 테이블에 저장

알림 발송 흐름:
  Supabase Edge Function 트리거
    → Expo Push API 호출
    → 학생/부모 기기에 푸시 전달
```

### 6.2 데이터 모델 추가

```sql
-- users 테이블 컬럼 추가
users
  + expo_push_token    -- Expo 푸시 토큰
  + push_enabled       -- boolean, default true
```

---

## 7. 개발 순서

1. **Expo 프로젝트 초기화** — Expo Router + NativeWind + Supabase 설정
2. **컴포넌트 마이그레이션** — Phase 1~3 UI → React Native 컴포넌트
3. **미로 SVG 전환** — react-native-svg 기반 재작성
4. **차트 전환** — Victory Native
5. **레이아웃 분기** — 모바일(학생) / PC 웹(관리자) 분기
6. **부모 계정 시스템** — 연결 코드, 전화번호 인증, 모니터링 UI
7. **푸시 알림** — Expo Push Token + Edge Function
8. **아바타 일관성** — img2img API 연동
9. **EAS Build 설정** — Android 빌드 자동화
10. **Google Play 배포** — 법인 계정 등록 → 심사 → 출시

---

## 8. 미결 사항

| 항목 | 내용 |
|---|---|
| Gemini img2img | Phase 4 개발 시점 API 지원 여부 확인 |
| iOS 지원 | 추후 별도 논의 (Apple 개발자 계정 $99/년) |
| 카카오 알림톡 | 사업자 등록 후 연결 코드 전달에 활용 가능 |
| 사업자 등록 | Google Play 법인 계정 등록 선행 필요 |
| 개인정보 처리방침 | 법률 검토 후 작성 필요 (미성년자 데이터) |

---

*본 PRD4는 Phase 1~3 Next.js 완성 및 검증 후 착수 기준 문서입니다.*
