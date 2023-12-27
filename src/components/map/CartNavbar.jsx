import React from 'react';

const CartNavbar = ({itemsCount=[],totalPrice}) => {

 

  return (
    <nav className=" bg-blue-900 text-white p-3 flex justify-between items-center sticky top-0 z-50">
      <div>
        <h3 className="text-lg font-semibold">Your Cart</h3>
        <p className="text-sm">{itemsCount} {itemsCount === 1 ? 'Item' : 'Items'}</p>
      </div>
      <div>
        <p className="text-lg font-semibold">Total Price: Rs. {totalPrice}</p>
        {/* Add other cart-related links or icons here */}
      </div>
    </nav>
  );
};

export default CartNavbar;
