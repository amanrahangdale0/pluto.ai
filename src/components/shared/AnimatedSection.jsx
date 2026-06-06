import { motion } from "framer-motion";

/**
 * Scroll-triggered reveal wrapper.
 * @param {{children: React.ReactNode, delay?: number, className?: string, y?: number}} props
 */
export default function AnimatedSection({ children, delay = 0, className = "", y = 30 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
