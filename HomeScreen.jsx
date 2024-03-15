import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import Realm from 'realm';
import {AniccaLog} from './schema/schema';

const HomeScreen = () => {
  const [awareness, setAwareness] = useState(0);
  const [anicca, setAnicca] = useState(0);
  const [comment, setComment] = useState('');

  const realm = new Realm({schema: [AniccaLog]});

  const logs = realm.objects('aniccaLog');

  const saveLog = () => {
    realm.write(() => {
      const myLog = {
        id: Math.floor(Math.random() * 10000000) + 1,
        awareness: awareness,
        anicca: anicca,
        comment: comment,
        date: new Date(),
      };
      realm.create('aniccaLog', myLog);
    });
  };

  useEffect(() => {
    console.log('logs', logs);
  }, [logs]);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Awareness</Text>
          <Rating
            showRating={false}
            ratingCount={7}
            imageSize={32}
            tintColor="#E4D8CA"
            type="heart"
            onFinishRating={rating => setAwareness(rating)}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Anicca</Text>
          <Rating
            showRating={false}
            ratingCount={7}
            imageSize={32}
            tintColor="#E4D8CA"
            type="heart"
            onFinishRating={rating => setAnicca(rating)}
          />
        </View>
        <View style={styles.commentContainer}>
          <Text style={styles.label}>Comment</Text>
          <TextInput
            placeholder="Enter your Comment..."
            value={comment}
            onChangeText={text => setComment(text)}
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            saveLog();
            setComment('');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4D8CA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#E4D8CA',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    marginLeft: 60,
    borderWidth: 1,
    width: 220,
    paddingLeft: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#646F57',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default HomeScreen;
