import { useTranslation } from 'react-i18next';
import { InputText } from '../commons/InputStyle';
import { ButtonGroup, BigButton } from '../commons/ButtonStyle';
import sizeNames from '../../styles/sizes';
import styled from 'styled-components';
import loadable from '@loadable/component';
import { OuterBox } from '../commons/OutlineStyle';
import React, { useContext } from 'react';
import UserContext from '../../modules/user';

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

const SaveInfo = ({ onSubmit, onChange, onToggle, form, errors }) => {
  const { t } = useTranslation();
  const { state } = useContext(UserContext);
  return (
    <FormBox onSubmit={onSubmit}>
      <dl>
        <dt>{t('이메일')}</dt>
        <dd>
          <InputText
            type="text"
            name="email"
            defaultValue={state.userInfo.email || ''}
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
        <dt>{t('비밀번호확인')}</dt>
        <dd>
          <InputText
            type="password"
            name="confirmPassword"
            value={form.confirmPassword || ''}
            onChange={onChange}
          />
          <ErrorMessages errors={errors} field="confirmPassword" />
        </dd>
      </dl>
      <dl>
        <dt>{t('회원명')}</dt>
        <dd>
          <InputText
            type="text"
            name="name"
            defaultValue={state.userInfo.name || ''}
            onChange={onChange}
          />
          <ErrorMessages errors={errors} field="name" />
        </dd>
      </dl>
      <dl>
        <dt>{t('휴대전화번호')}</dt>
        <dd>
          <InputText
            type="text"
            name="mobile"
            defaultValue={state.userInfo.mobile || ''}
            onChange={onChange}
          />
          <ErrorMessages errors={errors} field="mobile" />
        </dd>
      </dl>
      <ButtonGroup>
        <BigButton
          type="submit"
          color="info"
          bcolor="info"
          height="50px"
          size="medium"
        >
          {t('수정하기')}
        </BigButton>
        <BigButton
          type="reset"
          color="white"
          bcolor="info"
          height="50px"
          size="medium"
          fcolor="info"
        >
          {t('다시입력')}
        </BigButton>
      </ButtonGroup>
    </FormBox>
  );
};

export default React.memo(SaveInfo);
