import React, { useEffect } from 'react';
import { Container, Header } from 'native-base';
import * as Font from 'expo-font';
import GitHub from './components/GitHub'
import { Text } from 'react-native'
import { NativeBaseProvider } from 'native-base';

export default function App() {


  useEffect(() => {
    async () => await Font.loadAsync({
      Roboto: require('./node_modules/native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('./node_modules/native-base/Fonts/Roboto_medium.ttf'),
    })();
  }, [])

  return (
    <Container>
      <Header style={{ backgroundColor: '#0066ff' }}>
        <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 15, fontSize: 25 }}>Find GitHub Users here!</Text>
      </Header>

      <GitHub />
    </Container>
  );
}