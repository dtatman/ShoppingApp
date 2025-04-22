import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../utils/colors';
import CartItem from '../components/CartItem';
import Button from '../components/Button';

// Dữ liệu mẫu cho giỏ hàng
const sampleCartItems = [
  {
    id: '1',
    name: 'Smartphone ABC Pro',
    price: 10990000,
    image: 'https://via.placeholder.com/200',
    quantity: 1,
  },
  {
    id: '3',
    name: 'Tai nghe Bluetooth',
    price: 1590000,
    image: 'https://via.placeholder.com/200',
    quantity: 2,
  },
];

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(sampleCartItems);
  
  const handleRemoveItem = (itemId) => {
    Alert.alert(
      "Xóa sản phẩm",
      "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Xóa",
          onPress: () => {
            setCartItems(cartItems.filter(item => item.id !== itemId));
          },
          style: "destructive"
        }
      ]
    );
  };
  
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    setCartItems(
      cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  const handleCheckout = () => {
    Alert.alert(
      "Thanh toán",
      "Tính năng thanh toán sẽ được cập nhật trong phiên bản tiếp theo.",
      [{ text: "OK" }]
    );
  };
  
  const handleClearCart = () => {
    if (cartItems.length === 0) return;
    
    Alert.alert(
      "Xóa giỏ hàng",
      "Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Xóa",
          onPress: () => setCartItems([]),
          style: "destructive"
        }
      ]
    );
  };
  
  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Icon name="shopping-cart" size={72} color={COLORS.lightGrey} />
      <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
      <Text style={styles.emptyCartSubtext}>
        Hãy thêm sản phẩm vào giỏ hàng của bạn
      </Text>
      <Button
        title="Tiếp tục mua sắm"
        onPress={() => navigation.navigate('Home')}
        style={styles.continueButton}
      />
    </View>
  );
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
        {cartItems.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearCart}
          >
            <Icon name="delete-outline" size={24} color={COLORS.danger} />
          </TouchableOpacity>
        )}
      </View>
      
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onRemove={handleRemoveItem}
                onQuantityChange={handleQuantityChange}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
          
          <View style={styles.footer}>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tổng sản phẩm:</Text>
                <Text style={styles.summaryValue}>{getTotalItems()}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tạm tính:</Text>
                <Text style={styles.summaryValue}>
                  {formatPrice(getTotalPrice())} đ
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Phí vận chuyển:</Text>
                <Text style={styles.summaryValue}>30.000 đ</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
                <Text style={styles.totalValue}>
                  {formatPrice(getTotalPrice() + 30000)} đ
                </Text>
              </View>
            </View>
            
            <Button
              title="Tiến hành thanh toán"
              onPress={handleCheckout}
              style={styles.checkoutButton}
            />
          </View>
        </>
      ) : (
        renderEmptyCart()
      )}
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
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    padding: 4,
  },
  listContainer: {
    padding: 16,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptyCartSubtext: {
    fontSize: 14,
    color: COLORS.grey,
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  continueButton: {
    width: '80%',
  },
  footer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
    padding: 16,
  },
  summaryContainer: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.grey,
  },
  summaryValue: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  checkoutButton: {
    marginTop: 8,
  },
});

export default CartScreen;