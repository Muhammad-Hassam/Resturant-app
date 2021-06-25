import React from 'react';
import { LogBox } from 'react-native';
import { StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import Navigations from './routes/router';
import {CardProvider} from './config/context';
import { ThemeProvider } from 'react-native-elements';
LogBox.ignoreLogs(['Setting a timer']);

// https://www.npmjs.com/package/@agaweb/react-native-stripe


export default function App() {
  const theme = {
    colors: {
      primary:'#d70b65',
    }
  }
  return (
    <ThemeProvider theme={theme} >
    <CardProvider>
    <Navigations/>
    </CardProvider>
    </ThemeProvider>
  );
}
// #EBF5FB
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF5FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
