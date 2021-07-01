import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import {
  deleteAsync,
  getAsync,
  postAsync,
  updateAsync,
} from "../modules/tweets/actions";
import { PostProps, UpdateProps } from "../service/tweets";

export default function useTweets() {
  const tweets = useSelector((state: RootState) => state.tweets);
  const dispatch = useDispatch();

  const onGetTweets = (username: string = "") =>
    dispatch(getAsync.request(username));
  const onPostTweet = (tweetInfo: PostProps) =>
    dispatch(postAsync.request(tweetInfo));
  const onUpdateTweet = (tweetInfo: UpdateProps) =>
    dispatch(updateAsync.request(tweetInfo));
  const onDeleteTweet = (tweetId: string) =>
    dispatch(deleteAsync.request(tweetId));

  return { tweets, onGetTweets, onPostTweet, onUpdateTweet, onDeleteTweet };
}
