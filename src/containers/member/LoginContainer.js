import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { produce } from 'immer';
import LoginForm from '../../components/member/LoginForm';

const LoginContainer = () => {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({});

  const { t } = useTranslation();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      let hasError = false;
      const _errors = {};
      setErrors(() => _errors);

      /*필수 항목 검증 S*/
      const requiredFields = {
        email: t('NotBlank_email'),
        password: t('NotBlank_password'),
      };

      for (const field in requiredFields) {
        if (!form[field] || !form[field].trim()) {
          _errors[field] = requiredFields[field];
          hasError = true;
        }
      }
      /*필수 항목 검증 E*/

      if (hasError) {
        setErrors(() => _errors);
        return;
      }

      // 로그인 처리
    },
    [form, t],
  );

  const onChange = useCallback((e) => {
    setForm(
      produce((draft) => {
        // e.currentTarget이 null이 아닌지, e.currentTarget.name이 null이 아닌지 확인
        // 선택적 체이닝(?.)을 사용하여 단축 평가로 조건 확인
        e.currentTarget?.name &&
          (draft[e.currentTarget.name] = e.currentTarget.value);
      }),
    );
  }, []);

  return (
    <>
      <LoginForm onChange={onChange} onSubmit={onSubmit} errors={errors} />
    </>
  );
};

export default React.memo(LoginContainer);
