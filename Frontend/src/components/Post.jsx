
// Imports
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react'
import { BiChat, BiLike } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import serverUrl from "../config.js";


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
    const obj = serverUrl + post.fileUrl
    const mediaType = isImageOrVideo(obj)
    return (
        <>
            <Card maxW='sm' my={6}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                            <Box>
                                <Heading size='sm'>{post.user.username}</Heading>
                                <Text>{post.title}</Text>
                            </Box>
                        </Flex>
                        <IconButton
                            variant='ghost'
                            colorScheme='gray'
                            aria-label='See menu'
                            icon={<BsThreeDotsVertical />}
                        />
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
                    <video src={obj} w={'container.md'} h={'xs'} controls autoPlay="false" />
                ) : null}

                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}
                >
                    <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                        Upvote
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                        Comment
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default Post