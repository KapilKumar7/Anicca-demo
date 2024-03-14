import {
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AirbnbRating, Rating} from 'react-native-ratings';
import Realm from 'realm';
import {AniccaLog} from './schema/schema';

const HomeScreen = () => {
  const [awareness, setAwareness] = useState(0);
  const [anicca, setAnicca] = useState(0);
  const [comment, setComment] = useState('');

  const realm = new Realm({schema: [AniccaLog]});

  const logs = realm.objects('aniccaLog');
  const deleteLog = () => {
    realm.write(() => {
      realm.deleteAll();
    });
  };

  useEffect(() => {
    console.log('logs', logs);
    // deleteLog();
  }, [logs]);

  const saveLog = () => {
    realm.write(() => {
      const myLog = {
        id: Math.floor(Math.random() * 10000000) + 1,
        awareness: awareness,
        anicca: anicca,
        comment: comment,
        date: new Date(),
      };
      console.log('myLog', myLog);
      realm.create('aniccaLog', myLog);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* <AirbnbRating starImage={require('./assets/buddha.png')} /> */}
        <View
          style={{
            flexDirection: 'row',
            // borderColor: 'red',
            // borderWidth: 1,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20}}>
              Awareness
              {/* Samadhi // Awareness // Mindfullness //Not wandring here and there */}
            </Text>
          </View>
          <Rating
            style={{width: 300}}
            showRating={false}
            ratingCount={5}
            type="heart"
            onFinishRating={rating => setAwareness(rating)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            // borderColor: 'red',
            // borderWidth: 1,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20}}> Anicca </Text>
          </View>
          <Rating
            style={{width: 300, paddingLeft: 50}}
            showRating={false}
            ratingCount={5}
            type="heart"
            onFinishRating={rating => setAnicca(rating)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderColor: 'red',
            // borderWidth: 2,
            alignItems: 'center',
            marginRight: 50,
            width: '100%',
            marginTop: 10,
          }}>
          <Text style={{fontSize: 20}}>Comment</Text>
          <TextInput
            placeholder="Enter your Comment..."
            value={comment}
            onChangeText={text => setComment(text)}
            style={{
              marginLeft: 60,
              borderWidth: 1,
              width: 200,
              paddingLeft: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log(awareness, anicca, comment);
            setComment('');
            saveLog();
          }}
          style={{
            backgroundColor: '#646F57',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4D8CA',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    marginTop: 250,
    backgroundColor: '#E4D8CA',

    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
