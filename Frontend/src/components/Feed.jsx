import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from './Layout'
import Post from './Post'
import { Flex } from "@chakra-ui/react";
import Trending from './Trending';


const Feed = () => {
    const [isLiked, setIsLiked] = useState(false)
    const [post, setPost] = useState([
        {
            title: '',
            content: '',
            fileUrl: '',
            upvotes: 0,
            comments: [],
            user: {
                username: '',
                fileUrl: ''
            }
        }
    ])
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState(0)
    const [error, setError] = useState('')

    const handleLike = () => {
        setIsLiked(!isLiked)
        if (isLiked) {
            setLikes(likes - 1)
        } else {
            setLikes(likes + 1)
        }
    }


    useEffect(() => {
        axios.get('http://localhost:5000/stories', {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
            .then(res => {
                setPost(res.data)
                console.log(res.data)
                // setComments(res.data.comments)
                setLikes(res.data.upvotes)
            })
            .catch(err => console.log(err))
    }, [])

    // clean up
    // useEffect(() => {
    //     return () => {
    //         setPost([])
    //     }
    // }, [])
    return (
        <Layout renderHeaderAndFooter={true}>
            <br />
            <Trending />


            <Flex pb="12" gap="8" align="center" justify="center" w="100%" flexWrap={'wrap'} maxW={{ base: "100%", md: "100%", lg: "100%", xl: "100%" }}>

                {post.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </Flex>

        </Layout >
    )
}

export default Feed