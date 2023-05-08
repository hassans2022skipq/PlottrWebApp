import { SimpleGrid, Flex, Input, Button, VisuallyHidden } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../actions/userActions";
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux";

const Login = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const user = useSelector(state => state.user);
    let location = useLocation();
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const [userObject, setUserObject] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = event => {
        event.preventDefault();
        if (userObject.email === "" || userObject.password === "") {
            setError("Invalid credentials");
            setTimeout(() => {
                setError(null);
            }, 2000);
            return;
        }
        if (!userObject.email.includes("@")) {
            setError("Email must be valid");
            setTimeout(() => {
                setError(null);
            }, 2000);
            return;
        }

        axios.post("http://localhost:5000/login", userObject, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
            .then((res) => {
                setSuccess("Logged in successfully");

                setTimeout(() => {
                    setSuccess(null);
                }, 2000);
                dispatch(setUser(res.data.user))
            }
            ).catch((err) => {
                setError(err.response.data.message);
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
            );


    }

    useEffect(() => {
        if (user) {
            navigate('/home', { state: { from: location } });
        }
    }, [user, location]);


    return (
        <>
            <SimpleGrid
                columns={1}
                px={6}
                py={4}
                spacing={4}
                color="gray.200"
                _dark={{
                    color: "gray.700",
                }}
            >
                {success && <Alert status="success">
                    <AlertIcon />
                    <AlertTitle color="#555555" mr={2}>{success}</AlertTitle>
                </Alert>}

                {error && <Alert status="error">
                    <AlertIcon />
                    <AlertTitle color="#555555" mr={2}>{error}</AlertTitle>
                </Alert>}
                <Flex>
                    <VisuallyHidden>Email Address</VisuallyHidden>
                    <Input mt={0} type="email" placeholder="Email Address" onChange={(e) => {
                        setUserObject({
                            ...userObject,
                            email: e.target.value
                        })
                    }} />
                </Flex>
                <Flex>
                    <VisuallyHidden>Password</VisuallyHidden>
                    <Input mt={0} type="password" placeholder="Password" onChange={(e) => {
                        setUserObject({
                            ...userObject,
                            password: e.target.value
                        })
                    }} />
                </Flex>
                <Button bg={'#ffffff'} borderColor={"#ED2727"} color={'#ED2727'} _hover={{ background: "#Ed2727", color: "#ffffff", border: "1px solid #ED2727" }} w="full" mt={4} py={2} onClick={handleSubmit}>
                    Sign in
                </Button>
            </SimpleGrid>
        </>
    )
}

export default Login;