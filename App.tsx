import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, AuthContext } from './AuthContext'; // AuthContext 추가
import MainPage from './components/mainPage';
import Suhoon from './components/suhoon';
import Sehoon from './components/sehoon';
import Board from './components/boardNavi';
import Jaehoon from './components/jaehoon';
import ReviewWrite from './components/reviewWrite';
import ReviewDetail from './components/reviewDetail';
import ReviewModify from './components/reviewModify';
import LoginScreen from './components/LoginScreen'; // 로그인 화면 추가

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn } = useContext(AuthContext); // 로그인 여부 가져오기

  return (
    <Stack.Navigator>
      {!isLoggedIn ? (
        // 로그인하지 않은 경우 로그인 화면을 초기 화면으로 설정
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        // 로그인한 경우 MainPage를 초기 화면으로 설정
        <>
          <Stack.Screen
            name="MainPage"
            component={MainPage}
            options={{ title: '메인' }}
          />
          <Stack.Screen name="Jaehoon" component={Jaehoon} />
          <Stack.Screen name="Board" component={Board} />
          <Stack.Screen name="Sehoon" component={Sehoon} />
          <Stack.Screen name="Review" component={Suhoon} />
          <Stack.Screen name="ReviewWrite" component={ReviewWrite} />
          <Stack.Screen name="ReviewDetail" component={ReviewDetail} />
          <Stack.Screen name="ReviewModify" component={ReviewModify} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  console.log(AuthContext); // 디버깅용: AuthContext 확인
  return (
    <AuthProvider> {/* AuthProvider로 App 전체를 감쌈 */}
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;