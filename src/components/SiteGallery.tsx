import React, { useState } from "react";
import { GALLERY_ITEMS } from "../data";
import { GalleryMedia } from "../types";
import { 
  PlayCircle, 
  Image, 
  Calendar, 
  X, 
  Video, 
  Sparkles, 
  SlidersHorizontal 
} from "lucide-react";

export default function SiteGallery({ fontRatio, highContrast }: { fontRatio: number; highContrast: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [activeMedia, setActiveMedia] = useState<GalleryMedia | null>(null);

  const categories = ["전체", "영상자료", "활동소식", "대외협력"];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    return selectedCategory === "전체" || item.category === selectedCategory;
  });

  return (
    <div className="space-y-12 animate-fade-in text-slate-800" style={{ fontSize: `${16 * fontRatio}px` }}>
      
      {/* Structural Header */}
      <div className="border-b border-slate-100 pb-5 max-w-2xl">
        <span className="text-xs font-black uppercase text-blue-600 tracking-wider font-semibold">Storytelling Gallery</span>
        <h1 className="text-3xl font-black text-slate-900 mt-1">현장 활동 소식 및 미디어 스케치</h1>
        <p className="text-slate-500 font-semibold mt-1">
          다양한 자활 협동, 무료 급식소 배달, 통일 흥보전 연극 등 우리원의 생생한 오프라인 현장들을 시각화합니다.
        </p>
      </div>

      {/* Category control tabs panel */}
      <section className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-2 rounded-2xl border border-slate-150 max-w-md">
        {categories.map((cat, idx) => (
          <button
            id={`gallery-cat-${cat}`}
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
              selectedCategory === cat
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-550 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Grid view lists of images and video cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isVideo = item.category === "영상자료";
          return (
            <div 
              id={`gallery-item-card-${item.id}`}
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-2xs hover:shadow-[0_20px_40px_rgba(0,0,0,0.07)] hover:border-slate-200 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between group"
            >
              
              {/* Media image container */}
              <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 grayscale opacity-90"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay play button if it's video */}
                {isVideo ? (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white opacity-85 hover:scale-110 transition-transform hover:opacity-100" />
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-2 rounded-lg text-slate-700">
                    <Image className="w-4 h-4 text-slate-500" />
                  </div>
                )}

                <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white font-extrabold text-[10px] px-2.5 py-1 rounded">
                  {item.category}
                </span>
              </div>

              {/* Text detail inside card */}
              <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-extrabold">
                    <Calendar className="w-3.5 h-3.5 text-slate-450" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-black text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed pt-1.5 font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-right">
                  <span className="text-[10px] font-black text-blue-600 inline-flex items-center gap-0.5">
                    <span>{isVideo ? "🎬 영상 재생하기" : "🔎 사진 크게 보기"}</span>
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Video / Photo overlay popup lightbox */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in text-slate-800">
          <div className={`rounded-3xl max-w-3xl w-full border overflow-hidden relative flex flex-col ${
            highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-white border-transparent"
          }`}>
            <button 
              id="close-gallery-lightbox-btn"
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-900/85 hover:bg-slate-900 rounded-full text-white hover:scale-105 transition-transform cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player or Large size image */}
            <div className="relative bg-black aspect-video flex items-center justify-center">
              {activeMedia.videoUrl ? (
                <iframe
                  title={activeMedia.title}
                  src={activeMedia.videoUrl}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img 
                  src={activeMedia.imageUrl} 
                  alt={activeMedia.title} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            {/* Explanations under media */}
            <div className="p-6 md:p-8 space-y-3 bg-white dark:bg-neutral-900">
              <div className="flex items-center gap-2">
                <span className="text-xxs bg-blue-600 text-white font-black px-2 py-0.5 rounded uppercase tracking-wider">
                  {activeMedia.category}
                </span>
                <span className="text-xs text-slate-400 font-bold">{activeMedia.date}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-950 leading-tight">
                {activeMedia.title}
              </h3>
              <p className="text-slate-650 text-sm leading-relaxed whitespace-pre-wrap font-medium pb-2 border-b">
                {activeMedia.description}
              </p>
              <div className="pt-2 text-xxs text-slate-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>우리원 늘푸른기획위원단은 모든 현장의 초상권 인가를 100% 필하여 안전 보존합니다.</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
