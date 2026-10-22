"use client";

import { useState } from "react";

import { ShootTile, type ShootKind } from "@/components/ShootArt";

type Job = { kind: ShootKind; group: string; title: string };

const JOBS: Job[] = [
  { kind: "portrait", group: "Chân dung", title: "Chụp headshot ngoài trời, 1 giờ" },
  { kind: "fashion", group: "Thời trang", title: "Cần mẫu ảnh lookbook 8 ảnh" },
  { kind: "product", group: "Sản phẩm", title: "Ảnh mỹ phẩm nền trắng" },
  { kind: "wedding", group: "Cặp đôi", title: "Pre-wedding cuối tuần" },
  { kind: "event", group: "Sự kiện", title: "Chụp khai trương cửa hàng" },
  { kind: "family", group: "Gia đình", title: "Ảnh gia đình tại nhà" },
  { kind: "outdoor", group: "Ngoại cảnh", title: "Concept sáng ở công viên" },
  { kind: "commercial", group: "Thương mại", title: "Bộ ảnh mạng xã hội thương hiệu" },
];

const VISIBLE = 4;

function JobRow({ job, fresh, className = "" }: { job: Job; fresh: boolean; className?: string }) {
  return (
    <div
      className={`flex h-[92px] items-center gap-3 rounded-2xl bg-white px-3 text-[#1a2744] sm:gap-4 sm:px-4 ${
        fresh ? "ring-2 ring-inset ring-[#ff5c93]" : ""
      } ${className}`}
    >
      <ShootTile kind={job.kind} small className="h-14 w-14 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#e3146f]">{job.group}</span>
          {fresh ? <span className="rounded-full bg-[#e9f8ef] px-1.5 py-px text-[10px] font-bold text-[#1f9254]">Mới</span> : null}
        </div>
        <p className="mt-0.5 truncate text-[14.5px] font-bold">{job.title}</p>
        <span className="mt-1 flex items-center gap-1 text-[12px] text-stone-500">
          <img src="/radius-pin.webp" alt="" className="h-3.5 w-3.5 object-contain" />
          Trong 10km
        </span>
      </div>
      <span className="shrink-0 whitespace-nowrap rounded-full bg-[#1a2744] px-3 py-1.5 text-[12px] font-semibold text-white">
        Gửi báo giá
      </span>
    </div>
  );
}

export function TaskerInbox() {
  const [tick, setTick] = useState(0);
  const n = JOBS.length;
  const rows = Array.from({ length: VISIBLE + 1 }, (_, k) => JOBS[(((tick - k) % n) + n) % n]);

  return (
    <div className="tasker-inbox lg:mt-10">
      <div className="relative overflow-hidden rounded-2xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[13.5px] font-semibold text-white/85">
            <ShootTile kind="photographer" small className="h-5 w-5 rounded-md" />
            Đơn mới phù hợp
          </span>
          <span className="tasker-live flex items-center gap-2 text-[12.5px] font-bold text-[#7ee2a8]">
            <i />
            Đang nhận lịch
          </span>
        </div>
        <span
          key={`timer-${tick}`}
          className="tasker-inbox-timer absolute inset-x-0 bottom-0 h-[3px] bg-[#ff5c93]"
          onAnimationEnd={() => setTick((value) => value + 1)}
        />
      </div>

      <div className="relative mt-3 h-[404px] overflow-hidden">
        <div key={`list-${tick}`} className={`flex flex-col gap-3 ${tick > 0 ? "tasker-inbox-shift" : ""}`}>
          {rows.map((job, index) => (
            <JobRow
              key={`${job.title}-${index}`}
              job={job}
              fresh={index === 0}
              className={tick > 0 && index === 0 ? "tasker-inbox-new" : tick > 0 && index === VISIBLE ? "tasker-inbox-out" : ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
