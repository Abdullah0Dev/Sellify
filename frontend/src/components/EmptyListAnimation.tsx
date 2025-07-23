import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { COLORS, FONTFAMILY } from '../theme/theme';

interface EmptyListAnimationProps {
  title: string;
}

const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({ title }) => {
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        style={styles.LottieStyle}
        source={{ uri: `https://lottie.host/1ab06b3e-0271-4ed9-8fc0-ee720b39b005/0YMByi583s.lottie` }}
        autoPlay
        loop
      />
      <Text style={styles.LottieText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  EmptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  LottieStyle: {
    height: 300,
  },
  LottieText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});

export default EmptyListAnimation;
