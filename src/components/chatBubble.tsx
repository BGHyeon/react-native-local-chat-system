import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ProfileAvatar from './profileAvatar.tsx';
import { Chat } from '../models/chat.ts';

type ChatBubbleProps = {
  chat: Chat; // Chat 모델 전체를 prop으로 받음
  isMy: boolean; // 내가 보낸 메시지인지 여부
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ chat, isMy }) => {
  const bubbleBackground = isMy ? 'white' : 'black'; // 배경색
  const bubbleTextColor = isMy ? 'black' : 'white'; // 글자색

  return (
    <View
      style={[
        styles.container,
        { alignSelf: isMy ? 'flex-end' : 'flex-start' },
      ]}
    >
      {/* 내 메시지가 아니면 프로필 표시 */}
      {!isMy && <ProfileAvatar profile={chat.profile} size={32} />}

      <View>
        {/* 내 메시지가 아니면 닉네임 표시 */}
        {!isMy && <Text style={styles.nickName}>{chat.nickName}</Text>}

        {/* 채팅 버블 */}
        <View style={[styles.bubble, { backgroundColor: bubbleBackground }]}>
          <Text style={{ color: bubbleTextColor }}>{chat.message}</Text>
        </View>
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  translateContainer: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
    marginTop: 16,
    paddingTop: 16,
  },
  nickName: { fontSize: 20, fontWeight: 'bold' },
  container: {
    flexDirection: 'row',
    maxWidth: '80%',
    transform: [{ translateY: -1 }],
    gap: 8,
  },
});
