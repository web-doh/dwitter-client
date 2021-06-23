import Tweets from "../../components/tweets/tweets";
import { useParams } from "react-router-dom";

type HistoryProps = {
  loginUser: string;
};

const History = ({ loginUser }: HistoryProps) => {
  const { username }: { username?: string } = useParams();

  return <Tweets username={username || loginUser} />;
};
export default History;
