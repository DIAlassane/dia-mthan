import CommentIcon from "@mui/icons-material/Comment";
import {
  Avatar,
  Box,
  Button,
  Rating,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommentReply from "./CommentReply";

const Review = ({ productId, userId }) => {
  const [note, setNote] = useState();
  const theme = useTheme();
  const [comment, setComment] = useState([]);
  const [pic, setPic] = useState("");
  const [getComment, setGetComment] = useState([]);
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.roleId);
  const userName = useSelector((state) => state.user?.name);
  const url = useSelector((state) => state.user?.url);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post(
          "http://localhost:4000/auth/review",
          {
            rating: note,
            comment,
            productId,
            userId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            role: role,
          }
        )
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        });
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de la création du commentaire :", error);
    }
  };

  useEffect(() => {
    // Fetch sizes, categories, and colors from backend
    const fetchData = async () => {
      try {
        const reviewResponse = await axios.get(
          `http://localhost:4000/general/review`,
          {
            params: {
              productId: productId,
            },
          }
        );
        const picResponse = await axios.get(
          `http://localhost:4000/client/allcustomers`
        );
        setPic(picResponse.data);
        setGetComment(reviewResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId]);

  const addReplyToComment = (commentId, reply) => {
    setGetComment((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply.toString()], // Convertir la réponse en chaîne de caractères
          };
        }
        return comment;
      })
    );
  };

  const box1 = {
    width: "50%",
    textAlign: "center",
    backgroundColor: "transparent",
    borderTop: `.5px solid ${theme.palette.background.font}`,
    padding: "1rem 1rem",
    color: theme.palette.background.font,
    display: "block",
    "@media(max-width: 1100px)": {
      width: "100%",
      height: "auto",
    },
  };

  const box2 = {
    width: "50%",
    padding: "1rem",
    backgroundColor: "transparent",
    color: theme.palette.background.font,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    "@media(max-width: 1100px)": {
      width: "95%",
      height: "auto",
    },
  };

  const box3 = {
    width: "50%",
    height: "12.5vh",
    marginTop: ".5rem",
    "@media(max-width: 1100px)": {
      width: "95%",
      height: "auto",
      marginBottom: "2rem",
    },
  };

  const button1 = {
    color: "White",
    backgroundColor: "red",
    fontSize: ".7rem",
    fontWeight: "800",
    height: "1.6rem",
  };

  const button2 = {
    color: "White",
    backgroundColor: "orange",
    fontSize: ".7rem",
    fontWeight: "800",
    height: "1.6rem",
  };

  const button3 = {
    width: "20%",
    height: "52.71px",
    borderRadius: "0px",
    backgroundColor: "transparent",
    color: theme.palette.background.font,
  };

  return (
    <Box
      sx={{
        "@media(max-width: 1100px)": {
          width: "100%",
          height: "auto",
          marginBottom: "2rem",
        },
      }}
    >
      {getComment && getComment.length > 0 ? (
        getComment.map((rev) => (
          <Box key={rev.id} sx={box1}>
            <Box sx={{ display: "block" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Rating value={rev.rating} readOnly />
                <Typography>{rev.comment}</Typography>
                <Box
                  sx={{
                    borderLeft: `.5px solid ${theme.palette.background.font}`,
                    paddingLeft: ".5rem",
                  }}
                >
                  <Avatar
                    alt="rien"
                    src={
                      pic.find((picture) => picture.id === rev.userId)?.url ||
                      "-"
                    }
                  />
                </Box>
              </Box>
              <Box>
                {rev.replies &&
                  rev.replies.map((reply, index) => (
                    <Box
                      key={index}
                      sx={{
                        fontStyle: "italic",
                        width: "80%",
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "1rem .5rem",
                        padding: ".2rem",
                        borderTop: `.5px solid ${theme.palette.background.font}`,
                        borderRight: `.5px solid ${theme.palette.background.font}`,
                      }}
                    >
                      <Avatar alt={reply.name} src={reply.url} />
                      <Typography>{reply.name}</Typography>
                      <Typography sx={{ width: "60%" }}>
                        {reply.reply}
                      </Typography>
                      <Typography>
                        - {reply.date && reply.date.substring(11, 16)}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <CommentReply
                commentId={rev.id}
                userName={userName}
                url={url}
                onReplySubmitted={(reply) => addReplyToComment(rev.id, reply)}
                token={token}
                role={role}
              />
              <Button sx={button1}>SUPPRIMER</Button>
              <Button sx={button2}>MODIFIER</Button>
            </Box>
          </Box>
        ))
      ) : (
        <Box sx={box2}>
          <Typography sx={{ fontWeight: "900", fontSize: "1.1rem" }}>
            Aucun commentaire pour le moment.
          </Typography>
          <Box>
            <Typography>Soyez le premier á commenter</Typography>
            <CommentIcon />
          </Box>
        </Box>
      )}
      <Box sx={box3}>
        <form onSubmit={handleComment}>
          <Rating
            name="simple-controlled"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            sx={{ width: "20%" }}
          />
          <TextField
            label="Laissez un commentaire"
            variant="standard"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name="comment"
            sx={{
              width: "60%",
              padding: "auto",
              backgroundColor: "transparent",
            }}
          />
          <Button type="submit" sx={button3}>
            Soumettre
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Review;
