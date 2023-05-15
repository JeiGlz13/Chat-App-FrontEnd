export interface IMessage {
  id?: string;
  message: string;
  from: string;
  createdAt: number;
}

export interface IMessageResponse {
  status: string;
  messages: IMessage[];
}