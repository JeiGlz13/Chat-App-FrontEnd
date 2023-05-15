import moment from 'moment';

interface Props {
  message: string;
  createdAt: number;
  from: string;
}

export const MyMessage = ({ message, createdAt, from }: Props) => {
  return (
    <div
      className="mr-2 mb-3 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
    >
        {`${from}: ${message}`}
        <br />
        <small>
          {moment(createdAt).format('DD-MM-YYYY')}
        </small>
    </div>
  )
}
