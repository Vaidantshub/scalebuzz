"use client";

import { CardStack, CardStackItem } from "@/components/ui/card-stack";

const videoItems: CardStackItem[] = [
  {
    id: "v1",
    title: "Signature UGC Brand Showcase",
    description: "High-converting UGC video ad engineered for viral reach & sales growth.",
    imageSrc: "images/portfolio_video_thumb.jpg",
    videoSrc: "images/portfolio_video.mp4",
    driveUrl: "https://drive.google.com/file/d/1SPL6s8om6zxBwJKlL2XtxkN9ZWYlq-AN/view?usp=sharing",
    isVideo: true,
    tag: "Featured Drive Video",
  },
  {
    id: "v2",
    title: "Scalebuzz Performance Ad",
    description: "High-CTR performance creative built to scale paid ad campaigns.",
    imageSrc: "images/portfolio_video_thumb.jpg",
    videoSrc: "images/ad_video.mp4",
    isVideo: true,
    tag: "Performance Ad",
  },
  {
    id: "v3",
    title: "Aura Beauty Hook",
    description: "Top-tier skincare routine & luxury cosmetic product review video hook.",
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    videoSrc: "images/portfolio_video.mp4",
    driveUrl: "https://drive.google.com/file/d/1SPL6s8om6zxBwJKlL2XtxkN9ZWYlq-AN/view?usp=sharing",
    isVideo: true,
    tag: "Beauty & Skincare",
  },
  {
    id: "v4",
    title: "Surge Energy Campaign",
    description: "High-energy unboxing & lifestyle routine user-generated video.",
    imageSrc: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
    videoSrc: "images/ad_video.mp4",
    isVideo: true,
    tag: "Energy & Fitness",
  },
  {
    id: "v5",
    title: "Velour Lifestyle Reel",
    description: "Aesthetic lifestyle reel & product transformation showcase.",
    imageSrc: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800",
    videoSrc: "images/portfolio_video.mp4",
    driveUrl: "https://drive.google.com/file/d/1SPL6s8om6zxBwJKlL2XtxkN9ZWYlq-AN/view?usp=sharing",
    isVideo: true,
    tag: "Lifestyle Reel",
  },
];

export default function CardStackDemoPage() {
  return (
    <div className="w-full min-h-screen bg-black text-white p-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-500 bg-blue-950/60 border border-blue-500/30 px-4 py-1.5 rounded-full">
            🎬 3D VIDEO CARD STACK
          </span>
          <h1 className="text-4xl font-extrabold mt-3">All Portfolio Video Ads</h1>
          <p className="text-slate-400 text-sm mt-1">Swipe or click cards to browse all high-converting video campaigns</p>
        </div>
        <CardStack
          items={videoItems}
          initialIndex={0}
          autoAdvance
          intervalMs={3000}
          pauseOnHover
          showDots
        />
      </div>
    </div>
  );
}
