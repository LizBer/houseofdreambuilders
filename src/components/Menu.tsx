import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Instagram, Linkedin, Twitter } from "lucide-react";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuVariants = {
  closed: {
    y: "-100%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.2
    }
  },
  open: {
    y: "0%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

const linkVariants = {
  initial: {
    y: 80,
    opacity: 0
  },
  enter: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.3 + i * 0.1
    }
  }),
  exit: (i: number) => ({
    y: 80,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05
    }
  })
};

export const MenuOverlay = ({ isOpen, onClose }: MenuProps) => {
  const mainLinks = [
    { title: "Collection", href: "#" },
    { title: "About us", href: "#" },
    { title: "News", href: "#" },
    { title: "Contact", href: "#" }
  ];

  const secondaryLinks = [
    { title: "AI Consultancy", href: "#" },
    { title: "AI Systems & Websites", href: "#" },
    { title: "Strategic Roadmap", href: "#" },
    { title: "Founder Advisory", href: "#" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-[100] bg-brand-dark text-brand-paper overflow-hidden flex flex-col"
        >
          {/* Decorative Lines */}
          <div className="absolute top-0 left-[20%] w-[1px] h-full bg-white/5" />
          <div className="absolute top-0 left-[80%] w-[1px] h-full bg-white/5" />

          {/* Header in Menu */}
          <div className="px-6 py-4 md:px-12 md:py-8 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 overflow-hidden">
                <img 
                  src="https://storage.googleapis.com/tagger-dev-assets/67c6e033289063002b851415/house-of-dream-builders-logo.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-mono text-sm tracking-widest uppercase font-bold">House of Dream Builders</span>
            </div>
            <button 
              onClick={onClose}
              className="flex items-center gap-2 group"
            >
              <span className="text-sm font-medium uppercase tracking-wider">Close</span>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-brand-dark transition-all">
                <X className="w-5 h-5" />
              </div>
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 px-6 md:px-24 py-12 flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              {/* Main Nav */}
              <nav>
                <ul className="space-y-4">
                  {mainLinks.map((link, i) => (
                    <li key={link.title} className="overflow-hidden">
                      <motion.a
                        href={link.href}
                        custom={i}
                        variants={linkVariants}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        className="block text-5xl md:text-8xl font-serif hover:italic hover:text-brand-accent-pink transition-all duration-300"
                        onClick={onClose}
                      >
                        {link.title}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Secondary Nav */}
              <nav className="md:pt-8">
                <ul className="space-y-6">
                  {secondaryLinks.map((link, i) => (
                    <li key={link.title} className="overflow-hidden">
                      <motion.a
                        href={link.href}
                        custom={i + 4}
                        variants={linkVariants}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        className="flex items-center gap-4 text-xl md:text-2xl font-medium group"
                        onClick={onClose}
                      >
                        <span className="w-0 group-hover:w-8 h-[1px] bg-brand-accent-pink transition-all duration-300" />
                        {link.title}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/10">
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Location</p>
                <p className="text-lg">Rainbow Road 92</p>
                <p className="text-lg">1432 AG Amsterdam</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Contact</p>
                <a href="tel:+31645093021" className="block text-lg hover:text-brand-accent-pink transition-colors">+31 6 45 09 30 21</a>
                <a href="mailto:mail@houseofdreambuilders.com" className="block text-lg hover:text-brand-accent-pink transition-colors">mail@houseofdreambuilders.com</a>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Socials</p>
                  <div className="flex gap-6">
                    <a href="#" className="hover:text-brand-accent-pink transition-colors"><Instagram className="w-6 h-6" /></a>
                    <a href="#" className="hover:text-brand-accent-pink transition-colors"><Linkedin className="w-6 h-6" /></a>
                    <a href="#" className="hover:text-brand-accent-pink transition-colors"><Twitter className="w-6 h-6" /></a>
                  </div>
                </div>
                <div className="pt-8 md:pt-0">
                   <p className="text-[10px] uppercase tracking-widest text-white/20">© 2026 House of Dream Builders</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
