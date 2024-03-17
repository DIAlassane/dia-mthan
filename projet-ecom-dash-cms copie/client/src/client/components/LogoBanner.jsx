import { motion } from "framer-motion";
import { useRef, useState } from "react";
import imageLogo from "../../assets/Dia-mThan.png";

const LogoBanner = () => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const mouseMove = (e) => {
    if (ref.current) {
      const { clientX, clientY } = e;
      const { width, height, left, top } = ref.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      setPosition({ x, y });
    }
  };

  const mouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      animate={{ x, y }}
      ref={ref}
    >
      <img
        src={imageLogo}
        alt="Logo"
        style={{
          width: "200px",
          height: "auto",
        }}
      />
    </motion.div>
  );
};

export default LogoBanner;
