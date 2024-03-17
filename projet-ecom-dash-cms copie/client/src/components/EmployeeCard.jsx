import { Avatar, Box, Typography, useTheme } from "@mui/material";

const EmployeeCard = ({
  userName,
  userRole,
  userEmail,
  userNumb,
  userOccupation,
  userImage,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "150px",
        height: "auto",
        backgroundColor: theme.palette.background.alt,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
        padding: ".2rem",
      }}
    >
      <Typography
        sx={{
          fontSize: ".65rem",
          fontWeight: "800",
          color: theme.palette.background.font,
          marginBottom: ".5rem",
          textAlign: "center",
        }}
      >
        {userName}
      </Typography>
      <Typography sx={{ textAlign: "left", fontSize: ".55rem" }}>
        En ligne
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: ".55rem",
          marginTop: ".3rem",
          fontWeight: "800",
        }}
      >
        {userEmail}
      </Typography>
      <Avatar src={userImage} alt={userName} sx={{ margin: "1rem 3rem" }} />
      <Typography
        sx={{
          textAlign: "center",
          fontSize: ".60rem",
          fontWeight: "250",
        }}
      >
        {userNumb}
      </Typography>
      <Typography
        sx={{
          width: "90%",
          marginLeft: "5%",
          padding: ".16rem",
          backgroundColor: theme.palette.grey[600],
          fontWeight: "850",
          marginBottom: ".2rem",
        }}
      >
        {userOccupation}
      </Typography>
    </Box>
  );
};

export default EmployeeCard;
