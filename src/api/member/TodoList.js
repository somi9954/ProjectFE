import apiRequest from '../../lib/apiRequest';

export default function responseList(form) {
  return new Promise((resolve, reject) => {
    apiRequest('/todo/list', 'GET', form)
      .then((res) => {
        if (!res.data.success) {
          reject(res.data);
          console.log(reject);
        } else {
          resolve(true);
        }
      })
      .catch((err) => reject(err));
  });
}
