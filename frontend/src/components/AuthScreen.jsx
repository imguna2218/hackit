import React from 'react'
import { useRecoilValue } from 'recoil'
import authScreenAtom from '../atoms/authAtom';
import Login from './Login';
import SignupCard from './Signup';

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  // console.log(authScreenState);
  return (
    <>
      {authScreenState === 'login' ? <Login /> : <SignupCard />}
    </>
  )
}

export default AuthPage
