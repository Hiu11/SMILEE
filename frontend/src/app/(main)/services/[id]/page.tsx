"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { apiGet, formatCurrency } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Reveal, Float, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

type Service = { id: string; name: string; description?: string; price: number; duration: number };

const fallbackServices: Service[] = [
  { id: "1", name: "Khám tổng quát", description: "Kiểm tra răng miệng định kỳ và tư vấn kế hoạch chăm sóc cá nhân.", price: 250000, duration: 30 },
  { id: "2", name: "Tẩy trắng răng", description: "Công nghệ laser hiện đại, làm sáng răng an toàn và hiệu quả nhanh chóng.", price: 1200000, duration: 45 },
  { id: "3", name: "Cấy ghép Implant", description: "Phục hồi răng mất bền vững với phác đồ cá nhân hóa từ chuyên gia.", price: 18000000, duration: 90 },
  { id: "4", name: "Niềng răng", description: "Chỉnh nha mắc cài hoặc trong suốt cho nụ cười cân đối và tự nhiên.", price: 30000000, duration: 60 },
  { id: "5", name: "Bọc răng sứ", description: "Phục hồi thẩm mỹ với sứ cao cấp, màu sắc hài hòa tự nhiên.", price: 3500000, duration: 60 },
  { id: "6", name: "Nhổ răng khôn", description: "Tiểu phẫu quy trình vô trùng, phục hồi nhanh, giảm đau tối đa.", price: 800000, duration: 45 },
];

const serviceDetails: Record<string, { image: string, longDesc: string, benefits: string[], faq: {q: string, a: string}[] }> = {
  "1": {
    image: "/pic/modern_clinic.png",
    longDesc: "Khám tổng quát là bước quan trọng nhất để bảo vệ sức khỏe răng miệng dài lâu. Tại SMILEE, chúng tôi không chỉ kiểm tra bề mặt răng mà còn chụp X-quang, đánh giá tình trạng nướu và xương hàm để phát hiện sớm các vấn đề tiềm ẩn.",
    benefits: ["Phát hiện sớm sâu răng", "Tư vấn vệ sinh đúng cách", "Kiểm tra sức khỏe nướu", "Tầm soát bệnh lý răng miệng"],
    faq: [{ q: "Bao lâu nên khám tổng quát một lần?", a: "Tốt nhất là 6 tháng một lần để duy trì sức khỏe răng miệng tốt nhất." }],
  },
  "2": {
    image: "/pic/teeth_whitening.png",
    longDesc: "Tẩy trắng răng bằng công nghệ Laser tiên tiến giúp đánh bay các vết ố vàng do trà, cà phê, thuốc lá chỉ sau 45 phút. Ánh sáng xanh kích hoạt gel làm trắng, không gây ê buốt, an toàn tuyệt đối cho men răng.",
    benefits: ["Hiệu quả ngay lập tức", "Không gây ê buốt", "Màu sắc tự nhiên", "Duy trì kết quả từ 2-3 năm"],
    faq: [{ q: "Tẩy trắng răng có đau không?", a: "Công nghệ Laser tại SMILEE hoàn toàn không gây đau đớn, chỉ có cảm giác hơi ê nhẹ ở một số cơ địa nhạy cảm." }],
  },
  "3": {
    image: "/pic/implants.png",
    longDesc: "Cấy ghép Implant là giải pháp hoàn hảo để thay thế răng đã mất. Trụ Titanium siêu cấp được cấy trực tiếp vào xương hàm, đóng vai trò như chân răng thật, mang lại khả năng nhai và tính thẩm mỹ trọn vẹn.",
    benefits: ["Độ bền trọn đời", "Ngăn chặn tiêu xương hàm", "Thẩm mỹ như răng thật", "Không ảnh hưởng răng kế cận"],
    faq: [{ q: "Cấy ghép Implant mất bao lâu?", a: "Quá trình đặt trụ mất khoảng 30-45 phút, sau đó cần 3-6 tháng để trụ tích hợp hoàn toàn vào xương." }],
  },
  "4": {
    image: "/pic/braces.png",
    longDesc: "Niềng răng chỉnh nha giúp khắc phục triệt để tình trạng hô, móm, khấp khểnh. Đội ngũ chuyên gia tại SMILEE sẽ lên phác đồ cá nhân hóa bằng phần mềm 3D, dự đoán chính xác kết quả sau điều trị.",
    benefits: ["Khớp cắn chuẩn xác", "Khuôn mặt hài hòa", "Dễ dàng vệ sinh", "Hạn chế bệnh lý về sau"],
    faq: [{ q: "Niềng răng trong suốt có hiệu quả không?", a: "Có, Invisalign có hiệu quả tương đương mắc cài với thẩm mỹ tối đa, tuy nhiên phù hợp nhất với các ca từ nhẹ đến trung bình." }],
  },
  "5": {
    image: "/pic/dental_tech.png",
    longDesc: "Bọc răng sứ thẩm mỹ là lựa chọn hàng đầu cho nụ cười hoàn hảo. Chúng tôi sử dụng các dòng sứ cao cấp nhất (Cercon, Zirconia, Emax) với độ bền uốn cao, màu sắc trong bóng tự nhiên, chống bám màu tuyệt đối.",
    benefits: ["Thay đổi nụ cười tức thì", "Bảo vệ răng yếu, vỡ", "Không đen viền nướu", "Độ cứng gấp 5 lần răng thật"],
    faq: [{ q: "Bọc răng sứ có cần mài nhiều răng không?", a: "Với công nghệ bọc sứ bảo tồn, bác sĩ chỉ mài một lớp mỏng tối thiểu từ 0.5-1mm để giữ tối đa răng thật." }],
  },
  "6": {
    image: "/pic/dentist_team.png",
    longDesc: "Nhổ răng khôn bằng máy Piezotome sử dụng sóng siêu âm giúp bóc tách mô nướu nhẹ nhàng, không xâm lấn sâu. Quy trình vô trùng tuyệt đối, bác sĩ chuyên khoa phẫu thuật thực hiện giúp quá trình lành thương nhanh gấp 2 lần bình thường.",
    benefits: ["Không đau, ít chảy máu", "Thời gian nhổ nhanh", "Lành thương nhanh chóng", "Giảm thiểu sưng tấy"],
    faq: [{ q: "Nhổ răng khôn bao lâu thì ăn uống bình thường?", a: "Bạn có thể ăn đồ mềm, nguội sau vài giờ. Sau 2-3 ngày có thể ăn uống gần như bình thường." }],
  }
};

const defaultDetail = {
  image: "/pic/modern_clinic.png",
  longDesc: "SMILEE cung cấp dịch vụ nha khoa chất lượng cao với trang thiết bị hiện đại và đội ngũ chuyên gia giàu kinh nghiệm. Mỗi ca điều trị đều được cá nhân hóa nhằm mang lại hiệu quả cao nhất cho từng nụ cười.",
  benefits: ["An toàn tuyệt đối", "Đội ngũ chuyên nghiệp", "Công nghệ tiên tiến", "Chăm sóc tận tâm"],
  faq: [{ q: "Tôi nên đặt lịch trước bao lâu?", a: "Bạn nên đặt lịch trước 1-2 ngày để phòng khám sắp xếp khung giờ và bác sĩ phù hợp nhất." }]
};

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
    
    apiGet<Service[]>("/services", fallbackServices).then((data) => {
      const servicesList = data.length ? data : fallbackServices;
      const found = servicesList.find(s => s.id === id);
      setService(found || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-28">Đang tải dữ liệu...</div>;
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-28 gap-4">
        <h1 className="text-2xl font-bold">Không tìm thấy dịch vụ</h1>
        <Button onClick={() => router.push("/services")}>Quay lại danh mục</Button>
      </div>
    );
  }

  const detail = serviceDetails[service.id] || defaultDetail;

  return (
    <div className="bg-linear-to-b from-slate-50 to-white pt-20 md:pt-24 lg:pt-28 dark:from-slate-950 dark:to-slate-950 min-h-screen">
      
      {/* ── BACK BUTTON ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Tất cả dịch vụ
        </Link>
      </div>

      {/* ── HERO HEADER ── */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 md:gap-10 lg:gap-12 items-center">
          
          <Reveal direction="left">
            <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:bg-blue-900/30 dark:text-cyan-400">
              Chi tiết dịch vụ
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              {service.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {detail.longDesc}
            </p>
            
            <div className="mt-8 flex items-center gap-6 p-5 md:p-6 rounded-3xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Chi phí dự kiến</p>
                <p className="mt-1 text-2xl font-black text-blue-600 dark:text-cyan-400">{formatCurrency(service.price)}</p>
              </div>
              <div className="w-px h-12 bg-slate-200 dark:bg-slate-800"></div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Thời gian</p>
                <p className="mt-1 flex items-center gap-1.5 text-lg font-black text-slate-900 dark:text-white">
                  <Clock className="w-5 h-5 text-blue-500" />
                  {service.duration} phút
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Button asChild className="h-12 lg:h-14 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 px-8 text-white shadow-xl shadow-blue-500/30 transition-all hover:-translate-y-1 hover:shadow-blue-500/50 text-base font-bold group relative overflow-hidden">
                <Link href={`/booking?serviceId=${service.id}`}>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative flex items-center">
                    <CalendarDays className="mr-2 h-5 w-5" />
                    Đặt lịch dịch vụ này
                  </span>
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.2} className="relative aspect-square lg:aspect-4/3 w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 dark:border-white/5">
            <Float className="absolute left-6 top-6 z-10 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-xl backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/90 text-blue-600 dark:text-cyan-400">
              <Sparkles className="h-8 w-8" />
            </Float>
            <Image 
              src={detail.image} 
              alt={service.name} 
              fill 
              className="object-cover transition-transform duration-2000 hover:scale-110"
              priority
            />
          </Reveal>

        </div>
      </section>

      {/* ── BENEFITS & FAQ ── */}
      <section className="mt-12 md:mt-16 lg:mt-20 bg-slate-950 py-16 md:py-20 lg:py-24 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
            
            <Reveal direction="left">
              <h2 className="text-2xl md:text-3xl font-black mb-8 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-cyan-400" />
                Lợi ích mang lại
              </h2>
              <Stagger className="grid sm:grid-cols-2 gap-4">
                {detail.benefits.map((benefit, idx) => (
                  <StaggerItem key={idx}>
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
                      <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0" />
                      <p className="font-semibold text-slate-200">{benefit}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>

            <Reveal direction="right">
              <h2 className="text-2xl md:text-3xl font-black mb-8 flex items-center gap-3">
                <Zap className="w-8 h-8 text-blue-400" />
                Câu hỏi thường gặp
              </h2>
              <div className="space-y-6">
                {detail.faq.map((faq, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-linear-to-br from-blue-900/40 to-slate-900 border border-blue-800/50">
                    <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                    <p className="text-slate-400 leading-relaxed font-medium">{faq.a}</p>
                  </div>
                ))}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

    </div>
  );
}
