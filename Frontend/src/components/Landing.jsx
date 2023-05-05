import Footer from "./Footer";
import Layout from "./Layout";
import { Box, Heading, Text, Button, Center, chakra, Flex, GridItem, Icon, Input, SimpleGrid, VisuallyHidden, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Register from "./Register";
import Login from "./Login";


const Landing = () => {
    // const [test, setTest] = useState('')
    // useEffect(() => {
    //     fetch('http://localhost:5000/')
    //         .then((res) => res.json())
    //         .then((data) => setTest(data.message))
    // }, [])
    return (
        <Layout renderHeaderAndFooter={false}>
            <Box px={8} py={24} mx="auto">
                <SimpleGrid
                    alignItems="center"
                    w={{
                        base: "full",
                        xl: 11 / 12,
                    }}
                    columns={{
                        base: 1,
                        lg: 11,
                    }}
                    gap={{
                        base: 0,
                        lg: 24,
                    }}
                    mx="auto"
                >
                    <GridItem
                        colSpan={{
                            base: "auto",
                            lg: 7,
                        }}
                        textAlign={{
                            base: "center",
                            lg: "left",
                        }}
                    >
                        <Heading size="xl" mb={2} color={"#ED2727"}>Plottr.</Heading>
                        <chakra.h1
                            mb={6}
                            fontSize={{
                                base: "4xl",
                                md: "6xl",
                            }}
                            fontWeight="bold"
                            lineHeight="none"
                            letterSpacing={{
                                base: "normal",
                                md: "tight",
                            }}
                            color="gray.900"
                            _dark={{
                                color: "gray.100",
                            }}
                        >
                            Create and share <br />
                            <Text
                                display={{
                                    base: "block",
                                    lg: "inline",
                                }}
                                w="full"
                                bgClip="text"
                                bgGradient="linear(to-r, green.400,purple.500)"
                                fontWeight="extrabold"
                            >
                                Beautiful Stories
                            </Text>{" "}
                        </chakra.h1>
                        <chakra.p
                            mb={{
                                base: 10,
                                md: 4,
                            }}
                            fontSize={{
                                base: "lg",
                                md: "xl",
                            }}
                            fontWeight="thin"
                            color="gray.500"
                            letterSpacing="wider"
                        >
                            Plottr is a social media platform where users can create accounts, make posts, and interact with other users by commenting and liking their posts.
                        </chakra.p>
                    </GridItem>
                    <GridItem
                        colSpan={{
                            base: "auto",
                            md: 4,
                        }}
                    >
                        <Box as="form" bg='white' mb={6} rounded="lg" shadow="2xl" p={6}>
                            <Tabs variant='enclosed' colorScheme="red">
                                <Center
                                    pb={0}
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.600",
                                    }}
                                >
                                    <TabList>
                                        <Tab _focus={{ boxShadow: "none" }}>Sign Up</Tab>
                                        <Tab _focus={{ boxShadow: "none" }}>Sign In</Tab>
                                    </TabList>
                                </Center>
                                <TabPanels>
                                    <TabPanel>
                                        <Register />
                                    </TabPanel>
                                    <TabPanel>
                                        <Login />
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                        <chakra.p fontSize="xs" textAlign="center" color="gray.600">
                            By signing up you agree to our{" "}
                            <chakra.a color="brand.500">Terms of Service</chakra.a>
                        </chakra.p>
                    </GridItem>
                </SimpleGrid>
            </Box>
            <Box mx="auto" mt={-250}>
                <svg width="100%" height="400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="a" gradientTransform="rotate(90)"><stop offset="5%" stop-color="#35cfcb" /><stop offset="95%" stop-color="#67dbd8" /></linearGradient><linearGradient id="b" gradientTransform="rotate(90)"><stop offset="5%" stop-color="#669ee6" /><stop offset="95%" stop-color="#8cb6ec" /></linearGradient><linearGradient id="c" gradientTransform="rotate(90)"><stop offset="5%" stop-color="#959bf5" /><stop offset="95%" stop-color="#afb4f7" /></linearGradient><linearGradient id="d" gradientTransform="rotate(90)"><stop offset="5%" stop-color="#c2c4fa" /><stop offset="95%" stop-color="#d1d2fb" /></linearGradient><linearGradient id="e" gradientTransform="rotate(90)"><stop offset="5%" stop-color="#efedff" /><stop offset="95%" stop-color="#f3f1ff" /></linearGradient></defs><path fill="none" d="M0 0h2000v1333H0z" /><path d="M0 222c70.563-13.484 141.125-26.969 196-28 54.875-1.031 94.062 10.391 154 20s140.627 17.403 207 15c66.373-2.403 118.43-15.004 172-16 53.57-.996 108.65 9.611 171 12 62.35 2.389 131.967-3.441 195-3 63.033.441 119.481 7.153 176 14 56.519 6.847 113.109 13.83 174 18 60.891 4.17 126.084 5.53 188 1s120.554-14.95 190-17c69.446-2.05 149.699 4.272 181 3 31.301-1.272 13.65-10.136 36-19l-40 1111H0Z" fill="url(#a)" /><path d="M0 444c53.993-22.65 107.986-45.3 174-38 66.014 7.3 144.05 44.55 203 45 58.95.45 98.814-35.898 159-39 60.186-3.102 140.694 27.042 204 44 63.306 16.958 109.412 20.73 163 15 53.588-5.73 114.66-20.965 183-34s143.95-23.87 202-25c58.05-1.13 98.538 7.443 154 19s125.897 26.098 187 38c61.103 11.902 112.874 21.166 179 10s146.607-42.762 181-52 22.696 3.88 51 17l-40 889H0Z" fill="url(#b)" /><path d="M0 666c57.915-.472 115.83-.945 179-9s131.598-23.694 196-25c64.402-1.306 124.778 11.72 179 22 54.222 10.28 102.29 17.812 162 13 59.71-4.812 131.065-21.969 191-16 59.935 5.969 108.45 35.063 171 47 62.55 11.937 139.138 6.717 201-9 61.862-15.717 108.999-41.933 166-38 57.001 3.933 123.866 38.013 188 39 64.134.987 125.536-31.119 193-42s140.99-.537 171 6c30.01 6.537 16.505 9.269 43 12l-40 667H0Z" fill="url(#c)" /><path d="M0 888c65.84 13.76 131.679 27.522 195 26 63.321-1.522 124.124-18.326 179-33 54.876-14.674 103.824-27.217 165-22 61.176 5.217 134.58 28.193 195 33 60.42 4.807 107.857-8.556 164-10 56.143-1.444 120.994 9.03 186 13 65.006 3.97 130.167 1.438 193-6s123.336-19.78 182-13c58.664 6.78 115.487 32.683 177 41 61.513 8.317 127.715-.953 197-2 69.285-1.047 141.653 6.13 170 3 28.347-3.13 12.674-16.565 37-30l-40 445H0Z" fill="url(#d)" /><path d="M0 1110c59.789 12.248 119.578 24.496 179 29 59.422 4.504 118.478 1.263 184-16 65.522-17.263 137.51-48.547 198-45 60.49 3.547 109.482 41.925 161 49 51.518 7.075 105.561-17.152 172-25 66.439-7.848 145.274.682 207 3s106.345-1.577 161 2 119.347 14.624 179 20c59.653 5.376 114.268 5.08 180 0s142.582-14.945 211-23 128.405-14.302 155-13c26.595 1.302 19.797 10.15 53 19l-40 223H0Z" fill="url(#e)" /></svg>
            </Box>
        </Layout >
    )
}

export default Landing