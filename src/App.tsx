/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navigation, Hero, Services, WhyPartnerWithUs, CaseStudies, Contact, Footer } from "./components/SiteContent";
import { VideoGenerator } from "./components/VideoGenerator";
import { motion, useScroll, useSpring } from "motion/react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-brand z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navigation />
      
      <main id="main-content">
        <Hero />
        <Services />
        
        {/* Transition Section */}
        <section className="bg-brand-paper py-24 px-6 md:px-12 border-y border-black/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full aspect-video object-cover rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              >
                <source src="https://www.monks.com/data/s3fs-public/2025-06/Monks.Flow-Home.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                AI leadership for <span className="italic underline decoration-brand-accent-pink underline-offset-8">founders</span>.
              </h2>
              <p className="text-lg text-black/70 leading-relaxed">
                We are the essential boutique partner for small businesses, closing the gap between powerful AI platforms and real-world business impact.
              </p>
              <button className="flex items-center gap-2 group border border-black rounded-full px-8 py-4 hover:bg-gradient-brand hover:text-white hover:border-transparent transition-all">
                <span className="text-sm font-medium uppercase tracking-wider text-brand-dark group-hover:text-white">Explore our approach</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 70 70" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M35.1033 27L43 34.8967L35.1033 42.7934" strokeWidth="2" />
                  <line x1="43" y1="35.0714" x2="26" y2="35.0714" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <WhyPartnerWithUs />
        <VideoGenerator />
        <CaseStudies />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
