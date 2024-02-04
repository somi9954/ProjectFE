import styled from 'styled-components';

const OuterBox = styled.footer`
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;

const Footer = () => {
  return (
    <OuterBox>
      <span className="footer">ⓒ 2024 조소미. All Rights Reserved.</span>
    </OuterBox>
  );
};
export default Footer;
