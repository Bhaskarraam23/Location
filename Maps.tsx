import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { useState} from 'react';
import location from './screens/Home'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


export default function App({route}:any) {

    const {location}= route.params
    const Region = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={Region} 
          >
            <Marker coordinate={Region} />
          </MapView>
        </View>
      );
    }
    const styles = StyleSheet.create({
      container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1, 
        justifyContent: "flex-end",
        alignItems: "center",
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
    });