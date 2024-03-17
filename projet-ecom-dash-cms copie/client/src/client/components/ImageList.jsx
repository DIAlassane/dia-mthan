import { ImageList, ImageListItem } from "@mui/material";
import { useSelector } from "react-redux";
import imgRandom from "../../assets/ramdomImage.jpeg";

export default function ImagesListe() {
  const images = useSelector((state) => state.productData);

  const featuredImages = images.filter((item) => item.isFeatured === true);

  if (!featuredImages || featuredImages.length === 0) {
    return <div>Aucune image à afficher.</div>;
  }

  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
        marginLeft: "10%",
        height: "auto",
        overflowY: "auto",
        marginBottom: "1rem",
      }}
    >
      <ImageList
        sx={{ width: "100%", gap: 10 }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {featuredImages.slice(0, 9).map((item, index) => (
          <ImageListItem
            key={item.id}
            cols={index === 0 ? 2 : 1}
            rows={index === 0 ? 2 : 1}
            sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%)",
                opacity: 0,
                transition: "opacity 0.3s ease-in-out",
              },
              "&:hover::before": {
                opacity: 1,
              },
              "@media (max-width: 600px)": {
                // Déplacer les styles @media à l'extérieur de l'objet sx
                display: "block",
                margin: "0 auto" /* Centrer les images */,
                textAlign: "center" /* Centrer les images horizontalement */,
              },
            }}
          >
            <img
              src={`http://localhost:4000/${item.image}`}
              alt={item.name}
              loading="lazy"
              onError={(e) => {
                e.target.src = `${imgRandom}`;
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                right: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#ffffff",
              }}
            >
              <div style={{ flex: 1 }}>
                <h3>{item.name.substring(0, 5)}</h3>
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <p>{item.price}</p>
              </div>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </div> // Ajouter la balise de fermeture </div> ici
  );
}
