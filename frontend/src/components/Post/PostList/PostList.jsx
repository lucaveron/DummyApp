import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Dropdown, Form, Button } from 'react-bootstrap';
import './PostList.css';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => ( //componente boostrap
  <a
    href="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ textDecoration: 'none' }}
  >
    {children}
  </a>
));

const PostList = () => {
  //manejo de hooks para datos de la api
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [showTags, setShowTags] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  console.log(apiKey);

  useEffect(() => {
    //traer los datos de la api
    fetch('https://dummyapi.io/data/v1/post', {
      headers: { 'app-id': apiKey }
    })
      .then(response => response.json())
      .then(data => setPosts(data.data))
      .catch(error => console.error('Error fetching posts:', error));

    fetch('https://dummyapi.io/data/v1/tag', {
      headers: { 'app-id': apiKey }
    })
      .then(response => response.json())
      .then(data => {
        const filteredTags = data.data.filter(tag => tag && tag.trim() !== '');
        setTags(filteredTags);
      })
      .catch(error => console.error('Error fetching tags:', error));
  }, []);

  const handleTagClick = (tag) => {
    // seleccionar tag
    setSelectedTag(tag);
    setSearchValue(tag);
    setShowTags(false);
  };

  const handlePostClick = (id) => {
    //envio a details
    navigate(`/post/${id}`);
  };

  const handleSearchChange = (e) => {
    // filtrar posts por tag
    const value = e.target.value;
    setSearchValue(value);
    setShowTags(true);
    if (value === '') {
      setSelectedTag('');
    }
  };

  const handleSearchFocus = () => {
    //perder foco en input
    setShowTags(true);
  };

  const handleSearchBlur = () => {
    if (!document.activeElement.classList.contains('dropdown-item')) {
      setShowTags(false);
    }
  };

  const handleClearTags = () => {
    setSelectedTag('');
    setSearchValue('');
    setShowTags(false);
  };

  const filteredPosts = selectedTag ? posts.filter(post => post.tags.includes(selectedTag)) : posts;

  const filteredTags = tags.filter(tag => tag.toLowerCase().includes(searchValue.toLowerCase()));

  const truncateTag = (tag) => {
    return tag.length > 15 ? `${tag.substring(0, 12)}...` : tag;
  };

  return (
    <Container className="post-list-container">
      <Row className="mb-4 justify-content-center">
        <Col xs="auto">
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col xs="auto">
                <Dropdown show={showTags} onToggle={() => {}}>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    <Form.Control
                      type="text"
                      placeholder="Filrar por tag"
                      value={searchValue}
                      onChange={handleSearchChange}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                      ref={inputRef}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="custom-dropdown-menu">
                    {filteredTags.map(tag => (
                      <Dropdown.Item key={tag} onMouseDown={() => handleTagClick(tag)}>
                        {truncateTag(tag)}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            
              <Col xs="auto">
                <Button variant="secondary" onClick={handleClearTags}>Limpiar</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <Col xs={12} md={8} lg={6} key={post.id} className="mb-4">
              <Card onClick={() => handlePostClick(post.id)} className="post-item mx-auto">
                <Card.Img variant="top" src={post.image} alt={post.text} className="post-item-image" />
                <Card.Body>
                  <Card.Title>{post.text}</Card.Title>
                  <Card.Text>
                    <small className="text-muted">By {post.owner.firstName} {post.owner.lastName}</small>
                  </Card.Text>
                  <div className="post-tags-container bg-grey">
                    {post.tags.map(tag => (
                      <span key={tag} className="post-tag">{truncateTag(tag)}</span>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : selectedTag ? (
          <Col className="text-center">
            <p className="no-posts-message">No se hallaron posts con este tag</p>
          </Col>
        ) : (
          <Col className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default PostList;
