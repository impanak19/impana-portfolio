import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from '@/components/layout/CustomCursor';
import Footer from '@/components/layout/Footer';
import Loader from '@/components/layout/Loader';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/hero/Hero';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import WhatIDo from '@/components/sections/WhatIDo';

function App() {
  const [loading, setLoading] = useState(true);

  const finishLoading = useCallback(() => setLoading(false), []);

  return (
    <>
      <AnimatePresence>{loading && <Loader onComplete={finishLoading} />}</AnimatePresence>
      <CustomCursor />
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <Hero />
        <About />
        <WhatIDo />
        <Skills />
        <Projects />
        <Contact />
      </motion.main>
      <Footer />
    </>
  );
}

export default App;
