
const requests = {
  search: {
    path: '/api/search',
    method: 'GET',
  },
}

async function request(path, body, params) {
  let data, error, message, status;
  let requestPath = requests[path] ? requests[path].path : path.path;
  let url = requestPath;
  const headers = {
    'Access-Control-Allow-Origin': '*',
  };

  if (params) {
    url = url + '?' + new URLSearchParams(params).toString();
  }

  const options = {
    headers,
    method: requests[path] ? requests[path].method : path.method,
  };

  if (body) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  try {
    console.log('url ', url, options);
    const response = await fetch(url, {
      ...options,
    });
    status = response.status;

    // NOTE: clear token
    if (status === 401) {
      getToken(true);
      storage.clear();
    }

    const repdata = await response.json();
    if (repdata.data || repdata.message || repdata.error) {
      data = repdata.data;
    } else {
      data = repdata;
    }
    if (repdata.message) {
      message = repdata.message;
    }
    if (repdata.error) {
      error = repdata.error;
    }

    if (repdata.data) {
      console.log('response-data--> ', repdata.data);
    }
  } catch (err) {
    if (path !== 'login' && err.status === 401) {
      getToken(true);
      storage.clear();
    }
    error = err.message;
  }

  return {data, error, message, status};
}

export default request