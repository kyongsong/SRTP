import 'antd/dist/antd.css';
import { Routes, Route } from 'react-router-dom';



import BasketballPage from './page/BasketballPage/BasketballPage'



function App() {
  return (
    <Routes>
      
      <Route index exact path='/' element={<BasketballPage />} />
      
    

      <></>
    </Routes>
  );
}

export default App;