import React, { useState, useCallback } from 'react';
import { produce } from 'immer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SiteConfig from '../../components/admin/SiteConfig';
import requestConfig from '../../api/admin/config';

const SiteContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cssJsVersion: 1,
  });
  const [errors, setErrors] = useState({});

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // 필수 항목
      const requiredFields = {
        siteTitle: t('NotBlank_siteTitle'),
        siteDescription: t('NotBlank_siteDescription'),
        joinTerms: t('NotBlank_joinTerms'),
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
      requestConfig(form)
        .then(() => {
          // 사이트 설정 완료시
          setForm(() => {}); // 양식 초기화

          // 로그인 페이지 이동
          navigate('/admin', { replace: true });
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
    <SiteConfig
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
    />
  );
};

export default React.memo(SiteContainer);
