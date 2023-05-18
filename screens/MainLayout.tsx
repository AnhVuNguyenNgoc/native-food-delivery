import {useDrawerProgress} from '@react-navigation/drawer';
import React from 'react';
import {Text} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

const MainLayout = () => {
  const progress = useDrawerProgress();

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.85]);

    const borderRadius = interpolate(progress.value, [0, 1], [0, 26]);

    console.log('scale ', scale);
    console.log('borderRadius ', borderRadius);

    return {
      borderRadius: borderRadius,
      transform: [{scale: scale}],
    };
  });

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        },
        animatedStyles,
      ]}>
      <Text>MainLayout</Text>
    </Animated.View>
  );
};

export default MainLayout;
