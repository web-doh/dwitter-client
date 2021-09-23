import { useParams } from "react-router-dom";

import Tweets from "../../components/tweets/tweets";
import TweetService from "../../service/tweets";

type HistoryProps = {
  loginUser: { username: string; profile_url: string };
  tweetService: TweetService;
};

const History = ({ loginUser, tweetService }: HistoryProps) => {
  let { username }: { username: string } = useParams();

  return (
    <Tweets
      name={username || loginUser.username}
      loginUser={loginUser}
      tweetService={tweetService}
    />
  );
};
export default History;
