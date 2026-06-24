import React, { useState, useEffect, useCallback } from "react";
import { 
  FolderOpen, 
  File, 
  Search, 
  Download, 
  ExternalLink, 
  LayoutGrid, 
  List, 
  HardDrive, 
  Clock, 
  ShieldCheck, 
  Settings as SettingsIcon,
  AlertCircle,
  Loader2,
  ChevronRight,
  Database,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { initAuth, googleSignIn, logout, getAccessToken } from "../lib/firebase";
import { User } from "firebase/auth";

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  iconLink?: string;
  webViewLink?: string;
  modifiedTime?: string;
  size?: string;
  owners?: { displayName: string }[];
}

interface GoogleDriveManagerProps {
  activeSubSection: string;
  highContrast: boolean;
}

export default function GoogleDriveManager({ activeSubSection, highContrast }: GoogleDriveManagerProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState(activeSubSection || "explorer");

  // Sync tab with navigation
  useEffect(() => {
    if (activeSubSection) {
      setActiveTab(activeSubSection);
    }
  }, [activeSubSection]);

  // Auth Initialization
  useEffect(() => {
    const unsubscribe = initAuth(
      (u, t) => {
        setUser(u);
        setToken(t);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const fetchFiles = useCallback(async () => {
    const currentToken = await getAccessToken();
    if (!currentToken) return;

    setLoading(true);
    setError(null);
    try {
      let q = "trashed = false";
      if (activeTab === "backup") {
        q += " and name contains 'backup'";
      }
      if (searchQuery) {
        q += ` and name contains '${searchQuery}'`;
      }

      const orderBy = activeTab === "recent" ? "modifiedTime desc" : "name";

      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files?pageSize=20&fields=files(id,name,mimeType,thumbnailLink,iconLink,webViewLink,modifiedTime,size,owners)&q=${encodeURIComponent(q)}&orderBy=${encodeURIComponent(orderBy)}`,
        {
          headers: { Authorization: `Bearer ${currentToken}` },
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error?.message || "파일을 불러오지 못했습니다.");
      }

      const data = await res.json();
      setFiles(data.files || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [activeTab, searchQuery]);

  useEffect(() => {
    if (!needsAuth && token) {
      fetchFiles();
    }
  }, [needsAuth, token, fetchFiles]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      setError("로그인에 실패했습니다: " + err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setFiles([]);
  };

  if (needsAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 space-y-6">
        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-4">
          <HardDrive className="w-10 h-10 text-blue-600" />
        </div>
        <div className="space-y-2">
          <h2 className={`text-2xl font-black ${highContrast ? "text-yellow-300" : "text-slate-900"}`}>
            구글 드라이브 자료실 연결
          </h2>
          <p className={`text-sm max-w-md mx-auto font-medium ${highContrast ? "text-yellow-400" : "text-slate-500"}`}>
            우리원의 소중한 팬덤 자료와 평화통일 학술 자료를 안전하게 관리합니다. 
            구글 계정으로 로그인하여 드라이브 연동을 시작하세요.
          </p>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoggingIn}
          className={`group relative flex items-center gap-4 px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-xl hover:shadow-2xl active:scale-95 disabled:opacity-50 ${
            highContrast
              ? "bg-yellow-400 text-black"
              : "bg-white border border-slate-200 text-slate-800 hover:bg-slate-50"
          }`}
        >
          {isLoggingIn ? (
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            </svg>
          )}
          <span>Google 계정으로 계속하기</span>
        </button>

        <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
          Safe & Secure Cloud Storage Integration
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h1 className={`text-2xl font-black tracking-tight ${highContrast ? "text-yellow-300" : "text-slate-900"}`}>
                구글 드라이브 클라우드 센터
              </h1>
              <p className={`text-xs font-extrabold flex items-center gap-1.5 ${highContrast ? "text-yellow-400" : "text-slate-400"}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{user?.displayName} 님으로 연동 중</span>
                <span className="mx-1 opacity-30">|</span>
                <button onClick={handleLogout} className="hover:text-rose-500 underline cursor-pointer">연동 해제</button>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`relative flex items-center border rounded-2xl px-4 py-2.5 transition-all ${
            highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/20 shadow-sm"
          }`}>
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="파일 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchFiles()}
              className="bg-transparent border-none outline-none ml-2 text-sm font-bold w-40 md:w-64"
            />
          </div>
          <button 
            onClick={fetchFiles}
            className={`p-2.5 rounded-xl border transition-all ${
              highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
            }`}
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none gap-2">
        {[
          { id: "explorer", label: "통합 탐색", icon: FolderOpen },
          { id: "recent", label: "최근 자료", icon: Clock },
          { id: "backup", label: "백업소", icon: Database },
          { id: "settings", label: "설정", icon: SettingsIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3.5 flex items-center gap-2 font-black text-sm whitespace-nowrap border-b-2 transition-all relative ${
                isActive
                  ? highContrast ? "border-yellow-400 text-yellow-300" : "border-blue-600 text-blue-600 bg-blue-50/30"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {error && (
          <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl flex items-center gap-4 text-rose-800">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <div className="text-sm font-bold">
              <p>오류가 발생했습니다:</p>
              <p className="opacity-80">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            <p className="text-xs font-black text-slate-400 tracking-widest animate-pulse uppercase">Syncing with Google Drive...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {activeTab === "settings" ? (
                <div className={`p-8 rounded-3xl border space-y-8 ${
                  highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-100 shadow-xl shadow-slate-200/40"
                }`}>
                  <div className="space-y-4">
                    <h3 className="text-xl font-black flex items-center gap-2">
                      <ShieldCheck className="w-6 h-6 text-emerald-500" />
                      <span>보안 및 연동 권한 관리</span>
                    </h3>
                    <div className="p-5 bg-slate-50 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-black text-slate-800">인증 토큰 유효성</p>
                          <p className="text-[11px] font-bold text-slate-500">현재 브라우저 세션에 안전하게 보관 중입니다.</p>
                        </div>
                        <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">ACTIVE</span>
                      </div>
                      <div className="pt-3 border-t border-slate-200 flex justify-end">
                        <button 
                          onClick={handleLogout}
                          className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 text-xs font-black hover:bg-rose-100 transition-colors"
                        >
                          연동 계정 로그아웃
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-black flex items-center gap-2">
                      <SettingsIcon className="w-6 h-6 text-blue-500" />
                      <span>표시 설정</span>
                    </h3>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setViewMode("grid")}
                        className={`flex-1 p-4 rounded-2xl border flex flex-col items-center gap-2 font-black transition-all ${
                          viewMode === "grid" ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"
                        }`}
                      >
                        <LayoutGrid className="w-6 h-6" />
                        <span className="text-xs">그리드 뷰</span>
                      </button>
                      <button 
                        onClick={() => setViewMode("list")}
                        className={`flex-1 p-4 rounded-2xl border flex flex-col items-center gap-2 font-black transition-all ${
                          viewMode === "list" ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"
                        }`}
                      >
                        <List className="w-6 h-6" />
                        <span className="text-xs">리스트 뷰</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : files.length > 0 ? (
                <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" : "space-y-2"}>
                  {files.map((file) => (
                    <motion.div
                      layout
                      key={file.id}
                      className={`group relative overflow-hidden transition-all ${
                        viewMode === "grid"
                          ? `border rounded-2xl p-4 flex flex-col h-full ${highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-100 hover:border-blue-200 hover:shadow-lg shadow-sm"}`
                          : `flex items-center gap-4 p-3 border rounded-xl ${highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-50 hover:bg-slate-50 transition-colors"}`
                      }`}
                    >
                      <div className={`shrink-0 ${viewMode === "grid" ? "mb-4" : ""}`}>
                        {file.thumbnailLink ? (
                          <div className={`overflow-hidden rounded-lg ${viewMode === "grid" ? "aspect-video" : "w-10 h-10"}`}>
                            <img src={file.thumbnailLink} alt={file.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                          </div>
                        ) : (
                          <div className={`rounded-lg bg-slate-100 flex items-center justify-center ${viewMode === "grid" ? "h-32" : "w-10 h-10"}`}>
                            {file.mimeType.includes("folder") ? <FolderOpen className="w-8 h-8 text-blue-500" /> : <File className="w-8 h-8 text-slate-400" />}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <p className={`font-black text-sm truncate ${highContrast ? "text-yellow-300" : "text-slate-900"}`}>
                          {file.name}
                        </p>
                        <div className="flex items-center gap-2">
                          {file.iconLink && <img src={file.iconLink} alt="" className="w-3 h-3 opacity-60" />}
                          <p className="text-[10px] font-extrabold text-slate-400 truncate uppercase tracking-tighter">
                            {file.mimeType.split(".").pop()?.replace("vnd.google-apps.", "")}
                            {file.size && ` • ${(parseInt(file.size) / (1024 * 1024)).toFixed(1)}MB`}
                          </p>
                        </div>
                      </div>

                      {viewMode === "list" && (
                        <div className="hidden md:block px-4">
                          <p className="text-[10px] font-extrabold text-slate-400">수정일: {file.modifiedTime?.slice(0, 10)}</p>
                        </div>
                      )}

                      <div className={`flex items-center gap-2 ${viewMode === "grid" ? "mt-4 pt-3 border-t border-slate-50" : "ml-auto"}`}>
                        <a 
                          href={file.webViewLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center space-y-4 opacity-40">
                  <FolderOpen className="w-16 h-16" />
                  <div className="space-y-1">
                    <p className="text-lg font-black">표시할 파일이 없습니다.</p>
                    <p className="text-xs font-bold">드라이브에 자료를 업로드하거나 검색어를 확인해주세요.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Quick Access Sidebar/Footer - Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-3xl border flex items-center gap-5 ${highContrast ? "bg-black border-yellow-400" : "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/20"}`}>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-black opacity-70 tracking-widest uppercase">Drive Status</p>
            <p className="text-lg font-black">암호화 연동 중</p>
          </div>
        </div>
        
        <div className={`p-6 rounded-3xl border flex items-center gap-5 ${highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-100 shadow-lg shadow-slate-200/40"}`}>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <p className={`text-xs font-black opacity-70 tracking-widest uppercase ${highContrast ? "text-yellow-400" : "text-slate-400"}`}>Live Sync</p>
            <p className={`text-lg font-black ${highContrast ? "text-yellow-300" : "text-slate-900"}`}>자동 동기화 활성</p>
          </div>
        </div>

        <div className={`p-6 rounded-3xl border flex items-center gap-5 ${highContrast ? "bg-black border-yellow-400" : "bg-white border-slate-100 shadow-lg shadow-slate-200/40"}`}>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <p className={`text-xs font-black opacity-70 tracking-widest uppercase ${highContrast ? "text-yellow-400" : "text-slate-400"}`}>Storage</p>
            <p className={`text-lg font-black ${highContrast ? "text-yellow-300" : "text-slate-900"}`}>백업 서버 가동</p>
          </div>
        </div>
      </div>
    </div>
  );
}
