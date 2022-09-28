import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';

export const NavButton = ({ path = '/', text = 'Back' }) => {
  const navigate = useNavigate();

  const buttonClass = () => {
    switch(path){
      case '/':
      case '/login':
        return "button is-primary is-light";
      case '/signup':
      case '/logout':
        return "button is-primary";
      default:
        return "button";
    }
  }

  return(
    <button
      className={ buttonClass() }
      onClick={ () => navigate(path) }
    >
      { text }
    </button>
  )
}

export const AuthRoute = ({ children, /* currentUser */ }) => {
  const navigate = useNavigate();
  const { currentUser, isLoading } = useSelector( state => state.user );

  console.log("Outside useEffect: ", currentUser)
  
  useEffect( () => {
    console.log("Inside useEffect: ", currentUser)
    if(!currentUser){
      console.log("Inside if, before navigate")
      navigate('/login')
    }
  }, [])

  if(!currentUser){
    return <></>
  } else {
    return(
      <>
        { children }
      </>
    )
  }

}