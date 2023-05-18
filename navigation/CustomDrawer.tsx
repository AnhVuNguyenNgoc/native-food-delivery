import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {COLORS, FONTS, SIZES, constants, dummyData, icons} from '../constants';
import {MainLayout} from '../screens';

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({label, icon}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 40,
        marginBottom: SIZES.base,
        alignItems: 'center',
        paddingLeft: SIZES.radius,
        borderRadius: SIZES.base,
      }}>
      <Image
        source={icon}
        style={{width: 20, height: 20, tintColor: COLORS.white}}
      />
      <Text style={{marginLeft: 10, color: COLORS.white, fontWeight: 'bold'}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({navigation}) => {
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: '#FF6C44',
      }}>
      <View style={{flex: 1, paddingHorizontal: SIZES.radius}}>
        {/* Close */}
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.closeDrawer()}>
            <Image
              source={icons.cross}
              style={{height: 35, width: 35, tintColor: COLORS.white}}
            />
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            alignItems: 'center',
          }}
          onPress={() => console.log('Profile')}>
          <Image
            source={dummyData.myProfile?.profile_image}
            style={{width: 50, height: 50, borderRadius: SIZES.radius}}
          />

          <View
            style={{
              marginLeft: SIZES.radius,
            }}>
            <Text
              style={{color: COLORS.white, ...FONTS.h3, fontWeight: 'bold'}}>
              {dummyData.myProfile?.name}
            </Text>
            <Text style={{color: COLORS.white}}>View your Profile</Text>
          </View>
        </TouchableOpacity>

        {/* Drawer Items */}
        <View
          style={{
            flex: 1,
            marginTop: SIZES.padding,
          }}>
          <CustomDrawerItem label={constants.screens.home} icon={icons.home} />
          <CustomDrawerItem
            label={constants.screens.my_wallet}
            icon={icons.wallet}
          />
          <CustomDrawerItem
            label={constants.screens.notification}
            icon={icons.notification}
          />
          <CustomDrawerItem
            label={constants.screens.favourite}
            icon={icons.favourite}
          />

          {/* Line Divider */}
          <View
            style={{
              height: 1,
              marginVertical: SIZES.radius,
              marginLeft: SIZES.radius,
              backgroundColor: COLORS.lightGray1,
            }}
          />

          <CustomDrawerItem label={'Track your orders'} icon={icons.location} />
          <CustomDrawerItem label={'Coupons'} icon={icons.coupon} />
          <CustomDrawerItem label={'Setting'} icon={icons.setting} />
          <CustomDrawerItem label={'Invite a friend'} icon={icons.profile} />
          <CustomDrawerItem label={'Help Center'} icon={icons.help} />
        </View>

        <View style={{marginBottom: SIZES.padding}}>
          <CustomDrawerItem label={'Log out'} icon={icons.logout} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

// const drawerContent = (props: DrawerContentComponentProps, setProgress) => {
//   setTimeout(() => {
//     setProgress(props.progress);
//   });
//   return <CustomDrawerContent navigation={props.navigation} />;
// };

const CustomDrawer = () => {
  return (
    <View style={styles.container}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          overlayColor: 'transparent',
          drawerType: 'slide',
          drawerStyle: styles.drawerStyle,
          sceneContainerStyle: {backgroundColor: COLORS.primary},
        }}
        initialRouteName="MainLayout"
        drawerContent={props => {
          return <CustomDrawerContent navigation={props.navigation} />;
        }}>
        <Drawer.Screen name="MainLayout">
          {props => <MainLayout {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerStyle: {
    flex: 1,
    width: '65%',
  },
  closeButtonContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomDrawer;
