import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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

export const AuthRoute = ({ children, currentUser }) => {
  const navigate = useNavigate();

  useEffect( () => {
    if(!currentUser){
      navigate('/login')
    }
  })

  return(
    <>
      { children }
    </>
  )

}