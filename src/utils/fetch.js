/**
 * Created by nishavaity on 10/4/17.
 */
import fetch from 'isomorphic-fetch';

const opts = {
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
};

// export const fetchGetApi = (url) => {
//     return fetch(url).then(response => response.json());
// }

export const fetchGet = (url) => {
     return fetch(url, opts).then(response => response.json());
};

 export const fetchPost = (url, data) => {
     const optsU = Object.assign({}, opts, {
         method: 'POST',
         body: JSON.stringify(data)
     });
     return fetch(url, optsU).then(response => response.json());
 };
//
 export const fetchPut = (url, data) => {
     const optsU = Object.assign({}, opts, {
         method: 'PUT',
         body: JSON.stringify(data)
     });
     return fetch(url, optsU).then(response => response.json());
 };

 export const fetchDelete = (url) => {
     const optsU = Object.assign({}, opts, {
         method: 'DELETE',
     });
     return fetch(url, optsU).then(response => response.json());
 };