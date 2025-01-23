import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

enableScreens();

import boardList from './boardList';
import boardDetail from './boardDetail';
import boardWrite from './boardWrite';
import boardModify from './boardModify';

const Stack = createStackNavigator(); // 네비게이션을 stack 기반으로 동작

const BoardNavi = () => {
    return (
        <SafeAreaProvider>
            <Stack.Navigator initialRouteName='boardList'>
                <Stack.Screen name='boardList' 
                component={boardList} 
                options={{ headerShown: false }}
                />
                <Stack.Screen name='boardDetail' component={boardDetail} />
                <Stack.Screen name='boardWrite' component={boardWrite} />
                <Stack.Screen name='boardModify' component={boardModify} />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
};

export default BoardNavi;
