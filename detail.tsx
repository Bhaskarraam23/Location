import axios from 'axios';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
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
  const [maxStackMsg, setMaxStackMsg] = useState(false)
  const [previousData, setPreviousData] = useState<any>([]);
  const [Detail, setDetail] = useState({
    "display_name":""
  })
  const [location, setLocation] = useState<LocationInterface>({ latitude:0, longitude: 0 });

  const renderItem = ({ item }:any) => (
    <Item id={item.place_id} locationName={item.display_name} />
  );
  const onClickDelete = (recentLocationID) => {
    const newRecentList = previousData.filter(item => item.place_id != recentLocationID)
    setPreviousData(newRecentList)
  }
  const onClickClearAll = () => {
    Alert.alert(
      'clear all location?',
      'only previous location or only current location',
      [
        {
          text: 'Only Previous',
          onPress: () => {
            setPreviousData([]);
          }
        },
        {
          text: 'Current', 
          onPress: () => {
            alert('Done')
          }
        }
      ]
    )
    // should I clear only previous location or should I also clear the current location
  }
  const renderEmptyMessage = () => (
    <View style={styles.recentloctaionMessage}>
      <Text>Your Recent Location</Text>
    </View>
  )
  const Item = ({ id,  locationName }:any) => (
    <View style={styles.flexCol}>
      <View style={styles.listItemContent} >
        <Text>{locationName}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.clearBtn} onPress={() => onClickDelete(id)}>
        <Text>Remove</Text>
      </TouchableOpacity>
    </View>
  );
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
      setInterval(setlocationdata, 30000);
      
    }, [location.latitude, location.longitude]);
return (
  <View style={styles.container}>
      <View style={styles.currentLocationContainer}>
        <View>
        <Text style={styles.currentLocationText}>Current Location</Text>
        <Text></Text>
        <Text>{Detail?.display_name}</Text>
      </View>
      <View >
      </View>
      <View>
        <Text style={styles.currentLocationDate}>{currentDate},</Text>
      </View>
    </View>

    {/* <View>
        <Text>Previous Locations</Text>
        {
          previousData.map((data:any) => 
          {
            return (
              <View>
                <Text>{
                  data.display_name}</Text>
              </View>
            )
          })
        }
      </View> */}
      <FlatList
        style={styles.flatList}
        data={previousData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => renderEmptyMessage()}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.touchableOpacityStyle} 
        onPress={() => onClickClearAll()}
        
      >
        <Text style={[{ fontWeight: '500' }, { color: maxStackMsg ? '#ff5100' : 'solid black' }]}>Clear all</Text>
      </TouchableOpacity>
    </View>
);

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  currentLocationContainer: {
    backgroundColor: '#add8e6',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    flexWrap: 'wrap',
    shadowColor: '#d8bfd8',
    elevation: 3
  },
  currentLocationText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  recentloctaionMessage: {
    backgroundColor: '#add8e6',
    alignItems: 'center',
  },
  currentLocationDate: {
    fontSize: 15,
    paddingRight: 5,
    fontWeight: 'bold',
    color: '#5a5a5a'
  },
  flatList: {
    flex: 3,
    width: '100%',
  },

  touchableOpacityStyle: {
    backgroundColor: 'cornflowerblue',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    borderRadius: 10,
    paddingHorizontal: 60,
    paddingVertical: 10,
    marginRight: 20,

    left: '30%',
    // right: 0,
  },
  clearBtn: {
    backgroundColor: '#c0c0c0',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  flexCol: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginVertical: 3,
    borderRadius: 10,
    marginHorizontal: 10,

    shadowColor: '#dfdfdf',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 5,
    elevation: 2
  },
  listItemContent: {
    flex: 1
  }
})

export default App;