import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import * as React from 'react';
import HelloWorld from './HelloWorld';
import Baohuang from './Baohuang';
import Gouji from './Gouji';
import Games from './Games';
import Library from './Library';
import Home from './Home';
import Webviewer from './Webviewer';

export type RootStacksParams = {
  Library: undefined;
  HelloWorld: { id: string };
  Baohuang: { id?: string; name: string };
  Gouji: { id?: string };
  Home: undefined;
  Games: undefined;
  Webviewer: { url: string; title: string };
};

const RootStack = createNativeStackNavigator<RootStacksParams>();

export type RootStacksProp = NativeStackNavigationProp<RootStacksParams>;
export const navigationRef = createNavigationContainerRef<RootStacksParams>();

export default function Stacks() {
  // const navigator = useNavigationContainerRef();
  // useFlipper(navigator);
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        id={undefined}
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
          animationDuration: 618,
        }}
      >
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="HelloWorld" component={HelloWorld} />
        <RootStack.Screen name="Baohuang" component={Baohuang} />
        <RootStack.Screen name="Gouji" component={Gouji} />
        <RootStack.Screen name="Games" component={Games} />
        <RootStack.Screen name="Library" component={Library} />
        <RootStack.Screen name="Webviewer" component={Webviewer} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
