import axios from 'axios';

const baseURL = `https://api.raisely.com/v3/`;

const sendRequest = async (method, endpoint, data) => {
      const result = await axios({
        method,
        baseURL,
        endpoint,
        data,
      });
      return result;
};

export {
    sendRequest
}