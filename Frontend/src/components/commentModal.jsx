import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Center } from '@chakra-ui/react'
import { SimpleGrid, Flex, Input, VisuallyHidden, Textarea, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import axios from 'axios'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

const CommentModal = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const hiddenFileInput = useRef(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [postOject, setPostObject] = useState({
        title: "",
        content: "",
        isPublic: false,
        fileUrl: ""
    });

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setFile(fileUploaded);
    };
    const handleSubmit = event => {
        event.preventDefault();
        if (postOject.title === "" || postOject.content === "") {
            setError("Please fill all the fields");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }
        if (!file) {
            setError("Please select an image");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }
        // if (!supportedFileTypes(file)) {
        //     setError("File type not supported");
        //     setTimeout(() => {
        //         setError(null);
        //     }, 3000);
        //     return;
        // }


        if (file.size > 10000000) {
            setError("File size too large");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }
        const formData = new FormData();
        formData.append("title", postOject.title);
        formData.append("content", postOject.content);
        formData.append("isPublic", postOject.isPublic);
        formData.append("fileUrl", file);
        axios.post("http://localhost:5000/stories", formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(res => {
            if (res.data.error) {
                setError(res.data.error);
                setTimeout(() => {
                    setError(null);
                }, 3000);
                return;
            }
            else if (res.data) {
                setSuccess("Post created successfully");
                setTimeout(() => {
                    setSuccess(null);
                    navigate('/home')
                }, 3000);
                setFile("");
                setPostObject({
                    title: "",
                    content: "",
                    isPublic: false,
                });
            }
        }
        ).catch(err => {
            console.log(err);
            setError("Something went wrong");
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
        );


    };

    return (
        <>
            <ModalContent py={6}>
                <ModalHeader mb={-4} textAlign="center">&#9998; What's on your mind?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {error && <Alert status="error">
                        <AlertIcon />
                        <AlertTitle mr={2}>{error}</AlertTitle>
                    </Alert>}
                    {success && <Alert status="success">
                        <AlertIcon />
                        <AlertTitle mr={2}>{success}</AlertTitle>
                    </Alert>}

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
                            <VisuallyHidden>Title</VisuallyHidden>
                            <Input mt={0} type="text" placeholder="Title" value={postOject.title} onChange={(e) => {
                                setPostObject({
                                    ...postOject,
                                    title: e.target.value
                                })
                            }} />
                        </Flex>
                        <Flex>
                            <VisuallyHidden>Content</VisuallyHidden>
                            <Textarea mt={0} type="text" placeholder="Content" color="#555555" value={postOject.content} onChange={
                                (e) => {
                                    setPostObject({
                                        ...postOject,
                                        content: e.target.value
                                    })
                                }
                            } />
                        </Flex>
                        <Flex>
                            <VisuallyHidden>Public</VisuallyHidden>
                            <Button fontWeight="light" color={'#555555'} _hover={{
                                border: "1px solid green.400",
                                shadow: "md"
                            }} w="full" mt={0} py={2} borderRadius={50} onClick={(e) => {
                                setPostObject({
                                    ...postOject,
                                    isPublic: true
                                })
                            }}>Public</Button>

                            <Button fontWeight="light" borderRadius={50} color={'#555555'} _hover={{
                                border: "1px solid green.400"
                            }} w="full" mt={0} ml={2} py={2} onClick={(e) => {
                                setPostObject({
                                    ...postOject,
                                    isPublic: false
                                })

                            }}>Private</Button>

                        </Flex>
                        <Center>
                            {postOject.isPublic.toString() === "true" ? <Text color="green">Public</Text> : <Text color="orange">Private</Text>
                            }
                        </Center>

                        {!file ? <Flex justifyContent="space-between">
                            <div>
                                <VisuallyHidden>Select</VisuallyHidden>
                                <Button bg={'#ffffff'} fontWeight="light" color={'#555555'}
                                    border="1px solid #ED2727"
                                    _hover={{
                                        color: "#555555",
                                        shadow: "md",
                                        border: "1px solid #ED2727"
                                    }} w="full" mt={0} py={2} onClick={handleClick}>
                                    <AiFillCamera />
                                </Button>
                                <Input mt={0} ref={hiddenFileInput} onChange={handleChange} type="file" placeholder="profile" display="none" />
                            </div>
                            <div>
                                <Button bg={'#ED2727'} fontWeight="light" color={'#ffffff'} _hover={{
                                    border: "1px solid #ED2727",
                                    shadow: "md"
                                }} w="full" mt={0} py={2} onClick={handleSubmit}>Post</Button>
                            </div>
                        </Flex> : <Flex justifyContent="space-between">
                            <div>
                                <VisuallyHidden>Change Picture</VisuallyHidden>
                                <Button bg={'#ffffff'} fontWeight="light" color={'#555555'}
                                    border="1px solid #ED2727"
                                    _hover={{
                                        color: "#555555",
                                        shadow: "md",
                                        border: "1px solid #ED2727"
                                    }} w="full" mt={0} py={2} onClick={handleClick}>
                                    <AiFillCamera />
                                </Button>
                                <Input mt={0} ref={hiddenFileInput} onChange={handleChange} type="file" placeholder="profile" display="none" />
                            </div>
                            <div>
                                <Button bg={'#ED2727'} fontWeight="light" color={'#ffffff'} _hover={{
                                    border: "1px solid #ED2727",
                                    shadow: "md"
                                }} w="full" mt={0} py={2} onClick={handleSubmit}>Post</Button>
                            </div>
                        </Flex>
                        }
                        {file && <Text color="#777777" fontWeight="500">{file.name}</Text>}

                    </SimpleGrid >
                </ModalBody>
            </ModalContent>
        </>
    )
}

export default CommentModal