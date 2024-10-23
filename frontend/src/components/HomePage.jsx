import React from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { FaRobot } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

const HomePage = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  return (
    <div className=''>
      <div>
        <FaRobot size={24} onClick={() => navigate('/chat')} />
      </div>
      <div>
        <FaDownload size={24} />
      </div>
      <div>
        <Logout />
      </div>
    </div>
  )
}

export default HomePage;
