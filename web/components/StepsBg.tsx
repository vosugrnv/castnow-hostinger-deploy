/** rem tính từ mép khung nội dung max-w-6xl (36rem mỗi bên) ra phía lề. */
const gutter = (rem: number) => `calc(50% - 36rem - ${rem}rem)`;

const PROPS: { img: string; pos: React.CSSProperties; size: number; float: string; delay: number }[] = [
  { img: "/float-clock-out.webp", pos: { left: gutter(7), top: "18%" }, size: 72, float: "float-a", delay: 0 },
  { img: "/float-coins-out.webp", pos: { left: gutter(12), top: "62%" }, size: 64, float: "float-c", delay: 1.2 },
  { img: "/float-star-out.webp", pos: { right: gutter(8), top: "14%" }, size: 66, float: "float-b", delay: 0.6 },
  { img: "/radius-pin.webp", pos: { right: gutter(12), top: "60%" }, size: 74, float: "float-d", delay: 1.8 },
];

const SPARKS: { pos: React.CSSProperties; size: number; delay: number }[] = [
  { pos: { left: "8%", top: "12%" }, size: 14, delay: 0 },
  { pos: { left: "18%", top: "30%" }, size: 10, delay: 1.4 },
  { pos: { left: "4%", top: "78%" }, size: 12, delay: 2.6 },
  { pos: { left: "28%", top: "88%" }, size: 9, delay: 0.8 },
  { pos: { right: "6%", top: "40%" }, size: 14, delay: 2 },
  { pos: { right: "20%", top: "10%" }, size: 10, delay: 3.2 },
  { pos: { right: "3%", top: "86%" }, size: 11, delay: 1 },
  { pos: { right: "26%", top: "90%" }, size: 9, delay: 2.2 },
];

export function StepsBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="steps-bg-dots absolute inset-0" />
      {SPARKS.map((spark, index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          width={spark.size}
          height={spark.size}
          className="steps-bg-spark"
          style={{ ...spark.pos, animationDelay: `${spark.delay}s` }}
        >
          <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0z" />
        </svg>
      ))}
      {PROPS.map((prop) => (
        <img
          key={prop.img}
          src={prop.img}
          alt=""
          className={`steps-bg-prop ${prop.float}`}
          style={{ ...prop.pos, width: prop.size, height: prop.size, animationDelay: `${prop.delay}s` }}
        />
      ))}
    </div>
  );
}
