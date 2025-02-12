import * as React from "react";
import { StyleSheet } from "react-nativescript";

export function ProfileScreen({ navigation }) {
    return (
        <scrollView style={styles.container}>
            <stackLayout className="p-4">
                <stackLayout className="mb-6 items-center">
                    <label className="text-6xl mb-2">👤</label>
                    <label className="text-xl font-bold">John Doe</label>
                    <label className="text-gray-600">john.doe@example.com</label>
                </stackLayout>
                
                <button
                    className="p-4 mb-3 bg-white rounded"
                    onTap={() => navigation.navigate("Address")}
                >
                    📍 Manage Addresses
                </button>
                
                <button
                    className="p-4 mb-3 bg-white rounded"
                >
                    🛍️ Order History
                </button>
                
                <button
                    className="p-4 mb-3 bg-white rounded"
                >
                    ⭐ My Reviews
                </button>
                
                <button
                    className="p-4 mb-3 bg-white rounded"
                >
                    ⚙️ Settings
                </button>
                
                <button
                    className="p-4 mt-4 bg-red-500 text-white rounded"
                    onTap={() => navigation.replace("Auth")}
                >
                    Logout
                </button>
            </stackLayout>
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5"
    }
});