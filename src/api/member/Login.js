import apiRequest from '../../lib/apiRequest';

export const requestLogin = (form) =>
  new Promise((resolve, reject) => {
    apiRequest('/member/token', 'POST', form)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });
