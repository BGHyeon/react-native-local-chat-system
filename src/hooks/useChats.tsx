/**
 * 커스텀 React Hook: useChats
 *
 * 주어진 roomId에 해당하는 채팅 메시지 목록을 WatermelonDB에서 실시간으로 구독하여 반환합니다.
 *
 * 주요 기능:
 * - 컴포넌트가 마운트되거나 roomId가 변경될 때 해당 roomId에 속한 'chats' 컬렉션 데이터를 쿼리하고 observe()를 통해 변경사항 구독
 * - 쿼리 결과가 변경될 때마다 chats 상태를 갱신하여 UI가 자동으로 최신 상태로 렌더링됨
 * - 컴포넌트가 언마운트되거나 roomId가 변경될 때 이전 구독을 해제하여 메모리 누수 방지
 *
 * @param roomId - 조회할 채팅방의 고유 식별자
 * @returns roomId에 속한 채팅 메시지 배열
 */

import { database } from '../database/database.ts';
import { useEffect, useState } from 'react';
import { Q } from '@nozbe/watermelondb'
import { Chat } from '../models/chat.ts';

const useChats = (roomId:string) => {
  const [chats,setChats] = useState<Chat[]>([]);
  useEffect(()=>{
    let subscription:any|null;
    const init = async () => {
      subscription = database.collections
        .get<Chat>('chats')
        .query(Q.where('room_id',roomId))
        .observe()
        .subscribe(setChats);
    }
    init();
    return ()=> {
      subscription?.unsubscribe();
    }
  },[roomId]);
  return chats;
}

export default useChats;
