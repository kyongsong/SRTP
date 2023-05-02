import 'antd/dist/antd.css';
import { Routes, Route } from 'react-router-dom';



import BasketballPage from './page/BasketballPage/BasketballPage'

import AnalysisPage from './page/AnalysisPage/AnalysisPage';

function App() {
  return (
    <Routes>
      
      <Route index exact path='/' element={<BasketballPage />} />
      <Route path='/Analysis' element={<AnalysisPage />} />
      
    

   
    </Routes>
  );
}

export default App;