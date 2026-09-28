/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ExternalLink,
  RefreshCw,
  X,
  ChevronLeft,
  Search,
  Download,
  Home,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Cloud,
  FileQuestion,
  HelpCircle,
  Copy,
  Check,
  Globe,
} from 'lucide-react';
import { TOOLS, ToolItem } from './data/tools';

const OFFICIAL_URL = 'https://nguyenchanhthang.github.io/';

const BASE_URL = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const getAssetUrl = (path: string) => {
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_URL}${cleanPath}`;
};

const LOGO_SRC = getAssetUrl('static/logo_moi.png');
const LOTUS_WEBP_SRC = getAssetUrl('static/lotus.webp');
const LOTUS_PNG_SRC = getAssetUrl('static/lotus.png');
const ZIP_DOWNLOAD_SRC = getAssetUrl('bo-cong-cu-kiem-sat.zip');

type ViewMode = 'landing' | 'dashboard' | 'tool';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [currentTool, setCurrentTool] = useState<ToolItem | null>(null);
  const [isLoadingTool, setIsLoadingTool] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [clockString, setClockString] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const copyOfficialLink = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(OFFICIAL_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  // Vietnam Clock formatting
  useEffect(() => {
    const updateClock = () => {
      const n = new Date();
      const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
      const day = days[n.getDay()];
      const d = String(n.getDate()).padStart(2, '0');
      const m = String(n.getMonth() + 1).padStart(2, '0');
      const y = n.getFullYear();
      const hh = String(n.getHours()).padStart(2, '0');
      const mm = String(n.getMinutes()).padStart(2, '0');
      const ss = String(n.getSeconds()).padStart(2, '0');
      setClockString(`${day}, ${d}/${m}/${y} ${hh}:${mm}:${ss}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize water rings with randomized wave parameters as in original site
  useEffect(() => {
    const rings = document.querySelectorAll<HTMLElement>('.water-ring');
    rings.forEach((ring) => {
      const waveEnd = (1.52 + Math.random() * 0.3).toFixed(2);
      const wavePeak = (0.42 + Math.random() * 0.24).toFixed(2);
      ring.style.setProperty('--wave-end', waveEnd);
      ring.style.setProperty('--wave-peak', wavePeak);
      ring.style.animationDuration = `${(4.15 + Math.random() * 1.35).toFixed(2)}s`;
      ring.style.animationDelay = `${(-Math.random() * 4.8).toFixed(2)}s`;

      ring.addEventListener('animationiteration', () => {
        ring.style.setProperty('--wave-end', (1.52 + Math.random() * 0.3).toFixed(2));
        ring.style.setProperty('--wave-peak', (0.42 + Math.random() * 0.24).toFixed(2));
      });
    });
  }, [viewMode]);

  // Handle ESC key to exit tool view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && viewMode === 'tool') {
        closeTool();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode]);

  const openTool = (tool: ToolItem) => {
    const targetUrl = getAssetUrl(tool.url);
    if (tool.newTab) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setCurrentTool(tool);
    setIsLoadingTool(true);
    setViewMode('tool');
  };

  const closeTool = () => {
    setViewMode('dashboard');
    setCurrentTool(null);
    setIsLoadingTool(false);
  };

  const reloadTool = () => {
    if (iframeRef.current && currentTool) {
      setIsLoadingTool(true);
      iframeRef.current.src = getAssetUrl(currentTool.url);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return TOOLS;
    const q = searchQuery.toLowerCase().trim();
    return TOOLS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.badge.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const offlineCalcTools = useMemo(
    () => filteredTools.filter((t) => t.group === 'offline' && t.sub === 'calc'),
    [filteredTools]
  );

  const offlineAppTools = useMemo(
    () => filteredTools.filter((t) => t.group === 'offline' && t.sub === 'app'),
    [filteredTools]
  );

  const onlineTools = useMemo(
    () => filteredTools.filter((t) => t.group === 'online'),
    [filteredTools]
  );

  const totalOfflineCount = useMemo(
    () => TOOLS.filter((t) => t.group === 'offline').length,
    []
  );
  const totalOnlineCount = useMemo(
    () => TOOLS.filter((t) => t.group === 'online').length,
    []
  );

  return (
    <div className="relative min-h-screen w-full bg-[#eef7f9] text-[#1e293b] font-['Be_Vietnam_Pro',sans-serif] select-none">
      {/* ========================================================================= */}
      {/* 1. LANDING PAGE - GLASS CORE + CONCENTRIC WAVES */}
      {/* ========================================================================= */}
      {viewMode === 'landing' && (
        <div
          id="landing-page"
          className="relative flex items-center justify-center min-h-screen h-[100dvh] w-full overflow-hidden select-none transition-opacity duration-500"
          style={{ opacity: 1 }}
        >
          {/* Lotus Background */}
          <picture className="lotus-picture">
            <source srcSet={LOTUS_WEBP_SRC} type="image/webp" />
            <img
              className="landing-lotus-bg"
              src={LOTUS_PNG_SRC}
              width="2560"
              height="958"
              alt=""
              aria-hidden="true"
              decoding="async"
              fetchPriority="high"
            />
          </picture>

          {/* Center Stage */}
          <div className="landing-stage relative z-10 flex flex-col items-center justify-center p-4">
            {/* Logo with concentric pulsing water rings */}
            <div
              className="landing-logo-trigger relative flex items-center justify-center cursor-pointer group z-10"
              onClick={() => setViewMode('dashboard')}
              title="Bấm để truy cập Bộ công cụ"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setViewMode('dashboard');
              }}
            >
              {/* Concentric Water Wave Rings */}
              <div className="water-ring"></div>
              <div className="water-ring"></div>
              <div className="water-ring"></div>
              <div className="water-ring"></div>
              <div className="water-ring"></div>

              {/* Glassmorphic Logo Base with Metallic Sweep */}
              <div className="landing-logo glass-core rounded-full flex items-center justify-center overflow-hidden shadow-2xl">
                <img
                  className="landing-emblem object-contain relative z-20 transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                  src={LOGO_SRC}
                  alt="Phù hiệu VKSND"
                />
                {/* Metallic Sweep Gradient */}
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full -rotate-45 transition-transform duration-1000 ease-out group-hover:translate-x-full z-30 pointer-events-none"></div>
              </div>
            </div>

            {/* Title & Copy */}
            <div className="landing-copy text-center mt-3 space-y-2">
              <h2 className="font-bold text-slate-500 uppercase tracking-widest text-xs md:text-sm">
                Viện Kiểm Sát Nhân Dân
              </h2>
              <h1 className="font-extrabold tracking-wide text-slate-800 text-2xl sm:text-3xl md:text-4xl">
                BỘ CÔNG CỤ{' '}
                <span className="bg-gradient-to-r from-[#1d4ed8] via-[#0284c7] to-[#06b6d4] bg-clip-text text-transparent">
                  NGHIỆP VỤ
                </span>
              </h1>
              <p
                className="landing-enter-hint font-bold text-sky-600 uppercase animate-pulse pt-2 text-xs md:text-sm tracking-wider cursor-pointer hover:text-sky-700 transition-colors"
                onClick={() => setViewMode('dashboard')}
              >
                — BẤM VÀO LOGO ĐỂ TRUY CẬP —
              </p>

              {/* Official Link Badge */}
              <div className="pt-2 flex items-center justify-center flex-wrap gap-2">
                <a
                  href={OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-blue-700 border border-slate-300 text-xs font-mono shadow-sm transition-all backdrop-blur-sm"
                  title="Mở đường link chính thức"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>https://nguyenchanhthang.github.io/</span>
                </a>
                <button
                  type="button"
                  onClick={copyOfficialLink}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                  title="Sao chép đường link"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã chép link' : 'Sao chép link'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DASHBOARD - BENTO GRID VIEW */}
      {/* ========================================================================= */}
      {viewMode === 'dashboard' && (
        <div
          id="dashboard-page"
          className="visible-layout flex flex-col min-h-screen px-4 py-5 md:px-8 max-w-7xl mx-auto relative transition-opacity duration-500"
          style={{ display: 'flex', opacity: 1 }}
        >
          {/* Background Lotus Watermark */}
          <picture className="lotus-picture">
            <source srcSet={LOTUS_WEBP_SRC} type="image/webp" />
            <img
              className="dashboard-lotus-bg"
              src={LOTUS_PNG_SRC}
              width="2560"
              height="958"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </picture>

          {/* Top Header Banner */}
          <header className="header">
            <div className="header-left">
              <img
                className="header-emblem cursor-pointer"
                src={LOGO_SRC}
                alt="Biểu trưng ngành Kiểm sát"
                onClick={() => setViewMode('landing')}
                title="Quay lại trang giới thiệu"
              />
              <div className="header-copy">
                <p className="header-kicker">Hệ thống tiện ích nghiệp vụ</p>
                <h1>BỘ CÔNG CỤ HỖ TRỢ NGHIỆP VỤ KIỂM SÁT</h1>
                <div className="header-underline" aria-hidden="true">
                  <svg viewBox="0 0 280 24" preserveAspectRatio="none">
                    <path
                      className="header-heartline-base"
                      pathLength="300"
                      d="M1 13h61l8-1 7-8 9 17 9-14 8 6h50l7-1 6-6 8 13 8-10 7 4h81"
                    />
                    <path
                      className="header-heartline-pulse"
                      pathLength="300"
                      d="M1 13h61l8-1 7-8 9 17 9-14 8 6h50l7-1 6-6 8 13 8-10 7 4h81"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Quick Actions & Search */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto mt-2 sm:mt-0 justify-end flex-wrap">
              {/* Download ZIP button */}
              <a
                href={ZIP_DOWNLOAD_SRC}
                download="bo-cong-cu-kiem-sat.zip"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer backdrop-blur-sm border border-emerald-400/40"
                title="Tải trọn bộ web (ZIP) để tải lên GitHub Pages hoặc dùng Offline"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tải bản ZIP (GitHub)</span>
              </a>

              {/* Official Link Badge in Header */}
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-white/15 border border-white/30 rounded-xl text-white text-xs backdrop-blur-sm shadow-inner">
                <Globe className="w-3.5 h-3.5 text-sky-300" />
                <a
                  href={OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-mono text-[11px] font-medium"
                >
                  nguyenchanhthang.github.io
                </a>
                <button
                  type="button"
                  onClick={copyOfficialLink}
                  className="ml-1 p-1 hover:bg-white/20 rounded transition-colors text-white cursor-pointer"
                  title="Sao chép link https://nguyenchanhthang.github.io/"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="relative flex-1 sm:w-60 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                <input
                  type="text"
                  placeholder="Tìm công cụ nghiệp vụ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-7 py-2 bg-white/15 hover:bg-white/20 focus:bg-white/25 border border-white/40 focus:border-white rounded-xl text-xs md:text-sm text-white placeholder-white/70 outline-none backdrop-blur-sm transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setViewMode('landing')}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/15 hover:bg-white/25 border border-white/40 rounded-xl text-xs font-semibold text-white transition-colors"
                title="Quay về trang chào"
              >
                <Home className="w-4 h-4" />
                <span className="hidden md:inline">Trang bìa</span>
              </button>
            </div>
          </header>

          {/* Search Result Summary if active */}
          {searchQuery && (
            <div className="mb-4 flex items-center justify-between bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 shadow-sm">
              <span>
                Tìm thấy <strong>{filteredTools.length}</strong> kết quả cho từ khóa "{searchQuery}"
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Xóa tìm kiếm
              </button>
            </div>
          )}

          {/* TOOL SECTIONS */}
          <div className="tool-sections">
            {/* SECTION 1: LÀM VIỆC NGOẠI TUYẾN */}
            {(offlineCalcTools.length > 0 || offlineAppTools.length > 0) && (
              <section className="tool-section tool-section-offline" aria-labelledby="offline-tools-title">
                <div className="tool-section-header">
                  <div className="tool-section-heading">
                    <div className="tool-section-icon" aria-hidden="true">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="tool-section-title" id="offline-tools-title">
                        Làm việc ngoại tuyến
                      </h2>
                      <p className="tool-section-desc">
                        Xử lý trên máy · Không cần kết nối Internet · Bảo mật dữ liệu
                      </p>
                    </div>
                  </div>

                  <div className="tool-section-actions">
                    <span className="tool-section-count" id="offline-tools-count">
                      {totalOfflineCount} công cụ
                    </span>
                    <a
                      className="offline-download"
                      href="https://drive.google.com/drive/folders/1uvRqKyusbbbuVkBe-ucwYwP1ZPtqMVsF?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Mở thư mục Google Drive để tải bộ cài Offline mới nhất"
                    >
                      <Download className="w-4 h-4" />
                      Tải bộ công cụ Offline
                    </a>
                  </div>
                </div>

                {/* Subgroup 1: Tính toán tại chỗ */}
                {offlineCalcTools.length > 0 && (
                  <div className="tool-subgroup">
                    <div className="tool-subgroup-head">
                      <h3 className="tool-subgroup-title">Tính toán tại chỗ</h3>
                      <span className="tool-subgroup-desc">
                        Mở ngay trên trình duyệt · Không cần cài đặt
                      </span>
                    </div>

                    <div className="bento-grid">
                      {offlineCalcTools.map((tool) => (
                        <button
                          key={tool.id}
                          type="button"
                          className={`bento-card ${tool.span} ${tool.accent || ''}`}
                          onClick={() => openTool(tool)}
                        >
                          <div>
                            <div className="bento-card-top">
                              <div>
                                <span className={`bento-card-badge ${tool.badgeClass}`}>
                                  {tool.badge}
                                </span>
                                <h3 className="bento-card-title">{tool.title}</h3>
                              </div>
                              <div className="bento-illust">{tool.illust}</div>
                            </div>
                            <p className="bento-card-desc">{tool.desc}</p>
                          </div>
                          {tool.footer && <div className="bento-card-footer">{tool.footer}</div>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subgroup 2: Phần mềm chạy trên máy */}
                {offlineAppTools.length > 0 && (
                  <div className="tool-subgroup mt-6">
                    <div className="tool-subgroup-head">
                      <h3 className="tool-subgroup-title">Phần mềm chạy trên máy</h3>
                      <span className="tool-subgroup-desc">
                        Tải về, giải nén rồi chạy · Có video và slide hướng dẫn
                      </span>
                    </div>

                    <div className="bento-grid">
                      {offlineAppTools.map((tool) => (
                        <button
                          key={tool.id}
                          type="button"
                          className={`bento-card ${tool.span} ${tool.accent || ''}`}
                          onClick={() => openTool(tool)}
                        >
                          <div>
                            <div className="bento-card-top">
                              <div>
                                <span className={`bento-card-badge ${tool.badgeClass}`}>
                                  {tool.badge}
                                </span>
                                <h3 className="bento-card-title">{tool.title}</h3>
                              </div>
                              <div className="bento-illust">{tool.illust}</div>
                            </div>
                            <p className="bento-card-desc">{tool.desc}</p>
                          </div>
                          {tool.footer && <div className="bento-card-footer">{tool.footer}</div>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* SECTION 2: CÔNG CỤ TRỰC TUYẾN & AI */}
            {onlineTools.length > 0 && (
              <section className="tool-section tool-section-online" aria-labelledby="online-tools-title">
                <div className="tool-section-header">
                  <div className="tool-section-heading">
                    <div className="tool-section-icon" aria-hidden="true">
                      <Cloud className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="tool-section-title" id="online-tools-title">
                        Công cụ trực tuyến &amp; AI
                      </h2>
                      <p className="tool-section-desc">
                        Cần kết nối Internet · Trợ lý AI &amp; dịch vụ nghiệp vụ trực tuyến
                      </p>
                    </div>
                  </div>

                  <span className="tool-section-count" id="online-tools-count">
                    {totalOnlineCount} công cụ
                  </span>
                </div>

                <div className="bento-grid">
                  {onlineTools.map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      className={`bento-card ${tool.span} ${tool.accent || ''}`}
                      onClick={() => openTool(tool)}
                    >
                      <div>
                        <div className="bento-card-top">
                          <div>
                            <span className={`bento-card-badge ${tool.badgeClass}`}>
                              {tool.badge}
                            </span>
                            <h3 className="bento-card-title">{tool.title}</h3>
                          </div>
                          <div className="bento-illust">{tool.illust}</div>
                        </div>
                        <p className="bento-card-desc">{tool.desc}</p>
                      </div>
                      {tool.footer && <div className="bento-card-footer">{tool.footer}</div>}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {filteredTools.length === 0 && (
              <div className="py-16 text-center bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200">
                <FileQuestion className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                <h3 className="text-base font-bold text-slate-700">Không tìm thấy công cụ phù hợp</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Vui lòng thử lại với từ khóa khác (ví dụ: lãi suất, án phí, thời hạn, chính tả, OCR...)
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
                >
                  Xem tất cả công cụ
                </button>
              </div>
            )}
          </div>

          {/* SITE FOOTER */}
          <footer className="site-footer">
            <p className="footer-author">
              <span className="footer-label">Phát triển bởi:</span>
              <span>Nguyễn Chánh Thắng - Viện KSND Khu vực 3 - Thành phố Hồ Chí Minh</span>
              <img className="footer-logo" src={LOGO_SRC} alt="Logo ngành Kiểm sát" />
            </p>

            {/* Official Access Link display with Copy button */}
            <div className="flex items-center justify-center flex-wrap gap-2 mt-3 pt-2">
              <span className="text-xs text-slate-500 font-semibold">Đường link truy cập chính thức:</span>
              <a
                href={OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-blue-700 hover:text-blue-900 hover:underline inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>https://nguyenchanhthang.github.io/</span>
              </a>
              <button
                type="button"
                onClick={copyOfficialLink}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                title="Sao chép đường link truy cập"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã sao chép!' : 'Sao chép link'}</span>
              </button>
            </div>

            <p className="footer-contact">
              <span>Bộ công cụ đang trong giai đoạn phát triển và liên tục được cập nhật hoàn thiện.</span>
              <span>Liên hệ báo lỗi, góp ý hoàn thiện Bộ công cụ qua email: nguyenchanhthang.77@gmail.com</span>
            </p>
          </footer>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. OS WORKSPACE / FULLSCREEN TOOL VIEWER */}
      {/* ========================================================================= */}
      {viewMode === 'tool' && currentTool && (
        <>
          <div
            id="os-workspace"
            className="visible fixed inset-0 bottom-[48px] z-[500] bg-white flex flex-col"
            style={{ display: 'flex', opacity: 1 }}
          >
            {/* Window Header */}
            <div className="os-window-header visible flex items-center justify-between px-4 h-[44px] bg-gradient-to-r from-[#1e5a8a] via-[#1d4ed8] to-[#5a1f30] text-white">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="win-title font-bold text-sm truncate">{currentTool.title}</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold rounded bg-white/20">
                  {currentTool.badge}
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={reloadTool}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/25 text-white transition-colors"
                  title="Tải lại công cụ"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <a
                  href={getAssetUrl(currentTool.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/25 text-white transition-colors"
                  title="Mở tab mới"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/25 text-white transition-colors"
                  title="Toàn màn hình"
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={closeTool}
                  className="win-close ml-1 px-2.5 py-1 rounded-md bg-red-600/80 hover:bg-red-600 text-white font-bold text-sm transition-colors"
                  title="Đóng công cụ (Esc)"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Tool Iframe Container */}
            <div className="relative flex-1 w-full h-full bg-[#f8fafc] overflow-hidden">
              {isLoadingTool && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
                  <div className="os-loading-spinner mb-3"></div>
                  <p className="text-xs font-semibold text-slate-600">Đang khởi chạy công cụ...</p>
                  <p className="text-[11px] text-slate-400">{currentTool.title}</p>
                </div>
              )}

              <iframe
                ref={iframeRef}
                src={getAssetUrl(currentTool.url)}
                title={currentTool.title}
                className="w-full h-full border-none bg-white"
                allow="clipboard-read; clipboard-write; fullscreen"
                onLoad={() => setIsLoadingTool(false)}
              />
            </div>
          </div>

          {/* OS TASKBAR AT BOTTOM */}
          <div className="os-taskbar visible fixed bottom-0 left-0 right-0 h-[48px] bg-slate-50/95 backdrop-blur-md border-t border-slate-300 shadow-lg px-3 md:px-4 z-[1001] flex items-center justify-between text-xs">
            <div className="os-taskbar-left flex items-center gap-3 flex-1 min-w-0">
              <button
                type="button"
                className="os-taskbar-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e5a8a] hover:bg-[#17486f] text-white font-bold text-xs shadow-sm transition-colors"
                onClick={closeTool}
                title="Quay lại danh sách công cụ"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Menu công cụ</span>
              </button>

              <div className="os-taskbar-breadcrumb flex items-center gap-2 text-slate-600 truncate">
                <span className="breadcrumb-label text-slate-400 hidden sm:inline">Công cụ đang mở:</span>
                <span className="breadcrumb-item active font-bold text-[#1e5a8a] truncate">
                  {currentTool.title}
                </span>
              </div>
            </div>

            <div className="os-taskbar-right flex items-center gap-3 pl-3 border-l border-slate-300">
              <span className="os-clock font-semibold text-slate-700 tracking-tight" title="Thời gian hệ thống">
                {clockString}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
