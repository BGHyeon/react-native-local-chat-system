import { database } from '../database/database.ts';
import { Chat, ChatRoom } from '../models/chat.ts';
import { Q } from '@nozbe/watermelondb';

export type ChatInput = {
  chatId: number;
  profile: string;
  nickName: string;
  type: number;
  userId: number;
  messageAt: string; // timestamp
  roomId: string;
  message: string;
};
export type RoomProfile = {
  roomId: string;
  profile: string;
  nickName: string;
};
export const chatUtil = {
  /**
   * 1. chat 데이터를 이용해 chatRoom 생성 또는 수정
   *    - roomId로 chatRoom 조회, 없으면 생성
   *    - chatRoom.messages에 chat 추가
   *    - lastMessageAt 갱신
   */
  async createOrUpdateChatRoomWithChat(chatData: ChatInput) {
    return await database.write(async () => {
      const chatRoomCollection =
        database.collections.get<ChatRoom>('chat_rooms');
      const chatCollection = database.collections.get<Chat>('chats');

      // 1) chatRoom 찾기
      let chatRoom = await chatRoomCollection
        .query(Q.where('room_id', chatData.roomId))
        .fetch();
      let room: ChatRoom;

      if (chatRoom.length === 0) {
        // 2) 없으면 새로 생성
        room = await chatRoomCollection.create(r => {
          r.roomId = chatData.roomId;
          r.unReadCnt = 0; // 초기값
          r.roomName = chatData.nickName; // 예: 닉네임으로 초기화 (필요하면 변경)
          r.roomProfile = chatData.profile;
          r.lastMessageAt = chatData.messageAt;
        });
      } else {
        room = chatRoom[0];
        // 3) 있으면 lastMessageAt 갱신
        if (!room.lastMessageAt || chatData.messageAt > room.lastMessageAt) {
          room.lastMessageAt = chatData.messageAt;
        }
      }

      // 4) unReadCnt 추가
      room.unReadCnt = room.unReadCnt + 1;

      // 4) chat 생성해서 messages에 추가
      await chatCollection.create(c => {
        (c._raw as any).room_id = room.id;
        c.chatId = chatData.chatId;
        c.profile = chatData.profile;
        c.nickName = chatData.nickName;
        c.type = chatData.type;
        c.userId = chatData.userId;
        c.messageAt = chatData.messageAt;
        c.message = chatData.message;
      });

      return room;
    });
  },

  /**
   * 2. chatId로 메시지 삭제 처리
   */
  async markChatAsDeleted(chatId: number) {
    return await database.write(async () => {
      const chatCollection = database.collections.get<Chat>('chats');
      const chats = await chatCollection
        .query(Q.where('chat_id', chatId))
        .fetch();
      if (chats.length === 0) throw new Error('Chat not found');
      const chat = chats[0];
      await chat.update(() => {
        chat.type = 1;
        chat.message = '삭제된 메시지 입니다';
      });
      return chat;
    });
  },

  /**
   * 3. roomId로 ChatRoom 삭제
   */
  async deleteChatRoomByRoomId(roomId: string) {
    return await database.write(async () => {
      const chatRoomCollection = database.collections.get('chat_rooms');

      const rooms = await chatRoomCollection
        .query(Q.where('id', roomId))
        .fetch();
      if (rooms.length === 0) throw new Error('Room not found');

      const room = rooms[0];
      await room.markAsDeleted();
    });
  },
  /**
   * 4. roomId로 readCnt 초기화
   */
  async resetUnreadCountByChatId(roomId: string) {
    return await database.write(async () => {
      const chatRoomCollection =
        database.collections.get<ChatRoom>('chat_rooms');
      const rooms = await chatRoomCollection
        .query(Q.where('id', roomId))
        .fetch();
      if (rooms.length === 0) throw new Error('ChatRoom not found');
      const room = rooms[0];
      room.unReadCnt = 0;
    });
  },
  /**
   * 5.  채팅 상대방의 프로필, 닉네임 update
   */
  async syncChatRoomProfile(datas: RoomProfile[]) {
    return await database.write(async () => {
      const chatRoomCollection =
        database.collections.get<ChatRoom>('chat_rooms');
      const rooms = await chatRoomCollection.query().fetch();
      rooms.map(room => {
        const data = datas.find(e => e.roomId === room.roomId);
        if (!data) {
          return;
        }
        room.roomProfile = data.profile;
        room.roomName = data.nickName;
      });
    });
  },

  async init(data: any[], clear: boolean = false) {
    const chatRoomCollection = database.collections.get<ChatRoom>('chat_rooms');
    const chatCollection = database.collections.get<Chat>('chats');

    await database.write(async () => {
      if (clear) {
        // 기존 데이터 삭제
        const allRooms = await chatRoomCollection.query().fetch();
        await Promise.all(allRooms.map(r => r.markAsDeleted()));
        const allChats = await chatCollection.query().fetch();
        await Promise.all(allChats.map(c => c.markAsDeleted()));
      }
      for (const room of data) {
        // 채팅방 생성
        await chatRoomCollection.create(r => {
          r._raw.id = room.roomId;
          r.roomId = room.roomId;
          r.unReadCnt = room.unReadCnt;
          r.roomName = room.roomName;
          r.roomProfile = room.roomProfile;
          r.lastMessageAt = room.lastMessageAt;
        });

        // 해당 채팅방 메시지들 생성
        for (const chat of room.messages) {
          await chatCollection.create(c => {
            (c._raw as any).room_id = chat.chatId.toString();
            c.chatId = chat.chatId;
            c.profile = chat.profile;
            c.userId = chat.userId;
            c.nickName = chat.nickName;
            c.message = chat.message;
            c.messageAt = chat.messageAt;
          });
        }
      }
    });

    console.log('Mock data initialized with nested messages');
  },
};
