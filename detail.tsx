import axios from 'axios';
import { View, Text, StyleSheet,  } from "react-native";
import React, { useState} from 'react';
import * as Location from 'expo-location';
const MAX_STACK: number = 30;
let API_KEY = 'pk.9c62c5b7e16a44aa885c1a331bd5358'

function App() { 
  const [currentDate, setCurrentDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  interface LocationInterface { latitude: number, longitude: number };
  const [Detail, setDetail] = useState({
    "display_name":""
  })
  const [location, setLocation] = useState<LocationInterface>({ latitude:0, longitude: 0 });
    React.useEffect(() => {
  
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    setCurrentDate(
      date + '/' + month + '/' + year
      + ' ' + hours + ':' + min + ':' + sec
    );
    //   console.log("latitude", latitude)
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('error');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords["latitude"],
        longitude: location.coords["longitude"]
      });
    })();
    const setlocationdata = async () => {
      await axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.9c62c5b7e16a44aa885c1a331bd5358d&lat=${location.latitude}&lon=${location.longitude}&format=json`)
        .then((response) => {
          console.log(response.data, "this is the response")
          setDetail(response.data)
        })
        .catch(error => console.log(error));
      }
      setlocationdata();
    }, [location.latitude, location.longitude]);
return (
  <View style={styles.container}>
      <View style={styles.currentLocatinContainer}>
        <View>
        <Text style={styles.currentLocatinText}>Current Location</Text>
        <Text></Text>
        <Text>{Detail?.display_name}</Text>
      </View>
      <View >
      </View>
      <View style={styles.currentLocationStamps}>
        <Text style={styles.currentLocatinDate}>{currentDate},</Text>
      </View>
    </View>

    <View style={styles.currentLocatinContainer}>
        <Text style={styles.currentLocatinText}>Previous Locations</Text>
      </View>
    </View>
);

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  currentLocatinContainer: {
    backgroundColor: '#F1C7C9',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    flexWrap: 'wrap',
    shadowColor: '#d8bfd8',
    elevation: 3
  },
  currentLocatinText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  currentLocationStamps: {
    flexDirection: 'row',
  },
  currentLocatinDate: {
    fontSize: 15,
    paddingRight: 5,
    fontWeight: 'bold',
    color: '#5a5a5a'
  }
})

export default App;