import { View, Text } from 'react-native'
import React from 'react'

const InfoRow = ({ section, dataInfo }) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: '2%' }}>
            <Text style={{ width: '40%' }}>{section}:</Text>
            <Text style={{ fontWeight: 'bold', width: '55%', paddingStart: '3%' }}>{dataInfo}</Text>
        </View>
    )
}

export default InfoRow