import { useState } from "react";

const IMAGES = [
  "FB_IMG_1785973572772.jpg", "FB_IMG_1785973579726.jpg", "FB_IMG_1785973585349.jpg",
  "FB_IMG_1785973587845.jpg", "FB_IMG_1785973592470.jpg", "FB_IMG_1785973595413.jpg",
  "FB_IMG_1785973597539.jpg", "FB_IMG_1785973599427.jpg", "FB_IMG_1785973601472.jpg",
  "FB_IMG_1785973603445.jpg", "FB_IMG_1785973605578.jpg", "FB_IMG_1785973607933.jpg",
  "FB_IMG_1785973610662.jpg", "FB_IMG_1785973614042.jpg", "FB_IMG_1785973618945.jpg",
  "FB_IMG_1785973620951.jpg", "FB_IMG_1785973623040.jpg", "FB_IMG_1785973624997.jpg",
  "FB_IMG_1785973627508.jpg", "FB_IMG_1785973629746.jpg", "FB_IMG_1785973631410.jpg",
  "FB_IMG_1785973633917.jpg", "FB_IMG_1785973636428.jpg", "FB_IMG_1785973638554.jpg"
];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-5 mt-12 mb-8">
      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="font-display text-2xl uppercase tracking-wide text-white">
            Galeri Matchday
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Momen seru PERSEKA Kedungtukang vs Tritama FC
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {IMAGES.map((img) => (
          <div 
            key={img} 
            className="group relative aspect-square overflow-hidden rounded-xl bg-pitch-900 cursor-pointer shadow-lg shadow-black/40 ring-1 ring-white/5"
            onClick={() => setSelectedImg(`/gallery/perseka-vs-tritama/${img}`)}
          >
            <img
              src={`/gallery/perseka-vs-tritama/${img}`}
              alt="Gallery"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-amber-500/0 transition-colors group-hover:bg-amber-500/20 mix-blend-overlay" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
               <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
               </svg>
            </div>
          </div>
        ))}
      </div>

      {selectedImg && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-amber-400 p-2 bg-black/50 rounded-full backdrop-blur-md transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={selectedImg} 
            alt="Enlarged gallery" 
            className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
