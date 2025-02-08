import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const formatDate = (dateString) => {
    const now = new Date();
    const commentDate = new Date(dateString);

    // Calculate the difference in milliseconds
    const difference = now - commentDate;
    const millisecondsPerMinute = 1000 * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;

    // Check if the provided date is the same day as the current date
    if (
        now.getFullYear() === commentDate.getFullYear() &&
        now.getMonth() === commentDate.getMonth() &&
        now.getDate() === commentDate.getDate()
    ) {
        if (difference < millisecondsPerMinute) {
            return 'just now';
            
        } else if (difference < millisecondsPerHour) {
            const minutesAgo = Math.floor(difference / millisecondsPerMinute);
            return `${minutesAgo} mins ago`;
        } else {
            const hoursAgo = Math.floor(difference / millisecondsPerHour);
            return `${hoursAgo} hrs ago`;
        }
    }

    // If it's not the same day, format the date normally
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return commentDate.toLocaleDateString('en-US', options);
};


function CommentBox(props) {
    const userId = localStorage.getItem("userId");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [visibleComments, setVisibleComments] = useState(3);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`https://movie-backend-1-a9jv.onrender.com/api/postcomment/${props.filmid}`);
                setComments(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [props.filmid, refresh]);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Make an Axios POST request to submit a new comment
        try {
            const response = await axios.post("https://movie-backend-1-a9jv.onrender.com/api/postcomment", {
                userId: userId,
                filmid: props.filmid,
                comment: comment,
            });

            console.log("Comment submitted successfully:", response.data);
            setRefresh(!refresh);

            // Clear the comment input after submission
            setComment("");
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    const handleViewMore = () => {
        setVisibleComments(visibleComments + 3);
    };

    const deleteComment = async (commentid) => {
        try {
          // Send a DELETE request to the server with the comment ID
          await axios.delete(`https://movie-backend-1-a9jv.onrender.com/api/postcomment/${commentid}`);
          setRefresh(!refresh);
        } catch (error) {
          // Handle errors here
          console.error('Error deleting comment:', error);
        }
      };

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    id="userComment"
                                    rows={3}
                                    placeholder="Write your comment here..."
                                    required
                                    value={comment}
                                    onChange={handleCommentChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-4 mt-md-0">
                                Post
                            </button>
                        </form>
                    </div>
                </div>

                <h3>Movie Reviews</h3>

                {/* Display fetched comments or "No comments yet" message */}
                {comments.length > 0 ? (
                    <>
                        {comments.slice(0, visibleComments).map((commentData) => (
                            <div className="card mb-2" key={commentData.commentId}>
                                <div className="card-body">
                                    <div className="avatar avatar-md">
                                    <img
                                    src={
                                    commentData.userId.profile_picture === undefined
                                      ? "assets/images/faces/4.jpg"
                                      : `${baseUrl}/profile_picture/${commentData.userId.profile_picture}`
                                    }
                                     alt={commentData.userId.name ? `${commentData.userId.name}` : "User profile"}
                                     className="rounded-circle"
                                      />
                                        <div style={{ marginLeft: "20px", textAlign: "left" }}>
                                            <h6 className="card-title">{commentData.userId.username}</h6>
                                            <p className="card-text">{commentData.comment}</p>
                                        </div>
                                    </div>
                                   
                                    {/* Display date and time on the right side */}
                                    <div className="text-right" style={{ flex: "1", textAlign: "right" }}>
                                        <p>
                    
                                        {userId === commentData.userId._id && (
    <button className="btn" onClick={() => deleteComment(commentData._id)}>
        Delete <DeleteForeverIcon className="text-danger" />
    </button>
)}
                                            
                                            {formatDate(commentData.updatedAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {comments.length > visibleComments && (
                            <button className="btn btn-link" onClick={handleViewMore}>
                                View More
                            </button>
                        )}
                    </>
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </div>
    );
}

export default CommentBox;
