import { CardAnimationContext } from "@react-navigation/stack";
import route from "color-convert/route";
import React from "react"
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native"
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { COLORS, FONTS, icons, SIZES} from '../constants'
import MapViewDirections from "react-native-maps-directions";
import { result } from "lodash";
const OrderDeliv = () => {
    const MapView = React.useRef()

    const {restaurant, setRestaurant } = React.useState(null)
    const {streetName, setStreetName } = React.useState("")
    const {fromLocation, setFromLocation} = React.useState(null)
    const {toLocation, setToLocation} = React.useState(null)
    const {region, setRegion} = React.useState(null)
    const {duration, setDuration} = React.useState(0)
    const {isReady, setReady}= React.useState(false)
    const {angle, setAngle} = React.useState(0)

    React.useEffect(() => {
        let {restaurant, currentLocation} = route.params;

        let fromLoca = currentLocation.gps
        let toLocation = restaurant.location
        let street = currentLocation.streetName

        let mapRegion = { 
            latitude: (fromLoca.latitude + toLocation.latitude) /2,
            longitude: (fromLoca.longitude + toLocation.longitude) /2,
            latitudDelta: Math.abs(fromLoca.latitude - toLocation.latitude) *2,
            longitudeDelta: Math.abs(fromLoca.longitude - toLocation.longitude)*2
        }
        setRestaurant(restaurant)
        setStreetName(street)
        setFromLocation(fromLoca)
        setToLocation(toLocation)
        setRegion(mapRegion)

    },[])

    function calcAngle(coordinates) {
        let startLat = coordinates[0]["latitude"]
        let startLng = coordinates[0]["longitude"]
        let endlati = coordinates[1]["latitude"]
        let endLong = coordinates[1]["longitude"]

        let dx = endlati - startLat
        let dy = endLong -startLng

        return Math.atan2(dy, dx) * 100 / Math.PI


    }


    function renderMap() {
        const Marker = () => {
            <Marker 
                coordinate={toLocation}
            >
                <View
                    style={{
                        height:40,
                        width: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.white
                    }}
                >
                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.primary
                        }}
                    >
                        <Image 
                            source={icons.pin}
                            style={{
                                width:25,
                                height: 25,
                                tintColor: COLORS.white,
                            }}
                        />

                    </View>
                </View>

            </Marker>
            const carIcon= () => {
                <Marker
                    coordinate={fromLocation}
                    anchor = {{x: 0.5 , y:0.5}}
                    flat= {true}
                    rotation = {angle}
                >
                    <Image
                        source={icons.car}
                        style={{
                            width:40,
                            height:40,

                        }}
                    />
                </Marker>
            }
        }
        return (
          <View style={{ flex:1 }}>
              <MapView
                ref={MapView}
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
                style={{ flex: 1 }}
              >
                  <MapViewDirections
                    origin={fromLocation}
                    destination={toLocation}
                    apikey={GOOGLE_API_KEY}
                    strokeWidth={5}
                    strokeColor = {COLORS.primary}
                    optimizeWaypoints={true}
                    onReady={result => {
                        setDuration(result.duration)

                        if(!isReady) {
                            MapView.current.fitToCoordinates(result.coordinate,{
                                edgePadding: {
                                    right: (SIZES.width /20),
                                    bottom: (SIZES.height/4),
                                    left: (SIZES.left /20),
                                    top: (SIZES.height) /8

                                }
                            })
                             //reposition the car 
                             
                             let nextLocation = {
                                 latitude: result.coordinate[0]["latitude"],
                                 longitude: result.coordinate[0]["longitude"]

                             }
                             if (result.coordinate.lenght >=2 ) {
                                let angle = calculateAngle(result.coordinate)
                                setAngle(angle)
                             }
                            setFromLocation(nextLocation)
                            setReady(true)
                        }
                    }}
                  />
                  { Marker()}
                  { carIcon()}
              </MapView>

          </View>  
        )
    }
    return (
        <View style={{flex: 1}}>
            {renderMap()}
        </View>
    )
}

export default OrderDeliv;