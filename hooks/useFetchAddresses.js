import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export function useFetchAddresses() {
  const { user } = useContext(UserContext);
  let id;

  const [addressHome, setAddressHome] = useState([]);
  const [addressWork, setAddressWork] = useState([]);
  const [mergedAddress, setMergedAddress] = useState();

  // getting single user details based on id
  const getAllData = async () => {
    id = user._id;

    let fetchOk = (...args) =>
      fetch(...args).then((res) =>
        res.ok
          ? res
          : res.json().then((data) => {
              throw Object.assign(new Error(data.error_message), { name: res.statusText });
            })
      );

    Promise.all(
      [
        `https://kycbackendapp.herokuapp.com/api/home/my/${id}`,
        `https://kycbackendapp.herokuapp.com/api/work/my/${id}`,
      ].map((url) => fetchOk(url).then((r) => r.json()))
    )
      .then(([d1, d2]) => {
        setAddressHome(d1);
        setAddressWork(d2);
        setMergedAddress(d1, d2);

        mergedAddress
          ? (() => {
              for (let i = 0; mergedAddress.length > i; i++) {
                // console.log("hey");
                AsyncStorage.setItem("@mergedAddresses", JSON.stringify(mergedAddress));
              }
            })()
          : null;
      })
      .catch((e) => console.error(e));
  };

  // using the fetch to populate all data
  useEffect(() => {
    // calling the data below
    getAllData();
  }, []);
}
