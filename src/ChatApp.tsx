import { SyntheticEvent, useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { io } from 'socket.io-client';

import 'react-toastify/dist/ReactToastify.css';
import { IMessage } from './interfaces/message';
import { getMessages, saveMessage } from './services/messagesService';
import { useFormMessage } from './hooks/useFormMessage';
import { MyMessage } from './components/MyMessage';
import { OtherMessage } from './components/OtherMessage';

const url = import.meta.env.VITE_APP_SERVER_URL;
const socket = io(url);

function App() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [storedMessages, setStoredMessages] = useState<IMessage[]>([]);
  const isFirstRender = useRef(true);
  const {
    clearMessage, handleInputChange, selectNickname,
    isNicknameDisabled, message, nickname
  } = useFormMessage();

  const handleSendMessage = (event: SyntheticEvent) => {
    event.preventDefault();
    if (nickname) {
      const createdAt = Date.now();
      socket.emit('message', message, nickname, createdAt);
      const newMessage: IMessage = {
        message,
        from: 'Yo',
        createdAt,
      }

      setMessages([...messages, newMessage]);
      saveMessage({ ...newMessage, from: nickname });
      clearMessage();
    } else {
      toast.error('¡Debe agregar un nickName!', {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }
  
  useEffect(() => {
    const receivedMessage = (message: IMessage) => {
      setMessages([...messages, message]);
    }

    socket.on('message', receivedMessage);

    return () => {
      socket.off('message', receivedMessage);
    }
  }, [messages]);

  useEffect(() => {
    if (isFirstRender) {
      getMessages()
        .then((response) => {
          setStoredMessages(response.data.messages);
        })
      isFirstRender.current = false;
    }
  }, []);  
  
  return (
    <div className="bg-gray-700 px-10 py-5 text-slate-50 font-poppins font-semibold min-h-screen">
      <div className="mt-3 flex justify-center w-full">
        <div className="w-2/4 flex flex-col">
          <h1 className="text-center text-2xl mb-4">General chat</h1>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Escribe un Nickname"
              value={nickname}
              name="nickname"
              disabled={isNicknameDisabled}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={selectNickname}
              disabled={isNicknameDisabled}
              className={`text-white absolute right-2.5 bottom-2.5 ${(isNicknameDisabled) ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2`}
            >
              Establecer
            </button>
          </div>
        </div>
      </div>
  
      <div className="mt-12 flex justify-center w-full text-gray-700">
        <div className="w-11/12 flex flex-col flex-wrap justify-center rounded-lg bg-white shadow-xl">
          <div className="py-5 px-10 h-115 overflow-y-scroll">
            {
              storedMessages?.map(({ message, createdAt, from }) => (
                ((from === nickname) && (isNicknameDisabled))
                  ? <MyMessage key={createdAt} from={from} message={message} createdAt={createdAt} />
                  : <OtherMessage key={createdAt} from={from} message={message} createdAt={createdAt} />
              ))
            }

            <div className="w-full flex justify-center">
              <small className="text-gray-400">
                Nuevos mensajes
              </small>
            </div>

            {
              messages?.map(({ message, createdAt, from }) => (
                (from === 'Yo')
                  ? <MyMessage key={createdAt} from={from} message={message} createdAt={createdAt} />
                  : <OtherMessage key={createdAt} from={from} message={message} createdAt={createdAt} />
              ))
            }
          </div>

          <form
            className="flex items-center py-2 px-3 bg-gray-200 rounded-lg"
            onSubmit={handleSendMessage}
          >
            <input
              id="chat"
              className="block mx-4 p-2.5 w-full text-sm outline-none text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your message..."
              value={message}
              name="message"
              onChange={handleInputChange}
              disabled={!nickname}
            />

            <button
              type="submit"
              disabled={!nickname}
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100"
            >
              <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </div>
  )
}

export default App
