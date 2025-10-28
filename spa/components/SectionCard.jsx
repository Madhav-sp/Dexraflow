import { motion } from 'framer-motion';

export default function SectionCard({ children, className = '' }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`section-card ${className}`}
        >
            {children}
        </motion.div>
    );
}