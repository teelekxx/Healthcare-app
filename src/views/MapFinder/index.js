import React, { useState, useRef, useEffect } from "react";
import { View, Dimensions, Animated, Button } from "react-native";
import Geocoder from "react-native-geocoding";
import MapView, { Marker, Circle } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

function MapFinder({ navigation, route, myLat, myLng }) {
  Geocoder.init("AIzaSyB1OZN6aK-ey5ZPoeezFvZ5yhtYyS-CRDs");
  const [isLoading, setIsLoading] = useState(true);
  const [radius, setRadius] = useState(1000);
  const [zoom, setZoom] = useState(0);
  const [region, setRegion] = useState({
    latitude: myLat,
    longitude: myLng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (radius < 5000) {
        setRadius(radius + 100);
        setZoom(zoom + 0.03);
        // Zoom out the map as the radius increases
      } else {
        // Zoom to marker after maximum radius is reached
        const markerRegion = {
          latitude: myLat,
          longitude: myLng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };

        mapRef.current.animateToRegion(markerRegion, 500);
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 300000);

    return () => {
      clearInterval(interval);
    };
  }, [radius]);

  const mapRef = useRef(null);

  const onMapReady = () => {
    const markerRegion = {
      latitude: myLat,
      longitude: myLng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    mapRef.current.animateToRegion(markerRegion, 500);
  };

  const coordinates = [
    {
      latitude: myLat,
      longitude: myLng,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        onMapReady={onMapReady}
        ref={mapRef}
      >
        <Circle
          center={{ latitude: myLat, longitude: myLng }}
          radius={radius}
          fillColor="rgba(255, 0, 0, 0.2)"
          strokeColor="rgba(255, 0, 0, 0.8)"
          strokeWidth={2}
        />

        <CustomMarker coordinate={{ latitude: myLat, longitude: myLng }} />

        {/* <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          anchor={{ x: 0.5, y: 0.5 }}
        >
        
          <View style={{ backgroundColor: "transparent" }}>
          <Animated.View
        style={{
          width: 35,
          height: 35,
          borderRadius: 100,
          backgroundColor: "orange",
          alignItems: "center",
          justifyContent: "center",
          opacity: opacity,
        }}
      >
        <MaterialCommunityIcons name="store" size={24} color="black" />
      </Animated.View>
          </View>
        </Marker> */}

        {coordinates.map((coordinate, index) => (
          <CustomMarker key={index} coordinate={coordinate} />
        ))}
      </MapView>
    </View>
  );
}

const CustomMarker = ({ coordinate, picked }) => {
  const [opacity, setOpacity] = useState(new Animated.Value(1));

  useEffect(() => {
    const intervalId = setInterval(() => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [opacity]);

  return (
    <Marker coordinate={coordinate} anchor={{ x: 0.5, y: 0.5 }}>
      <View style={{ backgroundColor: "transparent" }}>
        <Animated.View
          style={{
            width: 35,
            height: 35,
            borderRadius: 100,
            backgroundColor: !picked ? "yellow" : "green",
            alignItems: "center",
            justifyContent: "center",
            opacity: opacity,
          }}
        >
          <MaterialCommunityIcons name="store" size={24} color="black" />
        </Animated.View>
      </View>
    </Marker>
  );
};

export default MapFinder;
