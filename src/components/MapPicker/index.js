import {
  WhiteMessage,
  ChatContainer,
  DetailContainer,
  ChatName,
  LastMassage,
  MapContainer,
  SearchBar,
  MyMap,
  SearchSuggest,
  SmallMapContainer,
  AllMapContainer,
} from "./index.style";
import {
  FormInput,
  SmallFormInput,
  BigFormInput,
  BlueContainer,
  SignUpForm,
  FormText,
  PageTitleContainer,
  PageTitle,
  BlueButton,
  BlueButtonText,
  WhiteKeyboard,
  DateCalendar,
} from "../../components/components/index.style";
import React, { useState, useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";
import * as Location from "expo-location";
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Container } from "../Avatar/index.style";
import Geocoder from "react-native-geocoding";

export default function MapPicker({ handleModalVisible, handleGeoResult }) {
  Geocoder.init("AIzaSyA-Pb23fMnh-ofKWhoP9PC9Aaj9C81MCQM");

  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [markerCoords, setMarkerCoords] = useState(null);
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      await setCurrentLocation(
        location.coords.latitude,
        location.coords.longitude
      );
    })();
  }, []);

  const closeModal = () => {
    saveGeo(center);
    handleModalVisible();
  };

  const saveGeo = (region) => {
    handleGeoResult(region);
  };

  const handleSelectAddress = (data, details) => {
    Geocoder.from(details.description)
      .then((json) => {
        const { lat, lng } = json.results[0].geometry.location;
        console.log("Latitude:", lat, "Longitude:", lng);
        let newRegion = calculateDelta(lat, lng, 100, 10);
        console.log("new = ", newRegion);
        setRegion(newRegion);
        handleRegionChange(newRegion);
      })
      .catch((error) => console.warn(error));
  };

  const setCurrentLocation = async (lat, lng) => {
    setLocation({
      region: {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 5,
        longitudeDelta: 5,
      },
    });
    setLoading(false);
  };

  function handleRegionChange(region) {
    console.log(region);
    setCenter(region);
  }

  const saveLocation = () => {
    // Do something with the selected location
  };

  const calculateDelta = (lat, lon, accuracy, zoomLevel) => {
    const earthCircumference = 40075.016686; // in km
    const metersPerPx =
      (earthCircumference * Math.cos((lat * Math.PI) / 180)) /
      Math.pow(2, zoomLevel + 8);

    const latDelta = accuracy / (111111 * metersPerPx);
    const lonDelta =
      accuracy / (111111 * metersPerPx * Math.cos((lat * Math.PI) / 180));

    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta: latDelta,
      longitudeDelta: lonDelta,
    };
  };

  return (
    <AllMapContainer>
      {loading ? (
        <MapContainer>
          <ActivityIndicator size="large" />
        </MapContainer>
      ) : (
        <MapContainer>
          <SearchBar>
            <SearchSuggest
              keepResultsAfterBlur={true}
              placeholder="Search"
              onPress={handleSelectAddress}
              onFail={(error) => console.error(error)}
              query={{
                key: "AIzaSyA-Pb23fMnh-ofKWhoP9PC9Aaj9C81MCQM",
                language: "en",
              }}
            />
          </SearchBar>
          <SmallMapContainer>
            <MapView
              style={{ flex: 1 }}
              provider={"google"}
              initialRegion={location.region}
              showsUserLocation={true}
              showsMyLocationButton={true}
              showsCompass={true}
              zoomEnabled={true}
              zoomControlEnabled={true}
              rotateEnabled={false}
              region={region}
              mapType="standard"
              onMapReady={() => console.log("Map is ready!")}
              onMapError={(error) => console.log(error)}
              // onPress={(e) => console.log(e.nativeEvent)}
              onMarkerPress={(e) => console.log(e.nativeEvent.coordinate)}
              // onRegionChange={(e) => console.log(e.nativeEvent)}
              // onRegionChangeComplete={(e) => console.log(e.nativeEvent)}
              onRegionChangeComplete={handleRegionChange}
            >
              <Marker
                coordinate={{
                  latitude: center?.latitude,
                  longitude: center?.longitude,
                }}
              />
            </MapView>

            <BlueButton onPress={closeModal}>
              <BlueButtonText>Save</BlueButtonText>
            </BlueButton>
          </SmallMapContainer>
        </MapContainer>
      )}
    </AllMapContainer>
  );
}
