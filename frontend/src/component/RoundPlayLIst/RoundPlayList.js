import { Table,Button } from 'antd';
import BasketballBg from '../../page/BasketballPage/BasketballBackground.png'

const columns = [
 
  {
    title: "匹配回合",
    dataIndex: "",
    width:'30%',
    render: (record) => {
      console.log('record的内容',record); 
      return (
        <div>
          <img src={BasketballBg} width="100px"/>
        </div>
      )
    }
    },
    

];
const data = [
  {
    key: 1,
    
    
  },
  {
    key: 2,
  
   
    
  }
];
const RoundPlayList = () => (
 <div className='PlayList'>
  <Table
    columns={columns}
    
    dataSource={data}
    scroll={{x: '100%'}}
  />
  </div>
);
export default RoundPlayList;