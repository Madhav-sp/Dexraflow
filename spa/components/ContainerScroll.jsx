import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const scaleRange = isMobile ? [0.7, 0.9] : [1.05, 1];
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="flex items-center justify-center relative p-2 md:p-20" ref={containerRef}>
      <div className="py-10 md:py-20 w-full relative" style={{ perspective: '1000px' }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

const Header = ({ translate, titleComponent }) => (
  <motion.div style={{ translateY: translate }} className="max-w-5xl mx-auto text-center">
    {titleComponent}
  </motion.div>
);

const Card = ({ rotate, scale, children }) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow:
        '0 0 #0000001a, 0 9px 20px #00000010, 0 37px 37px #0000000b, 0 84px 50px #00000008',
    }}
    className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border border-slate-200 p-2 md:p-6 bg-white rounded-3xl"
  >
    <div className="h-full w-full overflow-hidden rounded-2xl bg-white md:p-6">
      {children}
    </div>
  </motion.div>
);
