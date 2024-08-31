

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Row, Col } from 'react-bootstrap';
// import './UserPanel.css';
// import Description from './Description';
// import PromptCard from './PromptCard';

// const UserPanel = () => {
//   const [prompts, setPrompts] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPrompts = async () => {
//       try {
//         const result = await axios.get('http://localhost:5000/api/userprompts', {
//           withCredentials: true, // Include credentials with the request
//         });
//         console.log("here is prompts",result);
//         setPrompts(result.data);
//       } catch (error) {
//         console.error(error);
//         setError('Failed to fetch prompts');
//       }
//     };
//     fetchPrompts();
//   }, []);

//   return (
//     <>
//       <Description />
//       <Container fluid className="my-4">
//         <Row className="card-container" style={{ paddingLeft: '205px', paddingRight: '205px' }}>
//           {prompts.map(prompt => (
//             <Col md={4} key={prompt._id} className="mb-4">
//               <PromptCard prompt={prompt} />
//             </Col>
//           ))}
//         </Row>
//         {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>} {/* Display error if any */}
//       </Container>
//     </>
//   );
// };

// export default UserPanel;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './UserPanel.css';
import Description from './Description';
import PromptCard from './PromptCard';

const UserPanel = () => {
  const [prompts, setPrompts] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();

  // Save the token in localStorage if it's in the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('authToken', token); // Save the token in localStorage
      window.history.replaceState({}, document.title, window.location.pathname); // Remove the token from the URL
    }
  }, [location]);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('authToken');

        // Fetch prompts with the token included in the Authorization header
        const result = await axios.get('https://happys-i6rs.onrender.com/api/userprompts', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true, // Include credentials with the request if needed
        });

        console.log("here are prompts", result);
        setPrompts(result.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch prompts');
      }
    };
    fetchPrompts();
  }, []);

  return (
    <>
      <Description />
      <Container fluid className="my-4">
        <Row className="card-container" style={{ paddingLeft: '205px', paddingRight: '205px' }}>
          {prompts.map(prompt => (
            <Col md={4} key={prompt._id} className="mb-4">
              <PromptCard prompt={prompt} />
            </Col>
          ))}
        </Row>
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>} {/* Display error if any */}
      </Container>
    </>
  );
};

export default UserPanel;
