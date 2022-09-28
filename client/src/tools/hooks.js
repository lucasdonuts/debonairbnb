import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

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
  
  useEffect( () => {
    console.log("Inside useEffect: ", currentUser)
    if(!currentUser){
      console.log('navigate')
      navigate('/login')
    }
  }, [])

  return(
    <>
      { children }
    </>
  )

}