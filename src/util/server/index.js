import axios from 'axios';
import URL from './_const.config';

export default axios.create({
  method: 'POST',
  baseURL: URL,
});
