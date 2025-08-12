import React from 'react';
import useChatRooms from '../hooks/useChatRooms.tsx';
import { FlatList, StyleSheet } from 'react-native';
import ChatRoomContainer from './chatRoomContainer.tsx';
import useChatSocket from '../hooks/useChatSocket.tsx';

const ChatRoomList: React.FC = () => {
  // WatermelonDB의 chat_rooms를 구독하여 최신 데이터를 반환하는 커스텀 훅
  const data = useChatRooms();
  return (
    <FlatList
      style={styles.list}
      data={data} // 채팅방 목록 데이터
      keyExtractor={item => item.id} // 고유 키 (WatermelonDB 모델의 id 사용)
      renderItem={({ item }) => <ChatRoomContainer data={item} />} // 각 채팅방 렌더링
    />
  );
};

export default ChatRoomList;

const styles = StyleSheet.create({
  list: {
    flex: 1, // 화면 전체 채우기
  },
});
