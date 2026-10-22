/** rem tính từ mép khung nội dung max-w-6xl (36rem mỗi bên) ra phía lề. */
const gutter = (rem: number) => `calc(50% - 36rem - ${rem}rem)`;

const GRID = 64;

const RUNS_X = [
  { row: 2, dur: 12, delay: 0 },
  { row: 6, dur: 15, delay: 5 },
];

const RUNS_Y = [
  { col: 3, dur: 9, delay: 2 },
  { col: 27, dur: 11, delay: 6 },
];

const PROPS: { img: string; pos: React.CSSProperties; size: number; float: string; delay: number; far?: boolean }[] = [
  { img: "/float-star-out.webp", pos: { left: gutter(9), top: "6%" }, size: 72, float: "float-a", delay: 0 },
  { img: "/float-shield-out.webp", pos: { left: gutter(15.5), top: "54%" }, size: 88, float: "float-b", delay: 0.8, far: true },
  { img: "/coin-dollar.webp", pos: { left: gutter(6), top: "76%" }, size: 64, float: "float-c", delay: 1.6 },
  { img: "/radius-chat.webp", pos: { right: gutter(7.5), top: "6%" }, size: 80, float: "float-b", delay: 0.4 },
  { img: "/float-clock-out.webp", pos: { right: gutter(16), top: "58%" }, size: 70, float: "float-d", delay: 1.2, far: true },
  { img: "/float-marker-out.webp", pos: { right: gutter(5.5), top: "76%" }, size: 76, float: "float-a", delay: 2 },
];

const LEFT_SLOT = { left: gutter(18), top: "30%" };
const RIGHT_SLOT = { right: gutter(18), top: "32%" };

const TOASTS: { title: string; body: string; img: string; pos: React.CSSProperties; delay: number }[] = [
  { title: "Đã nhận lịch chụp", body: "Chân dung · hôm nay", img: "/logo-castnow.webp", pos: LEFT_SLOT, delay: 0 },
  { title: "Tin nhắn mới", body: "Mẫu ảnh vừa trả lời trong đơn", img: "/radius-chat.webp", pos: RIGHT_SLOT, delay: 3 },
  { title: "Thanh toán thành công", body: "Đã thanh toán trên đơn", img: "/coin-dollar.webp", pos: LEFT_SLOT, delay: 6 },
  { title: "Người gần địa điểm", body: "Tìm trong bán kính ~10km", img: "/float-marker-out.webp", pos: RIGHT_SLOT, delay: 9 },
];

export function AppHeroBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="app-bg-grid absolute inset-0" style={{ backgroundSize: `${GRID}px ${GRID}px` }}>
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
      </div>
      {PROPS.map((prop) => (
        <span key={prop.img} className={`app-bg-prop${prop.far ? " is-far" : ""}`} style={prop.pos}>
          <span
            className={`app-bg-prop-tile ${prop.float}`}
            style={{ width: prop.size, height: prop.size, animationDelay: `${prop.delay}s` }}
          >
            <img src={prop.img} alt="" style={{ width: prop.size * 0.62, height: prop.size * 0.62 }} />
          </span>
        </span>
      ))}
      {TOASTS.map((toast) => (
        <span key={toast.title} className="app-bg-toast" style={{ ...toast.pos, animationDelay: `${toast.delay}s` }}>
          <span className="app-bg-toast-icon">
            <img src={toast.img} alt="" />
          </span>
          <span className="min-w-0">
            <span className="block text-[13px] font-bold leading-tight text-[#1a2744]">{toast.title}</span>
            <span className="mt-0.5 block text-[12px] leading-tight text-stone-500">{toast.body}</span>
          </span>
        </span>
      ))}
    </div>
  );
}
