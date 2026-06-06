import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { WorkItem } from "../types";

interface ProjectCardProps {
  key?: React.Key;
  work: WorkItem;
  index: number;
}

export function ProjectCard({ work, index }: ProjectCardProps) {
  // Get images list (fall back to [imageUrl] if images list is empty)
  const imageList = work.images && work.images.length > 0 
    ? work.images.filter(img => img && img.trim() !== "")
    : (work.imageUrl ? [work.imageUrl] : []);

  const isVideoEnabled = !!(work.videoUrl && work.hasVideo !== false);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"image" | "video">(
    isVideoEnabled && work.mediaType === "video" ? "video" : "image"
  );
  
  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 3D Motion design state hooks
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate normalized rotation angles
    const normX = (x / width) - 0.5;
    const normY = (y / height) - 0.5;
    
    setRotateX(-normY * 11); // X rotation (vertical movement tilts card up/down)
    setRotateY(normX * 11);  // Y rotation (horizontal movement tilts card left/right)
    setGlarePos({ x: (x / width) * 100, y: (y / height) * 100 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imageList.length <= 1) return;
    setCurrentImgIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imageList.length <= 1) return;
    setCurrentImgIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log("Video fail:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1200
      }}
      style={{
        transformStyle: "preserve-3d"
      }}
      className="group flex flex-col justify-between h-full rounded-2xl overflow-hidden text-left relative transition-all duration-300 pointer-events-auto border border-neutral-200/50 hover:border-[var(--primary-accent)]/80 bg-[var(--bg-card)] text-[var(--text-main)] shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-2xl"
    >
      {/* Dynamic glossy glare reflection effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 65%)`
          }}
        />
      )}

      {/* 1. Media Area (Strict 16:9 - aspect-video) */}
      <div className="relative aspect-video bg-neutral-950 overflow-hidden select-none">
        
        {/* Toggle Controls overlays if both present */}
        {isVideoEnabled && (
          <div className="absolute top-3 left-3 z-20 flex space-x-1.5 bg-neutral-900/80 backdrop-blur-md p-1 rounded-lg border border-white/5">
            <button
              onClick={() => {
                setActiveTab("image");
                if (videoRef.current) {
                  videoRef.current.pause();
                  setIsPlaying(false);
                }
              }}
              className={`p-1 px-2.5 rounded-md text-[10px] font-medium tracking-wider flex items-center space-x-1 transition-all cursor-pointer ${
                activeTab === "image"
                  ? "bg-white text-neutral-950 font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <ImageIcon className="w-3 h-3" />
              <span>图片 ({imageList.length})</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("video");
              }}
              className={`p-1 px-2.5 rounded-md text-[10px] font-medium tracking-wider flex items-center space-x-1 transition-all cursor-pointer ${
                activeTab === "video"
                  ? "bg-white text-neutral-950 font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <VideoIcon className="w-3 h-3" />
              <span>动态视频</span>
            </button>
          </div>
        )}

        {/* Media elements displaying */}
        {activeTab === "image" ? (
          <div className="w-full h-full relative group/carousel">
            {imageList.length > 0 ? (
              <img
                src={imageList[currentImgIndex]}
                alt={`${work.title} - img-${currentImgIndex}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-[11px] font-mono text-neutral-500">
                暂无项目效果图
              </div>
            )}

            {/* Carousel navigation overlay */}
            {imageList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-neutral-900/60 hover:bg-neutral-900 text-white backdrop-blur-xs transition opacity-0 group-hover/carousel:opacity-100 cursor-pointer z-10"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-neutral-900/60 hover:bg-neutral-900 text-white backdrop-blur-xs transition opacity-0 group-hover/carousel:opacity-100 cursor-pointer z-10"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {/* Numeric indicators */}
                <span className="absolute bottom-3 right-3 font-mono text-[9px] font-semibold bg-neutral-950/70 text-white p-1 px-2 rounded-md backdrop-blur tracking-wider z-10">
                  {currentImgIndex + 1} / {imageList.length}
                </span>

                {/* Bottom line indicator dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
                  {imageList.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImgIndex(dotIdx);
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                        dotIdx === currentImgIndex ? "bg-white w-3" : "bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="w-full h-full relative bg-neutral-950">
            {isVideoEnabled ? (
              <>
                <video
                  ref={videoRef}
                  src={work.videoUrl}
                  className="w-full h-full object-cover"
                  loop
                  muted={isMuted}
                  playsInline
                />
                
                {/* HUD video controls overlay */}
                <div className="absolute inset-0 bg-neutral-950/20 flex flex-col justify-end p-3 z-10 opacity-100">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-1.5 rounded-full bg-white text-neutral-950 hover:scale-105 transition cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur transition cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400 italic">
                无可用视频演示
              </div>
            )}
          </div>
        )}

        {/* General Index Tag badge */}
        <div className="absolute top-3 right-3 z-10 text-[9px] font-mono font-bold tracking-widest bg-neutral-900/80 text-white px-2 py-0.5 rounded border border-white/5 uppercase">
          PROJECT 0{index + 1}
        </div>
      </div>

      {/* 2. Compact Text/Description Segment */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-[var(--bg-card)]">
        <div className="space-y-2">
          <div className="flex items-center justify-between leading-none" style={{ transform: "translateZ(20px)" }}>
            <span className="text-[10px] font-mono font-extrabold tracking-widest text-neutral-400 uppercase bg-neutral-100/80 px-2 py-0.5 rounded leading-none">
              {work.category}
            </span>
          </div>
          <h3 className="text-base font-extrabold text-[var(--text-main,#1d1d1f)] tracking-tight leading-snug font-sans" style={{ transform: "translateZ(30px)" }}>
            {work.title}
          </h3>
          <p className="text-[11px] text-neutral-500 font-normal leading-relaxed line-clamp-2">
            {work.description}
          </p>
        </div>

        {/* CMF / Tech Details Tags & Optional Outbound URL */}
        {((work.tags && work.tags.length > 0) || (work.linkUrl && work.hasLinkUrl !== false)) && (
          <div className="pt-3 border-t border-neutral-100 space-y-2">
            {work.tags && work.tags.length > 0 && (
              <div className="flex flex-wrap gap-1" style={{ transform: "translateZ(10px)" }}>
                {work.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[9px] font-mono bg-neutral-100/50 text-neutral-600 px-2 py-0.5 rounded-md hover:bg-neutral-200 transition"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {work.linkUrl && work.hasLinkUrl !== false && (
              <a
                href={work.linkUrl.startsWith("http") ? work.linkUrl : `https://${work.linkUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[10px] font-medium text-[var(--text-main)] bg-neutral-50 px-2.5 py-1.5 rounded-lg border border-neutral-150 hover:bg-neutral-100 transition"
              >
                <span className="flex items-center space-x-1">
                  <span>🔗</span>
                  <span className="font-mono tracking-wide">访问详情 / 展示页链接</span>
                </span>
                <ChevronRight className="w-3 h-3 text-neutral-400 hover:text-black transition-transform" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
