import { useEffect } from "react";
import useTweets from "../../hooks/useTweets";
import useUser from "../../hooks/useUser";
import { user } from "../../modules/login_user/types";
import TweetCard from "../tweet_card/tweet_card";
import NewTweetForm from "../new_tweet_form/new_tweet_form";

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
    onPostTweet,
    onUpdateTweet,
    onDeleteTweet,
  } = useTweets();

  useEffect(() => {
    if (!loginUser) return;

    onGetTweets(username);
  }, [useUser, username]);

  return (
    <>
      {!username && (
        <NewTweetForm
          username={loginUser.username}
          url={loginUser.profile_url}
          onPost={onPostTweet}
        />
      )}
      <ul>
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            isOwner={loginUser.username === tweet.username}
            onUpdate={onUpdateTweet}
            onDeleteHandler={onDeleteTweet}
          />
        ))}
      </ul>
    </>
  );
};

export default Tweets;
