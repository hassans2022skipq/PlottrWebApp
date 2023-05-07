import React from 'react'

import Layout from './Layout'
import Post from './Post'
import { Flex } from "@chakra-ui/react";
import Trending from './Trending';


const Feed = () => {
    const userLoggedIn = JSON.parse(sessionStorage.getItem('user'));
    return (
        <Layout renderHeaderAndFooter={true}>
            <br />
            <Trending />


            <Flex pb="12" gap="8" align="center" justify="center" w="100%" flexWrap={'wrap'} maxW={{ base: "100%", md: "100%", lg: "100%", xl: "100%" }}>

                <Post />
                <Post />
                <Post />
            </Flex>

        </Layout >
    )
}

export default Feed