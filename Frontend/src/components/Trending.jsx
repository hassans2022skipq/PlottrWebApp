import { Center, Flex, Text } from "@chakra-ui/react";

const Trending = () => {
    return (
        <Center>
            <Flex minW="90%" bg={"#fff"} border="1px solid #ddd" justifyContent={"center"}>

                <Text size="sm" p={4} bgClip="text"
                    bgGradient="linear(to-r, green.400,purple.500)"> Trending - http://localhost:5000/xyansuqni</Text>
            </Flex>
        </Center>
    )
}

export default Trending