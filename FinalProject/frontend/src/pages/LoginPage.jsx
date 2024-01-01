import { FormControl, FormLabel, Checkbox, Divider, Input, Box, Stack, Heading, HStack, Button, Container, Text} from '@chakra-ui/react';
import {useState, useEffect} from 'react'; 
import React from 'react'; 
import { PasswordField } from '../components/PasswordField';
import "../styles/LoginPage.css"; 
import { useNavigate } from "react-router-dom"; 
import NavBar from '../components/NavBar';  

// got inspiration from here - https://pro.chakra-ui.com/components/application/authentication 
export default function LoginPage() {
  const [username, setusername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate(); 

  const onSubmit = () => {
      // fetch call here 
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
          username : username, 
          password : password 
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  } )
      .then((res) => {
          if(res.ok){
            navigate("/"); 
          }

          else {
              alert("Username and Password cannot be authenciated") 
          }
      })
      .catch((e) => alert("Network is down")); 
  }


  return(
    <div > 
        <Container
        maxW="lg"
        py={{
          base: '12',
          md: '24',
        }}
        px={{
          base: '0',
          sm: '8',
        }}
      >
        <Stack spacing="8">
          <Box
            py={{
              base: '0',
              sm: '8',
            }}
            px={{
              base: '4',
              sm: '10',
            }}
            bg={{
              base: 'transparent',
              sm: 'bg-surface',
            }}
            boxShadow={{
              base: 'none',
              sm: 'md',
            }}
            borderRadius={{
              base: 'none',
              sm: 'xl',
            }}
          >
            <Stack spacing="6">
            <Stack
              spacing={{
                base: '2',
                md: '3',
              }}
              textAlign="center"
            >
             <Heading as='h3' size='lg'>
                Log in to your account
              </Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Don't have an account?</Text>
                <Button variant="link" colorScheme="teal" onClick={() => navigate("/signup")}>
                  Sign up
                </Button>
              </HStack>
            </Stack>
          </Stack>
            <Stack spacing="6">
              <Stack spacing="5">
                    <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input id="username" type="text" focusBorderColor='teal' onChange={(e) => setusername(e.target.value)}/>
                  </FormControl>
                  <PasswordField setter={setPassword}/> 
                </Stack>
                <Stack spacing="6">
              </Stack>
              <HStack justify="space-between">
                <Checkbox colorScheme='teal'  variant="primary" defaultChecked>Remember me</Checkbox>
                <Button variant="link" colorScheme="teal" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
              <Button colorScheme='teal' onClick={onSubmit} >Sign in</Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
    )
}