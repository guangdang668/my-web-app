/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  LayoutGrid,
  Cpu,
  Layers,
  Award,
  Sliders,
  SlidersHorizontal,
  Mail,
  Check,
  Copy,
  ChevronRight,
  Eye,
  Save,
  Lock,
  Unlock,
  RefreshCw,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Compass,
  CornerDownRight,
  Monitor,
  CheckCircle2,
  Trash2,
  Plus,
  ArrowUpRight,
  SkipBack,
  SkipForward,
  Music,
  List
} from "lucide-react";
import { SiteData, WorkItem, SkillItem, AwardItem } from "./types";
import { ProjectCard } from "./components/ProjectCard";

// ==========================================
// 💡 TOP-LEVEL EDITABLE DATA STRUCTURE (siteData)
// 修改此 JavaScript 对象即相当于在使用一个高度直观的“后台”来配置全站的所有内容。
// 后续的界面将实时渲染此对象，并且点击界面右上角的“管理后台”可以使用可视化的表单来修改并永久保存。
// ==========================================
const defaultSiteData: SiteData = {
  personalInfo: {
    name: "尚杰",
    englishName: "Jerry Shang",
    major: "工业设计 / 智能硬件与人机交互",
    slogan: "用理性解构物理形态，以极简重构感官边界。",
    intro: "我是尚杰，一名专注于「精密工程制造基础」与「数字交互体验」深度融合的工业设计探索者。在我的设计哲学中，美学并不是孤立的附庸，而是高度严密的注塑/CNC量产工艺、精调人机工学倾角阻尼、以及直觉式软硬件交互协同作用下的自然产物。希望通过我的先锋方案，让前沿技术温润轻盈地消融在人们的日常感知中。"
  },
  works: [
    {
      id: "w1",
      category: "产品与工业设计",
      categorySlug: "product",
      title: "AeroHelix - 桌面级静音气流净化循环扇",
      description: "消融于生活背景的气流调节装置。运用了航空级三维流体力学螺旋曲面，将叶片安全格栅内缩，外壳采用120目超细锆砂阳极氧化铝拉伸拉丝工艺，结合内置无刷变频电机，实现如林间自然吸吐般的静音气流净化扩散形态。",
      imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop",
      tags: ["6系阳极氧化铝", "120目微锆砂喷砂", "精密曲面流体仿真"],
      mediaType: "image"
    },
    {
      id: "w2",
      category: "数字体验与交互",
      categorySlug: "interaction",
      title: "Mantis-One - 模块化触觉反馈机械控制器",
      description: "专为三维数字创作者打造的实体力反馈物理桌面节点。通过高精微马达动态调整旋转物理阻力与段落卡点，将数字雕刻/CAD设计中的笔刷硬度、画板粗糙度，极其逼真地回馈到创作者的手中，打通虚实操控壁垒。",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
      tags: ["Figma物理联动", "微处理器阻尼仿真", "触控阻力感映射"],
      mediaType: "image"
    },
    {
      id: "w3",
      category: "视觉与展览策展",
      categorySlug: "curation",
      title: "「声之透镜」折射交互装置与毕业毕业艺术展",
      description: "在极窄展位内重置光波与声频的折射关系。当观众靠近时，机械偏振亚克力屏通过轻微物理位移让刺目的背景光源渐变分散，转化为极其舒适的漫反射柔光。并引入自研流体气压传感引导现场音乐声浪波动渲染。",
      imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-minimalist-watch-dial-extreme-close-up-42171-large.mp4",
      tags: ["低气压气动电控", "液动折射柔光板", "动态视频演示"],
      mediaType: "video"
    }
  ],
  skills: [
    { name: "Rhino", level: "掌握高级精密曲面建模及微间隙分型面设计", icon: "📐" },
    { name: "Blender", level: "全物理真实折射材质光追、布料动力学仿真", icon: "🎨" },
    { name: "SolidWorks", level: "深入设计注塑壳体、抗冲击卡扣搭接及制造评估", icon: "⚙️" },
    { name: "KeyShot", level: "极高的 CMF 材料质感调校、多光谱渲染光影大师", icon: "💎" },
    { name: "Arduino / Physical", level: "掌握串口数据高速同步、传感器底层硬件消抖逻辑", icon: "⚡" },
    { name: "Figma / ProtoPie", level: "高原型交互面板设计、物理旋钮按键软硬映射联调", icon: "📱" }
  ],
  awards: [
    {
      title: "天津市“海河杯”工业设计大赛 · 一等奖",
      year: "2025",
      organization: "天津市工业和信息化局、科学技术局等联合颁发",
      description: "参赛提案《AeroHelix 净化环流扇》凭借极佳的轻盈形态美感、完备的注塑模具/金属挤压可量产评估、以及新风人机工效学应用，在全市百余所高校及设计院推荐中脱颖而出，以最高综合评分斩获一等奖金奖。"
    },
    {
      title: "天津市大学生创客创新挑战赛 · 二等奖",
      year: "2024",
      organization: "天津市教育委员会及科技发展协会",
      description: "物联网实体力回馈硬件项目《Mantis-One》在长达48小时的现场极客马拉松中完成 3D 打印树脂假组装、伺服电机控制脚本跑通及软件UI联动，最终获得评委一致青睐并荣获工程级天津赛区二等奖。"
    }
  ],
  contact: {
    email: "hshang074@gmail.com",
    location: "中国 · 天津",
    github: "github.com/shangjerry",
    copyright: "© 2026 尚杰 (Jerry Shang) 工业设计作品集. 保持严谨理性，专注于优雅落地。"
  },
  bgm: {
    enabled: true,
    tracks: [
      {
        id: "track_1",
        title: "Industrial Whisper - 工业微吟 (高保真音轨)",
        audioUrl: "https://assets.mixkit.co/music/preview/mixkit-wind-chimes-and-rain-ambient-1158.mp3",
        isExtracted: false
      },
      {
        id: "track_2",
        title: "Mechanical Rhythm - 机械律动 (极简工业底噪)",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        isExtracted: true
      },
      {
        id: "track_3",
        title: "Future Studio - 未来造物工坊 (电子律动伴奏)",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        isExtracted: false
      }
    ]
  },
  theme: {
    primaryColor: "#1d1d1f",
    backgroundColor: "#f4f4f6",
    cardBgColor: "#ffffff",
    textColor: "#1d1d1f",
    accentHoverColor: "#4f46e5",
    glowEffect: true,
    glassmorphism: true
  }
};

const FileDragDropZone: React.FC<{
  onUploadSuccess: (url: string, fileName: string) => void;
  allowedTypes: string[];
  allowedExtensions: string[];
  label: string;
  subLabel: string;
  aspectDesc?: string;
}> = ({
  onUploadSuccess,
  allowedTypes,
  allowedExtensions,
  label,
  subLabel,
  aspectDesc = "16:9 比例"
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    const matchesType = allowedTypes.includes(file.type);
    const matchesExt = allowedExtensions.includes(ext);

    if (!matchesType && !matchesExt) {
      setErrorMsg(`不支持的文件格式！仅支持 ${allowedExtensions.join(", ")}`);
      return;
    }

    setErrorMsg("");
    setIsUploading(true);

    try {
      const reader = new FileReader();
      const uploadPromise = new Promise<string>((resolve, reject) => {
        reader.onload = async () => {
          try {
            const base64Data = reader.result as string;
            const res = await fetch("/api/upload", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                fileName: file.name,
                fileType: file.type,
                base64Data: base64Data
              })
            });

            if (!res.ok) {
              const errData = await res.json();
              throw new Error(errData.error || "上传失败");
            }

            const data = await res.json();
            resolve(data.url);
          } catch (err: any) {
            reject(err.message || "上传请求失败");
          }
        };
        reader.onerror = () => reject("文件读取出错");
        reader.readAsDataURL(file);
      });

      const uploadedUrl = await uploadPromise;
      onUploadSuccess(uploadedUrl, file.name);
    } catch (err: any) {
      setErrorMsg(err.message || "服务器保存失败，请重试");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await processFile(file);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await processFile(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={triggerFileInput}
      className={`relative border border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer text-center select-none ${
        isDragActive
          ? "border-emerald-500 bg-emerald-50/40 shadow-inner scale-[0.99]"
          : "border-neutral-250 hover:border-neutral-400 hover:bg-neutral-50/50 bg-white"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={allowedExtensions.join(",")}
        onChange={handleInputChange}
        className="hidden"
      />

      {isUploading ? (
        <div className="space-y-1.5 py-1 flex flex-col items-center">
          <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin"></div>
          <p className="text-[10px] font-medium text-neutral-600">正在上传并生成链接...</p>
        </div>
      ) : (
        <div className="space-y-1">
          <div className="text-xl leading-none mb-1">
            {allowedExtensions.includes(".mp4") ? "🎥" : "🏞️"}
          </div>
          <p className="text-[10px] font-bold text-neutral-700">{label}</p>
          <p className="text-[9px] text-neutral-400">{subLabel}</p>
          {aspectDesc && (
            <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[8px] bg-neutral-100 font-mono text-neutral-400 leading-none">
              {aspectDesc}
            </span>
          )}
        </div>
      )}

      {errorMsg && (
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[90%] bg-red-50 border border-red-150 rounded px-2 py-1 text-[8px] text-red-600 leading-tight">
          ⚠️ {errorMsg}
        </div>
      )}
    </div>
  );
};

export default function App() {
  // Configured React State to load dynamically
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [loading, setLoading] = useState<boolean>(true);

  // Page visits tracking statistics
  const [visitCount, setVisitCount] = useState<number>(0);

  // Guest Messages States
  const [messages, setMessages] = useState<any[]>([]);
  const [activeAdminTab, setActiveAdminTab] = useState<"edit" | "messages">("edit");

  // Foot Guest contact form state
  const [msgForm, setMsgForm] = useState({
    name: "",
    email: "",
    category: "设计及打样开发合作",
    phone: "",
    content: ""
  });
  const [msgSending, setMsgSending] = useState<boolean>(false);
  const [msgStatus, setMsgStatus] = useState<"idle" | "success" | "error">("idle");
  const [msgFeedback, setMsgFeedback] = useState<string>("");

  // BGM playback states
  const [bgmPlaying, setBgmPlaying] = useState<boolean>(false);
  const [bgmVolume, setBgmVolume] = useState<number>(0.5);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [playlistSelectorOpen, setPlaylistSelectorOpen] = useState<boolean>(false);
  const [freqSpectrum, setFreqSpectrum] = useState<number[]>(Array(12).fill(2));
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  // Guest message popup state
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

  // Interface view & language states
  const [copied, setCopied] = useState<boolean>(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");

  // Video UI States
  const [videoPlaying, setVideoPlaying] = useState<boolean>(true);
  const [videoMuted, setVideoMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Admin / CMS Backoffice States
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [passcodeError, setPasscodeError] = useState<string>("");
  const [editAdminPasscode, setEditAdminPasscode] = useState<string>("admin123");

  // Editor Draft States (Buffer)
  const [editPersonal, setEditPersonal] = useState<any>({ ...defaultSiteData.personalInfo });
  const [editWorks, setEditWorks] = useState<WorkItem[]>([ ...defaultSiteData.works ]);
  const [editSkills, setEditSkills] = useState<SkillItem[]>([ ...defaultSiteData.skills ]);
  const [editAwards, setEditAwards] = useState<AwardItem[]>([ ...defaultSiteData.awards ]);
  const [editContact, setEditContact] = useState<any>({ ...defaultSiteData.contact });
  
  // Theme & BGM Settings Editor drafts
  const [editTheme, setEditTheme] = useState<any>({ ...(defaultSiteData.theme || {}) });
  const [editBgm, setEditBgm] = useState<any>({ ...(defaultSiteData.bgm || {}) });

  // Sync Progress Monitor states
  const [saveProgress, setSaveProgress] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorDetails, setErrorDetails] = useState<string>("");

  // Fetch from Node.js Express data store on startup & record visit page view
  useEffect(() => {
    // 1. Fetch site layout config
    fetch("/api/site-data")
      .then((res) => {
        if (!res.ok) throw new Error("没有读取到云端存储文件，加载默认内置数据。");
        return res.json();
      })
      .then((data) => {
        if (data && data.personalInfo) {
          // Fill properties down
          const merged = {
            ...defaultSiteData,
            ...data,
            theme: { ...defaultSiteData.theme, ...(data.theme || {}) },
            bgm: { ...defaultSiteData.bgm, ...(data.bgm || {}) }
          };
          setSiteData(merged);
          syncFormBuffers(merged);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Backend read info or running stand-alone client side:", err.message);
        // Instant graceful client-only fallback to top siteData constants
        setSiteData(defaultSiteData);
        syncFormBuffers(defaultSiteData);
        setLoading(false);
      });

    // 2. Track landing visits count
    fetch("/api/visit", { method: "POST" })
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          setVisitCount(resData.count);
        }
      })
      .catch(err => console.log("Visit increment err:", err));

    // 3. Load all historic guest messages
    fetch("/api/messages")
      .then(res => res.json())
      .then(msgList => {
        if (Array.isArray(msgList)) {
          setMessages(msgList);
        }
      })
      .catch(err => console.log("Messages load err:", err));
  }, []);

  // Simulating sound frequency waves when music playing dynamically
  useEffect(() => {
    let timer: any;
    if (bgmPlaying) {
      timer = setInterval(() => {
        setFreqSpectrum(() => {
          return Array(12).fill(0).map(() => {
            return Math.floor(Math.random() * 55) + 5;
          });
        });
      }, 100);
    } else {
      setFreqSpectrum(Array(12).fill(2));
    }
    return () => clearInterval(timer);
  }, [bgmPlaying]);

  // Synchronize audio element source and volume
  useEffect(() => {
    const tracksList = siteData.bgm?.tracks || [];
    const currentTrack = tracksList[currentTrackIndex];
    const player = bgmRef.current;
    
    if (player) {
      player.volume = bgmVolume;
      if (currentTrack) {
        const targetSrc = currentTrack.audioUrl;
        // Check if source actually changed before setting to prevent double reload glitches
        if (player.src !== targetSrc) {
          player.src = targetSrc;
          player.load();
          if (bgmPlaying) {
            player.play()
              .then(() => setBgmPlaying(true))
              .catch(err => {
                console.warn("Audio autoplay blocked by browser policy. Keep standby.", err);
                setBgmPlaying(false);
              });
          }
        }
      }
    }
  }, [currentTrackIndex, siteData.bgm?.tracks]);

  // Handle auto-advance when a track finishes playing
  useEffect(() => {
    const player = bgmRef.current;
    if (!player) return;

    const handleEnded = () => {
      const tracksList = siteData.bgm?.tracks || [];
      if (tracksList.length > 1) {
        const nextIdx = (currentTrackIndex + 1) % tracksList.length;
        setCurrentTrackIndex(nextIdx);
      }
    };

    player.addEventListener("ended", handleEnded);
    return () => {
      player.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex, siteData.bgm?.tracks]);

  const syncFormBuffers = (data: SiteData) => {
    setEditPersonal({ ...data.personalInfo });
    setEditWorks(JSON.parse(JSON.stringify(data.works)));
    setEditSkills(JSON.parse(JSON.stringify(data.skills)));
    setEditAwards(JSON.parse(JSON.stringify(data.awards)));
    setEditContact({ ...data.contact });
    setEditAdminPasscode(data.adminPasscode || "admin123");
    setEditTheme({ ...defaultSiteData.theme, ...(data.theme || {}) });
    setEditBgm({ ...defaultSiteData.bgm, ...(data.bgm || {}) });
  };

  // Live Sync POST API controller
  const handleSaveToBackend = async () => {
    setSaveProgress("saving");
    setErrorDetails("");

    const payload: SiteData = {
      personalInfo: editPersonal,
      works: editWorks,
      skills: editSkills,
      awards: editAwards,
      contact: editContact,
      adminPasscode: editAdminPasscode,
      theme: editTheme,
      bgm: editBgm
    };

    try {
      const response = await fetch("/api/site-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("服务器返回了错误状态: " + response.status);
      }

      const result = await response.json();
      if (result.success) {
        setSiteData(payload);
        setSaveProgress("success");
        setTimeout(() => setSaveProgress("idle"), 2500);
      } else {
        throw new Error(result.error || "写入服务端未成功");
      }
    } catch (e: any) {
      console.error(e);
      setSaveProgress("error");
      setErrorDetails(e.message || "请求服务器错误，可能程序正处于纯静态演示模式。数据保留于当前页面状态。");
    }
  };

  // Submit guest message from viewer forms
  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgForm.content) {
      setMsgStatus("error");
      setMsgFeedback("留言内容不能为空，请先键入您的一段话。");
      return;
    }

    setMsgSending(true);
    setMsgStatus("idle");
    setMsgFeedback("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: msgForm.name || "匿名访客",
          email: msgForm.email || "anonymous@local",
          category: msgForm.category || "匿名日常留言",
          phone: msgForm.phone || "",
          content: msgForm.content
        })
      });

      const resData = await res.json();
      if (res.ok) {
        setMsgStatus("success");
        setMsgFeedback(resData.message || "安全投递成功！非常感谢您的宝贵留言。");
        // Clear message form inputs
        setMsgForm({ name: "", email: "", category: "设计及打样开发合作", phone: "", content: "" });
        
        // Refresh the local messages cache list so admin sees it if online
        if (resData.data) {
          setMessages(prev => [resData.data, ...prev]);
        }
        
        // Auto fadeout and close modal after 1.5 seconds
        setTimeout(() => {
          setIsFeedbackOpen(false);
          setMsgStatus("idle");
          setMsgFeedback("");
        }, 1500);
      } else {
        throw new Error(resData.error || "提交失败，请稍后重试");
      }
    } catch (err: any) {
      setMsgStatus("error");
      setMsgFeedback(err.message || "提交失败，请稍微重试。");
    } finally {
      setMsgSending(false);
    }
  };

  // Delete message as an authorized admin
  const handleDeleteMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      const resData = await res.json();
      if (res.ok) {
        setMessages(prev => prev.filter(m => m.id !== id));
      } else {
        alert("删除失败: " + (resData.error || "未知原因"));
      }
    } catch (err: any) {
      alert("删除请求发生错误: " + err.message);
    }
  };

  // Toggle Background Audio channels
  const handleToggleBGM = () => {
    if (bgmRef.current) {
      if (bgmPlaying) {
        bgmRef.current.pause();
        setBgmPlaying(false);
      } else {
        bgmRef.current.play()
          .then(() => setBgmPlaying(true))
          .catch(err => {
            console.warn("Audio autoplay blocked. Retry playing on manual interact:", err);
            setBgmPlaying(true);
          });
      }
    }
  };

  // Adjust background sound intensity values
  const handleBGMVolumeChange = (value: number) => {
    setBgmVolume(value);
    if (bgmRef.current) {
      bgmRef.current.volume = value;
    }
  };

  // Auth unlock
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPasscode = siteData.adminPasscode || "admin123";
    if (passcode === currentPasscode) {
      setIsAuthenticated(true);
      setPasscodeError("");
    } else {
      setPasscodeError("口令错误，请重新输入");
    }
  };

  // Video controller handlers
  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log("Video fail:", err));
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoMuted;
      setVideoMuted(!videoMuted);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(siteData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToComponent = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Form helpers for deep updates
  const handleWorkFieldChange = (idx: number, field: keyof WorkItem, value: any) => {
    const updated = [...editWorks];
    updated[idx] = { ...updated[idx], [field]: value };
    setEditWorks(updated);
  };

  const tracksList = siteData.bgm?.tracks || [];
  const currentTrack = tracksList[currentTrackIndex] || null;
  const currentTrackUrl = currentTrack ? currentTrack.audioUrl : "";

  return (
    <div
      id="root-viewport"
      style={{ 
        fontFamily: '"PingFang SC", "Microsoft YaHei", -apple-system, sans-serif',
        backgroundColor: "var(--bg-page)",
        color: "var(--text-main)"
      }}
      className="min-h-screen font-sans antialiased select-text selection:bg-[var(--primary-accent)] selection:text-white transition-colors duration-500"
    >
      {/* Dynamic theme style injection */}
      <style>{`
        :root {
          --primary-accent: ${siteData.theme?.primaryColor || '#1d1d1f'};
          --bg-page: ${siteData.theme?.backgroundColor || '#f4f4f6'};
          --bg-card: ${siteData.theme?.cardBgColor || '#ffffff'};
          --text-main: ${siteData.theme?.textColor || '#1d1d1f'};
          --accent-hover: ${siteData.theme?.accentHoverColor || '#4f46e5'};
        }
        
        /* Glow style customizations */
        .theme-glow {
          box-shadow: ${(siteData.theme?.glowEffect !== false) ? '0 10px 40px -10px var(--primary-accent)' : 'none'};
        }
        .theme-glass {
          backdrop-filter: ${(siteData.theme?.glassmorphism !== false) ? 'blur(12px)' : 'none'};
        }
        
        /* Accent styling classes */
        .bg-primary-accent { background-color: var(--primary-accent) !important; }
        .text-primary-accent { color: var(--primary-accent) !important; }
        .border-primary-accent { border-color: var(--primary-accent) !important; }
        .hover\\:bg-accent-hover:hover { background-color: var(--accent-hover) !important; }
        .hover\\:text-primary-accent:hover { color: var(--primary-accent) !important; }
      `}</style>

      {/* Hidden browser native BGM playback node */}
      {siteData.bgm?.enabled && currentTrackUrl && (
        <audio
          ref={bgmRef}
          src={currentTrackUrl}
          preload="auto"
          style={{ display: "none" }}
        />
      )}

      {/* Precision Micro Header */}
      <header
        id="navbar-system"
        style={{ backgroundColor: "var(--bg-page)", opacity: 0.95 }}
        className="sticky top-0 z-40 backdrop-blur-md border-b border-neutral-200/50 transition-all duration-300"
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => scrollToComponent("hero-section")}
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-mono font-bold text-sm tracking-wider shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-105">
              JS
            </div>
            <div className="text-left leading-none">
              <span className="font-mono text-xs tracking-wider uppercase font-bold text-neutral-900 block">
                {siteData.personalInfo.englishName}
              </span>
              <span className="text-[10px] text-neutral-400 font-mono tracking-widest mt-1 block">
                INDUSTRIAL DESIGNER
              </span>
            </div>
          </div>

          <nav className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => scrollToComponent("works-section")}
                className="text-xs tracking-widest font-medium text-neutral-500 hover:text-neutral-900 transition focus:outline-none cursor-pointer"
              >
                作品画廊
              </button>
              <button
                onClick={() => scrollToComponent("skills-section")}
                className="text-xs tracking-widest font-medium text-neutral-500 hover:text-neutral-900 transition focus:outline-none cursor-pointer"
              >
                专业工具
              </button>
              <button
                onClick={() => scrollToComponent("awards-section")}
                className="text-xs tracking-widest font-medium text-neutral-500 hover:text-neutral-900 transition focus:outline-none cursor-pointer"
              >
                荣耀竞赛
              </button>
            </div>

            {/* Quick action: Visual backend drawer config */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-4 py-2 border border-neutral-300 bg-white/70 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 hover:shadow-md active:scale-95 transition-all text-xs font-medium rounded-full flex items-center space-x-2 cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>在线数据后台</span>
            </button>
          </nav>
        </div>
      </header>

      {loading ? (
        <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
          <RefreshCw className="w-8 h-8 animate-spin text-neutral-400" />
          <p className="font-mono text-xs text-neutral-400">正在云端同步数据存储...</p>
        </div>
      ) : (
        <main className="pb-24">
          {/* Main Hero Section */}
          <section id="hero-section" className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between max-w-6xl mx-auto px-6 py-12">
            <div>{/* Spacing alignment */}</div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-6">
              <div className="lg:col-span-8 space-y-8">
                {/* Active Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center space-x-2 px-3 py-1 bg-neutral-200/80 rounded-md border border-neutral-300/30 text-[10px] tracking-widest font-bold text-neutral-600 uppercase"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block animate-pulse"></span>
                  <span>{siteData.personalInfo.major}</span>
                </motion.div>

                {/* Big Title */}
                <div className="space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-semibold tracking-tight text-neutral-900 leading-[1.05]"
                  >
                    {siteData.personalInfo.name}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-xl md:text-2xl font-light text-neutral-500 tracking-wide"
                  >
                    {siteData.personalInfo.slogan}
                  </motion.p>
                </div>

                {/* Detailed bio */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-neutral-650 text-sm md:text-base leading-relaxed max-w-3xl font-light text-neutral-600"
                >
                  {siteData.personalInfo.intro}
                </motion.p>

                {/* Grid controls / CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="pt-4 flex flex-wrap gap-4"
                >
                  <button
                    onClick={() => scrollToComponent("works-section")}
                    className="group px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center space-x-2 shadow-sm cursor-pointer"
                  >
                    <span>查阅设计成果</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => scrollToComponent("skills-section")}
                    className="px-6 py-3.5 border border-neutral-300 bg-white/50 hover:bg-neutral-50 text-neutral-700 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer"
                  >
                    评测专业技能
                  </button>
                </motion.div>
              </div>

              {/* Blueprint Blueprint Frame Graphics Accent */}
              <div className="hidden lg:col-span-4 justify-self-center relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="w-72 h-72 border border-dashed border-neutral-300 rounded-3xl flex items-center justify-center p-6 bg-white/25 backdrop-blur-sm"
                >
                  <div className="w-full h-full border border-neutral-300/60 rounded-2xl flex flex-col justify-between p-4 relative bg-neutral-100 shadow-[inset_0_2px_8px_rgba(0,0,0,0.03)]">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[9px] tracking-widest text-neutral-400">PROJECT_01 // J_SHANG</span>
                      <span className="font-mono text-[9px] text-neutral-400">SYS v2.6 // 2026</span>
                    </div>

                    {/* Radial blueprint wheel */}
                    <div className="w-32 h-32 rounded-full border border-neutral-300/75 mx-auto flex items-center justify-center relative">
                      <div className="w-24 h-24 rounded-full border border-neutral-300/40 border-dashed flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-neutral-900/10 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-neutral-900 animate-pulse" />
                        </div>
                      </div>
                      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-neutral-300 -translate-x-1/2" />
                      <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-neutral-300 -translate-y-1/2" />
                      <span className="absolute -bottom-2 px-1 bg-neutral-100 font-mono text-[8px] text-neutral-400">R:85.5mm (RANC_ANGLE)</span>
                    </div>

                    <div className="flex justify-between items-end font-mono text-[8px] text-neutral-400 leading-none">
                      <span>POS_X: 24.15</span>
                      <span>POS_Y: 89.04</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center cursor-pointer hover:opacity-60 transition pt-6 pb-2"
              onClick={() => scrollToComponent("works-section")}
            >
              <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase mb-2">
                向 下 滚 动 探 索 网 格 画 廊
              </span>
              <div className="w-5 h-9 border border-neutral-300 rounded-full flex justify-center p-1">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-2 bg-neutral-400 rounded-full"
                />
              </div>
            </motion.div>
          </section>

          {/* Categorized Works Section */}
          <section id="works-section" className="py-24 border-y border-neutral-200 bg-neutral-50 px-6">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/80 pb-8">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <LayoutGrid className="w-4 h-4 text-neutral-400" />
                    <span className="font-mono text-xs tracking-wider uppercase font-semibold text-neutral-400">
                      CASE STUDIES GALLERY // 02
                    </span>
                  </div>
                  <h2 className="text-3.5xl md:text-4xl font-semibold tracking-tight text-neutral-900 leading-none">
                    核心作品画廊
                  </h2>
                </div>

                {/* Tab Filter buttons - 100% compliant with the 3 categories */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "全量视野" },
                    { id: "product", label: "产品与工业设计" },
                    { id: "interaction", label: "数字体验与交互" },
                    { id: "curation", label: "视觉与展览策展" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategoryFilter(tab.id)}
                      className={`px-4 py-2 text-xs font-medium tracking-wide rounded-lg transition-all focus:outline-none cursor-pointer ${
                        activeCategoryFilter === tab.id
                          ? "bg-neutral-900 text-white shadow-sm"
                          : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Works Grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {siteData.works
                  .filter((w) => activeCategoryFilter === "all" || w.categorySlug === activeCategoryFilter)
                  .map((work, index) => (
                    <ProjectCard
                      key={work.id || index}
                      work={work}
                      index={index}
                    />
                  ))}
              </div>
            </div>
          </section>

          {/* Software, Tools & Methodology Profile */}
          <section id="skills-section" className="py-24 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-neutral-200">
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <span className="font-mono text-xs tracking-wider uppercase font-semibold text-neutral-400 block">
                SOFTWARE FOCUSES // 03
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight">
                专业设计工具与工程验证技术链
              </h2>
              <p className="text-neutral-500 text-xs md:text-sm leading-relaxed font-light">
                极简主义并不等同于装饰物的缺失，它是严密逻辑和先进数字化软件工程相结合的极致凝练。我借助业界公认的设计软件，打通高精建模、真实感质感探索到微弱阻尼联调。
              </p>

              {/* Minimal Education box summary */}
              <div className="p-5 bg-white border border-neutral-200 rounded-xl space-y-3 shadow-sm text-left">
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 block">
                  教育工程学术基座
                </span>
                <div className="flex items-center space-x-2 text-neutral-800">
                  <div className="p-1 px-2 rounded bg-neutral-100 text-[10px] font-mono tracking-wider">UNIV</div>
                  {siteData.personalInfo.schoolUrl ? (
                    <a
                      href={siteData.personalInfo.schoolUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold hover:text-black hover:underline transition flex items-center gap-1 group"
                    >
                      <span>{siteData.personalInfo.schoolName || "国立设计与艺术学院 · 工业设计专业"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 inline-block text-neutral-400 group-hover:text-black transition" />
                    </a>
                  ) : (
                    <span className="text-xs font-semibold">{siteData.personalInfo.schoolName || "国立设计与艺术学院 · 工业设计专业"}</span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-500 leading-relaxed font-light">
                  系统性学习人机可用性分析、高阶形态语意学与近代 CMF 设计潮流，保持对机械结构的敬畏与偏好。点击可跳转访问学校官方主页。
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {siteData.skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="p-5 rounded-xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md transition-all duration-350 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg bg-neutral-100 p-2 rounded-lg leading-none inline-block">
                      {skill.icon || "🎨"}
                    </span>
                    <span className="font-mono text-[9px] text-neutral-300 uppercase tracking-widest font-semibold">
                      TOOLSET
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-neutral-900 font-mono tracking-wider uppercase">
                      {skill.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 leading-relaxed font-light font-sans">
                      {skill.level}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Awards & Competitions Section */}
          <section id="awards-section" className="py-24 max-w-6xl mx-auto px-6 space-y-12">
            <div className="space-y-3 text-center">
              <span className="font-mono text-xs tracking-wider uppercase font-semibold text-neutral-400">
                DISTINCTIONS & WINNING ENTRIES // 04
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 leading-none">
                竞赛获奖与学术凭证
              </h2>
              <div className="w-8 h-0.5 bg-neutral-900 mx-auto mt-4" />
              <p className="text-neutral-500 text-xs md:text-sm max-w-xl mx-auto font-light leading-relaxed">
                这些项目代表着在真实天津市级工程规格对抗下的极致表现，它们融汇了结构坚韧、机电稳定与产品美学。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {siteData.awards.map((award, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-400 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-300 space-y-4 text-left"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-[9px] font-mono tracking-wider font-bold text-neutral-400 bg-neutral-100 h-5 px-2 rounded inline-flex items-center">
                        🏆 竞赛学术认定
                      </div>
                      <h3 className="text-base font-bold text-neutral-900 pt-1.5 leading-snug">
                        {award.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-bold text-neutral-400">{award.year}</span>
                  </div>

                  <p className="text-xs text-neutral-600 font-light leading-relaxed">
                    {award.description}
                  </p>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-450">
                    <span className="text-neutral-400">主办及认定：</span>
                    <span className="font-semibold text-neutral-700">{award.organization}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Contact Footer Banner */}
          <footer id="contact-banner" className="bg-neutral-950 text-white rounded-3xl max-w-6xl mx-auto mx-6 p-8 md:p-14 space-y-8 relative overflow-hidden">
            {/* Ambient vector lights */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-25 pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-white text-black flex items-center justify-center font-mono font-bold text-sm">
                    JS
                  </div>
                  <div>
                    <h4 className="font-semibold tracking-tight text-white leading-none text-sm">
                      {siteData.personalInfo.name} 工业设计工作室
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-1.5 block">
                      Rationality & Precision Craftsmanship
                    </span>
                  </div>
                </div>

                <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed max-w-md">
                  如果您有任何工业造型、C4D/Blender 渲染、人机反馈打样、毕设代工需求，欢迎随时发送邮件或通过留言板咨询，一起使精细的造物落地于世。
                </p>

                {/* Preferred Direct Email channel */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 space-y-2 max-w-sm">
                  <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-neutral-500">
                    <span>独立联络邮箱 EMAIL CHANNELS</span>
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="text-[9px] text-emerald-400 font-semibold inline-flex items-center"
                        >
                          已成功复制到剪切板
                        </motion.span>
                      ) : (
                        <span>点击框复制</span>
                      )}
                    </AnimatePresence>
                  </div>

                  <div
                    onClick={handleCopy}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 cursor-pointer transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <Mail className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                      <span className="font-mono text-xs text-neutral-200 group-hover:text-white truncate">
                        {siteData.contact.email}
                      </span>
                    </div>
                    <div className="p-1 px-1.5 rounded bg-neutral-950 text-neutral-400 group-hover:text-white transition cursor-pointer">
                      <Copy className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <div className="font-mono text-[9px] text-neutral-500 tracking-wider">
                  SERVER STATUS // <span className="text-emerald-400 font-semibold animate-pulse">PORT 3000 ONLINE</span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5 text-left">
                <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block">
                  直接致信留言 // DIRECT MESSAGING BOARD
                </span>

                {/* Minimalist prompt box with single clickable button */}
                <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 font-sans">
                  <div className="space-y-1.5 text-left">
                    <span className="font-mono text-[9px] tracking-widest text-[#efefef] bg-neutral-800 px-2.5 py-0.5 rounded font-bold uppercase inline-block">
                      📬 ANONYMOUS INBOX // 匿名留言专线
                    </span>
                    <h4 className="text-xs font-bold text-white pt-1">免签名即时投递留言</h4>
                    <p className="text-neutral-400 text-[11px] leading-relaxed font-light">
                      这里提供了一个简易且安全匿名的交互通道。您无需填写繁重的个人资料与电邮地址，只需点击下方按钮，输入一段话即可轻量发送。
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsFeedbackOpen(true)}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition duration-250 hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>💬 立即匿名留言</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono text-neutral-600 gap-4">
              <p>{siteData.contact.copyright}</p>
              <div className="flex items-center space-x-4">
                <span className="text-neutral-700 bg-neutral-900 px-2 py-0.5 rounded text-[8px]">SYS_PORT_3000</span>
                <span className="text-neutral-500">天津赛区技术支持</span>
              </div>
            </div>
          </footer>

          {/* Floating BGM Controller widget */}
          {siteData.bgm?.enabled && tracksList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--primary-accent)",
                color: "var(--text-main)"
              }}
              className="fixed bottom-6 left-6 z-40 p-3 rounded-2xl border border-neutral-200 shadow-[0_12px_45px_rgba(0,0,0,0.11)] flex flex-col backdrop-blur-md bg-opacity-95 text-left w-80 select-none font-sans space-y-2.5 transition-all duration-300"
            >
              <div className="flex items-center space-x-3.5">
                {/* Vinyl record spinning control element */}
                <div 
                  className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-neutral-900 border-2 border-primary-accent overflow-hidden shadow-inner cursor-pointer" 
                  onClick={handleToggleBGM}
                >
                  <motion.div
                    animate={{ rotate: bgmPlaying ? 360 : 0 }}
                    transition={{ ease: "linear", duration: 8, repeat: Infinity }}
                    className="absolute inset-0 rounded-full flex items-center justify-center bg-[conic-gradient(from_0deg,#242424,#181818,#2d2d2d,#181818,#242424)]"
                  >
                    {/* Groove rings */}
                    <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center border border-white/5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary-accent)] shadow-[0_0_8px_var(--primary-accent)]" />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Play action overlay state indicator */}
                  {!bgmPlaying && (
                    <div className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white text-[9px] font-bold">
                      <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-widest text-[#8b8b8b] uppercase font-bold">
                      {bgmPlaying ? "📡 音乐流播放中" : "📡 SOUND DECK STANDBY"}
                    </span>
                    
                    {/* Interactive frequency spectrum bands */}
                    <div className="flex items-end space-x-0.5 h-3 pb-0.5">
                      {freqSpectrum.map((val, idx) => (
                        <div
                          key={idx}
                          style={{
                            height: `${Math.max(15, val)}%`,
                            backgroundColor: "var(--primary-accent)",
                            transition: "height 0.12s cubic-bezier(0.4, 0, 0.2, 1)"
                          }}
                          className="w-[2px] rounded-t-xs"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="text-[11px] font-bold truncate tracking-wide text-[var(--text-main,#191919)] pr-1 leading-tight flex items-center space-x-1.5">
                      <span className="text-primary-accent">▫</span>
                      <span className="truncate">{currentTrack ? currentTrack.title : "暂未配置音轨"}</span>
                    </h4>
                    <div className="text-[9px] text-neutral-400 font-mono flex items-center justify-between">
                      <span>TRACK {currentTrackIndex + 1}/{tracksList.length}</span>
                      <span>VOL: {Math.round(bgmVolume * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Prev, Play, Next, Playlist Menu Selector, Volume */}
              <div className="flex items-center justify-between pt-1 border-t border-neutral-100 gap-2">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => {
                      const prevIdx = (currentTrackIndex - 1 + tracksList.length) % tracksList.length;
                      setCurrentTrackIndex(prevIdx);
                    }}
                    title="上一首"
                    className="p-1.5 rounded-lg bg-neutral-50 hover:bg-neutral-150 transition cursor-pointer text-neutral-600 hover:text-neutral-900 focus:outline-none"
                  >
                    <SkipBack className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleToggleBGM}
                    title={bgmPlaying ? "暂停" : "播放"}
                    className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition cursor-pointer text-neutral-800 hover:text-black focus:outline-none"
                  >
                    {bgmPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      const nextIdx = (currentTrackIndex + 1) % tracksList.length;
                      setCurrentTrackIndex(nextIdx);
                    }}
                    title="下一首"
                    className="p-1.5 rounded-lg bg-neutral-50 hover:bg-neutral-150 transition cursor-pointer text-neutral-600 hover:text-neutral-900 focus:outline-none"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setPlaylistSelectorOpen(!playlistSelectorOpen)}
                    title="查看歌单列表"
                    className={`p-1.5 rounded-lg transition cursor-pointer focus:outline-none flex items-center space-x-1 ${
                      playlistSelectorOpen 
                        ? "bg-[var(--primary-accent)] text-white" 
                        : "bg-neutral-50 hover:bg-neutral-150 text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center space-x-1.5 flex-1 max-w-28">
                  <Volume2 className="w-3 h-3 text-neutral-400 shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={bgmVolume}
                    onChange={(e) => handleBGMVolumeChange(parseFloat(e.target.value))}
                    className="flex-1 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[var(--primary-accent)] focus:outline-none"
                    style={{ background: `linear-gradient(to right, var(--primary-accent) ${bgmVolume * 100}%, #e5e7eb ${bgmVolume * 100}%)` }}
                  />
                </div>
              </div>

              {/* Expandable Tracks Quick Selector Menu overlay */}
              <AnimatePresence>
                {playlistSelectorOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-neutral-150 pt-2.5 overflow-hidden text-xs max-h-48 overflow-y-auto space-y-1 animate-none"
                  >
                    <div className="text-[9px] font-mono uppercase text-neutral-400 px-1 font-bold tracking-wider">
                      💽 精选乐章歌单列表 // PLAYLIST SELECTOR
                    </div>
                    {tracksList.map((track, idx) => (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => {
                          setCurrentTrackIndex(idx);
                          // Auto trigger play if selected manually
                          if (!bgmPlaying) {
                            setTimeout(() => {
                              if (bgmRef.current) {
                                bgmRef.current.play()
                                  .then(() => setBgmPlaying(true))
                                  .catch(err => console.log("Manual load autoplay block:", err));
                              }
                            }, 100);
                          }
                        }}
                        className={`w-full text-left p-1.5 rounded-lg flex items-center justify-between text-[11px] transition duration-150 ${
                          idx === currentTrackIndex 
                            ? "bg-neutral-150 font-bold text-black border-l-2 border-primary-accent pl-2" 
                            : "hover:bg-neutral-50 text-neutral-600 hover:text-black"
                        }`}
                      >
                        <span className="truncate flex items-center space-x-1.5 min-w-0">
                          <span className="opacity-50 shrink-0">{idx + 1}.</span>
                          <span className="truncate">{track.title}</span>
                        </span>
                        {track.isExtracted && (
                          <span className="text-[7px] text-emerald-600 bg-emerald-50 px-1 rounded shrink-0 scale-90">提纯</span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </main>
      )}

      {/* Slide-out CMS Drawer / Dynamic Config Panel */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            {/* Ambient Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm"
              onClick={() => setIsAdminOpen(false)}
            />

            {/* Sliding Panel Body */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10"
            >
              {/* Drawer Header */}
              <div className="h-20 border-b border-neutral-200 px-6 flex items-center justify-between bg-neutral-50">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded bg-neutral-900 text-white flex items-center justify-center font-mono font-bold text-xs shadow-sm">
                    CMS
                  </div>
                  <div className="text-left leading-none">
                    <h3 className="text-xs font-bold text-neutral-900 uppercase">
                      Jerry Portfolio Web Editor
                    </h3>
                    <span className="text-[9px] font-mono text-neutral-400 mt-0.5 block">
                      修改此表单并点击“写盘保存”，即可同步写盘至服务器。
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="p-1 px-1.5 rounded-full hover:bg-neutral-200 text-neutral-400 hover:text-neutral-900 transition focus:outline-none cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Central Area: Auth barrier or form fields */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 select-text">
                {!isAuthenticated ? (
                  // Lock / Authentication screen
                  <div className="h-full flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6">
                    <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 shadow-xs">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-neutral-900">保护验证屏障</h4>
                      <p className="text-xs text-neutral-500 font-light leading-normal">
                        为防止无意的脚本破坏对作品、姓名和竞评荣誉的修改，我们需要进行简单口令认证。
                      </p>
                    </div>

                    <form onSubmit={handleAuthSubmit} className="w-full space-y-4">
                      <div className="space-y-1.5 text-left">
                        <label className="block text-[9px] font-mono text-neutral-400 uppercase tracking-widest font-semibold">
                          安全验证暗号 passcode
                        </label>
                        <input
                          type="password"
                          value={passcode}
                          onChange={(e) => setPasscode(e.target.value)}
                          placeholder="请输入后台管理员口令"
                          autoFocus
                          className="w-full px-4 py-3 border border-neutral-300 rounded-xl text-xs font-mono bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                        />
                        {passcodeError && (
                          <p className="text-[11px] text-red-500 font-medium font-mono mt-1">{passcodeError}</p>
                        )}
                        
                        <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-[9px] text-neutral-500 leading-relaxed font-light mt-3">
                          📝 <strong>极简持久化逻辑声明：</strong>
                          本后台管理系统和主页完全基于 <code>siteData</code> 驱动。认证通过后，您可以直接在这里可视化地修改文字和连接，点击顶部的保存即可将改动永久保存回数据仓！
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer hover:shadow-md transition active:scale-98"
                      >
                        解锁编辑模块
                      </button>
                    </form>
                  </div>
                ) : (
                  // Full CMS Edit Form
                  <div className="space-y-6 pb-12">
                    {/* Visual Admin Navigation Tabs */}
                    <div className="flex border-b border-neutral-200">
                      <button
                        onClick={() => setActiveAdminTab("edit")}
                        className={`flex-1 pb-3 text-center text-xs font-semibold tracking-wider transition-all border-b-2 font-mono uppercase cursor-pointer ${
                          activeAdminTab === "edit"
                            ? "border-neutral-900 text-neutral-900"
                            : "border-transparent text-neutral-400 hover:text-neutral-600"
                        }`}
                      >
                        ⚙️ 基础配置与画廊内容编辑
                      </button>
                      <button
                        onClick={() => {
                          setActiveAdminTab("messages");
                          // Fetch latest messages dynamically
                          fetch("/api/messages")
                            .then(res => res.json())
                            .then(msgList => {
                              if (Array.isArray(msgList)) {
                                setMessages(msgList);
                              }
                            });
                        }}
                        className={`flex-1 pb-3 text-center text-xs font-semibold tracking-wider transition-all border-b-2 font-mono uppercase cursor-pointer flex items-center justify-center space-x-2 ${
                          activeAdminTab === "messages"
                            ? "border-neutral-900 text-neutral-900"
                            : "border-transparent text-neutral-400 hover:text-neutral-600"
                        }`}
                      >
                        <span>📬 访客来信留言咨询</span>
                        {messages.length > 0 && (
                          <span className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[9px] font-mono leading-none font-bold">
                            {messages.length}
                          </span>
                        )}
                      </button>
                    </div>

                    {activeAdminTab === "edit" ? (
                      <div className="space-y-8 text-left">
                        {/* Live Sync Status indicator */}
                        {saveProgress !== "idle" && (
                          <div className={`p-4 rounded-xl text-xs flex items-center space-x-2 border animate-pulse ${
                            saveProgress === "saving" ? "bg-amber-50 border-amber-200 text-amber-700" :
                            saveProgress === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
                            "bg-red-50 border-red-200 text-red-700"
                          }`}>
                            {saveProgress === "saving" && <RefreshCw className="w-4 h-4 animate-spin flex-shrink-0" />}
                            {saveProgress === "success" && <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                            <div className="font-mono">
                              {saveProgress === "saving" && "正通过 `/api/site-data` 发送变更载荷至 Node.js 服务端写入..."}
                              {saveProgress === "success" && "服务器已全量持久化! 前端网页已实时完成挂载。"}
                              {saveProgress === "error" && `同步意外中止: ${errorDetails}`}
                            </div>
                          </div>
                        )}

                    {/* Pre-configured Presets block */}
                    <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold block">
                        交互形态风格极速重载方案 (PRESETS)
                      </span>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <button
                          onClick={() => {
                            setEditPersonal({
                              ...editPersonal,
                              name: "尚杰 (Jerry)",
                              slogan: "严防信息冗余，让几何线条自我表达。",
                              intro: "专注于剔除视觉噪声的纯粹形态。基于德国迪特·拉姆斯设计十条戒律，从草图到三维阳极加工自成一派，拒绝一切无功能隐喻的粉饰装饰性形态。"
                            });
                          }}
                          className="px-2.5 py-1 bg-white border border-neutral-250 hover:bg-neutral-100 rounded text-[11px] font-mono cursor-pointer"
                        >
                          [ 极简意志 ]
                        </button>

                        <button
                          onClick={() => {
                            setEditPersonal({
                              ...editPersonal,
                              name: "尚先生",
                              slogan: "在严苛的制造硬体量产下探寻多质感可能。",
                              intro: "主修精密模具结构设计，精通铝型材、塑料注塑吹塑工艺限制。善于写 Arduino 底层固件让物理器件如常呼吸，力求在真实的重力世界创造无感硬件。"
                            });
                          }}
                          className="px-2.5 py-1 bg-white border border-neutral-250 hover:bg-neutral-100 rounded text-[11px] font-mono cursor-pointer"
                        >
                          [ 制造极客 ]
                        </button>

                        <button
                          onClick={() => {
                            setEditPersonal({ ...defaultSiteData.personalInfo });
                            setEditWorks([ ...defaultSiteData.works ]);
                            setEditSkills([ ...defaultSiteData.skills ]);
                            setEditAwards([ ...defaultSiteData.awards ]);
                          }}
                          className="px-2.5 py-1 bg-neutral-900 text-white hover:bg-neutral-800 rounded text-[11px] font-mono cursor-pointer"
                        >
                          [ 重设所有默认主页数据 ]
                        </button>
                      </div>
                    </div>

                    {/* Form Part 1: Personal info */}
                    <div className="space-y-4">
                      <div className="border-b border-neutral-150 pb-2 flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block"></span>
                        <h4 className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase">
                          PART 1 // 个人基础信息
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-left">
                        <div className="space-y-1.5">
                          <label className="font-mono text-neutral-500 uppercase">姓名</label>
                          <input
                            type="text"
                            value={editPersonal.name}
                            onChange={(e) => setEditPersonal({ ...editPersonal, name: e.target.value })}
                            className="w-full p-2 border border-neutral-250 rounded bg-neutral-50/50 focus:outline-none focus:border-neutral-900"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-neutral-500 uppercase">英文名称</label>
                          <input
                            type="text"
                            value={editPersonal.englishName}
                            onChange={(e) => setEditPersonal({ ...editPersonal, englishName: e.target.value })}
                            className="w-full p-2 border border-neutral-250 rounded bg-neutral-50/50 focus:outline-none focus:border-neutral-900"
                          />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                          <label className="font-mono text-neutral-500 uppercase">专业主攻方向</label>
                          <input
                            type="text"
                            value={editPersonal.major}
                            onChange={(e) => setEditPersonal({ ...editPersonal, major: e.target.value })}
                            className="w-full p-2 border border-neutral-250 rounded bg-neutral-50/50 focus:outline-none focus:border-neutral-900"
                          />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                          <label className="font-mono text-neutral-500 uppercase">设计口号 Slogan</label>
                          <input
                            type="text"
                            value={editPersonal.slogan}
                            onChange={(e) => setEditPersonal({ ...editPersonal, slogan: e.target.value })}
                            className="w-full p-2 border border-neutral-250 rounded bg-neutral-50/50 focus:outline-none focus:border-neutral-900"
                          />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                          <label className="font-mono text-neutral-500 uppercase">详细设计自述 Bio</label>
                          <textarea
                            rows={4}
                            value={editPersonal.intro}
                            onChange={(e) => setEditPersonal({ ...editPersonal, intro: e.target.value })}
                            className="w-full p-2.5 border border-neutral-250 rounded bg-neutral-50/50 focus:outline-none focus:border-neutral-900 font-sans text-xs leading-relaxed"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-neutral-500 uppercase">就读学校与专业名称</label>
                          <input
                            type="text"
                            value={editPersonal.schoolName || ""}
                            placeholder="如: 天津大学 (Tianjin University) 工业设计学系"
                            onChange={(e) => setEditPersonal({ ...editPersonal, schoolName: e.target.value })}
                            className="w-full p-2 border border-neutral-250 rounded bg-neutral-50/50 focus:outline-none focus:border-neutral-900"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-neutral-500 uppercase">学校官网主页网址</label>
                          <input
                            type="text"
                            value={editPersonal.schoolUrl || ""}
                            placeholder="如: https://www.tju.edu.cn/"
                            onChange={(e) => setEditPersonal({ ...editPersonal, schoolUrl: e.target.value })}
                            className="w-full p-2 border border-neutral-250 rounded bg-neutral-50/50 focus:outline-none focus:border-neutral-900"
                          />
                        </div>
                      </div>
                    </div>

                     {/* Form Part 2: Dynamic Categorized works card lists */}
                     <div className="space-y-6">
                       <div className="border-b border-neutral-150 pb-2 flex items-center justify-between">
                         <div className="flex items-center space-x-1.5">
                           <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block"></span>
                           <h4 className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase">
                             PART 2 // 实物画廊作品全量配置 (WORKS)
                           </h4>
                         </div>
                       </div>
 
                       {editWorks.map((work, idx) => (
                         <div key={work.id || idx} className="p-5 border border-neutral-250 bg-neutral-50/20 backdrop-blur rounded-2xl space-y-4 relative text-left">
                           <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
                             <div className="flex items-center space-x-2">
                               <span className="text-[10px] font-mono font-bold text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-md uppercase">
                                 卡片编号 #{idx + 1}
                               </span>
                               <span className="text-[9px] font-mono text-neutral-400 bg-neutral-50 border border-neutral-200 px-1.5 py-0.5 rounded">
                                 ID: {work.id}
                               </span>
                             </div>
                             
                             <button
                               type="button"
                               onClick={() => {
                                 const next = editWorks.filter((_, i) => i !== idx);
                                 setEditWorks(next);
                               }}
                               className="px-2.5 py-1 text-[10px] bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded flex items-center space-x-1 cursor-pointer transition active:scale-95"
                             >
                               <Trash2 className="w-3 h-3" />
                               <span>删除此作品</span>
                             </button>
                           </div>
 
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                             <div className="space-y-1">
                               <label className="font-mono text-neutral-400 uppercase text-[10px]">作品标题</label>
                               <input
                                 type="text"
                                 value={work.title}
                                 onChange={(e) => handleWorkFieldChange(idx, "title", e.target.value)}
                                 className="w-full p-2 bg-white border border-neutral-250 rounded focus:outline-none"
                               />
                             </div>
 
                             <div className="space-y-1">
                               <label className="font-mono text-neutral-400 uppercase text-[10px]">作品分类频道</label>
                               <select
                                 value={work.categorySlug || "product"}
                                 onChange={(e) => {
                                   const slug = e.target.value;
                                   let readable = "产品与工业设计";
                                   if (slug === "interaction") readable = "数字体验与交互";
                                   if (slug === "curation") readable = "视觉与展览策展";
                                   
                                   const updated = [...editWorks];
                                   updated[idx] = { ...updated[idx], category: readable, categorySlug: slug };
                                   setEditWorks(updated);
                                 }}
                                 className="w-full p-2 bg-white border border-neutral-250 rounded focus:outline-none select-none"
                               >
                                 <option value="product">产品与工业设计 (product)</option>
                                 <option value="interaction">数字体验与交互 (interaction)</option>
                                 <option value="curation">视觉与展览策展 (curation)</option>
                               </select>
                             </div>
 
                             {/* 16:9 Image List configuration Segment */}
                             <div className="space-y-1.5 md:col-span-2 border border-neutral-150/80 rounded-xl p-3.5 bg-neutral-50/50 mt-1">
                               <div className="flex items-center justify-between mb-2">
                                 <span className="font-mono text-[9px] text-[#4f46e5]/90 uppercase tracking-widest font-extrabold flex items-center space-x-1">
                                   <span>📷 16:9 比例展示多图配置 (支持 3-5 张 PNG/JPG 格式效果图)</span>
                                 </span>
                                 <span className="text-[8px] font-mono text-neutral-400 leading-none">可手动填入或直接点击/拖动上传</span>
                               </div>
                               <div className="space-y-2">
                                 {[0, 1, 2, 3, 4].map((imageIdx) => {
                                   const currentImages = work.images || [];
                                   const val = currentImages[imageIdx] || "";
                                   return (
                                     <div key={imageIdx} className="flex items-center space-x-2">
                                       <span className="text-[10px] font-mono text-neutral-400 w-12 text-right">大图 #{imageIdx + 1}:</span>
                                       <input
                                         type="text"
                                         placeholder={`请输入第 ${imageIdx + 1} 张效果图直链 URL`}
                                         value={val}
                                         onChange={(e) => {
                                           const updatedImgs = [...currentImages];
                                           while (updatedImgs.length <= imageIdx) {
                                             updatedImgs.push("");
                                           }
                                           updatedImgs[imageIdx] = e.target.value;
                                           
                                           // Clean empty files
                                           const cleanImgs = updatedImgs.filter((img, iIdx) => img.trim() !== "" || iIdx < imageIdx);
                                           handleWorkFieldChange(idx, "images", cleanImgs);
                                           
                                           // Backward compatibility
                                           if (imageIdx === 0) {
                                             handleWorkFieldChange(idx, "imageUrl", e.target.value);
                                           }
                                         }}
                                         className="flex-1 p-2 bg-white border border-neutral-250 rounded text-xs focus:outline-none font-mono text-neutral-750"
                                       />
                                       <label className="px-2.5 py-1.5 bg-white hover:bg-neutral-50 hover:text-neutral-900 border border-neutral-250 hover:border-neutral-400 rounded text-[10px] font-mono font-bold text-neutral-600 cursor-pointer select-none transition-all flex items-center space-x-1 shadow-[0_1px_2px_rgba(0,0,0,0.02)] shrink-0 self-stretch">
                                         <span>📁 上传</span>
                                         <input
                                           type="file"
                                           accept=".png,.jpg,.jpeg"
                                           onChange={async (e) => {
                                             if (e.target.files && e.target.files[0]) {
                                               const file = e.target.files[0];
                                               try {
                                                 const reader = new FileReader();
                                                 reader.readAsDataURL(file);
                                                 reader.onload = async () => {
                                                   const base64Data = reader.result;
                                                   const res = await fetch("/api/upload", {
                                                     method: "POST",
                                                     headers: { "Content-Type": "application/json" },
                                                     body: JSON.stringify({
                                                       fileName: file.name,
                                                       fileType: file.type,
                                                       base64Data: base64Data
                                                     })
                                                   });
                                                   if (res.ok) {
                                                     const data = await res.json();
                                                     const updatedImgs = [...currentImages];
                                                     while (updatedImgs.length <= imageIdx) {
                                                       updatedImgs.push("");
                                                     }
                                                     updatedImgs[imageIdx] = data.url;
                                                     const cleanImgs = updatedImgs.filter((img, iIdx) => img.trim() !== "" || iIdx < imageIdx);
                                                     handleWorkFieldChange(idx, "images", cleanImgs);
                                                     if (imageIdx === 0) {
                                                       handleWorkFieldChange(idx, "imageUrl", data.url);
                                                     }
                                                   } else {
                                                     const errVal = await res.json();
                                                     alert(`上传失败: ${errVal.error || "未知原因"}`);
                                                   }
                                                 };
                                               } catch (err) {
                                                 console.error(err);
                                                 alert(`读取文件出错: ${err.message || err}`);
                                               }
                                             }
                                           }}
                                           className="hidden"
                                         />
                                       </label>
                                     </div>
                                   );
                                 })}
                               </div>

                               {/* Drag-and-drop helper zone for images */}
                               <div className="mt-3.5 space-y-1">
                                 <FileDragDropZone
                                   allowedTypes={["image/png", "image/jpeg", "image/jpg"]}
                                   allowedExtensions={[".png", ".jpg", ".jpeg"]}
                                   label="把照片拖到这里即可快速上传 (支持 png 格式和 jpg 格式)"
                                   subLabel="或点击此区域打开文件选择器 (自动放入首个空白展示图位)"
                                   aspectDesc="16:9 展示大图快传助手"
                                   onUploadSuccess={(url) => {
                                     const currentImages = work.images || [];
                                     const updatedImgs = [...currentImages];
                                     let emptyIdx = -1;
                                     for (let i = 0; i < 5; i++) {
                                       if (!updatedImgs[i] || updatedImgs[i].trim() === "") {
                                         emptyIdx = i;
                                         break;
                                       }
                                     }
                                     if (emptyIdx === -1) {
                                       if (updatedImgs.length < 5) {
                                         updatedImgs.push(url);
                                       } else {
                                         updatedImgs[0] = url;
                                       }
                                     } else {
                                       updatedImgs[emptyIdx] = url;
                                     }
                                     const cleanImgs = updatedImgs.filter((img) => img && img.trim() !== "");
                                     handleWorkFieldChange(idx, "images", cleanImgs);
                                     if (cleanImgs.length > 0) {
                                       handleWorkFieldChange(idx, "imageUrl", cleanImgs[0]);
                                     }
                                   }}
                                 />
                               </div>
                             </div>

                             /* Video Toggle & Configuration Block */
                             <div className="md:col-span-2 border border-neutral-150/80 rounded-xl p-3.5 bg-neutral-50/50 space-y-3 font-sans">
                               <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-2">
                                   <input
                                     type="checkbox"
                                     id={`hasVideo-${work.id || idx}`}
                                     checked={work.hasVideo !== false}
                                     onChange={(e) => {
                                       handleWorkFieldChange(idx, "hasVideo", e.target.checked);
                                       if (e.target.checked) {
                                         if (!work.videoUrl) {
                                           handleWorkFieldChange(idx, "videoUrl", "https://assets.mixkit.co/videos/preview/mixkit-mechanical-parts-moving-macro-41984-large.mp4");
                                         }
                                         handleWorkFieldChange(idx, "mediaType", "video");
                                       } else {
                                         handleWorkFieldChange(idx, "mediaType", "image");
                                       }
                                     }}
                                     className="w-4 h-4 rounded text-neutral-900 border-neutral-300 focus:ring-neutral-900 cursor-pointer"
                                   />
                                   <label htmlFor={`hasVideo-${work.id || idx}`} className="text-xs font-bold text-neutral-700 select-none cursor-pointer">
                                     🎥 在此卡片上附加动态演示视频 (支持 .mp4 格式)
                                   </label>
                                 </div>
                                 <span className="text-[9px] font-mono text-neutral-400">可勾选或取消</span>
                               </div>

                               {(work.hasVideo !== false) && (
                                 <div className="space-y-2 pl-6 text-left">
                                   <label className="font-mono text-neutral-400 uppercase text-[9px] text-emerald-600 font-extrabold block text-left">
                                     演示视频 MP4 直链路径
                                   </label>
                                   <input
                                     type="text"
                                     placeholder="请输入 .mp4 格式视频绝对直链地址"
                                     value={work.videoUrl || ""}
                                     onChange={(e) => {
                                       handleWorkFieldChange(idx, "videoUrl", e.target.value);
                                       if (e.target.value && e.target.value.trim() !== "") {
                                         handleWorkFieldChange(idx, "mediaType", "video");
                                       }
                                     }}
                                     className="w-full p-2 bg-white border border-neutral-250 text-xs rounded focus:outline-none font-mono text-emerald-700 font-medium"
                                   />

                                   {/* Drag-and-drop helper zone for video */}
                                   <div className="mt-1">
                                     <FileDragDropZone
                                       allowedTypes={["video/mp4"]}
                                       allowedExtensions={[".mp4"]}
                                       label="把视频拖到这里即可快速上传 (支持 mp4 格式)"
                                       subLabel="或点击此区域打开视频文件选择器 (自动完成服务器部署)"
                                       aspectDesc="工业原型展示 .mp4 演示视频快传助手"
                                       onUploadSuccess={(url) => {
                                         handleWorkFieldChange(idx, "videoUrl", url);
                                         handleWorkFieldChange(idx, "mediaType", "video");
                                       }}
                                     />
                                   </div>
                                   <span className="text-[9px] text-neutral-450 font-light block mt-0.5 text-left">输入满足 MP4 规范的视频绝对链接，或者直接拖拽视频至上方框。</span>
                                 </div>
                               )}
                             </div>

                             {/* Outbound Link Toggle & Configuration Block */}
                             <div className="md:col-span-2 border border-neutral-150/80 rounded-xl p-3.5 bg-neutral-50/50 space-y-3 font-sans">
                               <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-2">
                                   <input
                                     type="checkbox"
                                     id={`hasLinkUrl-${work.id || idx}`}
                                     checked={work.hasLinkUrl === true}
                                     onChange={(e) => {
                                       handleWorkFieldChange(idx, "hasLinkUrl", e.target.checked);
                                       if (e.target.checked && !work.linkUrl) {
                                         handleWorkFieldChange(idx, "linkUrl", "https://");
                                        }
                                     }}
                                     className="w-4 h-4 rounded text-neutral-900 border-neutral-300 focus:ring-neutral-900 cursor-pointer"
                                   />
                                   <label htmlFor={`hasLinkUrl-${work.id || idx}`} className="text-xs font-bold text-neutral-700 select-none cursor-pointer">
                                     🔗 开启卡片外部详情跳转链接 (可选)
                                   </label>
                                 </div>
                                 <span className="text-[9px] font-mono text-neutral-400">勾选启用外链</span>
                                </div>

                                {(work.hasLinkUrl === true) && (
                                  <div className="space-y-1 pl-6">
                                    <label className="font-mono text-neutral-455 uppercase text-[9px] text-[#4f46e5] font-extrabold block text-left">
                                      项目外跳 URL 绝对地址
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="请输入完整的网页直链，如: https://www.solidworks.com/"
                                      value={work.linkUrl || ""}
                                      onChange={(e) => {
                                        handleWorkFieldChange(idx, "linkUrl", e.target.value);
                                      }}
                                      className="w-full p-2 bg-white border border-neutral-250 text-xs rounded focus:outline-none font-mono text-neutral-700"
                                    />
                                    <span className="text-[9px] text-neutral-455 font-light block mt-0.5 text-left font-sans">启用后，访客可在卡片底部直接点击一键跳转访问外部详情、Figma 原型或学术论文链接。</span>
                                  </div>
                                )}
                              </div>
 
                             <div className="space-y-1 md:col-span-2">
                               <label className="font-mono text-neutral-400 uppercase text-[10px]">工艺/技术标签 Tags (英文逗号分隔)</label>
                               <input
                                 type="text"
                                 placeholder="如: Rhino模型,阳极氧化,模具分型"
                                 value={work.tags ? work.tags.join(",") : ""}
                                 onChange={(e) => {
                                   const arr = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                                   handleWorkFieldChange(idx, "tags", arr);
                                 }}
                                 className="w-full p-2 bg-white border border-neutral-250 rounded focus:outline-none font-mono"
                               />
                             </div>
 
                             <div className="space-y-1 md:col-span-2">
                               <label className="font-mono text-neutral-400 uppercase text-[10px]">设计研发细节自述</label>
                               <textarea
                                 rows={2}
                                 value={work.description}
                                 onChange={(e) => handleWorkFieldChange(idx, "description", e.target.value)}
                                 className="w-full p-2 bg-white border border-neutral-250 rounded focus:outline-none text-xs leading-normal font-sans"
                               />
                             </div>
                           </div>
                         </div>
                       ))}
 
                       {/* Add Dynamic Card controller segment */}
                       <div className="pt-2">
                         <button
                           type="button"
                           onClick={() => {
                             const newId = "w_" + Date.now();
                             const newWork: WorkItem = {
                               id: newId,
                               category: "产品与工业设计",
                               categorySlug: "product",
                               title: "新增工业设计案例模型",
                               description: "一句话阐述该工业产品极简曲面以及交互细节特征。",
                               imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop",
                               images: [
                                 "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop",
                                 "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
                                 "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop"
                               ],
                               videoUrl: "",
                               tags: ["CMF实验", "CNC数控铝", "结构假假组"],
                               mediaType: "image"
                             };
                             setEditWorks([...editWorks, newWork]);
                           }}
                           className="w-full py-3.5 bg-neutral-900 border border-neutral-800 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition cursor-pointer active:scale-98 shadow-sm hover:shadow-md"
                         >
                           <Plus className="w-4 h-4" />
                           <span>➕ 发布新增一份全新的设计研究成果 (自动流式排版)</span>
                         </button>
                       </div>
                     </div>

                    {/* Part 3: Skills list */}
                    <div className="space-y-4">
                      <div className="border-b border-neutral-150 pb-2 flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block"></span>
                        <h4 className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase">
                          PART 3 // 专业软件工具技能体系 (SKILLS LIST)
                        </h4>
                      </div>

                      <div className="space-y-3">
                        {editSkills.map((skill, index) => (
                          <div key={index} className="grid grid-cols-12 gap-2 text-xs items-center">
                            <input
                              type="text"
                              value={skill.icon}
                              onChange={(e) => {
                                const next = [...editSkills];
                                next[index].icon = e.target.value;
                                setEditSkills(next);
                              }}
                              className="col-span-1 p-2 border border-neutral-250 rounded bg-neutral-100 text-center text-xs"
                            />
                            <input
                              type="text"
                              value={skill.name}
                              placeholder="软件名"
                              onChange={(e) => {
                                const next = [...editSkills];
                                next[index].name = e.target.value;
                                setEditSkills(next);
                              }}
                              className="col-span-3 p-2 border border-neutral-250 rounded bg-white"
                            />
                            <input
                              type="text"
                              value={skill.level}
                              placeholder="技能水准说明"
                              onChange={(e) => {
                                const next = [...editSkills];
                                next[index].level = e.target.value;
                                setEditSkills(next);
                              }}
                              className="col-span-8 p-2 border border-neutral-250 rounded bg-white text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Part 4: Awards list */}
                    <div className="space-y-5">
                      <div className="border-b border-neutral-150 pb-2 flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block"></span>
                        <h4 className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase">
                          PART 4 // 竞赛奖项清单 (AWARDS LIST)
                        </h4>
                      </div>

                      {editAwards.map((award, index) => (
                        <div key={index} className="p-4 border border-neutral-200 rounded-xl space-y-3 bg-neutral-50/50">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-left">
                            <div className="space-y-1">
                              <label className="font-mono text-neutral-400 uppercase text-[10px]">奖项名称</label>
                              <input
                                type="text"
                                value={award.title}
                                onChange={(e) => {
                                  const next = [...editAwards];
                                  next[index] = { ...next[index], title: e.target.value };
                                  setEditAwards(next);
                                }}
                                className="w-full p-2 bg-white border border-neutral-250 rounded focus:outline-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="font-mono text-neutral-400 uppercase text-[10px]">评认定单位机构</label>
                              <input
                                type="text"
                                value={award.organization}
                                onChange={(e) => {
                                  const next = [...editAwards];
                                  next[index] = { ...next[index], organization: e.target.value };
                                  setEditAwards(next);
                                }}
                                className="w-full p-2 bg-white border border-neutral-250 rounded focus:outline-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="font-mono text-neutral-400 uppercase text-[10px]">获奖年份</label>
                              <input
                                type="text"
                                value={award.year}
                                onChange={(e) => {
                                  const next = [...editAwards];
                                  next[index] = { ...next[index], year: e.target.value };
                                  setEditAwards(next);
                                }}
                                className="w-full p-2 bg-white border border-neutral-250 rounded focus:outline-none font-mono"
                              />
                            </div>

                            <div className="space-y-1 md:col-span-3">
                              <label className="font-mono text-neutral-400 uppercase text-[10px]">具体贡献或评述概述</label>
                              <textarea
                                rows={2}
                                value={award.description}
                                onChange={(e) => {
                                  const next = [...editAwards];
                                  next[index] = { ...next[index], description: e.target.value };
                                  setEditAwards(next);
                                }}
                                className="w-full p-2 bg-white border border-neutral-250 rounded focus:outline-none text-xs leading-normal"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Part 5: Contact Footer */}
                    <div className="space-y-4">
                      <div className="border-b border-neutral-150 pb-2 flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block"></span>
                        <h4 className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase">
                          PART 5 // 底部联络信息
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-left">
                        <div className="space-y-1.5">
                          <label className="font-mono text-neutral-550 uppercase">合作邮箱 (Email)</label>
                          <input
                            type="text"
                            value={editContact.email}
                            onChange={(e) => setEditContact({ ...editContact, email: e.target.value })}
                            className="w-full p-2 border border-neutral-250 rounded bg-neutral-50/50"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-neutral-550 uppercase">所在城市-地区</label>
                          <input
                            type="text"
                            value={editContact.location}
                            onChange={(e) => setEditContact({ ...editContact, location: e.target.value })}
                            className="w-full p-2 border border-neutral-250 rounded bg-neutral-50/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Part 6: Passcode Configuration */}
                    <div className="space-y-4 pt-4 border-t border-neutral-100/80">
                      <div className="border-b border-neutral-150 pb-2 flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                        <h4 className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase">
                          PART 6 // 后台管理访问口令
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 gap-4 text-xs text-left">
                        <div className="space-y-1.5">
                          <label className="font-mono text-neutral-550 uppercase">修改后台口令 (Admin Passcode)</label>
                          <input
                            type="text"
                            placeholder="请输入新的管理员通行凭证/口令 (避免过于简单)"
                            value={editAdminPasscode}
                            onChange={(e) => setEditAdminPasscode(e.target.value)}
                            className="w-full p-2 border border-neutral-250 rounded bg-neutral-100/30 text-neutral-800 font-mono focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-900 transition-colors"
                          />
                          <p className="text-[10px] text-neutral-450 leading-relaxed font-light">
                            🔒 <strong>安全提示：</strong> 改动后，请务必点击右下方的“写入并存盘永久生效”按钮。存盘后下一次解锁该后台将需要输入您的此项新口令。
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Part 7: Page Color Theme Settings */}
                    <div className="space-y-4 pt-4 border-t border-neutral-100/80">
                      <div className="border-b border-neutral-150 pb-2 flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block"></span>
                        <h4 className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase">
                          PART 7 // 网页视觉主题与配色机制 (PAGE PALETTE)
                        </h4>
                      </div>

                      {/* Theme Presets Quick select */}
                      <div className="space-y-2 text-xs">
                        <label className="font-mono text-neutral-400 uppercase text-[10px]">一键切换官方色彩意向预设 (PRESETS THEMES)</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            {
                              name: "太空极简银灰 (Default)",
                              primary: "#111111",
                              bg: "#fafafa",
                              card: "#ffffff",
                              text: "#111111"
                            },
                            {
                              name: "暗黑赛博实验室 (Cyber)",
                              primary: "#06b6d4",
                              bg: "#080c14",
                              card: "#0f172a",
                              text: "#f3f4f6"
                            },
                            {
                              name: "暖阁金铜工坊 (Copper)",
                              primary: "#b45309",
                              bg: "#fcfbfa",
                              card: "#ffffff",
                              text: "#1c1917"
                            },
                            {
                              name: "阳极极简霜绿 (Green)",
                              primary: "#059669",
                              bg: "#f1f6f3",
                              card: "#ffffff",
                              text: "#064e3b"
                            },
                            {
                              name: "钛黑曜石工业 (Titanium)",
                              primary: "#f59e0b",
                              bg: "#121213",
                              card: "#18181e",
                              text: "#f1f1f1"
                            },
                            {
                              name: "苏玳白金香槟 (Gold)",
                              primary: "#935300",
                              bg: "#faf8f2",
                              card: "#ffffff",
                              text: "#432a00"
                            }
                          ].map((themePreset, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => {
                                setEditTheme({
                                  primaryAccent: themePreset.primary,
                                  bgPage: themePreset.bg,
                                  bgCard: themePreset.card,
                                  textMain: themePreset.text
                                });
                              }}
                              className="p-2 border border-neutral-200 hover:border-neutral-400 bg-white rounded-lg text-left transition-colors duration-200 focus:outline-none cursor-pointer hover:bg-neutral-50"
                            >
                              <p className="font-semibold text-[10px] truncate">{themePreset.name}</p>
                              <div className="mt-1 flex items-center space-x-1.5">
                                <span style={{ backgroundColor: themePreset.primary }} className="w-2 h-2 rounded-full border border-black/10 inline-block" />
                                <span style={{ backgroundColor: themePreset.bg }} className="w-2 h-2 rounded-full border border-black/10 inline-block" />
                                <span style={{ backgroundColor: themePreset.card }} className="w-2 h-2 rounded-full border border-black/10 inline-block" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Manual Color Pickers */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-left pt-2">
                        <div className="space-y-1.5">
                          <label className="font-mono text-neutral-550 uppercase flex items-center justify-between">
                            <span>主色调及精细描边 (Primary Accent)</span>
                            <span className="font-mono text-[10px] text-neutral-400">{editTheme.primaryAccent}</span>
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="color"
                              value={editTheme.primaryAccent || "#111111"}
                              onChange={(e) => setEditTheme({ ...editTheme, primaryAccent: e.target.value })}
                              className="w-8 h-8 rounded border border-neutral-300 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={editTheme.primaryAccent || ""}
                              onChange={(e) => setEditTheme({ ...editTheme, primaryAccent: e.target.value })}
                              className="flex-1 p-1.5 border border-neutral-250 rounded font-mono text-xs"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-neutral-550 uppercase flex items-center justify-between">
                            <span>主站画廊底色 (Base Page Background)</span>
                            <span className="font-mono text-[10px] text-neutral-400">{editTheme.bgPage}</span>
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="color"
                              value={editTheme.bgPage || "#fafafa"}
                              onChange={(e) => setEditTheme({ ...editTheme, bgPage: e.target.value })}
                              className="w-8 h-8 rounded border border-neutral-300 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={editTheme.bgPage || ""}
                              onChange={(e) => setEditTheme({ ...editTheme, bgPage: e.target.value })}
                              className="flex-1 p-1.5 border border-neutral-250 rounded font-mono text-xs"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-neutral-550 uppercase flex items-center justify-between">
                            <span>信息板块卡片底色 (Card Background)</span>
                            <span className="font-mono text-[10px] text-neutral-400">{editTheme.bgCard}</span>
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="color"
                              value={editTheme.bgCard || "#ffffff"}
                              onChange={(e) => setEditTheme({ ...editTheme, bgCard: e.target.value })}
                              className="w-8 h-8 rounded border border-neutral-300 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={editTheme.bgCard || ""}
                              onChange={(e) => setEditTheme({ ...editTheme, bgCard: e.target.value })}
                              className="flex-1 p-1.5 border border-neutral-250 rounded font-mono text-xs"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="font-mono text-neutral-550 uppercase flex items-center justify-between">
                            <span>全局正文字体颜色 (Body Text Color)</span>
                            <span className="font-mono text-[10px] text-neutral-400">{editTheme.textMain}</span>
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="color"
                              value={editTheme.textMain || "#111111"}
                              onChange={(e) => setEditTheme({ ...editTheme, textMain: e.target.value })}
                              className="w-8 h-8 rounded border border-neutral-300 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={editTheme.textMain || ""}
                              onChange={(e) => setEditTheme({ ...editTheme, textMain: e.target.value })}
                              className="flex-1 p-1.5 border border-neutral-250 rounded font-mono text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Part 8: Background Music Settings with Video support */}
                    <div className="space-y-4 pt-4 border-t border-neutral-100/80">
                      <div className="border-b border-neutral-150 pb-2 flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                        <h4 className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase">
                          PART 8 // 背景音乐及视频导入声强提纯 (BGM & VIDEO EXTENSION)
                        </h4>
                      </div>

                      <div className="p-4 rounded-xl border border-neutral-200 space-y-3.5 bg-neutral-50/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="bgmEnabled"
                              checked={editBgm.enabled === true}
                              onChange={(e) => setEditBgm({ ...editBgm, enabled: e.target.checked })}
                              className="w-4 h-4 rounded text-neutral-900 border-neutral-350 focus:ring-neutral-900 cursor-pointer"
                            />
                            <label htmlFor="bgmEnabled" className="text-xs font-bold text-neutral-700 select-none cursor-pointer">
                              🔊 启用整站高保真背景配乐流式播放
                            </label>
                          </div>
                          <span className="text-[9px] font-mono text-neutral-450 uppercase">BGM CONTROL</span>
                        </div>

                        {editBgm.enabled && (
                          <div className="space-y-3.5 pt-1.5 text-left border-t border-neutral-200/50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                              <div className="space-y-1">
                                <label className="font-mono text-neutral-400 uppercase text-[9px] block">歌曲音轨名称 (TRACK TITLE)</label>
                                <input
                                  type="text"
                                  value={editBgm.title || ""}
                                  placeholder="自定义配乐显示层名称"
                                  onChange={(e) => setEditBgm({ ...editBgm, title: e.target.value })}
                                  className="w-full p-2 bg-white border border-neutral-250 rounded focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="font-mono text-neutral-400 uppercase text-[9px] block">高保真音频直链 (AUDIO PATH)</label>
                                <input
                                  type="text"
                                  value={editBgm.audioUrl || ""}
                                  placeholder="填入歌曲绝对路径或通过下方传助手上传"
                                  onChange={(e) => setEditBgm({ ...editBgm, audioUrl: e.target.value, isExtracted: false })}
                                  className="w-full p-2 bg-white border border-neutral-250 rounded focus:outline-none font-mono text-xs"
                                />
                              </div>
                            </div>

                            {/* Live video/audio drag drop import for music extraction */}
                            <div className="space-y-1.5 pt-1 text-left">
                              <label className="font-mono text-neutral-500 uppercase text-[9px] block flex items-center justify-between">
                                <span className="font-bold text-neutral-600">📥 音乐提取导入器 (支持上传 MP3 / WAV 歌曲，或直接拖入 MP4 视频提取音轨)</span>
                                <span className="text-emerald-600 font-extrabold">[声强纯化技术]</span>
                              </label>

                              <FileDragDropZone
                                allowedTypes={["audio/mpeg", "audio/wav", "audio/x-wav", "audio/mp3", "audio/m4a", "video/mp4", "audio/mp4", "video/quicktime"]}
                                allowedExtensions={[".mp3", ".wav", ".m4a", ".mp4", ".mov"]}
                                label="把您的歌曲、环境底噪音频，或者 MP4 动态视频拖拽到此"
                                subLabel="（若上传的是 MP4 视频文件，后台将自动对其进行音视频轨道剥离，剔除多余图画帧，安全保留纯高保真乐轨）"
                                aspectDesc="音频 / 视频 导入器"
                                onUploadSuccess={(url, fileName) => {
                                  const lowercaseName = fileName?.toLowerCase() || "";
                                  const isVideo = lowercaseName.endsWith(".mp4") || lowercaseName.endsWith(".mov");
                                  
                                  setEditBgm(prev => ({
                                    ...prev,
                                    audioUrl: url,
                                    title: "声谱提纯轨 - " + (fileName || "自定义精选乐章"),
                                    isExtracted: isVideo ? true : false
                                  }));
                                }}
                              />

                              {editBgm.audioUrl && (
                                <div className={`p-3 rounded-lg text-xs leading-relaxed transition-all ${
                                  editBgm.isExtracted 
                                    ? "bg-emerald-50 border border-emerald-150 text-emerald-800" 
                                    : "bg-neutral-50 border border-neutral-150 text-neutral-700"
                                }`}>
                                  <p className="font-mono text-[10px] font-bold">
                                    {editBgm.isExtracted 
                                      ? "✅ 视频提取提纯成功: 系统侦测到来视频轨道，已成功剥离提取高保真乐轨，并关联为整站背景静音轨！" 
                                      : "✅ 音频文件关联成功: 整站背景乐源已成功重置并挂载。"
                                    }
                                  </p>
                                  <span className="font-mono text-[9px] text-neutral-400 block break-all text-left mt-1">
                                    绑定路径: {editBgm.audioUrl}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                ) : (
                  // Custom Guest Messages Listing Management Tab
                  <div className="space-y-5 pb-12 text-left">
                    <div className="border-b border-neutral-150 pb-2 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block animate-pulse"></span>
                        <h4 className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase">
                          MESSAGES INBOX // 访客回信一览表
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">总计来信: {messages.length} 封</span>
                    </div>

                    {messages.length === 0 ? (
                      <div className="py-16 text-center border-2 border-dashed border-neutral-200 rounded-2xl bg-neutral-50 space-y-3">
                        <div className="text-2xl">📥</div>
                        <p className="text-xs font-bold text-neutral-700">暂无访客直接留言来信</p>
                        <p className="text-[10px] text-neutral-400 font-light">
                          主页底部的独立咨询面板建立后，任何有合作意向、毕设打样、造型微调的来信都会被持久存储在这里。
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.slice().map((msg: any) => (
                          <div 
                            key={msg.id} 
                            className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-400 shadow-sm hover:shadow-md transition-all duration-300 space-y-3 font-sans relative group"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-neutral-850 text-xs">{msg.name}</span>
                                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-neutral-150 hover:bg-neutral-200 font-sans text-neutral-650 tracking-wider">
                                    {msg.category || "合作研究咨询"}
                                  </span>
                                </div>
                                <span className="text-[8px] font-mono text-neutral-400 block">
                                  ✉️ 邮箱：<a href={`mailto:${msg.email}`} className="underline hover:text-black font-semibold">{msg.email}</a>
                                  {msg.phone && <span className="ml-3">📱 电话/微信：<strong className="text-neutral-700">{msg.phone}</strong></span>}
                                </span>
                              </div>
                              
                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                                className="p-1 px-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded text-[9px] font-semibold cursor-pointer select-none transition focus:outline-none"
                              >
                                🗑️ 删除来信
                              </button>
                            </div>

                            <p className="text-xs text-neutral-700 leading-relaxed font-light p-3 rounded-lg bg-neutral-50/50 border border-neutral-100 text-left whitespace-pre-wrap">
                              {msg.content}
                            </p>

                            <div className="text-[8px] font-mono text-neutral-400 text-right pr-1">
                              📡 发送纪元时刻: {msg.createdAt ? new Date(msg.createdAt).toLocaleString("zh-CN") : "未知时刻"}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Sticky Action segment if logged on */}
          {isAuthenticated && (
                <div className="h-24 bg-neutral-50 border-t border-neutral-250 px-6 flex items-center justify-between">
                  <div className="text-left font-mono text-[9px] text-neutral-500">
                    <span>STATUS: DRAFT_READY</span>
                    <span className="block mt-1">CLICK TO STREAM OVERWRITE</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setEditPersonal({ ...siteData.personalInfo });
                        setEditWorks(JSON.parse(JSON.stringify(siteData.works)));
                        setEditSkills(JSON.parse(JSON.stringify(siteData.skills)));
                        setEditAwards(JSON.parse(JSON.stringify(siteData.awards)));
                        setEditContact({ ...siteData.contact });
                        setEditAdminPasscode(siteData.adminPasscode || "admin123");
                        setSaveProgress("idle");
                      }}
                      className="px-4 py-2 text-xs border border-neutral-300 rounded-lg text-neutral-600 hover:bg-neutral-100 font-medium cursor-pointer"
                    >
                      放弃当前编辑
                    </button>

                    <button
                      onClick={handleSaveToBackend}
                      className="px-5 py-2 text-xs font-semibold bg-neutral-900 text-white rounded-lg hover:bg-black hover:shadow-md flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>写入并存盘永久生效</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Anonymous Guest Message Inbox Modal Overlay */}
      <AnimatePresence>
        {isFeedbackOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glass backdrop wrapper */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFeedbackOpen(false)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md cursor-zoom-out"
            />

            {/* Modal Dialog Card container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.25)] border border-neutral-100 overflow-hidden text-left z-10 flex flex-col font-sans"
            >
              {/* Header block with visual identity labels */}
              <div className="p-6 md:p-8 pb-4 border-b border-neutral-100 flex items-start justify-between">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] tracking-widest text-neutral-400 font-bold uppercase inline-block">
                    📫 ANONYMOUS FEEDBACK CHANNELS // 匿名联络直达
                  </span>
                  <h3 className="text-lg font-bold text-neutral-950 flex items-center gap-2">
                    <span>免签名即时投递留言</span>
                  </h3>
                  <p className="text-neutral-500 text-xs font-light">
                    在这里，无需填写姓名或邮箱等隐私特征，可以直接将您的留言安全免验证提交至后台。
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFeedbackOpen(false)}
                  className="p-1 px-2.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-800 transition cursor-pointer text-xs font-mono select-none focus:outline-none"
                >
                  ESC // ✕
                </button>
              </div>

              {/* Message inputs form */}
              <form onSubmit={handleMessageSubmit} className="p-6 md:p-8 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block font-bold">访客尊称 / NAME (选填)</label>
                    <input
                      type="text"
                      placeholder="匿名的创作者"
                      value={msgForm.name}
                      onChange={(e) => setMsgForm({ ...msgForm, name: e.target.value })}
                      className="w-full p-3 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 focus:border-neutral-700 transition text-neutral-800 text-xs focus:outline-none placeholder-neutral-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block font-bold">电子邮箱 / EMAIL (选填)</label>
                    <input
                      type="email"
                      placeholder="anonymous@local"
                      value={msgForm.email}
                      onChange={(e) => setMsgForm({ ...msgForm, email: e.target.value })}
                      className="w-full p-3 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 focus:border-neutral-700 transition text-neutral-800 text-xs focus:outline-none placeholder-neutral-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block font-bold">合作意向 / CATEGORY</label>
                    <select
                      value={msgForm.category}
                      onChange={(e) => setMsgForm({ ...msgForm, category: e.target.value })}
                      className="w-full p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs focus:outline-none cursor-pointer focus:border-neutral-700 font-sans"
                    >
                      <option value="设计及打样开发合作">设计及打样开发合作</option>
                      <option value="工业产品造型设计咨询">工业产品造型设计咨询</option>
                      <option value="毕设代工及手办定制">毕设代工及手办定制</option>
                      <option value="CMF材料与工艺联合验证">CMF材料与工艺联合验证</option>
                      <option value="其他来信交流与留言浅谈">其他来信交流与留言浅谈</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block font-bold">联系电话/微信号 (选填)</label>
                    <input
                      type="text"
                      placeholder="微信或电话 (仅用于联系您)"
                      value={msgForm.phone}
                      onChange={(e) => setMsgForm({ ...msgForm, phone: e.target.value })}
                      className="w-full p-3 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 focus:border-neutral-700 transition text-neutral-800 text-xs focus:outline-none placeholder-neutral-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block font-bold">留言内容 / MESSAGE CONTENT *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="请输入你的留言内容，比如打样需求、意向咨询，我们将进行最高保密等级的安全投递..."
                    value={msgForm.content}
                    onChange={(e) => setMsgForm({ ...msgForm, content: e.target.value })}
                    className="w-full p-3 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 focus:border-neutral-700 transition text-neutral-850 text-xs focus:outline-none leading-relaxed placeholder-neutral-400"
                  />
                </div>

                {msgStatus !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-xl text-xs leading-relaxed flex items-center justify-between ${
                      msgStatus === "success" 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-250" 
                        : "bg-red-50 text-red-700 border border-red-250"
                    }`}
                  >
                    <span>{msgFeedback}</span>
                    {msgStatus === "success" && <span className="text-emerald-500 font-bold font-mono">OK</span>}
                  </motion.div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                  <span className="font-mono text-[8px] text-neutral-400">
                    SECURE AES-256 TRANSIT PROTOCOL
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsFeedbackOpen(false)}
                      className="px-4 py-2 hover:bg-neutral-100 text-neutral-500 rounded-lg text-xs font-semibold select-none cursor-pointer"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      disabled={msgSending}
                      className="px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-xs transition duration-150 disabled:opacity-50 cursor-pointer flex items-center space-x-1"
                    >
                      <span>{msgSending ? "正在投递..." : "发送匿名留言 🚀"}</span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
