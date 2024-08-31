






// import React, { useState, useEffect } from 'react';
// import { Navbar, Nav, Container, Button, Image, Modal } from 'react-bootstrap';
// import './CustomNavbar.css';

// const CustomNavbar = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false); // State for modal visibility

//   useEffect(() => {
//     const fetchUser = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('/api/user', {
//           credentials: 'include',
//         });
//         if (response.ok) {
//           const userData = await response.json();
//           setUser(userData);
//         } else {
//           console.error('Failed to fetch user data:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const response = await fetch('/logout', {
//         method: 'GET',
//         credentials: 'include',
//       });
//       if (response.ok) {
//         setUser(null);
//         window.location.href = '/';
//       } else {
//         console.error('Failed to log out:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   const handleShow = () => setShowModal(true); // Show modal
//   const handleClose = () => setShowModal(false); // Hide modal

//   const handleGoogleAuth = () => {
//     window.location.href = 'http://localhost:5000/auth/google'; // Redirect to Google auth
//   };

//   if (loading) {
//     return (
//       <Navbar expand="lg" className="custom-navbar">
//         <Container>
//           <Navbar.Brand href="#">MagicText</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">Loading...</Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     );
//   }

//   return (
//     <>
//       <Navbar expand="lg" className="custom-navbar">
//         <Container>
//           <Navbar.Brand href="#">MagicText</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               <Nav.Link href="#">Free Tools</Nav.Link>
//               {user ? (
//                 <>
//                   <Nav.Link href="#">
//                     <Image src={user.picture} roundedCircle width="30" height="30" alt="User Profile Picture" />
//                     {user.name}
//                   </Nav.Link>
//                   <Button variant="outline-light" className="try-button" onClick={handleLogout}>
//                     Logout
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Nav.Link href="#" onClick={handleShow}>Login</Nav.Link>
//                   <Button variant="outline-light" className="try-button" onClick={handleShow}>
//                     Try for Free
//                   </Button>
//                 </>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Google Authentication Modal */}
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Login with Google</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Click the button below to log in with your Google account.</p>
//           <Button variant="primary" onClick={handleGoogleAuth}>
//             Login with Google
//           </Button>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default CustomNavbar;





// import React, { useState, useEffect } from 'react';
// import { Navbar, Nav, Container, Button, Image, Modal, Spinner } from 'react-bootstrap';
// import './CustomNavbar.css';

// const CustomNavbar = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('http://localhost:5000/api/user', {
//           credentials: 'include',
//         });
//         if (response.ok) {
//           const userData = await response.json();
//           setUser(userData);
//         } else if (response.status === 401) {
//           console.error('Unauthorized - Redirecting to login');
//           setShowModal(true); // Show login modal if unauthorized
//         } else {
//           console.error('Failed to fetch user data:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/auth/google/logout', {
//         method: 'GET',
//         credentials: 'include',
//       });
//       if (response.ok) {
//         setUser(null);
//         window.location.href = '/';
//       } else {
//         console.error('Failed to log out:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   const handleShow = () => setShowModal(true);
//   const handleClose = () => setShowModal(false);

//   const handleGoogleAuth = () => {
//     window.location.href = 'http://localhost:5000/auth/google';
//   };

//   if (loading) {
//     return (
//       <Navbar expand="lg" className="custom-navbar">
//         <Container>
//           <Navbar.Brand href="#">MagicText</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               <Spinner animation="border" variant="light" />
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     );
//   }

//   return (
//     <>
//       <Navbar expand="lg" className="custom-navbar">
//         <Container>
//           <Navbar.Brand href="#">MagicText</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               <Nav.Link href="#">Free Tools</Nav.Link>
//               {user ? (
//                 <>
//                   <Nav.Link href="#">
//                     <Image src={user.picture} roundedCircle width="30" height="30" alt="User Profile Picture" />
//                     {user.name}
//                   </Nav.Link>
//                   <Button variant="outline-light" className="try-button" onClick={handleLogout}>
//                     Logout
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Nav.Link href="#" onClick={handleShow}>Login</Nav.Link>
//                   <Button variant="outline-light" className="try-button" onClick={handleShow}>
//                     Try for Free
//                   </Button>
//                 </>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Google Authentication Modal */}
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Login with Google</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Click the button below to log in with your Google account.</p>
//           <Button variant="primary" onClick={handleGoogleAuth}>
//             Login with Google
//           </Button>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default CustomNavbar;
















import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';
import './CustomNavbar.css';

const CustomNavbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken'); // Assuming you store the token in localStorage
        const response = await fetch('https://happys-i6rs.onrender.com/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the headers
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    // Remove authToken from local storage
    localStorage.removeItem('authToken');
    
    // Optionally, you can also clear the entire local storage if needed
    // localStorage.clear();
  
    // Redirect the user to the login page or home page
    window.location.href = '/login';
  };
  


  const handleGoogleAuth = () => {
    window.location.href = 'https://happys-i6rs.onrender.com/auth/google'; // Redirect to Google auth
  };

  if (loading) {
    return (
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#">MagicText</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">Loading...</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#">MagicText</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Free Tools</Nav.Link>
            {user ? (
              <>
                <Nav.Link href="#">
                  <Image src={user.picture} roundedCircle width="30" height="30" alt="User Profile Picture" />
                  {user.name}
                </Nav.Link>
                <Button variant="outline-light" className="try-button" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="outline-light" className="try-button" onClick={handleGoogleAuth}>
                Login with Google
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
