import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Avatar, Box, Button } from "@mui/material";

const UploadImage = ({
  url,
  urlid,
  handleUploadAndSave,
  handleFileChange,
  message,
}) => {
  return (
    <Box
      sx={{
        display: "block",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "1rem",
        width: "30%",
        marginLeft: "35%",
      }}
    >
      {url ? (
        <Avatar
          src={url ? url : urlid}
          sx={{
            width: 156,
            height: 156,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: ".5rem",
            marginLeft: "3.5rem",
          }}
        />
      ) : (
        <Avatar
          src={urlid}
          sx={{
            width: 156,
            height: 156,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: ".5rem",
            marginLeft: "3.5rem",
          }}
        />
      )}
      <input
        type="file"
        style={{ display: "flex", marginBottom: ".5rem" }}
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ width: "100%" }}
        onClick={handleUploadAndSave}
      >
        Télécharger et Enregistrer
      </Button>
      {message}
    </Box>
  );
};

export default UploadImage;
