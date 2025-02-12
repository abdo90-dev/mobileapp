import * as React from "react";
import { StyleSheet } from "react-nativescript";

export function AddressScreen() {
    const [addresses, setAddresses] = React.useState([
        { id: '1', label: 'Home', street: '123 Rue de Paris', city: 'Paris', postalCode: '75001' },
        { id: '2', label: 'Work', street: '456 Avenue des Champs', city: 'Paris', postalCode: '75008' }
    ]);

    return (
        <scrollView style={styles.container}>
            <stackLayout className="p-4">
                {addresses.map((address) => (
                    <gridLayout
                        key={address.id}
                        className="mb-3 p-4 bg-white rounded"
                        columns="*, auto"
                    >
                        <stackLayout col="0">
                            <label className="font-bold">{address.label}</label>
                            <label className="text-gray-600">{address.street}</label>
                            <label className="text-gray-600">{address.city}, {address.postalCode}</label>
                        </stackLayout>
                        <button
                            className="text-red-500"
                            col="1"
                            onTap={() => {}}
                        >
                            ✕
                        </button>
                    </gridLayout>
                ))}
                
                <button
                    className="p-4 mt-4 bg-blue-500 text-white rounded"
                >
                    + Add New Address
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