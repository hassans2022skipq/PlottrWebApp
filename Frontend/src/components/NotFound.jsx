import React from 'react'
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'

const NotFound = () => {
  return (
    <>

      <Flex minH="100vh" justifyContent="center" alignItems="center">

        <Box textAlign="center" py={10} px={6}>
          <Link to="/">
            <Button
              colorScheme="white"
              background="#fff"
              _hover={{
                border: 0
              }}
              color="#333"
              variant="solid">
              <ArrowBackIcon mr={2} /> Return
            </Button>
          </Link>
          <Heading
            display="inline-block"
            fontSize="10rem"
            bgClip="text"
            bgGradient="linear(to-r, green.400,purple.500)"
            fontWeight="extrabold"
          >
            404
          </Heading>
          <Text color={'gray.500'} mt={2} mb={6}>
            The page you're looking for does not seem to exist
          </Text>

        </Box>
      </Flex>
    </>
  )
}

export default NotFound;