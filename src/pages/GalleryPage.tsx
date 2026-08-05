import { Link } from "react-router-dom";
import Gallery from "../components/Gallery";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-pitch-950 pb-10 flex flex-col">
      <Header />
      
      <div className="mx-auto max-w-5xl px-5 mt-6 mb-2">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Beranda
        </Link>
      </div>

      <div className="flex-1">
        <Gallery />
      </div>
      
      <Footer />
    </div>
  );
}
