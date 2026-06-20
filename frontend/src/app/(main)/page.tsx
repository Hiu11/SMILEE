"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Clock, Award, PhoneCall, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16">
        {/* Abstract Background - Enhanced */}
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 -z-10" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-linear-to-bl from-blue-400/30 to-cyan-300/20 dark:from-blue-600/20 dark:to-cyan-400/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-linear-to-tr from-cyan-400/30 to-blue-500/20 dark:from-cyan-500/20 dark:to-blue-600/10 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-sm text-blue-700 dark:text-cyan-400 text-sm font-bold mb-6 border border-blue-200/50 dark:border-blue-800/50">
                <Star className="w-4 h-4 fill-current" />
                👋 Hey! Chúng tôi là SMILEE
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6 drop-shadow-sm">
                Giúp bạn tìm lại <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600 animate-gradient-x">nụ cười rạng rỡ</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-lg">
                Chúng tôi tin rằng mỗi nụ cười đều đáng được tỏa sáng. SMILEE mang đến dịch vụ nha khoa tận tâm, hiện đại và an toàn – để bạn luôn tự tin với nụ cười của chính mình.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 text-base font-bold bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 rounded-full transition-all hover:-translate-y-1 hover:scale-105">
                  Đặt lịch khám ngay
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold rounded-full border-2 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-1 transition-all">
                  <PhoneCall className="mr-2 w-5 h-5 text-blue-600 dark:text-cyan-400" />
                  Tư vấn miễn phí
                </Button>
              </div>
              
              <div className="mt-12 flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">10k+</span>
                  <span className="text-sm text-slate-500">Khách hàng hài lòng</span>
                </div>
                <div className="w-px h-12 bg-slate-200 dark:bg-slate-800" />
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">15+</span>
                  <span className="text-sm text-slate-500">Năm kinh nghiệm</span>
                </div>
                <div className="w-px h-12 bg-slate-200 dark:bg-slate-800" />
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">50+</span>
                  <span className="text-sm text-slate-500">Chuyên gia y tế</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[600px] flex justify-center items-center"
            >
              {/* Actual Banner Image */}
              <div className="relative w-full max-w-lg aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  <img 
                    src="/pic/banner_home.png" 
                    alt="Dentist Banner" 
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(8,112,184,0.15)] dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 relative"
                  />
                  {/* Decorative background circle behind image */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-100/50 dark:bg-blue-900/30 rounded-full blur-3xl -z-10"></div>
                </motion.div>
                
                {/* Floating elements */}
                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
                  className="absolute top-1/4 -left-4 z-20 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3"
                >
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">An toàn tuyệt đối</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-1/4 -right-4 z-20 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-3"
                >
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                    <Star className="w-6 h-6 text-amber-600 dark:text-amber-400 fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Đánh giá 5.0</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-white dark:bg-black relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-blue-600 dark:text-cyan-400 font-semibold tracking-wide uppercase text-sm mb-3">Dịch Vụ Nổi Bật</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Giải Pháp Chăm Sóc Toàn Diện</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Chúng tôi cung cấp đầy đủ các dịch vụ nha khoa từ cơ bản đến chuyên sâu, đáp ứng mọi nhu cầu thẩm mỹ và điều trị của bạn.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Niềng Răng Trong Suốt", desc: "Công nghệ invisalign tiên tiến, không mắc cài, thẩm mỹ tuyệt đối." },
              { title: "Bọc Răng Sứ Thẩm Mỹ", desc: "Răng sứ cao cấp, độ bền hoàn hảo, tự nhiên như răng thật." },
              { title: "Cấy Ghép Implant", desc: "Phục hồi răng mất an toàn, bền vững trọn đời." },
              { title: "Tẩy Trắng Răng", desc: "Công nghệ laser hiện đại, an toàn, hiệu quả ngay sau 45 phút." },
              { title: "Nha Khoa Trẻ Em", desc: "Chăm sóc răng miệng chuyên biệt, nhẹ nhàng cho bé." },
              { title: "Nhổ Răng Khôn", desc: "Tiểu phẫu không đau, nhanh chóng, an toàn tuyệt đối." },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="group h-full border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-cyan-800 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h4>
                    <p className="text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                      {service.desc}
                    </p>
                    <Link href="#" className="inline-flex items-center text-blue-600 dark:text-cyan-400 font-medium hover:underline">
                      Tìm hiểu thêm <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-square md:aspect-4/3 rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                 {/* Placeholder for image */}
                 <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-cyan-400 opacity-90 mix-blend-multiply flex items-center justify-center">
                    <Stethoscope className="w-32 h-32 text-white/50" />
                 </div>
                 <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-black/90 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <p className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Trang thiết bị chuẩn Châu Âu</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Đầu tư hàng triệu đô vào hệ thống máy móc nha khoa kỹ thuật số hiện đại nhất.</p>
                 </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 text-sm font-bold mb-4 border border-cyan-200/50 dark:border-cyan-800/50 uppercase tracking-widest">Tại sao chọn SMILEE</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight leading-tight">Trải Nghiệm <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Nha Khoa Khác Biệt</span></h3>
              
              <div className="space-y-8">
                {[
                  { icon: Shield, title: "An Toàn & Vô Trùng", desc: "Hệ thống vô trùng 1 chiều đạt tiêu chuẩn quốc tế, đảm bảo an toàn tuyệt đối." },
                  { icon: Clock, title: "Tiết Kiệm Thời Gian", desc: "Quy trình số hóa giúp rút ngắn tối đa thời gian điều trị mà vẫn đạt hiệu quả cao." },
                  { icon: Award, title: "Đội Ngũ Chuyên Gia", desc: "100% bác sĩ tốt nghiệp đại học Y danh tiếng, tu nghiệp chuyên sâu tại nước ngoài." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 mt-1 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                      <p className="text-base text-slate-600 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 dark:bg-blue-900"></div>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-3xl -translate-x-1/3 translate-y-1/2" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center bg-white/10 dark:bg-black/20 backdrop-blur-lg border border-white/20 p-12 md:p-16 rounded-[2.5rem] shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Sẵn Sàng Cho Nụ Cười Mới?
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Đừng để các vấn đề răng miệng làm mất đi sự tự tin của bạn. Hãy đặt lịch khám ngay hôm nay để nhận được sự tư vấn từ các chuyên gia hàng đầu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-14 px-10 text-base bg-white text-blue-600 hover:bg-slate-50 shadow-xl rounded-full transition-all hover:scale-105">
                Đặt lịch trực tuyến
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-base border-white/30 text-white hover:bg-white/10 rounded-full">
                Xem bảng giá
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
