import { useEffect } from "react";
import useTweets from "../../hooks/useTweets";
import useUser from "../../hooks/useUser";
import { user } from "../../modules/login_user/types";
import TweetCard from "../tweet_card/tweet_card";

type TweetsProps = {
  username?: string;
};
const Tweets = ({ username }: TweetsProps) => {
  const {
    loginUser: { loginUser },
  } = useUser() as { loginUser: { loginUser: user } };

  const {
    tweets: { tweets },
    onGetTweets,
  } = useTweets();

  useEffect(() => {
    onGetTweets(username);
  }, [username, loginUser?.username, useTweets]);

  return (
    <ul>
      {tweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          isOwner={loginUser.username === tweet.username}
        />
      ))}
    </ul>
  );
};

export default Tweets;
