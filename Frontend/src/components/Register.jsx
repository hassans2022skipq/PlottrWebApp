import { useRef, useState } from "react";
import { SimpleGrid, Flex, Input, Button, VisuallyHidden } from "@chakra-ui/react";
import { AiFillCamera } from 'react-icons/ai'
import axios from "axios";

const Register = () => {
    const hiddenFileInput = useRef(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [userObject, setUserObject] = useState({
        username: "",
        email: "",
        password: "",
        profile: null
    });

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setUserObject({
            ...userObject,
            profile: fileUploaded
        });

    };

    const handleSubmit = event => {
        event.preventDefault();
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
        const formData = new FormData();
        formData.append("username", userObject.username);
        formData.append("email", userObject.email);
        formData.append("password", userObject.password);
        formData.append("fileUrl", userObject.profile);
        axios.post('http://localhost:5000/register', formData)
            .then(res => {
                if (res.data.success) {
                    setSuccess('Form submitted successfully!');
                    setError('');
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
                } else {
                    setError(res.data.message);
                    setSuccess('');
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
            })
            .catch(error => {
                if (error.response) {
                    setError('Error: ' + error.response.data.message);
                } else {
                    setError('Error: ' + error.message);
                }
                setSuccess('');
            });

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
                {success && <p style={{ color: "green" }}>{success}</p>}
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
                {!userObject.profile ? <Flex>
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
                {userObject.profile && <p fontWeight="500">{userObject.profile.name}</p>}
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