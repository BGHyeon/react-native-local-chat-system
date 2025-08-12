export default interface ChatUser {
  userId:number;
  profile:string;
  nickName:string;
  lastReadMessageId?:number;
}
