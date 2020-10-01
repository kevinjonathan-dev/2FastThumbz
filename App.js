import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity, Image
} from 'react-native';
import worddata from './worddata';
import Constants from 'expo-constants';
import RNRestart from 'react-native-restart';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const capitalizeFirstLetter=(string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
let wordlist = [];
for (let i = 0; i < worddata.length; i++) {
  wordlist[i] = capitalizeFirstLetter(worddata[Math.floor(Math.random() * worddata.length)]) ;
}

export default function App() {
  const [currentWord, setCurrentWord] = useState(0);
  const [started, setStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [value, setValue] = useState('');
  const [time, setTime] = useState(60);
  const [initialTime] = useState(time);
  const [isCorrect, setIsCorrect] = useState(true);
  const callback = () => {
    setCurrentWord(currentWord + 1);
    setValue('');
  };

  const handleValue = () => {
    wordlist[currentWord].includes(value)
      ? wordlist[currentWord] == value
        ? callback()
        : setIsCorrect(true)
      : setIsCorrect(false);
  };
  const handleDone = () => {
    if (time <= 0) {
      setIsDone(true);
    }
  };
  setTimeout(() => {
    time > 0 && started ? setTime(time - 1) : handleDone();
  }, 1000);
  return (
    <View
      className="App"
      style={{
        backgroundColor: '#0f6894',
        height: '100%',
        flexDirection: 'column',
      }}>
      <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
        <View css={{ flexDirection: 'row' }}>
      
          <Text
            style={{
              fontSize: 30,
              color: 'white',
              fontWeight: 'bold',
              justifyContent: 'center',
            }}>
                <Text
            style={{
              fontSize: 60,
              color: '#ffd30f',
              fontWeight: 'bold',
              justifyContent: 'center',
            }}>
            2 
          </Text> Fast Thumbz
          </Text>
        </View>
      </View>

      <View
        style={{
          width: '90%',
          height: 150,
          backgroundColor: '#9dc5d1',
          overflow: 'hidden',
          alignSelf: 'center',
          borderRadius: 30,
        }}>
        <View
          style={{
            padding:15,
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          <View
            style={{
              borderWidth:3,
              borderColor:'black',
              borderRadius: 15,
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            <Text
              style={{
                color: isCorrect ? 'white' : 'red',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {wordlist[currentWord]}
            </Text>
          </View>

          {wordlist.map((value, index) => {
            if (index !== currentWord && index >= currentWord) {
              return (
                <Text
                  style={{
                    marginLeft: 10,
                    alignSelf: 'center',
                    color: '#575757',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  {value}
                </Text>
              );
            }
          })}
        </View>
      </View>
      <View
        style={{
          alignSelf: 'center',
          height: 50,
          width: '60%',
          marginTop: 30,
        }}>
        
        <TextInput
          disabled={isDone}
          value={
            !isDone
              ? value
              : ' '+Math.floor((currentWord * 60) / initialTime) + ' WPM!'
          }
          onChangeText={amount => {
            setValue(amount);
            handleValue();
            setStarted(true);
          }}
          textAlign={'center'}
          style={{
            color: isDone ? 'white' : 'black',
            backgroundColor: isDone ? '#8bc462' : 'white',
            borderColor: 'white',
            borderRadius: 7,
            fontSize: 32,
            fontWeight: 'bold',
          }}
        />
        
        <View
          style={{
            height: 32,
            backgroundColor: '#ebb513',
            padding: 5,
            marginLeft: 5,
            borderRadius: 7,
            marginTop: 5,
          }}>
          <Text
            style={{
              color: 'white',
              margin: 0,
              alignSelf: 'center',
              fontWeight: 'bold',
            }}>
            Time left: {time}
          </Text>
        </View>
        <TouchableOpacity
          onClick={() => RNRestart.Restart()}
          disabled={true}
          style={{
            height: 32,
            backgroundColor: '#8bc462',
            border: 'none',
            marginLeft: 5,
            borderRadius: 7,
            padding: 7,
            marginTop: 5,
            alignItems: 'center',
          }}>
          <Text style={{ margin: 0, color: 'white', fontWeight: 'bold' }}>
            Again! (In Progress)
          </Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            By Kevin Jonathan
          </Text>
          <Image style={{height:50, width:50, resizeMode:'contain'}} source={require('./logo.png')}/>
          <Text style={{ color: '#61DAFB', fontWeight: 'bold ' }}>
            Made with React Native
          </Text>
        </View>
      </View>
    </View>
  );
}
