import React, { useState, useEffect } from 'react';
import { IconButton, Typography, Grid } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from 'axios';

const LikeDislikeButton = (props) => {
  const shortFilmId = props.filmid;
  const userId = localStorage.getItem('userId');
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [dislikes, setDislikes] = useState(0);
  const [disliked, setDisliked] = useState(false);
  const [userLikeStatus, setUserLikeStatus] = useState(null); // Add state for user's like status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/like/count', { shortFilmId, userId });
        if (response.data.success) {
          setLikes(response.data.likeCount);
          setDislikes(response.data.dislikeCount);
          setUserLikeStatus(response.data.userLikeStatus); // Set user's like status from the response
        } else {
          console.error('Failed to fetch like/dislike counts.');
        }
      } catch (error) {
        console.error('Error occurred while fetching like/dislike counts:', error);
      }
    };

    fetchData();
  }, [shortFilmId, userId]); // Fetch counts whenever shortFilmId or userId changes

  const handleLike = () => {
    const actionlike = liked ? 'null' : 'like';
    const actiondislike = 'null';
    axios.post('http://localhost:5000/api/like', { userId, shortFilmId, actionlike, actiondislike })
      .then(response => {
        if (response.data.success) {
          setLikes(liked ? likes - 1 : likes + 1);
          setLiked(!liked);
          if (disliked) {
            setDislikes(dislikes - 1);
            setDisliked(false);
          }
          setUserLikeStatus(liked ? null : 'liked'); // Update user's like status based on like action
        } else {
          console.error('Failed to like/unlike.');
        }
      })
      .catch(error => {
        console.error('Error occurred while liking/unliking:', error);
      });
  };

  const handleDislike = () => {
    const actionlike = 'null';
    const actiondislike = disliked ? 'null' : 'unlike';
    axios.post('http://localhost:5000/api/like', { userId, shortFilmId, actionlike, actiondislike })
      .then(response => {
        if (response.data.success) {
          setDislikes(disliked ? dislikes - 1 : dislikes + 1);
          setDisliked(!disliked);
          if (liked) {
            setLikes(likes - 1);
            setLiked(false);
          }
          setUserLikeStatus(disliked ? null : 'unliked'); // Update user's like status based on dislike action
        } else {
          console.error('Failed to like/unlike.');
        }
      })
      .catch(error => {
        console.error('Error occurred while liking/unliking:', error);
      });
  };

  return (
<Grid container spacing={2} alignItems="center">
  <Grid item>
    <IconButton onClick={handleLike} style={{ color: userLikeStatus === 'liked' ? 'blue' : 'inherit' }}>
      <ThumbUpIcon style={{ fontSize: '2.5rem' }} /> {/* Adjust the fontSize as per your preference */}
    </IconButton>
    <Typography variant="body1" color="textSecondary">
      {likes}
    </Typography>
  </Grid>

  <Grid item>
    <IconButton onClick={handleDislike} style={{ color: userLikeStatus === 'unliked' ? 'blue' : 'inherit' }}>
      <ThumbDownIcon style={{ fontSize: '2.5rem' }} /> {/* Adjust the fontSize as per your preference */}
    </IconButton>
    <Typography variant="body1" color="textSecondary">
      {dislikes}
    </Typography>
  </Grid>
</Grid>


  );
};

export default LikeDislikeButton;
