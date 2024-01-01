import React from 'react';
import './App.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { 
  ChatIcon, 
  CheckCircleIcon, 
  EmailIcon, 
  PhoneIcon, 
  StarIcon, 
  WarningIcon 
} from '@chakra-ui/icons';

import { 
  Tabs, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel, 
  List, 
  ListItem, 
  ListIcon,
  ChakraProvider,
  Card, CardHeader, CardBody, CardFooter, Text, SimpleGrid, Heading, Button, Image, Flex, Avatar, Box,
  OrderedList,MdCheckCircle,
  UnorderedList
} from '@chakra-ui/react';

import SignUpPage from './pages/SignUpPage';
import Restaurants from './pages/Restaurants';
import FavoritesPage from './pages/Favorites';
import Offline from './pages/Offline';

const App = () => (
  <div className ="App">
    <ChakraProvider>
      <Routes>
        <Route path="/"  element={<Restaurants/>}></Route>
        <Route path="/favorites"  element={<FavoritesPage/>}></Route>
        <Route path="/login"  element={<LoginPage/>}></Route>
        <Route path="/signup"  element={<SignUpPage/>}></Route>
        <Route path="/error" element={<Offline/>}> </Route>
      </Routes>
    </ChakraProvider>
  </div>
);

export default App;

