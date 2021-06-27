import { MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "react-feather";
import { tweet } from "../../modules/tweets/types";
import parseDate from "../../util/parseDate";
import Avatar from "../avatar/avatar";
import EditTweetForm from "../edit_tweet_form/edit_tweet_form";
import SelectWindow from "../select_window/select_window";
import styles from "./tweet_card.module.css";

type TweetCardProps = {
  tweet: tweet;
  isOwner: boolean;
  onDeleteHandler: Function;
};

type SelectOption = {
  text: string;
  onClick: MouseEventHandler;
  color?: string;
};

export type SelectOptions = Array<SelectOption>;

const TweetCard = ({ tweet, isOwner, onDeleteHandler }: TweetCardProps) => {
  const {
    username,
    name,
    body,
    profile_url: url,
    created_at,
    modified_at,
  } = tweet;
  const basicOptions: SelectOptions = [
    { text: "Edit", onClick: () => onOpenEditor() },
    { text: "Delete", onClick: () => onConfirmDelete(), color: "red" },
    { text: "Cancel", onClick: () => onCloseWindow() },
  ];

  const [editing, setEditing] = useState(false);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [options, setOptions] = useState(basicOptions);

  const onOpenWindow = () => setIsWindowOpen(true);
  const onCloseWindow = () => {
    setIsWindowOpen(false);
    setOptions(basicOptions);
  };
  const onOpenEditor = () => {
    onCloseWindow();
    setEditing(true);
  };
  const onCloseEditor = () => setEditing(false);
  const onDelete = (id: string) => {
    onCloseWindow();
    onDeleteHandler(id);
  };
  const onConfirmDelete = () => {
    setOptions([
      { text: "Delete", onClick: () => onDelete(tweet.id), color: "red" },
      { text: "Cancel", onClick: () => onCloseWindow() },
    ]);
  };

  return (
    <>
      <li className={styles.container}>
        <section className={styles.contents}>
          <div className={styles.avatar}>
            <Avatar url={url} name={name} />
          </div>
          <section className={styles.text}>
            <header className={styles.header}>
              <div>
                <span className={styles.name}>{name}</span>
                <Link to={`/${username}`}>
                  <span className={styles.username}>@{username}</span>
                </Link>
                <span>
                  {modified_at === created_at
                    ? ` · ${parseDate(created_at)}  `
                    : ` · ${parseDate(modified_at)} 수정됨  `}
                </span>
              </div>
              {isOwner && (
                <button className={styles.button} onClick={onOpenWindow}>
                  <MoreHorizontal />
                </button>
              )}
            </header>
            <pre className={styles.body}>{body}</pre>
            {editing && <EditTweetForm tweet={tweet} onClose={onCloseEditor} />}
          </section>
        </section>
      </li>
      {isWindowOpen && (
        <SelectWindow options={options} onClose={onCloseWindow} />
      )}
    </>
  );
};

export default TweetCard;
