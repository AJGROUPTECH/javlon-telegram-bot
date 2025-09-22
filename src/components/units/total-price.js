
export const  totalPrice = arr  => {
    return arr.reduce((a, c) => a + c.price * c.qty, 0);
};

