import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { mockRestaurants } from "../../data/mockData";

export function HomeScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState("");

    return (
        <gridLayout rows="auto, *" style={styles.container}>
            <searchBar
                row="0"
                className="w-full p-4"
                hint="Search restaurants..."
                text={searchQuery}
                onTextChange={(args) => setSearchQuery(args.value)}
            />
            
            <scrollView row="1" className="w-full">
                <stackLayout className="p-4">
                    {mockRestaurants.map((restaurant) => (
                        <gridLayout
                            key={restaurant.id}
                            className="mb-6 bg-white rounded-2xl shadow-lg"
                            rows="auto, auto"
                            columns="*, auto"
                            onTap={() => navigation.navigate("Restaurant", { restaurant })}
                        >
                            <image
                                src={restaurant.image}
                                className="w-full h-48 rounded-t-2xl"
                                stretch="aspectFill"
                                row="0"
                                col="0"
                                colSpan="2"
                            />
                            
                            <stackLayout className="p-4" row="1" col="0">
                                <gridLayout columns="*, auto" className="mb-2">
                                    <label className="text-xl font-bold" col="0">{restaurant.name}</label>
                                    <label className="text-lg font-bold text-blue-500" col="1">
                                        ⭐ {restaurant.rating}
                                    </label>
                                </gridLayout>
                                <label className="text-gray-600 mb-1">{restaurant.cuisine}</label>
                                <label className="text-gray-500">
                                    🕒 {restaurant.deliveryTime} min • {restaurant.priceRange}
                                </label>
                            </stackLayout>
                        </gridLayout>
                    ))}
                </stackLayout>
            </scrollView>
            
            <absoluteLayout className="w-16 h-16" horizontalAlignment="right" verticalAlignment="bottom" margin="16">
                <button
                    className="w-full h-full bg-blue-500 rounded-full text-white text-2xl"
                    onTap={() => navigation.navigate("Profile")}
                >
                    👤
                </button>
            </absoluteLayout>
        </gridLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#f5f5f5"
    }
});