import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon as CustomIcon} from '@/components/CustomTabBar';
import { icons } from 'lucide-react-native'
type IconNames = keyof typeof icons;

interface BGIconProps {
  name: IconNames;
  color: string;
  size: number;
  BGColor: string;
}

const BGIcon: React.FC<BGIconProps> = ({name, color, size, BGColor}) => {
  return (
    <View style={[styles.IconBG, {backgroundColor: BGColor}]}>
      <CustomIcon style={{}} name={name} color={color} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  IconBG: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default BGIcon;
