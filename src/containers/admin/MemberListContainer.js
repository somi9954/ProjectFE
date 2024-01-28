import React, { useCallback, useContext, useEffect, useState } from 'react';
import UserContext from '../../modules/user';
import { getMemberList } from '../../api/member/Login';
import { useTranslation } from 'react-i18next';
import MemberList from '../../components/admin/MemberList';
import { produce } from 'immer';

const MemberListContainer = () => {
  const { t } = useTranslation();
  const { state, action } = useContext(UserContext);
  const { updateUserInfo } = action;
  const [errors, setErrors] = useState(null);
  const [memberdata, setMemberData] = useState();
  const [form, setForm] = useState({
    userSearch: '', // 필요한 필드와 함께 초기화
  });

  useEffect(() => {
    fetchMemberList();
  }, []);

  const fetchMemberList = useCallback(() => {
    getMemberList()
      .then((userData) => {
        updateUserInfo(userData);
        const userDataArray = Array.isArray(userData) ? userData : [userData];
        setMemberData(userDataArray);
        console.log('userData:', userData);
      })
      .catch((error) => {
        console.error('멤버 리스트를 불러오는 중 오류 발생:', error);
      });
  }, [updateUserInfo]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const requiredFields = {
        BoardSearch: t('NotBlank_userSearch'),
      };
      const _errors = {};
      let hasError = false;

      for (const field in requiredFields) {
        if (!form[field] || !form[field].trim()) {
          _errors[field] = _errors[field] || [];
          _errors[field].push(requiredFields[field]);
          hasError = true;
        }
      }

      if (hasError) {
        setErrors(_errors);
        return;
      }
    },
    [form, t],
  );

  const onToggle = useCallback(
    (option) => (e) => {
      setForm(
        produce((draft) => {
          if (option === 'use') {
            draft.use = !draft.use; //기본값 false로 되어있으므로 반대값을 넣어주면 true가 된다.
          } else if (option === 'unused') {
            draft.unused = !draft.unused; //기본값 false로 되어있으므로 반대값을 넣어주면 true가 된다.
          } else if (option === 'checkdata') {
            draft.checkdata = !draft.checkdata;
          }
        }),
      );
    },
    [],
  );

  return (
    <MemberList
      onSubmit={onSubmit}
      form={form}
      errors={errors}
      onToggle={onToggle}
      userData={memberdata}
    />
  );
};

export default React.memo(MemberListContainer);
