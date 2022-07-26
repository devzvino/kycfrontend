import axios from "axios";
import { GOOGLE_API_KEY } from "../environmentVariables";

export const getDistance = async ({ currentLocation, coroodinates }) => {
  console.log(currentLocation);
  //   const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.coords.latitude},${origin.coords.longitude}&destination=${selectedLocation.latitude},${selectedLocation.longitude}&key=${GOOGLE_API_KEY}`;
  //   const response = await axios(url)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
};
