import React, { useState } from "react";
import { 
  Heart, 
  Award, 
  Globe, 
  Sparkles, 
  ChevronLeft,
  ChevronRight, 
  Star, 
  Play,
  Pause,
  X,
  Video
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const heroSlides = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800",
    badge: "무상 급식 나눔",
    title: "우리원 주관 위기 어르신 사랑의 김장 나눔 축제",
    description: "충남 아산과 우리원 봉사자들이 하나 되어 정성을 다한 영양 밑반찬 배달 연합 마당"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
    badge: "수공예 자립 공방",
    title: "우리원 협동조합 한복인형 및 점토 도예 생산소",
    description: "단순 보조금 수혜에서 탈피하여 손수 제작한 단가 매출로 경제적 자립을 엮는 공간"
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
    badge: "마음 정착 멘토링",
    title: "1:1 은빛 치유 동료 코치 상담 및 가족 일자리 맺음",
    description: "같은 고향의 상처를 따뜻한 사랑으로 치유해 낸 우수 탈북 선배 전문 교사의 보금자리"
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    badge: "메아리 예술단 공연",
    title: "MBJK 메아리 예술단 전통 가락과 무용 순회 공연",
    description: "전국 온천지대 및 복지관을 돌며 전통 풍자극과 신명나는 소식으로 우울을 녹이는 가락진 마당"
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
    badge: "통일 마중 쉼터",
    title: "충남 온양온천 전철 인근 위기 탈북민 임시 안식처",
    description: "고향 소식을 듣고 고통을 나누며 스스로 상호 보듬어 상생을 피워내는 따뜻한 마중 공간"
  }
];

interface DashboardProps {
  fontRatio: number;
  highContrast: boolean;
  setView: (view: string, sub?: string) => void;
}

export default function DashboardHome({ fontRatio, highContrast, setView }: DashboardProps) {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev
  const [isSliderPlaying, setIsSliderPlaying] = useState(true);

  React.useEffect(() => {
    if (!isSliderPlaying) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isSliderPlaying]);

  const handleNextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : dir < 0 ? "-100%" : 0,
      opacity: 0
    }),
    center: {
      x: "0%",
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : dir > 0 ? "-100%" : 0,
      opacity: 0
    })
  };

  const mediaActivities = [
    {
      title: "우리원 통일품바 각설단 명품 대공연",
      description: "신명나는 가락과 유기적 전통 풍자 리듬으로 눈물겨운 이향의 한을 흥겨움과 자활 활력으로 승화시키는 각설 마당입니다. 아산 온천 지구와 충남 일대 취약 노인들에게 행복한 마음 요법을 선물하고 있습니다.",
      youtubeId: "VFrF_b8Bf7w", // Authentic performance representative video ID
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800",
      category: "통일품바 각설단",
      duration: "08:15"
    },
    {
      title: "MBJK 메아리 예술단 정기 힐링 자활극",
      description: "오랜 분단에서 누적된 내면적 트라우마를 아코디언 명선율, 무용 퍼포먼스, 그리고 전통 민요 가락으로 치유하는 종합 음악제입니다. 탈북 여성 예술인들이 주체가 되어 지역 사회에 깊은 인류애적 메아리를 펼칩니다.",
      youtubeId: "M7lc1UVf-VE", // Standard representative high quality video
      thumbnail: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&q=80&w=800",
      category: "MBJK 예술단",
      duration: "12:40"
    }
  ];

  const coreValues = [
    {
      title: "동료 멘토 정서 통합 (Unity)",
      description: "탈북 선후배 매칭을 통한 생활 적응 가이드 전대 및 지속적인 마음 치유 교육 지원.",
      accent: "border-zinc-200/60/70 bg-gradient-to-br from-blue-50/10 to-indigo-50/20 hover:border-blue-200/60 hover:shadow-lg shadow-zinc-200/50 text-blue-750",
      icon: <Globe className="w-9 h-9 text-zinc-800" />,
    },
    {
      title: "자립 능력자로서의 도약 (Self-reliance)",
      description: "단순 보조 수혜 수급에서 탈피하여 협동부업센터 가동 및 수입 기틀 원천 수립.",
      accent: "border-zinc-200/60/70 bg-gradient-to-br from-orange-50/20 to-amber-50/25 hover:border-orange-200/60 hover:shadow-lg shadow-zinc-200/50 text-orange-750",
      icon: <Award className="w-9 h-9 text-orange-500" />,
    },
    {
      title: "세입·세출 전액 투명 공개 (Transparency)",
      description: "행안부 공익지정 단체 기준 복식부기 및 모금 사후 실적을 대시민 상시 개방.",
      accent: "border-zinc-200/60/70 bg-gradient-to-br from-emerald-50/10 to-green-50/20 hover:border-emerald-200/60 hover:shadow-lg shadow-zinc-200/50 text-emerald-750",
      icon: <Heart className="w-9 h-9 text-emerald-600" />,
    },
  ];

  const liveSketches = [
    {
      title: "사랑 나눔 무료급식배달",
      description: "매주 고령의 어르신들이 앞치마를 매고 지역 취약가정에 영양 죽과 반찬 상자를 직접 전해드립니다.",
      imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600",
      tag: "무료급식"
    },
    {
      title: "1:1 은빛 동료 치유 상담",
      description: "같은 고향 출신의 전문 코치들이 심리 외상과 우울을 보듬고 마음 치유 요법을 개진수행합니다.",
      imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600",
      tag: "멘토치유"
    },
    {
      title: "통일 예술단 순회공연",
      description: "단원들의 오랜 신체 고통마저 통일의 신명나는 가락으로 승화한 자작극 '탈북 흥보전' 현장.",
      imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=600",
      tag: "예술재능"
    },
    {
      title: "원가 보증 협동부업",
      description: "단순한 기부 수혜에서 탈피해 원가를 가내 처리하고 상조 장비를 다집하여 소득 안정을 자활합니다.",
      imageUrl: "https://images.unsplash.com/photo-1531206715517-5c0ba33d34ec?auto=format&fit=crop&q=80&w=600",
      tag: "경제자립"
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in text-zinc-800" style={{ fontSize: `${16 * fontRatio}px` }}>
      
      {/* 1. Hero Campaign Section: 100% Responsive Grid with High Quality Real Unification Photo */}
      <section className={`relative rounded-[1.5rem] p-8 md:p-14 overflow-hidden border transition-all duration-500 ${
        highContrast 
          ? "bg-black border-yellow-400 text-yellow-300" 
          : "bg-white border-white/40 shadow-lg shadow-zinc-200/50"
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1 bg-zinc-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-zinc-200/50">
              <Star className="w-3.5 h-3.5 fill-current text-white animate-pulse" />
              <span>자립 공헌 우수공익단체</span>
            </div>
            
            <h1 className="text-lg md:text-lg font-bold tracking-tight leading-tight md:leading-tight text-zinc-900">
              수혜자에서 <span className="text-zinc-800 underline decoration-wavy decoration-orange-500 underline-offset-4">기여자로</span>,<br/>
              당당하게 대한민국의 내일을 엽니다
            </h1>
            
            <p className={`text-sm md:text-base font-semibold leading-relaxed ${
              highContrast ? "text-yellow-400" : "text-zinc-500"
            }`}>
              “‘다름’의 간극을 줄이고 하나의 조화로운 미래를 약속하는 비영리민간단체 우리원.” <br/>
              충남 거점 북한이탈주민의 고립을 타파하고, 당당한 사회 역할자가 되는 혁신 플랫폼입니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <button
                id="hero-donate-now-btn"
                onClick={() => setView("support", "fund")}
                className="px-6 py-3.5 rounded-xl bg-orange-500 text-white font-bold text-sm md:text-base shadow-md hover:bg-orange-600 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer hover:shadow-lg whitespace-nowrap"
              >
                <span>🤝 따뜻한 우리원 정기 기부</span>
                <ChevronRight className="w-4 h-4 text-white shrink-0" />
              </button>
              <button
                id="hero-about-redirect-btn"
                onClick={() => setView("about", "organization")}
                className="px-6 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm md:text-base hover:bg-slate-800 transition-all cursor-pointer shadow-md justify-center flex items-center whitespace-nowrap"
              >
                <span>🏢 우리원 소개 & 조직도 열람</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Autoplaying Image Slider with motion/react (5 Slides) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-[1.5rem] overflow-hidden border border-zinc-200/60 shadow-lg aspect-[16/11] bg-slate-900 group select-none">
              
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.25 }
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img 
                    src={heroSlides[currentSlide].imageUrl} 
                    alt={heroSlides[currentSlide].title} 
                    className="w-full h-full object-cover grayscale opacity-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent"></div>
                  
                  {/* Caption Overlay */}
                  <div className="absolute bottom-5 left-4 right-16 text-white text-left z-10 pointer-events-none">
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="inline-block text-[9px] bg-orange-500 text-white font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                    >
                      {heroSlides[currentSlide].badge}
                    </motion.span>
                    <motion.h4 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.35 }}
                      className="text-xs md:text-sm font-bold mt-2 leading-snug line-clamp-1 text-white"
                    >
                      {heroSlides[currentSlide].title}
                    </motion.h4>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.4 }}
                      className="text-[10px] md:text-[11px] text-slate-300 font-semibold leading-relaxed mt-1 line-clamp-1"
                    >
                      {heroSlides[currentSlide].description}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev Arrow */}
              <button
                id="btn-slider-prev"
                onClick={handlePrevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 backdrop-blur-xs text-white flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100 xl:scale-95 hover:bg-black/75 hover:scale-105 active:scale-95 z-25 focus:outline-none"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>

              {/* Next Arrow */}
              <button
                id="btn-slider-next"
                onClick={handleNextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 backdrop-blur-xs text-white flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100 xl:scale-95 hover:bg-black/75 hover:scale-105 active:scale-95 z-25 focus:outline-none"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>

              {/* Controls at Bottom Right: Dots & PlayPause toggler */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/55 backdrop-blur-xs px-2.5 py-1.5 rounded-full z-30 text-white">
                <button
                  id="btn-slider-play-toggle"
                  onClick={() => setIsSliderPlaying(!isSliderPlaying)}
                  className="p-0.5 text-white/80 hover:text-white transition-colors cursor-pointer focus:outline-none"
                  title={isSliderPlaying ? "일시정지" : "자동재생"}
                >
                  {isSliderPlaying ? (
                    <Pause className="w-3 h-3 text-white" />
                  ) : (
                    <Play className="w-3 h-3 text-white fill-current" />
                  )}
                </button>
                <div className="w-px h-3 bg-white/20" />
                <div className="flex items-center gap-1">
                  {heroSlides.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => handleDotClick(dotIdx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentSlide === dotIdx 
                          ? "w-3 bg-orange-500" 
                          : "w-1.5 bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Micro Stats Overlay card */}
            <div className={`p-4 rounded-xl border shadow-lg shadow-zinc-200/50 ${
              highContrast ? "bg-stone-900 border-yellow-500 text-yellow-300" : "bg-white/90 backdrop-blur-sm border-zinc-200/60"
            }`}>
              <div className="flex justify-between items-center text-xs">
                <div>
                  <p className="text-xxs font-bold text-slate-400">충청남도 누적 통계</p>
                  <p className="text-xl font-bold text-zinc-800 mt-0.5">1,801 명 거주</p>
                </div>
                <span className="text-[9px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full uppercase">아산시 집중 정착</span>
              </div>
              <p className="text-[10px] text-zinc-500 mt-1.5 leading-relaxed font-semibold">
                충남 아산 일대는 최상위급 탈북민 거점 보호 지역입니다. 고립 방출과 생활자립망 조립은 통일마중쉼터에 의해 수립됩니다.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Three Classic Structured Cards (3D Glassmorphism theme) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl md:text-lg font-bold tracking-tight text-zinc-900">우리원이 추구하는 3대 혁신 신념</h2>
          <p className="text-zinc-500 font-semibold text-sm">단순 물질 수혜자 수급 상태에서 탈피한 자치 정서 자급 생태계</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {coreValues.map((val, idx) => (
            <div 
              id={`core-value-card-${idx}`}
              key={idx} 
              className={`p-8 md:p-10 rounded-[1.5rem] border bg-white shadow-md shadow-zinc-200/50 flex flex-col justify-between hover:scale-[1.03] hover:-translate-y-2 hover:shadow-xl hover:shadow-zinc-300/60 transition-all duration-500 ease-out cursor-pointer ${val.accent}`}
            >
              <div>
                <div className="mb-6">{val.icon}</div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-zinc-900">{val.title}</h3>
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-6">{val.description}</p>
              </div>
              <span className="text-xs font-bold text-zinc-400">WOORI_ONE Core Pillar</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2.3 Community Engagement Link */}
      <section className={`p-8 md:p-10 rounded-[1.5rem] border text-left flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500 ${
        highContrast
          ? "bg-black border-yellow-405 text-yellow-300"
          : "bg-white border-white/50 shadow-lg shadow-zinc-200/50 hover:shadow-xl hover:shadow-zinc-300/60"
      }`}>
        <div className="space-y-2 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white tracking-wider uppercase">
            📢 소통과 참여의 공간
          </span>
          <h3 className="text-xl font-bold text-zinc-900">
            우리원 커뮤니티 및 활동 갤러리
          </h3>
          <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
            비영리민간단체 우리원의 최신 소식과 활동 사진을 확인하세요. 
            회원님들의 소중한 의견을 자유게시판에 남겨주시고 자원봉사에도 참여하실 수 있습니다.
          </p>
        </div>

        <button 
          onClick={() => setView("news", "feed")}
          className="px-5.5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs md:text-sm rounded-xl shrink-0 flex items-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
        >
          <span>활동 갤러리 보기</span>
        </button>
      </section>

      {/* 2.5 Vivid Field Sketches: A Rich Showcase of Images for High Usability & Storytelling */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/60 pb-5">
          <div className="space-y-1.5 text-left">
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider bg-zinc-100 px-3 py-1 rounded-full">Vivid Field Sketches</span>
            <h2 className="text-xl md:text-lg font-bold tracking-tight text-zinc-900 mt-1">우리원 따뜻한 자활 현장 스케치</h2>
            <p className="text-zinc-500 font-semibold text-sm">우리는 말이 아닌 실천하는 손끝과 굵직한 땀방울로 분단의 다름을 직접 녹입니다.</p>
          </div>
          <button
            id="view-all-sketches-btn"
            onClick={() => setView("news", "feed")}
            className="text-xs font-bold text-zinc-800 hover:text-blue-700 flex items-center gap-1.5 shrink-0 px-4 py-2.5 bg-slate-50 border hover:bg-slate-100 rounded-xl transition-all cursor-pointer shadow-xs hover:shadow-lg shadow-zinc-200/50"
          >
            <span>전체 현장미디어 관람하기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Column fully responsive layout display showing the pictures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {liveSketches.map((sketch, sIdx) => (
            <div 
              id={`live-sketch-story-${sIdx}`}
              key={sIdx}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between border border-zinc-200/60"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img 
                  src={sketch.imageUrl} 
                  alt={sketch.title} 
                  className="w-full h-full object-cover grayscale-[30%] opacity-90 group-hover:scale-110 group-hover:grayscale-0 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-zinc-900 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-zinc-200/50">
                  {sketch.tag}
                </span>
              </div>
              <div className="p-5 md:p-6 flex-1 flex flex-col justify-between z-10 bg-white relative">
                <div>
                  <h3 className="font-bold text-base text-zinc-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {sketch.title}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed font-medium mt-2.5 line-clamp-3">
                    {sketch.description}
                  </p>
                </div>
                <div className="text-right pt-4 border-t border-zinc-100 mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-zinc-400">WOORI_ONE</span>
                  <span className="text-[10px] font-bold text-blue-600 uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                    Our Story <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2.8 Major Activities: High Impact YouTube Media Board with Premium Modal Popups */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/60/65 pb-5">
          <div className="space-y-1.5 text-left">
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest bg-rose-55 px-3.5 py-1 rounded-full">★ 주요 활동 미디어 보드</span>
            <h2 className="text-xl md:text-lg font-bold tracking-tight text-zinc-900 mt-1">우리원 대표 자활 예술단 공연</h2>
            <p className="text-zinc-500 font-semibold text-sm">통일품바 각설단 및 MBJK 메아리 예술단이 펼쳐 보이는 찬란한 감동의 무대 영상을 즉시 감상하세요.</p>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-bold bg-slate-50 border border-zinc-200/60 px-3.5 py-2 rounded-xl">
            <Video className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>화면 클릭 시 팝업 즉시 재생</span>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mediaActivities.map((act, aIdx) => (
            <div 
              id={`media-act-card-${aIdx}`}
              key={aIdx}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer hover:scale-[1.03] hover:-translate-y-2 ${
                highContrast 
                  ? "bg-black border-yellow-400 text-yellow-300" 
                  : "bg-white border-zinc-200/60 shadow-lg shadow-zinc-200/50 hover:shadow-xl hover:shadow-zinc-300/60"
              }`}
              onClick={() => {
                setPlayingVideoId(act.youtubeId);
              }}
            >
              {/* Media Thumbnail Container with play hover effects */}
              <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                {playingVideoId === act.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${act.youtubeId}?autoplay=1&rel=0`}
                    title={act.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0 z-10"
                  />
                ) : null}
                <img 
                  src={act.thumbnail} 
                  alt={act.title} 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glassmorphism Overlays */}
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300" />
                
                {/* Floating Category Indicator */}
                <span className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm text-zinc-900 font-bold text-[10px] tracking-wider px-3.5 py-1.5 rounded-full uppercase shadow-sm">
                  {act.category}
                </span>

                {/* Floating Video Duration */}
                <span className="absolute bottom-5 right-5 bg-black/70 backdrop-blur-md text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-md tracking-wider shadow-sm">
                  ⏱️ {act.duration}
                </span>

                {/* Centered Huge Play Button with Ripple Pulse */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 scale-95 group-hover:scale-110 shadow-xl ${
                    highContrast 
                      ? "bg-yellow-300 text-black" 
                      : "bg-white/95 text-blue-600 backdrop-blur-xs group-hover:bg-blue-600 group-hover:text-white"
                  }`}>
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Text Description and actions */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-blue-600 tracking-wider">비영리민간단체 우리원 주요 사업</span>
                  <h3 className="font-bold text-xl text-zinc-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {act.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium line-clamp-2">
                    {act.description}
                  </p>
                </div>
                
                <div className="mt-4 pt-5 border-t border-zinc-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-blue-600 group-hover:underline flex items-center gap-1.5">
                    ▶ 영상 재생하기
                  </span>
                  <span className="text-zinc-400 font-bold text-[10px]">
                    우리원 동행콘텐츠
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Streamlined Greeting & Action Board */}
      <section className={`p-8 md:p-10 rounded-[1.5rem] border transition-all ${
        highContrast 
          ? "bg-black border-yellow-400 text-yellow-300" 
          : "bg-radial-[at_50%_0%] from-blue-50/10 via-white to-white border-zinc-200/60 shadow-lg shadow-zinc-200/50"
      }`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-zinc-800 uppercase bg-zinc-100 px-3.5 py-1 rounded-full">
              ★ WE ARE COMMITTED
            </span>
            <h2 className="text-lg font-bold text-zinc-900">
              “다름이 기여자의 이름으로 하나가 되는 날까지”
            </h2>
            <p className="text-zinc-500 text-sm font-semibold max-w-2xl leading-relaxed">
              사단법인 탈북민공익활동지원연합 산하 우리원은 자활공방, 메아리 예술단, 정서 치유 프로그램을 통해 
              탈북민이 당당한 사회적 기여자로 자립할 수 있도록 헌신적으로 지원하고 보듬고 있습니다.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 justify-center">
            <button
              id="about-greetings-redirect-btn"
              onClick={() => setView("about", "message")}
              className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-lg shadow-zinc-200/50 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              대표 인사말 바로가기
            </button>
            <button
              id="about-directions-redirect-btn"
              onClick={() => setView("about", "directions")}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-lg shadow-zinc-200/50 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              찾아오시는 길 안내
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
