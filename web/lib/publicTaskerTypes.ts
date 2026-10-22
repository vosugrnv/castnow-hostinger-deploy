export type PublicTaskerOffer = {
  service: string;
  label: string;
  price: number;
  featured?: boolean;
};

export type PublicTasker = {
  id: string;
  slug: string;
  name: string;
  avatarUrl: string | null;
  /** Ảnh gallery (ảnh chính + phụ), URL tuyệt đối path site. */
  galleryUrls?: string[];
  city: string;
  district?: string;
  districtSlug?: string;
  services: string[];
  bio: string;
  highlights: string[];
  rating?: number;
  jobCount?: number;
  source: "real" | "virtual";
  offers?: PublicTaskerOffer[];
};
