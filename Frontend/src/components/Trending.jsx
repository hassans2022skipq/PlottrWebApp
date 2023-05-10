import { useEffect, useState } from "react";
import { Center, Flex, Text } from "@chakra-ui/react";
import axios from "axios";

const Trending = () => {
    const [trending, setTrending] = useState({})
    const getTrending = () => {
        axios(`http://localhost:5000/most-liked`, {
            withCredentials: true
        }).then((res) => {
            setTrending(res.data)
        }).catch((err) => {
            setTrending({})
        })
    }
    useEffect(() => {
        getTrending()
    }, [])


    return (
        <Center>
            <Flex minW="90%" bg={"#fff"} border="1px solid #ddd" justifyContent={"center"}>

                <Text size="sm" p={4} bgClip="text"
                    bgGradient="linear(to-r, green.400,purple.500)"> Trending - {
                        trending.length === 0 ? trending.title : "meehhhh, No Trending Post"
                    } </Text>
            </Flex>
        </Center>
    )
}

export default Trending