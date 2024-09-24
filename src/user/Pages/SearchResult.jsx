// Import necessary hooks and functions from React
import { createContext, useEffect, useState } from "react";

// Create a new context for the shopping cart
export const CartContext = createContext();

function CartContextProvider({ children }) {
  // State to hold the items in the cart
  const [cartItems, setCartItems] = useState([]);

  // Effect to load cart items from local storage when the component mounts
  useEffect(() => {
    // Retrieve cart items from local storage
    const items = localStorage.getItem("cartItems");
    if (items) {
      // If items exist, parse them and set them to cartItems state
      setCartItems([...JSON.parse(items)]);
    }
  }, []); // Empty dependency array means this runs only once after the initial render

  // Effect to save cart items to local storage whenever cartItems changes
  useEffect(() => {
    // Convert cartItems to JSON and save it to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]); // This runs whenever cartItems is updated

  // Function to add an item to the cart
  const addItemToCart = (item) => {
    const arr = cartItems; // Create a reference to current cartItems
    // Check if the item is already in the cart using its ID
    const productIndex = cartItems.findIndex((data) => data.id == item.id);
    if (productIndex === -1) {
      // If the item is not in the cart, add it
      arr.push(item);
    } else {
      // If it is already in the cart, increase its quantity
      arr[productIndex].quantity++;
    }
    // Update the cartItems state with the new array
    setCartItems([...arr]);
  };

  // Function to remove an item from the cart by its ID
  const removeItemFromCart = (id) => {
    const arr = cartItems; // Create a reference to current cartItems
    // Find the index of the item to be removed
    const productIndex = cartItems.findIndex((data) => data.id == id);
    // Remove the item from the array
    arr.splice(productIndex, 1);
    // Update the cartItems state with the modified array
    setCartItems([...arr]);
  };

  // Function to check if an item is already in the cart
  const isItemAdded = (id) => {
    // Find the index of the item in the cart
    const productIndex = cartItems.findIndex((data) => data.id == id);
    if (productIndex == -1) {
      // If not found, return null
      return null;
    } else {
      // If found, return the item details
      return cartItems[productIndex];
    }
  };

  // Provide the cartItems and functions to manipulate the cart to children components
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        isItemAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
