export type AmenityIcon =
  | "shield"
  | "camera"
  | "flame"
  | "door"
  | "users"
  | "building"
  | "trees"
  | "dumbbell"
  | "waves"
  | "gamepad"
  | "baby"
  | "personStanding"
  | "bike"
  | "car"
  | "parkingCircle"
  | "zap"
  | "droplets"
  | "recycle"
  | "lamp"
  | "road"
  | "truck"
  | "warehouse"
  | "briefcase"
  | "leaf"
  | "landmark"
  | "wifi"
  | "elevator"
  | "plug";

export type AmenityOption = {
  label: string;
  category: string;
  icon: AmenityIcon;
};

export const amenityOptions: AmenityOption[] = [
  { label: "Gated Entry", category: "Security & Access", icon: "door" },
  { label: "24/7 Security", category: "Security & Access", icon: "shield" },
  { label: "CCTV Surveillance", category: "Security & Access", icon: "camera" },
  { label: "Visitor Management", category: "Security & Access", icon: "users" },
  { label: "Access-Controlled Entry", category: "Security & Access", icon: "door" },
  { label: "Intercom Provision", category: "Security & Access", icon: "wifi" },
  { label: "Fire Safety Systems", category: "Security & Access", icon: "flame" },
  { label: "Clubhouse", category: "Community", icon: "building" },
  { label: "Community Hall", category: "Community", icon: "users" },
  { label: "Multipurpose Hall", category: "Community", icon: "building" },
  { label: "Party Lawn", category: "Community", icon: "trees" },
  { label: "Temple Plaza", category: "Community", icon: "landmark" },
  { label: "Amphitheatre", category: "Community", icon: "users" },
  { label: "Senior Citizen Court", category: "Community", icon: "personStanding" },
  { label: "Co-working Lounge", category: "Community", icon: "briefcase" },
  { label: "Fitness Studio", category: "Wellness & Recreation", icon: "dumbbell" },
  { label: "Yoga Deck", category: "Wellness & Recreation", icon: "personStanding" },
  { label: "Jogging Track", category: "Wellness & Recreation", icon: "personStanding" },
  { label: "Cycling Track", category: "Wellness & Recreation", icon: "bike" },
  { label: "Swimming Pool", category: "Wellness & Recreation", icon: "waves" },
  { label: "Indoor Games", category: "Wellness & Recreation", icon: "gamepad" },
  { label: "Sports Courts", category: "Wellness & Recreation", icon: "dumbbell" },
  { label: "Children's Play Area", category: "Wellness & Recreation", icon: "baby" },
  { label: "Landscaped Gardens", category: "Landscape", icon: "trees" },
  { label: "Central Greens", category: "Landscape", icon: "trees" },
  { label: "Plantation Zones", category: "Landscape", icon: "leaf" },
  { label: "Water Feature", category: "Landscape", icon: "droplets" },
  { label: "Walking Trails", category: "Landscape", icon: "personStanding" },
  { label: "Wide Internal Roads", category: "Infrastructure", icon: "road" },
  { label: "Street Lighting", category: "Infrastructure", icon: "lamp" },
  { label: "Power Backup", category: "Infrastructure", icon: "zap" },
  { label: "Underground Cabling", category: "Infrastructure", icon: "plug" },
  { label: "Rainwater Harvesting", category: "Infrastructure", icon: "droplets" },
  { label: "Water Supply", category: "Infrastructure", icon: "droplets" },
  { label: "Sewage Treatment Plant", category: "Infrastructure", icon: "recycle" },
  { label: "Waste Management", category: "Infrastructure", icon: "recycle" },
  { label: "EV Charging", category: "Infrastructure", icon: "zap" },
  { label: "Lift Access", category: "Infrastructure", icon: "elevator" },
  { label: "High-Speed Elevators", category: "Infrastructure", icon: "elevator" },
  { label: "Basement Parking", category: "Parking", icon: "parkingCircle" },
  { label: "Visitor Parking", category: "Parking", icon: "car" },
  { label: "Loading Bays", category: "Commercial & Industrial", icon: "truck" },
  { label: "Service Access", category: "Commercial & Industrial", icon: "road" },
  { label: "Docking Area", category: "Commercial & Industrial", icon: "truck" },
  { label: "Warehouse-Ready Plots", category: "Commercial & Industrial", icon: "warehouse" },
  { label: "Utility Corridor", category: "Commercial & Industrial", icon: "plug" },
  { label: "Common Washrooms", category: "Commercial & Industrial", icon: "building" },
  { label: "Club Lounge", category: "Community", icon: "building" },
  { label: "Recreation Deck", category: "Wellness & Recreation", icon: "gamepad" },
  { label: "Kids Play Zone", category: "Wellness & Recreation", icon: "baby" },
  { label: "Landscaped Podium", category: "Landscape", icon: "trees" },
  { label: "Controlled Access", category: "Security & Access", icon: "door" },
  { label: "Water Provision", category: "Infrastructure", icon: "droplets" },
  { label: "Common Greens", category: "Landscape", icon: "trees" },
  { label: "Maintenance Support", category: "Infrastructure", icon: "users" },
  { label: "Power Infrastructure", category: "Infrastructure", icon: "zap" },
  { label: "Drainage Planning", category: "Infrastructure", icon: "droplets" },
  { label: "Weighbridge Provision", category: "Commercial & Industrial", icon: "truck" },
  { label: "Admin Support Zone", category: "Commercial & Industrial", icon: "briefcase" },
];

function normalizeAmenity(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(children|childrens|kids)\b/g, "child")
    .replace(/\b(play areas|play area|play zone)\b/g, "play")
    .replace(/\btracks\b/g, "track")
    .replace(/\broads\b/g, "road")
    .replace(/\blifts\b/g, "elevator")
    .replace(/\blift\b/g, "elevator")
    .replace(/\bgreens\b/g, "green")
    .replace(/\bgardens\b/g, "garden")
    .replace(/\bsystems\b/g, "system")
    .trim();
}

const aliases: Record<string, AmenityOption> = {
  "child play": {
    label: "Children's Play Area",
    category: "Wellness & Recreation",
    icon: "baby",
  },
  "jogging track": {
    label: "Jogging Track",
    category: "Wellness & Recreation",
    icon: "personStanding",
  },
  "temple plaza": {
    label: "Temple Plaza",
    category: "Community",
    icon: "landmark",
  },
  "security gate": {
    label: "Security Gate",
    category: "Security & Access",
    icon: "door",
  },
  "basement parking": {
    label: "Basement Parking",
    category: "Parking",
    icon: "parkingCircle",
  },
  "high speed elevator": {
    label: "High-Speed Elevators",
    category: "Infrastructure",
    icon: "elevator",
  },
  "cctv surveillance": {
    label: "CCTV Surveillance",
    category: "Security & Access",
    icon: "camera",
  },
  "fire safety system": {
    label: "Fire Safety Systems",
    category: "Security & Access",
    icon: "flame",
  },
  "club lounge": {
    label: "Club Lounge",
    category: "Community",
    icon: "building",
  },
  "recreation deck": {
    label: "Recreation Deck",
    category: "Wellness & Recreation",
    icon: "gamepad",
  },
  gymnasium: {
    label: "Gymnasium",
    category: "Wellness & Recreation",
    icon: "dumbbell",
  },
  "landscaped podium": {
    label: "Landscaped Podium",
    category: "Landscape",
    icon: "trees",
  },
  "internal road": {
    label: "Internal Roads",
    category: "Infrastructure",
    icon: "road",
  },
  "wide industrial road": {
    label: "Wide Industrial Roads",
    category: "Commercial & Industrial",
    icon: "road",
  },
  "water provision": {
    label: "Water Provision",
    category: "Infrastructure",
    icon: "droplets",
  },
  "plantation zone": {
    label: "Plantation Zones",
    category: "Landscape",
    icon: "leaf",
  },
  "common green": {
    label: "Common Greens",
    category: "Landscape",
    icon: "trees",
  },
  "maintenance support": {
    label: "Maintenance Support",
    category: "Infrastructure",
    icon: "users",
  },
  "power infrastructure": {
    label: "Power Infrastructure",
    category: "Infrastructure",
    icon: "zap",
  },
  "drainage planning": {
    label: "Drainage Planning",
    category: "Infrastructure",
    icon: "droplets",
  },
  "weighbridge provision": {
    label: "Weighbridge Provision",
    category: "Commercial & Industrial",
    icon: "truck",
  },
  "admin support zone": {
    label: "Admin Support Zone",
    category: "Commercial & Industrial",
    icon: "briefcase",
  },
};

function keywordAmenity(label: string): AmenityOption {
  const normalized = normalizeAmenity(label);

  if (normalized.includes("security") || normalized.includes("gate")) {
    return { label, category: "Security & Access", icon: "shield" };
  }
  if (normalized.includes("cctv") || normalized.includes("camera")) {
    return { label, category: "Security & Access", icon: "camera" };
  }
  if (normalized.includes("fire")) {
    return { label, category: "Security & Access", icon: "flame" };
  }
  if (normalized.includes("parking")) {
    return { label, category: "Parking", icon: "parkingCircle" };
  }
  if (normalized.includes("power") || normalized.includes("electric")) {
    return { label, category: "Infrastructure", icon: "zap" };
  }
  if (
    normalized.includes("water") ||
    normalized.includes("rainwater") ||
    normalized.includes("drainage")
  ) {
    return { label, category: "Infrastructure", icon: "droplets" };
  }
  if (normalized.includes("road") || normalized.includes("corridor")) {
    return { label, category: "Infrastructure", icon: "road" };
  }
  if (normalized.includes("garden") || normalized.includes("green")) {
    return { label, category: "Landscape", icon: "trees" };
  }
  if (normalized.includes("plantation") || normalized.includes("leaf")) {
    return { label, category: "Landscape", icon: "leaf" };
  }
  if (normalized.includes("club") || normalized.includes("hall")) {
    return { label, category: "Community", icon: "building" };
  }
  if (normalized.includes("temple") || normalized.includes("plaza")) {
    return { label, category: "Community", icon: "landmark" };
  }
  if (normalized.includes("gym") || normalized.includes("fitness")) {
    return { label, category: "Wellness & Recreation", icon: "dumbbell" };
  }
  if (normalized.includes("play") || normalized.includes("child")) {
    return { label, category: "Wellness & Recreation", icon: "baby" };
  }
  if (normalized.includes("game") || normalized.includes("recreation")) {
    return { label, category: "Wellness & Recreation", icon: "gamepad" };
  }
  if (normalized.includes("track") || normalized.includes("walking")) {
    return { label, category: "Wellness & Recreation", icon: "personStanding" };
  }
  if (normalized.includes("warehouse")) {
    return { label, category: "Commercial & Industrial", icon: "warehouse" };
  }
  if (normalized.includes("truck") || normalized.includes("weighbridge")) {
    return { label, category: "Commercial & Industrial", icon: "truck" };
  }
  if (normalized.includes("admin") || normalized.includes("office")) {
    return { label, category: "Commercial & Industrial", icon: "briefcase" };
  }

  return { label, category: "Project Amenity", icon: "building" };
}

export function getAmenityOption(label: string) {
  const normalizedLabel = normalizeAmenity(label);
  const exactMatch = amenityOptions.find((option) => option.label === label);

  if (exactMatch) {
    return exactMatch;
  }

  const normalizedMatch = amenityOptions.find(
    (option) => normalizeAmenity(option.label) === normalizedLabel,
  );

  if (normalizedMatch) {
    return normalizedMatch;
  }

  return aliases[normalizedLabel] ?? keywordAmenity(label);
}
