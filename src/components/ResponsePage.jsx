



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import './ResponsePage.css';
// import { Form, Button, Spinner } from 'react-bootstrap';

// const ResponsePage = () => {
//   const { promptId } = useParams();
//   const [prompt, setPrompt] = useState(null);
//   const [variables, setVariables] = useState({});
//   const [responses, setResponses] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [editorContent, setEditorContent] = useState('');

//   useEffect(() => {
//     const fetchPrompt = async () => {
//       try {
//         const result = await axios.get(`http://localhost:5000/api/prompts/${promptId}`, {
//           withCredentials: true, // Include credentials with the request
//         });
//         setPrompt(result.data);
//       } catch (error) {
//         console.error('Error fetching prompt:', error);
//         setError('Error fetching prompt');
//       }
//     };
//     fetchPrompt();
//   }, [promptId]);

//   const handleVariableChange = (name, value) => {
//     setVariables({ ...variables, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!prompt) return;

//     const variableArray = Object.keys(variables).map(variableName => ({
//       name: variableName,
//       value: variables[variableName],
//     }));

//     setResponses([]);
//     setLoading(true);
//     setError('');
//     setEditorContent('');

//     try {
//       const result = await axios.post(`http://localhost:5000/api/prompts/${promptId}/execute`, {
//         variables: variableArray,
//       }, {
//         withCredentials: true, // Include credentials with the request
//       });
//       setResponses(prevResponses => [...prevResponses, result.data.response]);
//       setEditorContent(result.data.response);
//       console.log('Generated Response:', result);
//       setError('');
//     } catch (error) {
//       console.error('Error generating response:', error);
//       setError('Error generating response');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const stripHtmlTags = (html) => {
//     const doc = new DOMParser().parseFromString(html, 'text/html');
//     return doc.body.textContent || "";
//   };

//   const copyToClipboard = (htmlContent) => {
//     const plainText = stripHtmlTags(htmlContent);
//     navigator.clipboard.writeText(plainText).then(() => {
//       // alert('Response copied to clipboard!');
//     }).catch(err => {
//       console.error('Could not copy text: ', err);
//     });
//   };

//   return (
//     <div style={{ marginTop: '150px' }}>
//       {prompt && (
//         <>
//           <h3 className="text-center headline"><strong>{prompt.title}</strong></h3>
//           <h4 className="text-center headline">{prompt.description}</h4>
//         </>
//       )}
//       <div
//         style={{
//           marginLeft: '180px',
//           marginRight: '180px',
//           marginTop: '50px',
//         }}
//       >
//         <div style={{ display: 'flex', flexDirection: 'column' }}>
//           <div style={{ display: 'flex' }}>
//             <div style={{ flex: '50%', marginRight: '10px' }}>
//               <ReactQuill
//                 value={editorContent}
//                 onChange={setEditorContent}
//                 theme="snow"
//                 modules={ResponsePage.modules}
//                 style={{ height: '250px', minHeight: '280px', width: '100%' }}
//               />
//             </div>
//             <div className="form-container" style={{ flex: '50%', marginLeft: '20px' }}>
//               {prompt && (
//                 <Form onSubmit={handleSubmit} className="mt-4" style={{ maxWidth: '600px', marginRight:'100px' }}>
//                   {prompt.variables.map(variable => (
//                     <Form.Group key={variable.name}>
//                       <Form.Label style={{ marginTop: '5px' }}>{variable.name}:</Form.Label>
//                       <Form.Control
//                         type="text"
//                         onChange={(e) => handleVariableChange(variable.name, e.target.value)}
//                         required
//                       />
//                     </Form.Group>
//                   ))}
//                   <br />
//                   <div style={{ display: 'flex', gap: '10px' }}>
//                     <Button
//                       variant="primary"
//                       type="submit"
//                       className="w-50 btn-generate-response"
//                     >
//                       {loading ? <Spinner animation="border" size="sm" /> : 'Generate Response'}
//                     </Button>
//                     <Button
//                       variant="outline-secondary"
//                       className="w-50 btn-copy"
//                       onClick={() => copyToClipboard(editorContent)}
//                     >
//                       Copy Response
//                     </Button>
//                   </div>
//                 </Form>
//               )}
//               {error && <div style={{ color: 'red' }}>{error}</div>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// ResponsePage.modules = {
//   toolbar: [
//     [{ header: '1' }, { header: '2' }, { font: [] }],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     ['bold', 'italic', 'underline'],
//     [{ color: [] }, { background: [] }],
//     [{ align: [] }],
//     ['link', 'image'],
//     ['clean'],
//   ],
// };

// export default ResponsePage;

///prefianl

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ResponsePage.css';
import { Form, Button, Spinner } from 'react-bootstrap';

const ResponsePage = () => {
  const { promptId } = useParams();
  const [prompt, setPrompt] = useState(null);
  const [variables, setVariables] = useState({});
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState('');


  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const token=localStorage.getItem('authToken');
        const result = await axios.get(`https://happys-i6rs.onrender.com/api/prompts/${promptId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        setPrompt(result.data);
      } catch (error) {
        console.error('Error fetching prompt:', error);
        setError('Error fetching prompt');
      }
    };
    fetchPrompt();
  }, [promptId]);

  const handleVariableChange = (name, value) => {
    setVariables({ ...variables, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    const variableArray = Object.keys(variables).map(variableName => ({
      name: variableName,
      value: variables[variableName],
    }));

    setResponses([]);
    setLoading(true);
    setError('');
    setEditorContent('');
   

    try {
      const token=localStorage.getItem('authToken');
      const result = await axios.post(`https://happys-i6rs.onrender.com/api/prompts/${promptId}/execute`, {
        variables: variableArray,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        withCredentials: true,
      });

      // Set the total tokens from the response
      console.log(result.data.response.totalTokens);

      setResponses(prevResponses => [...prevResponses, result.data.response]);
      setEditorContent(result.data.response.content);
      console.log('Generated Response:', result);
      setError('');
    } catch (error) {
      console.error('Error generating response:', error);
      setError('Error generating response');
    } finally {
      setLoading(false);
    }
  };

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const copyToClipboard = (htmlContent) => {
    const plainText = stripHtmlTags(htmlContent);
    navigator.clipboard.writeText(plainText).then(() => {
      // alert('Response copied to clipboard!');
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div style={{ marginTop: '150px' }}>
      {prompt && (
        <>
          <h3 className="text-center headline"><strong>{prompt.title}</strong></h3>
          <h4 className="text-center headline">{prompt.description}</h4>
        </>
      )}
      <div
        style={{
          marginLeft: '180px',
          marginRight: '180px',
          marginTop: '50px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '50%', marginRight: '10px' }}>
              <ReactQuill
                value={editorContent}
                onChange={setEditorContent}
                theme="snow"
                modules={ResponsePage.modules}
                style={{ height: '250px', minHeight: '280px', width: '100%' }}
              />
            </div>
            <div className="form-container" style={{ flex: '50%', marginLeft: '20px' }}>
              {prompt && (
                <Form onSubmit={handleSubmit} className="mt-4" style={{ maxWidth: '600px', marginRight:'100px' }}>
                  {prompt.variables.map(variable => (
                    <Form.Group key={variable.name}>
                      <Form.Label style={{ marginTop: '5px' }}>{variable.name}:</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                        required
                      />
                    </Form.Group>
                  ))}
                  <br />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-50 btn-generate-response"
                    >
                      {loading ? <Spinner animation="border" size="sm" /> : 'Generate Response'}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="w-50 btn-copy"
                      onClick={() => copyToClipboard(editorContent)}
                    >
                      Copy Response
                    </Button>
                  </div>
                </Form>
              )}
              {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
          </div>
          {/* Display total tokens information */}
          
        </div>
      </div>
    </div>
  );
};

ResponsePage.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

export default ResponsePage;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import './ResponsePage.css';
// import { Form, Button, Spinner } from 'react-bootstrap';
// import { useTokenContext } from '../TokenContext'; // Import the context

// const ResponsePage = () => {
//   const { promptId } = useParams();
//   const { addTokens } = useTokenContext(); // Use the context
//   const [prompt, setPrompt] = useState(null);
//   const [variables, setVariables] = useState({});
//   const [responses, setResponses] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [editorContent, setEditorContent] = useState('');
//   const [totalTokens, setTotalTokens] = useState(0);

//   useEffect(() => {
//     const fetchPrompt = async () => {
//       try {
//         const result = await axios.get(`http://localhost:5000/api/prompts/${promptId}`, {
//           withCredentials: true,
//         });
//         setPrompt(result.data);
//       } catch (error) {
//         console.error('Error fetching prompt:', error);
//         setError('Error fetching prompt');
//       }
//     };
//     fetchPrompt();
//   }, [promptId]);

//   const handleVariableChange = (name, value) => {
//     setVariables({ ...variables, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!prompt) return;

//     const variableArray = Object.keys(variables).map(variableName => ({
//       name: variableName,
//       value: variables[variableName],
//     }));

//     setResponses([]);
//     setLoading(true);
//     setError('');
//     setEditorContent('');
//     setTotalTokens(0);

//     try {
//       const result = await axios.post(`http://localhost:5000/api/prompts/${promptId}/execute`, {
//         variables: variableArray,
//       }, {
//         withCredentials: true,
//       });

//       const tokensUsed = result.data.response.totalTokens;
//       setTotalTokens(tokensUsed);
//       addTokens(tokensUsed); // Add tokens to the context

//       setResponses(prevResponses => [...prevResponses, result.data.response]);
//       setEditorContent(result.data.response.content);
//       setError('');
//     } catch (error) {
//       console.error('Error generating response:', error);
//       setError('Error generating response');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       console.log('Text copied to clipboard');
//     }, (err) => {
//       console.error('Failed to copy: ', err);
//     });
//   };
  

//   // ... (rest of the component remains unchanged)

//   return (
//     <div style={{ marginTop: '150px' }}>
//       {prompt && (
//         <>
//           <h3 className="text-center headline"><strong>{prompt.title}</strong></h3>
//           <h4 className="text-center headline">{prompt.description}</h4>
//         </>
//       )}
//       <div style={{ marginLeft: '180px', marginRight: '180px', marginTop: '50px' }}>
//         <div style={{ display: 'flex', flexDirection: 'column' }}>
//           <div style={{ display: 'flex' }}>
//             <div style={{ flex: '50%', marginRight: '10px' }}>
//               <ReactQuill
//                 value={editorContent}
//                 onChange={setEditorContent}
//                 theme="snow"
//                 modules={ResponsePage.modules}
//                 style={{ height: '250px', minHeight: '280px', width: '100%' }}
//               />
//             </div>
//             <div className="form-container" style={{ flex: '50%', marginLeft: '20px' }}>
//               {prompt && (
//                 <Form onSubmit={handleSubmit} className="mt-4" style={{ maxWidth: '600px', marginRight: '100px' }}>
//                   {prompt.variables.map(variable => (
//                     <Form.Group key={variable.name}>
//                       <Form.Label style={{ marginTop: '5px' }}>{variable.name}:</Form.Label>
//                       <Form.Control
//                         type="text"
//                         onChange={(e) => handleVariableChange(variable.name, e.target.value)}
//                         required
//                       />
//                     </Form.Group>
//                   ))}
//                   <br />
//                   <div style={{ display: 'flex', gap: '10px' }}>
//                     <Button
//                       variant="primary"
//                       type="submit"
//                       className="w-50 btn-generate-response"
//                     >
//                       {loading ? <Spinner animation="border" size="sm" /> : 'Generate Response'}
//                     </Button>
//                     <Button
//                       variant="outline-secondary"
//                       className="w-50 btn-copy"
//                       onClick={() => copyToClipboard(editorContent)}
//                     >
//                       Copy Response
//                     </Button>
//                   </div>
//                 </Form>
//               )}
//               {error && <div style={{ color: 'red' }}>{error}</div>}
//             </div>
//           </div>
//           {totalTokens > 0 && (
//             <div style={{ marginTop: '20px', textAlign: 'center' }}>
//               <h5>Total Token Usage:</h5>
//               <p>Total Tokens: {totalTokens}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// ResponsePage.modules = {
//   toolbar: [
//     [{ header: '1' }, { header: '2' }, { font: [] }],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     ['bold', 'italic', 'underline'],
//     [{ color: [] }, { background: [] }],
//     [{ align: [] }],
//     ['link', 'image'],
//     ['clean'],
//   ],
// };

// export default ResponsePage;

















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import './ResponsePage.css';
// import { Form, Button, Spinner } from 'react-bootstrap';
// import { useTokenContext } from '../TokenContext'; // Import the context

// const ResponsePage = () => {
//   const { promptId } = useParams();
//   const [prompt, setPrompt] = useState(null);
//   const [variables, setVariables] = useState({});
//   const [responses, setResponses] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [editorContent, setEditorContent] = useState('');
//   const { addTokens } = useTokenContext(); // Access addTokens from context

//   useEffect(() => {
//     const fetchPrompt = async () => {
//       try {
//         const result = await axios.get(`http://localhost:5000/api/prompts/${promptId}`, {
//           withCredentials: true,
//         });
//         setPrompt(result.data);
//       } catch (error) {
//         console.error('Error fetching prompt:', error);
//         setError('Error fetching prompt');
//       }
//     };
//     fetchPrompt();
//   }, [promptId]);

//   const handleVariableChange = (name, value) => {
//     setVariables({ ...variables, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!prompt) return;

//     const variableArray = Object.keys(variables).map(variableName => ({
//       name: variableName,
//       value: variables[variableName],
//     }));

//     setResponses([]);
//     setLoading(true);
//     setError('');
//     setEditorContent('');

//     try {
//       const result = await axios.post(`http://localhost:5000/api/prompts/${promptId}/execute`, {
//         variables: variableArray,
//       }, {
//         withCredentials: true,
//       });

//       // Set the total tokens from the response and add to context
//       const totalTokens = result.data.response.totalTokens;
//       console.log("fdsvfdsdf",totalTokens);
//       addTokens(totalTokens); // Update the total tokens in context
//       console.log("fdsvfdsdf",totalTokens);
//       setResponses(prevResponses => [...prevResponses, result.data.response]);
//       setEditorContent(result.data.response.content);
//       console.log('Generated Response:', result);
//       setError('');
//     } catch (error) {
//       console.error('Error generating response:', error);
//       setError('Error generating response');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const stripHtmlTags = (html) => {
//     const doc = new DOMParser().parseFromString(html, 'text/html');
//     return doc.body.textContent || "";
//   };

//   const copyToClipboard = (htmlContent) => {
//     const plainText = stripHtmlTags(htmlContent);
//     navigator.clipboard.writeText(plainText).then(() => {
//       // alert('Response copied to clipboard!');
//     }).catch(err => {
//       console.error('Could not copy text: ', err);
//     });
//   };

//   return (
//     <div style={{ marginTop: '150px' }}>
//       {prompt && (
//         <>
//           <h3 className="text-center headline"><strong>{prompt.title}</strong></h3>
//           <h4 className="text-center headline">{prompt.description}</h4>
//         </>
//       )}
//       <div
//         style={{
//           marginLeft: '180px',
//           marginRight: '180px',
//           marginTop: '50px',
//         }}
//       >
//         <div style={{ display: 'flex', flexDirection: 'column' }}>
//           <div style={{ display: 'flex' }}>
//             <div style={{ flex: '50%', marginRight: '10px' }}>
//               <ReactQuill
//                 value={editorContent}
//                 onChange={setEditorContent}
//                 theme="snow"
//                 modules={ResponsePage.modules}
//                 style={{ height: '250px', minHeight: '280px', width: '100%' }}
//               />
//             </div>
//             <div className="form-container" style={{ flex: '50%', marginLeft: '20px' }}>
//               {prompt && (
//                 <Form onSubmit={handleSubmit} className="mt-4" style={{ maxWidth: '600px', marginRight:'100px' }}>
//                   {prompt.variables.map(variable => (
//                     <Form.Group key={variable.name}>
//                       <Form.Label style={{ marginTop: '5px' }}>{variable.name}:</Form.Label>
//                       <Form.Control
//                         type="text"
//                         onChange={(e) => handleVariableChange(variable.name, e.target.value)}
//                         required
//                       />
//                     </Form.Group>
//                   ))}
//                   <br />
//                   <div style={{ display: 'flex', gap: '10px' }}>
//                     <Button
//                       variant="primary"
//                       type="submit"
//                       className="w-50 btn-generate-response"
//                     >
//                       {loading ? <Spinner animation="border" size="sm" /> : 'Generate Response'}
//                     </Button>
//                     <Button
//                       variant="outline-secondary"
//                       className="w-50 btn-copy"
//                       onClick={() => copyToClipboard(editorContent)}
//                     >
//                       Copy Response
//                     </Button>
//                   </div>
//                 </Form>
//               )}
//               {error && <div style={{ color: 'red' }}>{error}</div>}
//             </div>
//           </div>
//           {/* Display total tokens information */}
//         </div>
//       </div>
//     </div>
//   );
// };

// ResponsePage.modules = {
//   toolbar: [
//     [{ header: '1' }, { header: '2' }, { font: [] }],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     ['bold', 'italic', 'underline'],
//     [{ color: [] }, { background: [] }],
//     [{ align: [] }],
//     ['link', 'image'],
//     ['clean'],
//   ],
// };

// export default ResponsePage;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import './ResponsePage.css';
// import { Form, Button, Spinner } from 'react-bootstrap';
// import { useTokenContext } from '../TokenContext'; // Import the context

// const ResponsePage = () => {
//   const { promptId } = useParams();
//   const [prompt, setPrompt] = useState(null);
//   const [variables, setVariables] = useState({});
//   const [responses, setResponses] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [editorContent, setEditorContent] = useState('');
//   const { addTokens } = useTokenContext(); // Access addTokens from context

//   useEffect(() => {
//     const fetchPrompt = async () => {
//       try {
//         const result = await axios.get(`http://localhost:5000/api/prompts/${promptId}`, {
//           withCredentials: true,
//         });
//         setPrompt(result.data);
//       } catch (error) {
//         console.error('Error fetching prompt:', error);
//         setError('Error fetching prompt');
//       }
//     };
//     fetchPrompt();
//   }, [promptId]);

//   const handleVariableChange = (name, value) => {
//     setVariables({ ...variables, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!prompt) return;

//     const variableArray = Object.keys(variables).map(variableName => ({
//       name: variableName,
//       value: variables[variableName],
//     }));

//     setResponses([]);
//     setLoading(true);
//     setError('');
//     setEditorContent('');

//     try {
//       const result = await axios.post(`http://localhost:5000/api/prompts/${promptId}/execute`, {
//         variables: variableArray,
//       }, {
//         withCredentials: true,
//       });

//       // Set the total tokens from the response and add to context
//       const totalTokens = result.data.response.totalTokens;
//       console.log('Total tokens received:', totalTokens); // Log the value received
//       addTokens(totalTokens); // Update the total tokens in context
//       setResponses(prevResponses => [...prevResponses, result.data.response]);
//       setEditorContent(result.data.response.content);
//     } catch (error) {
//       console.error('Error generating response:', error);
//       setError('Error generating response');
//     } finally {
//       setLoading(false);
//     }
//   };


//     const copyToClipboard = (htmlContent) => {
//     const plainText = stripHtmlTags(htmlContent);
//     navigator.clipboard.writeText(plainText).then(() => {
//       // alert('Response copied to clipboard!');
//     }).catch(err => {
//       console.error('Could not copy text: ', err);
//     });
//   };
//   const stripHtmlTags = (html) => {
//     const doc = new DOMParser().parseFromString(html, 'text/html');
//     return doc.body.textContent || "";
//   };

//   return (
//     <div style={{ marginTop: '150px' }}>
//      {prompt && (
//         <>
//           <h3 className="text-center headline"><strong>{prompt.title}</strong></h3>
//           <h4 className="text-center headline">{prompt.description}</h4>
//         </>
//       )}
//       <div
//         style={{
//           marginLeft: '180px',
//           marginRight: '180px',
//           marginTop: '50px',
//         }}
//       >
//         <div style={{ display: 'flex', flexDirection: 'column' }}>
//           <div style={{ display: 'flex' }}>
//             <div style={{ flex: '50%', marginRight: '10px' }}>
//               <ReactQuill
//                 value={editorContent}
//                 onChange={setEditorContent}
//                 theme="snow"
//                 modules={ResponsePage.modules}
//                 style={{ height: '250px', minHeight: '280px', width: '100%' }}
//               />
//             </div>
//             <div className="form-container" style={{ flex: '50%', marginLeft: '20px' }}>
//               {prompt && (
//                 <Form onSubmit={handleSubmit} className="mt-4" style={{ maxWidth: '600px', marginRight:'100px' }}>
//                   {prompt.variables.map(variable => (
//                     <Form.Group key={variable.name}>
//                       <Form.Label style={{ marginTop: '5px' }}>{variable.name}:</Form.Label>
//                       <Form.Control
//                         type="text"
//                         onChange={(e) => handleVariableChange(variable.name, e.target.value)}
//                         required
//                       />
//                     </Form.Group>
//                   ))}
//                   <br />
//                   <div style={{ display: 'flex', gap: '10px' }}>
//                     <Button
//                       variant="primary"
//                       type="submit"
//                       className="w-50 btn-generate-response"
//                     >
//                       {loading ? <Spinner animation="border" size="sm" /> : 'Generate Response'}
//                     </Button>
//                     <Button
//                       variant="outline-secondary"
//                       className="w-50 btn-copy"
//                       onClick={() => copyToClipboard(editorContent)}
//                     >
//                       Copy Response
//                     </Button>
//                   </div>
//                 </Form>
//               )}
//               {error && <div style={{ color: 'red' }}>{error}</div>}
//             </div>
//           </div>
//           {/* Display total tokens information */}
//         </div>
//       </div>
//     </div>
//   );
// };

// ResponsePage.modules = {
//   toolbar: [
//     [{ header: '1' }, { header: '2' }, { font: [] }],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     ['bold', 'italic', 'underline'],
//     [{ color: [] }, { background: [] }],
//     [{ align: [] }],
//     ['link', 'image'],
//     ['clean'],
//   ],
// };


// export default ResponsePage;
