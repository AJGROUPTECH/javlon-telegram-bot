import './App.css';
import { getData } from './constants/db';
import Card from './components/card/card';
import Cart from './components/cart/cart';
import { useEffect, useState } from 'react';

const telegram = window.Telegram.WebApp;

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Telegram WebAppni tayyorlash
    telegram.ready();
    console.log("Telegram WebApp:", telegram); // tekshirish uchun
  }, []);

  const onAddItems = (item) => {
    const existItem = cartItems.find((c) => c.id === item.id);

    if (existItem) {
      const newData = cartItems.map((c) =>
        c.id === item.id ? { ...existItem, qty: existItem.qty + 1 } : c
      );
      setCartItems(newData);
    } else {
      const newData = [...cartItems, { ...item, qty: 1 }];
      setCartItems(newData);
    }
  };

  const onRemoveItems = (item) => {
    const existItem = cartItems.find((c) => c.id === item.id);

    if (existItem.qty === 1) {
      const newData = cartItems.filter((c) => c.id !== item.id);
      setCartItems(newData);
    } else {
      const newData = cartItems.map((c) =>
        c.id === item.id ? { ...existItem, qty: existItem.qty - 1 } : c
      );
      setCartItems(newData);
    }
  };

  const onCheckout = () => {
    telegram.MainButton.setText("Sotib olish :)"); // text ni set qilish kerak
    telegram.MainButton.show();

    // ⚠️ qayta bosganda ko‘p marta yozilmasligi uchun oldin tozalab olish kerak
    telegram.MainButton.onClick(() => {
      alert("Sotib olish tugmasi bosildi!");
      console.log("Buyurtma:", cartItems);

      // Bu yerda serverga ma’lumot yuborish mumkin
      // fetch("/order", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(cartItems)
      // });
    });
  };

  const courses = getData();

  return (
    <>
      <h1 className="heading">Sammi kurslar</h1>

      <Cart cartItems={cartItems} onCheckout={onCheckout} />

      <div className="cards__container">
        {courses.map((course) => (
          <Card
            key={course.id}
            course={course}
            onAddItems={onAddItems}
            onRemoveItems={onRemoveItems}
          />
        ))}
      </div>
    </>
  );
};

export default App;
