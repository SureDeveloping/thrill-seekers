import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Asset from "../../components/Asset";
import Upload from "../../assets/upload-icon.webp";
import styles from "../../styles/ParkAddEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function ParkCreateForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    name: "",
    description: "",
    image: "",
    website: "",
    total_number_of_rides: "",
    total_number_of_coasters: "",
    thrill_factor: "",
    overall_rating: "",
  });
  const {
    name,
    description,
    image,
    website,
    total_number_of_rides,
    total_number_of_coasters,
    thrill_factor,
    overall_rating,
  } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", imageInput.current.files[0]);
    formData.append("website", website);
    formData.append("total_number_of_rides", total_number_of_rides);
    formData.append("total_number_of_coasters", total_number_of_coasters);
    formData.append("thrill_factor", thrill_factor);
    formData.append("overall_rating", overall_rating);

    try {
      const { data } = await axiosReq.post("/parks/", formData);
      history.push(`/parks/${data.id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container className={`${appStyles.Content} ${styles.Container}`}>
        <Form.Group className="text-center">
          <Form.Label htmlFor="image-upload">Park Image</Form.Label>
          <div className={`${styles.ImageContainer} ${styles.ImageUpload}`}>
            {image ? (
              <>
                <figure>
                  <Image className={appStyles.Image} src={image} rounded />
                </figure>
                <div>
                  <Button
                    className={`${btnStyles.Button} ${styles.ChangeImageButton}`}
                    onClick={() => imageInput.current.click()}
                  >
                    Change the image
                  </Button>
                </div>
              </>
            ) : (
              <div
                className="d-flex justify-content-center"
                onClick={() => imageInput.current.click()}
              >
                <Asset src={Upload} message="Click or tap to upload an image" />
              </div>
            )}

            <Form.File
              id="image-upload"
              accept="image/*"
              onChange={handleChangeImage}
              ref={imageInput}
              style={{ display: 'none' }}
            />
          </div>
        </Form.Group>
        {errors?.image?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.name?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
            id="description"
            as="textarea"
            rows={6}
            name="description"
            value={description}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.description?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label htmlFor="website">Website</Form.Label>
          <Form.Control
            id="website"
            type="url"
            name="website"
            value={website}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.website?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label htmlFor="total_number_of_coasters">Total Number of Roller Coasters</Form.Label>
          <Form.Control
            id="total_number_of_coasters"
            type="number"
            min="0"
            name="total_number_of_coasters"
            value={total_number_of_coasters}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.total_number_of_coasters?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label htmlFor="total_number_of_rides">Total Number of Rides</Form.Label>
          <Form.Control
            id="total_number_of_rides"
            type="number"
            min="0"
            name="total_number_of_rides"
            value={total_number_of_rides}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.total_number_of_rides?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label htmlFor="thrill_factor">Thrill Factor</Form.Label>
          <Form.Control
            id="thrill_factor"
            type="number"
            step="0.1"
            min="0"
            max="5"
            name="thrill_factor"
            value={thrill_factor}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.thrill_factor?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label htmlFor="overall_rating">Overall Rating</Form.Label>
          <Form.Control
            id="overall_rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            name="overall_rating"
            value={overall_rating}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.overall_rating?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <div className="text-center">
          <Button 
            className={`${btnStyles.Button} mr-3`} 
            onClick={() => history.goBack()}
          >
            Cancel
          </Button>
          <Button className={`${btnStyles.Button}`} type="submit">
            Create
          </Button>
        </div>
      </Container>
    </Form>
  );
}

export default ParkCreateForm;
