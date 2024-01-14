/**
 * 월별 달력 일 수
 * @param {*} year
 * @param {*} month
 */
export const getData = (year, month) => {
  // 년,월 데이터가 없는 경우 오늘 기준에서 년도와 날짜 추출
  if (!year || !month) {
    const today = new Date();
    year = today.getFullYear();
    month = today.getMonth() + 1;
  }

  month = parseInt(month);
  const eDate = new Date(year, month - 1, 1);
  const yoil = eDate.getDay();
  eDate.setMonth(eDate.getMonth() + 1);
  eDate.setDate(eDate.getDate() - 1);
  const lastDay = eDate.getDate();

  const totalDay = lastDay + yoil > 35 ? 42 : 35;

  const dates = [];
  for (let i = -yoil; i < totalDay - yoil; i++) {
    const date = new Date(year, month - 1, 1);
    date.setDate(date.getDate() + i);
    dates.push({
      dateStr: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0',
      )}-${String(date.getDate()).padStart(2, '0')}`,
      day: date.getDate(),
    });
  }

  return dates;
};