import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import "./PostDetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const apiKey = process.env.REACT_APP_DUMMY_API_KEY;

  useEffect(() => {
    // info del post
    fetch(`https://dummyapi.io/data/v1/post/${id}`, {
      headers: { "app-id": apiKey },
    })
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error("Error fetching post:", error));

    // comentarios del post
    fetch(`https://dummyapi.io/data/v1/post/${id}/comment`, {
      headers: { "app-id": apiKey },
    })
      .then((response) => response.json())
      .then((data) => setComments(data.data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [id]);

  if (!post) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center vh-100"
      >
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="post-detail-container my-5">
      <Row>
        <Col lg={8} className="mb-4">
          <Card className="post-details-card">
            <Card.Header className="post-detail-header d-flex align-items-center">
              <Image
                src={post.owner.picture}
                roundedCircle
                className="me-3 post-owner-image"
              />
              <h2 className="mb-0">{post.text}</h2>
            </Card.Header>
            <Card.Body>
              <div className="image-container">
                <div className="image-wrapper">
                  <Image src={post.image} className="post-detail-image" />
                </div>
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Tags:</strong> {post.tags.join(", ")}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Posted by:</strong> {post.owner.firstName} {post.owner.lastName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Likes:</strong> {post.likes}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <div className="comments-section">
            <h3>Comments:</h3>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p>
                    <strong>
                      {comment.owner.firstName} {comment.owner.lastName}:
                    </strong>{" "}
                    {comment.message}
                  </p>
                </div>
              ))
            ) : (
              <p>No comments available</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PostDetail;
