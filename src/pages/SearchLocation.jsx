import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import Geocoder from "./Geocoder";
import { useState } from "react";
import getCenter from "geolib/es/getCenter";

const locations = [
  "Terlingua",
  "Telluride",
  "Perryville",
  "Hardwick",
  "Los Angeles",
  "East Point",
  "Hurricane",
  "Kerhonkson",
  "Maryville",
  "West Farmington",
  "Grandview",
  "Lake Arrowhead",
  "Putney",
  "Greentown",
  "La Grange",
  "China Grove",
  "Joshua Tree",
  "Miami",
];

const SearchLocation = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState();
  const [suggestions, setSuggestions] = useState();
  const fetchData = (value) => {
    const results = locations.filter((location) => {
      return value && location.toLowerCase().includes(value);
    });
    setSuggestions(results);
  };
  const [viewport, setViewport] = useState();

  const handleChange = (value) => {
    setInputValue(value);
    fetchData(value);
  };

  const handleSubmit = async (event) => {
    if (event.key == "Enter") {
      const data = await (
        await fetch(
          `https://listing-api-c19z.onrender.com/data?info.location.city_like=${event.target.value}`
        )
      ).json();

      setData(data);
      // set state when the data received
      const coordinates = data.map((coord) => ({
        longitude: coord.info.location.long,
        latitude: coord.info.location.lat,
      }));
      const center = getCenter(coordinates);
      setViewport({
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 8,
      });
    }
  };

  // console.log(data)
  return (
    <div>
      <h2>Enter your location</h2>
      <div style={{ position: "relative", width: "200px" }}>
        <input
          type="text"
          placeholder="Enter location"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => handleSubmit(e)}
        />
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            background: "#ffffff",
            width: "100%",
            maxHeight: "300px",
          }}
        >
          {suggestions &&
            suggestions.map((suggestion, i) => {
              return (
                <div key={i} style={{ padding: "10px 20px" }}>
                  {suggestion}
                </div>
              );
            })}
        </div>
      </div>
      <div
        style={{
          height: 400,
          width: "100%",
          position: "relative",
        }}
      >
        {viewport && (
          <ReactMapGL
            mapboxAccessToken={import.meta.env.VITE_APP_MAP_TOKEN}
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          >
            <Marker
              longitude={viewport.longitude}
              latitude={viewport.latitude}
            />
            <NavigationControl position="top-right" />
            {/* <Geocoder /> */}
          </ReactMapGL>
        )}

        {viewport &&
          data.map((property, i) => (
            <div key={i}>
              <h3>Title: {property.info.title}</h3>
              <h4>Price: {property.info.price}</h4>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchLocation;
