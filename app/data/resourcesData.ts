// Resource type definition
export interface Resource {
  id: number;
  title: string;
  fileUrl: string; // Path to PDF in public folder
  uploadDate: string;
  size: string; // File size (e.g., "2.5 MB")
}

// Downloadable PDFs stored in public/resources.
export const resources: Resource[] = [
  {
    id: 1,
    title: "Two-Factor Authentication Bypass",
    fileUrl: "/resources/two-factor-authentication-bypass.pdf",
    uploadDate: "2026-08-07",
    size: "301 KB",
  },
  {
    id: 2,
    title: "Bug Bounty Checklist",
    fileUrl: "/resources/bug-bounty-checklist.pdf",
    uploadDate: "2026-08-07",
    size: "876 KB",
  },
  {
    id: 3,
    title: "Google Dorks Cheat Sheet",
    fileUrl: "/resources/google-dorks-cheat-sheet.pdf",
    uploadDate: "2026-08-07",
    size: "1.3 MB",
  },
  {
    id: 4,
    title: "Git Cheat Sheet",
    fileUrl: "/resources/git-cheat-sheet.pdf",
    uploadDate: "2026-08-07",
    size: "174 KB",
  },
  {
    id: 5,
    title: "HTTP Status Codes",
    fileUrl: "/resources/http-status-codes.pdf",
    uploadDate: "2026-08-07",
    size: "895 KB",
  },
  {
    id: 6,
    title: "Linux Commands Cheat Sheet",
    fileUrl: "/resources/linux-commands-cheat-sheet.pdf",
    uploadDate: "2026-08-07",
    size: "589 KB",
  },
  {
    id: 7,
    title: "Nmap Cheat Sheet",
    fileUrl: "/resources/nmap-cheat-sheet.pdf",
    uploadDate: "2026-08-07",
    size: "52 KB",
  },
  {
    id: 8,
    title: "OSINT Cheat Sheet",
    fileUrl: "/resources/osint-cheat-sheet.pdf",
    uploadDate: "2026-08-07",
    size: "1.1 MB",
  },
  {
    id: 9,
    title: "Cybersecurity Projects Guide",
    fileUrl: "/resources/projects-guide.pdf",
    uploadDate: "2026-08-07",
    size: "347 KB",
  },
  {
    id: 10,
    title: "RCE Vulnerability Cheat Sheet",
    fileUrl: "/resources/rce-vulnerability-cheat-sheet.pdf",
    uploadDate: "2026-08-07",
    size: "74 KB",
  },
  {
    id: 11,
    title: "Wi-Fi Hacking Guide",
    fileUrl: "/resources/wifi-hacking-guide.pdf",
    uploadDate: "2026-08-07",
    size: "543 KB",
  },
  {
    id: 12,
    title: "Wordlists Guide",
    fileUrl: "/resources/wordlists-guide.pdf",
    uploadDate: "2026-08-07",
    size: "3.0 MB",
  },
];
