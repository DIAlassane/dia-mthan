import { Box } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import CustomButton from "./CustomButton";

const container = {
  hidden: { opacity: 0, scale: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const itemsData = [
  {
    title: "Robe Longue en Soie",
    description:
      "Les robes en soie, l'élégance à son paroxysme pour des occasions spéciales ou simplement pour se sentir luxueuse au quotidien !",
  },
  {
    title: "Robe Longue Brodée",
    description:
      "Des robes brodées avec amour, où la beauté rencontre la tradition. Portez-les avec fierté lors de vos moments les plus précieux !",
  },
  {
    title: "Robe Longue Plissée",
    description:
      "La légèreté des plis, une danse douce autour de vous. Enfilez nos robes plissées pour une silhouette fluide et élégante !",
  },
];

const CategorySection = ({ isActive }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isActive) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isActive, controls]);

  return (
    <motion.ul
      className="container"
      variants={container}
      initial="hidden"
      animate={controls}
      style={{
        display: "block",
        justifyContent: "center",
        alignItems: "center",
        listStyle: "none",
        paddingLeft: "10%",
        paddingRight: "10%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: "0 0 100%",
          "@media(max-width: 1050px)": {
            display: "block",
            width: "80%",
            marginLeft: "10%",
          },
        }}
      >
        <motion.li className="item" variants={item} style={{ width: "100%" }}>
          <CustomButton
            title={itemsData[0].title}
            description={itemsData[0].description}
            style={{ width: "100%" }}
          />
        </motion.li>
        <motion.li className="item" variants={item} style={{ width: "100%" }}>
          <CustomButton
            title={itemsData[1].title}
            description={itemsData[1].description}
            style={{ width: "100%" }}
          />
        </motion.li>
      </Box>
      <motion.li
        className="item"
        variants={item}
        style={{
          "@media(max-width: 1050px)": {
            display: "block",
            width: "80%",
            marginLeft: "10%",
          },
        }}
      >
        <CustomButton
          title={itemsData[2].title}
          description={itemsData[2].description}
        />
      </motion.li>
    </motion.ul>
  );
};

export default CategorySection;
