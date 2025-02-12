import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { Frame } from "@nativescript/core";

export function OrderTrackingScreen({ route, navigation }) {
    const { restaurantName, orderStatus, cartItems, totalAmount } = route.params;
    const [status, setStatus] = React.useState(orderStatus);

    React.useEffect(() => {
        // Simulate order status updates
        const statuses = ["confirmed", "preparing", "delivering", "delivered"];
        let currentIndex = statuses.indexOf(orderStatus);

        const interval = setInterval(() => {
            if (currentIndex < statuses.length - 1) {
                currentIndex++;
                setStatus(statuses[currentIndex]);
            } else {
                // Clear the interval when the order is delivered
                clearInterval(interval);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleFinishOrder = () => {
        // Navigate back to the home screen
        navigation.navigate("Home");
    };

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-xl font-bold mb-4">{restaurantName}</label>
            
            {/* Order Summary */}
            <stackLayout className="w-4/5 mb-6 p-4 bg-white rounded-xl">
                <label className="font-bold mb-2">Order Summary:</label>
                {cartItems?.map((item) => (
                    <label key={item.id} className="text-gray-600">
                        {item.quantity}x {item.name} - €{(item.price * item.quantity).toFixed(2)}
                    </label>
                ))}
                <label className="font-bold mt-2">Total: €{totalAmount?.toFixed(2)}</label>
            </stackLayout>
            
            <stackLayout className="w-4/5">
                {["confirmed", "preparing", "delivering", "delivered"].map((step, index) => (
                    <gridLayout
                        key={step}
                        className="mb-4"
                        columns="auto, *"
                        rows="auto, auto"
                    >
                        <label
                            className={`w-8 h-8 rounded-full text-center ${
                                status === step ? "bg-blue-500 text-white" : 
                                statuses.indexOf(status) > index ? "bg-green-500 text-white" : "bg-gray-200"
                            }`}
                            row="0"
                            col="0"
                            verticalAlignment="center"
                        >
                            {statuses.indexOf(status) > index ? "✓" : (index + 1)}
                        </label>
                        
                        <stackLayout row="0" col="1" className="ml-4">
                            <label className="font-bold">{step.charAt(0).toUpperCase() + step.slice(1)}</label>
                            <label className="text-gray-600">
                                {status === step ? "In progress..." : 
                                 statuses.indexOf(status) > index ? "Completed" : "Waiting"}
                            </label>
                        </stackLayout>
                        
                        {index < 3 && (
                            <label
                                className={`w-0.5 h-8 ml-4 ${
                                    status === step || statuses.indexOf(status) > index ? "bg-blue-500" : "bg-gray-200"
                                }`}
                                row="1"
                                col="0"
                            />
                        )}
                    </gridLayout>
                ))}
            </stackLayout>

            {status === "delivered" && (
                <button
                    className="mt-8 p-4 bg-blue-500 text-white rounded-xl text-lg font-bold w-4/5"
                    onTap={handleFinishOrder}
                >
                    Back to Restaurants
                </button>
            )}
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f5f5f5"
    }
});