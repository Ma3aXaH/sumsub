/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/

import React, { useState } from 'react';
import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module';
// import type {Node} from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  Button
} from 'react-native';


import API from './Api';



const App = () => {
  
  const [logs, setLogs] = useState('');
  
  const onPress = async () => {
    
    API.login({
      login: '068019587',
      password: 'test1234'
    })
    .then(res => {
      return API.identityGetToken()
    })
    .then(res => {
      let {accessToken, email, phone} = res;
      
      let snsMobileSDK = SNSMobileSDK.init(accessToken, () => {
        // this is a token expiration handler, will be called if the provided token is invalid or got expired
        // call your backend to fetch a new access token (this is just an example)
        return fetch('http://example.org/', {
        method: 'GET',
      }).then(resp => {
        console.log('access token')
        // return a fresh token from here
        return 'new_access_token'
      })
      })
      .withHandlers({ // Optional callbacks you can use to get notified of the corresponding events
        onStatusChanged: (event) => {
          console.log("onStatusChanged: [" + event.prevStatus + "] => [" + event.newStatus + "]");
        },
        onLog: (event) => {
          console.log("onLog: [Idensic] " + event.message);
        }
      })
      .withDebug(true)
      .withLocale('en') // Optional, for cases when you need to override the system locale
      .build();
      
      console.log('sns', snsMobileSDK)
      
      snsMobileSDK.launch().then(result => {
        console.log("SumSub SDK Result: " + JSON.stringify(result))
        
      }).catch(err => {
        console.log("SumSub SDK Error: " + JSON.stringify(err))
        setLogs(JSON.stringify(err))
        // Alert.alert("SumSub SDK Error: ", JSON.stringify(err))
      });

    })
    .catch(err => {
      console.log('err', err)
    })
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{padding: 16}}>
        <Button
        onPress={onPress}
        title='Press me'/>

        <Text style={{marginTop: 10}}>{logs}</Text>
      </ScrollView>
    </SafeAreaView>
    )
}


export default App;
