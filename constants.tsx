import React from 'react';
import { AspectRatio, ArtStyle } from './types';
import { 
  Monitor, Smartphone, Square, Crop, Maximize, 
  Palette, Camera, Box, PenTool, Zap, Image as ImageIcon, Layers 
} from 'lucide-react';

export const ASPECT_RATIOS = [
  { id: AspectRatio.Square, label: 'مربع (۱:۱)', icon: <Square className="w-6 h-6" />, desc: 'مناسب اینستاگرام' },
  { id: AspectRatio.Landscape, label: 'سینمایی (۱۶:۹)', icon: <Maximize className="w-6 h-6" />, desc: 'یوتیوب و ویدیو' },
  { id: AspectRatio.Portrait, label: 'استوری (۹:۱۶)', icon: <Smartphone className="w-6 h-6" />, desc: 'تیک‌تاک و ریلز' },
  { id: AspectRatio.Desktop, label: 'دسکتاپ (۴:۳)', icon: <Monitor className="w-6 h-6" />, desc: 'والپیپر استاندارد' },
  { id: AspectRatio.Tall, label: 'پرتره (۳:۴)', icon: <Crop className="w-6 h-6" />, desc: 'عکس هنری' },
];

export const ART_STYLES = [
  { id: ArtStyle.Realistic, label: 'واقع‌گرایانه', icon: <Camera className="w-8 h-8 text-emerald-400" />, img: 'https://picsum.photos/150/150?random=1' },
  { id: ArtStyle.Anime, label: 'انیمه و مانگا', icon: <Zap className="w-8 h-8 text-yellow-400" />, img: 'https://picsum.photos/150/150?random=2' },
  { id: ArtStyle.Cyberpunk, label: 'سایبرپانک', icon: <Monitor className="w-8 h-8 text-cyan-400" />, img: 'https://picsum.photos/150/150?random=3' },
  { id: ArtStyle.ThreeDRender, label: 'رندر سه‌بعدی', icon: <Box className="w-8 h-8 text-purple-400" />, img: 'https://picsum.photos/150/150?random=4' },
  { id: ArtStyle.OilPainting, label: 'نقاشی رنگ‌روغن', icon: <Palette className="w-8 h-8 text-red-400" />, img: 'https://picsum.photos/150/150?random=5' },
  { id: ArtStyle.Sketch, label: 'طراحی دستی', icon: <PenTool className="w-8 h-8 text-slate-400" />, img: 'https://picsum.photos/150/150?random=6' },
];

export const COLORS = [
  { id: 'red', value: '#ef4444', label: 'قرمز' },
  { id: 'orange', value: '#f97316', label: 'نارنجی' },
  { id: 'yellow', value: '#eab308', label: 'زرد' },
  { id: 'green', value: '#22c55e', label: 'سبز' },
  { id: 'teal', value: '#14b8a6', label: 'فیروزه‌ای' },
  { id: 'blue', value: '#3b82f6', label: 'آبی' },
  { id: 'violet', value: '#8b5cf6', label: 'بنفش' },
  { id: 'pink', value: '#ec4899', label: 'صورتی' },
  { id: 'white', value: '#ffffff', label: 'سفید' },
  { id: 'black', value: '#000000', label: 'مشکی' },
];
