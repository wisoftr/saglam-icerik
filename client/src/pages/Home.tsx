import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Check,
  ChevronRight,
  Code2,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PenTool,
  Search,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

type Filter = "Tümü" | "Dijital" | "Marka" | "Büyüme" | "Sistem";

type Client = {
  name: string;
  category: Exclude<Filter, "Tümü">;
  tag: string;
  period: string;
  services: string[];
};

const clients: Client[] = [
  {
    name: "Dörtler Nakliyat",
    category: "Dijital",
    tag: "Tehlikeli madde taşımacılığı",
    period: "2019'dan beri",
    services: ["Web sitesi", "SEO", "İçerik yönetimi", "Hosting & domain"],
  },
  {
    name: "Mersinli Ciğerci Apo",
    category: "Dijital",
    tag: "Zincir restoranlar",
    period: "2023'ten beri",
    services: ["Web sitesi", "QR menü", "Basılı menü", "Fatura programı", "Broşür"],
  },
  {
    name: "Reallife Klinik",
    category: "Büyüme",
    tag: "Klinik",
    period: "2023'ten beri",
    services: ["Web sitesi", "SEO", "Google Ads", "Meta reklam", "Sosyal medya"],
  },
  {
    name: "Yusuf Durmuş",
    category: "Dijital",
    tag: "Akademi & eğitim",
    period: "10 yıl",
    services: ["3 web sitesi", "İçerik yönetimi", "YouTube kanalı", "Google Ads"],
  },
  {
    name: "Prof. Dr. Savaş Serel",
    category: "Büyüme",
    tag: "Klinik",
    period: "2019'dan beri",
    services: ["Web sitesi", "SEO", "Google İşletme", "Sosyal medya"],
  },
  {
    name: "TLS Sağlık",
    category: "Dijital",
    tag: "Tıbbi cihaz üreticisi",
    period: "2025",
    services: ["Web sitesi", "Sosyal medya yönetimi"],
  },
  {
    name: "Hes Ecza",
    category: "Sistem",
    tag: "Ecza deposu",
    period: "",
    services: ["Web sitesi", "Envanter yönetimi", "B2B yazılım"],
  },
  {
    name: "Aromeris",
    category: "Marka",
    tag: "Aromatik yağ üretimi",
    period: "2025",
    services: ["Logo", "Ambalaj tasarımı", "E-ticaret", "Ödeme altyapısı"],
  },
  {
    name: "Vitalmira Klinik",
    category: "Sistem",
    tag: "Sağlık turizm ajansı",
    period: "2025–2026",
    services: ["Logo", "Web sitesi", "Kurumsal CRM", "Lead yönetimi", "Reklam yönetimi"],
  },
  {
    name: "Mednjoy",
    category: "Büyüme",
    tag: "Sağlık turizm ajansı",
    period: "2023'ten beri",
    services: ["Web sitesi", "Zoho CRM", "Lead yönetimi", "Google Ads", "Meta reklam"],
  },
  {
    name: "Papatya Dental",
    category: "Sistem",
    tag: "Diş kliniği",
    period: "2026",
    services: ["Lead management", "Müşteri destek sohbet botu"],
  },
  {
    name: "Luna",
    category: "Büyüme",
    tag: "Nail studio",
    period: "2021'den beri",
    services: ["Logo", "Web sitesi", "İçerik yönetimi", "Google Ads", "Sohbet botu"],
  },
  {
    name: "Şenay Aslan",
    category: "Marka",
    tag: "Güzellik merkezi",
    period: "2025'ten beri",
    services: ["Logo", "Tabela", "Google İşletme", "Sosyal medya", "İçerik üretimi"],
  },
  {
    name: "Figence Organizasyon",
    category: "Marka",
    tag: "Açılış organizasyonu",
    period: "2020'den beri",
    services: ["Logo", "Kartvizit", "Broşür", "Google İşletme", "Meta reklam"],
  },
  {
    name: "Tane Market",
    category: "Sistem",
    tag: "Alkollü içecek toptancısı",
    period: "2025",
    services: ["Envanter yönetimi", "B2B uygulaması", "Mobil uygulama"],
  },
  {
    name: "Game Hero",
    category: "Sistem",
    tag: "Kripto tabanlı oyun",
    period: "2022–2024",
    services: ["Logo", "Whitepaper", "Tokenomics", "Solidity token", "Web tabanlı oyun"],
  },
  {
    name: "XMUL",
    category: "Sistem",
    tag: "Health token",
    period: "2025",
    services: ["Whitepaper", "Tokenomics", "Solidity token", "Web3 cüzdan"],
  },
  {
    name: "Rumi Pulse",
    category: "Büyüme",
    tag: "Sağlık turizmi firması",
    period: "2025'ten beri",
    services: ["Web sitesi", "Kurumsal CRM", "Lead yönetimi", "Google Ads", "Sosyal medya"],
  },
  {
    name: "Takas Gayrimenkul",
    category: "Sistem",
    tag: "Gayrimenkul firması",
    period: "2026",
    services: ["İlan içerik uygulaması", "Sosyal medya gönderileri", "Otomasyon"],
  },
  {
    name: "Firetis",
    category: "Marka",
    tag: "Yangın söndürme",
    period: "2020–2024",
    services: ["Logo", "Kartvizit", "Katalog", "Web sitesi", "Sosyal medya"],
  },
  {
    name: "Lucky Homes",
    category: "Marka",
    tag: "Airbnb işletmesi",
    period: "2026",
    services: ["Logo", "Welcome sign", "House rules", "Wi-Fi poster"],
  },
  {
    name: "Çek Büyükelçiliği",
    category: "Marka",
    tag: "Elçilik",
    period: "2022",
    services: ["Etkinlik afişi", "Davetiye", "Kitap kapağı", "Mizanpaj", "Basım"],
  },
  {
    name: "Eka Trafo",
    category: "Marka",
    tag: "Trafo üretimi",
    period: "2020–2024",
    services: ["Kartvizit", "Katalog tasarımı", "Basım"],
  },
  {
    name: "Cadde 7 Otel",
    category: "Dijital",
    tag: "Otel işletmesi",
    period: "2020'den beri",
    services: ["Logo", "Kurumsal kimlik", "Tabela", "Web sitesi", "Sosyal medya"],
  },
  {
    name: "Doç. Dr. Ümit Korucuoğlu",
    category: "Büyüme",
    tag: "Klinik",
    period: "2021–2023",
    services: ["Google İşletme", "Sosyal medya yönetimi"],
  },
];

const filters: Filter[] = ["Tümü", "Dijital", "Marka", "Büyüme", "Sistem"];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -9% 0px", threshold: 0.08 },
    );
    root.classList.add("reveal-ready");
    const observeTargets = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((element) => observer.observe(element));
    };
    observeTargets(document);
    const mutationObserver = new MutationObserver(() => observeTargets(document));
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}

export default function Home() {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState<Filter>("Tümü");
  const [showAll, setShowAll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredClients = useMemo(
    () => (activeFilter === "Tümü" ? clients : clients.filter((client) => client.category === activeFilter)),
    [activeFilter],
  );
  const visibleClients = showAll ? filteredClients : filteredClients.slice(0, 8);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Mesajınız alındı.", {
      description: "Form bağlantısı demo olarak hazır. Gönderim adresi yayına almadan önce bağlanabilir.",
    });
    event.currentTarget.reset();
  };

  const changeFilter = (filter: Filter) => {
    setActiveFilter(filter);
    setShowAll(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-ink text-cream selection:bg-lime selection:text-ink">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
        <div className="container flex h-[76px] items-center justify-between">
          <a href="#top" data-reveal="fade" className="group flex items-center gap-3" aria-label="wisoft.tech ana sayfa">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime text-sm font-black text-ink transition-transform duration-200 group-hover:rotate-12">
              W/
            </span>
            <span className="font-display text-[15px] font-bold uppercase tracking-[0.14em]">wisoft.tech</span>
          </a>
          <div className="hidden items-center gap-8 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream/60 md:flex">
            <a className="transition-colors hover:text-lime" href="#hizmetler">Hizmetler</a>
            <a className="transition-colors hover:text-lime" href="#referanslar">Referanslar</a>
            <a className="transition-colors hover:text-lime" href="#surec">Süreç</a>
          </div>
          <button
            onClick={() => scrollToSection("iletisim")}
            className="hidden items-center gap-2 rounded-full border border-lime/40 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-lime transition-all duration-200 hover:bg-lime hover:text-ink active:scale-[.97] md:flex"
          >
            Proje konuşalım <ArrowUpRight size={14} />
          </button>
          <button
            className="rounded-full border border-white/15 p-2 text-cream md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 bg-ink px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-[0.14em] text-cream/70">
              <a href="#hizmetler" onClick={() => setMenuOpen(false)}>Hizmetler</a>
              <a href="#referanslar" onClick={() => setMenuOpen(false)}>Referanslar</a>
              <a href="#surec" onClick={() => setMenuOpen(false)}>Süreç</a>
              <a className="text-lime" href="#iletisim" onClick={() => setMenuOpen(false)}>Proje konuşalım →</a>
            </div>
          </div>
        )}
      </nav>

      <a
        href="https://wa.me/905552696626?text=Merhaba%20wisoft.tech%2C%20projem%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum."
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp üzerinden wisoft.tech ile mesajlaşın"
        className="whatsapp-float group"
      >
        <span className="whatsapp-pulse" aria-hidden="true" />
        <span className="whatsapp-label">WhatsApp'tan yazın</span>
        <span className="whatsapp-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.02 4.25c-6.48 0-11.74 5.26-11.74 11.74 0 2.07.54 4.08 1.57 5.85L4.2 27.75l6.05-1.59a11.7 11.7 0 0 0 5.77 1.52h.01c6.47 0 11.72-5.26 11.72-11.74S22.5 4.25 16.02 4.25Zm0 21.45h-.01a9.73 9.73 0 0 1-4.96-1.36l-.36-.21-3.59.94.96-3.5-.23-.36a9.71 9.71 0 0 1-1.49-5.22c0-5.38 4.38-9.76 9.77-9.76 2.6 0 5.05 1.02 6.89 2.87a9.68 9.68 0 0 1 2.86 6.9c0 5.38-4.38 9.76-9.74 9.76Zm5.35-7.31c-.29-.15-1.71-.84-1.98-.94-.27-.1-.46-.15-.65.15-.19.29-.74.94-.91 1.13-.17.2-.34.22-.63.07-.29-.15-1.2-.44-2.29-1.41-.85-.76-1.42-1.69-1.59-1.98-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.2.05-.37-.02-.52-.07-.15-.65-1.57-.89-2.15-.24-.56-.47-.49-.65-.5h-.55c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.49s1.06 2.89 1.2 3.09c.15.2 2.09 3.19 5.07 4.48.71.31 1.27.5 1.71.64.72.23 1.38.2 1.9.12.58-.09 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.27-.19-.56-.34Z" fill="currentColor" />
          </svg>
        </span>
      </a>

      <section id="top" className="relative isolate flex min-h-[820px] items-end overflow-hidden pt-28">
        <div className="absolute inset-0 -z-20 bg-ink" />
        <div className="absolute -right-20 top-28 -z-10 h-[560px] w-[560px] rounded-full bg-lime/10 blur-[140px]" />
        <div className="absolute left-[16%] top-[32%] -z-10 h-56 w-56 rounded-full bg-cobalt/20 blur-[100px]" />
        <div className="container relative z-10 grid w-full gap-12 pb-20 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:gap-20 lg:pb-28">
          <div data-reveal="up" className="max-w-[710px]">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-lime/30 bg-lime/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-lime">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
              Dijital deneyimler / 2016—2026
            </div>
            <h1 className="font-display text-[clamp(3.5rem,8.5vw,8.6rem)] font-black leading-[.82] tracking-[-0.075em] text-cream">
              İçerik değil,<br />
              <span className="text-lime">iz bırakırız.</span>
            </h1>
            <p className="mt-9 max-w-[520px] text-lg leading-relaxed text-cream/65 md:text-xl">
              Markaların kendini daha net anlatması, daha iyi görünmesi ve daha çok iş yapması için tasarım, teknoloji ve büyümeyi aynı masada buluşturuyoruz.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection("referanslar")}
                className="group flex items-center gap-3 rounded-full bg-lime px-5 py-3 text-xs font-black uppercase tracking-[0.15em] text-ink transition-all duration-200 hover:bg-cream active:scale-[.97]"
              >
                İşlerimize bakın <ArrowDown className="transition-transform duration-200 group-hover:translate-y-1" size={16} />
              </button>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cream/35">100+ farklı proje</span>
            </div>
          </div>

          <div data-reveal="up" className="relative mx-auto w-full max-w-[550px] lg:mb-1">
            <div className="absolute -left-4 -top-4 z-10 flex h-20 w-20 rotate-[-10deg] items-center justify-center rounded-full bg-lime text-center text-[10px] font-black uppercase leading-tight tracking-[0.08em] text-ink shadow-[0_18px_45px_rgba(198,255,80,.18)]">
              Fikirden<br />etkiye
            </div>
            <div className="relative aspect-[.9] overflow-hidden rounded-[2rem] border border-white/15 bg-[#10172a] shadow-2xl shadow-black/40 sm:aspect-square">
              <img src="/manus-storage/saglam-icerik-hero_437a3a92.jpg" alt="wisoft.tech için soyut dijital sanat çalışması" className="h-full w-full object-cover opacity-80 mix-blend-screen" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/10" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">Studio note / 001</p>
                  <p className="mt-2 max-w-[200px] text-sm font-semibold leading-snug text-cream">Her temas noktasında biraz daha sağlam.</p>
                </div>
                <Sparkles className="mb-1 text-lime" size={20} />
              </div>
            </div>
            <div className="absolute -bottom-5 -right-4 hidden rounded-2xl border border-white/15 bg-[#141c31]/90 p-4 backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['D', 'M', 'R'].map((letter, index) => (
                    <span key={letter} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#141c31] text-[10px] font-black text-ink ${index === 1 ? 'bg-cream' : 'bg-lime'}`}>{letter}</span>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold text-cream">100+ proje</p>
                  <p className="text-[10px] text-cream/45">ve devam ediyor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </section>

      <section className="border-y border-white/10 bg-ink-2">
        <div className="container grid divide-y divide-white/10 py-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-0">
          {[
                    ["100+", "farklı proje"],
                    ["20 yıl", "süregelen tecrübe"],
            ["360°", "dijital bakış"],
          ].map(([value, label]) => (
            <div key={label} data-reveal="up" className="flex items-center justify-between py-5 sm:block sm:px-8 sm:py-8 first:sm:pl-0 last:sm:pr-0">
              <span className="font-display text-4xl font-black tracking-[-0.05em] text-lime">{value}</span>
              <span className="text-right text-[11px] font-bold uppercase tracking-[0.16em] text-cream/45 sm:mt-2 sm:block sm:text-left">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="hizmetler" className="bg-paper py-28 text-ink md:py-36">
        <div className="container">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div data-reveal="up" className="max-w-[680px]">
              <p className="section-kicker text-ink/50">Ne yapıyoruz / 01</p>
              <h2 className="mt-5 max-w-[650px] font-display text-5xl font-black leading-[.92] tracking-[-0.065em] md:text-7xl">Markanızı tek bir <span className="text-cobalt">ekrandan</span> daha büyük düşünün.</h2>
            </div>
            <p className="max-w-[360px] text-base leading-relaxed text-ink/60 md:text-lg">Birbirinden kopuk işler değil, birbirini büyüten temas noktaları tasarlıyoruz.</p>
          </div>
          <div className="mt-20 grid gap-px overflow-hidden rounded-[1.6rem] border border-ink/10 bg-ink/10 md:grid-cols-2">
            {[
              { number: "01", icon: <Code2 size={24} />, title: "Dijital deneyim", desc: "Web siteleri, e-ticaret, QR menüler ve markanın ilk bakışta güven veren dijital yüzü.", tags: ["Web sitesi", "E-ticaret", "QR menü"] },
              { number: "02", icon: <PenTool size={24} />, title: "Marka & görsel dil", desc: "Logo, ambalaj, kurumsal kimlik ve her yerde tutarlı görünen bir marka sistemi.", tags: ["Logo", "Ambalaj", "Kurumsal kimlik"] },
              { number: "03", icon: <Search size={24} />, title: "Büyüme & içerik", desc: "SEO, reklam, sosyal medya ve doğru mesajı doğru insana taşıyan içerik akışı.", tags: ["SEO", "Google Ads", "Sosyal medya"] },
              { number: "04", icon: <Bot size={24} />, title: "Sistem & otomasyon", desc: "CRM, lead yönetimi, B2B ve işinizi sessizce hızlandıran özel yazılımlar.", tags: ["CRM", "B2B", "Otomasyon"] },
            ].map((service) => (
              <article key={service.number} data-reveal="up" className="group bg-paper p-8 transition-colors duration-200 hover:bg-[#e8e4d6] md:p-10">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-cobalt transition-all duration-200 group-hover:border-cobalt group-hover:bg-cobalt group-hover:text-paper">{service.icon}</div>
                  <span className="font-display text-sm font-bold text-ink/30">{service.number}</span>
                </div>
                <h3 className="mt-16 font-display text-3xl font-black tracking-[-0.05em]">{service.title}</h3>
                <p className="mt-4 max-w-[370px] text-sm leading-relaxed text-ink/60">{service.desc}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {service.tags.map((tag) => <span key={tag} className="rounded-full border border-ink/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/55">{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-lime py-24 text-ink md:py-32">
        <div className="absolute -right-16 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border-[1px] border-ink/15" />
        <div className="absolute -right-2 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border-[1px] border-ink/15" />
        <div className="container relative grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="section-kicker text-ink/50">Bakış açımız / 02</p>
            <div className="mt-5 flex items-center gap-4 text-sm font-bold uppercase tracking-[0.14em]"><span className="h-px w-12 bg-ink/40" /> Sağlam düşünce</div>
          </div>
          <blockquote data-reveal="up" className="max-w-[850px] font-display text-5xl font-black leading-[.93] tracking-[-0.07em] md:text-7xl">“İyi görünmek yetmez. <span className="text-cobalt">İş görmeli.</span>”</blockquote>
        </div>
      </section>

      <section id="referanslar" className="bg-paper py-28 text-ink md:py-36">
        <div className="container">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="section-kicker text-ink/50">Seçili işler / 03</p>
              <h2 className="mt-5 font-display text-5xl font-black leading-[.9] tracking-[-0.065em] md:text-7xl">Birlikte<br /><span className="text-cobalt">neler yaptık?</span></h2>
            </div>
            <div className="max-w-[360px] text-sm leading-relaxed text-ink/55">Farklı sektörlerden, farklı ihtiyaçlardan; ortak bir yerden bakıyoruz: işin özüne.</div>
          </div>
          <div className="mt-12 flex flex-wrap gap-2 border-b border-ink/10 pb-6">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => changeFilter(filter)}
                className={`rounded-full px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.14em] transition-all duration-200 active:scale-[.97] ${activeFilter === filter ? "bg-ink text-lime" : "border border-ink/15 text-ink/55 hover:border-ink/50 hover:text-ink"}`}
              >
                {filter}
              </button>
            ))}
            <span className="ml-auto hidden items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink/35 sm:flex"><Layers3 size={14} /> {filteredClients.length} proje</span>
          </div>
          <div className="grid gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
            {visibleClients.map((client, index) => (
              <article key={client.name} data-reveal="up" className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-[1.35rem] border border-ink/10 bg-[#eeeadf] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cobalt/40 hover:shadow-xl hover:shadow-ink/10">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-2xl font-black tracking-[-0.06em] text-ink/20">{String(index + 1).padStart(2, "0")}</span>
                  <span className="rounded-full bg-white/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-ink/45">{client.category}</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-black leading-none tracking-[-0.05em]">{client.name}</h3>
                  <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-cobalt"><span className="h-1.5 w-1.5 rounded-full bg-lime-600" />{client.tag}</div>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {client.services.slice(0, 3).map((service) => <span key={service} className="rounded-full border border-ink/10 px-2.5 py-1.5 text-[11px] font-semibold leading-tight text-ink/55">{service}</span>)}
                    {client.services.length > 3 && <span className="rounded-full border border-ink/10 px-2.5 py-1.5 text-[11px] font-semibold leading-tight text-ink/40">+{client.services.length - 3}</span>}
                  </div>
                  {client.period && <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/35">{client.period}</p>}
                </div>
                <ArrowUpRight className="absolute bottom-5 right-5 text-ink/20 transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cobalt" size={18} />
              </article>
            ))}
          </div>
          {filteredClients.length > 8 && (
            <button onClick={() => setShowAll((value) => !value)} className="mx-auto mt-10 flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-[11px] font-black uppercase tracking-[0.14em] transition-all duration-200 hover:border-ink hover:bg-ink hover:text-lime active:scale-[.97]">
              {showAll ? "Daha az göster" : `Tüm ${filteredClients.length} referansı göster`} <ChevronRight size={15} className={showAll ? "rotate-[-90deg]" : "rotate-90"} />
            </button>
          )}
        </div>
      </section>

      <section id="surec" className="bg-ink-2 py-28 md:py-36">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="section-kicker text-cream/45">Çalışma biçimimiz / 04</p>
              <h2 className="mt-5 font-display text-5xl font-black leading-[.9] tracking-[-0.065em] md:text-7xl">Netlikten<br /><span className="text-lime">sonuca.</span></h2>
              <p className="mt-8 max-w-[300px] text-sm leading-relaxed text-cream/55">İyi bir işin sırrı, süreci karmaşıklaştırmak değil; doğru soruları en başta sormak.</p>
            </div>
            <div className="divide-y divide-white/10">
              {[
                ["01", "Dinleriz", "Markanın ne söylediğinden önce, neyi çözmek istediğini anlarız."],
                ["02", "Çerçeveleriz", "İhtiyacı doğru hizmete değil, doğru sisteme dönüştürürüz."],
                ["03", "Üretiriz", "Stratejiyi tasarım, içerik ve teknolojiyle görünür hale getiririz."],
                ["04", "Büyütürüz", "İş yayına girdikten sonra da ölçer, iyileştirir ve yanında kalırız."],
              ].map(([number, title, description]) => (
                <div key={number} data-reveal="up" className="group grid gap-5 py-7 sm:grid-cols-[70px_180px_1fr] sm:items-start sm:gap-8">
                  <span className="font-display text-sm font-bold text-lime">{number}</span>
                  <h3 className="font-display text-2xl font-black tracking-[-0.04em] text-cream transition-colors group-hover:text-lime">{title}</h3>
                  <p className="max-w-[420px] text-sm leading-relaxed text-cream/50">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="iletisim" className="bg-paper py-28 text-ink md:py-36">
        <div className="container grid gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div data-reveal="up">
            <p className="section-kicker text-ink/50">Birlikte yapalım / 05</p>
            <h2 className="mt-5 max-w-[600px] font-display text-6xl font-black leading-[.84] tracking-[-0.075em] md:text-8xl">Sıradaki<br /><span className="text-cobalt">iyi fikir</span> nedir?</h2>
            <p className="mt-8 max-w-[390px] text-base leading-relaxed text-ink/55">Kısa bir not bırakın. Fikrinizi dinleyelim, nereden başlayabileceğimize birlikte bakalım.</p>
            <div className="mt-10 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-[0.12em] text-ink/55">
              <span className="flex items-center gap-2"><MapPin size={15} className="text-cobalt" /> İstanbul / Türkiye</span>
              <span className="flex items-center gap-2"><MessageCircle size={15} className="text-cobalt" /> Yanıt süresi: 1–2 gün</span>
            </div>
          </div>
          <form data-reveal="up" onSubmit={handleSubmit} className="rounded-[1.5rem] border border-ink/10 bg-[#eeeadf] p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="field-label">Adınız<input required name="name" placeholder="Ad Soyad" className="field-input" /></label>
              <label className="field-label">E-posta<input required type="email" name="email" placeholder="siz@ornek.com" className="field-input" /></label>
            </div>
            <label className="field-label mt-5">Projeniz<textarea required name="message" rows={5} placeholder="Ne üzerine birlikte çalışalım?" className="field-input resize-none" /></label>
            <button type="submit" className="mt-6 flex w-full items-center justify-between rounded-xl bg-ink px-5 py-4 text-xs font-black uppercase tracking-[0.15em] text-lime transition-all duration-200 hover:bg-cobalt hover:text-paper active:scale-[.99]">Mesajı gönder <Send size={16} /></button>
            <p className="mt-4 flex items-center gap-2 text-[10px] leading-relaxed text-ink/35"><Check size={13} /> Form gönderim bağlantısı yayına alma aşamasında özelleştirilebilir.</p>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-ink py-8">
        <div className="container flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-xs font-black text-ink">W/</span><span className="text-xs font-bold uppercase tracking-[0.14em] text-cream/70">wisoft.tech</span></div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cream/30">Düşünürüz · Tasarlarız · Büyütürüz</p>
          <div className="flex items-center gap-3 text-cream/40"><a aria-label="Instagram" href="#top" className="transition-colors hover:text-lime"><Instagram size={16} /></a><a aria-label="LinkedIn" href="#top" className="transition-colors hover:text-lime"><Linkedin size={16} /></a><a aria-label="E-posta" href="#iletisim" className="transition-colors hover:text-lime"><Mail size={16} /></a></div>
        </div>
      </footer>
    </main>
  );
}
