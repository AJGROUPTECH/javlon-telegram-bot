import './App.css';
import { getData } from './constants/db';
const courses = getData();
import Card from './components/card/card';
import Cart from './components/cart/cart';
import { useEffect, useState } from 'react';

const telegram = window.Telegram.WebApp;
const App = () => {

    const [cartItems, setcartItems, ] = useState([]);

     useEffect(() => {
      telegram.ready();
     });
     
    const onAddItems = item => {
      const existItem = cartItems.find(c => c.id === item.id);
     
      if(existItem){
        const newData = cartItems.map(c => c.id === item.id ? {...existItem, qty: existItem.qty + 1} : c);
       
        setcartItems(newData);
      } else {
        const newData = [...cartItems, {...item, qty: 1}];
        
        setcartItems(newData);
    } 
  };
    const onRemoveItems = item => {
      const existItem = cartItems.find(c => c.id == item.id);
     

      if(existItem.qty === 1){
        const newData = cartItems.filter(c => c.id !== item.id);
       
        setcartItems(newData);
      } else {
        const newData = cartItems.map(c => c.id === item.id ? {...existItem, qty: existItem.qty - 1} : c);
       
        setcartItems(newData);

        
      }
    };
    const  onCheckout = () => {
     telegram.MainButton.text = "Sotib olish :)";
     telegram.MainButton.show();
    };

  return ( <>
   <h1 className='heading'> Sammi kurslar</h1>
    
   <Cart cartItems={cartItems} onCheckout={onCheckout} /> 

   <div className='cards__container'>

   {courses.map((course) => (
      <Card key={course.id} course={course}  onAddItems={onAddItems} onRemoveItems={onRemoveItems} />
   ))}
   </div> 
  </>
  );
};

export default App;