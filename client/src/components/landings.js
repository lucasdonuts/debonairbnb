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

  if(currentUser){
    return <></>
  } else {
    return(
      <div className="columns is-centered">
        <SignupForm />
      </div>
    )
  }
}

export const NotFound = () => {
  return(
    <>
      <h1 className="title has-text-white">
        Not Found
      </h1>
      <NavButton path="/home" text="Home" />
    </>
  )
}