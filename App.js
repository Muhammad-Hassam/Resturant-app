import React from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Navigations from './routes/router';
import {CardProvider} from './config/context';
LogBox.ignoreLogs(['Setting a timer']);

// https://www.npmjs.com/package/@agaweb/react-native-stripe


export default function App() {
  return (
    <CardProvider>
    <Navigations/>
    </CardProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF5FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
