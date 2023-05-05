
import React from "react";
import { useColorModeValue, Center, Heading } from "@chakra-ui/react";
import { chakra, Flex, HStack, useDisclosure, Button, Avatar } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";


const Header = () => {
  const bg = useColorModeValue("white", "gray.800");
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.600'
      backdropFilter='blur(10px) '
      backdropInvert='80%'
    />
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = React.useState(<OverlayOne />)

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 6,
        }}
        py={2}
        shadow="sm"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack display="flex" spacing={3} alignItems="center">

            <Link to="/">
              <Heading size="xl" color={"#ED2727"}>Plottr.</Heading>
            </Link>


          </HStack>
          <HStack
            spacing={3}
          >
            <Center hideBelow='lg'>
              <InputGroup w={500} my={4}>
                <InputLeftElement pointerEvents="none">
                  <AiOutlineSearch />
                </InputLeftElement>
                <Input bg={"#e2e2e2"} type="tel" placeholder="Search for stories, friends and more..." />
              </InputGroup>
            </Center>
          </HStack>
          <HStack
            spacing={3}
            alignItems="center"
          >
            <Button bg={"#ED2727"} color={"white"} _hover={{
              background: "#ED2727",
              border: "1px solid #ED2727",
              shadow: "xl"
            }} onClick={() => {
              setOverlay(<OverlayOne />)
              onOpen()
            }}>
              <AddIcon boxSize={3} />
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
              {overlay}
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>Custom backdrop filters!</Text>
                </ModalBody>
                <ModalFooter>
                  <Button>Post</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>


            <Menu>
              <MenuButton _hover={{
                border: "1px solid #ffffff",
                background: "transparent"
              }
              }>
                <Avatar
                  size="md"
                  name="Dan Abrahmov"
                  src="https://bit.ly/dan-abramov"
                />
              </MenuButton>
              <MenuList>
                <Link to="/profile">
                  <MenuItem _hover={{
                    border: "1px solid #ffffff",
                    background: "transparent",
                    color: "#ED2727"
                  }
                  }>Profile</MenuItem>
                </Link>
                <MenuItem _hover={{
                  border: "1px solid #ffffff",
                  background: "transparent",
                  color: "#ED2727"
                }
                }>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </chakra.header>
      <Center bg={"#e2e2e2"} hideFrom='lg'>
        <InputGroup w="95%" my={4}>
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch />
          </InputLeftElement>
          <Input bg={"white"} type="tel" placeholder="Search for stories, friends and more... " />
        </InputGroup>
      </Center>
    </React.Fragment >
  );
};


export default Header