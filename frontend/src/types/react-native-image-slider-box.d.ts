import { FastImageProps } from "react-native-fast-image";

declare module "react-native-image-slider-box" {
  import { Component } from "react";
  import { ImageStyle, ViewStyle } from "react-native";

  export interface SliderBoxProps {
    images: string | string[];
    ImageComponent: FastImageProps; 
    sliderBoxHeight?: number;
    onCurrentImagePressed?: (index: number) => void;
    dotColor?: string;
    inactiveDotColor?: string;
    paginationBoxStyle?: ViewStyle;
    dotStyle?: ViewStyle;
    ImageComponentStyle?: ImageStyle;
    imageLoadingColor?: string;
    autoplay?: boolean;
    circleLoop?: boolean;
    resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
    parentWidth?: number;
    // Add more props as needed
  }

  export class SliderBox extends Component<SliderBoxProps> {}
}
