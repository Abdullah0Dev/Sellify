import "../global.css";
import { Slot } from "expo-router";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "react-native-reanimated";
import {
    configureReanimatedLogger,
    ReanimatedLogLevel,
} from 'react-native-reanimated';
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store, persistor } from '@/store/store'
import { PersistGate } from "redux-persist/integration/react";

// This is the default configuration
configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in strict mode by default
}); 
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        "Poppins-Black": require("@/assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("@/assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("@/assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("@/assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("@/assets/fonts/Poppins-Thin.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    } 
    return (
        <GestureHandlerRootView >
                <Provider store={store} >
                    <PersistGate loading={null} persistor={persistor}>
                        <Stack screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="(tabs)" />
                            <Stack.Screen name="[product]" />
                        </Stack>
                    </PersistGate>
                </Provider>
                <StatusBar style="dark" />
        </GestureHandlerRootView >
    )
}
