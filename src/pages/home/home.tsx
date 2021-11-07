import Tweets from "../../components/tweets/tweets";
import TweetService from "../../service/tweets";

type HomeProps = {
  tweetService: TweetService;
};
const Home = ({ tweetService }: HomeProps) => (
  <Tweets tweetService={tweetService} />
);

export default Home;
