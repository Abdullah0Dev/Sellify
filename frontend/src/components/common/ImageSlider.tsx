import { View, } from 'react-native'
import React from 'react'
import ImageSliderPackage from '@coder-shubh/react-native-image-slider';

interface ImageSliderProp {
    imageList?: string[]
}
const ImageSlider: React.FC<ImageSliderProp> = ({ imageList = ['https://cdn.dribbble.com/userupload/10291270/file/original-4ac4a4375883adc4ce68959aaa6e4e68.png', 'https://cdn.dribbble.com/userupload/10654559/file/original-24a0c08be65d8301b08cbb0ed3c5bcae.png'] }) => {
    return (
        <View style={{ position: 'relative', paddingBlockEnd: 20 }}>
            <ImageSliderPackage
                testID="imageSlider_testID"
                images={imageList}
                imageHeight={290}
                dotSize={10}
                dotColor='silver'
                activeDotColor='blue'
                showNavigationButtons={false}
                showIndicatorDots={true}
                extrapolate='clamp'
                imageLabel={false}
                autoSlideInterval={50000}
                containerStyle={{ marginBottom: -7 }}
                radius={10}
            />
        </View>
    )
}

export default ImageSlider