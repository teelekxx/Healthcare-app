import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";
import * as Location from "expo-location";
import { Google } from "expo";
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Title, ItalicText } from "../../components/components/index.style";
import {
  Container,
  MapContainer,
  Image,
  Text,
  ThemeButton,
  ThemeButtonText,
  ThemeButton2,
  ThemeButtonText2,
  RoundButton,
} from "./index.style";
import { ScrollView } from "react-navigation";

function MapPage({ navigation }) {
  const origin = "Bangkok";
  // const destination = "Nakhon Si Thammarat";
  const apiKey = "AIzaSyA-Pb23fMnh-ofKWhoP9PC9Aaj9C81MCQM";
  // const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${apiKey}`;
  // const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=13.771864275082%2c100.575864649699&radius=500&type=hospital&key=${apiKey}`;
  const markers = [
    { latitude: 13.773508065440815, longitude: 100.5730804572769 },
    { latitude: 8.444526370150388, longitude: 99.96210658564331 },
    { latitude: 13.771864275082038, longitude: 100.57586464969924 },
    { latitude: 13.97918633927129, longitude: 98.33740674666498 },
  ];
  // axios.get(placesUrl);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null);
  const [nearbyPlaces, setNearby] = useState(null);
  const [destinationMap, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  const getHospital = async (lat, lng, radius = 1000) => {
    setLoading(true);
    let curLocation = lat + "%2c" + lng;
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${curLocation}&radius=${radius}&type=hospital&key=${apiKey}`;
    const response = await axios.get(placesUrl);
    setRegion({
      region: {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 5,
        longitudeDelta: 5,
      },
    });
    if (response != null) {
      setNearby(response.data.results);
      //   if (nearbyPlaces != null) {
      //     nearbyPlaces.map((val) => {
      //       let destination =
      //         val.geometry.location.lat + "%2c" + val.geometry.location.lng;
      //       getDistance(curLocation, destination, val.name);
      //     });
      //   }
      setLoading(false);
    }
  };

  const getDistance = async (curLocation, destination, name) => {
    const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${curLocation}&destinations=${destination}&key=${apiKey}`;
    const response = await axios.get(distanceUrl);
    if (response != null) {
      console.log(
        name,
        response.data.rows[0].elements[0].distance.text,
        response.data.rows[0].elements[0].duration.text
      );
    }
  };

  useEffect(() => {
    // axios
    //   .get(placesUrl)
    //   .then((response) => {
    //     setNearby(response.data.results);
    //     console.log(nearbyPlaces);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log("Error!!!!!!!!!!!!!!!!!!!!!!", error);
    //   });
    // axios
    //   .get(distanceUrl)
    //   .then((response) => {
    //     // Do something with the response data
    //     console.log(
    //       response.data.rows[0].elements[0].distance.text,
    //       response.data.rows[0].elements[0].duration.text
    //     );
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      getHospital(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (region) {
    text = JSON.stringify(region);
  }
  return (
    <Container>
      {loading ? (
        <MapContainer>
          <ActivityIndicator size="large" />
        </MapContainer>
      ) : (
        <MapContainer>
          <MapView
            style={{ flex: 1 }}
            initialRegion={region.region}
            provider={"google"}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            zoomEnabled={true}
            zoomControlEnabled={true}
            rotateEnabled={false}
            mapType="standard"
            onMapReady={() => console.log("Map is ready!")}
            onMapError={(error) => console.log(error)}
            // onPress={(e) => console.log(e.nativeEvent)}
            onLongPress={(e) =>
              getHospital(
                region.region.latitude,
                region.region.longitude,
                10000
              )
            }
            onMarkerPress={(e) => console.log(e.nativeEvent.coordinate)}
            // onRegionChange={(e) => console.log(e.nativeEvent)}
            // onRegionChangeComplete={(e) => console.log(e.nativeEvent)}
          >
            {nearbyPlaces.map((val, index) => {
              return (
                <View key={index}>
                  <Marker
                    coordinate={{
                      latitude: val.geometry.location.lat,
                      longitude: val.geometry.location.lng,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                  ></Marker>
                  {/* <MapViewDirections
                  origin={{
                    latitude: region.region.latitude,
                    longitude: region.region.longitude,
                  }}
                  destination={{
                    latitude: val.geometry.location.lat,
                    longitude: val.geometry.location.lng,
                  }}
                  apikey="AIzaSyA-Pb23fMnh-ofKWhoP9PC9Aaj9C81MCQM"
                  strokeWidth={3}
                  strokeColor="red"
                ></MapViewDirections> */}
                </View>
              );
            })}
          </MapView>
        </MapContainer>
      )}
      <ThemeButton2 onPress={() => navigation.navigate("Firstaid")}>
        <ThemeButtonText2>Firstaid Knowledge</ThemeButtonText2>
      </ThemeButton2>
    </Container>
  );
}

//AIzaSyBzfd20-1HPdKJWq3KZcU1wxgLxUpuZDhg
export default MapPage;
