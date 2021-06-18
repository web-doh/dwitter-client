import Tweets from "../../components/tweets/tweets";
import useTweets from "../../hooks/useTweets";

type HomeProps = {};

const Home = () => {
  const {
    tweets: { tweets },
  } = useTweets();

  return <Tweets tweets={tweets} />;
};

export default Home;
