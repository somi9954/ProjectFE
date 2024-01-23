import React, { useState, useCallback } from 'react';
import { produce } from 'immer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import requestSave from '../../api/member/Mypage';
import SaveInfo from '../../components/member/SaveInfo';

const SiteContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // 필수 항목
      const requiredFields = {
        password: t('NotBlank_password'),
        confirmPassword: t('NotBlank_confirmPassword'),
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
      requestSave(form)
        .then(() => {
          // 사이트 설정 완료시
          setForm(() => {}); // 양식 초기화

          // 마이 페이지 이동
          navigate('/mypage', { replace: true });
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
    <SaveInfo
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
    />
  );
};

export default React.memo(SiteContainer);
