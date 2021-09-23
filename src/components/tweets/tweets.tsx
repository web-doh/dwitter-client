import { useEffect, useState } from "react";

import useTweets from "../../hooks/useTweets";
import { tweet } from "../../modules/tweets/types";
import TweetService from "../../service/tweets";
import ErrorBanner from "../error_banner/error_banner";
import NewTweetForm from "../new_tweet_form/new_tweet_form";
import TweetCard from "../tweet_card/tweet_card";
import styles from "./tweets.module.css";

type TweetsProps = {
  name?: string;
  loginUser: { username: string; profile_url: string };
  tweetService: TweetService;
};
const Tweets = ({
  name,
  loginUser: { username, profile_url },
  tweetService,
}: TweetsProps) => {
  const [error, setError] = useState("");
  const {
    tweets: { tweets, errorMessage },
    onGetTweets,
    onPostTweet,
    onUpdateTweet,
    onDeleteTweet,
  } = useTweets();

  useEffect(() => {
    onGetTweets(name);

    const stopSyncNew = tweetService.onSyncNew((tweet: tweet) => {
      if (tweet.username === username) return;

      window.confirm(`${tweet.username}님의 새 트윗 확인:
        ${tweet.body}`) && onGetTweets(name);
    });

    return () => {
      stopSyncNew();
    }; // tweets 컴포넌트가 끝나면 sync도 종료
  }, [tweetService, useTweets]);

  useEffect(() => {
    if (!errorMessage) return;

    onError(errorMessage);
  }, [errorMessage]);

  const onError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <>
      {error && <ErrorBanner message={error} />}
      {!name && (
        <NewTweetForm
          username={username}
          url={profile_url}
          onPost={onPostTweet}
          onError={onError}
        />
      )}
      <ul>
        {tweets.length ? (
          tweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              isOwner={username === tweet.username}
              onUpdate={onUpdateTweet}
              onDeleteHandler={onDeleteTweet}
            />
          ))
        ) : (
          <h3 className={styles.info}>No tweets yet!</h3>
        )}
      </ul>
    </>
  );
};

export default Tweets;
