import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/colors';
import Button from '../components/Button';

const ProfileScreen = ({ navigation }) => {
  // Dữ liệu mẫu cho người dùng
  const user = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0987654321',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  };
  
  const menuItems = [
    {
      id: '1',
      title: 'Đơn hàng của tôi',
      icon: 'receipt',
      screen: 'Orders',
    },
    {
      id: '2',
      title: 'Sản phẩm yêu thích',
      icon: 'favorite',
      screen: 'Wishlist',
    },
    {
      id: '3',
      title: 'Địa chỉ giao hàng',
      icon: 'location-on',
      screen: 'Addresses',
    },
    {
      id: '4',
      title: 'Phương thức thanh toán',
      icon: 'payment',
      screen: 'PaymentMethods',
    },
    {
      id: '5',
      title: 'Cài đặt',
      icon: 'settings',
      screen: 'Settings',
    },
    {
      id: '6',
      title: 'Trợ giúp',
      icon: 'help',
      screen: 'Help',
    },
  ];
  
  const handleMenuItemPress = (screen) => {
    if (screen === 'Orders' || screen === 'Wishlist' || screen === 'Settings') {
      navigation.navigate(screen);
    } else {
      alert(`Màn hình ${screen} sẽ được cập nhật trong phiên bản tiếp theo.`);
    }
  };
  
  const handleEditProfile = () => {
    alert('Tính năng chỉnh sửa hồ sơ sẽ được cập nhật trong phiên bản tiếp theo.');
  };
  
  const handleLogout = () => {
    alert('Bạn đã đăng xuất thành công!');
  };
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Icon name="menu" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hồ sơ</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.userPhone}>{user.phone}</Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Icon name="edit" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuContainer}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item.screen)}
            >
              <View style={styles.menuIconContainer}>
                <Icon name={item.icon} size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Icon name="chevron-right" size={24} color={COLORS.grey} />
            </TouchableOpacity>
          ))}
        </View>
        
        <Button
          title="Đăng xuất"
          onPress={handleLogout}
          type="outline"
          style={styles.logoutButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.primary,
  },
  menuButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  profileContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: COLORS.grey,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginTop: 16,
    marginHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  menuIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
});

export default ProfileScreen;