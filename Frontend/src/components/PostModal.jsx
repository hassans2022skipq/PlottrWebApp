import { ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Center } from '@chakra-ui/react'
import { SimpleGrid, Flex, Input, VisuallyHidden, Textarea } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'


const PostModal = () => {
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
            <ModalContent py={6}>
                <ModalHeader mb={-4} textAlign="center">&#9998; What's on your mind?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
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
                            <Input mt={0} type="text" placeholder="Title" />
                        </Flex>
                        <Flex>
                            <VisuallyHidden>Content</VisuallyHidden>
                            <Textarea mt={0} type="text" placeholder="Content" />
                        </Flex>

                        {!file ? <Flex justifyContent="space-between">
                            <div>
                                <VisuallyHidden>Profile Picture</VisuallyHidden>
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
                                }} w="full" mt={0} py={2}>Post</Button>
                            </div>
                        </Flex> : <Flex justifyContent="space-between">
                            <div>
                                <VisuallyHidden>Profile Picture</VisuallyHidden>
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
                                }} w="full" mt={0} py={2}>Post</Button>
                            </div>
                        </Flex>
                        }
                        {file && <p fontWeight="500">{file.name}</p>}

                    </SimpleGrid >
                </ModalBody>
            </ModalContent>
        </>
    )
}

export default PostModal