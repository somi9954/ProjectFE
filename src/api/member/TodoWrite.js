import apiRequest from '../../lib/apiRequest';

export default function requestWrite(form) {
  return new Promise((resolve, reject) => {
    apiRequest('/todo/write/${tId}', 'POST', form)
      .then((res) => {
        if (!res.data.success) {
          reject(res.data);
        } else {
          resolve(true);
        }
      })
      .catch((err) => reject(err));
  });
}
