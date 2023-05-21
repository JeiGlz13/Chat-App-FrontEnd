import moment from 'moment';

interface Props {
  message: string;
  from: string;
  createdAt: number;
}

export const OtherMessage = ({ message, createdAt, from }: Props) => {
  return (
    <div
      className="ml-2 mb-3 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
    >
        {`${from}: ${message}`}
        <br />
        <small>
          {moment(createdAt).format('DD-MM-YYYY hh:mm')}
        </small>
    </div>
  )
}