import React, { useState, useEffect } from "react";
import { 
  Users, 
  FileText, 
  Heart, 
  Settings, 
  LayoutDashboard, 
  TrendingUp, 
  Bell, 
  ShieldCheck,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  Database,
  Eye,
  Download,
  AlertCircle,
  ArrowUpRight,
  UserPlus,
  PieChart,
  BarChart3,
  Loader2,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell
} from "recharts";
import { auth } from "../lib/firebase";
import { 
  Member, 
  Post, 
  DonationRecord, 
  CounselingRequest,
  MembershipTier,
  PostCategory,
  CardType
} from "../types";

// Chart Data
const monthlyPerformanceData = [
  { month: "1월", donations: 4200000, members: 120 },
  { month: "2월", donations: 3800000, members: 145 },
  { month: "3월", donations: 5100000, members: 190 },
  { month: "4월", donations: 4800000, members: 210 },
  { month: "5월", donations: 6200000, members: 340 },
  { month: "6월", donations: 7500000, members: 420 },
];

interface AdminDashboardProps {
  highContrast: boolean;
}

export default function AdminDashboard({ highContrast }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeMenu, setActiveMenu] = useState<"overview" | "members" | "posts" | "donations" | "counseling" | "settings">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [branding, setBranding] = useState({
    orgName: "비영리민간단체 우리원",
    slogan: "N·S WOORI_ONE CO-EXISTENCE",
    logoUrl: "input_file_0.png"
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginId === "nkjoy" && loginPassword === "wjs3603825") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    async function loadBranding() {
      try {
        const response = await fetch("/api/branding");
        if (response.ok) {
          const data = await response.json();
          setBranding(data);
        }
      } catch (err) {
        console.error("Error loading branding:", err);
      }
    }
    loadBranding();
  }, [activeMenu, isAuthenticated]); // Refresh when coming back from settings

  // Sidebar Menus
  const adminMenus = [
    { id: "overview", label: "대시보드 개요", icon: LayoutDashboard },
    { id: "members", label: "회원 관리", icon: Users },
    { id: "posts", label: "콘텐츠 관리", icon: FileText },
    { id: "donations", label: "후원 및 재정", icon: Heart },
    { id: "counseling", label: "상담 및 민원", icon: Bell },
    { id: "settings", label: "브랜드 및 설정", icon: Settings },
  ];

  if (!isAuthenticated) {
    return (
      <div className={`relative min-h-[85vh] flex flex-col items-center justify-center p-6 overflow-hidden transition-all rounded-[2.5rem] ${highContrast ? "bg-black" : "bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/80 border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"}`}>
        {/* Decorative background shapes for premium glassmorphism */}
        {!highContrast && (
          <>
            <div className="absolute top-[10%] left-[20%] w-[30rem] h-[30rem] bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
            <div className="absolute bottom-[20%] right-[20%] w-[30rem] h-[30rem] bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </>
        )}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative z-10 w-full max-w-md p-10 lg:p-12 rounded-[2.5rem] ${
            highContrast 
              ? "bg-slate-900 border-2 border-yellow-400" 
              : "bg-white/60 backdrop-blur-3xl border border-white shadow-[0_20px_40px_-15px_rgba(31,38,135,0.15)]"
          }`}
        >
          <div className="text-center mb-10">
            <div className={`w-20 h-20 mx-auto rounded-[1.5rem] flex items-center justify-center mb-6 shadow-xl ${
              highContrast ? "bg-black border border-yellow-400" : "bg-gradient-to-br from-slate-900 to-indigo-900"
            }`}>
              <ShieldCheck className={`w-10 h-10 ${highContrast ? "text-yellow-400" : "text-white"}`} />
            </div>
            <h2 className={`text-3xl font-extrabold tracking-tight mb-3 ${highContrast ? "text-yellow-400" : "bg-gradient-to-br from-slate-900 to-indigo-900 bg-clip-text text-transparent"}`}>
              관리자 로그인
            </h2>
            <p className={`text-sm font-semibold tracking-wide ${highContrast ? "text-yellow-200" : "text-slate-500"}`}>
              사단법인 북한이탈주민중앙회<br/>통합 관리 시스템
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ml-1 ${highContrast ? "text-yellow-400" : "text-indigo-900/60"}`}>
                아이디
              </label>
              <input
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className={`w-full px-5 py-4 rounded-2xl font-bold outline-none transition-all ${
                  highContrast 
                    ? "bg-black border-2 border-yellow-400/50 text-yellow-300 focus:border-yellow-400 placeholder-yellow-400/30" 
                    : "bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-900 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 placeholder-slate-400 shadow-sm"
                }`}
                placeholder="관리자 아이디를 입력하세요"
              />
            </div>
            
            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-widest mb-2 ml-1 ${highContrast ? "text-yellow-400" : "text-indigo-900/60"}`}>
                비밀번호
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className={`w-full px-5 py-4 rounded-2xl font-bold outline-none transition-all ${
                  highContrast 
                    ? "bg-black border-2 border-yellow-400/50 text-yellow-300 focus:border-yellow-400 placeholder-yellow-400/30" 
                    : "bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-900 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 placeholder-slate-400 shadow-sm"
                }`}
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            {loginError && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm font-bold text-center ${highContrast ? "text-red-400" : "text-red-500"}`}
              >
                {loginError}
              </motion.p>
            )}

            <button
              type="submit"
              className={`relative w-full py-4.5 rounded-2xl font-bold text-base transition-all duration-300 transform active:scale-[0.98] group overflow-hidden ${
                highContrast
                  ? "bg-yellow-400 text-black hover:bg-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                  : "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-xl shadow-indigo-600/20"
              }`}
            >
              {!highContrast && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>}
              <span className="relative z-10 flex items-center justify-center gap-2">
                보안 시스템 접속 <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-[85vh] transition-all rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden ${
      highContrast 
        ? "bg-slate-950 border-2 border-yellow-400" 
        : "bg-white/60 backdrop-blur-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white/80 relative"
    }`}>
      {/* Premium Background Accents */}
      {!highContrast && (
        <>
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-50/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-blue-50/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
        </>
      )}

      <div className="relative z-10 p-4 lg:p-10 h-full">
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 h-full">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-80 shrink-0 space-y-4 lg:space-y-6">
            <div className={`relative p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] transition-all shadow-2xl overflow-hidden ${
              highContrast ? "bg-slate-900 border border-yellow-400/30" : "bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white"
            }`}>
              {/* Decorative glassy blur */}
              {!highContrast && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              )}
              
              <div className="relative z-10 flex items-center gap-4 mb-4 lg:mb-8">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg p-2 overflow-hidden border border-white/20">
                  <img 
                    src={branding.logoUrl} 
                    alt="우리원 로고" 
                    className="w-full h-full object-contain filter brightness-0 invert"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-[8px] lg:text-[10px] font-bold text-blue-300 tracking-[0.2em] uppercase mb-0.5 lg:mb-1">Control Center</p>
                  <p className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">통합 관리자</p>
                </div>
              </div>
              
              <div className="relative z-10 hidden lg:block space-y-4 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/40 uppercase">Network Status</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span className="text-[10px] font-bold text-emerald-400 drop-shadow-sm">ACTIVE</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "98%" }}
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400" 
                  />
                </div>
              </div>
            </div>

            <nav className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
              {adminMenus.map((menu) => (
                <button
                  key={menu.id}
                  onClick={() => setActiveMenu(menu.id as any)}
                  className={`flex-1 lg:flex-none flex flex-col lg:flex-row items-center gap-2 lg:gap-4 px-4 lg:px-6 py-4 lg:py-5 rounded-2xl lg:rounded-[1.5rem] font-bold text-[10px] lg:text-sm transition-all duration-300 group min-w-[80px] lg:min-w-0 border ${
                    activeMenu === menu.id
                      ? (highContrast 
                          ? "bg-yellow-400 text-black border-yellow-400 shadow-lg" 
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-white/10 shadow-[0_8px_20px_-6px_rgba(79,70,229,0.5)] transform scale-[1.02]")
                      : (highContrast 
                          ? "text-yellow-400 border-transparent hover:border-yellow-400/20 hover:bg-neutral-900" 
                          : "bg-white/40 backdrop-blur-md text-slate-600 border-white/60 hover:bg-white/80 hover:text-indigo-900 hover:shadow-lg hover:border-white")
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-all ${
                    activeMenu === menu.id 
                      ? "bg-white/20 text-white" 
                      : "bg-white/50 group-hover:bg-indigo-100 group-hover:text-indigo-600 text-slate-500"
                  }`}>
                    <menu.icon className={`w-5 h-5 lg:w-5 lg:h-5 transition-transform group-hover:scale-110`} />
                  </div>
                  <span className="whitespace-nowrap tracking-tight">{menu.label}</span>
                  {activeMenu === menu.id && (
                    <motion.div layoutId="active-indicator" className="hidden lg:block ml-auto">
                      <ChevronRight className="w-5 h-5 opacity-70" />
                    </motion.div>
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 space-y-10 min-w-0">
            
            {/* Top Bar with Context */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 lg:gap-8 pb-8 border-b border-zinc-200/40">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[9px] lg:text-[10px] font-bold text-indigo-900/60 tracking-[0.2em] uppercase bg-white/50 backdrop-blur-sm border border-white px-4 py-1.5 rounded-full w-fit shadow-sm">
                  <span className="flex items-center gap-1.5"><LayoutDashboard className="w-3 h-3" /> Administration</span>
                  <ChevronRight className="w-3 h-3 opacity-40" />
                  <span className="text-indigo-600">{adminMenus.find(m => m.id === activeMenu)?.label}</span>
                </div>
                <h1 className={`text-2xl lg:text-3xl font-extrabold tracking-tight ${highContrast ? "text-yellow-300" : "bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 bg-clip-text text-transparent"}`}>
                  {adminMenus.find(m => m.id === activeMenu)?.label}
                </h1>
                <p className={`text-sm lg:text-base font-medium max-w-2xl leading-relaxed ${highContrast ? "text-yellow-400/70" : "text-slate-500"}`}>
                  우리원 통합 시스템의 실시간 관제 센터입니다. 모든 데이터의 정합성을 검증하고 운영 안정성을 최우선으로 관리합니다.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className={`relative group flex items-center rounded-2xl px-5 py-4 transition-all w-full lg:w-auto ${
                  highContrast ? "bg-black border border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20" : "bg-white/80 backdrop-blur-md border border-white shadow-sm focus-within:bg-white focus-within:shadow-md focus-within:ring-4 focus-within:ring-indigo-500/10"
                }`}>
                  <Search className={`w-5 h-5 transition-colors ${highContrast ? "text-yellow-400" : "text-slate-400 group-focus-within:text-indigo-500"}`} />
                  <input 
                    type="text" 
                    placeholder="통합 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`bg-transparent border-none outline-none ml-4 text-sm font-semibold w-full md:w-64 placeholder-slate-400 transition-all ${highContrast ? "text-yellow-300" : "text-slate-700"}`}
                  />
                  {/* Subtle right gradient fade for search */}
                  {!highContrast && <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent rounded-r-2xl pointer-events-none group-focus-within:from-white"></div>}
                </div>
              </div>
            </div>

            {/* Dynamic Content Views */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                {activeMenu === "overview" && <OverviewTab highContrast={highContrast} />}
                {activeMenu === "settings" && <SettingsTab highContrast={highContrast} />}
                {activeMenu === "members" && <MembersTable highContrast={highContrast} />}
                {activeMenu === "donations" && <DonationsTable highContrast={highContrast} />}
                {activeMenu === "posts" && <ContentsTable highContrast={highContrast} />}
                {activeMenu === "counseling" && <ConsultationsTable highContrast={highContrast} />}
              </motion.div>
            </AnimatePresence>

          </main>
        </div>
      </div>
    </div>


  );
}

function OverviewTab({ highContrast }: { highContrast: boolean }) {
  const stats = [
    { label: "전체 회원수", value: "1,254", change: "+12.4%", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50/80 border border-indigo-100" },
    { label: "이번달 총 후원금", value: "₩12,850,000", change: "+8.2%", icon: Heart, color: "text-rose-600", bg: "bg-rose-50/80 border border-rose-100" },
    { label: "활성 게시물", value: "3,482", change: "+4.1%", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50/80 border border-emerald-100" },
    { label: "상담 만족도", value: "98%", change: "+1.5%", icon: Bell, color: "text-amber-600", bg: "bg-amber-50/80 border border-amber-100" },
  ];

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className={`relative p-6 lg:p-8 rounded-[2rem] border transition-all duration-300 group hover:-translate-y-2 overflow-hidden ${
              highContrast ? "bg-black border-yellow-400 shadow-lg shadow-yellow-400/5" : "bg-white/80 backdrop-blur-md border-white/60 shadow-xl shadow-indigo-900/5 hover:shadow-2xl hover:shadow-indigo-900/10"
            }`}
          >
            {/* Subtle glow effect */}
            {!highContrast && <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none ${stat.bg.split(' ')[0]}`}></div>}
            
            <div className="relative z-10 flex items-center justify-between mb-6 lg:mb-8">
              <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-[1.25rem] ${stat.bg} flex items-center justify-center ${stat.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] lg:text-xs font-bold shadow-sm border ${
                stat.change.startsWith("+") ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-rose-50 border-rose-100 text-rose-600"
              }`}>
                <ArrowUpRight className="w-3.5 h-3.5" />
                {stat.change}
              </div>
            </div>
            <p className="relative z-10 text-[11px] lg:text-xs font-bold text-slate-500 tracking-widest uppercase mb-2">{stat.label}</p>
            <p className={`relative z-10 text-3xl lg:text-3xl font-extrabold tracking-tight ${highContrast ? "text-yellow-300" : "bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent"}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Monthly Donation Area Chart */}
        <div className={`p-8 lg:p-10 rounded-[2rem] border transition-all duration-300 ${
          highContrast ? "bg-black border-yellow-400 shadow-xl" : "bg-white/80 backdrop-blur-xl border-white shadow-xl shadow-indigo-900/5 hover:shadow-2xl hover:shadow-indigo-900/10"
        }`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-3">
                <div className="p-2 bg-rose-50 rounded-xl">
                  <Heart className="w-5 h-5 text-rose-500" />
                </div>
                <span>월별 후원금 흐름</span>
              </h3>
              <p className="text-xs font-semibold text-slate-400 mt-2">지난 6개월간의 정기/일시 후원금 합계</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Donation Amount</span>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyPerformanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={highContrast ? "#333" : "#f1f5f9"} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: highContrast ? "#eab308" : "#94a3b8" }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: highContrast ? "#eab308" : "#94a3b8" }}
                  tickFormatter={(value) => `${(value / 10000).toLocaleString()}만`}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: '1px solid rgba(255,255,255,0.8)', 
                    boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.1)',
                    backgroundColor: highContrast ? '#111' : 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(8px)',
                    color: highContrast ? '#fbbf24' : '#1e293b'
                  }}
                  itemStyle={{ fontWeight: 800, fontSize: '13px' }}
                  labelStyle={{ fontWeight: 900, marginBottom: '6px', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}
                  formatter={(value: number) => [`₩${value.toLocaleString()}`, '후원금']}
                />
                <Area 
                  type="monotone" 
                  dataKey="donations" 
                  stroke="#4f46e5" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorDonations)" 
                  activeDot={{ r: 6, strokeWidth: 0, fill: "#4f46e5" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Member Growth Bar Chart */}
        <div className={`p-8 lg:p-10 rounded-[2rem] border transition-all duration-300 ${
          highContrast ? "bg-black border-yellow-400 shadow-xl" : "bg-white/80 backdrop-blur-xl border-white shadow-xl shadow-indigo-900/5 hover:shadow-2xl hover:shadow-indigo-900/10"
        }`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-xl">
                  <UserPlus className="w-5 h-5 text-indigo-600" />
                </div>
                <span>신규 회원 증가율</span>
              </h3>
              <p className="text-xs font-semibold text-slate-400 mt-2">월별 신규 멤버십 가입자 통계</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">New Members</span>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyPerformanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={highContrast ? "#333" : "#f1f5f9"} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: highContrast ? "#eab308" : "#94a3b8" }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: highContrast ? "#eab308" : "#94a3b8" }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: '1px solid rgba(255,255,255,0.8)', 
                    boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.1)',
                    backgroundColor: highContrast ? '#111' : 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(8px)'
                  }}
                  itemStyle={{ fontWeight: 800, fontSize: '13px', color: '#10b981' }}
                  labelStyle={{ fontWeight: 900, marginBottom: '6px', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}
                  formatter={(value: number) => [`${value}명`, '신규 회원']}
                />
                <Bar 
                  dataKey="members" 
                  radius={[12, 12, 12, 12]} 
                  barSize={36}
                >
                  {monthlyPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === monthlyPerformanceData.length - 1 ? '#10b981' : '#c7d2fe'} fillOpacity={1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Activity Log */}
        <div className={`lg:col-span-2 p-8 lg:p-10 rounded-[2rem] border transition-all duration-300 ${
          highContrast ? "bg-black border-yellow-400 shadow-xl" : "bg-white/80 backdrop-blur-xl border-white shadow-xl shadow-indigo-900/5 hover:shadow-2xl hover:shadow-indigo-900/10"
        }`}>
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-xl">
                <TrendingUp className="w-5 h-5 text-slate-800" />
              </div>
              <span>실시간 시스템 관제</span>
            </h3>
            <button className="text-[11px] lg:text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors">전체 로그 보기</button>
          </div>

          <div className="space-y-6">
            {[
              { time: "2분 전", user: "Admin_Jeon", action: "공지사항 '30주년 한정판 블랙 카드 발급 안내' 게시", category: "CONTENTS", color: "bg-slate-800" },
              { time: "15분 전", user: "System", action: "박효신 회원 정기 후원 결제 승인 (KRW 50,000)", category: "FINANCE", color: "bg-emerald-500" },
              { time: "40분 전", user: "Manager_Lee", action: "상담번호 #A-10243 '긴급 생계 지원' 상태를 '완료'로 변경", category: "SERVICE", color: "bg-orange-500" },
              { time: "1시간 전", user: "Admin_Jeon", action: "서버 백업 스케줄 실행 및 Google Cloud Storage 동기화", category: "SYSTEM", color: "bg-indigo-600" },
              { time: "3시간 전", user: "System", action: "신규 회원 '강동원' 가입 및 이메일 인증 발송", category: "USER", color: "bg-blue-500" },
            ].map((log, idx) => (
              <div key={idx} className="group flex gap-6 items-start">
                <div className="flex flex-col items-center pt-1.5">
                  <div className={`w-3 h-3 rounded-full ring-4 ring-white shadow-sm transition-all group-hover:scale-125 ${log.color} ${highContrast ? "ring-black" : ""}`} />
                  {idx !== 4 && <div className="w-[2px] flex-1 bg-slate-100 my-2" />}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-bold bg-slate-100/80 text-slate-500 px-2.5 py-1 rounded-lg uppercase tracking-wider">{log.category}</span>
                      <span className="text-[13px] font-bold text-slate-800">{log.user}</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">{log.time}</span>
                  </div>
                  <p className={`text-sm font-semibold leading-relaxed ${highContrast ? "text-slate-300" : "text-slate-600"}`}>
                    {log.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database & Infrastructure */}
        <div className="space-y-8">
          <div className={`p-8 lg:p-10 rounded-[2rem] border transition-all duration-300 ${
            highContrast ? "bg-black border-yellow-400 shadow-xl" : "bg-white/80 backdrop-blur-xl border-white shadow-xl shadow-indigo-900/5 hover:shadow-2xl hover:shadow-indigo-900/10"
          }`}>
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <Database className="w-5 h-5 text-emerald-600" />
              </div>
              <span>Infra Status</span>
            </h3>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Storage Performance</p>
                  <p className="text-sm font-bold text-slate-800">7.2 GB <span className="text-slate-400">/ 25 GB</span></p>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "28.8%" }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Live Latency</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <span className="text-xl font-extrabold text-slate-800">28<span className="text-sm text-slate-400 font-bold ml-1">ms</span></span>
                  </div>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Server Load</p>
                  <span className="text-xl font-extrabold text-slate-800">14<span className="text-sm text-slate-400 font-bold ml-1">%</span></span>
                </div>
              </div>

              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold text-[13px] flex items-center justify-center gap-2.5 hover:from-slate-800 hover:to-slate-700 transition-all shadow-lg active:scale-[0.98] group">
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-slate-300" />
                <span>Full SQL Dump Export (.zip)</span>
              </button>
            </div>
          </div>

          <div className={`relative p-8 lg:p-10 rounded-[2rem] overflow-hidden text-white shadow-xl shadow-indigo-900/20`}>
            {/* Glassy dynamic background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 flex items-center gap-3 mb-5">
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-extrabold tracking-tight">Admin Notice</h4>
            </div>
            <p className="relative z-10 text-[13px] font-medium text-blue-100 leading-relaxed mb-8">
              다음 정기 서버 점검은 2026년 7월 1일 새벽 2시로 예정되어 있습니다. 백업 주기 설정을 확인해 주세요.
            </p>
            <button className="relative z-10 w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-[13px] font-bold transition-all border border-white/20 active:scale-[0.98]">
              세부 스케줄 확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HyperdriveStatus({ highContrast }: { highContrast: boolean }) {
  const [configs, setConfigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHyperdrive() {
      try {
        const res = await fetch("/api/cloudflare/hyperdrive");
        const data = await res.json();
        if (res.ok && data.result) {
          setConfigs(data.result);
        } else if (data.error) {
          setError(data.error);
        }
      } catch (err) {
        setError("네트워크 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchHyperdrive();
  }, []);

  if (loading) return <div className="animate-pulse py-8 text-center text-slate-400 font-bold">Checking Hyperdrive connectivity...</div>;

  if (error) {
    return (
      <div className={`p-6 rounded-2xl border ${highContrast ? "bg-black border-yellow-400" : "bg-slate-50 border-zinc-200/60"}`}>
        <div className="flex items-center gap-3 text-slate-400">
          <AlertCircle className="w-5 h-5" />
          <p className="text-xs font-bold leading-relaxed">
            {error === "Cloudflare credentials not configured in environment" 
              ? "Cloudflare API 설정이 필요합니다. (.env 설정 확인)"
              : error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {configs.map((config) => (
        <div key={config.id} className={`p-6 rounded-[1.5rem] border transition-all ${
          highContrast ? "bg-slate-900 border-yellow-400/30" : "bg-white border-zinc-200/60 shadow-lg shadow-zinc-200/50 hover:shadow-md"
        }`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-bold text-sm">{config.name}</h4>
              <p className="text-[10px] font-mono text-slate-400">{config.id}</p>
            </div>
            <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase">Active</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px]">
              <span className="font-bold text-slate-400 uppercase">Caching</span>
              <span className="font-bold text-zinc-800">Enabled</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="font-bold text-slate-400 uppercase">Host</span>
              <span className="font-mono">{config.origin?.host || "******.cloudflare.net"}</span>
            </div>
          </div>
        </div>
      ))}
      {configs.length === 0 && (
        <div className="md:col-span-2 py-12 text-center border-2 border-dashed border-zinc-200/60 rounded-[1.5rem]">
          <p className="text-slate-400 font-bold text-sm">연결된 Hyperdrive 설정이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

function SettingsTab({ highContrast }: { highContrast: boolean }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [branding, setBranding] = useState({
    orgName: "비영리민간단체 우리원",
    slogan: "N·S WOORI_ONE CO-EXISTENCE",
    logoUrl: "input_file_0.png"
  });

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [brandRes, dbRes] = await Promise.all([
          fetch("/api/branding"),
          fetch("/api/db-status")
        ]);
        
        if (isMounted && brandRes.ok) setBranding(await brandRes.json());
        if (isMounted && dbRes.ok) setDbStatus(await dbRes.json());
      } catch (err) {
        console.error("Error loading settings data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();

    // Setup polling for DB status every 5 seconds
    const intervalId = setInterval(async () => {
      try {
        const res = await fetch("/api/db-status");
        if (res.ok && isMounted) {
          setDbStatus(await res.json());
        }
      } catch (err) {
        if (isMounted) setDbStatus({ status: 'error', error: 'Connection failed' });
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/branding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(branding)
      });
      
      if (response.ok) {
        alert("설정이 성공적으로 저장되었습니다!");
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      console.error("Error saving branding:", err);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 opacity-40">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-bold">설정 정보를 불러오고 있습니다...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Database Connection Status */}
      <div className={`p-6 rounded-[1.5rem] border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        highContrast ? "bg-black border-yellow-400" : "bg-emerald-50 border-emerald-100"
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-zinc-200/50">
            <Zap className={`w-5 h-5 ${highContrast ? "text-yellow-400" : "text-emerald-600"}`} />
          </div>
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-widest ${highContrast ? "text-yellow-400" : "text-emerald-700"}`}>Database Connectivity</p>
            <h4 className={`text-sm font-bold ${highContrast ? "text-white" : "text-emerald-900"}`}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600" /> Connecting to Database...
                </span>
              ) : dbStatus?.status === 'active' ? (
                <>Connected to <span className="underline decoration-2">{dbStatus.database}</span> ({dbStatus.provider})</>
              ) : (
                <span className="text-rose-600">Connection Error</span>
              )}
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {dbStatus?.pingMs !== undefined && (
            <span className="text-[10px] font-bold text-slate-500 bg-white/60 px-2.5 py-1 rounded-md border border-slate-200">
              {dbStatus.pingMs}ms ping
            </span>
          )}
          <div className="flex items-center gap-2">
            <span className={`flex h-2 w-2 rounded-full ${dbStatus?.status === 'active' ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
            <span className={`text-[10px] font-bold uppercase tracking-widest ${highContrast ? "text-yellow-400" : (dbStatus?.status === 'active' ? "text-emerald-600" : "text-rose-600")}`}>
              {dbStatus?.status === 'active' ? "Real-time Live" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* Hyperdrive Section */}
      <div className={`p-10 lg:p-12 rounded-[1.5rem] border ${
        highContrast ? "bg-black border-yellow-400 shadow-xl" : "bg-white border-white/50 shadow-lg shadow-zinc-200/50"
      }`}>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-800 shadow-inner">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Hyperdrive (Postgres & MySQL)</h3>
            <p className="text-sm font-bold text-slate-400">글로벌 커넥션 풀링 및 쿼리 캐싱 설정을 관리합니다.</p>
          </div>
        </div>

        <HyperdriveStatus highContrast={highContrast} />
      </div>

      {/* Brand Identity Section */}
      <div className={`p-10 lg:p-12 rounded-[1.5rem] border ${
        highContrast ? "bg-black border-yellow-400 shadow-xl" : "bg-white border-white/50 shadow-lg shadow-zinc-200/50"
      }`}>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">브랜드 및 시스템 설정</h3>
            <p className="text-sm font-bold text-slate-400">기관의 아이덴티티와 시스템 전역 설정을 관리합니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Logo Management */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold mb-1">기관 로고 관리</h4>
              <p className="text-xs font-bold text-slate-400">내비게이션 및 문서에 표시될 공식 로고를 등록합니다.</p>
            </div>

            <div className={`aspect-video rounded-[1.5rem] border-2 border-dashed flex flex-col items-center justify-center p-8 transition-all relative overflow-hidden group ${
              highContrast ? "border-yellow-400/30 bg-slate-900" : "border-zinc-200 bg-slate-50 hover:bg-slate-100/50"
            }`}>
              <img 
                src={branding.logoUrl} 
                alt="현재 로고" 
                className="w-48 h-48 object-contain mb-4 drop-shadow-lg"
                referrerPolicy="no-referrer"
              />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Active Logo</p>
              <p className="text-[10px] font-bold text-slate-300">{branding.logoUrl}</p>
              
              <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Download className="w-10 h-10 text-white mb-2" />
                <span className="text-white font-bold text-sm">로고 URL 입력 (기능 확장 예정)</span>
                {/* For demo, we just allow text entry of URL in the metadata section */}
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-4 rounded-2xl bg-zinc-800 text-white font-bold text-xs shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "저장 중..." : "변경사항 저장"}
              </button>
              <button className={`flex-1 py-4 rounded-2xl border font-bold text-xs transition-all ${
                highContrast ? "border-yellow-400 text-yellow-400" : "border-zinc-200 text-slate-600 hover:bg-slate-50"
              }`}>
                초기화
              </button>
            </div>
          </div>

          {/* Site Metadata Settings */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-lg font-bold">시스템 메타데이터</h4>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">기관 공식 명칭</label>
                <input 
                  type="text" 
                  value={branding.orgName}
                  onChange={(e) => setBranding({...branding, orgName: e.target.value})}
                  className={`w-full px-5 py-4 rounded-2xl border font-bold text-sm ${
                    highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-white border-zinc-200"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">슬로건 / 서브텍스트</label>
                <input 
                  type="text" 
                  value={branding.slogan}
                  onChange={(e) => setBranding({...branding, slogan: e.target.value})}
                  className={`w-full px-5 py-4 rounded-2xl border font-bold text-sm ${
                    highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-white border-zinc-200"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">로고 이미지 URL</label>
                <input 
                  type="text" 
                  value={branding.logoUrl}
                  onChange={(e) => setBranding({...branding, logoUrl: e.target.value})}
                  placeholder="https://..."
                  className={`w-full px-5 py-4 rounded-2xl border font-bold text-sm ${
                    highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-white border-zinc-200"
                  }`}
                />
              </div>

              <div className="p-6 rounded-2xl bg-zinc-100 border border-blue-100 mt-6">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-zinc-800 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-blue-900 mb-1">보안 주의사항</p>
                    <p className="text-xs font-bold text-blue-700/70 leading-relaxed">
                      로고 및 명칭 변경은 전사 시스템과 모바일 앱 전체에 실시간으로 반영됩니다. 변경 전 마케팅 가이드라인을 확인해 주시기 바랍니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MembersTable({ highContrast }: { highContrast: boolean }) {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const response = await fetch("/api/members");
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (err) {
      console.error("Error fetching members:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAddMember = async () => {
    try {
      await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "새 회원",
          email: `new.${Date.now()}@example.com`,
          level: "일반",
          status: "활성",
          phone: "010-0000-0000"
        })
      });
      fetchMembers();
    } catch (err) {
      console.error("Error adding member:", err);
    }
  };

  return (
    <div className={`p-8 rounded-[1.5rem] border overflow-hidden ${
      highContrast ? "bg-black border-yellow-400 shadow-xl" : "bg-white border-zinc-200/60 shadow-2xl shadow-slate-200/50"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-800">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">회원 및 멤버십 관리</h3>
            <p className="text-xs font-bold text-slate-400">총 {members.length}명의 회원이 등록되어 있습니다.</p>
          </div>
        </div>
        <button 
          onClick={handleAddMember}
          className="px-6 py-3 rounded-xl bg-zinc-800 text-white text-sm font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>신규 회원 수동 등록</span>
        </button>
      </div>

      <div className="overflow-x-auto -mx-8">
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4 opacity-40">
            <Loader2 className="w-10 h-10 animate-spin" />
            <p className="text-xs font-bold uppercase tracking-widest">Loading Member Data...</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-[11px] font-bold uppercase tracking-widest ${highContrast ? "text-yellow-400 border-yellow-400/20" : "text-slate-400 bg-slate-50 border-zinc-200/60"}`}>
                <th className="py-4 px-8 border-b">Member / Identity</th>
                <th className="py-4 px-8 border-b">Tier Status</th>
                <th className="py-4 px-8 border-b">Join Date</th>
                <th className="py-4 px-8 border-b">State</th>
                <th className="py-4 px-8 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {members.map((member) => (
                <tr key={member.id} className={`group hover:bg-slate-50/50 transition-colors ${highContrast ? "hover:bg-yellow-400/5 text-yellow-300" : "text-slate-700"}`}>
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">
                        {member.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{member.name}</p>
                        <p className="text-[10px] font-bold text-slate-400">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                      member.level === 'VVIP' ? 'bg-amber-100 text-amber-700' : 
                      member.level === '블랙' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {member.level}
                    </span>
                  </td>
                  <td className="py-5 px-8 text-xs font-bold text-slate-400">
                    {member.joinDate ? new Date(member.joinDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${member.status === '활성' ? "bg-emerald-500" : "bg-slate-300"}`} />
                      <span className="text-[10px] font-bold uppercase">{member.status}</span>
                    </div>
                  </td>
                  <td className="py-5 px-8 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-slate-400 font-bold text-sm">
                    등록된 회원이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function DonationsTable({ highContrast }: { highContrast: boolean }) {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    try {
      const response = await fetch("/api/donations");
      if (response.ok) {
        const data = await response.json();
        setDonations(data);
      }
    } catch (err) {
      console.error("Error fetching donations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleAddDonation = async () => {
    try {
      await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: "익명 후원자",
          amount: 100000,
          type: "ONETIME",
          status: "COMPLETED"
        })
      });
      fetchDonations();
    } catch (err) {
      console.error("Error adding donation:", err);
    }
  };

  return (
    <div className={`p-8 rounded-[1.5rem] border overflow-hidden ${
      highContrast ? "bg-black border-yellow-400 shadow-xl" : "bg-white border-zinc-200/60 shadow-2xl shadow-slate-200/50"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">후원 및 재정 장부</h3>
            <p className="text-xs font-bold text-slate-400">총 {donations.length}건의 내역이 있습니다.</p>
          </div>
        </div>
        <button 
          onClick={handleAddDonation}
          className="px-6 py-3 rounded-xl bg-rose-600 text-white text-sm font-bold shadow-lg shadow-rose-500/20 flex items-center gap-2 hover:bg-rose-700 active:scale-95 transition-all"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>신규 후원 등록</span>
        </button>
      </div>

      <div className="overflow-x-auto -mx-8">
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4 opacity-40">
            <Loader2 className="w-10 h-10 animate-spin" />
            <p className="text-xs font-bold uppercase tracking-widest">Loading Donation Data...</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-[11px] font-bold uppercase tracking-widest ${highContrast ? "text-yellow-400 border-yellow-400/20" : "text-slate-400 bg-slate-50 border-zinc-200/60"}`}>
                <th className="py-4 px-8 border-b">Donor Name</th>
                <th className="py-4 px-8 border-b">Amount</th>
                <th className="py-4 px-8 border-b">Date</th>
                <th className="py-4 px-8 border-b">Type</th>
                <th className="py-4 px-8 border-b">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {donations.map((donation) => (
                <tr key={donation.id} className={`group hover:bg-slate-50/50 transition-colors ${highContrast ? "hover:bg-yellow-400/5 text-yellow-300" : "text-slate-700"}`}>
                  <td className="py-5 px-8 font-bold text-sm">{donation.donorName}</td>
                  <td className="py-5 px-8 text-sm font-bold text-zinc-800">₩{donation.amount?.toLocaleString()}</td>
                  <td className="py-5 px-8 text-xs font-bold text-slate-400">
                    {donation.date ? new Date(donation.date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-5 px-8">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md">{donation.type}</span>
                  </td>
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${donation.status === 'COMPLETED' ? "bg-emerald-500" : "bg-orange-400"}`} />
                      <span className="text-[10px] font-bold uppercase">{donation.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {donations.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-slate-400 font-bold text-sm">
                    등록된 후원 내역이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function ContentsTable({ highContrast }: { highContrast: boolean }) {
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContents = async () => {
    try {
      const response = await fetch("/api/contents");
      if (response.ok) {
        const data = await response.json();
        setContents(data);
      }
    } catch (err) {
      console.error("Error fetching contents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleAddContent = async () => {
    try {
      await fetch("/api/contents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "새 공지사항",
          type: "공지",
          author: "Admin_Jeon",
          views: 0,
          status: "게시"
        })
      });
      fetchContents();
    } catch (err) {
      console.error("Error adding content:", err);
    }
  };

  return (
    <div className={`p-8 rounded-[1.5rem] border overflow-hidden ${
      highContrast ? "bg-black border-yellow-400 shadow-xl" : "bg-white border-zinc-200/60 shadow-2xl shadow-slate-200/50"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">콘텐츠 관리</h3>
            <p className="text-xs font-bold text-slate-400">총 {contents.length}건의 콘텐츠가 있습니다.</p>
          </div>
        </div>
        <button 
          onClick={handleAddContent}
          className="px-6 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2 hover:bg-emerald-700 active:scale-95 transition-all"
        >
          <span>신규 작성</span>
        </button>
      </div>

      <div className="overflow-x-auto -mx-8">
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4 opacity-40">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-[11px] font-bold uppercase tracking-widest ${highContrast ? "text-yellow-400 border-yellow-400/20" : "text-slate-400 bg-slate-50 border-zinc-200/60"}`}>
                <th className="py-4 px-8 border-b">Title</th>
                <th className="py-4 px-8 border-b">Type</th>
                <th className="py-4 px-8 border-b">Author</th>
                <th className="py-4 px-8 border-b">Date</th>
                <th className="py-4 px-8 border-b">Views</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {contents.map((content) => (
                <tr key={content.id} className={`group hover:bg-slate-50/50 transition-colors ${highContrast ? "hover:bg-yellow-400/5 text-yellow-300" : "text-slate-700"}`}>
                  <td className="py-5 px-8 font-bold text-sm">{content.title}</td>
                  <td className="py-5 px-8">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md">{content.type}</span>
                  </td>
                  <td className="py-5 px-8 text-sm font-bold">{content.author}</td>
                  <td className="py-5 px-8 text-xs font-bold text-slate-400">
                    {content.publishedAt ? new Date(content.publishedAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-5 px-8 text-sm font-bold">{content.views?.toLocaleString()}</td>
                </tr>
              ))}
              {contents.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-slate-400 font-bold text-sm">
                    등록된 콘텐츠가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function ConsultationsTable({ highContrast }: { highContrast: boolean }) {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConsultations = async () => {
    try {
      const response = await fetch("/api/consultations");
      if (response.ok) {
        const data = await response.json();
        setConsultations(data);
      }
    } catch (err) {
      console.error("Error fetching consultations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const handleAddConsultation = async () => {
    try {
      await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requesterName: "김철수",
          type: "법률 상담",
          status: "대기중",
          manager: "이담당"
        })
      });
      fetchConsultations();
    } catch (err) {
      console.error("Error adding consultation:", err);
    }
  };

  return (
    <div className={`p-8 rounded-[1.5rem] border overflow-hidden ${
      highContrast ? "bg-black border-yellow-400 shadow-xl" : "bg-white border-zinc-200/60 shadow-2xl shadow-slate-200/50"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">심리 및 상담 접수 현황</h3>
            <p className="text-xs font-bold text-slate-400">총 {consultations.length}건의 접수 내역이 있습니다.</p>
          </div>
        </div>
        <button 
          onClick={handleAddConsultation}
          className="px-6 py-3 rounded-xl bg-amber-600 text-white text-sm font-bold shadow-lg shadow-amber-500/20 flex items-center gap-2 hover:bg-amber-700 active:scale-95 transition-all"
        >
          <span>접수 등록</span>
        </button>
      </div>

      <div className="overflow-x-auto -mx-8">
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4 opacity-40">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-[11px] font-bold uppercase tracking-widest ${highContrast ? "text-yellow-400 border-yellow-400/20" : "text-slate-400 bg-slate-50 border-zinc-200/60"}`}>
                <th className="py-4 px-8 border-b">Requester</th>
                <th className="py-4 px-8 border-b">Type</th>
                <th className="py-4 px-8 border-b">Status</th>
                <th className="py-4 px-8 border-b">Manager</th>
                <th className="py-4 px-8 border-b">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {consultations.map((consultation) => (
                <tr key={consultation.id} className={`group hover:bg-slate-50/50 transition-colors ${highContrast ? "hover:bg-yellow-400/5 text-yellow-300" : "text-slate-700"}`}>
                  <td className="py-5 px-8 font-bold text-sm">{consultation.requesterName}</td>
                  <td className="py-5 px-8">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md">{consultation.type}</span>
                  </td>
                  <td className="py-5 px-8">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${consultation.status === '대기중' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {consultation.status}
                    </span>
                  </td>
                  <td className="py-5 px-8 text-sm font-bold">{consultation.manager}</td>
                  <td className="py-5 px-8 text-xs font-bold text-slate-400">
                    {consultation.requestedAt ? new Date(consultation.requestedAt).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
              {consultations.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-slate-400 font-bold text-sm">
                    접수된 내역이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function TablePlaceholder({ title, highContrast }: { title: string, highContrast: boolean }) {
  return (
    <div className={`p-8 rounded-[1.5rem] border ${highContrast ? "bg-black border-yellow-400 shadow-xl" : "bg-white border-zinc-200/60 shadow-2xl shadow-slate-200/50"}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-lg">
          + 신규 추가
        </button>
      </div>

      <div className="py-32 flex flex-col items-center justify-center text-center opacity-20 space-y-4">
        <div className="w-20 h-20 rounded-full border-4 border-dashed border-slate-300 flex items-center justify-center">
          <Database className="w-10 h-10" />
        </div>
        <div>
          <p className="text-lg font-bold italic">데이터 로드 준비 중...</p>
          <p className="text-xs font-bold">현재 섹션의 상세 관리 모듈을 구성하고 있습니다.</p>
        </div>
      </div>
    </div>
  );
}
