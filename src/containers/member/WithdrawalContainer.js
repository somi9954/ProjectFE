import React, { useState, useCallback } from 'react';
import { produce } from 'immer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import requestWithdrawal from '../../api/member/Withdrawal';
import Withdrawal from '../../components/member/Withdrawal';

const WithdrawalContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // 필수 항목
      const requiredFields = {
        email: t('NotBlank_email'),
        password: t('NotBlank_password'),
        name: t('NotBlank_name'),
      };
      const _errors = {};
      let hasError = false; // 검증 실패 여부
      for (const field in requiredFields) {
        if (!form[field] || !form[field].trim()) {
          _errors[field] = _errors[field] || [];
          _errors[field].push(requiredFields[field]);

          hasError = true; //eslint-disable-line no-unused-vars
        }
      }

      if (hasError) {
        setErrors((errors) => _errors);

        return;
      }
      requestWithdrawal(form)
        .then(() => {
          // 사이트 설정 완료시
          setForm(() => {}); // 양식 초기화

          // 메인페이지로 이동
          navigate('/', { replace: true });
        })
        .catch((err) => setErrors(() => err.message));
    },
    [form, t, navigate],
  );

  const onChange = useCallback((e) => {
    const target = e.currentTarget;
    setForm(
      produce((draft) => {
        draft[target.name] = target.value;
      }),
    );
  }, []);

  return (
    <Withdrawal
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
    />
  );
};

export default React.memo(WithdrawalContainer);
