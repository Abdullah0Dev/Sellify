import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {
  COLORS,
  FONTFAMILY,
} from '../theme/theme';
import { Icon as CustomIcon } from '@/components/CustomTabBar';
import { AppRootState, useAppDispatch, useAppSelector } from '@/store/store';

interface CartItemProps {
  _id: string;
  name: string;
  prices: any;
  image?: string
  brand?: string
  selectedSize?: string
  onPlusButtonPress?: () => void;
  onMinusButtonPress?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  _id,
  name,
  brand = "test",
  prices,
  selectedSize,
  image = "https://m.media-amazon.com/images/I/51rMZ2QcepL._UY1000_.jpg",
  onPlusButtonPress,
  onMinusButtonPress,
}) => {
  const dispatch = useAppDispatch();
  const CartList = useAppSelector((state: AppRootState) => state.cart.cartList)



  const incrementCartItemQuantityHandler = (id, size) => {
    dispatch({
      type: 'cart/incrementQuantity',
      payload: { id, size }
    });
  };

  const decrementCartItemQuantityHandler = (_id, size) => {
    dispatch({
      type: 'cart/decrementQuantity',
      payload: { id: _id, size: size }
    });
  };
 const mainPrices = prices.filter(item => item.quantity !== 0)
  return (
    <View>
      {mainPrices.length != 1 ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryVeryWhiteHex, COLORS.primaryVeryWhiteHex]}
          style={styles.CartItemLinearGradient}>
          <View style={styles.CartItemRow}>
            <Image source={{ uri: image }} style={styles.CartItemImage} />
            <View style={styles.CartItemInfo}>
              <View>
                <Text style={styles.CartItemTitle}>{name}</Text>
                <Text style={styles.CartItemSubtitle}>
                  {brand}
                </Text>
              </View> 
            </View>
          </View>
          {mainPrices.map((data: any, index: any) => (
            <View
              key={index.toString()}
              style={styles.CartItemSizeRowContainer}>
              <View style={styles.CartItemSizeValueContainer}>
                <View style={styles.SizeBox}>
                  <Text
                    style={[
                      styles.SizeText,
                      {
                        fontSize: 16,
                      },
                    ]}>
                    {data.size}
                  </Text>
                </View>
                <Text style={styles.SizeCurrency}>
                  {data.currency}
                  <Text style={styles.SizePrice}> {data.price}</Text>
                </Text>
              </View>
              <View style={styles.CartItemSizeValueContainer}>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => dispatch({
                    type: 'cart/decrementQuantity',
                    payload: { id: _id, size: data.size }
                  })}
                >
                  <CustomIcon
                    name="Minus"
                    color={COLORS.primaryWhiteHex}
                    size={10}
                  />
                </TouchableOpacity>
                <View style={styles.CartItemQuantityContainer}>
                  <Text style={styles.CartItemQuantityText}>
                    {data.quantity ?? 0}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => dispatch({
                    type: 'cart/incrementQuantity',
                    payload: { id: _id, size: data.size }
                  })}>
                  <CustomIcon
                    name="Plus"
                    color={COLORS.primaryWhiteHex}
                    size={10}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryVeryWhiteHex, COLORS.primaryVeryWhiteHex]}
          style={styles.CartItemSingleLinearGradient}>
          <View>
            <Image
              source={{ uri: image }}
              style={styles.CartItemSingleImage}
            />
          </View>
          <View style={styles.CartItemSingleInfoContainer}>
            <View>
              <Text style={styles.CartItemTitle}>{name}</Text>
              <Text style={styles.CartItemSubtitle}>{brand}</Text>
            </View>
            <View style={styles.CartItemSingleSizeValueContainer}>
              <View style={styles.SizeBox}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize: 16,
                    },
                  ]}>
                  {mainPrices[0].size}
                </Text>
              </View>
              <Text style={styles.SizeCurrency}>
                $
                <Text style={styles.SizePrice}> {mainPrices[0].price}</Text>
              </Text>
            </View>
            <View style={styles.CartItemSingleQuantityContainer}>
              <TouchableOpacity
                style={styles.CartItemIcon}
                onPress={() => dispatch({
                  type: 'cart/decrementQuantity',
                  payload: { id: _id, size: selectedSize }
                })}>
                <CustomIcon
                  name="Minus"
                  color={COLORS.primaryWhiteHex}
                  size={10}
                />
              </TouchableOpacity>
              <View style={styles.CartItemQuantityContainer}>
                <Text style={styles.CartItemQuantityText}>
                  {mainPrices[0].quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.CartItemIcon}
                onPress={() => dispatch({
                  type: 'cart/incrementQuantity',
                  payload: { id: _id, size: selectedSize }
                })}>
                <CustomIcon
                  name="Plus"
                  color={COLORS.primaryWhiteHex}
                  size={10}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  CartItemLinearGradient: {
    flex: 1,
    gap: 12,
    padding: 12,
    borderRadius: 25,
  },
  CartItemRow: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
    // backgroundColor: '#338'
  },
  CartItemImage: {
    height: 90,
    width: 130,
    borderRadius: 10,
  },
  CartItemInfo: {
    flex: 1,
    paddingVertical: 4,
    justifyContent: 'space-between',
  },
  CartItemTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 18,
    color: COLORS.primaryDarkGreyHex,
  },
  CartItemSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 12,
    color: COLORS.secondaryLightGreyHex,
  },
  CartItemRoastedContainer: {
    height: 50,
    width: 50 * 2 + 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryWhiteHex,
  },
  CartItemRoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 10,
    color: COLORS.primaryWhiteHex,
  },
  CartItemSizeRowContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  CartItemSizeValueContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SizeBox: {
    backgroundColor: COLORS.primaryWhiteHex,
    height: 40,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryLightGreyHex + 'AA',
  },
  SizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 18,
    color: COLORS.primaryOrangeHex,
  },
  SizePrice: {
    color: COLORS.primaryGreyHex,
  },
  CartItemIcon: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: 12,
    borderRadius: 10,
  },
  CartItemQuantityContainer: {
    backgroundColor: COLORS.primaryVeryWhiteHex,
    width: 80,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    paddingVertical: 4,
  },
  CartItemQuantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 16,
    color: COLORS.primaryGreyHex,
  },
  CartItemSingleLinearGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderRadius: 25,
  },
  CartItemSingleImage: {
    height: 150,
    width: 150,
    borderRadius: 20,
  },
  CartItemSingleInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  CartItemSingleSizeValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 12,

  },
  CartItemSingleQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default CartItem;
