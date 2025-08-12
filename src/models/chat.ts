import { Model } from '@nozbe/watermelondb';
import { children, field, relation } from '@nozbe/watermelondb/decorators';

export class Chat extends Model {
  static table = 'chats';
  @field('chat_id') chatId!: number;
  @field('profile') profile!: string;
  @field('nick_name') nickName!: string;
  @field('type') type!: number;
  @field('user_id') userId!: number;
  @field('message') message!: string;
  @field('message_at') messageAt!: string;
  @relation('chat_rooms', 'room_id') chatRoom!: ChatRoom;
}

export class ChatRoom extends Model {
  static table = 'chat_rooms';

  @field('room_id') roomId!: string;
  @field('un_read_cnt') unReadCnt!: number;
  @field('room_name') roomName!: string;
  @field('room_profile') roomProfile!: string;
  @field('last_message_at') lastMessageAt!: string | null;
  @children('chats') messages!: Chat[];
}
