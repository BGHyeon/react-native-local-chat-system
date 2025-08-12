/**
 * 커스텀 React Hook: useChatRooms
 *
 * WatermelonDB의 chat_rooms 컬렉션을 구독하여
 * last_message_at 기준 내림차순으로 정렬된 채팅방 목록을 실시간으로 반환합니다.
 *
 * 주요 기능:
 * - 컴포넌트가 마운트될 때 chat_rooms를 쿼리하고 observe()를 통해 변경사항을 구독
 * - 채팅방 데이터가 변경될 때마다 rooms 상태를 갱신하여 컴포넌트가 리렌더링
 * - 가장 마지막으로 채팅이 발생한 채팅방 데이터순서로 정렬
 * - 컴포넌트 언마운트 시 구독 해제하여 메모리 누수 방지
 *
 * 사용 예:
 * const rooms = useChatRooms();
 * rooms는 ChatRoom[] 타입이며, last_message_at 내림차순 정렬된 채팅방 리스트를 포함
 */

import { database } from '../database/database.ts';
import { useEffect, useState } from 'react';
import { Q } from '@nozbe/watermelondb'
import { ChatRoom } from '../models/chat.ts';

const useChatRooms = () => {
  const [rooms,setRooms] = useState<ChatRoom[]>([]);
  useEffect(()=>{
    let subscription:any|null;
    const init = async () => {
       subscription = database.collections
         .get<ChatRoom>('chat_rooms')
         .query(Q.sortBy('last_message_at', 'desc'))
         .observe()
         .subscribe(setRooms);
    }
    init();
    return ()=> {
      subscription?.unsubscribe();
    }
  },[]);
  return rooms;
}

export default useChatRooms;
