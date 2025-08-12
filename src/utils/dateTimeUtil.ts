const dateTimeUtil = {
  formatTimeAgo(input: string | Date): string {
    const date = typeof input === 'string' ? new Date(input) : input;
    const now = new Date();

    // 밀리초 차이
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) return "방금 전"; // 미래 시간이면 방금 전으로 처리

    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffMonth = Math.floor(diffDay / 30);

    if (diffMin < 1) {
      return "방금 전";
    } else if (diffHour < 1) {
      return `${diffMin}분 전`;
    } else if (diffDay < 1) {
      return `${diffHour}시간 전`;
    } else if (diffMonth < 1) {
      return `${diffDay}일 전`;
    } else {
      return `${diffMonth}달 전`;
    }
  },
  formatToHHmm(input: string | Date): string {
    const date = typeof input === 'string' ? new Date(input) : input;

    // 시, 분 추출
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }
}

export default dateTimeUtil;
