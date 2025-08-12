import React from 'react';
import { View } from 'react-native';
import ChatRoomList from '../components/chatRoomList.tsx';

export const CHAT_LIST_URL = 'ChatList';

const ChatListScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <ChatRoomList />
    </View>
  );
};

export default ChatListScreen;
