import { useEffect } from "react";
import useForm from "../../hooks/useForm";
import { PostProps } from "../../service/tweets";
import { TweetError, validateTweet } from "../../util/validate";
import Avatar from "../avatar/avatar";
import FormBtn from "../form_btn/form_btn";
import styles from "./new_tweet_form.module.css";

type NewTweetFormProps = {
  username: string;
  url?: string;
  onPost(tweet: PostProps): any;
  onError(error: string): void;
};

const NewTweetForm = ({
  username,
  url,
  onPost,
  onError,
}: NewTweetFormProps) => {
  const {
    data: newTweet,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useForm<PostProps, TweetError>({
    initialValues: { body: "" },
    onSubmit: onPost,
    validate: validateTweet,
  });

  useEffect(() => {
    if (!errors.body) return;

    onError(errors.body);
  }, [errors]);

  return (
    <section className={styles.container}>
      <div className={styles.avatar}>
        <Avatar url={url} name={username} />
      </div>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <textarea
          placeholder="What's happening?"
          name="body"
          value={newTweet.body}
          required
          onChange={handleChange}
        ></textarea>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <FormBtn text="tweet" submitting={submitting} />
          </div>
        </div>
      </form>
    </section>
  );
};

export default NewTweetForm;
