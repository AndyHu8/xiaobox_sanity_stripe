import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const Context = createContext();

//children = Alles innerhalb des Components sind children
export const StateContext = ({ children }) => {
    //Zeige Cart oder nicht
    const [showCart, setShowCart] = useState(false);
    //Einkaufswagen (alle Produkte im Wagen als Array)
    const [cartItems, setCartItems] = useState([]);
    //Endsumme
    const [totalPrice, setTotalPrice] = useState(0);
    //Anzahl an Produkten (Gesamtanzahl inkl. Menge)
    const [totalQuantities, setTotalQuantities] = useState(0);
    //Aktuelle Anzahl an Produkten beim auswählen
    const [qty, setQty] = useState(1);

    //Produkt updaten wegen Menge
    let foundProduct;
    //Index vom geupdateten Produkt
    let index;

    const onAdd = (product, quantity) => {
        //Schauen ob Produkt schon in CartItems ist
        //checkProductInCart = bool (Wenn ein item = produkt ist => true)
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        /*z.B. Alter Stand: 10€
        Neuer Artikel: 5€ * 2x
        Neuer Stand. 20€*/
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if(checkProductInCart) {
            //Packe nur die Quantity vom Produkt in CartItems
            const updatedCartItems = cartItems.map((cartProduct) => {

                //Wenn das Item schon vorhanden ist, packe nur die Quantity rein
                if(cartProduct._id === product._id) return {
                    ...cartProduct, quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        }
        else {
            //Setze Quantity vom produkt auf die richtige Quantity
            //packe das Produkt in CartItems, aber behalte die alte Liste
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {

        //Finde heraus: Id/Index im Array = die aktuelle Id/Index
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);

        //Behalte alle Items, die nicht die eine Id haben
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if(value === "inc") {

            //Nimm alte Liste
            //Gehe durch alte Liste
            //Wenn item's Id = Id ist, dann return alte Item, aber ersetze die Quantity
            setCartItems((prevCartItems) => 
                prevCartItems.map((item) => {          
                    if (item._id === id){
                        return {...item, quantity: foundProduct.quantity + 1}
                    }
                    return item;
                })
            );
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        }
        else if(value === "dec") {
            if(foundProduct.quantity > 1) {
                setCartItems((prevCartItems) => 
                prevCartItems.map((item) => {          
                    if (item._id === id){
                        return {...item, quantity: foundProduct.quantity - 1}
                    }
                    return item;
                })
            );
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    }

    const increaseQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decreaseQty = () => {
        setQty((prevQty) => {
            if((prevQty - 1) < 1) return 1;
            return prevQty - 1;
        });
    }

    return (
        //Wrap alles in einem Context-Provider
        <Context.Provider
        value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            increaseQty,
            decreaseQty,
            onAdd,
            setShowCart,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities
        }}
        >
            {children}
        </Context.Provider>
    )
}

//Damit von außen darauf zugegriffen wird
//Context benutzen + inkl. aller States & Functions
//States & Functions sind im Context.Provider
export const useStateContext = () => useContext(Context);