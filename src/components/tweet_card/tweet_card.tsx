import React from "react";
import { tweet } from "../../modules/tweets/types";
import Avatar from "../avatar/avatar";
import styles from "./tweet_card.module.css";

type TweetCardProps = {
  tweet: tweet;
  isOwner: boolean;
};

const TweetCard = ({ tweet, isOwner }: TweetCardProps) => {
  const {
    username,
    name,
    body,
    profile_url: url,
    created_at,
    modified_at,
  } = tweet;
  return (
    <li>
      <section className={styles.contents}>
        <Avatar url={url} name={name} />
        <div>
          <span>{name}</span>
          <span>@{username}</span>
          <span>
            {created_at}
            {modified_at}
          </span>
          <p>{body}</p>
        </div>
      </section>
      {isOwner && (
        <section className={styles.controls}>
          <button className={styles.editBtn}>edit</button>
          <button className={styles.deleteBtn}>delete</button>
        </section>
      )}
    </li>
  );
};

export default TweetCard;
