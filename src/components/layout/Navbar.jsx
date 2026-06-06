import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TabSwitcher from "../shared/TabSwitcher";

/** @param {{tab:string, onTab:(id:string)=>void}} props */
export default function Navbar({ tab, onTab }) {
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 26 }}
      className="fixed inset-x-0 top-0 z-50 transition-colors"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: scrolled ? "rgba(10,10,15,0.7)" : "rgba(10,10,15,0.2)",
        borderBottom: `1px solid ${scrolled ? "var(--clr-border)" : "transparent"}`,
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        {logoError ? (
          <span className="font-head text-2xl font-extrabold tracking-tight text-gradient">Pluto.ai</span>
        ) : (
          <img 
            src="/resumePluto.svg" 
            alt="Pluto.ai" 
            className="h-8 object-contain" 
            onError={() => setLogoError(true)} 
          />
        )}
        <TabSwitcher
          tabs={[
            { id: "analyze", label: "Analyze Resume" },
            { id: "build", label: "Build Resume" },
          ]}
          active={tab}
          onChange={onTab}
          layoutId="nav-indicator"
        />
      </div>
    </motion.nav>
  );
}
