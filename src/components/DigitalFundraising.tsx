import React, { useState, useEffect } from "react";
import { 
  Coins, 
  Heart, 
  CheckCircle, 
  Layers, 
  PlusSquare, 
  TrendingUp, 
  Smartphone, 
  ShieldCheck, 
  Award,
  Sliders,
  DollarSign
} from "lucide-react";
import { DonationRecord } from "../types";

export default function DigitalFundraising({ fontRatio, highContrast }: { fontRatio: number; highContrast: boolean }) {
  const [donateAmount, setDonateAmount] = useState<number>(50000);
  const [isRegular, setIsRegular] = useState<boolean>(true);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorMessage, setDonorMessage] = useState("");
  
  // Payment specifics
  const [paymentType, setPaymentType] = useState<"cms" | "card">("cms");
  const [bankName, setBankName] = useState("우리은행");
  const [withdrawalDay, setWithdrawalDay] = useState("5일");
  
  // Storage & simulation triggers
  const [history, setHistory] = useState<DonationRecord[]>([]);
  const [showSMS, setShowSMS] = useState<boolean>(false);
  const [latestDonation, setLatestDonation] = useState<DonationRecord | null>(null);

  // Load existing records
  useEffect(() => {
    const saved = localStorage.getItem("woori_donations");
    if (saved) {
      setHistory(JSON.parse(saved));
    } else {
      const defaultDonors: DonationRecord[] = [
        {
          id: "don-1",
          name: "최*혁",
          amount: 30000,
          isRegular: true,
          message: "매월 늘푸른 봉사단 어르신들 우유배달에 잘 쓰였으면 합니다.",
          email: "choi**@naver.com",
          phone: "010-****-1122",
          createdAt: "2026-06-12 10:24",
        },
        {
          id: "don-2",
          name: "김*정",
          amount: 100000,
          isRegular: false,
          message: "통일품바 각설단 어르신들 음향기기 점검비에 보태주세요.",
          email: "kim**@daum.net",
          phone: "010-****-8841",
          createdAt: "2026-06-14 16:50",
        }
      ];
      setHistory(defaultDonors);
      localStorage.setItem("woori_donations", JSON.stringify(defaultDonors));
    }
  }, []);

  // Compute Aid Yield
  const getBoxes = (amount: number) => Math.floor(amount / 20000);
  const getCoachingHours = (amount: number) => Math.floor(amount / 50000);
  const getTickets = (amount: number) => Math.floor(amount / 10000);

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorPhone) {
      alert("후원자 성명과 후원자 소유 전화번호를 완결 입력해주셔야 CMS 납입 통보가 가동됩니다!");
      return;
    }

    const newRecord: DonationRecord = {
      id: "don-" + Date.now(),
      name: donorName.slice(0, 1) + "*" + donorName.slice(2),
      amount: donateAmount,
      isRegular,
      message: donorMessage || "자립과 소외 해소를 위한 소중한 동행 기부",
      email: donorEmail || "비공개",
      phone: donorPhone.slice(0,3) + "-****-" + donorPhone.slice(-4),
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 16)
    };

    const updated = [newRecord, ...history];
    setHistory(updated);
    localStorage.setItem("woori_donations", JSON.stringify(updated));
    setLatestDonation(newRecord);
    setShowSMS(true);

    // Reset inputs
    setDonorName("");
    setDonorEmail("");
    setDonorPhone("");
    setDonorMessage("");
  };

  // Financial expenditure categories mapping
  const budgetShares = [
    { name: "심리 전문 치료 코칭실 임대 지원 및 치료비", amount: "21,350,000원", percent: 27, color: "bg-zinc-800" },
    { name: "무연고 어르신 대제, 사망자 추모 대잔치 물품", amount: "18,220,000원", percent: 23, color: "bg-orange-500" },
    { name: "협동부업 가공센터 시설 가동 및 자립수입 배부", amount: "16,800,000원", percent: 21, color: "bg-emerald-600" },
    { name: "메아리 예술단/통일품바 각설단 장비 및 차량지원", amount: "14,300,000원", percent: 18, color: "bg-purple-600" },
    { name: "대국민 평화통일 포럼 및 도서 대출 인쇄비", amount: "4,000,000원", percent: 5, color: "bg-slate-700" },
    { name: "사무 행정 공익 회계 수납 수수료 및 우편 행정", amount: "5,182,000원", percent: 6, color: "bg-slate-400" },
  ];

  return (
    <div className="space-y-12 animate-fade-in text-zinc-800" style={{ fontSize: `${16 * fontRatio}px` }}>
      
      {/* Structural Header */}
      <div className="border-b border-zinc-200/60 pb-5 max-w-2xl">
        <span className="text-xs font-bold uppercase text-zinc-800 tracking-wider">WIN-CMS NGO Funding</span>
        <h1 className="text-lg font-bold text-zinc-900 mt-1">우리원 디지털 기부 박스</h1>
        <p className="text-zinc-500 font-semibold mt-1">
          우리은행 제휴 비영리 전용 CMS 통로로 모아진 기금은 단 1원도 헛됨 없이 자립과 치유의 마중물로 쓰입니다.
        </p>
      </div>

      {/* 2. Interactive Impact Slider */}
      <section className={`p-8 rounded-[1.5rem] border ${
        highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-white border-slate-150 shadow-lg shadow-zinc-200/50"
      }`}>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5.5 h-5.5 text-zinc-800 animate-pulse" />
            <h2 className="text-xl font-bold">실시간 기부금 전달 가치 체감기 (Impact Calculator)</h2>
          </div>
          <p className="text-zinc-500 text-xs">
            금액 레일을 마우스나 손으로 조절하여, 귀하의 기부금이 북한이탈주민 및 쉼터 가구에 전하는 가치 수량을 입체적으로 목격하세요.
          </p>

          {/* Draggable Slider */}
          <div className="py-6 space-y-4">
            <input
              id="impact-slider-input"
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={donateAmount}
              onChange={e => setDonateAmount(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>10,000 원</span>
              <span>500,000 원</span>
              <span>1,000,000 원 (통일 코칭 리더 지정)</span>
            </div>
          </div>

          {/* Amount Display */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-zinc-200/60 text-center space-y-2">
            <p className="text-sm font-bold text-zinc-500">지정한 약정 후원액</p>
            <p className="text-lg md:text-lg font-bold text-zinc-800">
              {donateAmount.toLocaleString()} 원
              <span className="text-zinc-500 text-xs font-bold"> / {isRegular ? "매월 정기이체" : "1회 일시후원"}</span>
            </p>
          </div>

          {/* Direct AID yield showing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100 flex flex-col items-center text-center">
              <span className="text-lg mb-1">🎁</span>
              <p className="font-bold text-slate-700 text-sm">위기 가구 사랑박스 수납</p>
              <h4 className="text-lg font-bold text-orange-600 mt-1">{getBoxes(donateAmount)} 상자 배부</h4>
              <p className="text-xxs text-slate-400 leading-relaxed mt-1">즉석밥, 김치, 비 상비약 등 홀몸 1인 가구 1주일 소요 생필품.</p>
            </div>

            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 flex flex-col items-center text-center">
              <span className="text-lg mb-1">🤝</span>
              <p className="font-bold text-slate-700 text-sm">1:1 마음치유 상담 코칭</p>
              <h4 className="text-lg font-bold text-emerald-600 mt-1">{getCoachingHours(donateAmount)} 시간 수행</h4>
              <p className="text-xxs text-slate-400 leading-relaxed mt-1">전문 트라우마 미술 심리 상담의 치료 소요 경비 충당.</p>
            </div>

            <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 flex flex-col items-center text-center">
              <span className="text-lg mb-1">🎺</span>
              <p className="font-bold text-slate-700 text-sm">공감 예술 공연 기회 주최</p>
              <h4 className="text-lg font-bold text-purple-600 mt-1">{getTickets(donateAmount)} 편의 보조</h4>
              <p className="text-xxs text-slate-400 leading-relaxed mt-1">통일품바 각설단 및 메아리 예술단 단원 소형 무대 지원비 연계.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Embedded CMS Donation Portal Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive WIN-CMS input */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[1.5rem] border border-slate-150 shadow-lg shadow-zinc-200/50 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200/60 pb-3">
            <div>
              <h3 className="text-xl font-bold text-zinc-900">우리은행 WIN-CMS NGO 기부 신청</h3>
              <p className="text-slate-400 text-xxs mt-0.5 font-bold">국세청 소득공제 영수증 전송 연등 전산망 (Simulated API)</p>
            </div>
            <div className="flex bg-slate-100 rounded-lg p-0.5 text-xs font-bold border">
              <button
                type="button"
                onClick={() => setIsRegular(true)}
                className={`px-3 py-1.5 rounded-md ${isRegular ? "bg-white text-blue-750 shadow-xs" : "text-zinc-500"}`}
              >
                정기후원
              </button>
              <button
                type="button"
                onClick={() => setIsRegular(false)}
                className={`px-3 py-1.5 rounded-md ${!isRegular ? "bg-white text-blue-750 shadow-xs" : "text-zinc-500"}`}
              >
                일시후원
              </button>
            </div>
          </div>

          <form onSubmit={handleDonationSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">후원자 실명 (Name)</label>
                <input
                  id="donation-name-input"
                  type="text"
                  value={donorName}
                  onChange={e => setDonorName(e.target.value)}
                  placeholder="예: 채우리"
                  className="w-full p-2.5 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">연락처 (Phone)</label>
                <input
                  id="donation-phone-input"
                  type="tel"
                  value={donorPhone}
                  onChange={e => setDonorPhone(e.target.value)}
                  placeholder="예: 010-1234-5678 (SMS 수납안내용)"
                  className="w-full p-2.5 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">이메일 주소 (Email)</label>
              <input
                id="donation-email-input"
                type="email"
                value={donorEmail}
                onChange={e => setDonorEmail(e.target.value)}
                placeholder="yours@domain.com"
                className="w-full p-2.5 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-600 text-sm"
              />
            </div>

            {/* CMS Specific parameters */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-zinc-200/60 space-y-3">
              <span className="text-[10px] bg-slate-900 text-white z-10 px-2 py-0.5 rounded-full font-bold">CMS 자동이체 계좌정보</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xxs font-bold text-zinc-500">은행선택</label>
                  <select
                    id="donation-bank-select"
                    value={bankName}
                    onChange={e => setBankName(e.target.value)}
                    className="w-full p-2 border border-zinc-200 rounded-lg text-xs font-semibold bg-white"
                  >
                    <option value="우리은행">우리은행</option>
                    <option value="농협">농협은행</option>
                    <option value="국민은행">국민은행</option>
                    <option value="신한은행">신한은행</option>
                  </select>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xxs font-bold text-zinc-500">출금 계좌번호 (가상)</label>
                  <input
                    id="donation-account-input"
                    type="text"
                    placeholder="1002-303-****** (기부 보호)"
                    disabled
                    className="w-full p-2 border border-zinc-200 rounded-lg text-xs bg-slate-100 text-slate-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xxs font-bold text-zinc-500">정기 출금일</label>
                  <select
                    id="donation-day-select"
                    value={withdrawalDay}
                    onChange={e => setWithdrawalDay(e.target.value)}
                    className="w-full p-2 border border-zinc-200 rounded-lg text-xs bg-white text-slate-700"
                  >
                    <option value="5일">매월 5일</option>
                    <option value="15일">매월 15일</option>
                    <option value="25일">매월 25일</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xxs font-bold text-zinc-500">국세청 영수증 요청</label>
                  <div className="flex items-center h-8 h-full gap-2 pl-1.5">
                    <input id="receipt-chk" type="checkbox" defaultChecked className="rounded text-zinc-800 focus:ring-blue-600" />
                    <span className="text-xs text-slate-600 font-bold">약정 자동 발급</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">응원 메시지 (Message)</label>
              <input
                id="donation-msg-input"
                type="text"
                value={donorMessage}
                onChange={e => setDonorMessage(e.target.value)}
                placeholder="예: 탈북 청소년과 어르신들 화이팅!"
                className="w-full p-2.5 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-600 text-sm"
              />
            </div>

            <button
              id="donation-submit-btn"
              type="submit"
              className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl text-lg hover:bg-orange-600 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              ❤️ {isRegular ? "매월 정기 후원" : "1회 일시 후원"} 약정 서명하기
            </button>
          </form>
        </div>

        {/* Right: Realtime Integrity logs & Direct banking card */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct Transfer Option Account (농협 301-0251-8906-41 우리원) */}
          <div className="bg-slate-900 text-white p-6 rounded-[1.5rem] border border-slate-800 space-y-4 shadow-md">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 bg-orange-600 rounded text-[10px] font-bold uppercase">Direct Banking</span>
              <span className="text-xs text-slate-300 font-bold">과도기 무통장입금 후원안내</span>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs opacity-75">농협 은행공정구좌</p>
              <h4 className="text-lg font-bold text-white hover:text-orange-200 transition-colors select-all">
                301-0251-8906-41
              </h4>
              <p className="text-sm font-bold text-orange-400">예금주 : 우리원</p>
            </div>

            <p className="text-xxs text-slate-400 leading-relaxed font-semibold">
              ※ WIN-CMS 시스템 도입 전까지 기존 무통장 세입 방식 역시 동일한 소득공제 혜택 대상으로 온전히 보존됩니다.
            </p>
          </div>

          {/* Realtime honesty records lists */}
          <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-150 space-y-4">
            <h4 className="font-bold text-sm text-zinc-800 border-b border-zinc-200 pb-2">실시간 따뜻한 동행 명단</h4>
            
            <div className="space-y-2 max-h-52 overflow-y-auto">
              {history.map((record) => (
                <div key={record.id} className="p-3 bg-white rounded-lg border border-zinc-200/60 flex items-center justify-between shadow-3xs">
                  <div>
                    <p className="text-xs font-bold text-zinc-800">{record.name} 후원회원</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-medium">"{record.message}"</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-zinc-800">{record.amount.toLocaleString()} 원</p>
                    <p className="text-[9px] text-slate-400 font-bold">{record.isRegular ? "매월" : "일시"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 4. Financial Integrity Analytics charts (재정 투명성 시각화) */}
      <section className="p-8 md:p-10 bg-slate-50 rounded-[1.5rem] border border-slate-150 space-y-6">
        <div className="space-y-1 text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-zinc-800 bg-blue-100/50 px-3 py-1 rounded-full uppercase">Transparency Analytics</span>
          <h3 className="text-2.5xl font-bold text-zinc-900 mt-1">기부금 활용 회계 투명성 대시보드</h3>
          <p className="text-zinc-500 text-xs">사후 복식부기 및 행안부 세입세출 내역을 분기별로 그대로 시각화하여 대집행 중입니다.</p>
        </div>

        {/* CSS Chart rendering */}
        <div className="space-y-4 max-w-3xl mx-auto bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs">
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            <span className="text-xs text-slate-600 font-bold">연간 예산 지출처 누계: 79,852,000 KRW (100% 집행)</span>
            <span className="text-xxs text-emerald-600 font-bold">집행 잔액 0원 자산 무결점</span>
          </div>

          <div className="space-y-4">
            {budgetShares.map((category, cIdx) => (
              <div id={`budget-share-row-${cIdx}`} key={cIdx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">{category.name}</span>
                  <span className="font-mono font-bold text-zinc-900">{category.amount} ({category.percent}%)</span>
                </div>
                {/* Visual Bar */}
                <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
                  <div 
                    className={`${category.color} h-full rounded-full transition-all duration-1000`} 
                    style={{ width: `${category.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SMS automated simulation popup */}
      {showSMS && latestDonation && (
        <div className="fixed bottom-6 right-6 z-50 max-w-xs w-full bg-slate-900/95 text-slate-100 p-4 rounded-2xl shadow-xl flex items-start gap-3 border border-slate-700 animate-slide-up backdrop-blur-md">
          <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0">
            <Smartphone className="w-5.5 h-5.5" />
          </div>
          <div className="space-y-1.5 flex-1 relative">
            <button 
              id="close-sms-popup-btn"
              onClick={() => setShowSMS(false)} 
              className="absolute top-0 right-0 p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <Heart className="w-3.5 h-3.5 rotate-45" />
            </button>
            <p className="text-xs font-bold text-orange-400">📱 우리원 감사 문자 (WIN-CMS)</p>
            <p className="text-xxs leading-relaxed font-bold">
              [우리원 기부수납] <br />
              {latestDonation.name} 회원님의 {latestDonation.amount.toLocaleString()}원 약정 서명이 온전히 보증되었습니다. <br />
              연밀정산 영수증과 후원집행 통보가 즉시 연동됩니다. 따뜻한 사랑에 진심으로 목메어 감사드립니다!
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
