import React from "react";
import useUser from "../../hooks/useUser";
import { tweet } from "../../modules/tweets/types";
import TweetCard from "../tweet_card/tweet_card";

type TweetsProps = {
  tweets: Array<tweet>;
};

const Tweets = ({ tweets }: TweetsProps) => {
  const {
    loginUser: { loginUser },
  } = useUser();
  return (
    <ul>
      {tweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          isOwner={(loginUser && loginUser.username) === tweet.username}
        />
      ))}
    </ul>
  );
};

export default Tweets;
