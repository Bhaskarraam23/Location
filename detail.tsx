import axios from 'axios';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import React, { useState} from 'react';
import * as Location from 'expo-location';
const MAX_STACK: number = 30;

function App() { 
  const [currentDate, setCurrentDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  interface LocationInterface { latitude: number, longitude: number };
  const [maxStackMsg, setMaxStackMsg] = useState(false)
  const [previousData, setPreviousData] = useState<any>([]);
  const [location, setLocation] = useState<LocationInterface>({ latitude:0, longitude: 0 });
  const [Detail, setDetail] = useState({
    "display_name":""
  })
  

  // const renderItem = ({ item }) => (
  //   <Item title={item.title} />
  // );
  const renderItem = ({ item }:any) => (
    <Item id={item.place_id} locationName={item.display_name} />
  );
  
  // const deleteItem = (item) => {
  //   let newProducts = data.filter(
  //     (record) => record.ProductID !== item.ProductID
  //   );
  //   setData(newProducts);
  // };
  const deleteItem = (previousLocationID:any) => {
    const newRecentList = previousData.filter((item:any) => item.place_id != previousLocationID)
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
  }
  const Item = ({ id,  locationName }:any) => (
    <View style={styles.flexColumn}>
      <View style={styles.ItemContent} >
        <Text>{locationName}</Text>
        <Text>{currentDate}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.removeButton} onPress={() => deleteItem(id)}>
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
    if (location.latitude !== 0) {
      const setlocationdata = async () => {
        await axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.9c62c5b7e16a44aa885c1a331bd5358d&lat=${location.latitude}&lon=${location.longitude}&format=json`)
          .then((response) => {
            setDetail(response.data)
  
            setPreviousData((prev:any) => [...prev, response.data])
          }).catch(error => console.log(error));
        }
        setlocationdata();
        if (previousData.length === MAX_STACK) {
          setMaxStackMsg(true);
        } else {
          setMaxStackMsg(false);
        }
    
        // call every 5 minute
        
        console.log("previousData.length", previousData.length)
          if (previousData.length < MAX_STACK) {
            setInterval(setlocationdata, 30000);
          }
    }
    
      
     
      
      
      
      
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
      {/* <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}
      <Text>
        <Text style={styles.previousLocationText}>Previous Location</Text>
      <FlatList
        style={styles.flatList}
        data={previousData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.touchOpacityStyle} 
        onPress={() => onClickClearAll()}
        
      >
        <Text style={[{ fontWeight: '500' }, { color: maxStackMsg ? '#ff5100' : 'solid black' }]}>Clear all</Text>
      </TouchableOpacity>
      </Text>
    </View>
);

}
const styles = StyleSheet.create({
  flexColumn: {
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
  ItemContent: {
    flex: 1
  },
  container: {
    flex: 1,
  },
  currentLocationContainer: {
    backgroundColor: '#B7FFBF',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    flexWrap: 'wrap',
    shadowColor: '#d8bfd8',
    elevation: 3
  },
  previousLocationText:{
    paddingVertical: 20,
    marginHorizontal: 15,
    fontSize: 15,
    //fontWeight: 'bold'

  },
  currentLocationText: {
    fontSize: 15,
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

  touchOpacityStyle: {
    backgroundColor: 'cornflowerblue',
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: "center",
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
  removeButton: {
    backgroundColor: '#c0c0c0',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  
})

export default App;