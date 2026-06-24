import React from "react";
import { Users, Shield, Award, Heart, Sparkles, FolderSync, ShieldCheck } from "lucide-react";

interface OrgProps {
  fontRatio: number;
  highContrast: boolean;
}

export default function Organization({ fontRatio, highContrast }: OrgProps) {
  const departments = [
    {
      title: "정서치유상담소",
      subtitle: "Heart & Soul Healing",
      role: "멘토링 매칭 & 1:1 심리 상담 지원",
      description: "고향을 떠나온 탈북 선후배 매칭을 지원하며, 무연고 가구에 은빛 정서 상담 및 주거용 통일마중쉼터를 전액 무료로 보급하고 정서 자립을 돕습니다.",
      icon: <Heart className="w-5 h-5 text-blue-600" />,
      color: "border-blue-100 bg-blue-50/15"
    },
    {
      title: "통일 예술 문화 연합회",
      subtitle: "Co-existence Arts wing",
      role: "MBJK 메아리 예술단 & 통일품바 각설단",
      description: "탈북민 단원들의 무대 공연을 기획하여 육체적 외상 후 우울을 화합 가락으로 정화합니다. 아산 온천 지대 및 전국의 소외 가정을 위해 찾아가는 풍자극을 공연합니다.",
      icon: <Award className="w-5 h-5 text-orange-500" />,
      color: "border-orange-100 bg-orange-50/15"
    },
    {
      title: "자립협동공방 센터",
      subtitle: "Economic Cooperatives",
      role: "원가보장 시니어 부업 연계 공방",
      description: "어르신들이 손수 도예, 전통 한복인형 수수공예를 생산하여 시장에 공급합니다. 자존감 향상과 더불어 단기간 내 생산적 자립 수익 기틀을 스스로 엮어내도록 유도합니다.",
      icon: <Sparkles className="w-5 h-5 text-emerald-500" />,
      color: "border-emerald-100 bg-emerald-50/15"
    },
    {
      title: "기획재정행정실",
      subtitle: "Transparency & Finance",
      role: "투명 공시 아카이브 & CMS 운영",
      description: "행정안전부 및 기획재정부의 법정 세법 기준에 따라 1원 단위 기부금 검증 결과를 투명하게 공시합니다. 1365 자원봉사 포털 실적 인증과 모금 연계를 엄격히 관리합니다.",
      icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />,
      color: "border-indigo-100 bg-indigo-50/15"
    }
  ];

  return (
    <div style={{ fontSize: `${16 * fontRatio}px` }} className="space-y-10 animate-fade-in">
      
      {/* Page Title */}
      <div className="space-y-3 text-left">
        <span className={`text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest ${
          highContrast ? "bg-black border border-yellow-400 text-yellow-300" : "bg-blue-50 text-blue-700"
        }`}>
          ★ 우리원 소개
        </span>
        <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${highContrast ? "text-yellow-300" : "text-slate-900"}`}>
          조직도 및 경영 체계 (Organization)
        </h1>
        <p className={`text-sm ${highContrast ? "text-yellow-400/90" : "text-slate-500 font-semibold"}`}>
          사단법인 탈북민공익활동지원연합과의 연계를 통해 체계적이고 청렴하게 운영되는 우리원 조직 체계를 안내합니다.
        </p>
      </div>

      {/* Hierarchical Structure Diagram */}
      <div className={`p-8 md:p-12 rounded-3xl border transition-all ${
        highContrast 
          ? "bg-black border-yellow-400 text-yellow-300" 
          : "bg-white/80 border-slate-100/90 shadow-[0_20px_50px_rgba(37,99,235,0.015)] backdrop-blur-md"
      }`}>
        
        {/* Core Hierarchy Node Diagram */}
        <div className="flex flex-col items-center space-y-8 text-center max-w-3xl mx-auto">
          
          {/* Level 1: 총회 및 위원 연합 */}
          <div className="relative group w-full max-w-sm">
            <div className={`p-5 rounded-2xl border ${
              highContrast 
                ? "bg-black border-yellow-400" 
                : "bg-slate-900 text-white shadow-md"
            }`}>
              <Users className="w-5 h-5 mx-auto mb-2 text-blue-400 animate-pulse" />
              <h3 className="font-extrabold text-sm tracking-wide">의결총회 / 이사회</h3>
              <p className="text-[10px] text-slate-400 mt-1 font-bold">최고 의지결정 조직체</p>
            </div>
            {/* Downward connecting line */}
            <div className="w-0.5 h-8 bg-slate-300 dark:bg-neutral-800 mx-auto" />
          </div>

          {/* Level 2: 대표 (Chae Shin-ah) */}
          <div className="relative group w-full max-w-md">
            <div className={`p-6 rounded-2xl border-2 transition-transform duration-300 hover:scale-[1.02] ${
              highContrast 
                ? "bg-black border-yellow-400 text-yellow-300" 
                : "bg-gradient-to-tr from-blue-700 to-indigo-700 text-white shadow-xl shadow-blue-900/5 border-blue-600"
            }`}>
              <Award className="w-6 h-6 mx-auto mb-2.5 text-orange-400" />
              <p className="text-[10px] font-extrabold text-blue-200 tracking-wider uppercase">대표이사 이사장</p>
              <h2 className="font-black text-xl mt-0.5">채 신 아 대표</h2>
              <p className="text-xxs text-white/80 mt-1.5 font-semibold">비영리민간단체 우리원 수석 수임 / 사단법인 탈북민공익활동지원연합 회장</p>
            </div>
            
            {/* Advisory link to the side */}
            <div className="absolute top-1/2 -right-12 lg:-right-24 h-0.5 w-12 lg:w-24 bg-dashed bg-slate-300 hidden md:block" />
            <div className="absolute top-1/2 -right-12 lg:-right-24 translate-y-[-50%] p-3 rounded-xl border border-slate-200 bg-slate-50 text-xxs font-extrabold text-slate-600 text-left w-24 lg:w-36 hidden md:block">
              ⚖️ 감사 및 자문단<br />
              <span className="text-[9px] font-medium text-slate-400 mt-0.5 block">회계 복식부기 감사 처분 성실 위원회</span>
            </div>

            {/* Downward connecting line */}
            <div className="w-0.5 h-8 bg-slate-300 dark:bg-neutral-800 mx-auto" />
          </div>

          {/* Level 3: 사무총장 (Lee Eun-taek) */}
          <div className="relative group w-full max-w-sm">
            <div className={`p-5 rounded-2xl border ${
              highContrast 
                ? "bg-black border-yellow-400" 
                : "bg-sky-50 border-sky-100 text-sky-950 shadow-sm"
            }`}>
              <Shield className="w-5 h-5 mx-auto mb-2 text-blue-600" />
              <p className="text-[10px] font-black tracking-widest text-blue-600">실무 총괄 행정처</p>
              <h3 className="font-black text-base mt-0.5">이 은 택 사무총장</h3>
              <p className="text-xxs text-slate-500 font-bold mt-1">우리원 사업 기획, 법인 예산 결산 및 투명 감사 실무 총 지휘</p>
            </div>
            
            {/* Triple downward connecting line using absolute heights or simple border block */}
            <div className="w-0.5 h-8 bg-slate-300 dark:bg-neutral-800 mx-auto" />
          </div>

        </div>

        {/* Level 4: Grid of departments representing the horizontal span */}
        <div className="mt-8 border-t border-dashed border-slate-200 pt-10">
          <div className="text-center mb-8">
            <span className="text-xxs font-black text-slate-400 tracking-widest uppercase">Secretariat Operational Wings</span>
            <h3 className="text-lg font-black text-slate-800 mt-1">사무처 산하 4개 부서 실무 조직</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, dIdx) => (
              <div 
                id={`org-dept-card-${dIdx}`}
                key={dIdx}
                className={`p-6 rounded-2xl border flex flex-col justify-between hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(37,99,235,0.06)] transition-all duration-350 ease-out cursor-pointer ${
                  highContrast 
                    ? "bg-black border-yellow-400 text-yellow-300" 
                    : `bg-white ${dept.color} hover:border-blue-200`
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center">
                      {dept.icon}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">{dept.title}</h4>
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">{dept.subtitle}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <p className="text-[10px] bg-white font-extrabold text-blue-600 px-2 py-0.5 border rounded-md inline-block">
                      {dept.role}
                    </p>
                    <p className="text-slate-600 text-xs leading-relaxed font-semibold">
                      {dept.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-dashed border-slate-100/60 mt-4 text-left text-[10px] text-slate-450 font-black">
                  🛡️ 신뢰와 정량 책임 준수
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Info Quote Card */}
      <div className={`p-6 md:p-8 rounded-2xl border text-center space-y-2 ${
        highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-slate-50 border-slate-100"
      }`}>
        <p className="font-extrabold text-sm text-slate-800">
          “수혜자 고착을 극복하는 사명, 우리원이 앞장서 실천합니다.”
        </p>
        <p className="text-slate-500 font-semibold text-xs leading-relaxed">
          우리원의 대의결총회 및 모든 산하 부서는 기획재정부 세법에 입각한 복식 감사를 분기별 수렴하고 있으며,<br className="hidden md:block" />
          실시간 1원단위 후원 결산 공개를 원칙으로 하여 사회적 무한 신뢰를 이룩해냅니다.
        </p>
      </div>

    </div>
  );
}
