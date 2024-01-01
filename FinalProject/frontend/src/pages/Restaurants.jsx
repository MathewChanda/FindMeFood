import React, { useRef, useState, useEffect } from 'react'; 
import '../styles/Restaurants.css'
import { Heading, Button, Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark, 
    Box, 
    Tooltip, 
    Tag, 
    TagLabel, 
    TagCloseButton, 
    Input, 
    Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter} from '@chakra-ui/react';
import FoodCard from '../components/FoodCard'; 
import NavBar from '../components/NavBar';  
import { useNavigate } from "react-router-dom";  
import ReactMapGl, {Marker, Popup} from "react-map-gl";
import { IconButton } from '@chakra-ui/react' 

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


export default function RestaurantsPage(){

    const defaultProps = {
        center: {
          lat: 
          35.77938776419005,
          lng: -78.9
        },
        zoom: 20
    };

    const { isOpen, onOpen, onClose } =  useDisclosure(); 
    const [location, setLocation] = React.useState("Raleigh");
    const [radius, setRadius] = React.useState(15);
    const [include, UseInclude] = useState([]); 
    const [rating, setRating] = useState(1); 
    const navigate = useNavigate();  
    const [moneyValue, setMoneyValue] = useState(1); 
    const [places, setPlaces] = useState([]); 
    const [cusine, setCusine] = useState(''); 
    const [isDisable, setIsDisable] = useState(false); 
    const [favorites, setFavorites] = useState([]); 


    const initialViewport = {
        latitude: 35.78007811922566,
        longitude: -78.67543883863452,
        zoom: 10
      };


    const [viewport, setViewport] = useState(initialViewport);
    const [popupInfo, setPopupInfo] = useState(null);


    const handleIncludeChange = (event) => { 
        if(event.key === 'Enter' && !include.includes(event.target.value)) {
            UseInclude([...include, event.target.value])  
        }
    }

    const removeInclude = (name) => {
        UseInclude(() => include.filter(x => x !== name)); 
    }

   
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
                alert("You are Offline!"); 
                setIsDisable(true); 
                return; 
            }
  
            setFavorites([...json]);})
    }, [])

    const useModalClose = async () => {
        const random = Math.floor(Math.random() * include.length)
        const response = await  fetch("api/food", {
            method: "POST",
            'mode':'cors', 
            headers: {
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token', 
                "Content-type": "application/json", 
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Credential' : 'true', 
                'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
            }, 
            body : JSON.stringify({
                location: location,
                term : include[random], 
                price : moneyValue, 
                radius : radius
            }) 
        } ); 
        

        console.log("we made it here bro yolo")
        const json = await response.json(); 
        setCusine(include[random])
        

        setPlaces([...json])
        onClose(); 
    }

    const getDollarSign = (val) => {
        if(val === 1){
            return "$"
        }

        else if(val === 2) {
            return "$$" 
        }

        else if(val === 3) {
            return "$$$" 
        }

        return "$$$$"
    }

    return(
        <div>
        <NavBar/>  
        <div id="rootDiv"> 
        <div style={{ height: '100vh', width: "100%" }}>
        <ReactMapGl
            mapboxApiAccessToken={MAP_BOX_TOKEN}
            mapStyle={'mapbox://styles/mapbox/streets-v9'} //+ MAPBOX_MAP_STYLES.STREET}
            height="100vh"
            width="100%"
            {...viewport}
            onViewportChange={newViewport => setViewport(newViewport)}
        >
            {
                places.map((i, idx) => {
                    console.log(i)
                    return(
                        <div key={idx}>
                            <Marker 
                                longitude={i.coordinates.longitude} 
                                latitude={i.coordinates.latitude}
                                anchor="bottom"
                            >
                                <Pin name={i.name}/> 
                            </Marker>
                        </div>
                    )
                }) 
            }

        </ReactMapGl>
            </div>
                <div style={{margin : 100, marginTop : 0, marginBottom : 0, display : "flex", justifyContent : "center", alignItems : "center", flexDirection : "column"}}>
                    <Heading style={{textAlign: "center", marginTop : 10, marginBottom : 10}}>Suggestions</Heading>
                    <Button style={{marginTop : 20, color: "white"}} isDisabled={isDisable} onClick={onOpen} colorScheme="teal">Find New Food</Button>   
                    <div id="food">
                        {places.map((e) => {
                                
                                    let isFav = false; 
                                    for(let i = 0; i < favorites.length; i += 1){
                                        if(e.url === favorites[i].res_link){
                                            isFav = true; 
                                        }
                                    }
                                    console.log(isFav)
                                    return(<FoodCard 
                                                link={e.url}
                                                image={e.image_url} 
                                                cusine={e.cusine ? e.cusine : 'Food'} 
                                                name={e.name} 
                                                price={e.price}
                                                isClose={e.is_close} 
                                                address={e.location.display_address.join(" ")} 
                                                rating={e.rating} 
                                                reviewCount={e.review_count} 
                                                latitude={e.coordinates.latitude}
                                                longitude={e.coordinates.longitude}
                                                isFavorite={isFav}
                                                favorites={favorites}
                                                setFav={setFavorites} 
                                            />)})                
                                        }
                    </div>
                    <Modal size={'xl'} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader>Search for Restaurant</ModalHeader>
                        <ModalCloseButton />
                            <ModalBody pb={6}>
                                <Text fontSize="xl">Radius: {radius}</Text>
                                <Slider value={radius} defaultValue={radius} min={0} max={30} step={.1} onChange={(val) => setRadius(val)}> 
                                    <SliderTrack bg='gray'>
                                    <Box position='relative' right={10} />
                                    <SliderFilledTrack bg='teal' />
                                    </SliderTrack>
                                    <SliderThumb boxSize={6} />
                                </Slider>
                                <Text fontSize="xl">Price: {getDollarSign(moneyValue)}</Text> 
                                <Slider aria-label='slider-ex-6'value={moneyValue} defaultValue={moneyValue} min={1} max={4} step={1}  onChange={(val) => setMoneyValue(val)}>
                                    <SliderTrack bg='gray'>
                                    <Box position='relative' right={10} />
                                    <SliderFilledTrack bg='teal' />
                                    </SliderTrack>
                                    <SliderThumb boxSize={6} />
                                </Slider>

                                <Text fontSize="xl">Minimum Rating: {rating}</Text> 
                                <Slider aria-label='slider-ex-6' value={rating} defaultValue={rating} min={1} max={5} step={.1}  onChange={(val) => setRating(val)}>
                                    <SliderTrack bg='gray'>
                                    <Box position='relative' right={10} />
                                    <SliderFilledTrack bg='teal' />
                                    </SliderTrack>
                                    <SliderThumb boxSize={6} />
                                </Slider>
                                <Text fontSize="xl" style={{marginTop: 20}}>Location: </Text>
                                <Input placeholder="Location" value={location} isRequired={true} onChange={(event) => setLocation(event.target.value)}/>
                                <Text fontSize="xl" style={{marginTop: 20}}>Include Cusine:</Text>
                                <Input placeholder="Enter Cusine" isRequired={true} onKeyDown={handleIncludeChange}/>
                                <div style={{marginTop : 20}}>
                                    {include.map((c) => (
                                        <Tag
                                        size={"lg"}
                                        key={c}
                                        borderRadius='full'
                                        variant='solid'
                                        colorScheme='teal'
                                        >
                                        <TagLabel>{c}</TagLabel>
                                        <TagCloseButton onClick={() => removeInclude(c)}/>
                                        </Tag>
                                    ))}
                                </div>
                            </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='teal' mr={3} onClick={useModalClose}>
                            Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal> 
                </div>
                
        </div>
        </div>
    )
}