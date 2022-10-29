import { View, Text, StyleSheet, PermissionsAndroid } from "react-native";
import axios from "axios";
import Geolocation from 'react-native-geolocation-service';
import React from "react";

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const Home = () =>{
  const {useEffect, useState} = React;
  //  const API_Key = ``;
  const [Location, setLocation] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [Detail, setDetail] = useState({
    "display_name":""
  })
  const [coords, setCoords] = useState<any>({latitude:"", longitude:""});
  
  const getLocation = () =>{
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition((position:any) => {
            console.log(position);
            setCoords({latitude:position.coords.latitude, longitude:position.coords.longitude})
            setLocation(true);
          },
          (error:any) => {
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge:10000},
        );
      }
    });

  }
  useEffect(() => {
    getLocation()
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
    console.log(coords)
    const setlocationdata = async () => {
      await axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.9c62c5b7e16a44aa885c1a331bd5358d&lat=${coords.latitude}&lon=${coords.longitude}&format=json`)
        .then((response) => {
          console.log(response)
          setDetail(response.data)
        })
        .catch(error => console.log(error));
      }
      setlocationdata();
    }, [])

   // Get present time
  //  const [currentDate, setCurrentDate] = useState('');
  // useEffect(() => {
  //   var date = new Date().getDate(); //Current Date
  //   var month = new Date().getMonth() + 1; //Current Month
  //   var year = new Date().getFullYear(); //Current Year
  //   var hours = new Date().getHours(); //Current Hours
  //   var min = new Date().getMinutes(); //Current Minutes
  //   var sec = new Date().getSeconds(); //Current Seconds
  //   setCurrentDate(
  //     date + '/' + month + '/' + year 
  //     + ' ' + hours + ':' + min + ':' + sec
  //   );
  // }, []);



// useEffect(() => {
//   navigator.geolocation.getCurrentPosition((position:any) => {
//     setLatitude(position.coords.latitude);
//     setLongitude(position.coords.longitude);
//   })
//   })
// const [Detail, setDetail] = useState({"display_name": ""})


console.log(Detail?.display_name)

//   useEffect(() => {
//     axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.960055be7519553eab95673eadd95d8f&lat=${coords.latitude}&lon=${coords.longitude}&format=json`)
//         .then((response) => {
//             console.log(response.data)
//             setDetail(response.data)
//         })
//         .catch((error) => {
//             if(axios.isAxiosError(error)){
//                 console.log("ERROR:check axios:", error.message);
//                 return '404';
//             }else{
//                 console.log("ERROR: something else", error);
//                 return "404"
//             }
//         })
// }, 
// [])

  

    return (
      
      <View style={styles.container}>
      <View style={styles.currentLocatinContainer}>
        <View>
        <Text style={styles.currentLocatinText}>Current Location:{Detail?.display_name}</Text>
        
      </View>
      <View >
      </View>
      <View style={styles.currentLocationStamps}>
        <Text style={styles.currentLocatinDate}>{currentDate},</Text>
      </View>
    </View>

    <View>
        <Text style={styles.currentLocatinText}>Previous Locations</Text>
      </View>
    </View>
    
      )

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
export default Home;