import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ChatListScreen, { CHAT_LIST_URL } from '../screens/chatListScreen.tsx';
import ChatRoomScreen, { CHAT_ROOM_URL } from '../screens/chatRoomScreen.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AppRouter: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={CHAT_LIST_URL} component={ChatListScreen} />
        <Stack.Screen name={CHAT_ROOM_URL} component={ChatRoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
