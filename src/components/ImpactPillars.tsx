import React, { useState } from "react";
import { 
  Heart, 
  Smile, 
  Users, 
  Sparkles, 
  Hammer, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck, 
  Waves 
} from "lucide-react";

interface ImpactProps {
  fontRatio: number;
  highContrast: boolean;
  setView: (view: string, subView?: string) => void;
  activeSubSection?: string;
}

export default function ImpactPillars({ fontRatio, highContrast, setView, activeSubSection }: ImpactProps) {
  const [activeTab, setActiveTab] = useState<"heal" | "contribution" | "art">(
    (activeSubSection === "heal" || activeSubSection === "contribution" || activeSubSection === "art")
      ? activeSubSection as any 
      : "heal"
  );

  const pillars = {
    heal: {
      title: "정서 안정 및 정착 지원: 한마음센터 & 통일마중쉼터",
      subtitle: "보듬음과 치유를 통해 이방인에서 당당한 이웃으로",
      description: `우리원의 정착 지원은 단순 일방적 의식주 보조에서 멈추지 않습니다. 우리는 마음의 빈 병을 정서적으로 보듬고 통일 코칭 리더를 양성하는 데 주력합니다. 
특히 한국양성평등교육진흥원 전문 위탁을 통해 가정폭력 및 성희롱 예방 전문 강사를 양성하여, 남한 사회의 당당한 강사진으로 배출하는 눈부신 결실을 보았습니다.
나아가 '통일마중쉼터'는 무연고 탈북 독거 어르신들의 합동 팔순 잔치, 실향 망향제 대제 봉행은 물론 극심한 위기 가구에 생필품 상자를 전하는 등 든든한 정착 안식망을 실현합니다.`,
      metrics: [
        { label: "1:1 집중 심리 코칭", value: "240회 이상" },
        { label: "가정폭력 예방 전문강사 배출", value: "12명" },
        { label: "무연고 어르신 합동 추모", value: "매년 추석" },
        { label: "긴급 생필품 방문배달 가구", value: "월 20가구" }
      ],
      quote: "“우리의 위대한 정착은 분단 장벽을 무력화시키는 남북통합의 아름다운 정견(正見)입니다.”",
      cta: { text: "통일마중쉼터 상담/상정 신청하기", targetSubView: "volunteer" }
    },
    contribution: {
      title: "사회적 기여와 자립: 우리원 봉사단 & 협동부업센터",
      subtitle: "수혜자였던 우리가, 이제는 아산 이웃을 지키는 역할자로",
      description: `우리원 봉사단은 평균 연령 60세 이상의 실버 취약계층 회원들이 자발적으로 결성한 단체입니다. 
당초 보살핌을 수혜받을 나이임에도, 매주 김장 나누기 봉사, 소외계층 무료배식소 손길, 그리고 충남자율방범대와의 연합 치안 활동에 솔선수범 참여하고 있습니다. 
또한 '협동부업센터'를 전방위 가동하여, 경제 자립력을 원천 확보하기 힘든 어르신들과 회원들에게 양질의 임가공 가내 자립을 주선하여 스스로 세입을 확보할 기틀을 설계해 드립니다.`,
      metrics: [
        { label: "연합 김장 나눔 누적", value: "5,000 포기" },
        { label: "무료 배식 기여 봉사", value: "연 48회" },
        { label: "협동자립 참여 조합원", value: "45명" },
        { label: "지자체 단체 표창 수임", value: "7회" }
      ],
      quote: "“봉사 받을 60대 실버 어르신들이 앞치마를 차고 배식상자를 드는 가슴가슴엔 자활 자립의 긍지가 솟구칩니다.”",
      cta: { text: "봉사자 지원 양식 작성", targetSubView: "volunteer" }
    },
    art: {
      title: "통일 공감대 및 문화예술: 통일품바 & 통일메아리 예술단",
      subtitle: "몸의 상처와 장애의 고통을 통일 해학의 신명으로 승화하다",
      description: `우리원 산하 '통일품바 각설단'과 'MBJK 통일메아리 예술단'은 기적과도 같은 감동의 보고입니다. 
허리와 신체 골조에 쇠심을 장비하거나, 암 수술의 오랜 육체적 장애를 안고 살아가는 탈북 예술가들이 단원이 되었습니다. 
이들은 전통 품바와 자작 연극 '탈북 흥보전'을 전국 장터와 복지관에 순회 기획하며 분단의 설움을 통쾌한 해학의 춤사위로 분출시킵니다. 
육체적 한계마저 통일을 당기는 메아리로 부활시키는 예술 활동은 보는 남한 주민들의 통일 감성을 요동치게 합니다.`,
      metrics: [
        { label: "전국 복지관 흥보전 순회", value: "35회" },
        { label: "예술 재능기부 횟수", value: "누적 80회" },
        { label: "예술단 정식 소속 단원", value: "18명" },
        { label: "대중 관객 만족도 평가", value: "99.8%" }
      ],
      quote: "“내 몸에 박힌 철심의 아픔보다, 고향에 두고 온 부모님을 향한 그리움이 더 장엄한 춤을 만들어냅니다.”",
      cta: { text: "통일메아리 현장 영상 시청", targetSubView: "feed" }
    }
  };

  return (
    <div className="space-y-12 animate-fade-in text-slate-800" style={{ fontSize: `${16 * fontRatio}px` }}>
      
      {/* Structural Header */}
      <div className="border-b border-slate-100 pb-5 max-w-2xl">
        <span className="text-xs font-black uppercase text-blue-600 tracking-wider">Strategic Pillars</span>
        <h1 className="text-3xl font-black text-slate-900 mt-1">우리원의 핵심 사회 공헌 영역</h1>
        <p className="text-slate-500 font-semibold mt-1">4대 기조 사업의 상세 아키텍처와 현장 실적을 투명하게 수록했습니다.</p>
      </div>

      {/* Interactive Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
        <button
          id="impact-tab-heal"
          onClick={() => setActiveTab("heal")}
          className={`py-4 rounded-xl font-black text-base transition-all flex items-center justify-center gap-2 ${
            activeTab === "heal"
              ? "bg-white text-blue-700 shadow-md border-b-2 border-blue-600"
              : "text-slate-600 hover:bg-white/50"
          }`}
        >
          <Smile className="w-5 h-5 text-blue-600" />
          <span>정착과 심리치유</span>
        </button>
        <button
          id="impact-tab-contribution"
          onClick={() => setActiveTab("contribution")}
          className={`py-4 rounded-xl font-black text-base transition-all flex items-center justify-center gap-2 ${
            activeTab === "contribution"
              ? "bg-white text-blue-700 shadow-md border-b-2 border-blue-600"
              : "text-slate-600 hover:bg-white/50"
          }`}
        >
          <Users className="w-5 h-5 text-orange-500" />
          <span>사회공헌과 경제자립</span>
        </button>
        <button
          id="impact-tab-art"
          onClick={() => setActiveTab("art")}
          className={`py-4 rounded-xl font-black text-base transition-all flex items-center justify-center gap-2 ${
            activeTab === "art"
              ? "bg-white text-blue-700 shadow-md border-b-2 border-blue-600"
              : "text-slate-600 hover:bg-white/50"
          }`}
        >
          <Sparkles className="w-5 h-5 text-purple-500" />
          <span>통일 문화와 예술단</span>
        </button>
      </div>

      {/* Main Focus Panel Description */}
      <div className={`p-8 md:p-10 rounded-3xl border transition-all ${
        highContrast 
          ? "bg-black border-yellow-400 text-yellow-300" 
          : "bg-white border-slate-150 shadow-sm"
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-star">
          
          <div className="lg:col-span-8 space-y-6">
            <span className="text-xs font-black bg-blue-100 text-blue-800 px-3 py-1 rounded-full uppercase tracking-wider">
              {pillars[activeTab].subtitle}
            </span>
            <h2 className="text-2xl md:text-3.5xl font-extrabold tracking-tight">
              {pillars[activeTab].title}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed whitespace-pre-wrap font-medium">
              {pillars[activeTab].description}
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-blue-900 font-extrabold">
              {pillars[activeTab].quote}
            </div>

            <div className="pt-4">
              <button
                id="impact-cta-btn"
                onClick={() => setView(activeTab === "art" ? "news" : "support", pillars[activeTab].cta.targetSubView)}
                className="px-6 py-3.5 bg-slate-900 text-white font-extrabold rounded-xl text-base hover:bg-slate-800 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span>{pillars[activeTab].cta.text}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Right Metrics Grid */}
          <div className="lg:col-span-4 space-y-4 bg-slate-50/50 p-6 rounded-2.5xl border border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">핵심 활동 실적 성과 (Metrics)</h4>
            <div className="grid grid-cols-1 gap-4">
              {pillars[activeTab].metrics.map((m, mIdx) => (
                <div key={mIdx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-2xs">
                  <span className="text-slate-400 text-xxs block font-bold">{m.label}</span>
                  <span className="text-xl font-black text-blue-600 block mt-1">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Additional info block - Unification Academic hub explaining Yang moon-su and National Unification training goals */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs bg-orange-600 text-white font-extrabold px-3 py-1 rounded-full uppercase">Academic Research Focus</span>
          <h2 className="text-2xl md:text-3xl font-black">4. 남북통합 교육 및 지식 학술 아카이빙</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            우리원은 단순 구제를 넘어, 대국문 평화 담론의 지방 싱크탱크 역할을 주무하고 있습니다. 
            우리원 자료실에는 통일부 통일교육연구원 발간자료 및 북한 시장 경제의 미시 구조와 신흥 무역 와크 담론을 해석해낸 
            학계 최고 권위자 <strong>양문수 교수의 '북한 시장화 지형 구조'</strong> 분석 연구를 수록 및 상설 보급하고 있습니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 pt-2">
          <button
            id="impact-academic-archive-btn"
            onClick={() => setView("news", "library")}
            className="px-5 py-3 bg-white text-slate-900 font-extrabold rounded-xl text-base hover:bg-slate-50 transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>📚 학술자료실 다운로드관 바로가기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
