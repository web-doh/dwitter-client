import React from "react";
import { Link } from "react-router-dom";
import { tweet } from "../../modules/tweets/types";
import parseDate from "../../util/parseDate";
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
              {isOwner && (
                <>
                  <span> · </span>
                  <button className={styles.editBtn}>Edit</button>
                </>
              )}
            </div>
            {isOwner && <button className={styles.deleteBtn}>〉</button>}
          </header>
          <p className={styles.body}>{body}</p>
        </section>
      </section>
    </li>
  );
};

export default TweetCard;
