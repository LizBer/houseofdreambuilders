import { motion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { Menu, ArrowRight } from "lucide-react";
import { MenuOverlay } from "./Menu";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 overflow-hidden">
            <img 
              src="https://storage.googleapis.com/tagger-dev-assets/67c6e033289063002b851415/house-of-dream-builders-logo.png" 
              alt="House of Dream Builders Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-mono text-sm tracking-widest uppercase font-bold">House of Dream Builders</span>
        </div>
        
        <div className="flex items-center gap-8">
          <button className="hidden md:flex items-center gap-2 group">
            <span className="text-sm font-medium uppercase tracking-wider">Connect</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 group"
          >
            <span className="text-sm font-medium uppercase tracking-wider">Menu</span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-brand-dark transition-all">
              <Menu className="w-5 h-5" />
            </div>
          </button>
        </div>
      </nav>
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export const Hero = () => {
  return (
    <header className="relative h-screen w-full overflow-hidden bg-brand-dark text-brand-paper flex flex-col justify-end p-6 md:p-12">
      <div className="absolute inset-0 z-0 opacity-30">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        >
          <source src="https://www.monks.com/data/2025-06/Monks-Sizzle_1280x720.mp4" type="video/mp4" />
        </video>
      </div>
      
      <div className="relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 w-24 h-24 md:w-32 md:h-32"
        >
          <img 
            src="https://storage.googleapis.com/tagger-dev-assets/67c6e033289063002b851415/house-of-dream-builders-logo.png" 
            alt="Logo" 
            className="w-full h-full object-contain brightness-0 invert"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-5xl md:text-8xl font-serif leading-[0.9] mb-8"
        >
          Building <span className="text-gradient italic">businesses</span> through AI systems and <span className="italic">design</span>.
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-[1px] bg-gradient-brand" />
          <p className="text-sm md:text-base font-mono uppercase tracking-[0.2em] text-brand-paper/70">
            House of Dream Builders
          </p>
        </motion.div>
      </div>
    </header>
  );
};

export const Services = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: scrollRef
  });

  const services = [
    {
      id: "01",
      title: "AI Consultancy",
      description: "Strategic guidance for founders to navigate the AI landscape and identify high-impact opportunities.",
      capabilities: ["AI Strategy & Roadmap", "Tool Selection & Integration", "Workflow Optimization", "Founder Advisory"],
      color: "from-brand-accent-orange/20 to-brand-accent-pink/20",
      borderColor: "group-hover:border-brand-accent-orange/50",
      visual: {
        type: 'image',
        src: 'https://storage.googleapis.com/tagger-dev-assets/67c6e033289063002b851415/ai-consultancy-visual.png'
      }
    },
    {
      id: "02",
      title: "AI Systems & Websites",
      description: "Bespoke intelligent systems and high-performance websites tailored for small business growth.",
      capabilities: ["Custom AI Agents", "Intelligent Web Apps", "Automated Content Engines", "Performance Optimization"],
      color: "from-brand-accent-pink/20 to-brand-accent-purple/20",
      borderColor: "group-hover:border-brand-accent-pink/50",
      visual: {
        type: 'video',
        src: 'https://www.monks.com/data/2025-06/Monks-Sizzle_1280x720.mp4'
      }
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-32 px-6 md:px-12 bg-brand-paper border-b border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Column: Header */}
          <div className="lg:w-1/3 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-mono uppercase tracking-[0.3em] mb-6 text-brand-accent-pink font-bold">Our Pillars</p>
              <h2 className="text-4xl md:text-6xl font-serif leading-[1.1]">
                A boutique partner for <span className="italic">founders</span> and small <span className="italic">businesses</span>.
              </h2>
              <div className="w-20 h-[1px] bg-gradient-brand mt-12" />
              
              <div className="hidden lg:flex pt-12 items-center gap-4">
                <button 
                  onClick={() => scroll('left')}
                  className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all"
                  aria-label="Previous service"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all"
                  aria-label="Next service"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-black/40 font-mono uppercase tracking-widest ml-4">
                  Navigate
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Horizontal Slider */}
          <div className="lg:w-2/3 relative">
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto gap-8 pb-12 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing scroll-smooth overscroll-x-contain"
            >
              {services.map((service, index) => (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -10, scale: 1.01 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    scale: { type: "spring", stiffness: 400, damping: 25 },
                    y: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  className="min-w-[85%] md:min-w-[70%] lg:min-w-[90%] snap-center group cursor-pointer"
                >
                  <div className={`relative bg-linear-to-br ${service.color} rounded-3xl p-8 md:p-16 border border-black/5 transition-all duration-500 ${service.borderColor} hover:shadow-2xl hover:shadow-brand-accent-pink/5 h-full flex flex-col justify-between overflow-hidden`}>
                    {/* Visual Background */}
                    <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                      {service.visual.type === 'video' ? (
                        <video 
                          autoPlay 
                          muted 
                          loop 
                          playsInline
                          className="w-full h-full object-cover scale-105 group-hover:scale-115 transition-transform duration-1000"
                          referrerPolicy="no-referrer"
                        >
                          <source src={service.visual.src} type="video/mp4" />
                        </video>
                      ) : (
                        <img 
                          src={service.visual.src} 
                          alt="" 
                          className="w-full h-full object-cover scale-105 group-hover:scale-115 transition-transform duration-1000"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">
                      <div className="flex-1 space-y-6">
                        <span className="font-mono text-sm text-brand-accent-pink font-bold tracking-widest">{service.id}</span>
                        <h3 className="text-3xl md:text-5xl font-medium leading-tight">{service.title}</h3>
                        <p className="text-lg text-black/60 leading-relaxed max-w-md">{service.description}</p>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-xs font-mono uppercase tracking-widest mb-6 text-black/40">Capabilities</p>
                        <ul className="space-y-4">
                          {service.capabilities.map((cap, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-gradient-brand" />
                              {cap}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="relative z-10 mt-12 pt-12 border-t border-black/5 flex justify-end">
                      <button className="flex items-center gap-3 group/btn">
                        <span className="text-xs font-mono uppercase tracking-widest font-bold">Explore Pillar</span>
                        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover/btn:bg-brand-dark group-hover/btn:text-white transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Peek Spacer */}
              <div className="min-w-[5%] lg:min-w-[10%]" />
            </div>

            {/* Custom Progress/Indicator */}
            <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-black/5">
              <motion.div 
                className="h-full bg-gradient-brand"
                style={{ scaleX: scrollXProgress, originX: 0 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhyPartnerWithUs = () => {
  const reasons = [
    {
      title: "Boutique Focus",
      description: "We exclusively partner with founders and small businesses, ensuring every project receives the senior-level attention it deserves.",
      icon: "01"
    },
    {
      title: "AI-First Design",
      description: "We don't just 'add AI' to existing products. We architect intelligent systems from the ground up, where design and intelligence are inseparable.",
      icon: "02"
    },
    {
      title: "Crafted Intelligence",
      description: "Every solution is a bespoke piece of neural architecture, meticulously crafted to solve your specific business challenges.",
      icon: "03"
    },
    {
      title: "Strategic Partnership",
      description: "We act as your fractional AI team, providing the strategic leadership and technical execution needed to stay ahead in the AI era.",
      icon: "04"
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-8 lg:sticky lg:top-32">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-brand-accent-pink font-bold">The Boutique Difference</p>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              Why Partner <br /> <span className="italic text-gradient">With Us</span>
            </h2>
            <p className="text-xl text-black/60 leading-relaxed max-w-lg">
              In a world of generic AI solutions, we offer a sanctuary for founders who value craft, precision, and strategic depth.
            </p>
            <div className="pt-8">
              <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-black/5 bg-brand-paper/50">
                <div className="w-2 h-2 rounded-full bg-brand-accent-pink animate-pulse" />
                <span className="text-sm font-medium uppercase tracking-wider">Limited Partnerships Available</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-8 rounded-3xl border border-black/5 hover:border-brand-accent-pink/20 hover:bg-brand-paper/30 transition-all duration-500"
              >
                <div className="flex gap-8">
                  <span className="text-4xl font-serif italic text-brand-accent-pink/20 group-hover:text-brand-accent-pink/40 transition-colors">
                    {reason.icon}
                  </span>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-medium">{reason.title}</h3>
                    <p className="text-black/60 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const CaseStudies = () => {
  const cases = [
    {
      title: "Neural Commerce",
      category: "E-commerce",
      image: "https://picsum.photos/seed/ai1/800/1000",
    },
    {
      title: "Agentic Support",
      category: "SaaS",
      image: "https://picsum.photos/seed/ai2/800/1000",
    },
    {
      title: "Predictive Media",
      category: "Marketing",
      image: "https://picsum.photos/seed/ai3/800/1000",
    }
  ];

  return (
    <section className="bg-brand-dark text-brand-paper py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-4 text-brand-paper/50">Selected Work</p>
            <h2 className="text-4xl md:text-6xl font-serif">Dream Realized</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 group border border-brand-paper/20 rounded-full px-6 py-3 hover:bg-gradient-brand hover:border-transparent transition-all">
            <span className="text-sm font-medium uppercase tracking-wider">View all work</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {cases.map((c, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-6 border border-white/5">
                <img 
                  src={c.image} 
                  alt={c.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs font-mono uppercase tracking-widest mb-2 text-brand-paper/50">{c.category}</p>
              <h3 className="text-2xl font-medium group-hover:text-brand-accent-pink transition-colors">{c.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Contact = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-brand-paper overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-brand opacity-5 blur-[120px] rounded-full translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <h2 className="text-5xl md:text-7xl font-serif leading-tight mb-8">
            Let’s build your <span className="text-gradient italic">dreams</span> together.
          </h2>
          <div className="relative inline-block">
            <svg className="absolute -top-4 -right-8 w-12 h-12 text-brand-accent-pink rotate-12" viewBox="0 0 27 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.6289 3.18061C25.6289 3.18061 6.52618 10.0607 3.13665 38.2747" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M2.4585 25.1575C2.4585 25.1575 4.32553 31.4956 3.13114 38.3102C3.13114 38.3102 3.39867 33.6316 10.553 28.3799" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="font-mono text-sm uppercase tracking-widest">Enter the House</p>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-brand-accent-pink/5 border border-black/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-gradient-brand rounded-full flex items-center justify-center text-white">
              <span className="text-xs font-bold">H</span>
            </div>
            <div className="bg-brand-paper/50 rounded-2xl rounded-tl-none p-4">
              <p className="text-sm">Welcome to the House 👋 Tell us about the dream you want to build.</p>
            </div>
          </div>
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full border-b border-black/10 py-3 focus:border-brand-accent-pink outline-none transition-colors text-sm" />
              <input type="text" placeholder="Last Name" className="w-full border-b border-black/10 py-3 focus:border-brand-accent-pink outline-none transition-colors text-sm" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full border-b border-black/10 py-3 focus:border-brand-accent-pink outline-none transition-colors text-sm" />
            <textarea placeholder="Describe your vision" rows={3} className="w-full border-b border-black/10 py-3 focus:border-brand-accent-pink outline-none transition-colors text-sm resize-none" />
            
            <button className="w-full bg-brand-dark text-brand-paper rounded-full py-4 flex items-center justify-center gap-2 group hover:bg-gradient-brand transition-all">
              <span className="font-medium uppercase tracking-wider text-sm">Submit Vision</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-brand-paper border-t border-black/5 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-brand-dark rounded-md flex items-center justify-center p-1">
                <img 
                  src="https://storage.googleapis.com/tagger-dev-assets/67c6e033289063002b851415/house-of-dream-builders-logo.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-mono text-xs tracking-widest uppercase font-bold">House of Dream Builders</span>
            </div>
            <p className="text-xs text-black/50 leading-relaxed max-w-[200px]">
              Boutique AI systems and design partner for founders and small businesses.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest mb-6 text-black/40">The House</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-brand-accent-pink transition-colors">Our Vision</a></li>
              <li><a href="#" className="hover:text-brand-accent-pink transition-colors">Architects</a></li>
              <li><a href="#" className="hover:text-brand-accent-pink transition-colors">Blueprint</a></li>
              <li><a href="#" className="hover:text-brand-accent-pink transition-colors">Join Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest mb-6 text-black/40">Governance</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-brand-accent-pink transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-brand-accent-pink transition-colors">Ethics</a></li>
              <li><a href="#" className="hover:text-brand-accent-pink transition-colors">Compliance</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest mb-6 text-black/40">Presence</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-brand-accent-pink transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-brand-accent-pink transition-colors">X / Twitter</a></li>
              <li><a href="#" className="hover:text-brand-accent-pink transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-black/40">
            © 2026 House of Dream Builders. All rights reserved.
          </p>
          <div className="flex items-center gap-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
            <div className="w-8 h-12 border border-black rounded-sm flex items-center justify-center font-serif text-lg bg-gradient-brand text-white border-none">B</div>
            <span className="text-[10px] font-mono uppercase tracking-tighter leading-none">Certified<br/>Dreamers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
