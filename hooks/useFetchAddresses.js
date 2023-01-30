import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useFetchAddresses() {
  let id;

  const [addressHome, setAddressHome] = useState([]);
  const [addressWork, setAddressWork] = useState([]);
  const [mergedAddress, setMergedAddress] = useState();

  // getting single user details based on id
  const getAllData = async () => {
    // get user id from async storage
    const storedUser = await AsyncStorage.getItem("@user");
    let asyncData = JSON.parse(storedUser);
    id = asyncData._id;

    let fetchOk = (...args) =>
      fetch(...args).then((res) =>
        res.ok
          ? res
          : res.json().then((data) => {
              throw Object.assign(new Error(data.error_message), { name: res.statusText });
            })
      );

    Promise.all([`https://kycbackendapp.herokuapp.com/api/home/my/${id}`, `https://kycbackendapp.herokuapp.com/api/work/my/${id}`].map((url) => fetchOk(url).then((r) => r.json())))
      .then(([d1, d2]) => {
        setAddressHome(d1);
        setAddressWork(d2);
        setMergedAddress(d1, d2);

        mergedAddress
          ? (() => {
              for (let i = 0; mergedAddress.length > i; i++) {
                console.log("hey");
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
