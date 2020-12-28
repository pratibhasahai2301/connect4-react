import axios from 'axios';
import { environment } from '../environment';

function handleErrors( err, action, next ) {
  next( {
    type: `${ action.meta.onError }`,
    payload: err,
    meta: action.meta,
  } );

  return Promise.reject( err );
}

function handleResponse( res, action, next ) {
  next( {
    type: `${ action.meta.onSuccess }`,
    payload: res.data,
    meta: action.meta,
  } );

  return res;
}

function getHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  };
}

const apiService = () => ( next ) => ( action ) => {
  const result = next( action );
  if ( !action.meta || !action.meta.async ) {
    return result;
  }

  const { method = "GET" } = action.meta;

  const options = {
    url: `${environment.api}`,
    method,
    headers: getHeaders(),
  };

  return axios(options)
    .then(
      res => handleResponse( res, action, next ),
      err => handleErrors( err, action, next ),
    );
};

export default apiService;