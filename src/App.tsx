import React, { useState, useEffect } from "react";
import { 
  Heart, 
  MapPin, 
  PhoneCall, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  Terminal,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Components
import Navigation from "./components/Navigation";
import DashboardHome from "./components/DashboardHome";
import ImpactPillars from "./components/ImpactPillars";
import CounselingShelter from "./components/CounselingShelter";
import DigitalFundraising from "./components/DigitalFundraising";
import AcademicLibrary from "./components/AcademicLibrary";
import CommunityBoard from "./components/CommunityBoard";
import SiteGallery from "./components/SiteGallery";
import GoogleDriveManager from "./components/GoogleDriveManager";

// Pages in page/ folder
import Greetings from "./page/Greetings";
import Organization from "./page/Organization";
import History from "./page/History";
import Directions from "./page/Directions";

// 5 Key Activity Unsplash Slides for the primary carousel
const primarySlides = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200",
    badge: "무상 급식 나눔",
    title: "우리원 주관 위기 어르신 사랑의 김장 나눔 축제",
    description: "충남 아산과 우리원 봉사자들이 하나 되어 정성을 다한 영양 밑반찬 배달 연합 마당"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200",
    badge: "수공예 자립 공방",
    title: "우리원 협동조합 한복인형 및 점토 도예 생산소",
    description: "단순 보조금 수혜에서 탈피하여 손수 제작한 단가 매출로 경제적 자립을 엮는 공간"
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200",
    badge: "마음 정착 멘토링",
    title: "1:1 은빛 치유 동료 코치 상담 및 가족 일자리 맺음",
    description: "같은 고향의 상처를 따뜻한 사랑으로 치유해 낸 우수 탈북 선배 전문 교사의 보금자리"
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
    badge: "메아리 예술단 공연",
    title: "MBJK 메아리 예술단 전통 가락과 무용 순회 공연",
    description: "전국 온천지대 및 복지관을 돌며 전통 풍자극과 신명나는 소식으로 우울을 녹이는 가락진 마당"
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200",
    badge: "통일 마중 쉼터",
    title: "충남 온양온천 전철 인근 위기 탈북민 임시 안식처",
    description: "고향 소식을 듣고 고통을 나누며 스스로 상호 보듬어 상생을 피워내는 따뜻한 마중 공간"
  }
];

export default function App() {
  const [view, setView] = useState<string>("home");
  const [subView, setSubView] = useState<string>("");
  const [fontRatio, setFontRatio] = useState<number>(1.0);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Main Home Hero Carousel state in App.tsx
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [sliderAutoplay, setSliderAutoplay] = useState<boolean>(true);

  useEffect(() => {
    if (!sliderAutoplay || view !== "home") return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % primarySlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderAutoplay, view]);

  // Router handler
  const handleSetView = (newView: string, targetSubView?: string) => {
    setView(newView);
    setSubView(targetSubView || "");
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Dynamic Contextual Sidebar Cards loaded with real gorgeous photos
  const getSidebarCards = () => {
    switch(view) {
      case "home":
      case "about":
        return [
          {
            title: "사랑의 통일쉼터 공간",
            description: "충남 아산시에 위치한 쉼터는 고령의 탈북 어르신들이 모여 고향 소식을 나누고 정서 상처를 자가 돌봄하는 보금자리입니다.",
            imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80",
            badge: "쉼터 공간"
          },
          {
            title: "MBJK 메아리 예술단",
            description: "오랜 분단으로 쌓인 단원들의 신체 피로와 정서 우울을 고유 민요 가락과 자작 악극을 연주하며 화합으로 해소합니다.",
            imageUrl: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=500&q=80",
            badge: "문화 예술"
          },
          {
            title: "원가보정 자활 협동공방",
            description: "단순한 후원 물건 수혜에서 나아가, 단원들이 손수 한복 인형과 천연 소포를 제작해 자주적인 자립 수익 기틀을 조립합니다.",
            imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=500&q=80",
            badge: "경제 자립"
          }
        ];
      case "impact":
        return [
          {
            title: "1:1 은빛 정서 상담회",
            description: "전문 심리 교육을 이수한 동료 지도원이 매주 같은 처지의 귀향민 세대를 대면해 외로움 가이드라인을 자율 지도합니다.",
            imageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=500&q=80",
            badge: "치유 상담"
          },
          {
            title: "충남 아산 밀착 파트너십",
            description: "충청남도 거점 자원봉사 센터 등 이웃 단체 및 공익 결연들과 손잡고 취약 가구에 실시간 온정 인프라를 연결합니다.",
            imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=500&q=80",
            badge: "지역 연합"
          }
        ];
      case "news":
        return [
          {
            title: "투명 공시 아카이브 자료실",
            description: "통일부 및 기재부 세법 규칙에 따라 매 분기 기부 수입과 사업 결산서를 1원 단위 검토 후 명백히 개방 열람합니다.",
            imageUrl: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=500&q=80",
            badge: "정보 청정"
          },
          {
            title: "소망 편지와 따뜻한 응원",
            description: "전국 각지의 시민분들이 온라인 자유게시판과 엽서를 통해 보내주신 가슴 따뜻한 자립 기원 서신을 상설 보존합니다.",
            imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80",
            badge: "시민 공익"
          }
        ];
      case "support":
        return [
          {
            title: "정기 기부의 따뜻한 발자국",
            description: "시민분들의 기부금은 고스란히 무료 급식 영양 반찬 식자재비와 고령층 긴급 비상 치료 보조비로 투명하게 집행됩니다.",
            imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=500&q=80",
            badge: "나눔 기적"
          },
          {
            title: "기획재정부 지정 고시 규격",
            description: "행정안전부 및 관할 세무서에 완벽히 보고되는 영수증 가용 단체로서 청렴성과 비영리 투명 제도를 100% 준수합니다.",
            imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80",
            badge: "회계 청렴"
          }
        ];
      default:
        return [
          {
            title: "사랑의 통일쉼터 공간",
            description: "충남 아산시에 위치한 쉼터는 고령의 탈북 어르신들이 모여 고향 소식을 나누고 정서 상처를 자가 돌봄하는 보금자리입니다.",
            imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80",
            badge: "쉼터 공간"
          }
        ];
    }
  };

  const currentSidebarCards = getSidebarCards();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      highContrast 
        ? "bg-black text-yellow-300" 
        : "bg-[#FFFFFF] text-slate-800"
    }`}>
      
      {/* Universal GNB accessibility header */}
      <Navigation 
        currentView={view} 
        currentSubView={subView}
        setView={handleSetView} 
        fontRatio={fontRatio} 
        setFontRatio={setFontRatio} 
        highContrast={highContrast} 
        setHighContrast={setHighContrast} 
      />

      {/* Main Responsive Auto-playing Image Carousel with framer-motion/react (Cross-fade) */}
      {view === "home" && (
        <div className="w-full">
          <div className={`relative overflow-hidden border-b shadow-md aspect-[21/9] md:aspect-[24/9] min-h-[340px] md:min-h-[460px] bg-slate-900 group select-none transition-all ${
            highContrast ? "border-yellow-400" : "border-slate-150"
          }`}>
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={activeSlide}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <img 
                  src={primarySlides[activeSlide].imageUrl} 
                  alt={primarySlides[activeSlide].title} 
                  className="w-full h-full object-cover grayscale opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                
                {/* Overlay Text inside the slider aligned to the common max-w-7xl grid */}
                <div className="absolute inset-x-0 bottom-0 pb-10 pt-28 z-15 pointer-events-none">
                  <div className="max-w-7xl mx-auto px-4 md:px-8 text-white text-left">
                    <motion.span 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-black bg-orange-500 text-white tracking-widest uppercase mb-3"
                    >
                      <Sparkles className="w-3 h-3 text-white animate-pulse" />
                      {primarySlides[activeSlide].badge}
                    </motion.span>
                    
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.45 }}
                      style={{ fontSize: `${24 * fontRatio}px` }}
                      className="font-black text-lg md:text-2xl lg:text-3.5xl text-white tracking-tight leading-tight max-w-3xl"
                    >
                      {primarySlides[activeSlide].title}
                    </motion.h2>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                      style={{ fontSize: `${14 * fontRatio}px` }}
                      className="text-xs md:text-sm lg:text-base text-slate-300 font-semibold mt-2.5 leading-relaxed max-w-2xl line-clamp-2 md:line-clamp-none"
                    >
                      {primarySlides[activeSlide].description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Left Prev Trigger arrow button */}
            <button
              id="btn-hero-prev"
              onClick={() => setActiveSlide((prev) => (prev - 1 + primarySlides.length) % primarySlides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/45 backdrop-blur-xs text-white flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100 xl:scale-95 hover:bg-black/75 hover:scale-100 active:scale-90 z-20 focus:outline-none"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>

            {/* Right Next Trigger arrow button */}
            <button
              id="btn-hero-next"
              onClick={() => setActiveSlide((prev) => (prev + 1) % primarySlides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/45 backdrop-blur-xs text-white flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100 xl:scale-95 hover:bg-black/75 hover:scale-100 active:scale-90 z-20 focus:outline-none"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>

            {/* Control HUD (Dot Indicators + Play/Pause Toggle button) */}
            <div className="absolute bottom-6 right-4 md:right-10 flex items-center gap-2.5 bg-black/60 backdrop-blur-xs px-3.5 py-2 rounded-full z-20 text-white border border-white/10">
              <button
                id="btn-hero-play-toggle"
                onClick={() => setSliderAutoplay(!sliderAutoplay)}
                className="p-1 text-white/80 hover:text-white transition-colors cursor-pointer focus:outline-none"
                title={sliderAutoplay ? "일시정지" : "자동재생"}
              >
                {sliderAutoplay ? (
                  <Pause className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-white fill-current" />
                )}
              </button>
              
              <div className="w-px h-3.5 bg-white/20" />
              
              <div className="flex items-center gap-1.5">
                {primarySlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeSlide === idx 
                        ? "w-4.5 bg-orange-500" 
                        : "w-2 bg-white/45 hover:bg-white/75"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main visual portal body container: Flexible layout depending on Screen width or column needs */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 md:py-12">
        <div style={{ fontSize: `${16 * fontRatio}px` }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start flex-wrap">
          
          {/* Main Content Area (Spans full width on mobile/tablet, 2 columns on desktop) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-8 flex-wrap">
            
            {/* Active View Dispatcher */}
            {view === "home" && (
              <DashboardHome 
                fontRatio={fontRatio} 
                highContrast={highContrast} 
                setView={handleSetView} 
              />
            )}

            {view === "about" && (
              <div className="space-y-12 animate-fade-in">
                {subView === "organization" ? (
                  <Organization fontRatio={fontRatio} highContrast={highContrast} />
                ) : subView === "timeline" ? (
                  <History fontRatio={fontRatio} highContrast={highContrast} />
                ) : subView === "directions" ? (
                  <Directions fontRatio={fontRatio} highContrast={highContrast} />
                ) : (
                  <Greetings fontRatio={fontRatio} highContrast={highContrast} />
                )}
              </div>
            )}

            {view === "impact" && (
              <ImpactPillars 
                fontRatio={fontRatio} 
                highContrast={highContrast} 
                setView={handleSetView} 
                activeSubSection={subView}
              />
            )}

            {view === "news" && (
              subView === "library" ? (
                <AcademicLibrary fontRatio={fontRatio} highContrast={highContrast} />
              ) : subView === "feed" ? (
                <SiteGallery fontRatio={fontRatio} highContrast={highContrast} />
              ) : (
                <CommunityBoard 
                  fontRatio={fontRatio} 
                  highContrast={highContrast} 
                  activeSubSection={subView} 
                />
              )
            )}

            {view === "support" && (
              subView === "fund" ? (
                <DigitalFundraising fontRatio={fontRatio} highContrast={highContrast} />
              ) : subView === "volunteer" ? (
                <CounselingShelter fontRatio={fontRatio} highContrast={highContrast} />
              ) : (
                <CommunityBoard 
                  fontRatio={fontRatio} 
                  highContrast={highContrast} 
                  activeSubSection="qna" 
                />
              )
            )}

            {view === "drive" && (
              <GoogleDriveManager 
                highContrast={highContrast} 
                activeSubSection={subView} 
              />
            )}

          </div>

          {/* Sidebar Area: Forms 3rd column on desktop. Includes visually stunning image cards */}
          <aside className="col-span-1 md:col-span-2 lg:col-span-1 space-y-6 flex-wrap">
            <div className={`p-6 rounded-3xl border transition-all ${
              highContrast 
                ? "bg-black border-yellow-400 text-yellow-300" 
                : "bg-radial-[at_50%_0%] from-slate-50 to-white/70 backdrop-blur-md border-slate-100 shadow-sm"
            }`}>
              {/* Header */}
              <div className="flex items-center gap-2 border-b border-dashed border-slate-100 pb-4 mb-5">
                <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 leading-tight">우리원 공익 스냅샷</h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">실천하는 손끝의 이야기</p>
                </div>
              </div>

              {/* Stack of Companion Cards: Responsive 1-3 col layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6 flex-wrap">
                {currentSidebarCards.map((card, idx) => (
                  <div 
                    key={idx}
                    className="group relative rounded-2xl overflow-hidden border border-slate-100/80 bg-white shadow-2xs hover:shadow-[0_20px_40px_rgba(0,0,0,0.07)] hover:border-slate-200/90 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                  >
                    {/* Card Image Area */}
                    <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden">
                      <img 
                        src={card.imageUrl} 
                        alt={card.title} 
                        className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      {/* Floating Badge Tag */}
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-slate-900/90 text-white font-extrabold text-[9px] tracking-wider rounded-md uppercase">
                        {card.badge}
                      </span>
                    </div>

                    {/* Card Text Content */}
                    <div className="p-4">
                      <h4 className="font-black text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-semibold">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Micro call out info badge */}
              <div className="mt-6 pt-5 border-t border-slate-100/50 text-center">
                <span className="text-[10px] bg-blue-50 text-blue-800 font-black px-3 py-1 rounded-full uppercase tracking-tight">
                  🤝 100% 투명한 공정 수수료
                </span>
                <p className="text-[9px] text-slate-400 font-bold mt-2 leading-normal">
                  비영리민간단체 우리원은 가치 실효에 최선을 다해 정직하게 공여를 행수합니다.
                </p>
              </div>

            </div>
          </aside>

        </div>
      </main>



      {/* Clean Structured Footer */}
      <footer className={`border-t py-12 px-4 transition-all ${
        highContrast 
          ? "bg-black border-yellow-500 text-yellow-400" 
          : "bg-slate-900 border-transparent text-slate-400"
      }`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo brand */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2 text-left">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-sm">
                N.S
              </div>
              <div>
                <p className={`font-black text-base leading-none ${highContrast ? "text-yellow-300" : "text-white"}`}>
                  비영리민간단체 우리원
                </p>
                <p className="text-[10px] tracking-widest mt-0.5">N·S WOORI_ONE UNION</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-sm opacity-80">
              탈북민의 권익 신장, 고령자 1:1 동료 치유 멘토링, MBJK 메아리 예술단 가동 및 
              사단법인 탈북민공익활동지원연합을 가동하는 충남 아산 거점 연합체입니다.
            </p>
          </div>

          {/* Registration Details columns */}
          <div className="md:col-span-5 space-y-2 text-xs">
            <h4 className={`font-extrabold text-sm ${highContrast ? "text-yellow-300" : "text-slate-250"}`}>
              기관 인가 공직 신고 사항
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 leading-relaxed font-semibold opacity-90">
              <p>충청남도 비영리 등록: 제1540호</p>
              <p>기부금 공익 대상 지정: 행안부 등기</p>
              <p>주무 관청 인가: 통일부 소관사단</p>
              <p>대표권 소유: 채신아 이사장</p>
              <p>상임 행정 총괄: 이은택 사무총장</p>
              <p>내외 전무 감사: 실무위원회</p>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-3 space-y-3 text-xs text-left">
            <h4 className={`font-extrabold text-sm ${highContrast ? "text-yellow-300" : "text-slate-250"}`}>
              상설 사무처 연락수단
            </h4>
            <div className="space-y-1 font-semibold">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>충청남도 아산시 충무로 & 아산로</span>
              </p>
              <p className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-orange-500" />
                <span>041-543-9060 (치유상담실 번호)</span>
              </p>
              <p>후원 전용: 농협 301-0251-8906-41 우리원</p>
            </div>
          </div>

        </div>

        {/* copyright and credentials */}
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-10 pt-6 text-center text-xs opacity-70">
          <p className="font-semibold">
            Copyright © 2026 비영리민간단체 우리원 & 사단법인 탈북민공익활동지원연합. All Rights Reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
