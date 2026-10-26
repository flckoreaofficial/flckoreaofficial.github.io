export const sourceDate = "2026.09.23";
export const categories = [
  "반도체 장비",
  "공정 부품·툴",
  "세라믹·소재 부품",
] as const;
export const processes = [
  "Back Grinding",
  "Die Bonding",
  "HBM·첨단 패키징",
  "Saw Singulation",
  "EMI Shielding",
] as const;
export type ProductStatus =
  | "양산 품질 인증 완료"
  | "양산 적용"
  | "샘플 평가"
  | "개발 중"
  | "공급 사양 상담";
export interface Product {
  id: string;
  name: string;
  model: string;
  category: (typeof categories)[number];
  processes: string[];
  status: ProductStatus;
  summary: string;
  description: string;
  features: string[];
  specs: [string, string][];
  customization: string;
  note: string;
  sourcePages: string;
  imageCaption?: string;
}
export const products: Product[] = [
  {
    id: "zsd-1",
    name: "Stack Die Bonder",
    model: "ZSD-1",
    category: categories[0],
    processes: ["Die Bonding"],
    status: "양산 품질 인증 완료",
    summary: "얇은 칩의 정밀 적층과 부품 자동 교체를 위한 Die Bonder",
    description:
      "웨이퍼에서 분리한 칩을 픽업하여 기판에 본딩하는 장비입니다. NAND·DRAM Stack Die Bonding 공정에 Dual Pick-up Head와 Dual Bond Head를 적용합니다.",
    features: [
      "Dual Pick-up Head / Dual Bond Head",
      "고강성 프레임과 Full Closed Loop 모션 제어",
      "Collet·Ejector Dome 자동 교체",
      "장비 가동 중 툴 공급·회수",
    ],
    specs: [
      ["모델", "ZSD-1"],
      ["크기 (W × D × H)", "2,567 × 1,659 × 1,950 mm"],
      ["칩 두께·적층", "30 μm / 32 Stack"],
      ["본딩 정밀도", "XY ±4 μm @ 5σ / θ ±0.05° @ 5σ"],
      ["처리량", "DRAM 4K UPH / NAND 3K UPH"],
      ["Thin Die Ejector", "VMS (Full Auto Control) / EMS"],
      ["Head 구성", "Bond Head Dual / Pick-up Head Dual"],
    ],
    customization:
      "Needle / Needleless Multi Stage 방식과 Bond Head·Pick-up Head·Middle Stage의 Collet 교체 구성을 상담합니다.",
    note: "자료에는 개발 및 양산 품질 인증 완료로 표기되어 있습니다. 처리량과 정밀도는 칩·기판·적층 조건에 따라 달라지므로 도입 시 적용 조건을 확인합니다.",
    sourcePages: "10, 13",
  },
  {
    id: "hbm-bonder",
    name: "HBM TC·Hybrid Bonder",
    model: "TC / Hybrid",
    category: categories[0],
    processes: ["HBM·첨단 패키징", "Die Bonding"],
    status: "개발 중",
    summary: "HBM 적층 공정을 위한 본딩 장비 개발",
    description:
      "HBM 패키징을 대상으로 Chip-to-Wafer TC Bonding과 Hybrid Bonding 장비를 개발하고 있습니다. 칩 핸들링, 본딩과 열 제어를 함께 검토합니다.",
    features: [
      "Chip-to-Wafer TC Bonding 개발",
      "Hybrid Bonding 개발",
      "HBM 적층 공정에 맞춘 칩 핸들링·열 제어",
    ],
    specs: [
      ["TC Bonding 개발 대상", "HBM3E / HBM4"],
      ["Hybrid Bonding 개발 대상", "HBM5 / HBM6"],
      ["개발 범위", "칩 핸들링 / 본딩 / 열 제어"],
    ],
    customization:
      "고객 공정의 적층 구조와 열 조건에 따른 공동개발 및 적용 가능성을 검토합니다.",
    note: "HBM 세대별 대응은 개발 목표입니다. 상용 공급 완료 사양을 의미하지 않으며, 상세 일정과 평가 조건은 개별 상담으로 안내합니다.",
    sourcePages: "11, 23",
    imageCaption: "자료에 제시된 HBM Bonder 개발 이미지",
  },
  {
    id: "mcpd-1",
    name: "2.5D·FO-WLP Bonder",
    model: "MCPD-1",
    category: categories[0],
    processes: ["HBM·첨단 패키징", "Die Bonding"],
    status: "개발 중",
    summary: "첨단 패키징 공정을 위한 고정밀 본딩 장비",
    description:
      "2.5D 및 FO-WLP 등 첨단 패키징 적용을 목표로 개발 중인 장비입니다. 다양한 칩과 기판 조건에 대응하도록 Face-up·Face-down 구성을 검토합니다.",
    features: [
      "Face-up / Face-down 구성",
      "Stage·Head Heater 옵션",
      "다양한 Bond Force 범위",
      "Ejector·Collet Auto Changer 옵션",
    ],
    specs: [
      ["모델", "MCPD-1"],
      ["대상 공정", "2.5D / FO-WLP / HBM·CoWoS·PLP"],
      ["Die Size (목표)", "1–30 mm"],
      ["Die Loading (목표)", "12인치 웨이퍼 / Tray·Tape & Reel 옵션"],
      ["Face-down 정밀도 (목표)", "XY ±1 μm @ 3σ · Local Alignment"],
      ["Heater (목표)", "Stage RT–150 ℃ / Head RT–450 ℃"],
      ["Bond Force 옵션 (목표)", "0.5–50 N / 2–200 N / 10–500 N"],
      ["개발 목표 일정", "2027년 3분기"],
    ],
    customization:
      "Flux Dipping, 툴 평행도 조정, 자동 교체 기능과 기판 조건에 따른 구성을 검토합니다.",
    note: "표의 수치는 자료에 제시된 개발 목표 사양입니다. 최종 공급 사양과 일정은 개발·평가 결과에 따라 달라질 수 있습니다.",
    sourcePages: "19",
    imageCaption: "MCPD-1 개발 장비 이미지",
  },
  {
    id: "saw-equipment",
    name: "PKG Saw Singulation 장비",
    model: "Saw Singulation",
    category: categories[0],
    processes: ["Saw Singulation"],
    status: "공급 사양 상담",
    summary: "패키지 절단과 분류를 위한 Saw Singulation 장비",
    description:
      "몰딩이 완료된 기판의 패키지를 개별 유닛으로 분리하고 분류하는 장비입니다. Dual Spindle과 Dual Chuck Table 구성을 적용합니다.",
    features: [
      "Dual Spindle / Dual Chuck Table",
      "자체 설계 Spindle·Conversion Kit",
      "패키지 분리 후 특성별 Sorting",
      "교체 부품과 물류 자동화 구성 상담",
    ],
    specs: [
      ["크기 (W × D × H)", "4,365 × 1,870 × 1,900 mm"],
      ["SAW Offset", "XY ±0.05 mm @ 3σ"],
      ["처리량 (자료 기재)", "DRAM 28K / NAND 25K UPH · BIN Sorting"],
      ["Spindle 회전수", "20,000–60,000 RPM"],
      ["Saw Head / Chuck Table", "Dual / Dual"],
      ["개발 중 옵션", "AI Vision / OHT·AMR 대응 · 2027년 2분기 목표"],
    ],
    customization:
      "패키지 규격, 분류 조건, Blade·Chuck 교체 구성 및 물류 자동화 범위를 개별 검토합니다.",
    note: "장비 공급 가능 시점과 옵션별 구현 범위는 상담 시 확인합니다. AI Vision 및 OHT·AMR 대응은 자료 기준 개발 항목입니다.",
    sourcePages: "22",
  },
  {
    id: "back-grind",
    name: "Back Grind Parts",
    model: "Chuck Table / Wheel",
    category: categories[1],
    processes: ["Back Grinding"],
    status: "공급 사양 상담",
    summary: "웨이퍼 연삭 공정에 맞춘 척 테이블과 관련 부품",
    description:
      "장비 사양과 웨이퍼 조건에 맞는 Chuck Table, Grinding Wheel, Robot Pick Handle 등 제조사 제품의 공급과 맞춤 사양 검토를 지원합니다.",
    features: [
      "8·12인치 Chuck Table",
      "Grinding Wheel / Robot Pick Handle",
      "장비 출하 사양별 체결·급수 위치 검토",
    ],
    specs: [
      ["제품 구성", "Chuck Table / Grinding Wheel / Robot Pick Handle"],
      ["웨이퍼 규격", "8인치 / 12인치"],
      ["적용 장비 검토", "DISCO·TSK 계열 · 세부 모델별 확인"],
      ["맞춤 항목", "P.C.D Hole / Cooling Water Inlet 위치"],
    ],
    customization:
      "장비 모델과 출하 시기, 척 도면 및 냉각수 유입 위치를 확인해 호환 사양을 검토합니다.",
    note: "제조사 제품의 공급·호환 범위는 모델별 상담이 필요합니다. 웨이퍼 가공 정밀도와 TTV는 실제 공정 조건으로 평가합니다.",
    sourcePages: "7–9",
  },
  {
    id: "thin-die-ejector",
    name: "Automatic Thin Die Ejector",
    model: "EMS / Hood Type",
    category: categories[1],
    processes: ["Die Bonding", "HBM·첨단 패키징"],
    status: "양산 적용",
    summary: "얇은 칩의 분리와 부품 교체를 위한 Ejector",
    description:
      "웨이퍼에서 얇은 칩을 분리하는 Die Bonder 핵심 부품입니다. 공용 Body와 Device별 분리형 Hood, One-touch 교체 구조로 장비별 공정 조건에 대응합니다.",
    features: [
      "장비 모델별 공용 Body",
      "Device별 분리형 Hood",
      "One-touch 교체 구조",
      "단축·4축 구동 방식 대응",
    ],
    specs: [
      ["적용 분야", "NAND / DRAM / HBM Thin Die"],
      ["구조", "공용 Body + Device별 Hood"],
      ["구동 구성", "단축 Motor / 4축 Motor"],
      ["검토 조건", "칩 크기·두께 / Bump / Motion / 장비 모델"],
    ],
    customization:
      "Thin Die 픽업 조건, Bump 표면, 장비 Motion에 맞춘 Hood 및 Ejector 구조를 설계합니다. 기존 Kit 개선도 상담합니다.",
    note: "자료 기준 개발 완료·양산 적용 제품입니다. 칩 두께와 픽업 성능은 대상 Device 및 장비 조건별 검토가 필요합니다.",
    sourcePages: "10, 14–16",
  },
  {
    id: "magnetic-collet",
    name: "Magnetic Collet·자동 교체 부품",
    model: "M-Collet",
    category: categories[1],
    processes: ["Die Bonding", "HBM·첨단 패키징"],
    status: "양산 적용",
    summary: "칩 픽업과 본딩을 위한 Magnetic Collet",
    description:
      "One-touch 방식의 Magnetic Holder와 Collet을 기반으로 칩 특성과 사용 위치에 맞는 툴을 제공합니다. 자동 교체 구조와 다양한 흡착 패턴을 적용합니다.",
    features: [
      "One-touch Magnetic Holder",
      "Pick-up / Bond / Middle Stage용 구성",
      "Line Hole·Pin/Hole·Pyramid·Flip Chip·Custom",
      "칩 특성에 따른 흡착 패턴 설계",
    ],
    specs: [
      ["제품 구성", "Magnetic Holder / Collet / 자동 교체 부품"],
      ["기준 Holder 구성", "14 × 19 Fixed Type"],
      ["사용 위치", "Pick-up Head / Bond Head / Middle Stage"],
      ["선정 기준", "칩 크기·두께 / 경도 / 재질 / 표면저항 / 코팅"],
    ],
    customization:
      "HBM 전용 및 Flip Chip 툴, 진공 Hole·Line 패턴을 공정에 맞춰 검토합니다. 부품 코드와 세부 도면은 상담 시 안내합니다.",
    note: "자료 기준 개발 완료·양산 적용 제품입니다. 장비별 장착 구조와 자동 교체 호환성은 개별 확인합니다.",
    sourcePages: "10, 12, 17–18",
  },
  {
    id: "saw-kit",
    name: "Saw Singulation Conversion Kit",
    model: "Custom Conversion Kit",
    category: categories[1],
    processes: ["Saw Singulation"],
    status: "양산 적용",
    summary: "장비와 패키지 규격에 맞춘 Saw Conversion Kit",
    description:
      "패키지 절단 공정에서 사용하는 Picker와 Chuck Table 등 전환 부품을 장비 구조와 제품 규격에 맞춰 설계합니다.",
    features: [
      "패키지 크기·배열에 맞춘 설계",
      "장비별 흡착·이송 구조 대응",
      "제품 전환용 Kit 및 기존 Kit 개선",
    ],
    specs: [
      ["구성 1–2", "Strip Picker / Chuck Table"],
      ["구성 3–4", "Unit Picker / Dry Block"],
      ["구성 5–6", "Turn Table Picker / Turn Table"],
      ["검토 조건", "패키지 규격 / 배열 / 장비 구조 / 흡착·이송 조건"],
    ],
    customization:
      "신규 패키지 전환에 필요한 Kit 제작과 기존 장비의 부품 구조 변경을 상담합니다.",
    note: "자료 기준 양산 적용 제품입니다. 그림의 1–6번은 사양표의 구성품 순서와 대응합니다.",
    sourcePages: "12, 21",
    imageCaption:
      "Saw Kit 구성도 · 1 Strip Picker / 2 Chuck Table / 3 Unit Picker / 4 Dry Block / 5 Turn Table Picker / 6 Turn Table",
  },
  {
    id: "pulse-heater",
    name: "Ceramic Pulse Heater",
    model: "Ceramic Heater",
    category: categories[2],
    processes: ["HBM·첨단 패키징"],
    status: "샘플 평가",
    summary: "본딩 공정의 빠른 가열과 냉각을 위한 세라믹 히터",
    description:
      "TC Bonding 등 반도체 패키징 공정에 적용하기 위한 Ceramic Pulse Heater를 개발하고 있습니다. 열 제어 특성과 공정 조건을 함께 평가합니다.",
    features: [
      "급속 승온·냉각",
      "본딩 공정용 열 제어",
      "Heater 크기·냉각 조건별 평가",
    ],
    specs: [
      ["적용 분야", "HBM Chip / Flip Chip / ACF Bonding"],
      ["평가 항목", "온도 범위 / 가열·냉각 주기 / 내구성"],
      ["개발 단계", "샘플 평가"],
    ],
    customization:
      "Heater 형상, 목표 온도, 가열·냉각 주기와 공정 환경을 기준으로 샘플 평가를 상담합니다.",
    note: "가열·냉각 성능은 Heater 크기와 냉각 방식 등 시험 조건에 따라 달라집니다. 평가 조건을 확인한 사양을 개별 안내합니다.",
    sourcePages: "11, 20",
  },
  {
    id: "ceramic-tool",
    name: "Ceramic P&P Tool",
    model: "Pick & Place Tool",
    category: categories[2],
    processes: ["HBM·첨단 패키징", "Die Bonding"],
    status: "샘플 평가",
    summary: "첨단 패키징용 세라믹 Pick & Place Tool",
    description:
      "HBM 및 2.5D·3D 패키징 장비에 적용하는 세라믹 툴입니다. 열전도, 경도와 전기적 특성을 고려해 공정에 맞는 툴을 개발합니다.",
    features: [
      "열·기계·전기적 특성 검토",
      "소재별 특성과 내구성 평가",
      "접촉부 형상 및 표면저항 설계",
    ],
    specs: [
      ["적용 장비", "HBM / 2.5D·3D Die Bonder"],
      ["검토 사양", "소재 / 형상 / 접촉부 설계"],
      ["평가 항목", "열전도율 / 경도 / 표면저항 / 내구성"],
    ],
    customization:
      "접촉부 형상과 소재, 전기적 특성을 고객의 본딩 조건에 맞춰 검토합니다.",
    note: "샘플 평가 단계입니다. 소재별 수치와 수명은 비교 대상 및 시험 조건을 확인한 뒤 안내합니다.",
    sourcePages: "11, 20",
  },
  {
    id: "emi-plate",
    name: "EMI Back Plate",
    model: "PVD Sputtering Parts",
    category: categories[2],
    processes: ["EMI Shielding"],
    status: "양산 적용",
    summary: "EMI 차폐 공정용 Back Plate",
    description:
      "반도체 소자의 EMI 차폐를 위한 PVD Sputter 장비에 사용하는 Back Plate를 개발·공급합니다. Target 조건과 장비 체결 구조에 맞춰 사양을 검토합니다.",
    features: [
      "EMI Shielding용 PVD Sputter 부품",
      "Target·장비 조건별 대응",
      "국산화 및 공급 이력",
    ],
    specs: [
      ["적용 공정", "EMI Shielding / PVD Sputtering"],
      ["제품 구성", "Target 조건별 Back Plate"],
      ["검토 사양", "적용 장비 / Target / 재질 / 치수 / 체결 구조"],
      ["개발 이력", "2022년 국산화 / 2023년 공급 계약"],
    ],
    customization:
      "대응 Target과 장비 구조, 재질·치수·체결 조건을 기준으로 제작 사양을 검토합니다.",
    note: "자료 기준 개발 완료·양산 적용 제품입니다. 적용 가능 장비와 제작 범위는 상담 시 확인합니다.",
    sourcePages: "3, 12",
  },
];
export const productHref = (product: Product) => `./product-${product.id}.html`;
export const inquiryHref = (product: Product) =>
  `./support-contact.html?product=${encodeURIComponent(product.id)}`;
