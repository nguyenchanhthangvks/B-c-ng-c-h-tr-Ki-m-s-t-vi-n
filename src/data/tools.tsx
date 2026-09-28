import React from 'react';

export interface ToolItem {
  id: string;
  group: 'offline' | 'online';
  sub?: 'calc' | 'app';
  span: string;
  badge: string;
  badgeClass: string;
  title: string;
  desc: string;
  illust: React.ReactNode;
  url: string;
  accent?: string;
  newTab?: boolean;
  footer?: React.ReactNode;
}

export const ILLUST = {
  interest: (
    <svg viewBox="0 0 56 48" width="56" height="48" fill="none">
      <path className="fx-trace" d="M5 35c8-2 10-15 18-12s10 10 15 3 7-12 13-14" stroke="#0d9488" strokeWidth="2.4" strokeLinecap="round" />
      <g className="fx-coin-1">
        <circle cx="13" cy="15" r="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.6" />
        <path d="M13 12v6m-2-4h3a1.5 1.5 0 010 3h-3" stroke="#b45309" strokeWidth="1.2" />
      </g>
      <g className="fx-coin-2">
        <circle cx="43" cy="34" r="6" fill="#d1fae5" stroke="#059669" strokeWidth="1.6" />
        <path d="M40 34h6m-3-3v6" stroke="#047857" strokeWidth="1.3" />
      </g>
    </svg>
  ),
  courtScale: (
    <svg viewBox="0 0 56 48" width="56" height="48" fill="none">
      <path d="M28 8v32M18 42h20" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" />
      <g className="fx-balance">
        <path d="M10 15h36M28 10v5" stroke="#b45309" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M15 15l-7 15h14l-7-15zm26 0l-7 15h14l-7-15z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.7" />
        <path d="M7 30c2 5 12 5 16 0M33 30c2 5 12 5 16 0" stroke="#d97706" strokeWidth="1.7" />
      </g>
    </svg>
  ),
  judgmentScan: (
    <svg viewBox="0 0 56 48" width="56" height="48" fill="none">
      <rect x="10" y="4" width="36" height="40" rx="4" fill="#fff" stroke="#64748b" strokeWidth="1.8" />
      <path d="M17 14h22M17 21h18M17 28h21M17 35h14" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <path className="fx-scan" d="M12 9h32" stroke="#f59e0b" strokeWidth="2.4" />
      <circle cx="42" cy="39" r="5" fill="#ede9fe" stroke="#7c3aed" />
      <path d="M40 39l1.3 1.3L44 37" stroke="#7c3aed" strokeWidth="1.4" />
    </svg>
  ),
  vipShield: (
    <svg viewBox="0 0 56 48" width="56" height="48" fill="none">
      <path d="M28 4l17 6v12c0 11-7 18-17 22C18 40 11 33 11 22V10l17-6z" fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
      <circle className="fx-seal" cx="28" cy="23" r="9" fill="#f59e0b" />
      <path d="M24 23l2.7 2.8L32.5 19" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 10l3 2m15-2l-3 2" stroke="#fbbf24" strokeWidth="1.5" />
    </svg>
  ),
  lawBook: (
    <svg viewBox="0 0 56 48" width="56" height="48" fill="none">
      <path d="M6 10c9-3 16-1 22 4v28c-6-5-13-7-22-4V10z" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.8" />
      <path className="fx-page" d="M50 10c-9-3-16-1-22 4v28c6-5 13-7 22-4V10z" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.8" />
      <path d="M28 14v28M12 18h10M12 24h9M34 18h10M34 24h9" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
      <text x="23" y="35" fill="#6d28d9" fontSize="13" fontWeight="700">§</text>
    </svg>
  ),
  deadline: (
    <svg viewBox="0 0 56 48" width="56" height="48" fill="none">
      <rect x="5" y="8" width="32" height="34" rx="4" fill="#fff" stroke="#0284c7" strokeWidth="2" />
      <path d="M5 17h32M13 5v7m16-7v7" stroke="#0284c7" strokeWidth="2" />
      <path d="M12 24h5m5 0h5m-15 7h5" stroke="#7dd3fc" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="40" cy="31" r="11" fill="#ecfeff" stroke="#0891b2" strokeWidth="2" />
      <path className="fx-tick" d="M40 31v-7m0 7l5 3" stroke="#0e7490" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  mindmap: (
    <svg viewBox="0 0 56 48" width="56" height="48" fill="none">
      <path className="fx-flow" d="M17 24h12l8-12m-8 12l8 12" stroke="#10b981" strokeWidth="2" />
      <circle className="fx-node" cx="12" cy="24" r="7" fill="#059669" />
      <circle cx="41" cy="11" r="6" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
      <circle cx="41" cy="37" r="6" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
      <circle cx="12" cy="24" r="2" fill="#fff" />
    </svg>
  ),
  anonymize: (
    <svg viewBox="0 0 56 48" width="56" height="48" fill="none">
      <rect x="7" y="4" width="42" height="40" rx="4" fill="#fff" stroke="#475569" strokeWidth="1.8" />
      <path d="M14 14h26M14 22h20M14 30h25M14 37h16" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      <rect className="fx-redact" x="12" y="18" width="30" height="7" rx="2" fill="#1e293b" />
      <path d="M43 7l6 6" stroke="#ef4444" strokeWidth="2" />
    </svg>
  ),
  rename: (
    <svg viewBox="0 0 56 48" width="56" height="48" fill="none">
      <g className="fx-swap-left">
        <path d="M4 10h19l5 5v12H4V10z" fill="#fff7ed" stroke="#f97316" strokeWidth="1.8" />
        <text x="9" y="22" fill="#c2410c" fontSize="8" fontWeight="700">A</text>
      </g>
      <g className="fx-swap-right">
        <path d="M28 22h19l5 5v12H28V22z" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.8" />
        <text x="34" y="34" fill="#047857" fontSize="8" fontWeight="700">01</text>
      </g>
      <path d="M23 34h-8l3-3m-3 3l3 3M33 14h8l-3-3m3 3l-3 3" stroke="#64748b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  spellCheck: (
    <svg viewBox="0 0 56 48" width="56" height="48" fill="none">
      <path d="M8 4h30l9 9v31H8V4z" fill="#fff" stroke="#0f766e" strokeWidth="1.8" />
      <path d="M38 4v10h9M15 17h17M15 24h20M15 31h13" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 27c3-3 6 3 9 0s6 3 9 0" stroke="#ef4444" strokeWidth="1.5" />
      <path className="fx-check" d="M34 36l4 4 8-10" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ocrScan: (
    <svg viewBox="0 0 56 48" width="56" height="48" fill="none">
      <rect x="14" y="5" width="28" height="38" rx="3" fill="#fff" stroke="#8b5cf6" strokeWidth="1.7" />
      <path d="M20 16h16M20 23h13M20 30h16M20 36h10" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" />
      <g className="fx-corners" stroke="#6d28d9" strokeWidth="2.2">
        <path d="M9 15V8h7M40 8h7v7M47 33v7h-7M16 40H9v-7" />
      </g>
      <path className="fx-scan" d="M12 9h32" stroke="#06b6d4" strokeWidth="2.3" />
    </svg>
  ),
  caseFolder: (
    <svg viewBox="0 0 56 48" width="56" height="48" fill="none">
      <path d="M7 15h17l5 5h20v23H7V15z" fill="#ecfeff" stroke="#0891b2" strokeWidth="2" />
      <g className="fx-document">
        <path d="M20 8h22v27H20V8z" fill="#fff" stroke="#64748b" strokeWidth="1.7" />
        <path d="M25 15h12M25 21h12M25 27h8" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      <path d="M7 25h42v18H7V25z" fill="#cffafe" stroke="#0891b2" strokeWidth="2" />
      <circle className="fx-seal" cx="44" cy="12" r="6" fill="#f59e0b" />
      <path d="M41.5 12l1.7 1.7 3.3-3.7" stroke="#fff" strokeWidth="1.6" />
    </svg>
  ),
  compensation: (
    <svg viewBox="0 0 56 48" width="56" height="48" fill="none">
      <path d="M20 18c0-3 2-5 5-5h6c3 0 5 2 5 5v2h3a3 3 0 013 3l-3 18a4 4 0 01-4 3H21a4 4 0 01-4-3l-3-18a3 3 0 013-3h3v-2z" fill="#fdf2f8" stroke="#be123c" strokeWidth="1.8" />
      <path d="M23 15v3M33 15v3" stroke="#be123c" strokeWidth="1.8" strokeLinecap="round" />
      <text x="21" y="34" fill="#9f1239" fontSize="13" fontWeight="800">đ</text>
      <g className="fx-coin-1">
        <circle cx="43" cy="14" r="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.6" />
        <path d="M43 11v6m-2-4h3a1.5 1.5 0 010 3h-3" stroke="#b45309" strokeWidth="1.2" />
      </g>
    </svg>
  ),
  evidenceTag: (
    <svg viewBox="0 0 56 48" width="56" height="48" fill="none">
      <rect x="6" y="8" width="34" height="24" rx="3" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="2" />
      <path d="M17 38h12M23 32v6" stroke="#1d4ed8" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M11 15h18M11 20h14M11 25h10" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
      <path className="fx-flow" d="M34 19l6-6h10v10l-6 6z" fill="#fbbf24" stroke="#b45309" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="46" cy="17" r="1.8" fill="#b45309" />
      <path d="M29 12c0-3 2-5 4.5-5S38 9 38 12c0 3.5-4.5 7-4.5 7S29 15.5 29 12z" fill="#dc2626" />
      <circle cx="33.5" cy="11.8" r="1.5" fill="#fff" />
    </svg>
  ),
  limitation: (
    <svg viewBox="0 0 56 48" width="56" height="48" fill="none">
      <path d="M15 6h26M15 42h26" stroke="#1d4ed8" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M18 6c0 11 6 13 10 18-4 5-10 7-10 18M38 6c0 11-6 13-10 18 4 5 10 7 10 18" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" />
      <path d="M21 9h14c-1 4-4 7-7 9-3-2-6-5-7-9z" fill="#93c5fd" />
      <path className="fx-flow" d="M28 24v10" stroke="#f59e0b" strokeWidth="2" />
      <path d="M21 41c1-4 4-6 7-6s6 2 7 6z" fill="#fbbf24" />
    </svg>
  ),
};

export const TOOLS: ToolItem[] = [
  // Subgroup 1: Offline Calculators (Tính toán tại chỗ)
  {
    id: 'tinh-lai-suat',
    group: 'offline',
    sub: 'calc',
    span: 'span-4',
    badge: 'NGOẠI TUYẾN',
    badgeClass: 'badge-emerald',
    title: 'Tự động tính tiền lãi',
    desc: 'Tự động tính tiền lãi trong hạn, lãi quá hạn, lãi chậm trả trong giao dịch dân sự.',
    illust: ILLUST.interest,
    url: '/Tool/App_tinh_lai_suat/index.html',
    accent: '',
  },
  {
    id: 'tinh-an-phi',
    group: 'offline',
    sub: 'calc',
    span: 'span-4',
    badge: 'NGOẠI TUYẾN',
    badgeClass: 'badge-emerald',
    title: 'Tính án phí',
    desc: 'Tra cứu và tự động tính nhanh số tiền án phí hình sự và dân sự.',
    illust: ILLUST.courtScale,
    url: '/Tool/App_DS/index.html',
    accent: '',
  },
  {
    id: 'tinh-tuoi-thoi-han',
    group: 'offline',
    sub: 'calc',
    span: 'span-4',
    badge: 'NGOẠI TUYẾN',
    badgeClass: 'badge-emerald',
    title: 'Tính tuổi — Tính thời hạn',
    desc: 'Tự động tính tuổi của đối tượng, tính chính xác ngày tháng năm, giờ phút, kiểm soát chặt chẽ thời hạn tạm giữ, tạm giam tố tụng.',
    illust: ILLUST.deadline,
    url: '/Data/TinhTuoiThoiHan.html',
    accent: '',
  },
  {
    id: 'tinh-boi-thuong-thiet-hai',
    group: 'offline',
    sub: 'calc',
    span: 'span-6',
    badge: 'NGOẠI TUYẾN',
    badgeClass: 'badge-emerald',
    title: 'Tính bồi thường thiệt hại ngoài hợp đồng',
    desc: 'Tự động tính tiền bồi thường thiệt hại về tài sản, sức khỏe, tính mạng, danh dự - nhân phẩm - uy tín theo Bộ luật Dân sự.',
    illust: ILLUST.compensation,
    url: '/Data/TinhBoiThuongThietHai.html',
    accent: '',
  },
  {
    id: 'tinh-thoi-hieu-truy-cuu',
    group: 'offline',
    sub: 'calc',
    span: 'span-6',
    badge: 'NGOẠI TUYẾN',
    badgeClass: 'badge-emerald',
    title: 'Tính thời hiệu truy cứu trách nhiệm hình sự',
    desc: 'Xác định thời hiệu truy cứu trách nhiệm hình sự theo ngày xảy ra sự việc, bộ luật, điều khoản áp dụng; đối chiếu ngày hiện tại và cảnh báo còn hay hết thời hiệu.',
    illust: ILLUST.limitation,
    url: '/Data/TinhThoiHieuTruyCuu.html',
    accent: '',
  },

  // Subgroup 2: Offline Desktop Software (Phần mềm chạy trên máy)
  {
    id: 'an-danh-tool',
    group: 'offline',
    sub: 'app',
    span: 'span-6',
    badge: 'NGOẠI TUYẾN',
    badgeClass: 'badge-emerald',
    title: 'Tự động che thông tin',
    desc: 'Tự động ẩn toàn bộ thông tin cá nhân trong văn bản trước khi công bố hoặc giao cho AI xử lý.',
    illust: ILLUST.anonymize,
    url: '/Tool/AnDanh/index.html',
    accent: '',
  },
  {
    id: 'file-renamer-tool',
    group: 'offline',
    sub: 'app',
    span: 'span-6',
    badge: 'NGOẠI TUYẾN',
    badgeClass: 'badge-emerald',
    title: 'Tự động đổi tên file',
    desc: 'Tự động sửa tên file để AI dễ tiếp cận hoặc cho phép đổi tên file hàng loạt (ví dụ: Đánh số bút lục, tài liệu).',
    illust: ILLUST.rename,
    url: '/Tool/FileRenamer/index.html',
    accent: '',
  },
  {
    id: 'spell-checker-tool',
    group: 'offline',
    sub: 'app',
    span: 'span-4',
    badge: 'NGOẠI TUYẾN',
    badgeClass: 'badge-emerald',
    title: 'Rà soát chính tả văn bản Word',
    desc: 'Tự động phát hiện lỗi chính tả, cụm từ nghiệp vụ, khoảng trắng và dấu câu; xuất bản Word tô vàng vị trí cần kiểm tra hoặc bản đã sửa.',
    illust: ILLUST.spellCheck,
    url: '/Tool/SpellChecker/index.html',
    accent: '',
    footer: <span>Không AI · Không gửi dữ liệu lên mạng</span>,
  },
  {
    id: 'ocr-pdf-tool',
    group: 'offline',
    sub: 'app',
    span: 'span-4',
    badge: 'NGOẠI TUYẾN',
    badgeClass: 'badge-emerald',
    title: 'Nhận dạng chữ trong file PDF, file ảnh',
    desc: 'Tự động trích xuất chữ từ file PDF, file ảnh mà không cần kết nối mạng, cho phép chọn đầu ra (Word, Markdown, TXT).',
    illust: ILLUST.ocrScan,
    url: '/Tool/OCR_PDF_Tool/index.html',
    accent: '',
  },
  {
    id: 'gan-nhan-chung-cu',
    group: 'offline',
    sub: 'app',
    span: 'span-4',
    badge: 'NGOẠI TUYẾN',
    badgeClass: 'badge-emerald',
    title: 'Gắn nhãn chứng cứ – Trình chiếu tài liệu',
    desc: 'Gắn nhãn theo chủ đề cho điểm, trang, file tài liệu, mốc video, ghi âm của hồ sơ; cây nhãn nhiều cấp, ghi chú riêng; trình chiếu hai màn hình tại phiên tòa.',
    illust: ILLUST.evidenceTag,
    url: '/Tool/GanNhanChungCu/index.html',
    accent: '',
    footer: <span>Không kết nối mạng · Không sửa file gốc</span>,
  },

  // Group 2: Online & AI Tools (Công cụ trực tuyến & AI)
  {
    id: 'kiem-sat-ban-an-chung',
    group: 'online',
    span: 'span-6',
    badge: 'TRỰC TUYẾN',
    badgeClass: 'badge-purple',
    title: 'Kiểm sát bản án — Bản dùng chung',
    desc: 'Đối chiếu phát hiện lỗi chính tả, mâu thuẫn, vi phạm, thiếu sót trong Bản án hình sự, dân sự (bản miễn phí - dùng chung cho các đơn vị).',
    illust: ILLUST.judgmentScan,
    url: 'https://udify.app/chat/FoGbxKbFMFZSylhe',
    accent: '',
  },
  {
    id: 'notebook-lm',
    group: 'online',
    span: 'span-6',
    badge: 'TRỢ LÝ ẢO AI',
    badgeClass: 'badge-purple',
    title: 'Hình sự & Tố tụng hình sự',
    desc: 'Tra cứu Điều luật, hỗ trợ lập luận tố tụng dựa trên kho tri thức hiện hành.',
    illust: ILLUST.lawBook,
    url: 'https://notebooklm.google.com/notebook/af52b719-3125-4b4e-aaad-93432843b0ee',
    accent: '',
    newTab: true,
    footer: (
      <>
        <span>Nền tảng tri thức</span>
        <span style={{ marginLeft: 'auto', fontWeight: 700, color: '#7e22ce' }}>notebookLM</span>
      </>
    ),
  },
  {
    id: 'huong-dan-so-do-tu-duy',
    group: 'online',
    span: 'span-6',
    badge: 'HƯỚNG DẪN AI',
    badgeClass: 'badge-purple',
    title: 'Tạo sơ đồ tư duy',
    desc: 'Thao tác chi tiết và bộ promt mẫu để tạo sơ đồ tư duy tự động.',
    illust: ILLUST.mindmap,
    url: '/Data/HuongDan.html',
    accent: '',
    footer: <span>Cần kết nối Internet để sử dụng nền tảng AI</span>,
  },
  {
    id: 'thu-ly-an-ds',
    group: 'online',
    span: 'span-6',
    badge: 'CẦN KẾT NỐI MẠNG',
    badgeClass: 'badge-purple',
    title: 'Quản lý thông báo thụ lý vụ án',
    desc: 'Tự động đọc PDF scan, nhận diện thông tin vụ án và đương sự bằng Gemini; hỗ trợ quản lý hồ sơ, ghi sổ Excel và soạn thảo các văn bản kiểm sát theo mẫu.',
    illust: ILLUST.caseFolder,
    url: '/Tool/ThuLyAnDS/index.html',
    accent: '',
    footer: (
      <>
        <span>Sử dụng Gemini</span>
        <span style={{ marginLeft: 'auto', fontWeight: 700, color: '#6d28d9' }}>Phần mềm nghiệp vụ</span>
      </>
    ),
  },
];
