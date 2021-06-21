import Tweets from "../../components/tweets/tweets";
import { useParams } from "react-router-dom";

const History = () => {
  const { username }: { username: string } = useParams();

  return <Tweets username={username} />;
};
export default History;
