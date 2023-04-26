import 'antd/dist/antd.css';
import { Routes, Route } from 'react-router-dom';



import BasketballPage from './page/BasketballPage/BasketballPage'

import demo from './page/Demo/demo'

function App() {
  return (
    <Routes>
      
      <Route index exact path='/' element={<BasketballPage />} />
      
      
    

      <></>
    </Routes>
  );
}

export default App;