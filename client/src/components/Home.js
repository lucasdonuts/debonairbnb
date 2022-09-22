import { LogoutButton } from './auth';
import ItemsContainer from './ItemsContainer';

const Home = () => {
  return(
    <div className="container">
      <LogoutButton />
      <ItemsContainer />
    </div>
  )
};

export default Home;