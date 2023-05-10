import { useEffect, useState } from 'react'
import Layout from './Layout'
import { Flex, Text } from '@chakra-ui/react'
import Post from './Post'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Result = () => {
    const [result, setResult] = useState([])
    let query = useParams().query
    const getResults = () => {
        axios(`http://localhost:5000/search?query=${query}`, {
            withCredentials: true
        }).then((res) => {
            setResult(res.data)
        }).catch((err) => {
            setResult([])
        })
    }
    useEffect(() => {
        getResults(query)
    }, [query])
    return (
        <Layout renderHeaderAndFooter={true}>
            <Flex direction="column" w="100%" py={12} color="#555555" justifyContent="center" textAlign="center">
                {result.stories.length === 0 ?
                    <div style={{ textAlign: "center" }}>
                        <h1 style={{ fontSize: "20px" }}>Oops, No Results Found</h1>
                    </div>
                    :
                    <>
                        <Text>Results for "{query}"</Text>
                        <Flex pb="12" gap="8" align="center" justify="center" w="100%" flexWrap={'wrap'} maxW={{ base: "100%", md: "100%", lg: "100%", xl: "100%" }}>
                            {result.stories.map((post) => {
                                return <Post key={post._id} post={post} />
                            })}
                        </Flex>
                    </>
                }
            </Flex>
        </Layout >
    )
}

export default Result