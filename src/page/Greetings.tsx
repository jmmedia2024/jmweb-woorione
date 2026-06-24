import React from "react";
import { UserCheck, Sparkles, Award } from "lucide-react";
import { LEADERSHIP_MESSAGE } from "../data";

interface GreetingsProps {
  fontRatio: number;
  highContrast: boolean;
}

export default function Greetings({ fontRatio, highContrast }: GreetingsProps) {
  return (
    <div style={{ fontSize: `${16 * fontRatio}px` }} className="space-y-10 animate-fade-in">
      
      {/* Visual Title Header */}
      <div className="space-y-3 text-left">
        <span className={`text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest ${
          highContrast ? "bg-black border border-yellow-400 text-yellow-300" : "bg-blue-50 text-blue-700"
        }`}>
          ★ 우리원 소개
        </span>
        <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${highContrast ? "text-yellow-300" : "text-slate-900"}`}>
          대표 인사말 (Greetings)
        </h1>
        <p className={`text-sm ${highContrast ? "text-yellow-400/90" : "text-slate-500 font-semibold"}`}>
          고통 속에서 수혜자가 아닌 지역사회의 당당한 기여자로 거듭나는 우리원의 대표 메시지를 전해드립니다.
        </p>
      </div>

      {/* Main glass card for Greetings */}
      <div className={`p-8 md:p-12 rounded-3xl border transition-all ${
        highContrast 
          ? "bg-black border-yellow-400 text-yellow-300" 
          : "bg-white border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)]"
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Representative profile region */}
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-5">
            <div className="w-52 h-52 rounded-2xl bg-slate-50 overflow-hidden border border-slate-200/80 shadow relative group">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" 
                alt="Chae Shin-Ah Representative"
                className="w-full h-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-blue-900/80 text-white text-xs py-2 font-black tracking-wider">
                생명 정착 코칭 전문 지도관
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">{LEADERSHIP_MESSAGE.representative}</h3>
              <p className="text-xs text-slate-550 font-bold mt-1 max-w-xs">{LEADERSHIP_MESSAGE.title}</p>
            </div>
            
            {/* Career details list */}
            <div className={`w-full p-5 rounded-2xl border text-left text-xs space-y-3 ${
              highContrast 
                ? "bg-neutral-900 border-yellow-400 text-yellow-300" 
                : "bg-radial-[at_50%_0%] from-slate-50 to-white border-slate-100"
            }`}>
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span className="font-extrabold text-sm">채신아 대표 약력</span>
              </p>
              <ul className="space-y-2 text-slate-550 list-disc pl-4 font-semibold leading-relaxed">
                <li>통일부장관 단체 표창 대표 수임 (2023)</li>
                <li>대통령 초청 행사 탈북민 협의회 참석 (2024)</li>
                <li>가정폭력 및 성폭력 전문 심리강사 역임</li>
                <li>사단법인 탈북민공익활동지원연합 이사장</li>
                <li>민주평화통일자문회의 자문위원</li>
                <li>충청남도 보조공익교육 협력대표 유치</li>
              </ul>
            </div>
          </div>

          {/* Detailed Message Text region */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
              <span className="text-xs font-black tracking-widest text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-md">
                GREETING MESSAGE
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-snug">
              “다름이 기여자의 이름으로<br className="hidden sm:block" /> 하나가 되는 찬란한 내일까지”
            </h2>
            
            <div className={`whitespace-pre-wrap text-slate-650 leading-loose text-base font-medium border-l-3 border-blue-500 pl-5 md:pl-7 space-y-4 ${
              highContrast ? "border-yellow-400" : ""
            }`}>
              {LEADERSHIP_MESSAGE.text}
            </div>

            {/* Official Signature */}
            <div className="pt-8 border-t border-slate-100 flex flex-col items-end text-right space-y-1">
              <p className="text-slate-400 text-xs font-bold tracking-wider">사단법인 탈북민공익활동지원연합 산하</p>
              <p className="text-slate-900 font-extrabold text-lg">
                비영리민간단체 우리원 대표 <span className="font-black text-2xl text-blue-600 ml-1.5">채 신 아</span> <span className="text-slate-400 text-xs">(직인생략)</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
