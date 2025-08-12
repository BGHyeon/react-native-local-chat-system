import React from 'react';
import ChatMessageList from '../components/chatMessageList.tsx';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
export const CHAT_ROOM_URL = 'ChatRoom';
type Props = NativeStackScreenProps<RootStackParamList, 'ChatRoom'>;
const ChatRoomScreen: React.FC<Props> = ({ route }) => {
  const { roomId } = route.params;
  return <ChatMessageList roomId={roomId} />;
};

export default ChatRoomScreen;
