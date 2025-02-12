import * as React from "react";
import { StyleSheet, alert } from "react-nativescript";
import { mockReviews } from "../../data/mockData";
import { MenuItem } from "../../types";

export function RestaurantScreen({ route, navigation }) {
    const { restaurant } = route.params;
    const [cartItems, setCartItems] = React.useState<(MenuItem & { quantity: number })[]>([]);
    const [showCart, setShowCart] = React.useState(false);
    const [showOrderSummary, setShowOrderSummary] = React.useState(false);
    const [cartCount, setCartCount] = React.useState(0);

    const addToCart = (item: MenuItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                const updatedItems = prevItems.map(i => 
                    i.id === item.id 
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
                setCartCount(updatedItems.reduce((sum, item) => sum + item.quantity, 0));
                return updatedItems;
            }
            const newItems = [...prevItems, { ...item, quantity: 1 }];
            setCartCount(newItems.reduce((sum, item) => sum + item.quantity, 0));
            return newItems;
        });
        alert({
            title: "Added to Cart",
            message: `${item.name} has been added to your cart.`,
            okButtonText: "OK"
        });
    };

    const removeFromCart = (itemId: string) => {
        setCartItems(prevItems => {
            const newItems = prevItems.filter(item => item.id !== itemId);
            setCartCount(newItems.reduce((sum, item) => sum + item.quantity, 0));
            return newItems;
        });
    };

    const updateQuantity = (itemId: string, increment: boolean) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => {
                if (item.id === itemId) {
                    const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
                    return newQuantity < 1 ? null : { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(Boolean);
            setCartCount(updatedItems.reduce((sum, item) => sum + item.quantity, 0));
            return updatedItems;
        });
    };

    const totalAmount = cartItems.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
    );

    const handleOrder = () => {
        if (cartItems.length === 0) {
            alert({
                title: "Empty Cart",
                message: "Please add items to your cart first!",
                okButtonText: "OK"
            });
            return;
        }

        setShowOrderSummary(true);
    };

    const confirmOrder = () => {
        navigation.navigate("OrderTracking", {
            restaurantName: restaurant.name,
            orderStatus: "confirmed",
            cartItems: cartItems,
            totalAmount: totalAmount
        });

        setCartItems([]);
        setCartCount(0);
        setShowCart(false);
        setShowOrderSummary(false);
    };

    if (showOrderSummary) {
        return (
            <scrollView style={styles.container}>
                <stackLayout className="p-4">
                    <label className="text-2xl font-bold mb-4">Order Summary</label>
                    
                    <stackLayout className="bg-white rounded-xl p-4 mb-4">
                        <label className="text-lg font-bold mb-2">{restaurant.name}</label>
                        <label className="text-gray-600 mb-4">{restaurant.address}</label>
                        
                        <label className="font-bold mb-2">Your Items:</label>
                        {cartItems.map((item) => (
                            <gridLayout key={item.id} columns="*, auto" className="mb-2">
                                <label col="0" className="text-gray-600">
                                    {item.quantity}x {item.name}
                                </label>
                                <label col="1" className="text-blue-500">
                                    €{(item.price * item.quantity).toFixed(2)}
                                </label>
                            </gridLayout>
                        ))}
                        
                        <label className="h-px bg-gray-200 my-4" />
                        
                        <gridLayout columns="*, auto" className="mb-2">
                            <label col="0" className="font-bold">Total Amount</label>
                            <label col="1" className="font-bold text-blue-500">
                                €{totalAmount.toFixed(2)}
                            </label>
                        </gridLayout>
                    </stackLayout>

                    <button
                        className="p-4 bg-blue-500 text-white rounded-xl text-lg font-bold mb-3"
                        onTap={confirmOrder}
                    >
                        Confirm Order
                    </button>
                    
                    <button
                        className="p-4 bg-gray-200 rounded-xl text-lg"
                        onTap={() => setShowOrderSummary(false)}
                    >
                        Back to Cart
                    </button>
                </stackLayout>
            </scrollView>
        );
    }

    if (showCart) {
        return (
            <scrollView style={styles.container}>
                <stackLayout className="p-4">
                    <gridLayout columns="*, auto" className="mb-4">
                        <label className="text-2xl font-bold" col="0">Your Cart</label>
                        <button 
                            className="text-blue-500 font-bold"
                            col="1"
                            onTap={() => setShowCart(false)}
                        >
                            Back
                        </button>
                    </gridLayout>

                    {cartItems.length === 0 ? (
                        <label className="text-gray-500 text-center p-4">
                            Your cart is empty
                        </label>
                    ) : (
                        <stackLayout>
                            {cartItems.map((item) => (
                                <gridLayout
                                    key={item.id}
                                    className="mb-4 p-4 bg-white rounded-xl shadow"
                                    columns="auto, *, auto"
                                >
                                    <image
                                        src={item.image}
                                        className="w-16 h-16 rounded"
                                        stretch="aspectFill"
                                        col="0"
                                    />
                                    <stackLayout className="ml-3" col="1">
                                        <label className="font-bold">{item.name}</label>
                                        <label className="text-blue-500">€{item.price.toFixed(2)}</label>
                                    </stackLayout>
                                    <stackLayout orientation="horizontal" col="2">
                                        <button
                                            className="w-8 h-8 bg-gray-200 rounded-full text-center"
                                            onTap={() => updateQuantity(item.id, false)}
                                        >
                                            -
                                        </button>
                                        <label className="mx-2 text-center w-8">{item.quantity}</label>
                                        <button
                                            className="w-8 h-8 bg-gray-200 rounded-full text-center"
                                            onTap={() => updateQuantity(item.id, true)}
                                        >
                                            +
                                        </button>
                                    </stackLayout>
                                </gridLayout>
                            ))}

                            <gridLayout className="mt-4 p-4 bg-white rounded-xl" rows="auto, auto">
                                <label className="text-xl font-bold" row="0">
                                    Total: €{totalAmount.toFixed(2)}
                                </label>
                                <button
                                    className="mt-4 p-4 bg-blue-500 text-white rounded-xl text-lg font-bold"
                                    onTap={handleOrder}
                                    row="1"
                                >
                                    Review Order
                                </button>
                            </gridLayout>
                        </stackLayout>
                    )}
                </stackLayout>
            </scrollView>
        );
    }

    return (
        <scrollView style={styles.container}>
            <stackLayout>
                <image
                    src={restaurant.image}
                    className="w-full h-56"
                    stretch="aspectFill"
                />
                
                <stackLayout className="p-4">
                    <gridLayout columns="*, auto" className="mb-4">
                        <stackLayout col="0">
                            <label className="text-2xl font-bold mb-1">{restaurant.name}</label>
                            <label className="text-gray-600">{restaurant.cuisine} • {restaurant.priceRange}</label>
                            <label className="text-gray-600">{restaurant.address}</label>
                        </stackLayout>
                        <stackLayout col="1" className="text-right">
                            <label className="text-2xl font-bold text-blue-500">⭐ {restaurant.rating}</label>
                            <button 
                                className="text-blue-500 font-bold p-2 bg-white rounded"
                                onTap={() => setShowCart(true)}
                            >
                                🛒 Cart ({cartCount})
                            </button>
                        </stackLayout>
                    </gridLayout>
                    
                    <label className="text-xl font-bold mb-4">Menu</label>
                    <stackLayout>
                        {restaurant.menu.map((item) => (
                            <gridLayout
                                key={item.id}
                                className="mb-4 bg-white rounded-xl shadow-lg"
                                rows="auto, auto"
                                columns="auto, *"
                            >
                                <image
                                    src={item.image}
                                    className="w-32 h-32 rounded-l-xl"
                                    stretch="aspectFill"
                                    row="0"
                                    rowSpan="2"
                                    col="0"
                                />
                                <stackLayout className="p-4" row="0" col="1">
                                    <label className="text-lg font-bold">{item.name}</label>
                                    <label className="text-gray-600 text-sm">{item.description}</label>
                                    <label className="text-blue-500 font-bold mt-2">€{item.price.toFixed(2)}</label>
                                </stackLayout>
                                <button
                                    className="m-4 p-2 bg-blue-500 text-white rounded-lg text-center"
                                    row="1"
                                    col="1"
                                    text="Add to Cart"
                                    onTap={() => addToCart(item)}
                                />
                            </gridLayout>
                        ))}
                    </stackLayout>
                    
                    <label className="text-xl font-bold mt-4 mb-4">Reviews</label>
                    {mockReviews.map((review) => (
                        <stackLayout key={review.id} className="mb-3 p-4 bg-white rounded-xl shadow">
                            <gridLayout columns="auto, *">
                                <label className="text-lg font-bold" col="0">⭐ {review.rating}/5</label>
                                <label className="text-gray-400 text-sm text-right" col="1">{review.date}</label>
                            </gridLayout>
                            <label className="text-gray-600 mt-2">{review.comment}</label>
                        </stackLayout>
                    ))}
                </stackLayout>
            </stackLayout>
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5"
    }
});