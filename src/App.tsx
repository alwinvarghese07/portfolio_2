import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";
import SpotifyCallback from "./pages/SpotifyCallback";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react";
import { FigmaSelectionOverlay } from "./components/FigmaHighlight";

function ScrollManager() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Force manual scroll restoration so browsers do not inject native scroll offset
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      wheelMultiplier: 0.9,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    (window as unknown as { lenis: Lenis | null }).lenis = lenis;

    // Guarantee fresh load starts at exact top
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as unknown as { lenis: Lenis | null }).lenis = null;
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const easeInOutCubic = (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        if (id === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          if (lenisRef.current) {
            lenisRef.current.scrollTo(0, {
              duration: 1.0,
              easing: easeInOutCubic,
            });
          }
        } else {
          const el = document.getElementById(id) || (id === "works" ? document.getElementById("projects-section") : null);
          if (el) {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(el, {
                offset: -80,
                duration: 1.0,
                easing: easeInOutCubic,
              });
            } else {
              const y = el.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }
  }, [location.pathname, location.hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <FigmaSelectionOverlay />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        <Route path="/case-study/:id" element={<CaseStudy />} />
        <Route path="/callback" element={<SpotifyCallback />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;