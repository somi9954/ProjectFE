import apiRequest from '../../lib/apiRequest';
import { getUserInfo, deleteUserData } from './Login';

export default function requestWithdrawal(form) {
  return new Promise((resolve, reject) => {
    // 단계 1: 회원 탈퇴 API 요청
    apiRequest('/mypage/member/withdrawal', 'POST', form)
      .then(() => {
        // 단계 2: 성공적인 회원 탈퇴 후 사용자 정보 검색
        getUserInfo()
          .then((userInfo) => {
            if (!userInfo.data.success) {
              reject(userInfo.data);
            } else {
              // 단계 3: 사용자 데이터 삭제
              deleteUserData()
                .then(() => {
                  resolve(true);
                })
                .catch((deleteError) => reject(deleteError));
            }
          })
          .catch((infoError) => reject(infoError));
      })
      .catch((withdrawalError) => reject(withdrawalError));
  });
}
