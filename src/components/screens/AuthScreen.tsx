import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";

export function AuthScreen({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = () => {
        // Simulate login
        navigation.replace("Home");
    };

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-3xl mb-8 font-bold">Welcome Back</label>
            
            <textField
                className="w-4/5 p-4 mb-4 bg-white rounded"
                hint="Email"
                keyboardType="email"
                text={email}
                onTextChange={(args) => setEmail(args.value)}
            />
            
            <textField
                className="w-4/5 p-4 mb-6 bg-white rounded"
                hint="Password"
                secure={true}
                text={password}
                onTextChange={(args) => setPassword(args.value)}
            />
            
            <button
                className="w-4/5 p-4 mb-4 bg-blue-500 text-white rounded"
                onTap={handleLogin}
            >
                Login
            </button>
            
            <button
                className="w-4/5 p-4 bg-gray-200 rounded"
                onTap={() => {}}
            >
                Create Account
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5"
    }
});