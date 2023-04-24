import 'antd/dist/antd.css';
import { Routes, Route } from 'react-router-dom';


import LoginPage from './page/LoginPage/LoginPage';
import RegisterPage from './page/RegisterPage/RegisterPage';
import ForgetPasswordPage from './page/ForgetPasswordPage/ForgetPassword';
import FindPasswordPage from './page/ForgetPasswordPage/FindPassword';

import IntroductionPage from './page/IntroductionPage/IntroductionPage'
import OSPage from './page/ClassPage/OSPage/OSPage'
import CenterPage from './page/CenterPage/CenterPage';
import  RoomPage from './page/RoomPage/RoomPage'
import DevicePage from './page/DevicePage/DevicePage';
import TotalPage from './page/TotalPage/TotalPage';
import RoomPhoto from './page/PhotoPage/RoomPhoto';
import BasketballPage from './page/BasketballPage/BasketballPage'

function App() {
  return (
    <Routes>
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/forget_password' element={<ForgetPasswordPage />} />
      <Route path='/find_password' element={<FindPasswordPage />} />
      <Route path='/introduction' element={<IntroductionPage />} />

      <Route path='/OS' element={<OSPage />} />
      <Route path='/Room' element={<RoomPage />} />
      <Route path='/Device' element={<DevicePage />} />
      <Route path='/Photo' element={<RoomPhoto />} />
      <Route index exact path='/Total' element={<TotalPage />} />
      <Route index exact path='/' element={<BasketballPage />} />
      <Route path="/Center" element={<CenterPage />} />
      <Route path="/Basketball" element={<BasketballPage />} />

      <></>
    </Routes>
  );
}

export default App;