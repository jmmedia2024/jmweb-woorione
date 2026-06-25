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
  const [activeMenu, setActiveMenu] = useState<"overview" | "members" | "posts" | "donations" | "counseling" | "settings">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [branding, setBranding] = useState({
    orgName: "비영리민간단체 우리원",
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
        console.error("Error loading branding:", err);
      }
    }
    loadBranding();
  }, [activeMenu]); // Refresh when coming back from settings

  // Sidebar Menus
  const adminMenus = [
    { id: "overview", label: "대시보드 개요", icon: LayoutDashboard },
    { id: "members", label: "회원 관리", icon: Users },
    { id: "posts", label: "콘텐츠 관리", icon: FileText },
    { id: "donations", label: "후원 및 재정", icon: Heart },
    { id: "counseling", label: "상담 및 민원", icon: Bell },
    { id: "settings", label: "브랜드 및 설정", icon: Settings },
  ];

  return (
    <div className={`min-h-[80vh] transition-all rounded-[1.5rem] lg:rounded-[1.5rem] overflow-hidden ${highContrast ? "bg-slate-950 border-2 border-yellow-400" : "bg-white shadow-2xl border border-zinc-200/60"}`}>
      <div className="p-4 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-80 shrink-0 space-y-4 lg:space-y-6">
            <div className={`p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[1.5rem] transition-all shadow-xl ${
              highContrast ? "bg-slate-900 border border-yellow-400/30" : "bg-slate-900 text-white"
            }`}>
              <div className="flex items-center gap-4 mb-4 lg:mb-8">
                <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg p-1.5 overflow-hidden">
                  <img 
                    src={branding.logoUrl} 
                    alt="우리원 로고" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-[8px] lg:text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase mb-0.5 lg:mb-1">Control Center</p>
                  <p className="text-lg lg:text-lg font-bold tracking-tight">통합 관리자</p>
                </div>
              </div>
              
              <div className="hidden lg:block space-y-4 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/40 uppercase">Network Status</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-400">ACTIVE</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "98%" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" 
                  />
                </div>
              </div>
            </div>

            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
              {adminMenus.map((menu) => (
                <button
                  key={menu.id}
                  onClick={() => setActiveMenu(menu.id as any)}
                  className={`flex-1 lg:flex-none flex flex-col lg:flex-row items-center gap-2 lg:gap-4 px-4 lg:px-8 py-3 lg:py-5 rounded-2xl lg:rounded-[1.5rem] font-bold text-[10px] lg:text-sm transition-all group min-w-[80px] lg:min-w-0 ${
                    activeMenu === menu.id
                      ? (highContrast ? "bg-yellow-400 text-black shadow-lg" : "bg-zinc-800 text-white shadow-2xl shadow-blue-600/20")
                      : (highContrast ? "text-yellow-400 hover:bg-neutral-900 border border-transparent hover:border-yellow-400/20" : "text-zinc-500 hover:bg-white hover:shadow-lg shadow-zinc-200/50 hover:text-zinc-900")
                  }`}
                >
                  <menu.icon className={`w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:scale-110 ${activeMenu === menu.id ? "" : "opacity-60"}`} />
                  <span className="whitespace-nowrap">{menu.label}</span>
                  {activeMenu === menu.id && (
                    <motion.div layoutId="active-indicator" className="hidden lg:block ml-auto">
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 space-y-10 min-w-0">
            
            {/* Top Bar with Context */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 lg:gap-8 pb-4 border-b border-zinc-200/60">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[8px] lg:text-[10px] font-bold text-zinc-800 tracking-widest uppercase bg-zinc-100 px-3 py-1 rounded-full w-fit">
                  <span>Administration</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="opacity-60">{adminMenus.find(m => m.id === activeMenu)?.label}</span>
                </div>
                <h1 className={`text-lg lg:text-xl font-bold tracking-tight ${highContrast ? "text-yellow-300" : "text-zinc-900"}`}>
                  {adminMenus.find(m => m.id === activeMenu)?.label}
                </h1>
                <p className={`text-sm lg:text-base font-bold max-w-2xl ${highContrast ? "text-yellow-400/70" : "text-slate-400"}`}>
                  우리원 통합 시스템의 실시간 관제 센터입니다. 모든 데이터의 정합성을 검증하고 운영 안정성을 최우선으로 관리합니다.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className={`flex items-center border rounded-2xl px-4 lg:px-6 py-3 lg:py-4 transition-all shadow-inner w-full lg:w-auto ${
                  highContrast ? "bg-black border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20" : "bg-slate-50 border-zinc-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500/30"
                }`}>
                  <Search className="w-4 h-4 lg:w-5 lg:h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="검색어를 입력하세요..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none ml-3 lg:ml-4 text-sm font-bold w-full md:w-80 text-slate-700"
                  />
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
                {activeMenu === "posts" && <TablePlaceholder title="콘텐츠 관리 리스트" highContrast={highContrast} />}
                {activeMenu === "counseling" && <TablePlaceholder title="심리 및 상담 접수 현황" highContrast={highContrast} />}
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
    { label: "전체 회원수", value: "1,254", change: "+12.4%", icon: Users, color: "text-zinc-800", bg: "bg-zinc-100/50" },
    { label: "이번달 총 후원금", value: "₩12,850,000", change: "+8.2%", icon: Heart, color: "text-rose-600", bg: "bg-rose-50/50" },
    { label: "활성 게시물", value: "3,482", change: "+4.1%", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50/50" },
    { label: "상담 만족도", value: "98%", change: "+1.5%", icon: Bell, color: "text-orange-600", bg: "bg-orange-50/50" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className={`p-6 lg:p-7 rounded-[1.5rem] border transition-all duration-300 group hover:-translate-y-1.5 ${
              highContrast ? "bg-black border-yellow-400 shadow-lg shadow-yellow-400/5" : "bg-white border-white/60 shadow-lg shadow-zinc-200/50 hover:shadow-xl hover:shadow-zinc-300/60"
            }`}
          >
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-inner`}>
                <stat.icon className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
              <div className={`flex items-center gap-1 px-2 py-0.5 lg:px-2.5 lg:py-1 rounded-full text-[9px] lg:text-[10px] font-bold ${
                stat.change.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              }`}>
                <ArrowUpRight className="w-3 h-3" />
                {stat.change}
              </div>
            </div>
            <p className="text-[10px] lg:text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-1">{stat.label}</p>
            <p className={`text-xl lg:text-lg font-bold tracking-tight ${highContrast ? "text-yellow-300" : "text-zinc-900"}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Monthly Donation Area Chart */}
        <div className={`p-10 rounded-[1.5rem] border ${
          highContrast ? "bg-black border-yellow-400 shadow-xl" : "bg-white border-white/50 shadow-lg shadow-zinc-200/50"
        }`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Heart className="w-6 h-6 text-rose-500" />
                <span>월별 후원금 흐름</span>
              </h3>
              <p className="text-xs font-bold text-slate-400 mt-1">지난 6개월간의 정기/일시 후원금 합계</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-1000" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Donation Amount</span>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyPerformanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={highContrast ? "#333" : "#f1f5f9"} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: highContrast ? "#eab308" : "#94a3b8" }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: highContrast ? "#eab308" : "#94a3b8" }}
                  tickFormatter={(value) => `${(value / 10000).toLocaleString()}만`}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    backgroundColor: highContrast ? '#111' : '#fff',
                    color: highContrast ? '#fbbf24' : '#1e293b'
                  }}
                  itemStyle={{ fontWeight: 800, fontSize: '12px' }}
                  labelStyle={{ fontWeight: 900, marginBottom: '4px', fontSize: '10px', color: '#94a3b8' }}
                  formatter={(value: number) => [`₩${value.toLocaleString()}`, '후원금']}
                />
                <Area 
                  type="monotone" 
                  dataKey="donations" 
                  stroke="#3b82f6" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorDonations)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Member Growth Bar Chart */}
        <div className={`p-10 rounded-[1.5rem] border ${
          highContrast ? "bg-black border-yellow-400 shadow-xl" : "bg-white border-white/50 shadow-lg shadow-zinc-200/50"
        }`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <UserPlus className="w-6 h-6 text-zinc-800" />
                <span>신규 회원 증가율</span>
              </h3>
              <p className="text-xs font-bold text-slate-400 mt-1">월별 신규 멤버십 가입자 통계</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase">New Members</span>
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
                  tick={{ fontSize: 10, fontWeight: 700, fill: highContrast ? "#eab308" : "#94a3b8" }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: highContrast ? "#eab308" : "#94a3b8" }}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    backgroundColor: highContrast ? '#111' : '#fff'
                  }}
                  itemStyle={{ fontWeight: 800, fontSize: '12px', color: '#10b981' }}
                  labelStyle={{ fontWeight: 900, marginBottom: '4px', fontSize: '10px', color: '#94a3b8' }}
                  formatter={(value: number) => [`${value}명`, '신규 회원']}
                />
                <Bar 
                  dataKey="members" 
                  radius={[10, 10, 10, 10]} 
                  barSize={32}
                >
                  {monthlyPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === monthlyPerformanceData.length - 1 ? '#10b981' : '#3b82f6'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Activity Log */}
        <div className={`lg:col-span-2 p-10 rounded-[1.5rem] border ${
          highContrast ? "bg-black border-yellow-400 shadow-xl" : "bg-white border-white/50 shadow-lg shadow-zinc-200/50"
        }`}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold flex items-center gap-3">
              <TrendingUp className="w-7 h-7 text-zinc-800" />
              <span>실시간 시스템 관제</span>
            </h3>
            <button className="text-xs font-bold text-zinc-800 hover:underline">전체 로그 보기</button>
          </div>

          <div className="space-y-6">
            {[
              { time: "2분 전", user: "Admin_Jeon", action: "공지사항 '30주년 한정판 블랙 카드 발급 안내' 게시", category: "CONTENTS", color: "bg-zinc-1000" },
              { time: "15분 전", user: "System", action: "박효신 회원 정기 후원 결제 승인 (KRW 50,000)", category: "FINANCE", color: "bg-emerald-500" },
              { time: "40분 전", user: "Manager_Lee", action: "상담번호 #A-10243 '긴급 생계 지원' 상태를 '완료'로 변경", category: "SERVICE", color: "bg-orange-500" },
              { time: "1시간 전", user: "Admin_Jeon", action: "서버 백업 스케줄 실행 및 Google Cloud Storage 동기화", category: "SYSTEM", color: "bg-slate-800" },
              { time: "3시간 전", user: "System", action: "신규 회원 '강동원' 가입 및 이메일 인증 발송", category: "USER", color: "bg-purple-500" },
            ].map((log, idx) => (
              <div key={idx} className="group flex gap-5 items-start">
                <div className="flex flex-col items-center pt-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full ring-4 ring-white transition-all group-hover:scale-125 ${log.color} ${highContrast ? "ring-black" : ""}`} />
                  {idx !== 4 && <div className="w-0.5 flex-1 bg-slate-100 my-2" />}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold bg-slate-100 text-zinc-500 px-2 py-0.5 rounded-md uppercase">{log.category}</span>
                      <span className="text-xs font-bold text-zinc-800">{log.user}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-300">{log.time}</span>
                  </div>
                  <p className={`text-sm font-bold leading-snug ${highContrast ? "text-slate-300" : "text-slate-700"}`}>
                    {log.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database & Infrastructure */}
        <div className="space-y-8">
          <div className={`p-10 rounded-[1.5rem] border ${
            highContrast ? "bg-black border-yellow-400 shadow-xl" : "bg-white border-white/50 shadow-lg shadow-zinc-200/50"
          }`}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Database className="w-6 h-6 text-emerald-600" />
              <span>Infra Status</span>
            </h3>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Storage Performance</p>
                  <p className="text-sm font-bold text-zinc-900">7.2 GB <span className="text-slate-300">/ 25 GB</span></p>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "28.8%" }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-zinc-200/60/50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Live Latency</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xl font-bold text-zinc-900">28ms</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-zinc-200/60/50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Server Load</p>
                  <span className="text-xl font-bold text-zinc-900">14%</span>
                </div>
              </div>

              <button className="w-full py-4.5 rounded-2xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2.5 hover:bg-slate-800 transition-all shadow-lg active:scale-95 group">
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Full SQL Dump Export (.zip)</span>
              </button>
            </div>
          </div>

          <div className={`p-8 rounded-[1.5rem] bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-xl shadow-blue-500/30`}>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-blue-200" />
              <h4 className="text-lg font-bold">Admin Notice</h4>
            </div>
            <p className="text-xs font-bold text-blue-100 leading-relaxed mb-6">
              다음 정기 서버 점검은 2026년 7월 1일 새벽 2시로 예정되어 있습니다. 백업 주기 설정을 확인해 주세요.
            </p>
            <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-all border border-white/20">
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
    async function loadData() {
      try {
        const [brandRes, dbRes] = await Promise.all([
          fetch("/api/branding"),
          fetch("/api/db-status")
        ]);
        
        if (brandRes.ok) setBranding(await brandRes.json());
        if (dbRes.ok) setDbStatus(await dbRes.json());
      } catch (err) {
        console.error("Error loading settings data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
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
      <div className={`p-6 rounded-[1.5rem] border flex items-center justify-between ${
        highContrast ? "bg-black border-yellow-400" : "bg-emerald-50 border-emerald-100"
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-zinc-200/50">
            <Zap className={`w-5 h-5 ${highContrast ? "text-yellow-400" : "text-emerald-600"}`} />
          </div>
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-widest ${highContrast ? "text-yellow-400" : "text-emerald-700"}`}>Database Connectivity</p>
            <h4 className={`text-sm font-bold ${highContrast ? "text-white" : "text-emerald-900"}`}>
              {dbStatus ? (
                <>Connected to <span className="underline decoration-2">{dbStatus.database}</span> ({dbStatus.provider})</>
              ) : (
                <>Connecting to Database...</>
              )}
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`flex h-2 w-2 rounded-full ${dbStatus ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
          <span className={`text-[10px] font-bold uppercase tracking-widest ${highContrast ? "text-yellow-400" : "text-emerald-600"}`}>
            {dbStatus ? "Real-time Live" : "Offline"}
          </span>
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
          displayName: "새 회원",
          email: `new.${Date.now()}@example.com`,
          membershipTier: "NORMAL",
          isActive: true,
          phoneNumber: "010-0000-0000"
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
                        {member.displayName?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{member.displayName}</p>
                        <p className="text-[10px] font-bold text-slate-400">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                      member.membershipTier === 'GOLD' ? 'bg-amber-100 text-amber-700' : 
                      member.membershipTier === 'BLACK' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {member.membershipTier}
                    </span>
                  </td>
                  <td className="py-5 px-8 text-xs font-bold text-slate-400">
                    {member.joinDate?._seconds ? new Date(member.joinDate._seconds * 1000).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${member.isActive ? "bg-emerald-500" : "bg-slate-300"}`} />
                      <span className="text-[10px] font-bold uppercase">{member.isActive ? "Active" : "Inactive"}</span>
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
                    {donation.date?._seconds ? new Date(donation.date._seconds * 1000).toLocaleDateString() : 'N/A'}
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
