import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarCheck, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

const articles = [
  { title: "5 dấu hiệu nên đi khám răng sớm", desc: "Ê buốt, chảy máu nướu hoặc hôi miệng kéo dài có thể là tín hiệu cần kiểm tra ngay.", image: "/pic/article1.png", tag: "Chăm sóc hằng ngày", readTime: "3 phút" },
  { title: "Niềng răng cần chuẩn bị gì?", desc: "Các bước thăm khám, chụp phim, lên phác đồ và theo dõi định kỳ khi chỉnh nha.", image: "/pic/article2.png", tag: "Chỉnh nha", readTime: "5 phút" },
  { title: "Vì sao nên lấy cao răng định kỳ?", desc: "Lấy cao răng đúng lịch giúp giảm viêm nướu và giữ hơi thở thơm tho, sạch hơn.", image: "/pic/article_about.png", tag: "Phòng ngừa", readTime: "4 phút" },
];

const tagColors: Record<string, string> = {
  "Chăm sóc hằng ngày": "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-cyan-300",
  "Chỉnh nha": "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  "Phòng ngừa": "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
};

export default function KnowledgePage() {
  return (
    <div className="bg-linear-to-b from-slate-50 to-white pt-28 dark:from-slate-950 dark:to-slate-950">

      {/* ── HERO ── */}
      <section className="container mx-auto px-4 pb-4 pt-14 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:bg-blue-900/30 dark:text-cyan-400">
            Kiến thức nha khoa
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Hiểu đúng để chăm sóc răng miệng{" "}
            <span className="gradient-text">dễ hơn.</span>
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-500 dark:text-slate-400">
            Các bài viết ngắn gọn giúp bạn chuẩn bị trước khi khám, hiểu quy trình điều trị và biết khi nào cần gặp nha sĩ.
          </p>
        </Reveal>
      </section>

      {/* ── ARTICLES ── */}
      <section className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <Stagger className="grid gap-8 md:grid-cols-3">
          {articles.map((article) => (
            <StaggerItem key={article.title} whileHover={{ y: -10 }}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900">
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image src={article.image} alt={article.title} fill className="object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
                  {/* Tag overlay */}
                  <div className="absolute left-4 top-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold backdrop-blur ${tagColors[article.tag] ?? "bg-slate-100 text-slate-700"}`}>
                      {article.tag}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    Đọc trong {article.readTime}
                  </div>
                  <h2 className="flex-1 text-xl font-extrabold leading-snug text-slate-900 dark:text-white">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">{article.desc}</p>
                  <Link href="/booking" className="mt-5 inline-flex items-center text-sm font-extrabold text-blue-600 transition hover:translate-x-1 dark:text-cyan-400">
                    Tư vấn với nha sĩ
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── DARK BANNER ── */}
      <section className="bg-slate-950 py-20">
        <Reveal direction="scale" className="container mx-auto grid gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            [ShieldCheck, "Phòng ngừa", "Khám định kỳ và vệ sinh đúng cách giúp giảm rủi ro điều trị phức tạp."],
            [Sparkles, "Thẩm mỹ", "Tẩy trắng, răng sứ và chỉnh nha cần được tư vấn theo tình trạng răng thật."],
            [CalendarCheck, "Tái khám", "Tuân thủ lịch hẹn giúp bác sĩ theo dõi tiến triển và điều chỉnh phác đồ."],
          ].map(([Icon, title, desc]) => (
            <div key={String(title)} className="rounded-2xl border border-white/8 p-6 transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-cyan-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-extrabold text-white">{String(title)}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{String(desc)}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section className="py-14">
        <Reveal className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-extrabold text-slate-700 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <BookOpen className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
            Xem tất cả dịch vụ
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
