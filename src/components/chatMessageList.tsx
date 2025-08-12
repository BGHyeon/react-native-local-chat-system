import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import useChats from '../hooks/useChats.tsx';
import ChatBubble from './chatBubble.tsx';
import useChatSocket from '../hooks/useChatSocket.tsx';
import ChatInput from './chatInput.tsx';

type ChatMessageListProps = {
  roomId: string; // 현재 채팅방 ID
};

const ChatMessageList: React.FC<ChatMessageListProps> = props => {
  // 해당 roomId에 해당하는 채팅 메시지 목록 구독 및 관리하는 커스텀 훅
  const chats = useChats(props.roomId);
  // 해당 chat의 socket연결
  const socket = useChatSocket('https://example.com/socket', props.roomId);

  // 내 사용자 ID (실제로는 인증된 사용자 ID를 받아야 함)
  const myId = 0;

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        inverted={true}
        data={chats} // 채팅 메시지 배열
        keyExtractor={item => item.id} // 고유 키 설정 (WatermelonDB 모델 id 기준)
        renderItem={({ item }) => (
          // 각 메시지마다 내가 보낸 메시지인지 여부를 판단해 ChatBubble 렌더링
          <ChatBubble chat={item} isMy={myId === item.userId} />
        )}
        // 필요한 경우 inverted={true} 옵션 추가 가능 (채팅 리스트 역순 정렬)
      />
      <ChatInput onSend={text => socket?.emit('chat', text)} />
    </View>
  );
};

export default ChatMessageList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1, // 화면 전체 영역 차지
  },
});
