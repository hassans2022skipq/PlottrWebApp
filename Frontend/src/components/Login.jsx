import { SimpleGrid, Flex, Input, Button, VisuallyHidden } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [userObject, setUserObject] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = event => {
        event.preventDefault();
        if (userObject.email === "" || userObject.password === "") {
            setError("Invalid credentials");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }
        if (!userObject.email.includes("@")) {
            setError("Email must be valid");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }
    }

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
                {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                <Flex>
                    <VisuallyHidden>Email Address</VisuallyHidden>
                    <Input mt={0} type="email" placeholder="Email Address" onChange={(e) => {
                        setUserObject({
                            ...userObject,
                            email: e.target.value
                        })
                    }} />
                </Flex>
                <Flex>
                    <VisuallyHidden>Password</VisuallyHidden>
                    <Input mt={0} type="password" placeholder="Password" onChange={(e) => {
                        setUserObject({
                            ...userObject,
                            password: e.target.value
                        })
                    }} />
                </Flex>
                <Button bg={'#ffffff'} borderColor={"#ED2727"} color={'#ED2727'} _hover={{ background: "#Ed2727", color: "#ffffff", border: "1px solid #ED2727" }} w="full" mt={4} py={2} onClick={handleSubmit}>
                    Sign in
                </Button>
            </SimpleGrid>
        </>
    )
}

export default Login;