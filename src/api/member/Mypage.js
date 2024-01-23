import apiRequest from '../../lib/apiRequest';

export default function requestSave(form) {
  return new Promise((resolve, reject) => {
    apiRequest('/mypage/member/saveinfo', 'POST', form)
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
