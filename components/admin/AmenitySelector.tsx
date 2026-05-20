"use client";

import {
  Baby,
  Bike,
  BriefcaseBusiness,
  Building2,
  Camera,
  Car,
  DoorOpen,
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
  Droplets,
  type LucideIcon,
} from "lucide-react";

import { amenityOptions, type AmenityIcon } from "@/lib/amenities";

type AmenitySelectorProps = {
  selectedAmenities?: string[];
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

export function AmenitySelector({
  selectedAmenities = [],
}: AmenitySelectorProps) {
  const selected = new Set(selectedAmenities);
  const categories = Array.from(
    new Set(amenityOptions.map((option) => option.category)),
  );

  return (
    <div className="grid gap-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
          Amenities
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-gray">
          Select the amenities that apply to this project. These will power the
          public amenities carousel.
        </p>
      </div>

      <div className="grid gap-5">
        {categories.map((category) => (
          <fieldset key={category} className="border border-border-gray p-4">
            <legend className="px-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-navy">
              {category}
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {amenityOptions
                .filter((option) => option.category === category)
                .map((option) => {
                  const Icon = iconMap[option.icon];

                  return (
                    <label
                      key={option.label}
                      className="flex cursor-pointer items-center gap-3 border border-border-gray bg-white p-3 transition hover:border-primary-navy hover:bg-cool-mist"
                    >
                      <input
                        type="checkbox"
                        name="amenities"
                        value={option.label}
                        defaultChecked={selected.has(option.label)}
                        className="size-4 accent-primary-navy"
                      />
                      <span className="flex size-9 shrink-0 items-center justify-center bg-cool-mist text-primary-navy">
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <span className="text-sm font-medium text-charcoal-text">
                        {option.label}
                      </span>
                    </label>
                  );
                })}
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
}
