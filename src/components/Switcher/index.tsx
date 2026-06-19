import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export interface SwitcherProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  trackColor?: { false: string; true: string };
  thumbColor?: string;
  style?: ViewStyle;
  testID?: string;
}

const TRACK_WIDTH = 50;
const TRACK_HEIGHT = 28;
const THUMB_SIZE = 24;
const PADDING = 2;
const THUMB_END = TRACK_WIDTH - THUMB_SIZE - PADDING * 2;
const THUMB_TOP = (TRACK_HEIGHT - THUMB_SIZE) / 2;

const Switcher: React.FC<SwitcherProps> = ({
  value,
  onValueChange,
  disabled = false,
  trackColor = { false: '#e5e5ea', true: '#34c759' },
  thumbColor = '#ffffff',
  style,
  testID,
}) => {
  const animValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value]);

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [PADDING, THUMB_END + PADDING],
  });

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  const currentTrackColor = disabled
    ? '#e5e5ea'
    : trackColor[value ? 'true' : 'false'];

  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={disabled ? 1 : 0.8}
      onPress={handlePress}
      style={[styles.container, style]}
    >
      <View
        style={[
          styles.track,
          {
            width: TRACK_WIDTH,
            height: TRACK_HEIGHT,
            borderRadius: TRACK_HEIGHT / 2,
            backgroundColor: disabled ? '#e2e2e2' : currentTrackColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: THUMB_SIZE / 2,
              top: THUMB_TOP,
              backgroundColor: disabled ? '#fafafa' : thumbColor,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});

export default Switcher;
