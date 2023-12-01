import styled, { css } from 'styled-components';
import colorNames from '../../styles/colors';
import sizeNames from '../../styles/sizes';

const { big, extraBig } = sizeNames;

export const MainTitle = styled.h1``;

export const SubTitle = styled.h2`
  font-size: ${big};
  margin: 0;
  padding: 0;
  text-align: ${({ $align }) => $align || 'left'};
  color: ${({ color }) => (color ? colorNames[color] : '#000')};
  ${({ borderWidth, color }) =>
    borderWidth &&
    css`
      padding-bottom: 10px;
      border-bottom: ${borderWidth}px solid ${color ? color : '#000'};
    `}

  margin-bottom: 20px;
`;
