import Image from "next/image";
import { Award, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { Float, Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

export default function AboutPage() {
  return (
    <div className="bg-white pt-20 dark:bg-slate-950">
      <section className="container mx-auto grid gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8">
        <Reveal direction="left">
          <p className="text-sm font-extrabold uppercase tracking-wide text-blue-600 dark:text-cyan-400">Về SMILEE</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Phòng khám nha khoa hiện đại, vận hành bằng dữ liệu.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            SMILEE kết hợp chuyên môn nha khoa với hệ thống quản lý lịch hẹn, hồ sơ điều trị, hóa đơn và kho vật tư để mỗi ca chăm sóc được theo dõi rõ ràng từ tiếp nhận đến tái khám.
          </p>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["10k+", "khách hàng"],
              ["15+", "năm kinh nghiệm"],
              ["50+", "chuyên gia"],
            ].map(([number, label]) => (
              <StaggerItem key={label} whileHover={{ y: -6, scale: 1.02 }}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-3xl font-black text-blue-700 dark:text-cyan-400">{number}</p>
                  <p className="mt-1 text-sm font-bold text-slate-500">{label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal direction="right" className="relative min-h-90 overflow-hidden rounded-3xl bg-slate-100 shadow-2xl shadow-blue-950/10 dark:bg-slate-900">
          <Float className="absolute right-6 top-6 z-10 rounded-2xl border border-white/60 bg-white/90 p-3 text-blue-600 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
            <ShieldCheck className="h-6 w-6" />
          </Float>
          <Image src="/pic/article_about.png" alt="Đội ngũ SMILEE" fill className="object-cover transition duration-700 hover:scale-105" />
        </Reveal>
      </section>

      <section className="bg-slate-50 py-16 dark:bg-slate-900/50">
        <Stagger className="container mx-auto grid gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            [ShieldCheck, "An toàn", "Quy trình vô trùng và kiểm soát chất lượng theo từng bước."],
            [Users, "Tận tâm", "Lễ tân, bác sĩ và quản trị cùng nhìn một nguồn dữ liệu thống nhất."],
            [Award, "Chuyên môn", "Điều trị theo phác đồ rõ ràng, lưu hồ sơ để theo dõi dài hạn."],
            [HeartHandshake, "Minh bạch", "Dịch vụ, hóa đơn và lịch sử điều trị được quản lý trong hệ thống."],
          ].map(([Icon, title, desc]) => (
            <StaggerItem key={String(title)} whileHover={{ y: -8, scale: 1.015 }}>
              <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl dark:border-slate-800 dark:bg-slate-950">
                <Icon className="h-7 w-7 text-blue-600" />
                <h2 className="mt-4 text-lg font-extrabold text-slate-900 dark:text-white">{String(title)}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{String(desc)}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
