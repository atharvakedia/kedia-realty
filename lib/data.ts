import type { Project } from "@/lib/types";

export type {
  AdminProfile,
  AdminRole,
  Project,
  ProjectFormInput,
  ProjectLayout,
  ProjectLayoutRow,
  ProjectRow,
  ProjectStatus,
  ProjectType,
} from "@/lib/types";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type Career = {
  title: string;
  location: string;
  type: string;
  description: string;
};

export type Service = {
  title: string;
  description: string;
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/properties", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const planImage =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80";

export const projects: Project[] = [
  {
    title: "Kedia City",
    slug: "kedia-city",
    type: "Residential Township",
    status: "Underway",
    region: "Jaipur",
    location: "Ajmer Road, Jaipur, Rajasthan",
    totalArea: "42 Acres",
    totalUnits: "1,250 Plots & Apartments",
    reraNumber: "RAJ/P/2025/3184",
    launchDate: "March 2025",
    priceLabel: "Plots from ₹38 Lakh",
    areaLabel: "900 - 2,400 sq ft",
    description:
      "A planned residential township designed around broad internal roads, everyday conveniences, landscaped open spaces, and a clear development framework for long-term value creation.",
    highlights: [
      "Integrated plotted and apartment development",
      "Wide internal road network with landscaped medians",
      "Dedicated retail and community convenience zones",
      "Phased infrastructure delivery with managed access",
    ],
    amenities: [
      "Clubhouse",
      "Children's play areas",
      "Jogging tracks",
      "Temple plaza",
      "Security gate",
      "Rainwater harvesting",
    ],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps?q=Ajmer%20Road%20Jaipur%20Rajasthan&output=embed",
    layouts: [
      {
        title: "Residential Plot",
        type: "Plotted Development",
        area: "900 sq ft",
        image: planImage,
        description:
          "Compact residential plot planned for efficient frontage, service access, and future-ready family living.",
      },
      {
        title: "Premium Plot",
        type: "Plotted Development",
        area: "1,800 sq ft",
        image: planImage,
        description:
          "Larger plot format positioned near open spaces and planned community amenities.",
      },
      {
        title: "Garden Apartment",
        type: "Apartments",
        area: "1,250 sq ft",
        image: planImage,
        description:
          "Apartment layout designed for natural light, efficient circulation, and family comfort.",
      },
    ],
  },
  {
    title: "Kedia Square",
    slug: "kedia-square",
    type: "Commercial",
    status: "Ready",
    region: "Jaipur",
    location: "Vaishali Nagar, Jaipur, Rajasthan",
    totalArea: "3.8 Acres",
    totalUnits: "186 Retail & Office Units",
    reraNumber: "RAJ/P/2023/2461",
    launchDate: "August 2023",
    priceLabel: "Commercial units from ₹52 Lakh",
    areaLabel: "420 - 2,100 sq ft",
    description:
      "A high-visibility commercial development planned for retail, boutique offices, service-led businesses, and neighborhood-scale customer movement.",
    highlights: [
      "Main-road frontage with organized arrival zones",
      "Flexible retail and office unit formats",
      "Dedicated service access and vertical circulation",
      "Ready possession inventory for select units",
    ],
    amenities: [
      "Basement parking",
      "High-speed lifts",
      "Power backup",
      "CCTV surveillance",
      "Fire safety systems",
      "Common washrooms",
    ],
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Vaishali%20Nagar%20Jaipur%20Rajasthan&output=embed",
    layouts: [
      {
        title: "Retail Frontage Unit",
        type: "Retail",
        area: "520 sq ft",
        image: planImage,
        description:
          "Street-facing retail unit with clear frontage and efficient customer entry.",
      },
      {
        title: "Corporate Office",
        type: "Office",
        area: "1,450 sq ft",
        image: planImage,
        description:
          "Flexible office plan suitable for professional services and growing teams.",
      },
    ],
  },
  {
    title: "Kedia Greens Villas",
    slug: "kedia-greens-villas",
    type: "Villas",
    status: "Underway",
    region: "Udaipur",
    location: "Nathdwara Road, Udaipur, Rajasthan",
    totalArea: "18 Acres",
    totalUnits: "96 Villas",
    reraNumber: "RAJ/P/2025/3262",
    launchDate: "June 2025",
    priceLabel: "Villas from ₹1.35 Cr",
    areaLabel: "2,200 - 3,600 sq ft",
    description:
      "A villa community shaped around controlled density, landscaped streets, and contemporary residential formats for families seeking independent living within a managed development.",
    highlights: [
      "Low-density villa community",
      "Landscape-led internal street planning",
      "Club and recreation spine",
      "Managed entry with planned services",
    ],
    amenities: [
      "Club lounge",
      "Recreation deck",
      "Indoor games",
      "Fitness studio",
      "Party lawn",
      "Visitor parking",
    ],
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80",
    layouts: [
      {
        title: "Courtyard Villa",
        type: "3 BHK Villa",
        area: "2,200 sq ft",
        image: planImage,
        description:
          "Independent villa format with a compact courtyard and practical family zoning.",
      },
      {
        title: "Premium Villa",
        type: "4 BHK Villa",
        area: "3,600 sq ft",
        image: planImage,
        description:
          "Expanded villa plan with larger living areas, terraces, and staff/service provision.",
      },
    ],
  },
  {
    title: "Kedia Heights",
    slug: "kedia-heights",
    type: "Apartments",
    status: "Completed",
    region: "Jaipur",
    location: "Mansarovar Extension, Jaipur, Rajasthan",
    totalArea: "7.5 Acres",
    totalUnits: "420 Apartments",
    reraNumber: "RAJ/P/2021/1678",
    launchDate: "January 2021",
    priceLabel: "Apartments from ₹64 Lakh",
    areaLabel: "1,050 - 1,850 sq ft",
    description:
      "A completed apartment development with efficient unit planning, established amenities, and strong neighborhood connectivity for everyday urban living.",
    highlights: [
      "Completed residential apartment community",
      "Efficient 2 and 3 BHK unit formats",
      "Established resident amenities",
      "Strong access to schools, transit, and retail",
    ],
    amenities: [
      "Community hall",
      "Gymnasium",
      "Kids play zone",
      "Landscaped podium",
      "Power backup",
      "Controlled access",
    ],
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Mansarovar%20Extension%20Jaipur%20Rajasthan&output=embed",
    layouts: [
      {
        title: "Efficient Residence",
        type: "2 BHK Apartment",
        area: "1,050 sq ft",
        image: planImage,
        description:
          "2 BHK apartment with clear separation between living and family zones.",
      },
      {
        title: "Family Residence",
        type: "3 BHK Apartment",
        area: "1,650 sq ft",
        image: planImage,
        description:
          "3 BHK plan with larger living space and practical storage provision.",
      },
    ],
  },
  {
    title: "Kedia Agro Farms",
    slug: "kedia-agro-farms",
    type: "Farmhouses",
    status: "Ready",
    region: "Alwar",
    location: "Sariska Road, Alwar, Rajasthan",
    totalArea: "55 Acres",
    totalUnits: "72 Farm Plots",
    reraNumber: "RAJ/P/2024/2875",
    launchDate: "November 2024",
    priceLabel: "Farm plots from ₹42 Lakh",
    areaLabel: "6,000 - 12,000 sq ft",
    description:
      "A managed farmhouse development planned for weekend living, agricultural leisure, and land ownership with organized infrastructure and access.",
    highlights: [
      "Large-format farm plot community",
      "Internal roads and managed entry",
      "Water and power provision planned",
      "Close access to regional leisure corridors",
    ],
    amenities: [
      "Gated entry",
      "Internal roads",
      "Water provision",
      "Plantation zones",
      "Common greens",
      "Maintenance support",
    ],
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    layouts: [
      {
        title: "Farm Plot",
        type: "Farmhouse Plot",
        area: "6,000 sq ft",
        image: planImage,
        description:
          "Entry farm plot with flexible siting for landscape, leisure, and built form.",
      },
      {
        title: "Premium Farm Plot",
        type: "Farmhouse Plot",
        area: "12,000 sq ft",
        image: planImage,
        description:
          "Larger plot format for expanded landscape, open-air recreation, and weekend use.",
      },
    ],
  },
  {
    title: "Kedia Industrial Park",
    slug: "kedia-industrial-park",
    type: "Industrial Township",
    status: "Underway",
    region: "Neemrana",
    location: "NH-48 Corridor, Neemrana, Rajasthan",
    totalArea: "110 Acres",
    totalUnits: "214 Industrial Plots",
    reraNumber: "RAJ/P/2025/3311",
    launchDate: "September 2025",
    priceLabel: "Industrial plots on request",
    areaLabel: "10,000 - 80,000 sq ft",
    description:
      "An industrial township planned for warehousing, light manufacturing, logistics, and ancillary commercial use along a high-growth industrial corridor.",
    highlights: [
      "Industrial plots with scalable formats",
      "Truck movement and service-road planning",
      "Utility corridors and infrastructure zoning",
      "Strategic NH-48 industrial corridor access",
    ],
    amenities: [
      "Wide industrial roads",
      "Power infrastructure",
      "Drainage planning",
      "Security gate",
      "Weighbridge provision",
      "Admin support zone",
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Neemrana%20Rajasthan%20NH%2048&output=embed",
    layouts: [
      {
        title: "Logistics Plot",
        type: "Industrial Plot",
        area: "20,000 sq ft",
        image: planImage,
        description:
          "Mid-sized industrial plot suitable for warehousing and logistics-led operations.",
      },
      {
        title: "Manufacturing Plot",
        type: "Industrial Plot",
        area: "50,000 sq ft",
        image: planImage,
        description:
          "Large industrial format with planning flexibility for production and service movement.",
      },
    ],
  },
];

export const services: Service[] = [
  {
    title: "Project Development",
    description:
      "Planned development across residential, commercial, industrial, and land-led real estate formats.",
  },
  {
    title: "Sales & Customer Advisory",
    description:
      "Clear project information, documentation support, and guided decision-making for buyers and investors.",
  },
  {
    title: "Market-Led Planning",
    description:
      "Development decisions shaped by location demand, infrastructure growth, and long-term usability.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Kedia Group understood the project, the location, and the long-term value drivers. The process felt structured from start to finish.",
    name: "Anika Rao",
    role: "Commercial Buyer, Jaipur",
  },
  {
    quote:
      "They explained the development plan clearly and helped us compare formats without pressure.",
    name: "Maya and Rohan Mehta",
    role: "Township Buyers",
  },
  {
    quote:
      "The difference was documentation clarity, site planning, and the confidence that the project team knew the ground realities.",
    name: "Julian Hart",
    role: "Investor, Rajasthan",
  },
];

export const careers: Career[] = [
  {
    title: "Senior Sales Advisor",
    location: "Jaipur, Rajasthan",
    type: "Full-time",
    description:
      "Lead customer relationships across Kedia Group residential and commercial projects.",
  },
  {
    title: "Project Marketing Producer",
    location: "Hybrid",
    type: "Full-time",
    description:
      "Shape project campaigns across photography, editorial copy, launch assets, and site events.",
  },
  {
    title: "Client Experience Coordinator",
    location: "Jaipur, Rajasthan",
    type: "Full-time",
    description:
      "Coordinate site visits, client communication, and documentation workflows with precision.",
  },
];

export const stats = [
  { value: "250+", label: "Bighas planned across development formats" },
  { value: "200+", label: "Projects across residential and commercial use" },
  { value: "40+", label: "Years of trust-led real estate development" },
];
