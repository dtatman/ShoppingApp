import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/colors';

// Màn hình
import TabNavigator from './TabNavigator';
import WishlistScreen from '../screens/WishlistScreen';
import OrdersScreen from '../screens/OrdersScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

// Component DrawerContent tùy chỉnh
const CustomDrawerContent = (props) => {
  // Dữ liệu mẫu cho người dùng
  const user = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  };
  
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>
      
      <DrawerItemList {...props} />
      
      <View style={styles.divider} />
      
      <DrawerItem
        label="Đăng xuất"
        icon={({ color, size }) => (
          <Icon name="logout" color={color} size={size} />
        )}
        onPress={() => alert('Bạn đã đăng xuất thành công!')}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.black,
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 15,
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="HomeTab"
        component={TabNavigator}
        options={{
          title: 'Trang chủ',
          drawerIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      
      <Drawer.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          title: 'Sản phẩm yêu thích',
          drawerIcon: ({ color, size }) => (
            <Icon name="favorite" color={color} size={size} />
          ),
        }}
      />
      
      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: 'Đơn hàng của tôi',
          drawerIcon: ({ color, size }) => (
            <Icon name="receipt" color={color} size={size} />
          ),
        }}
      />
      
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Cài đặt',
          drawerIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 12,
    color: COLORS.grey,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginVertical: 10,
    marginHorizontal: 16,
  },
});

export default DrawerNavigator;