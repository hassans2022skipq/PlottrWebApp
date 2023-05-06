import { useRef, useState } from "react";
import { SimpleGrid, Flex, Input, Button, VisuallyHidden } from "@chakra-ui/react";
import { AiFillCamera } from 'react-icons/ai'
import axios from "axios";

const Register = () => {
    const [file, setFile] = useState(null);
    const hiddenFileInput = useRef(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [userObject, setUserObject] = useState({
        username: "",
        email: "",
        password: "",
        profile: null
    });


    const handleSubmit = event => {
        event.preventDefault();
        console.log(userObject);
        if (userObject.username === "" || userObject.email === "" || userObject.password === "") {
            setError("Please fill all the fields");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }
        if (userObject.username.length < 6) {
            setError("Username must be atleast 6 characters long");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }
        if (!userObject.email.includes("@")) {
            setError("Email must be valid");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }
        if (userObject.password.length < 6) {
            setError("Password must be atleast 6 characters long");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }
        if (userObject.profile === null) {
            setError("Please upload a profile picture");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }

        setSuccess("User Registered Successfully");
    };


    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setFile(fileUploaded);
    };

    return (
        <form>
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
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Flex>
                    <VisuallyHidden>User Name</VisuallyHidden>
                    <Input mt={0} type="text" placeholder="User Name" onChange={(e) => {
                        setUserObject({
                            ...userObject,
                            username: e.target.value
                        })
                    }} />
                </Flex>
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
                {!file ? <Flex>
                    <VisuallyHidden>Profile Picture</VisuallyHidden>
                    <Button bg={'#ffffff'} fontWeight="light" color={'#555555'} _hover={{
                        background: "#ffffff",
                        color: "#555555",
                        border: "1px solid #ED2727"
                    }} w="full" mt={0} py={2} onClick={handleClick}>
                        <AiFillCamera />
                        <p style={{ marginLeft: "10px" }}>Upload Profile Picture</p>
                    </Button>
                    <Input mt={0} ref={hiddenFileInput} onChange={handleChange} type="file" placeholder="profile" display="none" />
                </Flex> : <Flex>
                    <VisuallyHidden>Profile Picture</VisuallyHidden>
                    <Button bg={'#ffffff'} fontWeight="light" color={'#555555'} _hover={{
                        background: "#ffffff",
                        color: "#555555",
                        border: "1px solid #ED2727"
                    }} w="full" mt={0} py={2} onClick={handleClick}>
                        <AiFillCamera />
                        <p style={{ marginLeft: "10px" }}>Change Picture</p>
                    </Button>
                    <Input mt={0} ref={hiddenFileInput} onChange={handleChange} type="file" placeholder="profile" display="none" />
                </Flex>
                }
                {file && <p fontWeight="500">{file.name}</p>}
                <Button bg={'#ffffff'} borderColor={"#ED2727"} color={'#ED2727'} _hover={{
                    background: "#Ed2727",
                    color: "#ffffff",
                    border: "1px solid #ED2727"
                }} w="full" mt={4} py={2} onClick={handleSubmit}>
                    Sign up for free
                </Button>
            </SimpleGrid >
        </form>
    )

}

export default Register;