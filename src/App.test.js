import { render, screen } from '@testing-library/react';
import App from './App';
import requestDelete from './api/member/todoDelete';
import apiRequest from './lib/apiRequest';

/*test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/

// 모의 모듈 설정
jest.mock('./lib/apiRequest');

describe('requestDelete 함수 테스트', () => {
  afterEach(() => {
    jest.clearAllMocks(); // 각 테스트 케이스 실행 후 모의 모듈의 호출 기록 초기화
  });

  test('올바른 식별자를 사용하여 삭제 요청이 제대로 보내지는지 확인', async () => {
    // 모의 API 응답 설정
    apiRequest.mockResolvedValueOnce({ data: { success: true } });

    // 테스트할 식별자
    const seq = 123;

    // requestDelete 함수 호출 및 결과 확인
    await expect(requestDelete(seq)).resolves.toBe(true);

    // apiRequest 함수가 제대로 호출되었는지 확인
    expect(apiRequest).toHaveBeenCalledWith(`/todo/delete/${seq}`, 'DELETE');
  });

  test('서버에서 실패 응답을 받았을 때 reject 되는지 확인', async () => {
    // 모의 API 응답 설정
    apiRequest.mockResolvedValueOnce({
      data: { success: false, message: '서버 오류' },
    });

    // 테스트할 식별자
    const seq = 123;

    // requestDelete 함수 호출 및 결과 확인
    await expect(requestDelete(seq)).rejects.toEqual({
      success: false,
      message: '서버 오류',
    });

    // apiRequest 함수가 제대로 호출되었는지 확인
    expect(apiRequest).toHaveBeenCalledWith(`/todo/delete/${seq}`, 'DELETE');
  });

  test('요청이 실패할 경우 reject 되는지 확인', async () => {
    // 모의 API 요청 실패 설정
    apiRequest.mockRejectedValueOnce(new Error('네트워크 오류'));

    // 테스트할 식별자
    const seq = 123;

    // requestDelete 함수 호출 및 결과 확인
    await expect(requestDelete(seq)).rejects.toThrow('네트워크 오류');

    // apiRequest 함수가 제대로 호출되었는지 확인
    expect(apiRequest).toHaveBeenCalledWith(`/todo/delete/${seq}`, 'DELETE');
  });
});
