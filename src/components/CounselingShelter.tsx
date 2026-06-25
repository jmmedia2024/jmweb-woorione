import React, { useState, useEffect } from "react";
import { 
  PhoneCall, 
  MapPin, 
  Heart, 
  CheckCircle, 
  ShieldCheck, 
  Smile, 
  Clock, 
  UserPlus2, 
  Volume2, 
  X 
} from "lucide-react";
import { CounselingRequest } from "../types";

export default function CounselingShelter({ fontRatio, highContrast }: { fontRatio: number; highContrast: boolean }) {
  const [requests, setRequests] = useState<CounselingRequest[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [type, setType] = useState<CounselingRequest["type"]>("1:1 심리상담");
  const [message, setMessage] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [callStep, setCallStep] = useState(0);
  const [successMsg, setSuccessMsg] = useState(false);

  // Load existing registrations
  useEffect(() => {
    const saved = localStorage.getItem("woori_counseling");
    if (saved) {
      setRequests(JSON.parse(saved));
    } else {
      const defaultRequests: CounselingRequest[] = [
        {
          id: "req-mock-1",
          name: "안*연",
          phone: "010-34**-9912",
          age: "62",
          type: "1:1 심리상담",
          message: "고향 두고 홀로 정착하느라 너무 힘든 나날입니다.",
          createdAt: "2026-06-12 14:10",
          status: "코치 배정완료",
        },
        {
          id: "req-mock-2",
          name: "박*남",
          phone: "010-88**-1244",
          age: "71",
          type: "통일마중쉼터 입소",
          message: "무연고 거주 가구인데, 보도 물량 보완이 필요해 문의드립니다.",
          createdAt: "2026-06-14 11:24",
          status: "접수대기",
        }
      ];
      setRequests(defaultRequests);
      localStorage.setItem("woori_counseling", JSON.stringify(defaultRequests));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("성함과 연락처는 필히 기재해 주셔야 상담 가이드 안내가 도출됩니다!");
      return;
    }

    const newRequest: CounselingRequest = {
      id: "req-" + Date.now(),
      name: name.slice(0,1) + "*" + name.slice(2), // Masking for security
      phone: phone.slice(0,3) + "-****-" + phone.slice(-4),
      age: age || "비공개",
      type,
      message: message || "신분 비공개 간편 접수 상담 요청",
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      status: "접수대기"
    };

    const updated = [newRequest, ...requests];
    setRequests(updated);
    localStorage.setItem("woori_counseling", JSON.stringify(updated));
    
    // Clear
    setName("");
    setPhone("");
    setAge("");
    setMessage("");
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  // Call simulator dialogue loop
  useEffect(() => {
    if (!isCalling) return;
    const interval = setInterval(() => {
      setCallStep(prev => {
        if (prev >= 3) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isCalling]);

  const startHotlineCall = () => {
    setIsCalling(true);
    setCallStep(0);
  };

  const endHotlineCall = () => {
    setIsCalling(false);
    setCallStep(0);
  };

  const callDialogues = [
    "따르릉... 우리원 1:1 마음치유 긴급 핫라인으로 연결 중입니다.",
    "“반갑습니다, 우리원 선배 정착 멘토 채신아입니다. 고향을 떠나 서러우셨지요? 주저 말고 마음 속 응어리를 편하게 털어놓아 보세요.”",
    "“언제든 충남 아산의 통일마중쉼터 문이 열려 있습니다. 따뜻한 밥상과 1:1 상담이 상시 대기하고 있으니 다 함께 손을 모읍시다.”",
    "“전화 연결이 완료되었습니다. 화면 하단의 상담 예약을 작성해주시면 담당 코치가 12시간 이내에 직접 전화 드리겠습니다.”"
  ];

  return (
    <div className="space-y-12 animate-fade-in text-zinc-800" style={{ fontSize: `${16 * fontRatio}px` }}>
      
      {/* 2. Headline and Intro */}
      <div className="border-b border-zinc-200/60 pb-5 max-w-2xl">
        <span className="text-xs font-bold uppercase text-zinc-800 tracking-wider">Hot-Line & Shelter Portal</span>
        <h1 className="text-lg font-bold text-zinc-900 mt-1">통일마중쉼터 입소 및 상담 핫라인</h1>
        <p className="text-zinc-500 font-semibold mt-1">외로운 정착 길에 따스한 등불을 밝혀드리는 1:1 전문 케어 서비스입니다.</p>
      </div>

      {/* 3. Direct Simulated Hotline Dialing widget Component */}
      <section className={`p-8 rounded-[1.5rem] border text-center relative overflow-hidden transition-all duration-300 ${
        highContrast 
          ? "bg-black border-yellow-400 text-yellow-300" 
          : "bg-radial-[at_50%_0%] from-blue-500 to-blue-700 text-white shadow-xl"
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

        <div className="max-w-xl mx-auto space-y-6 relative z-10">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto animate-bounce">
            <PhoneCall className="w-8 h-8 text-white" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl md:text-lg font-bold">우리원 24시간 정서안정 안심 핫라인</h2>
            <p className="opacity-90 text-sm md:text-base font-semibold">
              평균 연령 60세 시니어 선배와 1:1 전문 가족 상담 코치가 직접 소통합니다.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md max-w-sm mx-auto border border-white/20">
            <p className="text-lg font-bold tracking-widest text-orange-200">📞 직통전화 : 041-543-9060</p>
            <p className="text-xxs opacity-75 mt-1 font-semibold">수혜자 신분 철저 보호 / 별도 요금 부과 없음</p>
          </div>

          <button
            id="start-hotline-sim-btn"
            onClick={startHotlineCall}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-lg font-bold shadow-md inline-flex items-center gap-2 animate-pulse transition-all cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
            <span>긴급 핫라인 가상 연결 체험하기</span>
          </button>
        </div>

        {/* Dynamic Voice dialog overlay */}
        {isCalling && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className={`p-8 rounded-[1.5rem] max-w-md w-full border text-left space-y-6 relative ${
              highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-white text-zinc-800"
            }`}>
              <button 
                id="close-hotline-sim-btn"
                onClick={endHotlineCall}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-zinc-800"></span>
                </span>
                <span className="text-xs font-bold text-slate-400">우리원 치유 핫라인 AI 통신망</span>
              </div>

              {/* Call states wave animations */}
              <div className="flex justify-center items-center gap-1.5 h-10">
                {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                  <div 
                    key={bar} 
                    className={`w-1.5 bg-zinc-800 rounded-full animate-pulse`} 
                    style={{ 
                      height: `${Math.floor(Math.random() * 35) + 10}px`,
                      animationDelay: `${bar * 0.15}s`
                    }}
                  ></div>
                ))}
              </div>

              <div className="space-y-4">
                <p className="text-base text-slate-700 leading-relaxed font-bold bg-slate-50 p-4 rounded-xl border border-zinc-200/60">
                  {callDialogues[callStep]}
                </p>
                <p className="text-xxs text-slate-400 text-center font-semibold">
                  {callStep < 3 ? "📞 다음 가이드로 연결 중... 잠시 기다리세요" : "✅ 핫라인 브리핑 완료"}
                </p>
              </div>

              <button
                id="end-call-btn"
                onClick={endHotlineCall}
                className="w-full py-3.5 bg-red-650 hover:bg-red-700 text-white font-bold rounded-xl text-base shadow transition-all cursor-pointer"
              >
                상담 종료 및 대기
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 4. Scheduling Registration Form & Active Status Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Input Form */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[1.5rem] border border-slate-150 shadow-lg shadow-zinc-200/50 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-1.5">
              <UserPlus2 className="w-5.5 h-5.5 text-zinc-800" />
              <span>간편 비공개 심리 코칭 & 쉼터 예약</span>
            </h3>
            <p className="text-zinc-500 text-xs">수혜자의 안전과 신원 한계 보호를 위해 이름은 마스킹 처리되어 보존됩니다.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">이름 / 가명 (Alias)</label>
                <input
                  id="counsel-name-input"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="예: 홍길동 (보안철저)"
                  className="w-full p-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-600 text-base"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">실시간 연락처 (Phone)</label>
                <input
                  id="counsel-phone-input"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="예: 010-1234-5678"
                  className="w-full p-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-600 text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">나이 / 연세</label>
                <input
                  id="counsel-age-input"
                  type="number"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  placeholder="예: 62"
                  className="w-full p-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-600 text-base animate-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">요구 지원 항목 (Type)</label>
                <select
                  id="counsel-type-select"
                  value={type}
                  onChange={e => setType(e.target.value as any)}
                  className="w-full p-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-600 text-base font-bold text-slate-755 bg-white"
                >
                  <option value="1:1 심리상담">1:1 심리상담 / 치유</option>
                  <option value="멘토링">북한이탈 주민 멘토 결합</option>
                  <option value="통일마중쉼터 입소">통일마중쉼터 임시 숙박</option>
                  <option value="긴급 생계지원">긴급 식수 생필품 상자 구제</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">상담 및 위기 정황 요약 (Message)</label>
              <textarea
                id="counsel-msg-textarea"
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="현재 겪고 계신 정서적 애로사항이나 마중쉼터에 바라는 요청사항을 적어주세요."
                className="w-full p-4 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-600 text-base"
              ></textarea>
            </div>

            {successMsg && (
              <div className="p-3.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 flex items-center gap-2 text-sm font-bold antialiased">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>심리 가이드 예약 접수가 성공했습니다! 마스킹 배정 표를 확인해 보세요.</span>
              </div>
            )}

            <button
              id="counsel-submit-btn"
              type="submit"
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl text-lg hover:bg-slate-800 transition-all cursor-pointer"
            >
              상담 예약 및 위기 구제 원서 접수
            </button>
          </form>
        </div>

        {/* Right: Realtime status checklist */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-150 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h4 className="font-bold text-zinc-900">실시간 상담 매칭 현황판</h4>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Local-Secure Active
              </span>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {requests.map((r) => (
                <div key={r.id} className="p-4 bg-white rounded-xl border border-zinc-200/60 shadow-3xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold">{r.createdAt}</span>
                    <span className={`text-xxs px-2 py-0.5 rounded-full font-bold ${
                      r.status === "코치 배정완료"
                        ? "bg-emerald-150 text-emerald-800"
                        : "bg-orange-100 text-orange-850"
                    }`}>
                      {r.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 font-bold text-sm text-zinc-800">
                    <CheckCircle className={`w-4 s-4 ${r.status === "코치 배정완료" ? "text-emerald-500" : "text-orange-500"}`} />
                    <span>{r.name} 님 ({r.age}세) - {r.type}</span>
                  </div>

                  <p className="text-zinc-500 text-xs truncate italic">{r.message}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 bg-zinc-100/50 p-3.5 rounded-xl border border-blue-100/50 space-y-1 text-xxs text-zinc-500 font-semibold leading-relaxed">
              <p className="font-bold text-slate-700 text-xs">🔒 개인 프라이버시 특별 규범</p>
              <p>우리원 디지털 서버는 수집하는 모든 신원을 로컬 브라우저 보안 쿠키에 저장하며, 외부 데이터베이스 전송 시 100% 해시 마스킹을 원칙으로 소지합니다.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
