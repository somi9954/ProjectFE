import E404 from '../../images/errors/404.jpg';
import styled from 'styled-components';

const ImgBox = styled.div`
  max-width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* 이미지를 확대 또는 축소하지 않고 적절하게 보여줍니다. */
  }
`;

const NotFound = () => {
  return (
    <ImgBox>
      <img src={E404} alt="error 404" />
    </ImgBox>
  );
};
export default NotFound;
