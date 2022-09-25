import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavButton } from '../tools/hooks';
import { SignupForm } from './auth';

export const Root = ({ currentUser }) => {
  const navigate = useNavigate();
  
  useEffect( () => {
    if(currentUser){
      navigate('/home');
    }
  }, [])

  return(
    <div className="columns is-centered">
      <SignupForm />
      <NavButton path='/login' text='Log In' />
    </div>
  )
}

export const NotFound = () => {
  return(
    <>
      <h1 className="title has-text-white">
        Not Found
      </h1>
    </>
  )
}