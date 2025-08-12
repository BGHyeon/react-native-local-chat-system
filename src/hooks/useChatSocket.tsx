/**
 * 커스텀 React Hook: useChatSocket
 *
 * 주어진 서버 URL과 chatId를 기반으로 Socket.IO 클라이언트를 생성하여
 * 실시간 채팅 메시지 수신 및 처리 기능을 제공합니다.
 *
 * 주요 기능:
 * - 컴포넌트 마운트 시 지정된 URL과 chatId로 Socket.IO 연결을 생성
 * - 'message' 이벤트 수신 시, 수신한 데이터를 ChatInput 타입으로 파싱하여
 *   chatUtil을 통해 채팅방 및 메시지 DB에 저장 또는 업데이트
 * - 'delete' 이벤트 수신 시, 해당 chatId 메시지를 삭제 처리 (markChatAsDeleted)
 * - 소켓 연결 상태(connect, disconnect)를 콘솔에 디버그 출력
 * - 컴포넌트 언마운트 시, 해당 chatId의 unreadCount를 0으로 초기화하고 소켓 연결 해제
 *
 * @param url - Socket.IO 서버 기본 URL
 * @param chatId - 구독할 채팅방 또는 채팅 ID (네임스페이스 혹은 경로에 사용)
 * @returns 현재 연결된 Socket.IO 소켓 인스턴스 (useRef로 관리)
 *
 * 사용 예:
 * const socket = useChatSocket('https://example.com/socket', 'room123');
 */

import { io, Socket } from 'socket.io-client';
import { useEffect, useRef } from 'react';
import { ChatInput, chatUtil } from '../utils/chatUtil.ts';

const useChatSocket = (url: string, roomId: string) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // 서버 주소는 실제 서버 주소로 변경
    socketRef.current = io(`${url}/${roomId}`, {
      transports: ['websocket'],
      autoConnect: true,
    });

    socketRef.current.on('connect', () => {
      console.debug(`connect : ${roomId}`);
    });

    socketRef.current.on('message', data => {
      // 채팅방 메시지 추가
      const chat: ChatInput = JSON.parse(data);
      chatUtil.createOrUpdateChatRoomWithChat(chat);
    });
    socketRef.current.on('delete', (chatId: string | number) => {
      // 채팅방 메시지 삭제
      chatUtil.markChatAsDeleted(Number(chatId));
    });
    socketRef.current.on('disconnect', () => {
      console.debug(`disconnect : ${roomId}`);
    });

    return () => {
      // 컴포넌트 언마운트 시 readCnt 초기화
      chatUtil.resetUnreadCountByChatId(roomId);
      socketRef.current?.disconnect();
    };
  }, [roomId, url]);

  return socketRef.current;
};

export default useChatSocket;
