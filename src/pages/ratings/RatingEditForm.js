import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/RatingCreateEditForm.module.css";
import StarRating from "../../components/StarRating";

function RatingEditForm(props) {
  const { id, rating, explanation, setShowEditForm, setRatings } = props;

  const [formExplanation, setFormExplanation] = useState(explanation);
  const [formRating, setFormRating] = useState(rating || 1);

  const handleChange = (event) => {
    setFormExplanation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/ratings/${id}/`, {
        explanation: formExplanation.trim(),
        rating: formRating,
      });
      setRatings((prevRatings) => ({
        ...prevRatings,
        results: prevRatings.results.map((r) => {
          return r.id === id
            ? {
                ...r,
                explanation: formExplanation.trim(),
                rating: formRating,
                updated_at: new Date().toISOString(),
              }
            : r;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group>
        <StarRating rating={formRating} onSetRating={setFormRating} totalStars={5} editable={true} />
      </Form.Group>
      <Form.Group>
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formExplanation}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-center">
        <button
          className={`${styles.Button} mx-2`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </button>
        <button
          className={`${styles.Button} mx-2`}
          disabled={!formExplanation.trim()}
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  );
}

export default RatingEditForm;