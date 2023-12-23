import React, { useState, useCallback } from 'react';
import { produce } from 'immer';
import { useTranslation } from 'react-i18next';
import JoinForm from '../../components/member/JoinForm';

const JoinContainer = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    agree: false,
  });
  const [errors, setErrors] = useState({});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      /**
       * 필수 항목
       */
      const requiredFields = {
        email: t('NotBlank_email'),
        password: t('NotBlank_password'),
        confirmPassword: t('NotBlank_confirmPassword'),
        name: t('NotBlank_name'),
      };
      const _errors = {};
      let hasError = false; // 검증 실패 여부
      for (const field in requiredFields) {
        if (!form[field] || !form[field].trim()) {
          _errors[field] = _errors[field] || [];

          _errors[field].push(requiredFields[field]);

          hasError = true;
        }
      }

      /* 약관 동의 체크 */
      if (!form.agree) {
        _errors.agree = _errors.agree || [];
        _errors.agree.push(t('AssertTrue_join_agree'));
        hasError = true;
      }
      if (hasError) {
        setErrors((errors) => _errors);

        return;
      }

      // 회원 가입 처리
    },
    [form],
  );

  const onChange = useCallback((e) => {
    const target = e.currentTarget;
    setForm(
      produce((draft) => {
        draft[target.name] = target.value;
      }),
    );
  }, []);

  const onToggle = useCallback((e) => {
    setForm(
      produce((draft) => {
        draft.agree = !draft.agree; //기본값 false로 되어있으므로 반대값을 넣어주면 true가 된다.
      }),
    );
  }, []);

  return (
    <JoinForm
      onSubmit={onSubmit}
      onChange={onChange}
      onToggle={onToggle}
      form={form}
      errors={errors}
    />
  );
};

export default React.memo(JoinContainer);
