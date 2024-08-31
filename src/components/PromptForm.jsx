import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const PromptForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prompt, setPrompt] = useState('');
  const [variables, setVariables] = useState([{ name: '' }]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/prompts/${id}`);
        const { title, description, prompt, variables, visibility } = response.data;
        setTitle(title);
        setDescription(description || '');
        setPrompt(prompt);
        setVariables(variables || [{ name: '' }]);
        setVisible(visibility);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchPrompt();
    }
  }, [id]);

  const handleVariableChange = (index, value) => {
    const newVariables = [...variables];
    newVariables[index].name = value;
    setVariables(newVariables);
  };

  const addVariable = () => setVariables([...variables, { name: '' }]);

  const removeVariable = (index) => {
    const newVariables = variables.filter((_, i) => i !== index);
    setVariables(newVariables);
  };

  const formatPrompt = () => {
    let formattedPrompt = prompt;
    variables.forEach((variable) => {
      const regex = new RegExp(`\\[?${variable.name}\\]?`, 'g');
      formattedPrompt = formattedPrompt.replace(regex, `[${variable.name}]`);
    });
    return formattedPrompt;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedPrompt = formatPrompt();
      const formattedVariables = variables.map(variable => ({
        name: variable.name
      }));
      const payload = { title, description, prompt: formattedPrompt, variables: formattedVariables, visibility: visible };
      if (id) {
        await axios.put(`http://localhost:5000/api/prompts/${id}`, payload);
        alert('Prompt updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/prompts', payload);
        alert('Prompt saved successfully');
      }
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Error saving prompt');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      try {
        await axios.delete(`http://localhost:5000/api/prompts/${id}`);
        alert('Prompt deleted successfully');
        navigate('/');
      } catch (error) {
        console.error(error);
        alert('Error deleting prompt');
      }
    }
  };

  return (
    <Container>
      <h2 className="my-4">{id ? 'Edit Prompt' : 'Add Prompt'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Title:</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Description:</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Prompt:</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Visibility:</Form.Label>
          <Col sm={10}>
            <div className="d-flex">
              <Form.Check
                type="radio"
                id="visibility-yes"
                label="Yes"
                checked={visible === true}
                onChange={() => setVisible(true)}
                className="me-3"
              />
              <Form.Check
                type="radio"
                id="visibility-no"
                label="No"
                checked={visible === false}
                onChange={() => setVisible(false)}
              />
            </div>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Variables:</Form.Label>
          <Col sm={10}>
            <ListGroup>
              {variables.map((variable, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  <Form.Control
                    type="text"
                    placeholder="Variable Name"
                    value={variable.name}
                    onChange={(e) => handleVariableChange(index, e.target.value)}
                    required
                  />
                  <Button variant="danger" onClick={() => removeVariable(index)}>Remove</Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Button variant="primary" onClick={addVariable} className="mt-2">Add Variable</Button>
          </Col>
        </Form.Group>

        <Button variant="success" type="submit">Save Prompt</Button>
        {id && (
          <Button variant="danger" onClick={handleDelete} style={{ marginLeft: "20px" }}>Delete Prompt</Button>
        )}
      </Form>
    </Container>
  );
};

export default PromptForm;
