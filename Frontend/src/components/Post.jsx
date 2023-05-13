
// Imports

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useColorModeValue, Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react'
import { BiChat, BiLike } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import serverUrl from "../config.js";
import axios from 'axios'
import { Modal, ModalOverlay } from "@chakra-ui/react";
import PostModal from "./PostModal";
import { useDisclosure } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useDispatch } from 'react-redux'






function isImageOrVideo(url) {
    // Get the file extension from the URL
    const extension = url.split('.').pop().toLowerCase();

    // Check if it's an image file
    if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif') {
        return 'image';
    }

    // Check if it's a video file
    if (extension === 'mp4' || extension === 'mov' || extension === 'avi') {
        return 'video';
    }

    // If it's neither an image nor a video, return null or handle as desired
    return null;
}
// Component
const Post = ({ post }) => {
    const bg = useColorModeValue("white", "gray.800");
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.600'
            backdropFilter='blur(10px) '
            backdropInvert='80%'
        />
    )
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)
    const obj = serverUrl + post.fileUrl
    const mediaType = isImageOrVideo(obj)
    const user = useSelector(state => state.user)
    const [toggle, setToggle] = useState(false)
    const handleVote = () => {
        if (toggle) {
            axios.put(serverUrl + `/stories/${post._id}/downvote`, {
                withCredentials: true,
            }).then(res => {
                if (res.data.message) {
                    setToggle(false)
                }
            }).catch(error => {
                console.error('Error:', error);

            })
        } else {
            axios.put(serverUrl + `/stories/${post._id}/upvote`, {
                withCredentials: true,
            }).then(res => {
                if (res.data.message) {
                    setToggle(true)
                }
            }).catch(error => {
                console.error('Error:', error);
            })
        }
    }

    return (
        <>
            <Card maxW='sm' my={6}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={post.user.username} src={serverUrl + post.user.fileUrl} />

                            <Box>
                                <Heading size='sm'>{post.user.username}</Heading>
                                <Text>{post.title}</Text>
                            </Box>
                        </Flex>
                        {user._id === post.user._id ? (
                            <Menu>
                                <MenuButton _hover={{
                                    border: "1px solid #ffffff",
                                    background: "transparent"
                                }
                                }>
                                    <IconButton
                                        aria-label='Options'
                                        icon={<BsThreeDotsVertical />}
                                        variant='ghost'
                                    />
                                </MenuButton>
                                <MenuList>
                                    <Link to="/home">
                                        <MenuItem _hover={{
                                            border: "1px solid #ffffff",
                                            background: "transparent",
                                            color: "#ED2727"
                                        }
                                        }>Home</MenuItem>
                                    </Link>
                                    <Link to='/profile'>
                                        <MenuItem _hover={{
                                            border: "1px solid #ffffff",
                                            background: "transparent",
                                            color: "#ED2727"
                                        }
                                        }>Profile</MenuItem>
                                    </Link>

                                </MenuList>
                            </Menu>
                        ) : null}
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>
                        {post.content}
                    </Text>
                </CardBody>
                {mediaType === 'image' ? (
                    <Image src={obj} w={'container.md'} h={'xs'} objectFit={'cover'} alt={post.title} />
                ) : mediaType === 'video' ? (
                    <video src={obj} w={'container.md'} h={'xs'} controls onCanPlay={false} />

                ) : null}

                <CardFooter
                    justify='space-between'
                    alignItems='center'
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}
                >
                    <Text color="blue">
                        {post.upvotes.length}
                    </Text>
                    <Button flex='1' variant='ghost' color={toggle
                        ? "blue" : "#000000"} leftIcon={<BiLike />} onClick={handleVote}>
                        Upvote
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiChat />} onClick={() => {
                        setOverlay(<OverlayOne />)
                        onOpen()
                    }}>
                        Comment
                    </Button>
                    <Modal isCentered isOpen={isOpen} onClose={onClose}>
                        {overlay}
                        <PostModal />
                    </Modal>

                </CardFooter>
            </Card>
        </>
    )
}

export default Post