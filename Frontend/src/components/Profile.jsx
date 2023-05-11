import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { Flex, Avatar, Text, Heading, Center } from '@chakra-ui/react'
import Post from './Post'
import { useSelector } from 'react-redux'
import axios from 'axios'


const Profile = () => {
    const [quote, setQuote] = useState("")
    const [posts, setPosts] = useState([])
    const user = useSelector(state => state.user)

    useEffect(() => {
        axios.get('http://localhost:5000/user', {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                setPosts(res.data.stories)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    useEffect(() => {
        fetch('https://api.quotable.io/random')
            .then((res) => res.json())
            .then((data) => setQuote(data.content))
    }, [])
    return (
        <Layout renderHeaderAndFooter={true}>
            <Flex position="relative" direction="column" w="100%" h="200px" justifyContent={"center"} alignItems={"center"} bgGradient="linear(to-r, green.400,purple.500)">
                <Text color="white" minW="50%" maxW="90%" textAlign="center" fontStyle="italic">
                    {quote}
                </Text>
            </Flex>
            <Flex direction="column" w="100%" justifyContent={"center"} alignItems={"center"} bgGradient="transparent" mt="-50" zIndex={1}>
                <Avatar
                    size="2xl"
                    borderRadius={20}
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                />
                <Heading size="lg" mt="2" mb="4" color="#333333">
                    {user ? "@" + user.username : "User Name"}
                </Heading>
            </Flex>
            <Center>
                <Text size="md" mt="2" mb="4" color="#777777">
                    - Your Posts -
                </Text>
            </Center>
            <Flex pb="12" gap="8" align="center" justify="center" w="100%" flexWrap={'wrap'} maxW={{ base: "100%", md: "100%", lg: "100%", xl: "100%" }}>
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </Flex>
        </Layout>
    )
}

export default Profile