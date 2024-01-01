import React, {useState} from 'react'; 
import {Box, Image, Badge, IconButton} from '@chakra-ui/react';
import { 
   StarIcon, AddIcon, CloseIcon 
  } from '@chakra-ui/icons';
import '../styles/FoodCard.css'; 
import MissingImage from './MissingImage.png'; 
import { useNavigate } from "react-router-dom";    

// got inspiration from this https://chakra-ui.com/docs/components/box 
export default function FoodCard(prop) {
    const navigate = useNavigate();   
    const addFavorite = () => {
        console.log(prop)
        fetch("/api/add", {
            method: "POST",
            body: JSON.stringify({
                link : prop.link, 
                image : prop.image, 
                cusine : prop.cusine, 
                name : prop.name, 
                price : prop.price, 
                address : prop.address, 
                rating : prop.rating, 
                review_count : prop.reviewCount, 
                latitude : prop.latitude, 
                longitude : prop.longitude 
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        } ).then(() => {
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
                prop.setFav([...json]);})
        })
        .catch((e) => alert("Network is down")); 
    }

    const removeFavorite = () => {
        fetch("/api/remove", {
            method: "POST",
            body: JSON.stringify({
                link : prop.link, 
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        } )
            .then((res) => {
                if(res.ok){
                    return; 
                }
            }) 
            .then(() => {
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
                    prop.setFav([...json]);})
            })
            .catch((e) => alert("Network is down")); 
    }


    return (
        <div style={{"marginBottom" : 20, paddingLeft : 20, width: "100%"}}>
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' id="container">
                <a href={prop.link} target="_blank"> 
                    <Image src={prop.image} alt={"Restaurant Picture is Missing"}/>
                </a>
                <div id="favoriteTab">
                    <IconButton size="xs" aria-label='Add to friends' colorScheme="teal" icon={prop.isFavorite ? <CloseIcon/> : <AddIcon />} onClick={prop.isFavorite ? removeFavorite : addFavorite}/>
                </div>
                <Box p='6' style={{backgroundColor : 'white'}}>
                    <Box display='flex' alignItems='baseline' style={{marginRight : 10}}>
                    <Badge borderRadius='full' px='2' colorScheme='teal'>
                        {prop.isClose ? "Close" : "Open"}
                    </Badge>
                    <Box
                        color='gray.500'
                        fontWeight='semibold'
                        letterSpacing='wide'
                        fontSize='xs'
                        textTransform='uppercase'
                        ml='2'
                    >
                        {prop.price} &bull; {prop.cusine}
                    </Box>
                    </Box>
            
                    <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                    >
                     {prop.name}
                    </Box>
                    {prop.address}
                    <Box>
                    </Box>
            
                    <Box display='flex' mt='2' alignItems='center'>
                    {Array(5)
                        .fill('')
                        .map((_, i) => (
                        <StarIcon
                            key={i}
                            color={i < prop.rating ? 'teal.500' : 'gray.300'}
                        />
                        ))}
                    <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                        {prop.reviewCount} reviews
                    </Box>
                    </Box>
                    
                </Box>
            </Box>
        </div>
      )
}