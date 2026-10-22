"use client";

import { useState, type FormEvent } from "react";

import { SUPPORT_EMAIL } from "@/lib/site";

const TOPICS = [
  { value: "Ho tro don", label: "Hỗ trợ đơn / tài khoản" },
  { value: "Hop tac", label: "Hợp tác thương hiệu / studio" },
  { value: "Mau anh", label: "Hồ sơ mẫu ảnh" },
  { value: "Khac", label: "Khác" },
] as const;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<string>(TOPICS[0].value);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`[CastNow] ${topic} — ${name.trim() || "Khách"}`);
    const body = encodeURIComponent(
      [`Họ tên: ${name.trim() || "(chưa ghi)"}`, `Email: ${email.trim() || "(chưa ghi)"}`, `Chủ đề: ${topic}`, "", message.trim()].join("\n"),
    );
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="contact-form space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-[13px] font-semibold text-[#1a2744]">Họ và tên</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nguyễn Văn A"
            className="contact-input mt-2 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-[15px] text-[#1a2744] outline-none transition placeholder:text-stone-400 focus:border-[#e3146f] focus:ring-2 focus:ring-[#e3146f]/15"
          />
        </label>
        <label className="block">
          <span className="text-[13px] font-semibold text-[#1a2744]">Email của bạn</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ban@email.com"
            className="contact-input mt-2 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-[15px] text-[#1a2744] outline-none transition placeholder:text-stone-400 focus:border-[#e3146f] focus:ring-2 focus:ring-[#e3146f]/15"
          />
        </label>
      </div>

      <fieldset>
        <legend className="text-[13px] font-semibold text-[#1a2744]">Chủ đề</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {TOPICS.map((item) => (
            <label
              key={item.value}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-[14.5px] font-medium transition ${
                topic === item.value
                  ? "border-[#e3146f] bg-[#fff0f6] text-[#e3146f]"
                  : "border-stone-200 bg-white text-[#1a2744] hover:border-pink-200"
              }`}
            >
              <input
                type="radio"
                name="topic"
                value={item.value}
                checked={topic === item.value}
                onChange={() => setTopic(item.value)}
                className="sr-only"
              />
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                  topic === item.value ? "border-[#e3146f]" : "border-stone-300"
                }`}
                aria-hidden
              >
                {topic === item.value ? <span className="h-2 w-2 rounded-full bg-[#e3146f]" /> : null}
              </span>
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="text-[13px] font-semibold text-[#1a2744]">Nội dung</span>
        <textarea
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mô tả ngắn vấn đề hoặc nhu cầu. Nếu liên quan đơn, ghi thêm mã đơn."
          className="contact-input mt-2 w-full resize-y rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-[15px] leading-7 text-[#1a2744] outline-none transition placeholder:text-stone-400 focus:border-[#e3146f] focus:ring-2 focus:ring-[#e3146f]/15"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13.5px] leading-6 text-stone-500">
          Form mở ứng dụng email với sẵn địa chỉ{" "}
          <span className="font-semibold text-[#1a2744]">{SUPPORT_EMAIL}</span>.
        </p>
        <button
          type="submit"
          className="contact-submit inline-flex items-center justify-center gap-2 rounded-full bg-[#e3146f] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_28px_-10px_rgba(227,20,111,0.55)] transition hover:bg-[#c40f5f]"
        >
          Gửi tin nhắn
          <span aria-hidden>→</span>
        </button>
      </div>

      {sent ? (
        <p className="rounded-2xl bg-[#fff0f6] px-4 py-3 text-[14px] font-medium text-[#e3146f]" role="status">
          Đã mở hộp thư. Nếu không thấy cửa sổ email, hãy gửi trực tiếp tới {SUPPORT_EMAIL}.
        </p>
      ) : null}
    </form>
  );
}
