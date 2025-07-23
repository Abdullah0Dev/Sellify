import React from 'react';
import { StyleSheet,  View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS  } from '../theme/theme';
import { Icon as CustomIcon } from '@/components/CustomTabBar';
import { icons } from 'lucide-react-native'
type IconNames = keyof typeof icons;


interface GradientBGIconProps {
  name: IconNames;
  color: string;
  size: number;
}

const GradientBGIcon: React.FC<GradientBGIconProps> = ({ name, color, size }) => {
  return (
    <View style={styles.Container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[COLORS.primaryWhiteHex, COLORS.primaryVeryWhiteHex]}
        style={styles.LinearGradientBG}>
        <CustomIcon name={name} size={22} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow: 'hidden',
  },
  LinearGradientBG: {
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GradientBGIcon;
