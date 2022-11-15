import axios from 'axios';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useState} from 'react';
import { Button } from 'react-native-paper';
import * as Location from 'expo-location';
const MAX_STACK: number = 30;

const App = ({ navigation }: any) => {
  const [currentDate, setCurrentDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  interface LocationInterface { latitude: number, longitude: number };
  const [maxStackMsg, setMaxStackMsg] = useState(false)
  const [previousData, setPreviousData] = useState<any>([]);
  const [location, setLocation] = useState<LocationInterface>({ latitude:0, longitude: 0 });
  const [Detail, setDetail] = useState({
    "display_name":""
  })
  

  
  
  // const deleteItem = (item) => {
  //   let newProducts = data.filter(
  //     (record) => record.ProductID !== item.ProductID
  //   );
  //   setData(newProducts);
  // };
  const handleButton = () => {
    navigation.navigate('Maps', {location})
}
// handleDelete = itemId => {
//   const items = this.state.items.filter(item => item.id !== itemId);
//   this.setState({ items: items });
// };
  // const deleteItem = (preID:any) => {
  //   const newRecentList = previousData.filter((item:any) => item.id != preID)
  //   setPreviousData(newRecentList)
  // }
  
  const Item = ({ id,  locationName }:any) => (
    <View style={styles.flexColumn}>
      <View style={styles.ItemContent} >
        <Text>{locationName}</Text>
        <Text>{currentDate}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.removeButton} onPress={() => { setPreviousData((prevState:any) => prevState.filter((_item, _Index) => _Index));}}>
        <Text>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  // const renderItem = ({ item }) => (
  //   <Item title={item.title} />
  // );
  
  const renderItem = ({ item }:any) => (
    <Item id={item.id} locationName={item.display_name} />
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
    if (previousData.length === MAX_STACK) {
      setMaxStackMsg(true);
    } else {
      setMaxStackMsg(false);
    }
    if (location.latitude !== 0) {
      const setlocationdata = async () => {
        await axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.9c62c5b7e16a44aa885c1a331bd5358d&lat=${location.latitude}&lon=${location.longitude}&format=json`)
          .then((response) => {
            setDetail(response.data)
  
            setPreviousData((prev:any) => [...prev, response.data])
          }).catch(error => console.log(error));
        }
        setlocationdata();

//         var intervalId = null;
// var varCounter = 0;
// var varName = function(){
//      if(varCounter <= 10) {
//           varCounter++;
//           /* your code goes here */
//      } else {
//           clearInterval(intervalId);
//      }
// }; var intervalId = null;
// var intervalId = null;
// var varCounter = 0;
// var varName = function(){
//      if(varCounter <= 10) {
//           varCounter++;
//           /* your code goes here */
//      } else {
//           clearInterval(intervalId);
//      }
// };

        
    
        const interval = setInterval(() => {
          if (previousData.length < MAX_STACK) {
            setlocationdata();
          }
        }, 30000);
        return () => clearInterval(interval);
        
        // console.log("previousData.length", previousData.length)
        //   if (previousData.length < MAX_STACK) {
        //     setInterval(setlocationdata, 30000);
        //   }
    }
    
      
     
      
      
      
      
    }, [location.latitude, location.longitude]);
return (
  <View style={styles.container}>
      <View style={styles.currentLocationContainer}>
        <View>
        <Text style={styles.currentLocationText}>Current Locations</Text>
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
      <Text style={styles.previousLocationText}>Previous Location</Text>
      <View style={{flex: 1,width:"100%"}}>
      <FlatList
        data={previousData.slice(0,5)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

        {/* <TouchableOpacity
          onPress={() => { setPreviousData((prevState:any) => prevState.filter((_item, _Index) => _Index !== _Index));}}
          style={{
            backgroundColor: '#0066ff',
            marginBottom: 20,
            borderRadius: 5,
            width: 350,
            marginLeft: 12,
          }}
          mode="contained">
          Clear All
      //   </TouchableOpacity> */}

        
     
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.touchOpacityStyle} 
        onPress={() => { setPreviousData((prevState:any) => prevState.filter((_item, _Index) => _Index !== _Index));}}
      >
        <Text>Clear all</Text>
      </TouchableOpacity> 
      <TouchableOpacity
        style={styles.mapss} 
        onPress={() => {
          navigation.navigate('Maps', {
           location
          });
        }}
      >
        <Text>Maps</Text>
      </TouchableOpacity> 
      {/* <View style={styles.mapss}>
        <Menu/>
      </View> */}
    </View>
);

}
const styles = StyleSheet.create({
  flexColumn: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#dfdfdf',
    shadowOffset: { width: 0, height: 6 },
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
    width: '50%',
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
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginRight: 20,

    left: '5%',
    // right: 0,
  },
  mapss: {
    backgroundColor: '#FF9899',
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: "center",
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginRight: 20,

    left: '55%',
    // right: 0,
  },
  removeButton: {
    backgroundColor: '#c0c0c0',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  line:{
    marginBottom:20,
    borderColor:"grey",
    alignItems: 'center',
    justifyContent: 'center',
  }
  
})

export default App;