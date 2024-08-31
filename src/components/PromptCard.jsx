
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PromptCard = ({ prompt }) => {
  const navigate = useNavigate();

  const openResponse = () => {
    navigate(`/response/${prompt._id}`);
  };

  return (
    <Card style={{ width: '356px', height: '243px', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{prompt.title}</Card.Title>
        <Card.Text>{prompt.description}</Card.Text>
        <Button variant="primary" onClick={openResponse}>Try it</Button>
      </Card.Body>
    </Card>
  );
};

export default PromptCard;
