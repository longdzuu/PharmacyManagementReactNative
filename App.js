import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrangChu from './components/screens/TrangChu';
import DanhSachThuoc from './components/screens/DanhSachThuoc';
import ThemThuoc from './components/screens/ThemThuoc';
import ChiTietThuoc from './components/screens/ChiTietThuoc';
import KhachHangScreen from './components/screens/KhachHangScreen';
import DSKH from './components/screens/DSKH';
import ChonThuoc from './components/screens/ChonThuoc';
import ThanhToan from './components/screens/ThanhToan';
import HoaDonList from './components/screens/HoaDonScreen';
import ChiTietHD from './components/screens/ChiTietHD';
import ChiTietHDKH from './components/screens/ChiTietHDKH';
import ThongKe from './components/screens/ThongKe';
import LoginScreen from './components/screens/Login';
import NhanVien from './components/screens/NhanVienScreen';
import ChiTietKhachHang from './components/screens/ChiTietKhachHang';
import MuaThuocKH from './components/screens/MuaThuocKH';
import HoaDonKH from './components/screens/HoadonKH';
import LichSuList from './components/screens/LichSuList';
import GanDay from './components/screens/GanDay';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CaiDat = ({ onLogout }) => {
  return (
    <View style={styles.container}>
      <Button title="Đăng xuất" onPress={onLogout} />
    </View>
  );
};

const MainScreen = ({ onLogout, userName }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Trang chủ" component={TrangChu}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/images/icons8-home-50.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen name="Tài khoản"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/images/account.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      >
        {props => <CaiDat {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const CustomerHomeScreen = ({ onLogout, userName }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mua thuốc" component={MuaThuocKH}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/images/icons8-home-50.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Hoá đơn" 
        component={() => <HoaDonKH userName={userName} />} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/images/icons8-bill-50.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen name="Tài khoản"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./assets/images/avatar.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      >
        {props => <CaiDat {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); 

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {props => <LoginScreen {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        ) : (
          <>
            {user.isCustomer ? (
              <Stack.Screen
                name="Trang chủ Khách hàng"
                options={{ headerShown: false }}
              >
                {props => <CustomerHomeScreen {...props} onLogout={handleLogout} userName={user.name} />}
              </Stack.Screen>
            ) : (
              <Stack.Screen
                name="Trang chủ"
                options={{ headerShown: false }}
              >
                {props => <MainScreen {...props} onLogout={handleLogout} userName={user.name} />}
              </Stack.Screen>
            )}
            <Stack.Screen
              name="Danh sách thuốc"
              component={DanhSachThuoc}
              options={({ navigation }) => ({
                headerRight: () => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Thêm thuốc')}
                      style={{ marginRight: 15 }}
                    >
                      <Image
                        source={require('./assets/images/icons8-add-50.png')}
                        style={{ width: 30, height: 30 }}
                      />
                    </TouchableOpacity>
                  </View>
                ),
              })}
            />
            <Stack.Screen
              name="Thêm thuốc"
              component={ThemThuoc}
            />
            <Stack.Screen
              name="Chi tiết thuốc"
              component={ChiTietThuoc}
            />
            <Stack.Screen
              name="Danh sách khách hàng"
              component={KhachHangScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Chọn Khách Hàng"
              component={DSKH}
            />
            <Stack.Screen
              name="Chọn thuốc"
              component={ChonThuoc}
            />
            <Stack.Screen
              name="Thanh toán"
              component={ThanhToan}
            />
            <Stack.Screen
              name="Danh sách hóa đơn"
              component={HoaDonList}
            />
            <Stack.Screen
              name="Chi tiết hóa đơn"
              component={ChiTietHD}
            />
            <Stack.Screen
              name="Chi tiết hóa đơn KH"
              component={ChiTietHDKH}
            />
            <Stack.Screen
              name="Thống kê doanh thu"
              component={ThongKe}
            />
            <Stack.Screen
              name="Lịch sử mua"
              component={LichSuList}
            />
            <Stack.Screen
              name="Gần đây"
              component={GanDay}
            />
            <Stack.Screen
              name="Chi tiết KH"
              component={ChiTietKhachHang}
            />
            <Stack.Screen
              name="Danh sách nhân viên"
              component={NhanVien}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;