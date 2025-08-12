import React from 'react';
import { ChatRoom } from '../models/chat.ts';
import { Image, Text, View, StyleSheet } from 'react-native';
import dateTimeUtil from '../utils/dateTimeUtil.ts';
import ProfileAvatar from './profileAvatar.tsx';

type ChatContainerProps = {
  data: ChatRoom; // 채팅방 데이터
};

const ChatRoomContainer: React.FC<ChatContainerProps> = props => {
  return (
    <View style={styles.container}>
      {/* 채팅방 프로필 이미지 */}
      <ProfileAvatar profile={props.data.roomProfile} />
      {/* 채팅방 이름 + 마지막 메시지 */}
      <View style={styles.textWrapper}>
        <Text style={styles.roomName}>{props.data.roomName}</Text>
        <Text style={styles.lastMessage} numberOfLines={2}>
          {props.data.messages.pop()?.message}
        </Text>
      </View>

      {/* 마지막 메시지 보낸 시간 */}
      {!!props.data.lastMessageAt && (
        <View style={styles.timeWrapper}>
          <Text style={styles.timeText}>
            {dateTimeUtil.formatTimeAgo(props.data.lastMessageAt)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ChatRoomContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomColor: '#666',
    borderBottomWidth: 1,
  },
  imageWrapper: {
    justifyContent: 'center',
  },
  imageContainer: {
    width: 92,
    height: 92,
    borderRadius: 46,
    overflow: 'hidden',
  },
  profileImage: {
    width: 92,
    height: 92,
  },
  textWrapper: {
    flex: 1,
    padding: 16,
    gap: 8, // RN 0.71 이상에서만 gap 지원
  },
  roomName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 16,
  },
  timeWrapper: {
    justifyContent: 'flex-start',
    paddingTop: 8,
    paddingRight: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#666', // 회색 톤
  },
});
