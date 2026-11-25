export type Asset = {
  src: string;
  width: number;
  height: number;
  label: string;
  alt: string;
  category: string;
  position?: string;
  video?: string;
};

export const assets = {
  hero: { src: "/media/hero-training.webp", width: 832, height: 464, label: "Training at FERA", alt: "Athletes work through conditioning drills on the FERA mats", category: "Conditioning", position: "58% center" },
  group: { src: "/media/group-conditioning-poster.webp", width: 576, height: 1024, label: "Group conditioning", alt: "Athletes practice bodyweight exercises together on the mats", category: "Videos", video: "/media/group-conditioning.mp4", position: "center 69%" },
  montage: { src: "/media/dumbbell-conditioning-poster.webp", width: 832, height: 464, label: "A session at FERA", alt: "A montage of group conditioning, dumbbell work and strength training at FERA", category: "Videos", video: "/media/training-montage.mp4", position: "center" },
  partners: { src: "/media/partner-strength.webp", width: 834, height: 1250, label: "Partner strength work", alt: "An athlete works at a cable station while a training partner watches", category: "Strength", position: "center 34%" },
  community: { src: "/media/fera-community.webp", width: 900, height: 1200, label: "The FERA community", alt: "A group of FERA athletes sits together in the training studio", category: "Community", position: "center 57%" },
  sparring: { src: "/media/video-2.jpg", width: 243, height: 174, label: "On the mats", alt: "Two athletes face each other in gloves on the FERA training mats", category: "Combat", position: "55% center" },
  mace: { src: "/media/image-2.jpg", width: 243, height: 406, label: "Mace training", alt: "An athlete holds a training mace on the gym mats", category: "Conditioning", position: "center 32%" },
  kettlebell: { src: "/media/image-3.jpg", width: 243, height: 406, label: "Kettlebell work", alt: "An athlete swings a kettlebell on the training mats", category: "Conditioning", position: "center 47%" },
  strength: { src: "/media/unnamed.jpg", width: 243, height: 406, label: "Strength work", alt: "An athlete grips an overhead bar at a strength station", category: "Strength", position: "center 31%" },
} satisfies Record<string, Asset>;

type Coach = {
  name: string;
  specialty: string;
  portrait?: Asset;
  experience?: string;
  certifications?: string[];
  achievements?: string[];
  philosophy?: string;
};

type Business = {
  name: string; ownerWhatsApp: string; phone: string; email: string;
  locality: string; address: string; instagram: string; hours: string[];
  mapsQuery: string; mapsPlaceId: string; heroVideo: string; canonicalOrigin: string;
  story: string; coaches: Coach[]; membership: string[]; testimonials: string[];
};

export const business: Business = {
  name: "FERA FITNESS",
  ownerWhatsApp: "919987826407",
  phone: "+91 98206 26022",
  email: "",
  locality: "Thane West, Maharashtra",
  address: "Sports Club Football Ground, beside Shreerang, opposite Vrindavan Bus Stop, Shrirang Society, Thane West, Maharashtra 400601",
  instagram: "",
  hours: ["Mon–Tue & Thu–Sat: 9–10 am and 5–10 pm", "Wed: 6–10 am and 5–10 pm", "Sun: Closed"],
  mapsQuery: "Fera Mixed Martial Arts Fitness Studio, Shrirang Society, Thane West, Maharashtra 400601",
  mapsPlaceId: "ChIJsyLWBAC55zsRk_ynnLE1gqc",
  heroVideo: "/media/hero-training.mp4",
  canonicalOrigin: "",
  story: "",
  coaches: [],
  membership: [],
  testimonials: [],
};

export const programs = [
  {
    id: "mma", name: "Mixed Martial Arts", interest: "MMA", level: "Beginner to experienced",
    image: assets.sparring, short: "Build composure, coordination and confidence on the mats.",
    focus: "Combat fundamentals, movement and partner drills",
    benefits: "Develop timing, body awareness and the confidence to train with a partner.",
  },
  {
    id: "strength", name: "Strength & Conditioning", interest: "Strength & Conditioning", level: "All experience levels",
    image: assets.partners, short: "Get stronger and develop the engine to keep going.",
    focus: "Strength, work capacity and athletic conditioning",
    benefits: "Build a foundation of strength and improve your capacity to sustain effort.",
  },
  {
    id: "fitness", name: "Fitness Foundations", interest: "Fitness", level: "Beginner friendly",
    image: assets.kettlebell, short: "Build a training routine from the ground up.",
    focus: "Movement quality, fitness and consistent practice",
    benefits: "Build familiarity with training and progress at a pace you can sustain.",
  },
];

export const gallery: Asset[] = [assets.sparring, assets.mace, assets.kettlebell, assets.community, assets.partners, assets.strength, assets.montage, assets.group];
export const interests = ["MMA", "Boxing", "Kickboxing", "Fitness", "Strength & Conditioning", "Trial Session", "Other"] as const;
export const experienceLevels = ["Beginner", "Intermediate", "Experienced"] as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Training", href: "/training/" },
  { label: "About", href: "/about/" },
  { label: "Coaches", href: "/coaches/" },
  { label: "Membership", href: "/membership/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Contact", href: "/contact/" },
];

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapsQuery)}&query_place_id=${business.mapsPlaceId}`;
export const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(business.mapsQuery)}&output=embed`;
