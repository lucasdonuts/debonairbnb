import { useNavigate } from 'react-router-dom';

export const NavButton = ({ path = '/', text = 'Back' }) => {
  const navigate = useNavigate();

  const buttonClass = () => {
    switch(path){
      case '/':
      case '/login':
        return "button is-primary is-light";
      case '/signup':
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