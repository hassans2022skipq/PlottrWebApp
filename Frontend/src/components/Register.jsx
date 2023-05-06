import { useRef, useState } from "react";
import { SimpleGrid, Flex, Input, Button, VisuallyHidden } from "@chakra-ui/react";
import { AiFillCamera } from 'react-icons/ai'

const Register = () => {
    const [file, setFile] = useState(null);
    const hiddenFileInput = useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setFile(fileUploaded);
    };

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
                <Flex>
                    <VisuallyHidden>User Name</VisuallyHidden>
                    <Input mt={0} type="text" placeholder="User Name" />
                </Flex>
                <Flex>
                    <VisuallyHidden>Email Address</VisuallyHidden>
                    <Input mt={0} type="email" placeholder="Email Address" />
                </Flex>
                <Flex>
                    <VisuallyHidden>Password</VisuallyHidden>
                    <Input mt={0} type="password" placeholder="Password" />
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
                }} w="full" mt={4} py={2} type="submit">
                    Sign up for free
                </Button>
            </SimpleGrid >
        </>
    )
}

export default Register