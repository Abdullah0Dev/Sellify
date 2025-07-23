import React, { useEffect, useRef, useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    COLORS,
    FONTFAMILY,
} from '@/theme/theme';
import { AnimatePresence, MotiView } from 'moti';

import { Icon as CustomIcon } from '@/components/CustomTabBar';
import { FlatList } from 'react-native';
import ProductCard from '@/components/ProductCard';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { categories } from '@/data';
import { useGetProductsQuery } from '@/store/services/api';
import { AppRootState, useAppDispatch, useAppSelector } from '@/store/store';

const CustomerHome = () => {
    const { data: products, isLoading, isError } = useGetProductsQuery(undefined, {
        pollingInterval: 5000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    const dispatch = useAppDispatch();
    const totalItems = useAppSelector((state: AppRootState) =>
        state.cart.cartList
    );
    const [searchText, setSearchText] = useState('');
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: categories[0],
    });
    const ListRef: any = useRef<FlatList | null>(null);
    const filteredProducts = products?.filter(item => categoryIndex.category == "All" ? item : (item.category === categoryIndex.category)) || []
    const filteredProductsWithSearch = filteredProducts?.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.description.toLowerCase().includes(searchText.toLowerCase()))

    // Moti:
    const [step, setStep] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            setStep(1); // Start part 1 after delay
        }, 200); // optional delay before all

        return () => clearTimeout(timer);
    }, []);
    const animatedTitle = `Find Your Next Favorite Fit And Wear It Now`
    const textsAnim = [...animatedTitle.split(' '), '"'].filter((word) => word !== '"')
    // Redux STuff
    const handleAddToCart = (product) => {
        dispatch({
            type: 'cart/addToCart',
            payload: {
                ...product,
                selectedSize: "S"
            }
        });
        // console.log("totalItems", totalItems);

    };
    return (
        <SafeAreaView style={styles.ScreenContainer}>
            <StatusBar barStyle='dark-content' backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                {/* App Header */}
                {/* <HeaderBar /> */}


                <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 3, paddingHorizontal: 30, paddingRight: 12 }}>
                    {textsAnim.map((text, index) => {
                        return (
                            <MotiView
                                key={index}
                                from={{
                                    opacity: 0,
                                    transform: [{ translateY: 10 }],
                                }}
                                animate={{
                                    opacity: 1,
                                    transform: [{ translateY: 0 }],
                                }}
                                onDidAnimate={(key, finished) => {
                                    if (key === 'opacity' && finished && step === 1) {
                                        setStep(2);
                                    }
                                }}
                                transition={{
                                    type: 'spring',
                                    delay: index * 250,
                                }}>
                                <Text style={styles.ScreenTitle}>
                                    {text}
                                </Text>
                            </MotiView>
                        );
                    })}
                </View>

                {/* Search Input */}
                <AnimatePresence>
                    <MotiView
                        onDidAnimate={(key, finished) => {
                            if (key === 'opacity' && finished && step === 2) {
                                setStep(3);
                            }
                        }}
                        from={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.5 }}
                        transition={{
                            type: 'spring',
                            damping: 20,
                            stiffness: 50,
                            delay: 300,
                        }}

                        style={styles.InputContainerComponent}>
                        <TouchableOpacity
                            disabled
                        >
                            <CustomIcon
                                style={styles.InputIcon}
                                name="Search"
                                size={18}
                                color={
                                    searchText.length > 0
                                        ? COLORS.primaryOrangeHex
                                        : COLORS.primaryLightGreyHex
                                }
                            />
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Find Your Product..."
                            value={searchText}
                            onChangeText={text => {
                                setSearchText(text);
                            }}
                            placeholderTextColor={COLORS.primaryLightGreyHex}
                            style={styles.TextInputContainer}
                        />
                        {searchText.length > 0 ? (
                            <TouchableOpacity
                                onPress={() => {
                                    setSearchText('')
                                }}>
                                <CustomIcon
                                    style={styles.InputIcon}
                                    name="X"
                                    size={16}
                                    color={COLORS.primaryLightGreyHex}
                                />
                            </TouchableOpacity>
                        ) : (
                            <></>
                        )}
                    </MotiView>
                </AnimatePresence>
                <View>

                    {/* Category Scroller */}
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.CategoryScrollViewStyle}
                        data={categories}
                        renderItem={({ index, item }) => (
                            <MotiView
                                onDidAnimate={(key, finished) => {
                                    if (key === 'opacity' && finished && step === 3) {
                                        setStep(4);
                                    }
                                }}
                                from={{
                                    opacity: 0,
                                    transform: [{ translateY: 10 }],
                                }}
                                animate={{ opacity: step >= 3 ? 1 : 0, translateY: step >= 3 ? 0 : 10 }}

                                transition={{
                                    type: 'spring',
                                    damping: 12,
                                    stiffness: 150,
                                    delay: index * 200
                                }}
                                key={index.toString()}
                                style={styles.CategoryScrollViewContainer}>
                                <TouchableOpacity
                                    style={styles.CategoryScrollViewItem}
                                    onPress={() => {
                                        ListRef?.current?.scrollToOffset({
                                            animated: true,
                                            offset: 0,
                                        });
                                        setCategoryIndex({ index: index, category: categories[index] });
                                    }}>
                                    <Text
                                        style={[
                                            styles.CategoryText,
                                            categoryIndex.index == index
                                                ? { color: COLORS.primaryOrangeHex }
                                                : {},
                                        ]}>
                                        {item}
                                    </Text>
                                    {categoryIndex.index === index && (
                                        <MotiView
                                            from={{
                                                opacity: 0,
                                                transform: [{ translateY: 10 }],
                                            }}
                                            animate={{
                                                opacity: 1,
                                                transform: [{ translateY: 0 }],
                                            }}
                                            transition={{ type: 'spring', damping: 12 }}
                                            style={styles.ActiveCategory}
                                        />
                                    )}
                                </TouchableOpacity>
                            </MotiView>
                        )}
                    />


                    {/* product Flatlist */}
                    <FlatList
                        ref={ListRef}
                        scrollEnabled={false}

                        ListEmptyComponent={
                            <MotiView
                                from={{
                                    opacity: 0,
                                    transform: [{ translateY: 15 }],
                                }}
                                animate={{ opacity: step >= 4 ? 1 : 0, translateY: step >= 4 ? 0 : 15 }}

                                style={styles.EmptyListContainer}>
                                <Text style={styles.CategoryText}>No Product Available</Text>
                            </MotiView>
                        }
                        showsVerticalScrollIndicator={false}
                        data={filteredProductsWithSearch} //.sort((a, b) => a.name.length - b.name.length)
                        numColumns={2}
                        contentContainerStyle={styles.FlatListContainer}
                        keyExtractor={item => String(item._id)}
                        renderItem={({ index, item }) => {
                            const isLeftColumn = index % 2 === 0
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        router.push({ pathname: `/${item._id}` })
                                        console.log("item._id", item._id);

                                    }}>
                                    <MotiView
                                        key={index}
                                        onDidAnimate={(key, finished) => {
                                            if (key === 'opacity' && finished && step === 4) {
                                                setStep(5);
                                            }
                                        }}
                                        from={{
                                            opacity: 0,
                                            transform: [{ translateY: 15 }],
                                        }}
                                        animate={{
                                            opacity: step >= 4 ? 1 : 0,
                                            translateY: step >= 4 ? 0 : 15,
                                            marginRight: isLeftColumn ? 22 : 0,
                                            marginTop: 22,
                                        }}
                                        transition={{
                                            type: 'spring',
                                            damping: 12,
                                            stiffness: 30,
                                            delay: index * 200,
                                        }}>
                                        <ProductCard
                                            _id={item._id}
                                            image={item.images[0]}
                                            name={item.name}
                                            brand={item.brand}
                                            average_rating={item.average_rating}
                                            price={item.prices[0].price}
                                            onPlusPressed={() => handleAddToCart(item)}
                                        />
                                    </MotiView>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>

            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryWhiteHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    ScreenTitle: {
        fontSize: 28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryBlackHex,
        paddingLeft: 8
    },
    InputContainerComponent: {
        flexDirection: 'row',
        margin: 30,
        borderRadius: 20,
        backgroundColor: COLORS.primaryVeryWhiteHex,
        alignItems: 'center',
    },
    InputIcon: {
        marginHorizontal: 20,
    },
    TextInputContainer: {
        flex: 1,
        height: 20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: 14,
        color: COLORS.primaryGreyHex,
    },
    CategoryScrollViewStyle: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    CategoryScrollViewContainer: {
        paddingHorizontal: 15,
    },
    CategoryScrollViewItem: {
        alignItems: 'center',
    },
    CategoryText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 16,
        color: COLORS.primaryLightGreyHex,
        marginBottom: 4,
    },
    ActiveCategory: {
        height: 10,
        width: 10,
        borderRadius: 10,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    FlatListContainer: {
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    EmptyListContainer: {
        width: Dimensions.get('window').width - 30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 36 * 3.61,
    },
});

export default CustomerHome;
