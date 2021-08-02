import { useState, useEffect, useContext } from 'react';
import CommentList from './comment-list';
import NewComment from './new-comment';
import { NotificationContext } from "../../context/notificationContext"
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const { showNotification } = useContext(NotificationContext)

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);

  }

  function addCommentHandler(commentData) {

    showNotification({
      title: "Commenting",
      message: "Sending comment",
      status: "pending"
    })

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        return res.json().then(data => {
          throw new Error(data.message || 'Something went wrong')
        })
      })
      .then(data => showNotification({
        title: "Comment Success",
        message: "Comment sent successfully",
        status: "success"
      }))
      .catch(err => {
        showNotification({
          title: "Error",
          message: "Error in sending comment",
          status: "error"
        })
      })
  }

  useEffect(() => {

    if (showComments) {
      setLoading(true)
      fetch(`/api/comments/${eventId}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          return (
            setComments(data.comments),
            setLoading(false)
          )
        })
    }

  }, [showComments])

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !loading && <CommentList comments={comments} />}
      {showComments && loading && <p>Loading..</p>}
    </section>
  );
}

export default Comments;
