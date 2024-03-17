// CommentReply.jsx
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const CommentReply = ({
  commentId,
  token,
  role,
  onReplySubmitted,
  userName,
  url,
}) => {
  const [replyComment, setReplyComment] = useState("");

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/client/reviews/${commentId}/reply`,
        {
          reply: replyComment,
          name: userName,
          url: url,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          role: role,
        }
      );
      console.log(response.data);
      // Appeler la fonction onReplySubmitted avec la nouvelle réponse
      onReplySubmitted(replyComment);
      setReplyComment(""); // Réinitialiser le champ de réponse après l'envoi
    } catch (error) {
      console.error(
        "Erreur lors de la création de la réponse au commentaire :",
        error
      );
    }
  };

  return (
    <Box>
      <form
        onSubmit={handleReply}
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          height: "1.6rem",
          gap: "10px",
        }}
      >
        <input
          label="Répondre au commentaire"
          value={replyComment}
          onChange={(e) => setReplyComment(e.target.value)}
          sx={{ marginTop: "1rem", width: "80%" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            color: "white",
            backgroundColor: "lightGreen",
            fontSize: ".7rem",
            fontWeight: "800",
            height: "1.6rem",
          }}
        >
          Répondre
        </Button>
      </form>
    </Box>
  );
};

export default CommentReply;
