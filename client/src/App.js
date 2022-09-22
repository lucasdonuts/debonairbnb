import 'bulma/css/bulma.min.css';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from './reducers/userSlice';
import { useEffect } from 'react';

import { Root, NotFound } from './components/landings';
import { SignupForm, LoginForm } from './components/auth';
import { AuthRoute } from './tools/hooks';
import Home from './components/Home';

function App() {
  const { currentUser, isLoading } = useSelector( store => store.user );
  // console.log("🚀 ~ file: App.js ~ line 14 ~ App ~ currentUser", currentUser);
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(getCurrentUser());
  }, [])

  

  if(isLoading){
    return(
      <div className="container is-max-widescreen has-text-centered">
        <div className="columns is-vcentered is-centered">
          <div className="column is-half">
            <h1 className="title">Loading...</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    // <NavBar />
    <div className="section is-large columns is-centered">
      <div className="column is-9-widescreen is-11">
        <Routes>
          <Route index element={ <Root currentUser={ currentUser } /> }/>

          <Route path="/signup" element={ <SignupForm /> } />

          <Route path="/login" element={ <LoginForm /> } />

          <Route path='/home' element={
            <AuthRoute currentUser={ currentUser }>
              <Home />
            </AuthRoute>
          } />

          <Route path="*" element={ <NotFound /> } />

        </Routes>
      </div>
    </div>
  );
}

export default App;

// const { currentUser, isLoading } = useSelector( store => store.user );
  // const dispatch = useDispatch();

  // useEffect( () => {
  //   dispatch(getCurrentUser());
  // }, [])

  // if(isLoading){
  //   return(
  //     <div className="container is-max-widescreen has-text-centered">
  //       <div className="columns is-vcentered is-centered">
  //         <div className="column is-half">
  //           <h1 className="title">Loading...</h1>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  // const [ currentUser, setCurrentUser ] = useState(null);
  // const [ errors, setErrors ] = useState([]);

  // // convert to redux
  // useEffect( () => {
  //   fetch('/current_user')
  //     .then(res => {
  //       if(res.ok){
  //         res.json().then( setCurrentUser )
  //       } else {
  //         res.json().then( data => setErrors(data.errors) )
  //       }
  //     })
  // }, [])