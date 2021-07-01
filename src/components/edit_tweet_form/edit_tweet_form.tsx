import useForm from "../../hooks/useForm";
import { tweet } from "../../modules/tweets/types";
import { UpdateProps } from "../../service/tweets";
import { TweetError, validateTweet } from "../../util/validate";
import FormBtn from "../form_btn/form_btn";
import styles from "./edit_tweet_form.module.css";

type EditTweetFormProps = {
  tweet: tweet;
  onClose(): void;
  onUpdate(tweet: UpdateProps): any;
};

const EditTweetForm = ({ tweet, onClose, onUpdate }: EditTweetFormProps) => {
  const {
    data: newTweet,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useForm<UpdateProps, TweetError>({
    initialValues: { id: tweet.id, body: "" },
    onSubmit: onUpdate,
    validate: validateTweet,
    successHandler: onClose,
  });

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <textarea
          placeholder="Edit your tweet"
          defaultValue={tweet.body}
          name="body"
          value={newTweet.body}
          className={styles.textarea}
          onChange={handleChange}
          required
        ></textarea>
        {errors.body && <span className={styles.errorMsg}>{errors.body}</span>}
        <div className={styles.buttons}>
          <div className={styles.button}>
            <FormBtn text="cancel" color="red" onClickHandler={onClose} />
          </div>
          <div className={styles.button}>
            <FormBtn text="update" submitting={submitting} />
          </div>
        </div>
      </form>
    </>
  );
};

export default EditTweetForm;
