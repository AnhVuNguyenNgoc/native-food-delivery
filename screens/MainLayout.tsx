import {useDrawerProgress} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {connect} from 'react-redux';
import {Header} from '../components';
import {COLORS, FONTS, SIZES, constants, icons} from '../constants';
import {setSelectedTab} from '../stores/tab/tabAction';

const TabButton = ({
  label,
  icon,
  isFocused,
  onPress,
  outerContainerStyle,
  innerContainerStyle,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
          outerContainerStyle,
        ]}>
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              width: '80%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
            },
            innerContainerStyle,
          ]}>
          <Image
            source={icon}
            style={{
              width: 20,
              height: 20,
              tintColor: isFocused ? COLORS.white : COLORS.gray,
            }}
          />

          {isFocused && (
            <Text
              numberOfLines={1}
              style={{
                marginLeft: SIZES.base,
                color: COLORS.white,
                ...FONTS.h3,
              }}>
              {label}
            </Text>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const MainLayout = ({navigation, selectedTab, setSelectedTab}) => {
  const progress = useDrawerProgress();
  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.85]);
    const borderRadius = interpolate(progress.value, [0, 1], [0, 26]);

    return {
      borderRadius: borderRadius,
      transform: [{scale: scale}],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      {/* Header */}
      <Header
        containerStyle={styles.headerContainerStyle}
        title={selectedTab}
        navigation={navigation}
      />

      {/* Content */}
      <View style={{flex: 1}}>
        <Text>MainLayout</Text>
      </View>

      {/* Footer */}
      <View
        style={{
          height: 100,
          justifyContent: 'flex-end',
          borderRadius: 26,
        }}>
        {/* Shadows */}
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 4}}
          colors={[COLORS.transparent, COLORS.lightGray1]}
          style={styles.linearRadius}
        />

        {/* Tabs */}
        <Footer selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </View>
    </Animated.View>
  );
};

const Footer = ({selectedTab, setSelectedTab}) => {
  // Reanimated Shared value
  const homeTabFlex = useSharedValue(1);
  const homeTabColor = useSharedValue(COLORS.white);

  const searchTabFlex = useSharedValue(1);
  const searchTabColor = useSharedValue(COLORS.white);

  const cartTabFlex = useSharedValue(1);
  const cartTabColor = useSharedValue(COLORS.white);

  const favoriteTabFlex = useSharedValue(1);
  const favoriteTabColor = useSharedValue(COLORS.white);

  const notificationTabFlex = useSharedValue(1);
  const notificationTabColor = useSharedValue(COLORS.white);

  // Reanimated Animated Style
  const homeFlexStyle = useAnimatedStyle(() => {
    return {
      flex: homeTabFlex.value,
    };
  });
  const homeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: homeTabColor.value,
    };
  });

  const searchFlexStyle = useAnimatedStyle(() => {
    return {
      flex: searchTabFlex.value,
    };
  });
  const searchColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: searchTabColor.value,
    };
  });

  const cartFlexStyle = useAnimatedStyle(() => {
    return {
      flex: cartTabFlex.value,
    };
  });
  const cartColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: cartTabColor.value,
    };
  });

  const favoriteFlexStyle = useAnimatedStyle(() => {
    return {
      flex: favoriteTabFlex.value,
    };
  });
  const favoriteColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: favoriteTabColor.value,
    };
  });

  const notificationFlexStyle = useAnimatedStyle(() => {
    return {
      flex: notificationTabFlex.value,
    };
  });
  const notificationColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: notificationTabColor.value,
    };
  });

  useEffect(() => {
    if (selectedTab === constants.screens.home) {
      homeTabFlex.value = withTiming(4, {duration: 500});
      homeTabColor.value = withTiming(COLORS.primary, {duration: 500});
    } else {
      homeTabFlex.value = withTiming(1, {duration: 500});
      homeTabColor.value = withTiming(COLORS.white, {duration: 500});
    }

    if (selectedTab === constants.screens.search) {
      searchTabFlex.value = withTiming(4, {duration: 500});
      searchTabColor.value = withTiming(COLORS.primary, {duration: 500});
    } else {
      searchTabFlex.value = withTiming(1, {duration: 500});
      searchTabColor.value = withTiming(COLORS.white, {duration: 500});
    }

    if (selectedTab === constants.screens.cart) {
      cartTabFlex.value = withTiming(4, {duration: 500});
      cartTabColor.value = withTiming(COLORS.primary, {duration: 500});
    } else {
      cartTabFlex.value = withTiming(1, {duration: 500});
      cartTabColor.value = withTiming(COLORS.white, {duration: 500});
    }

    if (selectedTab === constants.screens.favourite) {
      favoriteTabFlex.value = withTiming(4, {duration: 500});
      favoriteTabColor.value = withTiming(COLORS.primary, {duration: 500});
    } else {
      favoriteTabFlex.value = withTiming(1, {duration: 500});
      favoriteTabColor.value = withTiming(COLORS.white, {duration: 500});
    }

    if (selectedTab === constants.screens.notification) {
      notificationTabFlex.value = withTiming(4, {duration: 500});
      notificationTabColor.value = withTiming(COLORS.primary, {duration: 500});
    } else {
      notificationTabFlex.value = withTiming(1, {duration: 500});
      notificationTabColor.value = withTiming(COLORS.white, {duration: 500});
    }
  });
  return (
    <View style={styles.footer}>
      <TabButton
        icon={icons.home}
        label={constants.screens.home}
        isFocused={selectedTab === constants.screens.home}
        onPress={() => setSelectedTab(constants.screens.home)}
        outerContainerStyle={homeFlexStyle}
        innerContainerStyle={homeColorStyle}
      />

      <TabButton
        icon={icons.search}
        label={constants.screens.search}
        isFocused={selectedTab === constants.screens.search}
        onPress={() => setSelectedTab(constants.screens.search)}
        outerContainerStyle={searchFlexStyle}
        innerContainerStyle={searchColorStyle}
      />

      <TabButton
        icon={icons.cart}
        label={constants.screens.cart}
        isFocused={selectedTab === constants.screens.cart}
        onPress={() => setSelectedTab(constants.screens.cart)}
        outerContainerStyle={cartFlexStyle}
        innerContainerStyle={cartColorStyle}
      />

      <TabButton
        icon={icons.favourite}
        label={constants.screens.favourite}
        isFocused={selectedTab === constants.screens.favourite}
        onPress={() => setSelectedTab(constants.screens.favourite)}
        outerContainerStyle={favoriteFlexStyle}
        innerContainerStyle={favoriteColorStyle}
      />

      <TabButton
        icon={icons.notification}
        label={constants.screens.notification}
        isFocused={selectedTab === constants.screens.notification}
        onPress={() => setSelectedTab(constants.screens.notification)}
        outerContainerStyle={notificationFlexStyle}
        innerContainerStyle={notificationColorStyle}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainerStyle: {
    height: 50,
    paddingHorizontal: SIZES.padding,
    marginTop: 40,
    alignItems: 'center',
  },
  linearRadius: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    height: 100,
  },
  footer: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    paddingHorizontal: SIZES.radius,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});

function mapStateToProps(state) {
  return {
    selectedTab: state.tabReducer.selectedTab,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: selectedTab => {
      return dispatch(setSelectedTab(selectedTab));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
