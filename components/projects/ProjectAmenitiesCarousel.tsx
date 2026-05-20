"use client";

import {
  Baby,
  Bike,
  BriefcaseBusiness,
  Building2,
  Camera,
  Car,
  DoorOpen,
  Droplets,
  Dumbbell,
  Flame,
  Gamepad2,
  Landmark,
  Lamp,
  Leaf,
  ParkingCircle,
  PersonStanding,
  Plug,
  Recycle,
  Road,
  ShieldCheck,
  Trees,
  Truck,
  Users,
  Warehouse,
  Waves,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";

import {
  getAmenityOption,
  type AmenityIcon,
  type AmenityOption,
} from "@/lib/amenities";

type ProjectAmenitiesCarouselProps = {
  amenities: string[];
  description: string;
};

const iconMap: Record<AmenityIcon, LucideIcon> = {
  shield: ShieldCheck,
  camera: Camera,
  flame: Flame,
  door: DoorOpen,
  users: Users,
  building: Building2,
  trees: Trees,
  dumbbell: Dumbbell,
  waves: Waves,
  gamepad: Gamepad2,
  baby: Baby,
  personStanding: PersonStanding,
  bike: Bike,
  car: Car,
  parkingCircle: ParkingCircle,
  zap: Zap,
  droplets: Droplets,
  recycle: Recycle,
  lamp: Lamp,
  road: Road,
  truck: Truck,
  warehouse: Warehouse,
  briefcase: BriefcaseBusiness,
  leaf: Leaf,
  landmark: Landmark,
  wifi: Wifi,
  elevator: Building2,
  plug: Plug,
};

function resolveAmenity(label: string): AmenityOption {
  return getAmenityOption(label);
}

export function ProjectAmenitiesCarousel({
  amenities,
  description,
}: ProjectAmenitiesCarouselProps) {
  const resolvedAmenities = amenities.map(resolveAmenity);
  const marqueeItems =
    resolvedAmenities.length > 0
      ? [...resolvedAmenities, ...resolvedAmenities]
      : [];

  return (
    <section className="overflow-hidden bg-cool-mist px-5 py-20 md:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-navy">
              Amenities
            </p>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] text-charcoal-text md:text-5xl">
              Planned conveniences for daily use and long-term value.
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-gray md:text-lg">
              {description}
            </p>
          </div>

          {marqueeItems.length > 0 ? (
            <div className="relative overflow-hidden border-y border-border-gray py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex w-max animate-[amenity-marquee_38s_linear_infinite] gap-4 hover:[animation-play-state:paused]">
                {marqueeItems.map((amenity, index) => {
                  const Icon = iconMap[amenity.icon];

                  return (
                    <article
                      key={`${amenity.label}-${index}`}
                      className="w-[18rem] shrink-0 border border-border-gray bg-white p-5 shadow-sm shadow-deep-navy/5"
                    >
                      <div className="flex size-12 items-center justify-center bg-primary-navy text-white">
                        <Icon size={21} strokeWidth={1.8} />
                      </div>
                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-gray">
                        {amenity.category}
                      </p>
                      <h3 className="mt-2 font-display text-2xl leading-tight text-charcoal-text">
                        {amenity.label}
                      </h3>
                    </article>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="border border-border-gray bg-white p-8">
              <p className="font-display text-3xl text-charcoal-text">
                Amenities will be announced soon.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-gray">
                Contact the Kedia Group team for current project specifications.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
