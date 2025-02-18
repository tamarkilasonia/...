import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App'; 
import reportWebVitals from './reportWebVitals'; // Optional, for performance monitoring

// The root element in the HTML file where React will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the DOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Measure performance (you can remove if not needed)
reportWebVitals();
