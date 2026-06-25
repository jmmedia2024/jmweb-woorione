import React, { useState } from "react";
import { 
  FileText, 
  Search, 
  Download, 
  Tag, 
  BookOpen, 
  CheckCircle,
  HelpCircle,
  Sparkles,
  Award,
  ChevronDown
} from "lucide-react";
import { ACADEMIC_DOCUMENTS } from "../data";
import { AcademicDoc } from "../types";

export default function AcademicLibrary({ fontRatio, highContrast }: { fontRatio: number; highContrast: boolean }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [selectedDoc, setSelectedDoc] = useState<AcademicDoc | null>(null);
  
  // Download states tracker
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Categories extraction
  const categories = ["전체", "평화통일교육", "북한 경제/시장화", "정착 지원 정책"];

  // Search filter
  const filteredDocs = ACADEMIC_DOCUMENTS.filter((doc) => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(t => t.includes(searchQuery));
      
    const matchesCategory = selectedCategory === "전체" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const simulateDownload = (docId: string) => {
    setDownloadingId(docId);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDownloadingId(null), 1000); // Reset
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="space-y-12 animate-fade-in text-zinc-800" style={{ fontSize: `${16 * fontRatio}px` }}>
      
      {/* Structural Header */}
      <div className="border-b border-zinc-200/60 pb-5 max-w-2xl">
        <span className="text-xs font-bold uppercase text-zinc-800 tracking-wider">Research & Papers Archive</span>
        <h1 className="text-lg font-bold text-zinc-900 mt-1">평화통일 전문 학술자료실</h1>
        <p className="text-zinc-500 font-semibold mt-1">
          정부 기관, 지자체, 학계 대외 협력 분석을 위해 유용한 통일 정책 및 북한 내부 경제 동향 연구를 아카이빙합니다.
        </p>
      </div>

      {/* Search and Category Control Bar */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-50 p-4 rounded-2xl border border-zinc-200">
        
        {/* Search Input */}
        <div className="md:col-span-7 relative">
          <Search className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            id="academic-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="논문 제목, 저자명, 또는 '돈주', '와크' 등 키워드로 정밀 탐색..."
            className="w-full pl-11 pr-4 py-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-600 bg-white text-base"
          />
        </div>

        {/* Category combobox */}
        <div className="md:col-span-5 flex gap-2">
          <select
            id="academic-category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-600 bg-white text-sm font-bold text-slate-700"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat} 범주</option>
            ))}
          </select>
        </div>

      </section>

      {/* Main split grid: Document collections vs document detail view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: List of documents card */}
        <div className="lg:col-span-7 space-y-4">
          {filteredDocs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-zinc-200/60 italic text-slate-400">
              검색 조건에 부합하는 전문 학술자료가 파악되지 않습니다. 다시 확인해보고 입력해주세요.
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div 
                id={`document-card-${doc.id}`}
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-6 rounded-2xl border cursor-pointer hover:shadow-md transition-all ${
                  selectedDoc?.id === doc.id
                    ? "border-blue-600 bg-zinc-100/20"
                    : "border-slate-150 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] bg-slate-900 text-slate-200 px-2 py-0.5 rounded font-bold font-mono">
                      {doc.category}
                    </span>
                    <h3 className="text-lg font-bold text-zinc-900 leading-tight hover:text-zinc-800 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-zinc-500 font-bold">
                      저자: {doc.author} | 출처: {doc.publisher} ({doc.publishYear}년)
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <p className="text-slate-600 text-xs line-clamp-3 mt-3 leading-relaxed">
                  {doc.summary}
                </p>

                {/* Tags array */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {doc.tags.map((t, tIdx) => (
                    <span key={tIdx} className="inline-flex items-center gap-1 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.7 rounded font-bold">
                      <Tag className="w-2.5 h-2.5 opacity-65" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right column: Sticky visual Detail Reader panel */}
        <div className="lg:col-span-5 sticky top-24">
          {selectedDoc ? (
            <div className={`p-6 md:p-8 rounded-[1.5rem] border space-y-6 ${
              highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-white border-slate-150 shadow-lg shadow-zinc-200/50"
            }`}>
              <div className="flex items-center justify-between border-b border-dashed border-zinc-200 pb-4">
                <span className="text-xs bg-blue-100 text-blue-900 px-2.5 py-1 rounded font-bold font-mono">
                  READER MODE ACTIVE
                </span>
                <span className="text-xxs text-slate-400 font-bold">ID: {selectedDoc.id}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl md:text-lg font-bold text-zinc-900 leading-tight">
                  {selectedDoc.title}
                </h3>
                <p className="text-xs text-zinc-500 font-bold">
                  구조 집필: {selectedDoc.author} <br />
                  출판 정보: {selectedDoc.publisher} ({selectedDoc.publishYear}년도 연계)
                </p>
              </div>

              {/* Research Insights Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">논문 핵심 요약 요약 (Abstract)</h4>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  {selectedDoc.summary}
                </p>
              </div>

              {/* Key Study Points */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-zinc-200/60">
                <h4 className="text-xs font-bold uppercase text-zinc-500 tracking-wider">연구 핵심 쟁점 (Key Points)</h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {selectedDoc.keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex gap-2 items-start font-medium">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Simulated Download button with loader */}
              <div className="pt-2">
                {downloadingId === selectedDoc.id ? (
                  <div className="w-full bg-slate-100 rounded-xl h-12 overflow-hidden border border-zinc-200 relative flex items-center justify-center">
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-zinc-800 transition-all text-white font-bold flex items-center justify-end pr-2.5" 
                      style={{ width: `${downloadProgress}%` }}
                    ></div>
                    <span className="relative z-10 text-xs font-bold text-zinc-900 mix-blend-difference">
                      학술 전문 고품질 PDF 전송 다운 중... {downloadProgress}%
                    </span>
                  </div>
                ) : (
                  <button
                    id="simulate-pdf-download-btn"
                    onClick={() => simulateDownload(selectedDoc.id)}
                    className="w-full py-3.5 bg-slate-900 border border-slate-800 text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 shadow focus:outline-none cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>실제 정책 PDF 연구보고서 다운로드</span>
                  </button>
                )}
                <p className="text-[10px] text-slate-400 text-center font-bold mt-2">
                  ※ 인가된 우리원 학술연구위원 및 지자체 공무원, 기자단은 즉시 갱신 다운로드 가능합니다.
                </p>
              </div>

            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-[1.5rem] border border-dashed border-zinc-200 text-slate-400 space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto animate-pulse" />
              <p className="text-base font-bold text-zinc-500">지식 자산 상세 리더관</p>
              <p className="text-xs leading-relaxed">
                좌측 일람에서 열람하고자 하는 세미나 분석 보고서 또는 북한 경제 시장화(돈주/와크) 분석 초안 논문을 선택하시면, 
                이곳에 핵심 연구 브리핑과 다운로드 기증판이 즉각 전개됩니다.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
