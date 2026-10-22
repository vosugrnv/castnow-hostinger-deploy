import { getAdminUserId } from "@/lib/adminAuth";
import { brandDisplayName, filterCastNowRows, isCastNowScoped } from "@/lib/castnowScope";
import { createSupabaseClient } from "@/lib/supabase";

function requireAdminId(): string {
  const id = getAdminUserId();
  if (!id) throw new Error("Phiên đăng nhập admin đã hết hạn. Vui lòng đăng nhập lại.");
  return id;
}

function unwrap<T>(data: unknown): T {
  return data as T;
}

/* ----------------------------- Dashboard ----------------------------- */

export type DashboardStats = {
  total_users: number;
  total_customers: number;
  total_workers: number;
  total_jobs: number;
  open_jobs: number;
  assigned_jobs: number;
  completed_jobs: number;
  total_bookings: number;
  pending_withdrawals: number;
  pending_partner_apps: number;
  total_wallet_balance: number;
};

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc("admin_dashboard_stats", {
    p_admin_id: requireAdminId(),
  });
  if (error) throw new Error(error.message);
  return unwrap<DashboardStats>(data);
}

/* ----------------------------- Profiles / Users ----------------------------- */

export type AdminProfileRow = {
  id: string;
  role: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
  available_balance: number;
  total_count: number;
};

export async function listProfiles(params: {
  role?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<AdminProfileRow[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc("admin_list_profiles", {
    p_admin_id: requireAdminId(),
    p_role: params.role ?? "",
    p_search: params.search ?? "",
    p_limit: params.limit ?? 50,
    p_offset: params.offset ?? 0,
  });
  if (error) throw new Error(error.message);
  const rows = unwrap<AdminProfileRow[]>(data) ?? [];
  return rows.map((row) => ({
    ...row,
    full_name: row.full_name ? brandDisplayName(row.full_name) : row.full_name,
  }));
}

export async function setUserRole(userId: string, role: string): Promise<void> {
  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc("admin_set_user_role", {
    p_admin_id: requireAdminId(),
    p_user_id: userId,
    p_role: role,
  });
  if (error) throw new Error(error.message);
}

export async function setUserActive(userId: string, active: boolean): Promise<void> {
  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc("admin_set_user_active", {
    p_admin_id: requireAdminId(),
    p_user_id: userId,
    p_active: active,
  });
  if (error) throw new Error(error.message);
}

/* ----------------------------- Marketplace jobs ----------------------------- */

export type AdminJobRow = {
  id: string;
  service_title: string;
  customer_name: string;
  customer_phone: string | null;
  city: string;
  address_label: string;
  address_detail: string;
  schedule_text: string;
  note: string | null;
  status: string;
  assigned_worker_name: string | null;
  created_at: string;
  total_count: number;
};

export async function listJobs(params: {
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<AdminJobRow[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc("admin_list_jobs", {
    p_admin_id: requireAdminId(),
    p_status: params.status ?? "",
    p_search: params.search ?? "",
    p_limit: params.limit ?? 50,
    p_offset: params.offset ?? 0,
  });
  if (error) throw new Error(error.message);
  const rows = unwrap<AdminJobRow[]>(data) ?? [];
  return filterCastNowRows(rows, (row) => isCastNowScoped(row.service_title)).map((row) => ({
    ...row,
    customer_name: brandDisplayName(row.customer_name),
    assigned_worker_name: row.assigned_worker_name
      ? brandDisplayName(row.assigned_worker_name)
      : row.assigned_worker_name,
  }));
}

export async function deleteJob(jobId: string): Promise<void> {
  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc("admin_delete_job", {
    p_admin_id: requireAdminId(),
    p_job_id: jobId,
  });
  if (error) throw new Error(error.message);
}

/* ----------------------------- Bookings ----------------------------- */

export type AdminBookingRow = {
  id: string;
  booking_code: string | null;
  status: string;
  customer_name: string | null;
  worker_name: string | null;
  service_name: string | null;
  scheduled_start_at: string | null;
  total_amount: number;
  address_text: string | null;
  created_at: string;
  total_count: number;
};

export async function listBookings(params: {
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<AdminBookingRow[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc("admin_list_bookings", {
    p_admin_id: requireAdminId(),
    p_status: params.status ?? "",
    p_limit: params.limit ?? 50,
    p_offset: params.offset ?? 0,
  });
  if (error) throw new Error(error.message);
  const rows = unwrap<AdminBookingRow[]>(data) ?? [];
  return filterCastNowRows(rows, (row) => isCastNowScoped(row.service_name)).map((row) => ({
    ...row,
    customer_name: row.customer_name ? brandDisplayName(row.customer_name) : row.customer_name,
    worker_name: row.worker_name ? brandDisplayName(row.worker_name) : row.worker_name,
  }));
}

/* ----------------------------- Wallets ----------------------------- */

export type AdminWalletRow = {
  owner_id: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  available_balance: number;
  pending_balance: number;
  currency: string;
  updated_at: string | null;
  total_count: number;
};

export async function listWallets(params: {
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<AdminWalletRow[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc("admin_list_wallets", {
    p_admin_id: requireAdminId(),
    p_search: params.search ?? "",
    p_limit: params.limit ?? 50,
    p_offset: params.offset ?? 0,
  });
  if (error) throw new Error(error.message);
  const rows = unwrap<AdminWalletRow[]>(data) ?? [];
  return rows.map((row) => ({
    ...row,
    full_name: row.full_name ? brandDisplayName(row.full_name) : row.full_name,
  }));
}

export async function adjustWallet(params: {
  ownerId: string;
  amount: number;
  note: string;
}): Promise<void> {
  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc("admin_adjust_wallet", {
    p_admin_id: requireAdminId(),
    p_owner_id: params.ownerId,
    p_amount: params.amount,
    p_note: params.note,
  });
  if (error) throw new Error(error.message);
}

/* ----------------------------- Wallet transactions ----------------------------- */

export type AdminTxRow = {
  id: string;
  owner_id: string;
  owner_name: string | null;
  owner_phone: string | null;
  tx_type: string;
  status: string;
  amount: number;
  fee_amount: number;
  net_amount: number;
  note: string | null;
  created_at: string;
  total_count: number;
};

export async function listTransactions(params: {
  status?: string;
  txType?: string;
  limit?: number;
  offset?: number;
}): Promise<AdminTxRow[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc("admin_list_wallet_transactions", {
    p_admin_id: requireAdminId(),
    p_status: params.status ?? "",
    p_tx_type: params.txType ?? "",
    p_limit: params.limit ?? 50,
    p_offset: params.offset ?? 0,
  });
  if (error) throw new Error(error.message);
  const rows = unwrap<AdminTxRow[]>(data) ?? [];
  return rows
    .filter((row) => isCastNowScoped(row.note))
    .map((row) => ({
      ...row,
      owner_name: row.owner_name ? brandDisplayName(row.owner_name) : row.owner_name,
      note: row.note ? brandDisplayName(row.note) : row.note,
    }));
}

/* ----------------------------- Withdrawals ----------------------------- */

export type AdminWithdrawalRow = {
  id: string;
  owner_id: string;
  owner_name: string | null;
  owner_phone: string | null;
  amount: number;
  bank_name: string;
  bank_account_no: string;
  bank_account_name: string;
  tx_status: string;
  admin_note: string | null;
  processed_at: string | null;
  created_at: string;
  total_count: number;
};

export async function listWithdrawals(params: {
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<AdminWithdrawalRow[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc("admin_list_withdrawals", {
    p_admin_id: requireAdminId(),
    p_status: params.status ?? "",
    p_limit: params.limit ?? 50,
    p_offset: params.offset ?? 0,
  });
  if (error) throw new Error(error.message);
  const rows = unwrap<AdminWithdrawalRow[]>(data) ?? [];
  return rows.map((row) => ({
    ...row,
    owner_name: row.owner_name ? brandDisplayName(row.owner_name) : row.owner_name,
    bank_account_name: brandDisplayName(row.bank_account_name),
    admin_note: row.admin_note ? brandDisplayName(row.admin_note) : row.admin_note,
  }));
}

export async function processWithdrawal(params: {
  withdrawalId: string;
  approve: boolean;
  note?: string;
}): Promise<void> {
  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc("admin_process_withdrawal", {
    p_admin_id: requireAdminId(),
    p_withdrawal_id: params.withdrawalId,
    p_approve: params.approve,
    p_note: params.note ?? "",
  });
  if (error) throw new Error(error.message);
}

/* ----------------------------- Partner applications ----------------------------- */

export type AdminPartnerRow = {
  id: string;
  user_id: string;
  applicant_phone: string;
  full_name: string;
  citizen_id: string;
  birth_day: number;
  birth_month: number;
  birth_year: number;
  expertise_id: string;
  expertise_title: string;
  experience_years: number;
  experience_months: number;
  portrait_url: string;
  id_card_url: string;
  status: string;
  submitted_at: string;
  rejection_reason: string | null;
};

export async function listPartnerApplications(status: string): Promise<AdminPartnerRow[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc("app_list_partner_applications_for_admin", {
    p_admin_id: requireAdminId(),
    p_status: status,
  });
  if (error) throw new Error(error.message);
  const rows = unwrap<AdminPartnerRow[]>(data) ?? [];
  return rows
    .filter((row) => isCastNowScoped(row.expertise_title))
    .map((row) => ({
      ...row,
      full_name: brandDisplayName(row.full_name),
    }));
}

export async function reviewPartnerApplication(params: {
  applicationId: string;
  approve: boolean;
  rejectionReason?: string;
}): Promise<void> {
  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc("app_review_partner_application", {
    p_admin_id: requireAdminId(),
    p_application_id: params.applicationId,
    p_approve: params.approve,
    p_rejection_reason: params.rejectionReason ?? null,
  });
  if (error) throw new Error(error.message);
}

/* ----------------------------- Promotions ----------------------------- */

export type AdminPromotionRow = {
  id: string;
  title: string;
  description: string | null;
  promo_kind: string;
  discount_label: string | null;
  code: string | null;
  valid_until: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export async function listPromotions(): Promise<AdminPromotionRow[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc("admin_list_promotions", {
    p_admin_id: requireAdminId(),
  });
  if (error) throw new Error(error.message);
  const rows = unwrap<AdminPromotionRow[]>(data) ?? [];
  return rows
    .filter((row) => isCastNowScoped(row.title, row.description))
    .map((row) => ({
      ...row,
      title: brandDisplayName(row.title),
      description: row.description ? brandDisplayName(row.description) : row.description,
    }));
}

export async function upsertPromotion(params: {
  id?: string | null;
  title: string;
  description?: string;
  promoKind: string;
  discountLabel?: string;
  code?: string;
  validUntil?: string | null;
  isActive: boolean;
  sortOrder: number;
}): Promise<string> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc("admin_upsert_promotion", {
    p_admin_id: requireAdminId(),
    p_id: params.id ?? null,
    p_title: params.title,
    p_description: params.description ?? "",
    p_promo_kind: params.promoKind,
    p_discount_label: params.discountLabel ?? "",
    p_code: params.code ?? "",
    p_valid_until: params.validUntil ?? null,
    p_is_active: params.isActive,
    p_sort_order: params.sortOrder,
  });
  if (error) throw new Error(error.message);
  return unwrap<string>(data);
}

export async function deletePromotion(id: string): Promise<void> {
  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc("admin_delete_promotion", {
    p_admin_id: requireAdminId(),
    p_id: id,
  });
  if (error) throw new Error(error.message);
}

/* ----------------------------- Web taskers (/mau-anh-nhiep-anh-gia) ----------------------------- */

export type AdminWebTaskerOffer = {
  service: string;
  label: string;
  price: number;
  featured?: boolean;
};

export type AdminWebTaskerRow = {
  id: string;
  full_name: string;
  city: string;
  district: string | null;
  services: string[];
  bio: string;
  highlights: string[];
  rating: number;
  review_count: number;
  has_photo: boolean;
  has_photo2?: boolean;
  has_photo3?: boolean;
  is_published: boolean;
  sort_order: number;
  service_offers?: AdminWebTaskerOffer[] | null;
  created_at: string;
  updated_at: string;
};

export async function listWebTaskers(): Promise<AdminWebTaskerRow[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc("admin_list_virtual_taskers", {
    p_admin_id: requireAdminId(),
  });
  if (error) throw new Error(error.message);
  return unwrap<AdminWebTaskerRow[]>(data) ?? [];
}

/** photoBase64: undefined = giữ ảnh cũ, "" = xóa ảnh. */
export async function upsertWebTasker(params: {
  id?: string | null;
  fullName: string;
  city: string;
  district: string;
  services: string[];
  bio: string;
  highlights: string[];
  rating: number;
  reviewCount: number;
  isPublished: boolean;
  sortOrder: number;
  serviceOffers?: AdminWebTaskerOffer[];
  photoBase64?: string;
  photoMime?: string;
  /** undefined = giữ, "" = xóa, base64 = ảnh mới */
  photo2Base64?: string;
  photo2Mime?: string;
  photo3Base64?: string;
  photo3Mime?: string;
}): Promise<string> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc("admin_upsert_virtual_tasker", {
    p_admin_id: requireAdminId(),
    p_id: params.id ?? null,
    p_full_name: params.fullName,
    p_city: params.city,
    p_district: params.district,
    p_services: params.services,
    p_bio: params.bio,
    p_highlights: params.highlights,
    p_rating: params.rating,
    p_review_count: params.reviewCount,
    p_is_published: params.isPublished,
    p_sort_order: params.sortOrder,
    p_photo_data: params.photoBase64 ?? null,
    p_photo_mime: params.photoMime ?? null,
    p_service_offers: params.serviceOffers ?? [],
    p_photo2_data: params.photo2Base64 ?? null,
    p_photo2_mime: params.photo2Mime ?? null,
    p_photo3_data: params.photo3Base64 ?? null,
    p_photo3_mime: params.photo3Mime ?? null,
  });
  if (error) throw new Error(error.message);
  return unwrap<string>(data);
}

export async function deleteWebTasker(id: string): Promise<void> {
  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc("admin_delete_virtual_tasker", {
    p_admin_id: requireAdminId(),
    p_id: id,
  });
  if (error) throw new Error(error.message);
}

/** slot 1 = ảnh chính, 2/3 = ảnh phụ. */
export async function getWebTaskerPhoto(id: string, slot = 1): Promise<string | null> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc("app_get_virtual_tasker_photo", {
    p_id: id,
    p_slot: slot,
  });
  if (error) throw new Error(error.message);
  const row = (unwrap<{ photo_data: string | null; photo_mime: string | null }[]>(data) ?? [])[0];
  if (!row?.photo_data) return null;
  return `data:${row.photo_mime || "image/jpeg"};base64,${row.photo_data}`;
}

/* ----------------------------- Notifications ----------------------------- */

export type AdminNotificationRow = {
  id: string;
  target_user_id: string | null;
  target_city: string | null;
  event_type: string;
  title: string;
  body: string;
  created_at: string;
  read_at: string | null;
};

export async function listNotifications(limit = 50): Promise<AdminNotificationRow[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("app_notifications")
    .select("id, target_user_id, target_city, event_type, title, body, created_at, read_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return unwrap<AdminNotificationRow[]>(data) ?? [];
}

export async function sendNotification(params: {
  targetCity?: string;
  title: string;
  body: string;
}): Promise<void> {
  const supabase = createSupabaseClient();
  const { error } = await supabase.from("app_notifications").insert({
    target_user_id: null,
    target_city: params.targetCity?.trim() || null,
    event_type: "admin_broadcast",
    title: params.title.trim(),
    body: params.body.trim(),
    payload: {},
  });
  if (error) throw new Error(error.message);
}

/* ----------------------------- Community ----------------------------- */

export type AdminCommunityRow = {
  id: string;
  author_name: string | null;
  topic: string;
  title: string | null;
  content: string;
  like_count: number;
  comment_count: number;
  is_pinned: boolean;
  created_at: string;
  total_count: number;
};

export async function listCommunityPosts(params: {
  limit?: number;
  offset?: number;
}): Promise<AdminCommunityRow[]> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc("admin_list_community_posts", {
    p_admin_id: requireAdminId(),
    p_limit: params.limit ?? 50,
    p_offset: params.offset ?? 0,
  });
  if (error) throw new Error(error.message);
  return unwrap<AdminCommunityRow[]>(data) ?? [];
}

export async function deleteCommunityPost(postId: string): Promise<void> {
  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc("admin_delete_community_post", {
    p_admin_id: requireAdminId(),
    p_post_id: postId,
  });
  if (error) throw new Error(error.message);
}
