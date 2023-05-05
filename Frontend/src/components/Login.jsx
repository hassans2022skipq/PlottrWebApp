import { SimpleGrid, Flex, Input, Button, VisuallyHidden } from "@chakra-ui/react";

const Login = () => {
    return (
        <>
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
                    <VisuallyHidden>Email Address</VisuallyHidden>
                    <Input mt={0} type="email" placeholder="Email Address" />
                </Flex>
                <Flex>
                    <VisuallyHidden>Password</VisuallyHidden>
                    <Input mt={0} type="password" placeholder="Password" />
                </Flex>
                <Button bg={'#ffffff'} borderColor={"#ED2727"} color={'#ED2727'} _hover={{ background: "#Ed2727", color: "#ffffff", border: "1px solid #ED2727" }} w="full" mt={4} py={2} type="submit">
                    Sign in
                </Button>
            </SimpleGrid>
        </>
    )
}

export default Login