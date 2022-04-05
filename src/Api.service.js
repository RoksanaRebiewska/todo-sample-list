const config = {
  api: process.env.REACT_APP_API_KEY,
  options: {
    headers: { 'content-type': 'application/json' },
  },
};

const handleReponse = (response) => {
  if (response.status === 200) {
    return response.json();
  } else {
    throw Error(response.json() | 'error');
  }
};

const httpGet = async (endpoint) => {
  try {
    const response = await fetch(`${config.api}${endpoint}`, {
      ...config.options,
    });
    const data = await handleReponse(response);
    const todo = [];
    for (const key in data) {
      todo.push({
        task: data[key].task,
        done: data[key].done,
        id: key,
      });
    }
    return todo;
  } catch (error) {
    throw Error(error);
  }
};

const httpPost = async (endpoint, data) => {
  try {
    const response = await fetch(`${config.api}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config.options,
    });
    await handleReponse(response);
  } catch (error) {
    throw Error(error);
  }
};

const httpPatch = async (endpoint, update) => {
  try {
    const response = await fetch(`${config.api}${endpoint}`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      ...config.options,
    });
    await handleReponse(response);
  } catch (error) {
    throw Error(error);
  }
};

const httpDelete = async (endpoint) => {
  try {
    await fetch(`${config.api}${endpoint}`, {
      method: 'DELETE',
      ...config.options,
    });
  } catch (error) {
    throw Error(error);
  }
};

export default { httpGet, httpPost, httpPatch, httpDelete };
