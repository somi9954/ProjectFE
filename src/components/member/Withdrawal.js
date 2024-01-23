import { useTranslation } from 'react-i18next';
import { InputText } from '../commons/InputStyle';
import { BigButton } from '../commons/ButtonStyle';
import sizeNames from '../../styles/sizes';
import styled from 'styled-components';
import loadable from '@loadable/component';
import React from 'react';

const ErrorMessages = loadable(() => import('../commons/ErrorMessages'));

const { small, medium, big } = sizeNames;

const FormBox = styled.form`
  dl {
    display: flex;
    padding: 10px 15px;
    align-items: center;

    dt {
      width: 130px;
      font-size: ${medium};
      font-weight: bold;
    }

    dd {
      flex-grow: 1;
    }
  }

  dl + dl {
    border-top: 1px solid #d5d5d5;
  }

  dl:last-of-type {
    margin-bottom: 15px;
  }
`;

const Withdrawal = ({ onSubmit, onChange, form, errors }) => {
  const { t } = useTranslation();
  return (
    <FormBox onSubmit={onSubmit}>
      <dl>
        <dt>{t('이메일')}</dt>
        <dd>
          <InputText
            type="text"
            name="email"
            value={form.email || ''}
            onChange={onChange}
          />
          <ErrorMessages errors={errors} field="email" />
        </dd>
      </dl>
      <dl>
        <dt>{t('비밀번호')}</dt>
        <dd>
          <InputText
            type="password"
            name="password"
            value={form.password || ''}
            onChange={onChange}
          />
          <ErrorMessages errors={errors} field="password" />
        </dd>
      </dl>
      <dl>
        <dt>{t('회원명')}</dt>
        <dd>
          <InputText
            type="text"
            name="name"
            value={form.name || ''}
            onChange={onChange}
          />
          <ErrorMessages errors={errors} field="name" />
        </dd>
      </dl>
      <BigButton
        type="submit"
        color="info"
        bcolor="info"
        height="50px"
        size="medium"
      >
        {t('탈퇴하기')}
      </BigButton>
    </FormBox>
  );
};

export default React.memo(Withdrawal);
