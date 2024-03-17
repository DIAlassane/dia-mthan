import React from "react";
import IconButtonMui from "../components/IconButtonMui";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./style/styles.css";

function FindUs() {
  return (
    <div
      style={{
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: '5rem'
      }}
    >
      <h1 className="text-gray-700 font-medium">Checkout Our Socials</h1>
      <div
        className="App gap-4"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <IconButtonMui
          text="Github ENTREPRISE"
          startIcon={<GitHubIcon />}
          color="#24292e"
        />
        <IconButtonMui
          text="Facebook ENTREPRISE"
          color="#1877F2"
          startIcon={<FacebookIcon />}
        />
        <IconButtonMui
          text="Instagram ENTREPRISE"
          color="#E1306C"
          startIcon={<InstagramIcon />}
        />
        <IconButtonMui
          text="Twitter ENTREPRISE"
          color=" #1DA1F2"
          startIcon={<TwitterIcon />}
        />
        <IconButtonMui
          text="Youtube ENTREPRISE"
          color="red"
          startIcon={<YouTubeIcon />}
          iconSize="large"
        />
      </div>
    </div>
  );
}

export default FindUs;
