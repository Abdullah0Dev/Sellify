import { View, Text, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { icons } from 'lucide-react-native'
import Animated, { FadeInRight, FadeOutRight, LinearTransition } from 'react-native-reanimated';
import { MotiProps, MotiView } from 'moti';
import { motifySvg } from 'moti/svg';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/theme/theme';
import { router } from 'expo-router';
import { AppRootState, useAppSelector } from '@/store/store';

type IconNames = keyof typeof icons;
type TabItem = {
    icon: IconNames;
    label: string;
    route: string
}
type TabsProps = BottomTabBarProps & {
    data: TabItem[];
    selectedIndex: number;
    onChange: (index: number) => void;
    activeColor?: string;
    inActiveColor?: string;
    activeBackgroundColor?: string;
    inactiveBackgroundColor?: string;
}
type IconProp = {
    name: IconNames
    size: number;
    color?: string;
    style?: any
} & MotiProps

export function Icon({ name, color, size = 20, style, ...rest }: IconProp) {
    const IconComponent = motifySvg(icons[name])();
    return <IconComponent color={color} size={size} style={style} {...rest} />
}

const CustomTabBar: React.FC<TabsProps> = ({
    data,
    selectedIndex,
    onChange,
    activeColor = "#FFFFFF",
    inActiveColor = "#1D1D1D",
    activeBackgroundColor = "#D17842",
    inactiveBackgroundColor = "#FFFFFF",
    state,
    navigation,
}) => {

    const _spacing = 4;
    const { bottom } = useSafeAreaInsets();
    const CartList = useAppSelector((state: AppRootState) => state.cart.cartList);
    console.log("CartList length", CartList.length);

    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                marginBottom: bottom,
                marginHorizontal: Dimensions.get('window').width * 0.05,
                alignItems: 'center',
                justifyContent: 'space-around',
                borderRadius: 50,
                paddingBlock: 12,
            }}>
            {
                data.map((item, index) => {
                    const isSelected = state.index === index

                    return (
                        <MotiView
                            key={index}
                            layout={LinearTransition.springify().damping(80).stiffness(200)}
                            animate={{
                                backgroundColor: isSelected ? activeBackgroundColor : inactiveBackgroundColor,
                                borderRadius: 50,
                                zIndex: isSelected ? 20 : 10,
                                overflow: 'hidden'
                            }}
                        >
                            {
                                item.route === 'cart' && CartList.length > 0 && !isSelected && (

                                    <MotiView
                                        layout={LinearTransition.springify().damping(80).stiffness(200)}
                                        animate={{
                                            backgroundColor: `#EC3458`,
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            width: 22,
                                            height: 22,
                                            borderRadius: 50,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',

                                        }}
                                    >
                                        <Text style={{ color: COLORS.primaryVeryWhiteHex }}>{CartList.length}</Text>
                                    </MotiView>
                                )
                            }

                            <Pressable
                                onPress={() => {
                                    onChange(index)
                                    // navigation.navigate(item.route)
                                    router.navigate(`/(tabs)/${item.route}`)
                                }}
                                style={{
                                    paddingBlock: _spacing * 3,
                                    paddingHorizontal: _spacing * 5,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: _spacing,
                                    flexDirection: "row",
                                }}
                            >

                                <Icon name={item.icon}
                                    animate={{
                                        color: isSelected ? activeColor : inActiveColor,

                                    }}
                                />
                                {
                                    isSelected && (
                                        <Animated.Text
                                            entering={FadeInRight.springify().damping(80).stiffness(200)}
                                            exiting={FadeOutRight.springify().damping(80).stiffness(200)}

                                            style={{
                                                color: isSelected ?
                                                    activeColor : inActiveColor,
                                                fontSize: 15,
                                                fontWeight: "medium"
                                            }} >
                                            {item.label}</Animated.Text>
                                    )
                                }
                            </Pressable>
                        </MotiView>

                    )
                })
            }
        </View >
    )
}

export default CustomTabBar