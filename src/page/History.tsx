import React, { useState, useRef, useEffect } from "react";
import { Award, Heart, Globe, Users, Calendar, Sparkles, ChevronDown, ChevronUp, Clock, Grid, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MILESTONES } from "../data";
import { Milestone } from "../types";

interface HistoryProps {
  fontRatio: number;
  highContrast: boolean;
}

export default function History({ fontRatio, highContrast }: HistoryProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [expandedMilestones, setExpandedMilestones] = useState<Record<number, boolean>>({});
  const milestoneRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Sort milestones chronologically
  const sortedMilestones = [...MILESTONES].sort((a, b) => {
    return sortOrder === "asc" ? a.year - b.year : b.year - a.year;
  });

  const years = Array.from(new Set(MILESTONES.map(m => m.year))).sort((a, b) => {
    return sortOrder === "asc" ? a - b : b - a;
  });

  const toggleExpand = (index: number) => {
    setExpandedMilestones(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleScrollToYear = (year: number) => {
    // Find the first milestone of that year
    const index = sortedMilestones.findIndex(m => m.year === year);
    if (index !== -1) {
      const element = milestoneRefs.current[index];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "people":
        return <Users className="w-5 h-5 text-blue-600 font-extrabold" />;
      case "heart":
        return <Heart className="w-5 h-5 text-rose-500 animate-pulse font-extrabold" />;
      case "globe":
        return <Globe className="w-5 h-5 text-indigo-500 font-extrabold" />;
      case "award":
        return <Award className="w-5 h-5 text-orange-500 font-extrabold" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-500 font-extrabold" />;
    }
  };

  return (
    <div style={{ fontSize: `${16 * fontRatio}px` }} className="space-y-12 animate-fade-in pb-16">
      
      {/* Header Profile Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6 text-left">
        <div className="space-y-3">
          <span className={`inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest ${
            highContrast ? "bg-black border border-yellow-400 text-yellow-300" : "bg-blue-50 text-blue-700"
          }`}>
            ★ 우리원 발자취
          </span>
          <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${highContrast ? "text-yellow-300" : "text-slate-900"}`}>
            조직 연혁 상생 타임라인
          </h1>
          <p className={`text-sm ${highContrast ? "text-yellow-400/90" : "text-slate-500 font-semibold"}`}>
            이웃을 돕는 풀뿌리 자원봉사회에서 시작해 서울 및 충남 전역의 한마음 공익 연합 체계 도약에 이르기까지 정착의 역사입니다.
          </p>
        </div>

        {/* Timeline sorting and control options */}
        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
          <button
            id="btn-timeline-toggle-sort"
            onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
            className={`px-4.5 py-2.5 rounded-xl border font-black text-xs flex items-center gap-2 transition-all cursor-pointer ${
              highContrast 
                ? "bg-black text-yellow-300 border-yellow-400 hover:bg-neutral-900" 
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-3xs"
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-blue-500" />
            <span>{sortOrder === "asc" ? "과거순 (2013-2024)" : "최신순 (2024-2013)"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Sticky Year Navigator - Helps users click and teleport to correct milestone cards */}
        <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-4">
          <div className={`p-5 rounded-2xl border transition-all ${
            highContrast 
              ? "bg-black border-yellow-400 text-yellow-300" 
              : "bg-white border-slate-100 shadow-[0_12px_36px_rgba(30,41,59,0.02)]"
          }`}>
            <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              연도별 빠른 이동
            </h3>
            <div className="flex flex-row lg:flex-col flex-wrap gap-1.5 max-h-[160px] lg:max-h-[380px] overflow-y-auto pr-1">
              {years.map((year) => (
                <button
                  id={`timeline-jump-btn-${year}`}
                  key={year}
                  onClick={() => handleScrollToYear(year)}
                  className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-xs font-bold text-left transition-all duration-200 cursor-pointer w-auto lg:w-full flex items-center justify-between group ${
                    highContrast
                      ? "bg-black text-yellow-300 border border-yellow-500 hover:bg-neutral-900"
                      : "bg-slate-50 text-slate-650 hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1"
                  }`}
                >
                  <span>{year}년도 성과</span>
                  <span className="text-[10px] font-mono opacity-60 group-hover:opacity-100">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Scroll-Revealed Vertical Timeline Track */}
        <div className="lg:col-span-9 relative pl-6 md:pl-10">
          
          {/* Vertical Track central axis line with glow */}
          <div className={`absolute top-2 bottom-2 left-6 md:left-10 w-[3px] rounded-full -translate-x-[1.5px] ${
            highContrast ? "bg-yellow-400" : "bg-gradient-to-down from-blue-100 via-blue-200 to-indigo-100"
          }`} />

          {/* Map of milestones with framer-motion reveals on scroll */}
          <div className="space-y-10">
            {sortedMilestones.map((m: Milestone, idx: number) => {
              const isExpanded = expandedMilestones[idx] || false;
              
              return (
                <div
                  ref={(el) => (milestoneRefs.current[idx] = el)}
                  key={`${m.year}-${idx}`}
                  id={`milestone-timeline-item-${idx}`}
                  className="relative group text-left"
                >
                  
                  {/* Timeline Glowing Node Indicator */}
                  <div className="absolute left-[-24px] md:left-[-40px] top-[14px] -translate-x-[4.5px] z-20">
                    <motion.div 
                      viewport={{ once: true }}
                      initial={{ scale: 0.4, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className={`w-6 h-6 rounded-full border-4 flex items-center justify-center transition-all ${
                        highContrast
                          ? "bg-black border-yellow-400 text-yellow-300"
                          : "bg-white border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.3)] group-hover:scale-115 group-hover:border-indigo-605"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${highContrast ? "bg-yellow-300" : "bg-blue-600 animate-pulse"}`} />
                    </motion.div>
                  </div>

                  {/* Horizontal small branch pointer line */}
                  <div className={`absolute left-[-18px] md:left-[-30px] top-[24px] w-4.5 md:w-7.5 h-px border-t overflow-hidden ${
                    highContrast ? "border-yellow-400" : "border-slate-200"
                  }`} />

                  {/* Scroll Triggered Milestone Card with Reveal animations */}
                  <motion.div
                    viewport={{ once: true, margin: "-60px" }}
                    initial={{ opacity: 0, y: 35, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className={`rounded-2xl border p-6 transition-all duration-300 relative ${
                      highContrast 
                        ? "bg-black border-yellow-400 text-yellow-305" 
                        : "bg-white border-slate-100 hover:border-slate-200 shadow-[0_4px_22px_rgba(0,0,0,0.015)] hover:shadow-[0_16px_36px_rgba(59,130,246,0.04)] hover:-translate-y-0.5"
                    }`}
                  >
                    
                    {/* Header: Date, badge, icon, and title */}
                    <div className="flex items-start gap-4 justify-between">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`font-mono font-black text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded ${
                            highContrast ? "bg-yellow-450 text-black font-extrabold" : "bg-blue-50 text-blue-600"
                          }`}>
                            {m.date}
                          </span>
                          <span className="text-slate-400 font-bold text-xs">{m.year}년 마일스톤</span>
                        </div>
                        
                        <h3 className={`font-black text-base md:text-lg tracking-tight leading-snug ${
                          highContrast ? "text-yellow-300" : "text-slate-900 hover:text-blue-700 transition-colors"
                        }`}>
                          {m.title}
                        </h3>
                      </div>

                      {/* Icon container */}
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-3xs ${
                        highContrast ? "bg-yellow-300 text-black" : "bg-slate-50 border border-slate-100"
                      }`}>
                        {renderIcon(m.iconType || "")}
                      </div>
                    </div>

                    {/* Standard text description */}
                    <p className={`mt-3 text-sm leading-relaxed font-semibold leading-relaxed ${
                      highContrast ? "text-white" : "text-slate-600"
                    }`}>
                      {m.description}
                    </p>

                    {/* Interactive "더 보기" expandable facts - reveals extra text context natively on scroll/click triggers */}
                    <div className="mt-4 pt-4 border-t border-slate-100/60 font-semibold text-xs">
                      <button
                        onClick={() => toggleExpand(idx)}
                        className={`flex items-center gap-1.5 hover:underline font-bold transition-all cursor-pointer ${
                          highContrast ? "text-yellow-300" : "text-blue-600 hover:text-blue-800"
                        }`}
                      >
                        <span>{isExpanded ? "상세 기록 닫기" : "공익 기여 분석 & 상세 내역 관람"}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className={`mt-3 p-4 rounded-xl text-left space-y-2.5 leading-relaxed leading-relaxed ${
                              highContrast ? "bg-neutral-900 text-yellow-250 border border-yellow-500" : "bg-slate-50/75 text-slate-550 border border-slate-100"
                            }`}>
                              <p className="font-extrabold text-[11px] text-blue-500">
                                💡 주요 사회적 가치 기여:
                              </p>
                              <p className="text-[11px] leading-relaxed">
                                {m.year === 2013 && "이웃 가구들의 자생적 결사체로 출발하여 풀뿌리 공동체를 활성화하고, 탈북 60세 고령층의 사회적 외로움을 상호 결속으로 치유해냈습니다."}
                                {m.year === 2014 && "한복 인형 등 전통 수공예를 기틀로 지역 축제 재능기부에 나섰으며, 수동적 한계에서 벗어나 지역 사랑방 통합 급식 인프라를 마련하였습니다."}
                                {m.year === 2019 && "법적으로 조직된 공익 궤도로 진입하기 위해 실무위원회를 호소 설립했고, 체계적인 복지 안전망 가동에 전격 합의했습니다."}
                                {m.year === 2020 && "충남 관내 제1540호 정식 비영리민간단체 도장 인가를 획득하며 지방 세입 정산을 준수하고 우수 단체 국회 표장 등을 가용하게 되었습니다."}
                                {m.year === 2022 && "행정안전부 지정 공익 기부 수령 처격으로 등극해, 투명하고 투명한 재무 연대 회계를 100% 가동하여 공공 신뢰를 획득하였습니다."}
                                {m.year === 2023 && "분절된 수도권과 충남의 지원망을 가로지르는 전국적 사단법인을 수립해, 이사장 채신아를 주축으로 연계 복지 서비스 사각지대를 대폭 해소했습니다."}
                                {m.year === 2024 && "제1회 탈북민의 날 국빈 자격 초청 및 위기 세대의 온정이 기거하는 단 임시 쉼터를 가용화해 무연고 청장년·노인 가구 정착에 대단한 기틀을 구축했습니다."}
                              </p>
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                <span className="bg-white px-2 py-0.5 rounded border border-slate-100 text-[10px] text-slate-500">
                                  #투명공익성
                                </span>
                                <span className="bg-white px-2 py-0.5 rounded border border-slate-100 text-[10px] text-slate-500">
                                  #탈북민사회통합
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* History Summary Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className={`p-6 rounded-2xl border text-left ${
          highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-white border-slate-150/70"
        }`}>
          <h4 className="font-extrabold text-xs text-blue-600 uppercase tracking-wider mb-1">STATION 1</h4>
          <h3 className="font-black text-base text-slate-800">풀뿌리 자원봉사회</h3>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed mt-2">
            2013년 충남 아산의 아파트 사랑방과 어르신 배식단 결성을 시초로 한 풀뿌리 사랑마중회가 영구적인 우리원의 정체성 모태입니다.
          </p>
        </div>

        <div className={`p-6 rounded-2xl border text-left ${
          highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-white border-slate-150/70"
        }`}>
          <h4 className="font-extrabold text-xs text-orange-500 uppercase tracking-wider mb-1">STATION 2</h4>
          <h3 className="font-black text-base text-slate-800">지정기부금 지정 단체</h3>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed mt-2">
            2020년 충남 제1540호 비영리민간단체로 등록 가결되고 기획재정부 지정 고시 지정 기부금 법인 수임을 거치며 투명 회계 시스템을 튼튼히 완비하였습니다.
          </p>
        </div>

        <div className={`p-6 rounded-2xl border text-left ${
          highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-white border-slate-150/70"
        }`}>
          <h4 className="font-extrabold text-xs text-emerald-500 uppercase tracking-wider mb-1">STATION 3</h4>
          <h3 className="font-black text-base text-slate-800">통일부 주관 사단법인</h3>
          <p className="text-slate-500 font-semibold text-xs leading-relaxed mt-2">
            2023년 통일부 주관 사단법인 '탈북민공익활동지원연합'을 설립하여 서울과 충남을 넘어 대한민국 전체 정착 복지를 대변하는 유기적 거점으로 자리잡았습니다.
          </p>
        </div>
      </section>

    </div>
  );
}
