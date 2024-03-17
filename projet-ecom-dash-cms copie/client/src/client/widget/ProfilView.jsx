import {
  EditOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import FlagIcon from "@mui/icons-material/Flag";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import axios from "axios";
import WidgetWrapper from "client/components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "state";
import { storage } from "../../firebase";
import UploadImage from "./UploadImage";

const ProfilView = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isAdmin =
    user && // Ajoutez une vérification pour vous assurer que user est défini
    (user.roleId === process.env.REACT_APP_ROLE_ONE ||
      user.roleId === process.env.REACT_APP_ROLE_TWO);
  const dark = palette.grey[700];
  const medium = palette.grey[600];
  const main = palette.grey[400];
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [message, setMessage] = useState("");
  const urlid = user ? user.url : ""; // Vérification de nullité
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadAndSave = async () => {
    const currentDate = new Date().toISOString();
    const imageRef = ref(storage, `profile_images/${currentDate}`);

    try {
      await uploadBytes(imageRef, selectedFile);
      const imageUrl = await getDownloadURL(imageRef);

      // Mettre à jour l'URL dans Firebase Firestore
      setUrl(imageUrl);

      setMessage("Photo de profil mise à jour avec succès.");
      setSelectedFile(null);

      // Envoi de l'URL à votre backend avec Axios
      await axios
        .post(`http://localhost:4000/client/set-image`, {
          url: imageUrl,
          id: id,
        })
        .then((response) => {
          // Après avoir traité la réponse de votre backend
          const { message, updatedUser } = response.data;
          dispatch(setLogout());
          // Redirige vers la page de connexion
          navigate("/login");
          if (
            message === "Photo de profil mise à jour avec succès" &&
            updatedUser.length > 0
          ) {
            const updatedUserData = updatedUser[0][0];
            // Maintenant, vous pouvez accéder aux propriétés de l'utilisateur mis à jour
            console.log("Utilisateur mis à jour :", updatedUserData);
          } else {
            console.error(
              "Erreur lors de la mise à jour de la photo de profil :",
              message
            );
          }
        });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (!user) {
    return null;
  }

  const { id, name, email, country, occupation, phoneNumber } = user;

  return (
    <WidgetWrapper>
      <UploadImage
        url={url}
        urlid={urlid}
        handleUploadAndSave={handleUploadAndSave}
        handleFileChange={handleFileChange}
        message={message}
      />

      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": { color: palette.grey[100], cursor: "pointer" },
              }}
            >
              {name}
            </Typography>
            <Typography color={medium}>{email}</Typography>
          </Box>
        </FlexBetween>
        {isAdmin && ( // Afficher uniquement si l'utilisateur est admin ou superadmin
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <ManageAccountsOutlined />
          </Box>
        )}
      </FlexBetween>
      <Divider />
      <Box
        p="1rem 0"
        display="flex"
        justifyContent="space-around"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <FlagIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{country}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box p="1rem 0">
        <FlexBetween
          flexDirection={{ xs: "column", sm: "row" }}
          gap="0.5rem"
          mb="1rem"
        >
          <Typography color={medium}>Vous êtes disponible au :</Typography>
          <Typography color={main} fontWeight="500">
            {phoneNumber}
          </Typography>
        </FlexBetween>
        <Divider sx={{ marginTop: ".5rem", marginBottom: ".5rem" }} />
        <FlexBetween flexDirection={{ xs: "column", sm: "row" }} gap="0.5rem">
          <Typography color={medium}>Vos informations sont éronés ?</Typography>
          <Typography color={main} fontWeight="500">
            1- Aller dans les régleges <br />
            2- Cliquez sur 'Mes Informations' <br />
            3- Cliquez sur le stylots '' <br />
            4- Modifiez vos informations
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <TwitterIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <LinkedInIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default ProfilView;
