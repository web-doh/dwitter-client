import { user } from "../modules/users/types";
import {
  setTweets,
  addTweet,
  removeTweet,
  updateTweet,
} from "../modules/tweets/actions";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { tweet } from "../modules/tweets";

export default function useTweets() {
  const tweets = useSelector((state: RootState) => state.tweets);
  const dispatch = useDispatch();

  const onSet = useCallback(() => dispatch(setTweets()), [dispatch]);

  const onAdd = useCallback(
    (tweet: { body: string; user: user }) => dispatch(addTweet(tweet)),
    [dispatch]
  );

  const onUpdate = useCallback(
    (tweet: tweet) => dispatch(updateTweet(tweet)),
    [dispatch]
  );
  const onRemove = useCallback(
    (id: number) => dispatch(removeTweet(id)),
    [dispatch]
  );

  return { tweets, onSet, onAdd, onUpdate, onRemove };
}
