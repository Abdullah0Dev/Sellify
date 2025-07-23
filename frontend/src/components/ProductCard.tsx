import React, { memo, useEffect, useMemo } from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import {
  COLORS,
  FONTFAMILY,
} from '../theme/theme';
import { Icon as CustomIcon } from '@/components/CustomTabBar';
import BGIcon from './BGIcon';
import { AppRootState, useAppSelector } from '@/store/store';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

const sampleData = {
  name: "Modern Slim ",
  description: "Elegant slim-fit suit crafted from premium wool blend. Perfect for formal occasions and business events.",
  images: [
    "https://m.media-amazon.com/images/I/51rMZ2QcepL._UY1000_.jpg",
    "https://i5.walmartimages.com/seo/Wehilion-Mens-Suits-Set-Slim-Fit-Men-3-Piece-Dress-Suit-Prom-Blazer-Wedding-Formal-Jacket-Vest-Pants-Navy-Blue-M_ce590b9b-405f-4948-af6a-a817cd66f9cd.4e404934c089dc5fabeb4616f32245e6.jpeg",
  ],
  prices: [
    { size: "S", price: 149.99 },
    { size: "M", price: 169.99 },
    { size: "L", price: 189.99 }
  ],
  category: "Suits",
  brand: "Zara",
  average_rating: 4.8,
  ratings_count: "234",
  quantity: 50
}
export type ProductCardType = {
  _id?: string;
  image?: string
  name?: string
  brand?: string
  average_rating?: number | string;
  price?: number
  onPlusPressed?: (() => void)
}
const ProductCard: React.FC<ProductCardType> = ({
  _id,
  image = sampleData.images[0] ?? "",
  name = sampleData.name ?? "",
  brand = sampleData.brand ?? "",
  average_rating = sampleData.average_rating ?? 0,
  price = sampleData.prices[0].price ?? 0,
  onPlusPressed,
}) => {
  const opacity = useSharedValue(1)
  const inCard = useAppSelector((state: AppRootState) =>
    state.cart.cartList.some(item => item._id === _id)
  );

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
  useEffect(() => {
    opacity.value = withSpring(inCard ? 0.5 : 1)
  }, [inCard])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value, //change the height property of the component
    };
  })


  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.CardLinearGradientContainer}
      colors={[COLORS.primaryVeryWhiteHex, COLORS.primaryVeryWhiteHex + '40']}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.CardImageBG}
        resizeMode="cover">
        <View style={styles.CardRatingContainer}>
          <CustomIcon
            name={'Star'}
            color={COLORS.primaryOrangeHex}
            size={16}
          />
          <Text style={styles.CardRatingText}>{Number(average_rating).toFixed(1)}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CardTitle}>{name.length <= 22 ? name : name.slice(0, 22) + "..." }</Text>
      <Text style={styles.CardSubtitle}>{brand}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}>
          $ <Text style={styles.CardPrice}>{price}</Text>
        </Text>
        <AnimatedTouchableOpacity
          disabled={inCard}
          style={animatedStyles}
          onPress={onPlusPressed}>
          <BGIcon
            color={COLORS.primaryWhiteHex}
            name={'Plus'}
            BGColor={COLORS.primaryOrangeHex}
            size={16}
          />
        </AnimatedTouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardLinearGradientContainer: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 25,
    width: 175,
    // minHeight: 300,
  },
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
  },
  CardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 15,
    position: 'absolute',
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 0,
    right: 0,
  },
  CardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: 14,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryBlackHex,
    fontSize: 16,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.secondaryLightGreyHex,
    fontSize: 10,
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
  },
});

export default ProductCard // memo(CoffeeCard);
