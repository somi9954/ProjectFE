import React from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import sizeNames from '../../styles/sizes';
import { OuterBox } from '../commons/OutlineStyle';

const { small, big, medium } = sizeNames;

const NaviBox = styled.div`
  text-align: center;
  padding: 50px;
  font-size: ${big};
  font-weight: bold;
  svg {
    vertical-align: middle;
    cursor: pointer;
  }
  span {
    padding: 0 10px;
  }
`;

const YoilBox = styled.ul`
  display: flex;
  li {
    width: 0;
    flex-grow: 1;
    text-align: center;
    padding: 5px 0;
    background-color: #f5a4a8;
    border-radius: 15px;
    margin: 5px;
    font-size: ${medium};
    font-weight: bold;
  }
  li:first-of-type {
    color: red;
  }
  li:last-of-type {
    color: blue;
  }
`;
const DateBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  li {
    width: calc(100% / 7);
    text-align: center;
    padding: 45px 0;
    border: 1px solid #d5d5d5;
    font-size: ${medium};
    cursor: pointer;
    border-radius: 20px;
  }

  li:nth-of-type(7n + 1) {
    border-left: 0;
  }
`;

const Calendar = ({ year, month, dates, onDateClick, onChangeYearMonth }) => {
  const { t } = useTranslation();
  return (
    <OuterBox>
      <NaviBox>
        <MdArrowBackIos onClick={() => onChangeYearMonth(-1)} />
        <span>
          {year}
          {t('년')} {String(month + 1).padStart(2, '0')}
          {t('월')}
        </span>
        <MdArrowForwardIos onClick={() => onChangeYearMonth(1)} />
      </NaviBox>
      <YoilBox>
        <li>{t('일')}</li>
        <li>{t('월')}</li>
        <li>{t('화')}</li>
        <li>{t('수')}</li>
        <li>{t('목')}</li>
        <li>{t('금')}</li>
        <li>{t('토')}</li>
      </YoilBox>
      <DateBox>
        {dates &&
          dates.map((date) => (
            <li key={date.dateStr} onClick={() => onDateClick(date.dateStr)}>
              {date.day}
            </li>
          ))}
      </DateBox>
    </OuterBox>
  );
};

export default React.memo(Calendar);
