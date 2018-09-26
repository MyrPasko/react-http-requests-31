import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use((request) => {
    console.log('Request from the interceptor: ', request);
    // Edit the request
    return request;
}, (error) => {
    console.log('Error from the interceptor: ', error);
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    console.log('Response from the interceptors: ', response);
    return response;
}, (error) => {
    console.log('Error from the interceptors: ', error);
    return Promise.reject(error);

});

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
