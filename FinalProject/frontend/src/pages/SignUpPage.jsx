import React from 'react'; 
import {useState,useEffect} from 'react'; 
import { FormControl, FormLabel, Checkbox, Input, Box, Stack, Heading, HStack, Button, Container, Text} from '@chakra-ui/react';
import { PasswordField } from '../components/PasswordField'; 
import "../styles/SignUpPage.css"; 
import {useNavigate} from 'react-router-dom'; 
 
export default function SignUpPage() {

    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [username, setUsername] = useState(''); 
    const navigate = useNavigate();   

   const onSubmit = () => {
       // fetch call here 
      fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
            firstName : firstName, 
            lastName : lastName, 
            email : email, 
            username : username, 
            password : password 
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    } )
        .then((res) => {
            if(res.ok){
              navigate("/")
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
            <Stack spacing="6">
            </Stack>
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
              <button onClick={() => navigate("/signup")}>
                <Heading as='h3' size='lg'>
                  Create an account
                </Heading>
              </button>
                <HStack spacing="1" justify="center">
                <Text color="muted">Already have an account? </Text>
                  <button onClick={() => navigate("/login")}>
                    <Button variant="link" colorScheme="teal">
                      Login
                    </Button>
                  </button>
                  </HStack>
              </Stack>
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="name">First Name</FormLabel>
                    <Input id="firstname" type="text" focusBorderColor='teal' onChange={(e) => setFirstName(e.target.value)}/>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="name">Last Name</FormLabel>
                    <Input id="lastname" type="text" focusBorderColor='teal'onChange={(e) => setLastName(e.target.value)}/>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Username</FormLabel>
                    <Input id="username" type="text" focusBorderColor='teal' onChange={(e) => setUsername(e.target.value)}/>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" type="email" focusBorderColor='teal' onChange={(e) => setEmail(e.target.value)}/>
                  </FormControl>
                  <PasswordField setter={setPassword}/> 
                </Stack>
                <Stack spacing="6">
                <Button colorScheme='teal' onClick={onSubmit}>Create Account</Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </div>
    )
} 