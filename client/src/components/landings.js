import { NavButton } from '../tools/hooks';

export const Root = () => {
  return(
    <>
      <NavButton path='/signup' text='Sign Up' />
      <NavButton path='/login' text='Log In' />
    </>
  )
}

export const NotFound = () => {
  return(
    <>
      <h1 className="title">
        Not Found
      </h1>
    </>
  )
}