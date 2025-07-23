import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {   useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS} from '@/theme/theme';
import EmptyListAnimation from '@/components/EmptyListAnimation';
import PaymentFooter from '@/components/PaymentFooter';
import CartItem from '@/components/CartItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { AppRootState, useAppDispatch, useAppSelector } from '@/store/store';

// cart, store, payment
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const CustomerCart = () => {
    const tabBarHeight = useBottomTabBarHeight();
    const dispatch = useAppDispatch();
    const CartList = useAppSelector((state: AppRootState) => state.cart.cartList)
    const CartPrice = useAppSelector((state: AppRootState) => state.cart.totalPrice)
    const buttonPressHandler = () => {
        // router.navigate('/customer/orders')
        // // navigation.navigate('orders', { amount: CartPrice });
        // console.log("going to order now");
        // console.log("CartList", CartList.map((item) => item.prices));

        dispatch({
            type: 'cart/clearCart',
            payload: {}
        });
    };


    // Moti:
    const [step, setStep] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            setStep(1); // Start part 1 after delay
        }, 200); // optional delay before all

        return () => clearTimeout(timer);
    }, []);
    // console.log("CartPrice", CartList[0].prices.filter(item => item.quantity !== 0));
    return (
        <SafeAreaView style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View
                    style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        {CartList.length == 0 ? (
                            <EmptyListAnimation title={'Cart is Empty'} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {CartList.map((data, index) => (
                                    <MotiView
                                        key={index}
                                        from={{
                                            opacity: 0,
                                            transform: [{ translateY: 15 }],
                                        }}
                                        animate={{ opacity: 1, translateY: 0 }}
                                        transition={{
                                            type: 'spring',
                                            damping: 12,
                                            stiffness: 30,
                                            delay: index * 200,
                                        }}>


                                        <CartItem
                                            _id={String(data._id)}
                                            name={data.name}
                                            prices={data.prices}
                                            brand={data.brand}
                                            image={data.images[0]}
                                            selectedSize={data.selectedSize}
                                        />
                                    </MotiView>
                                ))}
                            </View>
                        )}
                    </View>

                    {CartList.length != 0 ? (
                        <View style={{paddingVertical: 19}}>
                            <PaymentFooter
                                buttonPressHandler={buttonPressHandler}
                                buttonTitle="Order Now"
                                price={String(CartPrice)}
                            />
                        </View>
                    ) : (
                        <></>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryWhiteHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
        minHeight: SCREEN_HEIGHT * 0.9,
    },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between',
        // backgroundColor: "#3de"
    },
    ItemContainer: {
        flex: 1,
        // height: "100%",
        // backgroundColor: "#f3e"
    },
    ListItemContainer: {
        paddingHorizontal: 20,
        gap: 20,
    },
});

export default CustomerCart;
