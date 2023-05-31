import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const Geocoder = () => {
  const ctrl = new MapBoxGeocoder({
    accessToken: import.meta.env.VITE_APP_MAP_TOKEN,
    marker: false,
    collapsed: false,
  });

  useControl(() => ctrl);
  //   ctrl.on('result', (e)=>{
  //     const coords = e.result.geometry.coordinates;
  //   })
  return null;
};

export default Geocoder;
