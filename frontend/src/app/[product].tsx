import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import ImageSlider from '@/components/common/ImageSlider';
import { Icon as CustomIcon } from '@/components/CustomTabBar';
import {   COLORS, FONTFAMILY  } from '@/theme/theme';
import PaymentFooter from '@/components/PaymentFooter';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBGIcon from '@/components/GradientBGIcon';
import { AnimatePresence, MotiText, MotiView } from 'moti';

import { MotiPressable } from 'moti/interactions';
import { useGetProductsQuery } from '@/store/services/api';
import { AppRootState, useAppDispatch, useAppSelector } from '@/store/store';
// when user press on add to cart he should navigate to cart
const ProductDetails = () => {
    const { product } = useLocalSearchParams();
    const { data: products, isLoading, isError } = useGetProductsQuery();
    const productItem = products.filter((itm) => itm._id === product)[0]
    const [price, setPrice] = useState(productItem.prices[0]);
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch();
    const totalItems = useAppSelector((state: AppRootState) =>
        state.cart.cartList
    );

    // Moti:
    const [step, setStep] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            setStep(1); // Start part 1 after delay
        }, 200); // optional delay before all

        return () => clearTimeout(timer);
    }, []);
    const animatedTitle = productItem.name
    const textsAnim = [...animatedTitle.split(' '), '"'].filter((word) => word !== '"') // return modified array

    // Redux
    const handleAddToCart = (product, size: "S" | "M" | "L") => {
        setLoading(true)
        dispatch({
            type: 'cart/addToCart',
            payload: {
                ...product,
                selectedSize: size
            }
        });
        router.navigate('/cart')
        setLoading(false)
        console.log("totalItems", totalItems);
    };
    return (
        <SafeAreaView style={styles.ScreenContainer}>
            {/* <StatusBar backgroundColor={COLORS.primaryBlackHex} /> */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>

                <TouchableOpacity
                    style={styles.ImageHeaderBarContainerWithBack}
                    onPress={() => {
                        router.back()
                    }}>
                    <CustomIcon
                        name="ArrowLeft"
                        color={COLORS.primaryLightGreyHex}
                        size={16}
                    />
                </TouchableOpacity>
                <MotiView
                    onDidAnimate={(key, finished) => {
                        if (key === 'opacity' && finished && step === 1) {
                            setStep(2); // Trigger part 2
                        }
                    }}
                    from={{
                        opacity: 0,
                        transform: [{ translateY: 10 }],
                    }}
                    animate={{
                        opacity: 1,
                        transform: [{ translateY: 0 }],
                    }}
                    transition={{
                        type: 'spring',
                        damping: 12,
                        stiffness: 150,
                    }}
                >

                    <ImageSlider
                        imageList={productItem.images}
                    />
                </MotiView>

                {/* details text */}

                <MotiView
                    onDidAnimate={(key, finished) => {
                        if (key === 'opacity' && finished && step === 2) {
                            setStep(3); // Trigger part 2
                        }
                    }}
                    from={{
                        opacity: 0,
                        transform: [{ translateY: 10 }],
                    }}
                    animate={{ opacity: step >= 2 ? 1 : 0, translateY: step >= 2 ? 0 : 10 }}
                    transition={{
                        type: 'spring',
                        damping: 12,
                        stiffness: 150,
                    }}
                    style={{ marginHorizontal: 12, }}>

                    <View style={styles.CardRatingContainer}>
                        <View style={styles.CardRatingContainerRow}>

                            <CustomIcon
                                name={'Star'}
                                color={COLORS.primaryOrangeHex}
                                size={16}
                            />
                            <Text style={styles.CardRatingText}>{productItem.average_rating}</Text>
                        </View>
                        <Text style={styles.CardPriceCurrency}>
                            $ <Text style={styles.CardPrice}>{productItem.prices[0].price}</Text>
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingRight: 30 }}>
                        {textsAnim.map((text, index) => {
                            return (
                                <MotiView
                                    key={index}
                                    from={{
                                        opacity: 0,
                                        transform: [{ translateY: 10 }],
                                    }}
                                    animate={{ opacity: step >= 3 ? 1 : 0, translateY: step >= 3 ? 0 : 10 }}
                                    onDidAnimate={(key, finished) => {
                                        if (key === 'opacity' && index == textsAnim.length - 1 && finished && step === 3) {
                                            setStep(4); // Trigger part 2
                                        }
                                    }}
                                    transition={{
                                        type: 'spring',
                                        delay: index * 250,
                                    }}>
                                    <Text style={styles.CardTitle}>
                                        {text}
                                    </Text>
                                </MotiView>
                            );
                        })}
                    </View>
                </MotiView>


                <AnimatePresence>
                    <View style={styles.FooterInfoArea}>
                        <MotiText
                            from={{
                                opacity: 0,
                                transform: [{ translateY: 10 }],
                            }}
                            animate={{ opacity: step >= 4 ? 1 : 0, translateY: step >= 4 ? 0 : 10 }}
                            onDidAnimate={(key, finished) => {
                                if (key === 'opacity' && finished && step === 4) {
                                    setStep(5); // Trigger part 2
                                }
                            }}
                            style={styles.InfoTitle}>Description</MotiText>
                        <MotiText
                            from={{
                                opacity: 0,
                            }}
                            animate={{ opacity: step >= 5 ? 1 : 0 }}
                            transition={{
                                type: 'spring',
                                damping: 12,
                                stiffness: 100,
                                delay: 500
                            }}
                            onDidAnimate={(key, finished) => {
                                if (key === 'opacity' && finished && step === 5) {
                                    setStep(6); // Trigger part 2
                                }
                            }}
                            style={styles.DescriptionText}>
                            {productItem.description}
                        </MotiText>
                        <MotiText
                            from={{
                                opacity: 0,
                                transform: [{ translateY: 10 }],
                            }}
                            animate={{ opacity: step >= 6 ? 1 : 0, translateY: step >= 6 ? 0 : 10 }}
                            onDidAnimate={(key, finished) => {
                                if (key === 'opacity' && finished && step === 6) {
                                    setStep(7); // Trigger part 2
                                }
                            }}
                            style={styles.InfoTitle}>Size</MotiText>
                        <View
                            style={styles.SizeOuterContainer}>
                            {productItem.prices.map((data: any, index) => {
                                return (
                                    <MotiPressable
                                        from={{
                                            opacity: 0,
                                            transform: [{ translateY: 10 }],
                                            width: Dimensions.get('screen').width * 0.28,
                                        }}
                                        animate={{ opacity: step >= 7 ? 1 : 0, translateY: step >= 7 ? 0 : 10 }}

                                        transition={{
                                            type: 'spring',
                                            damping: 12,
                                            stiffness: 150,
                                            delay: index * 200
                                        }}
                                        key={data.size}
                                        onPress={() => {
                                            setPrice(data);
                                        }}
                                        style={[
                                            styles.SizeBox,
                                            {
                                                borderColor:
                                                    data.size == price.size
                                                        ? COLORS.primaryOrangeHex
                                                        : COLORS.primaryDarkGreyHex,
                                            },
                                        ]}>
                                        <Text
                                            style={[
                                                styles.SizeText,
                                                {
                                                    fontSize: 16,
                                                    color:
                                                        data.size == price.size
                                                            ? COLORS.primaryOrangeHex
                                                            : COLORS.secondaryLightGreyHex,
                                                },
                                            ]}>
                                            {data.size}
                                        </Text>
                                    </MotiPressable>
                                )
                            })}
                        </View>
                    </View>

                </AnimatePresence>
                <PaymentFooter
                    loading={loading}
                    price={String(price.price)}
                    buttonTitle="Add to Cart"
                    buttonPressHandler={() => handleAddToCart(productItem, price.size)}
                />
            </ScrollView>
        </SafeAreaView >
    );
};

export default ProductDetails

const styles = StyleSheet.create({
    CardLinearGradientContainer: {
        paddingVertical: 15,
        paddingHorizontal: 18,
        borderRadius: 25,
    },
    CardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: `rgba(12,15,20,0.03)`,
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 10,
        paddingVertical: 15,
        position: 'relative',
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    CardRatingContainerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    CardRatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryLightGreyHex,
        lineHeight: 22,
        fontSize: 14,
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryBlackHex,
        fontSize: 22,
        paddingLeft: 4,

    },
    CardDescription: {
        fontFamily: FONTFAMILY.poppins_regular,
        color: COLORS.secondaryGreyHex,
        fontSize: 16,
    },
    CardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: 18,
    },
    CardPrice: {
        color: COLORS.primaryBlackHex,
        fontSize: 24,

    },
    ImageHeaderBarContainerWithBack: {
        marginTop: 18,
        padding: 12,
        position: 'absolute',
        zIndex: 1000,
        flexDirection: 'row',
        alignItems: 'center',
        top: -5,
        left: 15,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        borderRadius: 12,
        justifyContent: 'center',
        backgroundColor: COLORS.primaryWhiteHex,
    },
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryWhiteHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    FooterInfoArea: {
        padding: 20,
    },
    InfoTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 16,
        color: COLORS.primaryBlackHex,
        marginBottom: 10,
    },
    DescriptionText: {
        letterSpacing: 0.5,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: 14,
        color: COLORS.primaryBlackHex,
        marginBottom: 30,
    },
    SizeOuterContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
    },
    SizeBox: {
        flex: 1,
        backgroundColor: COLORS.primaryVeryWhiteHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: 24 * 2,
        borderRadius: 10,
        borderWidth: 2,
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
    },
});

