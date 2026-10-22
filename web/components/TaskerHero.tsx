import Link from "next/link";

import { Breadcrumb, JsonLd, breadcrumbLd } from "@/components/PageKit";
import { ShootTile } from "@/components/ShootArt";
import { TaskerInbox } from "@/components/TaskerInbox";

const PERKS = [
  { img: "/radius-pin.webp", text: "Lịch hiện theo khu vực bạn bật nhận" },
  { img: "/radius-chat.webp", text: "Hỏi khách và chốt giá ngay trong đơn" },
  { img: "/coin-dollar.webp", text: "Ví: sao kê, rút tiền, thu bằng QR" },
];

const GRID = 64;

const RUNS_X = [
  { row: 2, dur: 11, delay: 0 },
  { row: 5, dur: 14, delay: 4 },
  { row: 8, dur: 9, delay: 2 },
  { row: 10, dur: 16, delay: 7 },
];

const RUNS_Y = [
  { col: 9, dur: 10, delay: 1 },
  { col: 15, dur: 13, delay: 5 },
  { col: 20, dur: 8, delay: 3 },
  { col: 26, dur: 12, delay: 8 },
];

const PINS = [
  { col: 8, row: 3, delay: 0 },
  { col: 13, row: 9, delay: 1.6 },
  { col: 17, row: 2, delay: 3.2 },
  { col: 22, row: 7, delay: 4.6 },
  { col: 27, row: 4, delay: 2.4 },
  { col: 4, row: 10, delay: 5.4 },
];

function TaskerHeroBg() {
  return (
    <div className="tk-bg pointer-events-none absolute inset-0" aria-hidden>
      <div className="tk-bg-grid absolute inset-0" style={{ backgroundSize: `${GRID}px ${GRID}px` }} />
      {RUNS_X.map((run) => (
        <span
          key={`x${run.row}`}
          className="tk-run-x"
          style={{ top: run.row * GRID - 1, animationDuration: `${run.dur}s`, animationDelay: `${run.delay}s` }}
        />
      ))}
      {RUNS_Y.map((run) => (
        <span
          key={`y${run.col}`}
          className="tk-run-y"
          style={{ left: run.col * GRID - 1, animationDuration: `${run.dur}s`, animationDelay: `${run.delay}s` }}
        />
      ))}
      {PINS.map((pin) => (
        <span
          key={`${pin.col}-${pin.row}`}
          className="tk-pin"
          style={{ left: pin.col * GRID, top: pin.row * GRID, animationDelay: `${pin.delay}s` }}
        />
      ))}
    </div>
  );
}

export function TaskerHero() {
  return (
    <section className="relative overflow-hidden bg-[#1a2744] text-white">
      <JsonLd data={breadcrumbLd("Nhận lịch chụp", "/nhan-lich-chup")} />
      <TaskerHeroBg />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:pb-0 lg:pt-12">
        <div className="lg:pb-20">
          <Breadcrumb crumb="Nhận lịch chụp" dark />
          <p
            className="hero-up mt-8 inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3.5 py-1.5 text-[12.5px] font-bold text-[#ff8fb8] ring-1 ring-white/15"
            style={{ animationDelay: "80ms" }}
          >
            <ShootTile kind="photographer" small className="h-4 w-4 rounded" />
            Dành cho mẫu ảnh
          </p>
          <h1
            className="hero-up mt-5 text-[2.2rem] font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-[2.9rem] lg:text-[2.75rem] xl:text-[3.15rem]"
            style={{ animationDelay: "160ms" }}
          >
            Portfolio Của Bạn,
            <span className="mt-1 block text-[#ff5c93]">Lịch Chụp Quanh Đây</span>
          </h1>
          <p className="hero-up mt-5 max-w-xl text-[17px] leading-8 text-white/75" style={{ animationDelay: "240ms" }}>
            Bạn là mẫu ảnh? Nhận lịch trên CastNow, trao đổi brief với khách trong app và quản lý thu nhập ở một nơi.
          </p>
          <ul className="hero-up mt-7 space-y-3" style={{ animationDelay: "300ms" }}>
            {PERKS.map((perk) => (
              <li key={perk.text} className="flex items-center gap-3 text-[15px] text-white/85">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] ring-1 ring-white/10">
                  <img src={perk.img} alt="" className="h-5 w-5 object-contain" />
                </span>
                {perk.text}
              </li>
            ))}
          </ul>
          <div className="hero-up mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "360ms" }}>
            <Link
              href="/tai-ung-dung"
              className="btn-lift inline-flex items-center gap-2 rounded-full bg-[#e3146f] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#ff3d7f]"
            >
              Đăng ký nhận lịch <span aria-hidden>→</span>
            </Link>
            <Link
              href="#cong-cu"
              className="btn-lift inline-flex items-center rounded-full bg-white/10 px-6 py-3 text-[15px] font-semibold text-white ring-1 ring-white/25 hover:bg-white/15"
            >
              Xem công cụ nhận lịch
            </Link>
          </div>
        </div>

        <div className="hero-scale relative lg:pb-16" style={{ animationDelay: "200ms" }} aria-hidden>
          <TaskerInbox />
        </div>
      </div>
    </section>
  );
}
