import styled from "styled-components/native";
import { Colors } from "../../constants";
import { Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");

export const MapContainer = styled.SafeAreaView`
  display: flex;
  height: 100%;
  background-color: ${Colors.white};
  border-radius: 20px;
`;

export const SearchBar = styled.View`
  z-index: 999;
  background-color: ${Colors.red};
`;

export const SearchSuggest = styled(GooglePlacesAutocomplete)`
  overflow: "scroll";
  z-index: 999;
  flex: 1;
`;

export const SmallMapContainer = styled.View`
  flex: 1;
`;

export const AllMapContainer = styled.SafeAreaView`
  box-shadow: 0px 0px 70px grey;
`;
