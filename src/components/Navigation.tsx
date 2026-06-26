import React, { useState, useEffect } from "react";
import { 
  Heart, 
  Accessibility, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown, 
  Eye, 
  Zap, 
  PhoneCall
} from "lucide-react";

interface NavigationProps {
  currentView: string;
  currentSubView: string;
  setView: (view: string, subView?: string) => void;
  fontRatio: number;
  setFontRatio: (ratio: number) => void;
  highContrast: boolean;
  setHighContrast: (active: boolean) => void;
}

export default function Navigation({
  currentView,
  currentSubView,
  setView,
  fontRatio,
  setFontRatio,
  highContrast,
  setHighContrast,
}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [branding, setBranding] = useState({
    orgName: "우 리 원",
    slogan: "N·S WOORI_ONE CO-EXISTENCE",
    logoUrl: "input_file_0.png"
  });

  useEffect(() => {
    async function loadBranding() {
      try {
        const response = await fetch("/api/branding");
        if (response.ok) {
          const data = await response.json();
          setBranding(data);
        }
      } catch (err) {
        console.error("Error loading branding in Navigation:", err);
      }
    }
    loadBranding();
  }, []);

  // GNB Structure
  const menuItems = [
    {
      id: "about",
      label: "우리원 소개",
      items: [
        { name: "대표 인사말", subId: "message" },
        { name: "조직도 및 체계", subId: "organization" },
        { name: "조직 연혁", subId: "timeline" },
        { name: "찾아오시는 길", subId: "directions" },
      ],
    },
    {
      id: "impact",
      label: "주요 사업",
      items: [
        { name: "정착과 치유 지원", subId: "heal" },
        { name: "사회적 연대와 공헌", subId: "contribution" },
        { name: "문화 및 통일 예술", subId: "art" },
      ],
    },
    {
      id: "news",
      label: "소식 및 자료실",
      items: [
        { name: "기관 공지사항", subId: "notice" },
        { name: "현장 활동 스케치", subId: "feed" },
        { name: "평화통일 학술자료실", subId: "library" },
      ],
    },
    {
      id: "support",
      label: "후원 및 참여",
      items: [
        { name: "디지털 기부 참여", subId: "fund" },
        { name: "자원봉사 신청", subId: "volunteer" },
        { name: "자유게시판 (Q&A)", subId: "qna" },
      ],
    },
  ];

  const handleMenuClick = (menuId: string, subId?: string) => {
    setView(menuId, subId);
    setMobileOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-500 ease-in-out ${
      highContrast 
        ? "bg-black border-yellow-400 text-yellow-300 shadow-none" 
        : "bg-white/60 backdrop-blur-2xl border-white/80 text-zinc-800 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
    }`}>
      {/* Main GNB Bar */}
      <div className="max-w-7xl mx-auto px-4 h-22 flex items-center justify-between">
        {/* LOGO */}
        <button 
          id="logo-brand-btn"
          onClick={() => handleMenuClick("home")} 
          className="flex items-center gap-4 group text-left focus:outline-none"
        >
          <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden p-1">
            <img 
              src={branding.logoUrl} 
              alt="우리원 로고" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 leading-none">
              <span className={`text-lg font-bold tracking-tight ${highContrast ? "text-yellow-300" : "text-zinc-900 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"}`}>
                {branding.orgName}
              </span>
              <span className="text-[10px] bg-zinc-800 text-white px-2 py-0.5 rounded-full font-bold tracking-wider shadow-lg shadow-zinc-200/50 select-none">
                충남거점
              </span>
            </div>
            <p className={`text-[9px] tracking-[0.2em] mt-1 font-bold uppercase ${highContrast ? "text-yellow-400/90" : "text-slate-400"}`}>
              {branding.slogan}
            </p>
          </div>
        </button>

        {/* Desktop Menus */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
          {menuItems.map((menu) => (
            <div 
              id={`nav-item-${menu.id}`}
              key={menu.id} 
              className="relative"
              onMouseEnter={() => setHoveredMenu(menu.id)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <button 
                id={`nav-main-btn-${menu.id}`}
                onClick={() => handleMenuClick(menu.id)}
                className={`px-4 py-2.5 rounded-xl flex items-center gap-1 font-bold tracking-tight text-sm xl:text-base transition-all focus:outline-none select-none relative group ${
                  currentView === menu.id
                    ? (highContrast ? "text-yellow-300 border-b-2 border-yellow-300" : "text-zinc-800 bg-zinc-100/40")
                    : (highContrast ? "text-yellow-400/80 hover:text-yellow-300" : "text-slate-700 hover:text-zinc-800 hover:bg-slate-50/50")
                }`}
              >
                <span>{menu.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-300 ${hoveredMenu === menu.id ? "rotate-180 text-zinc-800" : ""}`} />
                {currentView === menu.id && !highContrast && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-zinc-800 rounded-full" />
                )}
              </button>

              {/* Advanced Dropdown */}
              {hoveredMenu === menu.id && (
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-64 rounded-[1.5rem] border p-2.5 shadow-2xl animate-fade-in z-50 transition-all duration-300 ${
                  highContrast 
                    ? "bg-black border-yellow-500 text-yellow-300" 
                    : "bg-white border-white/50 text-zinc-800 shadow-lg shadow-zinc-200/50"
                }`}>
                  {menu.items.map((sub, sIdx) => {
                    const isSelected = activeSubView(currentView, menu.id, sub.subId, currentSubView);
                    return (
                      <button
                        id={`nav-sub-btn-${menu.id}-${sub.subId}`}
                        key={sIdx}
                        onClick={() => handleMenuClick(menu.id, sub.subId)}
                        className={`w-full text-left px-5 py-3.5 rounded-2xl text-xs xl:text-sm font-semibold tracking-tight transition-all duration-300 focus:outline-none ${
                          isSelected
                            ? (highContrast ? "bg-yellow-400 text-black font-bold" : "bg-indigo-50/80 text-indigo-700 font-bold")
                            : (highContrast ? "hover:bg-neutral-900 text-yellow-400" : "hover:bg-slate-50/80 text-zinc-500 hover:text-zinc-900")
                        }`}
                      >
                        {sub.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Call to donation shortcut on GNB */}
        <div className="hidden lg:flex items-center gap-3">
          <button 
            id="gnb-donate-shortcut-btn"
            onClick={() => handleMenuClick("support", "fund")}
            className={`px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-md focus:outline-none hover:shadow-lg hover:scale-[1.02] active:scale-95 ${
              highContrast 
                ? "bg-yellow-300 text-black border-2 border-yellow-300 hover:bg-yellow-400" 
                : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
            }`}
          >
            <Heart className="w-4 h-4 text-white fill-current animate-pulse" />
            <span>디지털 후원안내</span>
          </button>
        </div>

        {/* Mobile controls & Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            id="hamburger-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2.5 rounded-lg border transition-colors focus:outline-none ${
              highContrast 
                ? "border-yellow-400 text-yellow-300 bg-neutral-900" 
                : "border-zinc-200 text-slate-700 bg-slate-50"
            }`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Tactile Mobile Overlaid Navigation */}
      {mobileOpen && (
        <div className={`fixed inset-y-0 right-0 left-0 top-20 z-40 p-6 flex flex-col justify-between overflow-y-auto ${
          highContrast ? "bg-black text-yellow-300" : "bg-white text-zinc-900"
        }`}>
          <div className="space-y-6">
            {menuItems.map((menu) => (
              <div id={`mobile-menu-sec-${menu.id}`} key={menu.id} className="border-b pb-4 border-zinc-200">
                <p 
                  className={`text-sm font-bold tracking-wider uppercase mb-2 ${
                    highContrast ? "text-yellow-400" : "text-slate-400"
                  }`}
                >
                  {menu.label}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {menu.items.map((sub, sIdx) => (
                    <button
                      id={`mobile-sub-btn-${menu.id}-${sub.subId}`}
                      key={sIdx}
                      onClick={() => handleMenuClick(menu.id, sub.subId)}
                      className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                        currentView === menu.id
                          ? "bg-slate-100 dark:bg-neutral-800 text-slate-950"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 space-y-3">
            <button 
              id="mobile-nav-donate-btn"
              onClick={() => handleMenuClick("support", "fund")}
              className="w-full py-4 rounded-xl bg-orange-500 text-white font-bold text-lg shadow-md flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-current" />
              <span>디지털 후원하기 바로가기</span>
            </button>
            <div className="flex justify-center gap-3 text-xs opacity-70 font-semibold p-2">
              <span>후원 계좌: 농협 301-0251-8906-41 (예금주: 우리원)</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Helper to determine if sub-view is active
function activeSubView(currentView: string, menuId: string, subId: string, currentSubView: string): boolean {
  if (currentView !== menuId) return false;
  const activeSub = currentSubView || (menuId === "news" ? "notice" : menuId === "support" ? "fund" : "");
  return activeSub === subId;
}
