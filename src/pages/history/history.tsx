import { useParams } from "react-router-dom";

import Tweets from "../../components/tweets/tweets";
import useUser from "../../hooks/useUser";
import TweetService from "../../service/tweets";

type HistoryProps = {
  tweetService: TweetService;
};

const History = ({ tweetService }: HistoryProps) => {
  let { username }: { username: string } = useParams();
  const {
    loginUser: { loginUser },
  } = useUser();

  return (
    <Tweets
      name={username || loginUser?.username}
      tweetService={tweetService}
    />
  );
};
export default History;
