import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  COLORS,
  FONTFAMILY,
} from '../theme/theme';

interface PriceProps {
  price: string;
}

interface PaymentFooterProps {
  price: string;
  buttonPressHandler: any;
  buttonTitle: string;
  loading?: boolean
}

const PaymentFooter: React.FC<PaymentFooterProps> = ({
  price,
  buttonPressHandler,
  buttonTitle,
  loading,
}) => {
  return (
    <View style={styles.PriceFooter}>
      <View style={styles.PriceContainer}>
        <Text style={styles.PriceTitle}>Price</Text>
        <Text style={styles.PriceText}>
          $ <Text style={styles.Price}>{Number(price).toFixed(0)}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.PayButton, { opacity: loading ? 0.5 : 1 }]}
        onPress={() => buttonPressHandler()}>
        <Text style={styles.ButtonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  PriceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
  PriceContainer: {
    alignItems: 'center',
    width: 100,
  },
  PriceTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 14,
    color: COLORS.secondaryLightGreyHex,
  },
  PriceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 24,
    color: COLORS.primaryOrangeHex,
  },
  Price: {
    color: COLORS.primaryGreyHex,
  },
  PayButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36 * 2,
    borderRadius: 20,
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 18,
    color: COLORS.primaryWhiteHex,
  },
});

export default PaymentFooter;
