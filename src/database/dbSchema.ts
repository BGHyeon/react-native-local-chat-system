import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'chat_rooms',
      columns: [
        { name: 'room_id', type: 'string' },
        { name: 'un_read_cnt', type: 'number' },
        { name: 'room_name', type: 'string' },
        { name: 'room_profile', type: 'string' },
        { name: 'last_message_at', type: 'string', isOptional: true },
      ],
    }),
    tableSchema({
      name: 'chats',
      columns: [
        { name: 'chat_id', type: 'number' },
        { name: 'profile', type: 'string' },
        { name: 'nick_name', type: 'string' },
        { name: 'message', type: 'string' },
        { name: 'type', type: 'number' },
        { name: 'message_at', type: 'number' }, // timestamp
        { name: 'user_id', type: 'number' },
        { name: 'room_id', type: 'string', isIndexed: true },
      ],
    }),
  ],
});
