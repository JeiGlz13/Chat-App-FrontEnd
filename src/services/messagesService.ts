import axios, { AxiosResponse } from 'axios';
import { IMessage, IMessageResponse } from '../interfaces/message';

const url = import.meta.env.VITE_APP_API_URL;

const messageInstance = axios.create({
  baseURL: url,
});

const getMessages = (): Promise<AxiosResponse<IMessageResponse>> => messageInstance
  .get('getMessages');

const saveMessage = (message: IMessage) => messageInstance
    .post('save', message);

export {
  getMessages,
  saveMessage,
}