import axios from 'axios';
import { View, Text, StyleSheet,  } from "react-native";
import React, { useState, useContext} from 'react';
import * as Location from 'expo-location';
import {LocationContext} from './context/LocationContext'
const MAX_STACK: number = 30;
let API_KEY = 'pk.9c62c5b7e16a44aa885c1a331bd5358'

function App() { 
  //const { locationStamp, setLocationStamp } = useContext(LocationContext)
  const [currentDate, setCurrentDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  interface LocationInterface { latitude: number, longitude: number };
  const [previousData, setPreviousData] = useState<any>([]);
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

          setPreviousData((prev:any) => [...prev, response.data])
        }).catch(error => console.log(error));
      }
      setlocationdata();
      // const interval = setInterval(() => {
      //   console.log('This will run every second!');
      // }, 1000);
      // return () => clearInterval(interval);
      // const interval = setInterval(() => {
      //     setlocationdata;
      // }, 30000);
      // return () => clearInterval(interval);
      setInterval(setlocationdata, 30000);
      
    }, [location.latitude, location.longitude]);
return (
  <View style={styles.container}>
      <View>
        <View>
        <Text>Current Location</Text>
        <Text></Text>
        <Text>{Detail?.display_name}</Text>
      </View>
      <View >
      </View>
      <View>
        <Text>{currentDate},</Text>
      </View>
    </View>

    <View>
        <Text>Previous Locations</Text>
        {
          previousData.map(data => 
          {
            return (
              <View>
                <Text>{
                  data.display_name}</Text>
              </View>
            )
          })
        }
      </View>
    </View>
);

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default App;