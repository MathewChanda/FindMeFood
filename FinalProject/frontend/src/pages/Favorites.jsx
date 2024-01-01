import React, { useRef, useState, useEffect } from 'react'; 
import '../styles/FavoritePage.css'
import { Heading, Button, Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Box, 
    Tag,
    TagLabel, 
    TagCloseButton, 
    Input, 
    Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter} from '@chakra-ui/react';
import GoogleMapReact from 'google-map-react';
import FoodCard from '../components/FoodCard'; 
import Rating from '../components/Rating'
import { BsPinFill } from 'react-icons/bs';
import NavBar from '../components/NavBar';  
import { useNavigate } from "react-router-dom";   
import ReactMapGl, {Marker, Popup} from "react-map-gl";
import { IconButton } from '@chakra-ui/react' 
import { Tooltip } from '@chakra-ui/react'

let MAP_BOX_TOKEN = "pk.eyJ1IjoiY2hpbWljaGFuZGEiLCJhIjoiY2xldnpybGJnMDZldDN0cWc3ODJmdTRvbSJ9.x556e3c1FEo6m_Pd5LQPwg"; 




const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

// const pinStyle = {
//   cursor: 'pointer',
//   fill: '#d00',
//   stroke: 'none'
// };

function Pin(prop) {
  return (
    <svg height={20} viewBox="0 0 24 24" style={{}}>
    <Tooltip label={prop.name}>
        <path d={ICON} />
    </Tooltip>
    </svg>
  );
}


export default function FavoritesPage() {
    const defaultProps = {
        center: {
          lat: 59.955413,
          lng: 30.337844
        },
        zoom: 20
      };

    const navigate = useNavigate();  
    const [places, setPlaces] = useState([]);  
    
    useEffect(() => {
        fetch("api/favorites").then(res => {
            if(res.ok){
                const json = res.json(); 
                return json; 
            }

            else {
                navigate("/login");   
                return; 
            }

        }).then(json => {
            if(json.isOffline){
               alert("You are Offline!")
            }

            setPlaces([...json]); 
        })
    }, [])

    const initialViewport = {
        latitude: 35.78007811922566,
        longitude: -78.67543883863452,
        zoom: 10
      };


    const [viewport, setViewport] = useState(initialViewport);
    const [popupInfo, setPopupInfo] = useState(null);

    return(
        <div>
            <NavBar/> 
            <div id="rootDiv"> 
            <div style={{ height: '100vh', width: '100%' }}>
                <ReactMapGl
                    mapboxApiAccessToken={MAP_BOX_TOKEN}
                    mapStyle={'mapbox://styles/mapbox/streets-v9'} //+ MAPBOX_MAP_STYLES.STREET}
                    height="100%"
                    width="100%"
                    {...viewport}
                    onViewportChange={newViewport => setViewport(newViewport)}
                >
                    {
                        places.map((i, idx) => {
                            return(
                                <div key={idx}>
                                    <Marker 
                                        longitude={i.res_longitude} 
                                        latitude={i.res_latitude}
                                        anchor="bottom"
                                    >
                                        <Pin name={i.res_name}/> 
                                    </Marker>
                                </div>
                            )
                        }) 
                    }

                </ReactMapGl>
                </div>
                <div style={{margin : 100, marginTop : 0, marginBottom : 0, display : "flex", justifyContent : "center", alignItems : "center", flexDirection : "column"}}>
                    <Heading style={{textAlign: "center", marginTop : 10, marginBottom : 10}}>Favorites</Heading>
                    <div id="food">
                        {places.map((e, idx) => <FoodCard 
                                                    id={e.res_link}
                                                    key={idx}
                                                    link={e.res_link}
                                                    image={e.res_image} 
                                                    cusine={'Favorite'} 
                                                    name={e.res_name} 
                                                    price={e.res_price}
                                                    isClose={e.res_is_close} 
                                                    address={e.res_address} 
                                                    rating={e.res_rating} 
                                                    reviewCount={e.res_review_count} 
                                                    isFavorite={true} 
                                                    setFav={setPlaces}  
                                />)}
                    </div>
                </div>
                
            </div>
        </div>
    )
}


