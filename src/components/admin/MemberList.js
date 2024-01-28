import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import loadable from '@loadable/component';
import { BigButton } from '../commons/ButtonStyle';
import sizeNames from '../../styles/sizes';
import { InputText } from '../commons/InputStyle';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';
import { MainTitle } from '../commons/TitleStyle';
import { getMemberList } from '../../api/member/Login';

const ErrorMessages = loadable(() => import('../commons/ErrorMessages'));

const { extraBig } = sizeNames;

const ListBox = styled.dl`
  h1 {
    padding: 20px 0;
    font-size: ${extraBig};
    border-bottom: 2px solid #000;
  }

  select {
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    min-width: 150px;
    height: 35px;
  }

  .table-cols {
    display: flex;
    border-bottom: 1px solid #d5d5d5;
  }
  .table-cols dt {
    background: #f8f8f8;
    width: 160px;
    padding: 18px 20px;
    text-align: center;
    font-weight: bold;
  }

  .table-cols dd {
    background: #fff;
    padding: 10px 15px;
  }
  dd.active_true {
    margin: 10px;
  }

  .sopt-cols {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .sopt-cols > * {
    margin-right: 5px;
  }
  .bigbutton {
    justify-content: center;
    align-items: center;
    display: flex;
    margin: 20px auto;
    width: 120px;
  }
  svg {
    width: 20px;
  }
  .table-rows {
    width: 100%;
    border-spacing: 0;
    padding: 0;
  }
  .table-rows th {
    background: #7a7c89;
    color: #fff;
    border-top: 1px solid #d5d5d5;
    padding: 12px 10px;
  }
  .table-rows td {
    padding: 15px 10px;
  }
  .table-rows th,
  .table-rows td {
    border-bottom: 1px solid #d5d5d5;
    border-right: 1px solid #d5d5d5;
    text-align: center;
  }
  .table-rows th:first-of-type,
  .table-rows td:first-of-type {
    border-left: 1px solid #d5d5d5;
  }

  .button {
    width: 60px;
      font-size: 13px;
`;

const MemberList = ({ onSubmit, form, errors, onToggle, userData }) => {
  const { t } = useTranslation();

  return (
    <ListBox onSubmit={onSubmit}>
      <dl className="table-cols">
        <dt>{t('키워드 검색')}</dt>
        <dd className="sopt-cols">
          <select className="sopt">
            <option value="ALL">통합검색</option>
            <option value="email">회원 이메일</option>
            <option value="name">회원명</option>
          </select>
          <InputText type="text" />
          <ErrorMessages errors={errors} field="BoardSearch" />
        </dd>
      </dl>
      <dl className="table-cols">
        <dt>{t('사용 여부')}</dt>
        <dd className="active_true" onClick={onToggle('use')}>
          {form.use ? <GrCheckboxSelected /> : <GrCheckbox />}
          {t('사용')}
        </dd>

        <dd className="active_true" onClick={onToggle('unused')}>
          {form.unused ? <GrCheckboxSelected /> : <GrCheckbox />}
          {t('미사용')}
        </dd>
      </dl>
      <BigButton
        type="submit"
        color="info"
        bcolor="info"
        height="50px"
        size="medium"
        className="bigbutton"
      >
        {t('조회하기')}
      </BigButton>
      <div className="memberlist">
        <MainTitle>회원 목록</MainTitle>
        <table className="table-rows">
          <thead>
            <tr>
              <th className="active_true" onClick={onToggle('checkdata')}>
                {form.checkdata ? <GrCheckboxSelected /> : <GrCheckbox />}
              </th>
              <th>아이디(이메일)</th>
              <th>사용자 이름</th>
              <th>유형</th>
              <th>휴대전화번호</th>
              <th>가입날짜</th>
              <th>설정 </th>
            </tr>
          </thead>
          <tbody>
            {userData &&
              userData.map((userData) => (
                <tr key={userData.email}>
                  <td className="active_true" onClick={onToggle('checkdata')}>
                    {form.checkdata ? <GrCheckboxSelected /> : <GrCheckbox />}
                  </td>
                  <td>{userData.email}</td>
                  <td>{userData.name || ''}</td>
                  <td>{userData.type || ''}</td>
                  <td>{userData.mobile}</td>
                  <td>{userData.createdAt}</td>
                  <td>
                    <BigButton type="button" className="button">
                      {t('수정하기')}
                    </BigButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </ListBox>
  );
};

export default React.memo(MemberList);
