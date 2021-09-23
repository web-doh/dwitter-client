import Tweets from "../../components/tweets/tweets";
import TweetService from "../../service/tweets";

type HomeProps = {
  loginUser: { username: string; profile_url: string };
  tweetService: TweetService;
};
const Home = ({ loginUser, tweetService }: HomeProps) => (
  <Tweets loginUser={loginUser} tweetService={tweetService} />
);

export default Home;
