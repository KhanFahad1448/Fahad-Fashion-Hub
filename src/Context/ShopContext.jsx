import { createContext, useState } from "react";
import all_product from "../Utils/all_product";
import new_collections from "../Utils/new_collection";

export const Shopcontext = createContext(null);

const getDefaultCart = () => {
    const cart = {};
    all_product.forEach(product => {
        cart[product.id] = 0;
    });
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    // New state for product images, size, and ratings
    const [selectedImages, setSelectedImages] = useState(() => {
        const obj = {};
        all_product.forEach(product => {
            obj[product.id] = product.image; // default to first image
        });
        return obj;
    });

    const [selectedSizes, setSelectedSizes] = useState(() => {
        const obj = {};
        all_product.forEach(product => {
            obj[product.id] = null; // default: no size selected
        });
        return obj;
    });

    const [productRatings, setProductRatings] = useState(() => {
        const obj = {};
        all_product.forEach(product => {
            obj[product.id] = product.rating || 0; // default rating
        });
        return obj;
    });

    // Cart functions
    const addToCart = (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const clearCart = () => {
        setCartItems(getDefaultCart());
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find(product => product.id === Number(item));
                if (itemInfo) totalAmount += cartItems[item] * itemInfo.new_price;
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    // New functions for images, sizes, and ratings
    const updateSelectedImage = (productId, imageUrl) => {
        setSelectedImages(prev => ({ ...prev, [productId]: imageUrl }));
    };

    const updateSelectedSize = (productId, size) => {
        setSelectedSizes(prev => ({ ...prev, [productId]: size }));
    };

    const updateProductRating = (productId, rating) => {
        setProductRatings(prev => ({ ...prev, [productId]: rating }));
    };

    const contextValue = {
        all_product,
        new_collections,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalCartAmount,
        getTotalCartItems,
        selectedImages,
        updateSelectedImage,
        selectedSizes,
        updateSelectedSize,
        productRatings,
        updateProductRating,
    };

    return (
        <Shopcontext.Provider value={contextValue}>
            {props.children}
        </Shopcontext.Provider>
    );
};

export default ShopContextProvider;
