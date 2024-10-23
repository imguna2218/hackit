// import { Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
// import userAtom from '../../atoms/userAtom'
// import useShowToast from '../hooks/useShowToast'
import { HiOutlineLogout } from "react-icons/hi";
// import { useNavigate } from 'react-router-dom'
import userAtom from '../atoms/userAtom';

const Logout = () => {
  const setUser = useSetRecoilState(userAtom);
  // const showToast = useToast();
  // const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json();
      //console.log(data);

      if (data.error) {
        alert(`Error: ${data.error}`);
      }

      localStorage.removeItem('hackit');
      setUser(null);
      // navigate('/');
    } catch (err) {
      alert(`Error: ${err}`);
      // Show an error message or take appropriate action here.
    }
  }
  return (
    <>
      <button
        position={"fixed"}
        top={"30px"}
        right={"30px"}
        onClick={handleLogOut}
      >
        <HiOutlineLogout size={20} />
      </button>
    </>
  )
}

export default Logout