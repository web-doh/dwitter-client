import { ChangeEvent, useState } from "react";
import { FormEvent } from "react";
import useTweets from "../../hooks/useTweets";
import Avatar from "../avatar/avatar";
import FormBtn from "../form_btn/form_btn";
import styles from "./new_tweet_form.module.css";

type NewTweetFormProps = {
  username: string;
  url?: string;
};

const NewTweetForm = ({ username, url }: NewTweetFormProps) => {
  const { onPostTweet } = useTweets();
  const [body, setBody] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newTweet = {
      body,
    };
    onPostTweet(newTweet);
    setBody("");
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  return (
    <section className={styles.container}>
      <div className={styles.avatar}>
        <Avatar url={url} name={username} />
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <textarea
          placeholder="What's happening?"
          value={body}
          required
          onChange={onChange}
        ></textarea>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <FormBtn text="tweet" />
          </div>
        </div>
      </form>
    </section>
  );
};

export default NewTweetForm;
