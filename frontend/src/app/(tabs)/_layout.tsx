import CustomTabBar from "@/components/CustomTabBar";
import { Tabs } from "expo-router";
import { useState } from "react";

export default function CustomerLayout() {
    const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <Tabs initialRouteName="index"

            tabBar={(props) => <CustomTabBar
                data={[
                    { icon: "House", label: "Home", route: "" },
                    { icon: "ShoppingCart", label: "Cart", route: "cart" },
                    { icon: "User", label: "Profile", route: "profile" },
                ]}
                onChange={(index) => setSelectedIndex(index)}
                selectedIndex={selectedIndex}
                {...props}
            />} // 👈 custom tab

            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="cart" />
            <Tabs.Screen name="profile" />
        </Tabs>
    )
}
