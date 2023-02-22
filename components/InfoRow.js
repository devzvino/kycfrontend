import { View, Text } from 'react-native'
import React from 'react'

const InfoRow = ({ section, dataInfo }) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: '1%' }}>
            <Text style={{ width: '45%', fontFamily: 'Poppins-Regular', }}>{section}:</Text>

            <Text style={{ width: '45%', paddingStart: '2%', fontFamily: 'Poppins-SemiBold', }}>{dataInfo}</Text>
        </View>
    )
}

export default InfoRow