import React, { useState } from "react";
import { MapPin, Phone, MessageSquare, Clipboard, Compass, Train, Bus, Info } from "lucide-react";

interface DirectionsProps {
  fontRatio: number;
  highContrast: boolean;
}

export default function Directions({ fontRatio, highContrast }: DirectionsProps) {
  const [copied, setCopied] = useState(false);
  const address = "충청남도 아산시 아산로 105, 2층 (온천동, 우리원 통일마중쉼터)";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ fontSize: `${16 * fontRatio}px` }} className="space-y-10 animate-fade-in">
      
      {/* Visual Header */}
      <div className="space-y-3 text-left">
        <span className={`text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest ${
          highContrast ? "bg-black border border-yellow-400 text-yellow-300" : "bg-blue-50 text-blue-700"
        }`}>
          ★ 우리원 소개
        </span>
        <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${highContrast ? "text-yellow-300" : "text-slate-900"}`}>
          찾아오시는 길 (Directions)
        </h1>
        <p className={`text-sm ${highContrast ? "text-yellow-400/90" : "text-slate-500 font-semibold"}`}>
          사단법인 탈북민공익활동지원연합의 충남 지부이자 우리원이 운영하는 온정의 대면 안식처로 안내해 드립니다.
        </p>
      </div>

      {/* Main Container Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Mock Map view with fully responsive and detailed look */}
        <div className="lg:col-span-7 space-y-4">
          <div className={`relative aspect-[16/10] sm:aspect-[16/11] rounded-3xl overflow-hidden border flex flex-col justify-between p-6 ${
            highContrast 
              ? "bg-black border-yellow-400 text-yellow-300" 
              : "bg-radial-[at_50%_0%] from-blue-50/20 to-white/80 border-slate-100 shadow-sm"
          }`}>
            
            {/* Map Vector Lines representing roads (Stylistic vector map mock) */}
            <div className="absolute inset-0 opacity-15 overflow-hidden pointer-events-none">
              {/* Horizontal road */}
              <div className="absolute top-1/4 left-0 right-0 h-10 bg-slate-400 rotate-2" />
              {/* Vertical road */}
              <div className="absolute top-0 bottom-0 left-1/3 w-12 bg-slate-400 -rotate-12" />
              {/* Intersection circle */}
              <div className="absolute top-1/4 left-1/3 w-28 h-28 rounded-full border-12 border-slate-400 -translate-x-[40px] -translate-y-[40px]" />
              {/* Other streets */}
              <div className="absolute top-2/3 left-0 right-0 h-6 bg-slate-350 -rotate-3" />
            </div>

            {/* Top Row: Map brand and tag */}
            <div className="z-10 flex items-center justify-between">
              <span className="text-xxs font-black text-blue-600 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md border shadow-xs">
                📌 GPS 정밀 위치 검증
              </span>
              <span className="text-xxs font-mono text-slate-400">
                Lat: 36.79013, Lng: 127.00423
              </span>
            </div>

            {/* Centered Map Pointer Pin */}
            <div className="z-10 flex flex-col items-center justify-center space-y-2">
              <div className="relative">
                <div className="absolute -inset-2 bg-rose-500/30 rounded-full animate-ping" />
                <div className="w-14 h-14 bg-gradient-to-tr from-rose-500 to-orange-500 rounded-full flex items-center justify-center text-white shadow-xl">
                  <MapPin className="w-8 h-8 fill-current text-white" />
                </div>
              </div>
              <div className="bg-white/95 border border-slate-100/90 p-3 rounded-2xl shadow-xl text-center backdrop-blur-xs max-w-xs">
                <h4 className="text-xs font-black text-slate-900 leading-tight">비영리민간단체 우리원 쉼터</h4>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5 leading-snug">
                  충남 아산시 아산로 105, 2층
                </p>
              </div>
            </div>

            {/* Bottom Row Guide Info */}
            <div className="z-10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xxs bg-slate-900/90 text-white rounded-lg px-3 py-1.5 font-bold shadow-sm">
                <Compass className="w-3.5 h-3.5 text-orange-400" />
                <span>충청남도 아산 시청 인근 도보 3분</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                Scale: 1 : 1,200
              </span>
            </div>
            
          </div>

          {/* Quick Copy Action Bar */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            highContrast ? "bg-black border-yellow-400" : "bg-slate-50 border-slate-100"
          }`}>
            <div className="flex items-start gap-2 text-left">
              <Compass className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-650 font-bold leading-normal">
                {address}
              </p>
            </div>
            <button
              id="copy-address-btn"
              onClick={handleCopy}
              className={`flex items-center justify-center gap-1.5 text-xs font-black px-4 py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer whitespace-nowrap shadow-sm hover:shadow-md ${
                copied 
                  ? "bg-emerald-600 text-white"
                  : highContrast 
                    ? "bg-yellow-300 text-black border-2 border-yellow-300 hover:bg-yellow-400" 
                    : "bg-white text-slate-800 hover:bg-slate-100 border border-slate-150/80"
              }`}
            >
              <Clipboard className="w-4 h-4" />
              <span>{copied ? "주소 복사완료!" : "주소 텍스트 복사"}</span>
            </button>
          </div>
        </div>

        {/* Right Side: Step-by-step Transit instructions and contacts */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`p-6 rounded-3xl border space-y-6 ${
            highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-white border-slate-100 shadow-xs"
          }`}>
            <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" />
              <span>대중교통 오시는 방법</span>
            </h3>

            {/* Subway instructions */}
            <div className="flex gap-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                <Train className="w-5 h-5 text-orange-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-800">지하철 / 전철 이용 시</h4>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  <span className="text-blue-600 font-black">수도권 전철 1호선 온양온천역</span> 하차 후, <br />
                  <span className="font-black text-slate-700">2번 출구</span>방향으로 나와 아산시청 삼거리 방향으로 <span className="font-bold text-slate-700">도보 8분</span> 거리.
                </p>
              </div>
            </div>

            {/* Bus instructions */}
            <div className="flex gap-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <Bus className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-800">지선 / 간선 버스 이용 시</h4>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  <span className="text-indigo-600 font-black">아산 시청 정문 정류장</span> 앞 하차 하신 후, <br />
                  도부 3블록 아산로 길따라 대로변으로 나와 우회전 후 온천 수공방 건물 2층으로 진입.
                </p>
              </div>
            </div>

            {/* Parking instructions */}
            <div className="flex gap-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-800">승용차 자가운전 및 주차</h4>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  네비게이션 '우리원 통일마중쉼터' 또는 '아산시 아산로 105' 검색. 건물 후면에 입주 단체 공용 <span className="text-emerald-600 font-black">무료 전용 주차장</span> 완비되어 상시 주차 가능합니다.
                </p>
              </div>
            </div>

          </div>

          {/* Quick Contact Desk */}
          <div className={`p-6 rounded-3xl border text-left space-y-4 ${
            highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-radial-[at_50%_0%] from-blue-50/10 to-indigo-50/10 border-slate-100"
          }`}>
            <h3 className="font-black text-sm text-slate-850 tracking-wide flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>상설 내방 문의 & 심리상담 예약</span>
            </h3>
            
            <div className="space-y-2.5 text-xs text-slate-600 font-semibold leading-relaxed">
              <p className="flex items-center gap-2">
                <span className="w-16 text-slate-400">대표 전화</span>
                <span className="font-extrabold text-slate-800">041-544-2020</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-16 text-slate-400">위기 긴급전화</span>
                <span className="font-extrabold text-slate-800 text-rose-600 font-mono">010-8330-8041</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-16 text-slate-400">운영 영업시간</span>
                <span className="text-slate-800">평일 오전 09:00 - 오후 18:00 (토/일요일 쉼터 자원봉사 개별 상설개방)</span>
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
