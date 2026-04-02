"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, FileText, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Decorative Gold Blurs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

      {/* Navbar */}
      <header className="relative z-10 container mx-auto px-6 py-6 border-b border-border/50 bg-background/50 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-heading font-medium tracking-wide text-foreground">
            Freelance<span className="text-gold italic">Hub</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary-foreground">
            <Link href="#features" className="hover:text-gold transition-colors ease-in-out">Fitur</Link>
            <Link href="#testimonials" className="hover:text-gold transition-colors ease-in-out">Tentang</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-foreground hover:bg-gold/10 hover:text-gold transition-colors">
              Masuk
            </Button>
            <Button className="bg-gradient-to-r from-gold to-gold-hover text-primary-foreground hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all duration-300">
              Mulai Gratis <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-light/50 border border-gold/20 text-gold-dark text-xs font-semibold uppercase tracking-wider mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-gold" />
          Luxury Simplicity for Freelancers
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-heading font-normal text-foreground leading-tight max-w-4xl"
        >
          Kelola Proyek & Keuangan dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#D4B65B] italic">Elegan.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-secondary-foreground max-w-2xl font-light leading-relaxed"
        >
          Freelance Hub adalah solusi all-in-one yang merubah kompleksitas manajemen klien, invoincing, dan waktu menjadi sebuah pengalaman mewah dan effortless.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-xl bg-gradient-to-r from-gold to-gold-hover text-white text-base hover:shadow-[0_0_24px_rgba(201,168,76,0.4)] transition-all duration-300 hover:-translate-y-1">
            Mulai Tanpa Kartu Kredit
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-xl border-border hover:border-gold hover:bg-gold/5 transition-all duration-300">
            Pelajari Fitur
          </Button>
        </motion.div>

        {/* Feature Cards Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, staggerChildren: 0.1 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
        >
          {[
            {
              icon: <Briefcase className="w-6 h-6 text-gold" />,
              title: "Manajemen Proyek",
              desc: "Lacak scope kerja, status, dan deliverable tanpa merasa kewalahan."
            },
            {
              icon: <FileText className="w-6 h-6 text-gold" />,
              title: "Smart Invoicing",
              desc: "Kirim invoice elegan dengan auto-reminder untuk klien."
            },
            {
              icon: <Clock className="w-6 h-6 text-gold" />,
              title: "Time Tracking",
              desc: "Catat setiap menit produktifmu semudah menekan tombol."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300 text-left flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-heading font-medium text-foreground">{feature.title}</h3>
              <p className="text-secondary-foreground font-light leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
