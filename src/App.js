// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import UserPanel from './components/UserPanel';
// import ResponsePage from './components/ResponsePage';
// import CustomNavbar from './components/Navbar';
// import HomePage from './components/HomePage';
// import './App.css';

// const App = () => {
//   return (
//     <Router>
//       <CustomNavbar className="navbar" />
//       <AppRoutes />
//     </Router>
//   );
// };

// const AppRoutes = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const token = params.get('token');

//     if (token) {
//       localStorage.setItem('authToken', token); // Save the token in localStorage
//       window.history.replaceState({}, document.title, window.location.pathname); // Remove the token from the URL
//     }
//   }, [location]);

//   return (
//     <Routes>
//       <Route path="/" element={<UserPanel />} />
//       <Route path="/Home" element={<HomePage />} />
//       <Route path="/response/:promptId" element={<ResponsePage />} />
//     </Routes>
//   );
// };

// export default App;
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import UserPanel from './components/UserPanel';
import ResponsePage from './components/ResponsePage';
import CustomNavbar from './components/Navbar';
import HomePage from './components/HomePage';
import './App.css';

const App = () => {
  return (
    <Router>
      <CustomNavbar className="navbar" />
      <AppRoutes />
    </Router>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('authToken', token); // Save the token in localStorage
      window.history.replaceState({}, document.title, window.location.pathname); // Remove the token from the URL
      window.location.reload(); // Refresh the page
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<UserPanel />} />
      <Route path="/Home" element={<HomePage />} />
      <Route path="/response/:promptId" element={<ResponsePage />} />
    </Routes>
  );
};

export default App;
