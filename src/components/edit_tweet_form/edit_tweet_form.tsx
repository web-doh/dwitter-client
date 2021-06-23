import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import useTweets from "../../hooks/useTweets";
import { tweet } from "../../modules/tweets/types";
import FormBtn from "../form_btn/form_btn";
import styles from "./edit_tweet_form.module.css";

type EditTweetFormProps = {
  tweet: tweet;
  onClose: Function;
};

const EditTweetForm = ({ tweet, onClose }: EditTweetFormProps) => {
  const [body, setBody] = useState("");
  const { onUpdateTweet } = useTweets();

  const onCloseHandler = () => {
    onClose();
    setBody("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newTweet = {
      ...tweet,
      body,
    };
    onCloseHandler();
    onUpdateTweet(newTweet);
    setBody("");
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <textarea
        placeholder="Edit your tweet"
        defaultValue={tweet.body}
        required
        className={styles.textarea}
        onChange={onChange}
      ></textarea>
      <div className={styles.buttons}>
        <div className={styles.button}>
          <FormBtn
            text="cancel"
            color="red"
            onClickHandler={() => onCloseHandler()}
          />
        </div>
        <div className={styles.button}>
          <FormBtn text="update" />
        </div>
      </div>
    </form>
  );
};

export default EditTweetForm;
