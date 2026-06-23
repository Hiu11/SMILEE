import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

const articles = [
  {
    title: "5 dấu hiệu nên đi khám răng sớm",
    desc: "Ê buốt, chảy máu nướu hoặc hôi miệng kéo dài có thể là tín hiệu cần kiểm tra.",
    image: "/pic/article1.png",
    tag: "Chăm sóc hằng ngày",
  },
  {
    title: "Niềng răng cần chuẩn bị gì?",
    desc: "Các bước thăm khám, chụp phim, lên phác đồ và theo dõi định kỳ khi chỉnh nha.",
    image: "/pic/article2.png",
    tag: "Chỉnh nha",
  },
  {
    title: "Vì sao nên lấy cao răng định kỳ?",
    desc: "Lấy cao răng đúng lịch giúp giảm viêm nướu và giữ hơi thở sạch hơn.",
    image: "/pic/article_about.png",
    tag: "Phòng ngừa",
  },
];

export default function KnowledgePage() {
  return (
    <div className="bg-white pt-28 dark:bg-slate-950">
      <section className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600 dark:text-cyan-400">Kiến thức nha khoa</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Hiểu đúng để chăm sóc răng miệng dễ hơn.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Các bài viết ngắn gọn giúp khách hàng chuẩn bị trước khi khám, hiểu quy trình điều trị và biết khi nào cần gặp nha sĩ.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <StaggerItem key={article.title} whileHover={{ y: -10, scale: 1.015 }}>
              <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition-shadow hover:shadow-xl hover:shadow-blue-950/10 dark:border-slate-800 dark:bg-slate-900">
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image src={article.image} alt={article.title} fill className="object-cover transition duration-700 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-extrabold text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/40 dark:text-cyan-300">
                    {article.tag}
                  </span>
                  <h2 className="mt-4 text-xl font-extrabold text-slate-900 dark:text-white">{article.title}</h2>
                  <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600 dark:text-slate-400">{article.desc}</p>
                  <Link href="/booking" className="mt-4 inline-flex items-center text-sm font-extrabold text-blue-600 transition hover:translate-x-1 hover:text-blue-700 dark:text-cyan-400">
                    Tư vấn với nha sĩ
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal direction="scale" className="mt-12 grid gap-5 rounded-3xl bg-slate-950 p-6 text-white shadow-2xl shadow-blue-950/20 md:grid-cols-3 md:p-8">
          {[
            [ShieldCheck, "Phòng ngừa", "Khám định kỳ và vệ sinh đúng cách giúp giảm rủi ro điều trị phức tạp."],
            [Sparkles, "Thẩm mỹ", "Tẩy trắng, răng sứ và chỉnh nha cần được tư vấn theo tình trạng răng thật."],
            [CalendarCheck, "Tái khám", "Tuân thủ lịch hẹn giúp bác sĩ theo dõi tiến triển và điều chỉnh phác đồ."],
          ].map(([Icon, title, desc]) => (
            <section key={String(title)} className="rounded-2xl border border-white/10 p-5 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/5">
              <Icon className="h-7 w-7 text-cyan-300" />
              <h3 className="mt-4 font-extrabold">{String(title)}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{String(desc)}</p>
            </section>
          ))}
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <Link href="/services" className="inline-flex items-center rounded-full border border-slate-200 px-6 py-3 text-sm font-extrabold text-slate-700 transition hover:-translate-y-1 hover:bg-slate-50 hover:shadow-lg dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900">
            <BookOpen className="mr-2 h-4 w-4" />
            Xem dịch vụ liên quan
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
