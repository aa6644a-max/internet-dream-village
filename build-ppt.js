const PptxGenJS = require('pptxgenjs');

async function build() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.title = '인터넷 드림마을';
  pptx.author = 'MK';
  pptx.theme = { headFontFace: "Pretendard", bodyFontFace: "Pretendard" };

  // ─── PALETTE (아이보리 라이트) ──────────────────────────────
  const PALETTE = {
    header:              "2C3E35",  // 소프트 다크 그린-차콜 (헤더 바)
    accent:              "4A9E75",  // 차분한 민트 그린
    positive:            "4A9E75",
    caution:             "C07820",  // 웜 앰버
    negative:            "B03030",  // 소프트 레드
    brand:               "4A9E75",
    panelBg:             "FAF8F2",  // 아이보리 패널
    slideBg:             "FFFEFB",  // 슬라이드 배경 (웜 화이트)
    divider:             "DDD8CC",  // 따뜻한 회색
    textDark:            "2C3A2E",  // 진한 텍스트
    textBody:            "5C6B5E",  // 본문 텍스트
    white:               "FFFEFB",  // 따뜻한 화이트
    accentLight:         "E8F5EE",  // 연한 민트
    negativeBg:          "FDECEA",
    negativeBgDark:      "F0B8B0",
    positiveBg:          "E8F5EE",
    positiveBgDark:      "C4E0CF",
    imagePlaceholder:    "EDE9DE",
    imagePlaceholderText:"9A917E",
    titleBg:             "F4F1E8",  // 표지 배경 (따뜻한 아이보리)
    headerLight:         "3D5447",  // 헤더 약간 밝은 버전 (부제목)
  };
  const P = PALETTE;

  // 슬라이드 공통 배경 함수
  function addSlideBg(slide) {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 13.33, h: 7.50,
      fill: { color: P.slideBg },
    });
  }

  // SlideHeader 공통 함수
  function addHeader(slide, title, subtitle, num) {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 13.33, h: 1.20,
      fill: { color: P.header },
    });
    // 상단 민트 포인트 라인
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 13.33, h: 0.06,
      fill: { color: P.accent },
    });
    slide.addText(title, {
      x: 0.40, y: 0.12, w: 11.00, h: 0.60,
      fontSize: 28, bold: true, color: P.white, fontFace: "Pretendard",
    });
    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.40, y: 0.74, w: 10.00, h: 0.35,
        fontSize: 15, color: "A8C4B2",
      });
    }
    slide.addText(String(num).padStart(2, '0'), {
      x: 12.50, y: 0.12, w: 0.70, h: 0.40,
      fontSize: 14, color: "7A9E8A", align: "right",
    });
  }

  // SoWhat 공통 함수
  function addSoWhat(slide, message) {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 6.90, w: 13.33, h: 0.60,
      fill: { color: P.header },
    });
    slide.addText("▶  " + message, {
      x: 0.40, y: 6.93, w: 12.53, h: 0.50,
      fontSize: 15, bold: true, color: P.white,
    });
  }

  // ============================================================
  // SLIDE 1 — TitleSlide (아이보리 라이트)
  // ============================================================
  {
    const slide = pptx.addSlide();
    addSlideBg(slide);

    // 좌측 민트 사이드 바
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 0.18, h: 7.50,
      fill: { color: P.accent },
    });

    // 상단 브랜드 영역
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.18, y: 0, w: 13.15, h: 1.00,
      fill: { color: P.titleBg },
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 0.18, y: 1.00, w: 13.15, h: 0,
      line: { color: P.divider, width: 1 },
    });
    slide.addText("인터넷 드림마을", {
      x: 0.60, y: 0.25, w: 8.00, h: 0.50,
      fontSize: 20, bold: true, color: P.accent,
    });
    slide.addText("Internet Dream Village", {
      x: 0.60, y: 0.60, w: 8.00, h: 0.30,
      fontSize: 13, color: "8AAE98",
    });

    // 메인 타이틀
    slide.addText("청소년 스마트폰\n과몰입 방지\nAI 상담 플랫폼", {
      x: 0.60, y: 1.30, w: 8.50, h: 3.10,
      fontSize: 42, bold: true, color: P.textDark, breakLine: true, fontFace: "Pretendard",
    });

    // 설명
    slide.addText("EFT · CIREF 기반 미래 시각화 웹앱", {
      x: 0.60, y: 4.55, w: 8.50, h: 0.50,
      fontSize: 19, color: P.accent,
    });

    // 구분선 + 날짜
    slide.addShape(pptx.ShapeType.line, {
      x: 0.60, y: 5.20, w: 7.00, h: 0,
      line: { color: P.divider, width: 1 },
    });
    slide.addText("2026. 05.  |  MK", {
      x: 0.60, y: 5.38, w: 7.00, h: 0.38,
      fontSize: 14, color: P.textBody,
    });

    // 기술 태그
    const tags = ["Next.js 14", "Claude API", "Supabase", "Vercel"];
    tags.forEach((tag, i) => {
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.60 + i * 1.90, y: 5.90, w: 1.75, h: 0.36,
        fill: { color: P.accentLight }, line: { color: P.accent, width: 1 },
      });
      slide.addText(tag, {
        x: 0.60 + i * 1.90, y: 5.92, w: 1.75, h: 0.30,
        fontSize: 12, color: P.accent, align: "center",
      });
    });

    // 우측 일러스트 패널
    slide.addShape(pptx.ShapeType.rect, {
      x: 9.40, y: 1.00, w: 3.75, h: 6.50,
      fill: { color: P.accentLight },
    });
    slide.addText("🌳", {
      x: 9.40, y: 1.80, w: 3.75, h: 1.60,
      fontSize: 80, align: "center",
    });
    const pills = ["📖 마음일기", "🔮 미래의 나", "📊 자가진단", "🧩 미로 풀기", "🔔 위기 감지", "🏫 관리자 대시보드"];
    pills.forEach((p, i) => {
      slide.addShape(pptx.ShapeType.rect, {
        x: 9.65, y: 3.55 + i * 0.58, w: 3.25, h: 0.46,
        fill: { color: P.white }, line: { color: P.divider, width: 1 },
      });
      slide.addText(p, {
        x: 9.65, y: 3.57 + i * 0.58, w: 3.25, h: 0.38,
        fontSize: 13, color: P.textDark, align: "center",
      });
    });

    // 하단 브랜드 바
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.18, y: 7.00, w: 9.20, h: 0.50,
      fill: { color: P.titleBg },
    });
    slide.addText("Claude Code (Vibe Coding) 방식으로 개발", {
      x: 0.60, y: 7.05, w: 8.80, h: 0.38,
      fontSize: 13, color: P.textBody,
    });
  }

  // ============================================================
  // SLIDE 2 — AgendaSlide
  // ============================================================
  {
    const slide = pptx.addSlide();
    addSlideBg(slide);
    addHeader(slide, "발표 구성", "Agenda", 2);

    const items = [
      { num: "01", title: "문제 현황 — 청소년 스마트폰 과몰입 실태" },
      { num: "02", title: "솔루션 개요 — 인터넷 드림마을 접근 방식" },
      { num: "03", title: "핵심 이론 배경 (EFT · CIREF · 지연 할인 극복)" },
      { num: "04", title: "4개 핵심 모듈 및 계정 구조" },
      { num: "05", title: "기술 스택 및 개발 로드맵" },
    ];

    items.forEach((item, i) => {
      const y = 1.40 + i * 1.00;
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.80, y, w: 11.73, h: 0.82,
        fill: { color: P.panelBg }, line: { color: P.divider, width: 1 },
      });
      // 번호 뱃지
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.80, y, w: 0.72, h: 0.82,
        fill: { color: P.accentLight },
      });
      slide.addText(item.num, {
        x: 0.80, y: y + 0.22, w: 0.72, h: 0.38,
        fontSize: 16, bold: true, color: P.accent, align: "center",
      });
      // 좌측 포인트 라인
      slide.addShape(pptx.ShapeType.rect, {
        x: 1.52, y, w: 0.04, h: 0.82,
        fill: { color: P.accent },
      });
      slide.addText(item.title, {
        x: 1.70, y: y + 0.22, w: 10.63, h: 0.38,
        fontSize: 19, color: P.textDark,
      });
    });

    addSoWhat(slide, "문제 → 솔루션 → 이론 → 기능 → 기술 순서로 발표합니다");
  }

  // ============================================================
  // SLIDE 3 — 청소년 과몰입 현황 (KPICard × 3 + BulletList)
  // ============================================================
  {
    const slide = pptx.addSlide();
    addSlideBg(slide);
    addHeader(slide, "왜 지금 해야 하는가?", "청소년 스마트폰 과몰입 현황", 3);

    const cards = [
      { label: "청소년 스마트폰 과의존 위험군", value: "40.1%", delta: "2023 과기정통부 조사" },
      { label: "청소년 일평균 스마트폰 사용", value: "4.2시간", delta: "성인 대비 1.3배" },
      { label: "스마트폰 ↑ 우울·불안 ↑ 상관계수", value: "r = 0.68", delta: "통계적 유의 수준 p<0.01" },
    ];
    const cardW = (12.53 - 0.40) / 3;
    cards.forEach((card, i) => {
      const x = 0.40 + i * (cardW + 0.20);
      slide.addShape(pptx.ShapeType.rect, {
        x, y: 1.48, w: cardW, h: 2.00,
        fill: { color: P.negativeBg }, line: { color: P.negative, width: 2 },
      });
      slide.addText(card.value, {
        x: x + 0.15, y: 1.62, w: cardW - 0.30, h: 0.85,
        fontSize: 36, bold: true, color: P.negative, align: "center",
      });
      slide.addText(card.label, {
        x: x + 0.15, y: 2.52, w: cardW - 0.30, h: 0.50,
        fontSize: 13, color: P.textBody, align: "center", breakLine: true,
      });
      slide.addText(card.delta, {
        x: x + 0.15, y: 3.06, w: cardW - 0.30, h: 0.28,
        fontSize: 11, color: P.divider, align: "center",
      });
    });

    // 주요 문제점
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.40, y: 3.60, w: 12.53, h: 2.82,
      fill: { color: P.panelBg }, line: { color: P.divider, width: 1 },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.40, y: 3.60, w: 0.05, h: 2.82,
      fill: { color: P.negative },
    });
    slide.addText("주요 문제", {
      x: 0.60, y: 3.72, w: 3.00, h: 0.35,
      fontSize: 14, bold: true, color: P.negative,
    });
    const bullets = [
      "기존 면대면 상담은 접근성 제한 — 학교·가정에서 즉시 도움받기 어려움",
      "추상적 미래 설명으로는 청소년 행동 변화 동기 부여 효과 낮음",
      "스마트폰 사용 데이터·감정 변화 추이 체계적 모니터링 부재",
      "위기 신호(자해·우울) 조기 발견 및 관리자 연계 시스템 없음",
    ];
    bullets.forEach((b, i) => {
      slide.addText("•  " + b, {
        x: 0.60, y: 4.18 + i * 0.55, w: 12.13, h: 0.48,
        fontSize: 15, color: P.textBody, breakLine: true,
      });
    });

    addSoWhat(slide, "청소년 40% 이상이 위험군 — 접근성·동기·모니터링을 동시에 해결하는 새 솔루션이 필요하다");
  }

  // ============================================================
  // SLIDE 4 — ComparisonPanel (아이보리 라이트 버전)
  // ============================================================
  {
    const slide = pptx.addSlide();
    addSlideBg(slide);

    // 상단 타이틀 바 (라이트)
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 13.33, h: 1.00,
      fill: { color: P.panelBg },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 13.33, h: 0.06,
      fill: { color: P.accent },
    });
    slide.addText("기존 방식 vs 인터넷 드림마을", {
      x: 0.40, y: 0.18, w: 12.13, h: 0.55,
      fontSize: 26, bold: true, color: P.textDark, align: "center",
    });
    slide.addText("04", {
      x: 12.50, y: 0.20, w: 0.60, h: 0.35,
      fontSize: 13, color: P.divider, align: "right",
    });

    // 좌측 패널
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.30, y: 1.05, w: 6.20, h: 5.40,
      fill: { color: P.negativeBg }, line: { color: P.negative, width: 2 },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.30, y: 1.05, w: 6.20, h: 0.52,
      fill: { color: P.negative },
    });
    slide.addText("😟  기존 상담 방식의 한계", {
      x: 0.45, y: 1.08, w: 5.90, h: 0.44, fontSize: 16, bold: true, color: P.white,
    });
    slide.addText("면대면 중심 상담 · 제한된 접근성", {
      x: 0.45, y: 1.65, w: 5.90, h: 0.35, fontSize: 12, color: P.textBody,
    });
    const leftItems = [
      "면대면 상담 → 시간·장소 제약, 접근성 낮음",
      "추상적 미래 설명 → 동기 부여 효과 미미",
      "감정·행동 데이터 체계적 수집 불가",
      "위기 신호 조기 감지 시스템 부재",
      "관리자·상담사 개별 확인에 과도한 시간 소요",
    ];
    leftItems.forEach((item, i) => {
      slide.addText("✕  " + item, {
        x: 0.50, y: 2.12 + i * 0.52, w: 5.80, h: 0.44,
        fontSize: 14, color: P.textBody,
      });
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.40, y: 4.85, w: 6.00, h: 0.50,
      fill: { color: P.negativeBgDark }, line: { color: P.negative, width: 1 },
    });
    slide.addText("⚠  변화 추이 파악 어렵고, 위기 대응 지연", {
      x: 0.55, y: 4.89, w: 5.70, h: 0.38, fontSize: 13, color: P.textDark,
    });

    // 우측 패널
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.83, y: 1.05, w: 6.20, h: 5.40,
      fill: { color: P.positiveBg }, line: { color: P.accent, width: 2 },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.83, y: 1.05, w: 6.20, h: 0.52,
      fill: { color: P.accent },
    });
    slide.addText("🌳  인터넷 드림마을", {
      x: 6.98, y: 1.08, w: 5.90, h: 0.44, fontSize: 16, bold: true, color: P.white,
    });
    slide.addText("언제 어디서나 · AI가 함께하는 상담", {
      x: 6.98, y: 1.65, w: 5.90, h: 0.35, fontSize: 12, color: P.textBody,
    });
    const rightItems = [
      "웹앱 — 스마트폰·PC 어디서나 즉시 접근",
      "AI 이미지로 미래를 현재처럼 생생하게 체감",
      "마음일기·자가진단 데이터 자동 추적·시각화",
      "실시간 위기 신호 감지 + 관리자 즉시 알림",
      "관리자 대시보드로 전체 학생 현황 한눈에",
    ];
    rightItems.forEach((item, i) => {
      slide.addText("✔  " + item, {
        x: 7.00, y: 2.12 + i * 0.52, w: 5.80, h: 0.44,
        fontSize: 14, color: P.textDark,
      });
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.93, y: 4.85, w: 6.00, h: 0.50,
      fill: { color: P.positiveBgDark }, line: { color: P.accent, width: 1 },
    });
    slide.addText("🏆  데이터 기반 과학적 개입 + 즉각 대응", {
      x: 7.08, y: 4.89, w: 5.70, h: 0.38, fontSize: 13, color: P.textDark,
    });

    // VS 배지
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 6.20, y: 3.00, w: 0.93, h: 0.93,
      fill: { color: P.panelBg }, line: { color: P.divider, width: 2 },
    });
    slide.addText("VS", {
      x: 6.20, y: 3.15, w: 0.93, h: 0.40,
      fontSize: 16, bold: true, color: P.textDark, align: "center",
    });

    // 하단 바
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 6.55, w: 13.33, h: 0.95,
      fill: { color: P.header },
    });
    slide.addText("기존 방식은 '사람'이 직접 모든 것을 관리 — 접근성·지속성·데이터 모두 한계", {
      x: 0.40, y: 6.60, w: 5.80, h: 0.40, fontSize: 13, bold: true, color: P.white,
    });
    slide.addText("← 핵심 차이 →", {
      x: 5.80, y: 6.72, w: 1.73, h: 0.30, fontSize: 12, color: "7A9E8A", align: "center",
    });
    slide.addText("드림마을은 'AI'가 24/7 함께한다 — 과학적 개입 + 실시간 위기 대응", {
      x: 7.33, y: 6.60, w: 5.60, h: 0.40, fontSize: 13, bold: true, color: P.white, align: "right",
    });
  }

  // ============================================================
  // SLIDE 5 — 핵심 이론 배경 (ThreeCardRow 라이트)
  // ============================================================
  {
    const slide = pptx.addSlide();
    addSlideBg(slide);
    addHeader(slide, "핵심 이론 배경", "EFT · CIREF · 지연 할인 극복 — 3가지 과학적 근거", 5);

    const cards = [
      {
        num: "1", icon: "🧠", iconBg: P.accentLight, title: "EFT",
        titleFull: "Episodic Future Thinking",
        titleColor: P.accent,
        desc: "추상적 미래를 구체적 에피소드로 변환",
        items: [
          { icon: "🔬", label: "뇌과학 근거", text: "도파민 보상 회로를 건강하게 재공고화" },
          { icon: "📸", label: "에피소드화", text: "구체적 장면·감각·감정으로 미래를 그림" },
          { icon: "⚡", label: "행동 변화", text: "먼 미래 보상을 현재처럼 가깝게 체감" },
        ],
      },
      {
        num: "2", icon: "🔄", iconBg: "EEF0FA", title: "CIREF",
        titleFull: "단서 유발 회상 + 일화적 미래 사고",
        titleColor: "5B6FAD",
        desc: "드림마을의 4단계 대화 프레임워크",
        items: [
          { icon: "💬", label: "4단계 대화", text: "시공간·감각·정체성·대체 활동 순서로 질문" },
          { icon: "🤖", label: "AI 재질문", text: "모르겠어요 답변 시 소크라테스식 유도" },
          { icon: "🖼️", label: "이미지 생성", text: "5년·10년 후 AI 자화상으로 재공고화" },
        ],
      },
      {
        num: "3", icon: "⏳", iconBg: "FFF4E0", title: "지연 할인 극복",
        titleFull: "Delay Discounting Overcome",
        titleColor: P.caution,
        desc: "먼 미래 보상의 현재 가치를 끌어올린다",
        items: [
          { icon: "📉", label: "지연 할인", text: "미래 보상일수록 현재 가치가 낮아지는 편향" },
          { icon: "🎨", label: "AI 시각화", text: "생생한 이미지로 먼 미래를 지금 눈앞에" },
          { icon: "💪", label: "동기 강화", text: "즉각적 행동 변화 동기 유발 (MI 기법 결합)" },
        ],
      },
    ];

    const cardW = (12.53 - 0.40) / 3;
    cards.forEach((card, i) => {
      const x = 0.40 + i * (cardW + 0.20);
      slide.addShape(pptx.ShapeType.rect, {
        x, y: 1.38, w: cardW, h: 5.08,
        fill: { color: P.white }, line: { color: P.divider, width: 1 },
      });
      // 상단 포인트 바
      slide.addShape(pptx.ShapeType.rect, {
        x, y: 1.38, w: cardW, h: 0.05,
        fill: { color: card.titleColor },
      });
      // 번호 배지
      slide.addShape(pptx.ShapeType.ellipse, {
        x: x + 0.15, y: 1.48, w: 0.45, h: 0.45,
        fill: { color: card.titleColor },
      });
      slide.addText(card.num, {
        x: x + 0.15, y: 1.53, w: 0.45, h: 0.30,
        fontSize: 14, bold: true, color: P.white, align: "center",
      });
      // 아이콘 원
      slide.addShape(pptx.ShapeType.ellipse, {
        x: x + cardW / 2 - 0.40, y: 1.53, w: 0.80, h: 0.80,
        fill: { color: card.iconBg },
      });
      slide.addText(card.icon, {
        x: x + cardW / 2 - 0.40, y: 1.63, w: 0.80, h: 0.55,
        fontSize: 24, align: "center",
      });
      slide.addText(card.title, {
        x: x + 0.10, y: 2.43, w: cardW - 0.20, h: 0.40,
        fontSize: 17, bold: true, color: card.titleColor, align: "center",
      });
      slide.addText(card.titleFull, {
        x: x + 0.10, y: 2.83, w: cardW - 0.20, h: 0.30,
        fontSize: 10, color: P.divider, align: "center",
      });
      slide.addText(card.desc, {
        x: x + 0.10, y: 3.15, w: cardW - 0.20, h: 0.36,
        fontSize: 12, color: P.textBody, align: "center", breakLine: true,
      });
      slide.addShape(pptx.ShapeType.line, {
        x: x + 0.20, y: 3.56, w: cardW - 0.40, h: 0,
        line: { color: P.divider, width: 1 },
      });
      card.items.forEach((item, j) => {
        slide.addText(item.icon + "  " + item.label, {
          x: x + 0.15, y: 3.66 + j * 0.72, w: cardW - 0.30, h: 0.28,
          fontSize: 13, bold: true, color: P.textDark,
        });
        slide.addText(item.text, {
          x: x + 0.15, y: 3.94 + j * 0.72, w: cardW - 0.30, h: 0.38,
          fontSize: 11, color: P.textBody, breakLine: true,
        });
      });
    });

    // 하단 결론 바
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 6.50, w: 13.33, h: 1.00,
      fill: { color: P.header },
    });
    slide.addText("🏆  결론  세 이론의 결합 → AI가 구체적 미래 에피소드를 생성하여 청소년의 도파민 회로를 건강하게 재설계한다", {
      x: 0.40, y: 6.58, w: 12.53, h: 0.78,
      fontSize: 15, bold: true, color: P.white, breakLine: true,
    });
  }

  // ============================================================
  // SLIDE 6 — CIREF 4단계 프로세스
  // ============================================================
  {
    const slide = pptx.addSlide();
    addSlideBg(slide);
    addHeader(slide, "CIREF 4단계 프로세스", "미래의 나 — AI 자화상 생성 핵심 모듈", 6);

    const steps = [
      { num: "01", label: "질문 수집" },
      { num: "02", label: "AI 분석" },
      { num: "03", label: "이미지 생성" },
      { num: "04", label: "재공고화" },
    ];
    const stepW = (12.53 - 0.20 * 3) / 4;
    steps.forEach((step, i) => {
      const x = 0.40 + i * (stepW + 0.20);
      const isActive = i === 2;
      slide.addShape(pptx.ShapeType.chevron, {
        x, y: 1.45, w: stepW, h: 1.10,
        fill: { color: isActive ? P.accent : P.panelBg },
        line: { color: P.accent, width: 2 },
      });
      slide.addText(step.num, {
        x: x + 0.10, y: 1.55, w: stepW - 0.20, h: 0.30,
        fontSize: 12, color: isActive ? P.accentLight : P.accent, align: "center",
      });
      slide.addText(step.label, {
        x: x + 0.10, y: 1.88, w: stepW - 0.20, h: 0.45,
        fontSize: 15, bold: isActive, color: isActive ? P.white : P.textDark, align: "center",
      });
    });

    const details = [
      {
        icon: "💬", title: "4개 카테고리 질문",
        items: ["시공간 묘사: 미래의 너는 어디서 뭘 하고 있어?", "감각/감정: 그 장면에서 기분이 어때?", "정체성: 어떤 어른의 모습과 닮았어?", "대체 활동: 스마트폰 대신 뭘 하고 싶어?"],
      },
      {
        icon: "🤖", title: "Claude API 분석",
        items: ["장소·인물·사물 Entity 추출", "감정 키워드 + Valence 분석", "저항 시 소크라테스식 재질문", "동기강화 상담(MI) 기법 적용"],
      },
      {
        icon: "🖼️", title: "AI 이미지 생성",
        items: ["5년 후 / 10년 후 각각 생성", "1인칭 시점, 사실적 스타일", "Replicate / fal.ai 이미지 API", "실패 시 자동 재시도 3회"],
      },
      {
        icon: "📔", title: "리플렉션 노트",
        items: ["이미지 확인 후 신체 반응 질문", "심리적 반응 + 감정 기록 저장", "개인 갤러리 날짜별 보관", "변천사 슬라이드로 확인 가능"],
      },
    ];

    details.forEach((d, i) => {
      const x = 0.40 + i * (stepW + 0.20);
      const isActive = i === 2;
      slide.addShape(pptx.ShapeType.rect, {
        x, y: 2.70, w: stepW, h: 3.75,
        fill: { color: isActive ? P.accentLight : P.panelBg },
        line: { color: isActive ? P.accent : P.divider, width: isActive ? 2 : 1 },
      });
      slide.addText(d.icon + "  " + d.title, {
        x: x + 0.10, y: 2.80, w: stepW - 0.20, h: 0.38,
        fontSize: 14, bold: true, color: isActive ? P.accent : P.textDark,
      });
      d.items.forEach((item, j) => {
        slide.addText("•  " + item, {
          x: x + 0.15, y: 3.28 + j * 0.72, w: stepW - 0.30, h: 0.65,
          fontSize: 12, color: P.textBody, breakLine: true,
        });
      });
    });

    addSoWhat(slide, "4단계 구조화 대화 → AI 이미지 생성 → 리플렉션 — 과학적 EFT 경험을 자동화한다");
  }

  // ============================================================
  // SLIDE 7 — 4개 핵심 모듈
  // ============================================================
  {
    const slide = pptx.addSlide();
    addSlideBg(slide);
    addHeader(slide, "4개 핵심 모듈", "학생 대시보드 — 마음일기 · 미래의 나 · 자가진단 · 미로 풀기", 7);

    const modules = [
      {
        icon: "📖", title: "마음일기", phase: "Phase 1", phaseColor: P.accent,
        desc: "매일 감정을 자유 텍스트로 기록",
        features: ["Claude API 감정 Valence 분석", "감정 상태 → 꽃 SVG 시각화", "날짜별 감정 꽃 갤러리", "위기 신호 자동 감지 + 알림"],
        border: P.accent,
      },
      {
        icon: "🔮", title: "미래의 나", phase: "Phase 2 핵심", phaseColor: "5B6FAD",
        desc: "CIREF 4단계 AI 자화상 생성",
        features: ["4단계 구조화 대화 (AI 재질문)", "5년·10년 후 AI 이미지 생성", "리플렉션 노트 저장", "이미지 변천사 갤러리"],
        border: "5B6FAD",
      },
      {
        icon: "📊", title: "나의 자가진단", phase: "Phase 1", phaseColor: P.accent,
        desc: "스마트폰 중독·우울·불안 정기 측정",
        features: ["SAS 기반 중독 척도 (10문항)", "PHQ-A 청소년 우울 척도", "점수 변화 추이 그래프", "사용량 × 정서 상관관계"],
        border: P.accent,
      },
      {
        icon: "🧩", title: "미로 풀기", phase: "Phase 3", phaseColor: P.caution,
        desc: "두뇌 활동 대안 제공 디지털 게임",
        features: ["매일 새 미로 (난이도 3단계)", "포인트 적립 + 뱃지 시스템", "일일 15분 플레이 상한", "참여도 지표로 관리자 확인"],
        border: P.caution,
      },
    ];

    const mW = (12.53 - 0.20) / 2;
    modules.forEach((m, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.40 + col * (mW + 0.20);
      const y = 1.42 + row * 2.52;
      slide.addShape(pptx.ShapeType.rect, {
        x, y, w: mW, h: 2.30,
        fill: { color: P.panelBg }, line: { color: m.border, width: 2 },
      });
      // 상단 포인트 라인
      slide.addShape(pptx.ShapeType.rect, {
        x, y, w: mW, h: 0.06,
        fill: { color: m.border },
      });
      // Phase 태그
      slide.addShape(pptx.ShapeType.rect, {
        x: x + mW - 1.45, y: y + 0.12, w: 1.35, h: 0.30,
        fill: { color: m.phaseColor },
      });
      slide.addText(m.phase, {
        x: x + mW - 1.45, y: y + 0.13, w: 1.35, h: 0.26,
        fontSize: 11, bold: true, color: P.white, align: "center",
      });
      slide.addText(m.icon + "  " + m.title, {
        x: x + 0.15, y: y + 0.12, w: mW - 1.65, h: 0.40,
        fontSize: 18, bold: true, color: P.textDark,
      });
      slide.addText(m.desc, {
        x: x + 0.15, y: y + 0.56, w: mW - 0.30, h: 0.30,
        fontSize: 13, color: P.textBody,
      });
      m.features.forEach((f, j) => {
        const fx = j % 2 === 0 ? x + 0.20 : x + mW / 2 + 0.05;
        const fy = y + 0.98 + Math.floor(j / 2) * 0.55;
        slide.addText("✔  " + f, {
          x: fx, y: fy, w: mW / 2 - 0.20, h: 0.48,
          fontSize: 12, color: P.textBody, breakLine: true,
        });
      });
    });

    addSoWhat(slide, "4개 모듈이 감정·인지·행동 모두를 동시에 다룬다 — 포괄적 과몰입 개입 시스템");
  }

  // ============================================================
  // SLIDE 8 — 계정 구조 3-Tier
  // ============================================================
  {
    const slide = pptx.addSlide();
    addSlideBg(slide);
    addHeader(slide, "계정 구조 및 권한 체계", "3-Tier 계층 — 수퍼바이저 → 관리자 → 학생", 8);

    const tiers = [
      { icon: "👑", title: "수퍼바이저", count: "1개 계정", color: P.caution, bg: "FFF8EE",
        items: ["관리자 계정 생성·삭제·정지", "구독 만료일 수동 연장 (결제 없음)", "전체 서비스 통계 대시보드", "만료 D-30/D-7 자동 알림"] },
      { icon: "🏫", title: "관리자 (기관)", count: "N개 계정", color: "5B6FAD", bg: "F2F0FA",
        items: ["산하 학생 계정 일괄 생성·관리", "전체 학생 마음일기·자가진단·이미지 열람", "위기 신호 즉시 알림 수신", "7일 미접속 학생 알림 + 개별 메모"] },
      { icon: "🧑‍🎓", title: "학생", count: "N개 계정", color: P.accent, bg: P.accentLight,
        items: ["본인 데이터만 접근 (타 학생 차단)", "관리자 부여 ID/PW로 최초 로그인", "구독 기간: 관리자 계정에 종속", "Supabase RLS로 DB 레벨 격리"] },
    ];

    tiers.forEach((tier, i) => {
      const y = 1.40 + i * 1.73;
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.40, y, w: 12.53, h: 1.55,
        fill: { color: tier.bg }, line: { color: tier.color, width: 2 },
      });
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.40, y, w: 0.06, h: 1.55,
        fill: { color: tier.color },
      });
      slide.addText(tier.icon, {
        x: 0.60, y: y + 0.42, w: 0.55, h: 0.55, fontSize: 26, align: "center",
      });
      slide.addText(tier.title, {
        x: 1.25, y: y + 0.18, w: 2.00, h: 0.45, fontSize: 18, bold: true, color: tier.color,
      });
      slide.addText(tier.count, {
        x: 1.25, y: y + 0.65, w: 2.00, h: 0.30, fontSize: 13, color: P.textBody,
      });
      slide.addShape(pptx.ShapeType.line, {
        x: 3.40, y: y + 0.20, w: 0, h: 1.10,
        line: { color: P.divider, width: 1 },
      });
      tier.items.forEach((item, j) => {
        const col = j % 2;
        const row = Math.floor(j / 2);
        slide.addText("•  " + item, {
          x: 3.60 + col * 4.50, y: y + 0.18 + row * 0.55, w: 4.30, h: 0.48,
          fontSize: 13, color: P.textBody, breakLine: true,
        });
      });
      if (i < tiers.length - 1) {
        slide.addText("↓", {
          x: 6.40, y: y + 1.58, w: 0.53, h: 0.22,
          fontSize: 15, bold: true, color: P.divider, align: "center",
        });
      }
    });

    addSoWhat(slide, "Supabase RLS로 DB 레벨 격리 — 학생은 타 학생 데이터에 절대 접근 불가");
  }

  // ============================================================
  // SLIDE 9 — 개발 로드맵 (아이보리 버전)
  // ============================================================
  {
    const slide = pptx.addSlide();
    addSlideBg(slide);
    addHeader(slide, "개발 로드맵", "Phase 1 MVP → Phase 2 EFT → Phase 3 고도화 → Phase 4 모바일", 9);

    const rows = [
      {
        num: "1", numBg: P.accent,
        label: "Phase 1 — MVP", labelDesc: "핵심 인프라 + 기본 기능",
        leftTag: "우선순위 ★★★", leftTagBg: P.accentLight, leftTagColor: P.accent,
        leftExamples: ["계정 시스템 (3-tier)", "마음일기 + 감정 분석", "자가진단 중독 척도", "관리자 대시보드 + 위기 알림"],
        rightBg: P.accentLight,
        rightDesc: "웹앱 기본 골격 완성. 실제 학교 현장 투입 가능한 MVP",
        resultBg: P.positiveBgDark, resultText: "현장 투입\n가능한 MVP",
      },
      {
        num: "2", numBg: "5B6FAD",
        label: "Phase 2 — EFT 핵심", labelDesc: "미래의 나 AI 자화상",
        leftTag: "우선순위 ★★★", leftTagBg: "EEF0FA", leftTagColor: "5B6FAD",
        leftExamples: ["CIREF 4단계 대화 엔진", "AI 이미지 생성 연동", "이미지 갤러리 변천사", "재공고화 리플렉션 노트"],
        rightBg: "EEF0FA",
        rightDesc: "과학적 EFT 경험 구현. 청소년 행동 변화 핵심 동기 부여 완성",
        resultBg: "D8D0F0", resultText: "EFT 경험\n완성",
      },
      {
        num: "3", numBg: P.caution,
        label: "Phase 3 — 고도화", labelDesc: "게임 + 분석 + 운영",
        leftTag: "우선순위 ★★", leftTagBg: "FFF4E0", leftTagColor: P.caution,
        leftExamples: ["미로 풀기 게임", "스마트폰 사용량 상관 그래프", "수퍼바이저 구독 관리", "PDF 리포트 전체 구현"],
        rightBg: "FFF4E0",
        rightDesc: "완성형 서비스. 구독 기반 B2B SaaS 운영 체계 완비",
        resultBg: "F0D8A0", resultText: "완성형\nB2B SaaS",
      },
    ];

    rows.forEach((row, i) => {
      const y = 1.42 + i * 1.70;
      slide.addShape(pptx.ShapeType.ellipse, {
        x: 0.40, y: y + 0.35, w: 0.60, h: 0.60, fill: { color: row.numBg },
      });
      slide.addText(row.num, {
        x: 0.40, y: y + 0.43, w: 0.60, h: 0.38,
        fontSize: 18, bold: true, color: P.white, align: "center",
      });
      slide.addText(row.label, {
        x: 1.15, y: y + 0.28, w: 2.30, h: 0.40, fontSize: 15, bold: true, color: P.textDark,
      });
      slide.addText(row.labelDesc || "", {
        x: 1.15, y: y + 0.70, w: 2.30, h: 0.30, fontSize: 12, color: P.textBody,
      });
      slide.addShape(pptx.ShapeType.rect, {
        x: 3.55, y: y + 0.20, w: 1.30, h: 0.36,
        fill: { color: row.leftTagBg }, line: { color: row.leftTagBg, width: 0 },
      });
      slide.addText(row.leftTag, {
        x: 3.55, y: y + 0.23, w: 1.30, h: 0.28,
        fontSize: 11, bold: true, color: row.leftTagColor, align: "center",
      });
      slide.addText(row.leftExamples.map(e => "• " + e).join("\n"), {
        x: 3.55, y: y + 0.62, w: 1.80, h: 1.00,
        fontSize: 11, color: P.textBody, breakLine: true,
      });
      slide.addShape(pptx.ShapeType.line, {
        x: 5.45, y: y + 0.58, w: 0.55, h: 0,
        line: { color: row.numBg, width: 2 },
      });
      slide.addShape(pptx.ShapeType.rect, {
        x: 6.10, y: y + 0.15, w: 4.50, h: 1.35,
        fill: { color: row.rightBg }, line: { color: P.divider, width: 1 },
      });
      slide.addText("결과물", {
        x: 6.25, y: y + 0.22, w: 4.20, h: 0.35,
        fontSize: 14, bold: true, color: P.textDark,
      });
      slide.addText(row.rightDesc, {
        x: 6.25, y: y + 0.60, w: 4.20, h: 0.80,
        fontSize: 12, color: P.textBody, breakLine: true,
      });
      slide.addText("=", {
        x: 10.72, y: y + 0.50, w: 0.40, h: 0.40,
        fontSize: 22, bold: true, color: row.numBg, align: "center",
      });
      slide.addShape(pptx.ShapeType.rect, {
        x: 11.22, y: y + 0.15, w: 1.70, h: 1.35,
        fill: { color: row.resultBg }, line: { color: P.divider, width: 1 },
      });
      slide.addText(row.resultText, {
        x: 11.27, y: y + 0.38, w: 1.55, h: 0.75,
        fontSize: 13, bold: true, color: P.textDark, align: "center", breakLine: true,
      });
    });

    // 결론 바
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 6.60, w: 13.33, h: 0.90,
      fill: { color: P.accentLight }, line: { color: P.accent, width: 0 },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 6.60, w: 0.06, h: 0.90,
      fill: { color: P.accent },
    });
    slide.addText("✅  Phase 1 MVP부터 실제 현장 투입 가능 — 단계적으로 기능을 추가하며 검증된 서비스를 만들어간다", {
      x: 0.40, y: 6.68, w: 12.53, h: 0.72,
      fontSize: 15, bold: true, color: P.textDark, breakLine: true,
    });
  }

  // ============================================================
  // SLIDE 10 — 기술 스택
  // ============================================================
  {
    const slide = pptx.addSlide();
    addSlideBg(slide);
    addHeader(slide, "기술 스택", "Next.js · Supabase · Claude API · Vercel — 검증된 스택으로 빠른 구현", 10);

    const tableData = [
      [
        { text: "영역", options: { bold: true, color: P.white, fill: P.header, align: "center", fontSize: 15, fontFace: "Pretendard" } },
        { text: "기술", options: { bold: true, color: P.white, fill: P.header, align: "center", fontSize: 15, fontFace: "Pretendard" } },
        { text: "역할 및 이유", options: { bold: true, color: P.white, fill: P.header, align: "center", fontSize: 15, fontFace: "Pretendard" } },
      ],
      [
        { text: "프론트엔드", options: { color: P.textDark, fill: P.white, align: "left", fontSize: 14 } },
        { text: "Next.js 14 + Tailwind CSS + shadcn/ui", options: { color: P.accent, fill: P.white, align: "left", fontSize: 14 } },
        { text: "App Router SPA. Vercel 최적화 배포. 반응형 모바일 우선 UI", options: { color: P.textBody, fill: P.white, align: "left", fontSize: 13 } },
      ],
      [
        { text: "백엔드 / DB", options: { color: P.textDark, fill: P.panelBg, align: "left", fontSize: 14 } },
        { text: "Supabase (PostgreSQL + Auth + RLS + Storage)", options: { color: P.accent, fill: P.panelBg, align: "left", fontSize: 14 } },
        { text: "Row Level Security로 학생 데이터 DB 레벨 격리. 실시간 알림", options: { color: P.textBody, fill: P.panelBg, align: "left", fontSize: 13 } },
      ],
      [
        { text: "AI 엔진", options: { color: P.textDark, fill: P.white, align: "left", fontSize: 14 } },
        { text: "Claude API (claude-sonnet-4-20250514)", options: { color: P.accent, fill: P.white, align: "left", fontSize: 14 } },
        { text: "감정 분석, CIREF 대화 엔진, 위기 신호 감지, MI 기법 재질문", options: { color: P.textBody, fill: P.white, align: "left", fontSize: 13 } },
      ],
      [
        { text: "이미지 생성", options: { color: P.textDark, fill: P.panelBg, align: "left", fontSize: 14 } },
        { text: "Replicate / fal.ai (Stable Diffusion)", options: { color: P.accent, fill: P.panelBg, align: "left", fontSize: 14 } },
        { text: "미래 자화상 AI 이미지. 1인칭 시점, 사실적 스타일 프롬프트", options: { color: P.textBody, fill: P.panelBg, align: "left", fontSize: 13 } },
      ],
      [
        { text: "배포 / 인프라", options: { color: P.textDark, fill: P.white, align: "left", fontSize: 14 } },
        { text: "Vercel + Supabase Storage + html2canvas + jsPDF", options: { color: P.accent, fill: P.white, align: "left", fontSize: 14 } },
        { text: "99% uptime. 이미지 파일 보관. PDF 리포트 내보내기", options: { color: P.textBody, fill: P.white, align: "left", fontSize: 13 } },
      ],
    ];

    slide.addTable(tableData, {
      x: 0.40, y: 1.50, w: 12.53, h: 4.85,
      fontFace: "Pretendard",
      border: { type: "solid", color: P.divider, pt: 1 },
    });

    // Callout
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.40, y: 6.42, w: 12.53, h: 0.40,
      fill: { color: P.accentLight }, line: { color: P.accent, width: 2 },
    });
    slide.addText("💡  Claude Code (Vibe Coding) 방식으로 개발 — AI가 코드 작성, 개발자는 방향과 검증에 집중", {
      x: 0.60, y: 6.46, w: 12.13, h: 0.30,
      fontSize: 13, color: P.textDark,
    });

    addSoWhat(slide, "Next.js + Supabase + Claude API — 청소년 AI 상담에 최적화된 검증된 풀스택 조합");
  }

  // ============================================================
  // SLIDE 11 — ClosingSlide (아이보리 라이트)
  // ============================================================
  {
    const slide = pptx.addSlide();
    addSlideBg(slide);

    // 좌측 민트 사이드 바
    slide.addShape(pptx.ShapeType.rect, {
      x: 0, y: 0, w: 0.18, h: 7.50,
      fill: { color: P.accent },
    });

    // 상단 브랜드 바
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.18, y: 0, w: 13.15, h: 1.00,
      fill: { color: P.titleBg },
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 0.18, y: 1.00, w: 13.15, h: 0,
      line: { color: P.divider, width: 1 },
    });
    slide.addText("인터넷 드림마을", {
      x: 0.60, y: 0.28, w: 8.00, h: 0.50,
      fontSize: 20, bold: true, color: P.accent,
    });

    // 메인 메시지
    slide.addText("청소년의 더 나은\n미래를 AI와\n함께 그립니다", {
      x: 0.60, y: 1.30, w: 8.00, h: 3.00,
      fontSize: 40, bold: true, color: P.textDark, breakLine: true,
    });
    slide.addText("스마트폰 과몰입에서 벗어나\n꿈을 꾸는 아이들을 위한 AI 상담 플랫폼", {
      x: 0.60, y: 4.45, w: 8.20, h: 0.90,
      fontSize: 18, color: P.textBody, breakLine: true,
    });

    // 구분선 + 연락처
    slide.addShape(pptx.ShapeType.line, {
      x: 0.60, y: 5.50, w: 5.50, h: 0,
      line: { color: P.divider, width: 1 },
    });
    slide.addText("MK  |  aa6644a@gmail.com", {
      x: 0.60, y: 5.68, w: 5.50, h: 0.38,
      fontSize: 15, color: P.textBody,
    });

    // Q&A
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.60, y: 6.18, w: 2.20, h: 0.52,
      fill: { color: P.accent },
    });
    slide.addText("Q & A", {
      x: 0.60, y: 6.22, w: 2.20, h: 0.44,
      fontSize: 22, bold: true, color: P.white, align: "center",
    });

    // 우측 요약 패널
    slide.addShape(pptx.ShapeType.rect, {
      x: 9.40, y: 1.00, w: 3.75, h: 6.50,
      fill: { color: P.panelBg }, line: { color: P.divider, width: 1 },
    });
    slide.addText("핵심 요약", {
      x: 9.60, y: 1.20, w: 3.35, h: 0.38,
      fontSize: 14, bold: true, color: P.accent,
    });
    slide.addShape(pptx.ShapeType.line, {
      x: 9.60, y: 1.62, w: 3.35, h: 0,
      line: { color: P.divider, width: 1 },
    });
    const summary = [
      { icon: "🧠", text: "EFT · CIREF 이론 기반" },
      { icon: "📖", text: "마음일기 + 꽃 시각화" },
      { icon: "🔮", text: "AI 자화상 생성" },
      { icon: "📊", text: "자가진단 + 추이 추적" },
      { icon: "🧩", text: "미로 풀기 게임" },
      { icon: "🔔", text: "실시간 위기 신호 감지" },
      { icon: "🏫", text: "3-Tier 계정 구조" },
      { icon: "⚡", text: "Claude Code로 빠른 개발" },
    ];
    summary.forEach((s, i) => {
      slide.addText(s.icon + "  " + s.text, {
        x: 9.60, y: 1.80 + i * 0.60, w: 3.35, h: 0.48,
        fontSize: 13, color: P.textDark,
      });
    });
  }

  await pptx.writeFile({ fileName: '인터넷드림마을_발표.pptx' });
  console.log('✅ PPTX 생성 완료: 인터넷드림마을_발표.pptx');
}

build().catch(err => {
  console.error('❌ 생성 실패:', err.message);
  process.exit(1);
});
