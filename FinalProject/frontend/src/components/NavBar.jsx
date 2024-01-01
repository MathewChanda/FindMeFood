import React from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Heading, 
} from '@chakra-ui/react'

import { 
  HamburgerIcon,  
  AddIcon, 
  ExternalLinkIcon, 
  RepeatIcon, 
  EditIcon 
} from '@chakra-ui/icons'; 

import "../styles/NavBar.css"
import { Icon } from '@chakra-ui/react' 
import { MdFastfood } from 'react-icons/md'; 
import { MdFavorite } from 'react-icons/md'; 
import { MdAccountCircle } from 'react-icons/md'; 
import { MdLogout } from 'react-icons/md'; 
import { useNavigate } from "react-router-dom"; 

function NavBar() {
  const navigate = useNavigate();
  return (
    <div id="parentDiv">
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon/>}
          variant='outline'
          p='3'
        />
        <MenuList>
          <MenuItem icon={<Icon boxSize="1.2em" as={MdFastfood}/>} onClick={() => navigate("/")}>
            Restaurants 
          </MenuItem>
          <MenuItem icon={<Icon boxSize="1.2em" as={MdFavorite}/>} onClick={() => navigate("/favorites")}>
            Favorites
          </MenuItem>
          <MenuItem icon={<Icon boxSize="1.2em" as={MdLogout}/>} onClick={() => {
              fetch("/api/logout").then(() => navigate('/login')); 
            }}>
            Logout
          </MenuItem>
        </MenuList>
        <Heading id="headerText">FindMeFood</Heading>
      </Menu>
    </div>
        
  )
}

export default NavBar;
