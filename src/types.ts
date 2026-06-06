/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PersonalInfo {
  name: string;
  englishName: string;
  major: string;
  slogan: string;
  intro: string;
  schoolName?: string;
  schoolUrl?: string;
}

export interface WorkItem {
  id: string;
  category: string;
  categorySlug: "product" | "interaction" | "curation" | string;
  title: string;
  description: string;
  imageUrl?: string;
  images?: string[]; // 3-5 16:9 images list
  videoUrl?: string;
  hasVideo?: boolean; // 是否附上视频
  linkUrl?: string; // 跳转链接 URL
  hasLinkUrl?: boolean; // 是否启用跳转链接
  tags: string[];
  mediaType: "image" | "video";
}

export interface SkillItem {
  name: string;
  level: string;
  icon: string;
}

export interface AwardItem {
  title: string;
  year: string;
  organization: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  location: string;
  github: string;
  copyright: string;
}

export interface BGMTrack {
  id: string;
  title: string;
  audioUrl: string;
  isExtracted?: boolean;
}

export interface BGMConfig {
  enabled: boolean;
  tracks: BGMTrack[];
  autoplay?: boolean;
}

export interface ThemeConfig {
  primaryColor: string; // Theme accent highlight
  backgroundColor: string; // Whole page backing
  cardBgColor: string; // Main containers and cards
  textColor: string; // Core typography ink
  accentHoverColor: string; // Hover state color
  glowEffect: boolean; // 3D dynamic mesh glow
  glassmorphism: boolean; // Blur/frosted glass backing
}

export interface SiteData {
  personalInfo: PersonalInfo;
  works: WorkItem[];
  skills: SkillItem[];
  awards: AwardItem[];
  contact: ContactInfo;
  adminPasscode?: string;
  bgm?: BGMConfig;
  theme?: ThemeConfig;
}
