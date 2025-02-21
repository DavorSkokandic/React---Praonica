import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addComment, setLoading, setError } from '../redux/slices/commentsSlice';
import './Comments.css';
const Comments: React.FC = () => {
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState(''); // Dodajemo state za lozinku
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state: RootState) => state.comments);

  const handleAddComment = () => {
    if (newComment && author && password) {
      // Provjerite ovdje ispravnost korisničkog imena i lozinke
      if (password === 'Password') { // Zamijenite s stvarnom provjerom
        dispatch(setLoading(true));
        try {
          const newCommentObj = {
            id: comments.length + 1,
            text: newComment,
            author,
          };
          dispatch(addComment(newCommentObj));
          setNewComment('');
          setAuthor('');
          setPassword(''); // Resetiramo lozinku
        } catch (err) {
          dispatch(setError('Error adding comment'));
        } finally {
          dispatch(setLoading(false));
        }
      } else {
        dispatch(setError('Invalid password'));
      }
    } else {
      dispatch(setError('All fields are required'));
    }
  };

  return (
    <div className="comments-section">
      <h2>Comments</h2>
      <div className="comment-form">
        <input
          type="User"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment} disabled={loading}>
          {loading ? 'Adding...' : 'Add Comment'}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p><strong>{comment.author}:</strong> {comment.text}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
