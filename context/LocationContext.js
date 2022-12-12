import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { keys } from '../environmentVariables';

export const LocationContext = createContext({});

export const LocationProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [locations, setLocations] = useState([]);

	// getting user from storage
	const checkingIfUserIsStored = async () => {
		const storedUser = await AsyncStorage.getItem('@user');
		if (storedUser !== null) {
			setUser(JSON.parse(storedUser));
		}
	};

	const addLocation = (input) => {
		setLocations([...locations, { input }]);
	};

	const removeLocation = () => {
		setLocations(locations.filter((location) => location.id !== user._id));
	};

	const placeLocations = async () => {
		const response = await fetch(`${keys.apiURL}api/home/my/${user._id}`);
		// const responsew = await fetch(`${keys.apiURL}api/work/my/${_id}`);
		const json = await response.json();
		// const jsonw = await responsew.json();
		// setWorkLocation(jsonw);
		setLocations(json);
	};

	// console.log(locations);

	useEffect(() => {
		checkingIfUserIsStored();
		placeLocations();
	}, []);

	return (
		<LocationContext.Provider
			value={{ locations, addLocation, removeLocation }}
		>
			{children}
		</LocationContext.Provider>
	);
};

// delete home verification card
// const handleDeleteProcess = async (id, title) => {
//     let newArray;
//     await axios.delete(
//         title === 'home'
//             ? `${keys.apiURL}api/home/${id}`
//             : `${keys.apiURL}api/work/${id}`
//     );
//     Toast.show({
//         type: 'success',
//         text1: 'Deleted',
//         text2: 'This is some something 👋',
//     });
//     newArray = allLocation.filter((i) => i._id !== id);
//     setAllLocation(newArray);
// };
