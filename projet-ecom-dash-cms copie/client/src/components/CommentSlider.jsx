import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const CommentSlider = ({ onReply, onDelete }) => {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState([]);
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.role);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch comments data
    axios
      .get("http://localhost:4000/auth/review", {
        headers: { Authorization: `Bearer ${token}` },
        role: role,
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/home");
      });
  }, []);

  useEffect(() => {
    // Fetch user data for each comment
    comments.forEach((comment) => {
      axios
        .get(`http://localhost:4000/management/users/${comment.userId}`)
        .then((userResponse) => {
          // Update the corresponding user in the state
          setUser((prevUsers) => [...prevUsers, userResponse.data]);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    });
  }, [comments]);

  return (
    <Carousel
      autoPlay={false}
      animation="slide"
      navButtonsAlwaysVisible
      indicatorIconButtonProps={{ style: { display: "none" } }}
    >
      {comments.map((comment, index) => (
        <div key={index} style={{ width: "auto", padding: "8px" }}>
          <Card
            sx={{
              height: "auto",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <CardContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                  border: `1px solid ${theme.palette.background.font}`,
                  borderRadius: "4px",
                  padding: ".3rem",
                }}
              >
                <Avatar
                  sx={{ width: 48, height: 48, marginRight: "12px" }}
                  alt={
                    user.find((user) => user.id === comment.userId)?.name || "-"
                  }
                  src={
                    user.find((user) => user.id === comment.userId)?.url || "-"
                  }
                />
                <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                  {comment.comment}
                </Typography>
              </div>
              <Typography variant="h6">
                {user.find((user) => user.id === comment.userId)?.name || "-"}
              </Typography>
              <Typography>
                <Link
                  to={`/productdetail/${comment.productId}`}
                  style={{
                    color: theme.palette.background.font,
                    backgroundColor: theme.palette.background.default,
                    textDecoration: "none",
                    padding: ".1rem",
                    border: `1px solid ${theme.palette.background.font}`,
                  }}
                >
                  Voir Produit
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {comment.createdAt}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                size="small"
                onClick={() => onDelete(comment)}
                sx={{
                  color: "white",
                  backgroundColor: "red",
                  "&:hover": {
                    backgroundColor: "darkred",
                  },
                }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </Carousel>
  );
};

export default CommentSlider;
