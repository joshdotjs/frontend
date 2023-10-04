import { getLS } from './local-storage';

// ==============================================

const http = async ({ url, method='GET', body={} }) => {

  // let debug_str = `%cmaking REQUEST to ${url} \n- METHOD:  ${method} \n- BODY: ${JSON.stringify(body, null, 2)}`;
  // console.log(debug_str, 'color: orange');

  let resp;

  const token = getLS('token');

  if (token) { // auth protected endpoint
    console.log('http.js - if(token)');
    if (method === 'GET') {
      resp = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
      });
    }
    else {
      resp = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify( body ),
      });
    }
  } else { // public endpoint
    if (method === 'GET') {
      resp = await fetch(url);
    }
    else {
      resp = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( body ),
      });
    }
  }

  // this can be done much more cleanly
  // this can be done much more cleanly
  // this can be done much more cleanly
  // this can be done much more cleanly
  // this can be done much more cleanly
  // this can be done much more cleanly
  // this can be done much more cleanly
  // -simply always apply content-type: application/json, and authorization: token
  // -then, if we want to send a post request we apend onto the object a body property.
  // -then, outside the if-else block, we simply do the fetch request with the method, headers, and body
  // -this assumes we can send Authorization: null, and it will be ignored by the server

  // TODO: PROPER ERROR HANDLING!!!
  if (!resp.ok) throw new Error('Error thrown in http.js');

  const data = await resp.json();

  // debug_str = `%cresponse -- DATA: ${JSON.stringify(data, null, 2)} \n CODE: ${resp.status}`;
  // console.log(debug_str, 'color: #bada55');

  return data;
};

// ==============================================

export { http };