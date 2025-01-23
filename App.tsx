import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './components/mainPage'; // 임시 메인 페이지

import Suhoon from './components/suhoon';
import Sehoon from './components/sehoon';
// import Aram from './components/aram';
import Board from './components/boardNavi';
import Jaehoon from './components/jaehoon';

import ReviewWrite from './components/reviewWrite';
import ReviewDetail from './components/reviewDetail';
import ReviewModify from './components/reviewModify';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} options={{ title: '임시 메인입니다' }} />
        <Stack.Screen name="Jaehoon" component={Jaehoon} />
        {/* <Stack.Screen name="Aram" component={Aram} /> */}
        <Stack.Screen name="Board" component={Board} />
        <Stack.Screen name="Sehoon" component={Sehoon} />
        <Stack.Screen name="Suhoon" component={Suhoon} />
        <Stack.Screen name="ReviewWrite" component={ReviewWrite} />
        <Stack.Screen name="ReviewDetail" component={ReviewDetail} />
        <Stack.Screen name="ReviewModify" component={ReviewModify} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;