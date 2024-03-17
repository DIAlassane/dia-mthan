import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import "../widget/style/styles.css";
import ProductCard from "./ProductCard";

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4, // Changer le nombre d'éléments à 3 pour maintenir la cohérence
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1175, min: 896 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 896, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CategoryProductComponent = () => {
  const products = useSelector((state) => state.productCategory);

  const product = products.map((item) => (
    <ProductCard
      key={item.id}
      name={item.name}
      image={item.image}
      price={item.price}
      description={item.description}
      supply={item.supply}
    />
  ));

  if (!products) {
    return <Box>...Categories</Box>;
  }

  return (
    <div
      className="rtt"
      style={{
        "@media(maxWidth: 1155px)": {
          width: "90%",
          flexDirection: "row",
        },
      }}
    >
      <Carousel responsive={responsive}>{product}</Carousel>
    </div>
  );
};

export default CategoryProductComponent;
