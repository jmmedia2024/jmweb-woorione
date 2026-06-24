import React, { useState } from "react";
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
    {
      id: "drive",
      label: "구글 드라이브 자료실",
      items: [
        { name: "드라이브 통합 탐색", subId: "explorer" },
        { name: "최근 업로드 자료", subId: "recent" },
        { name: "팬덤 자료 백업소", subId: "backup" },
        { name: "드라이브 연동 설정", subId: "settings" },
      ],
    },
  ];

  const handleMenuClick = (menuId: string, subId?: string) => {
    setView(menuId, subId);
    setMobileOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${
      highContrast 
        ? "bg-black border-yellow-400 text-yellow-300 shadow-none" 
        : "bg-white/80 backdrop-blur-xl border-slate-100/75 text-slate-800 shadow-[0_4px_30px_rgba(0,0,0,0.015)]"
    }`}>
      {/* Main GNB Bar */}
      <div className="max-w-7xl mx-auto px-4 h-22 flex items-center justify-between">
        {/* LOGO */}
        <button 
          id="logo-brand-btn"
          onClick={() => handleMenuClick("home")} 
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-[0_4px_12px_rgba(37,99,235,0.2)] group-hover:scale-105 transition-transform duration-300">
            N.S
          </div>
          <div>
            <div className="flex items-center gap-2 leading-none">
              <span className={`text-2xl font-black tracking-tight ${highContrast ? "text-yellow-300" : "text-slate-900 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"}`}>
                우 리 원
              </span>
              <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-extrabold tracking-wider shadow-sm select-none">
                충남거점
              </span>
            </div>
            <p className={`text-[9px] tracking-widest mt-1 font-extrabold ${highContrast ? "text-yellow-400/90" : "text-slate-400"}`}>
              N·S WOORI_ONE CO-EXISTENCE
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
                className={`px-4 py-2.5 rounded-xl flex items-center gap-1 font-extrabold tracking-tight text-sm xl:text-base transition-all focus:outline-none select-none relative group ${
                  currentView === menu.id
                    ? (highContrast ? "text-yellow-300 border-b-2 border-yellow-300" : "text-blue-600 bg-blue-50/40")
                    : (highContrast ? "text-yellow-400/80 hover:text-yellow-300" : "text-slate-700 hover:text-blue-600 hover:bg-slate-50/50")
                }`}
              >
                <span>{menu.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-300 ${hoveredMenu === menu.id ? "rotate-180 text-blue-600" : ""}`} />
                {currentView === menu.id && !highContrast && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>

              {/* Advanced Dropdown */}
              {hoveredMenu === menu.id && (
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-60 rounded-2xl border p-2 shadow-2xl animate-fade-in z-50 ${
                  highContrast 
                    ? "bg-black border-yellow-500 text-yellow-300" 
                    : "bg-white/95 backdrop-blur-xl border-slate-100 text-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                }`}>
                  {menu.items.map((sub, sIdx) => {
                    const isSelected = activeSubView(currentView, menu.id, sub.subId, currentSubView);
                    return (
                      <button
                        id={`nav-sub-btn-${menu.id}-${sub.subId}`}
                        key={sIdx}
                        onClick={() => handleMenuClick(menu.id, sub.subId)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-xs xl:text-sm font-extrabold transition-all duration-200 focus:outline-none ${
                          isSelected
                            ? (highContrast ? "bg-yellow-400 text-black font-extrabold" : "bg-gradient-to-r from-blue-50 to-indigo-50/50 text-blue-700 font-black")
                            : (highContrast ? "hover:bg-neutral-900 text-yellow-400" : "hover:bg-slate-50/70 text-slate-600 hover:text-slate-900")
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
            className={`px-5 py-2.5 rounded-full font-black text-sm flex items-center gap-2 transition-all shadow-md focus:outline-none hover:shadow-lg hover:scale-[1.02] active:scale-95 ${
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
                : "border-slate-200 text-slate-700 bg-slate-50"
            }`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Tactile Mobile Overlaid Navigation */}
      {mobileOpen && (
        <div className={`fixed inset-y-0 right-0 left-0 top-20 z-40 p-6 flex flex-col justify-between overflow-y-auto ${
          highContrast ? "bg-black text-yellow-300" : "bg-white text-slate-900"
        }`}>
          <div className="space-y-6">
            {menuItems.map((menu) => (
              <div id={`mobile-menu-sec-${menu.id}`} key={menu.id} className="border-b pb-4 border-slate-200">
                <p 
                  className={`text-sm font-black tracking-wider uppercase mb-2 ${
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
                      className={`text-left px-4 py-3 rounded-xl text-sm font-extrabold transition-all ${
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
              className="w-full py-4 rounded-xl bg-orange-500 text-white font-extrabold text-lg shadow-md flex items-center justify-center gap-2"
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
