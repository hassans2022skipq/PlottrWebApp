
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../actions/userActions";
import { useColorModeValue, Center, Heading } from "@chakra-ui/react";
import { chakra, Flex, HStack, useDisclosure, Button, Avatar } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import PostModal from "./PostModal";
import SearchBar from "./SearchBar";




const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
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
              <SearchBar />
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
              <PostModal />
            </Modal>


            <Menu>
              <MenuButton _hover={{
                border: "1px solid #ffffff",
                background: "transparent"
              }
              }>
                <Avatar
                  size="md"
                  border="1px solid #dddddd"
                  name={user.username}
                  src={user.fileUrl}
                />
              </MenuButton>
              <MenuList>
                <Link to="/home">
                  <MenuItem _hover={{
                    border: "1px solid #ffffff",
                    background: "transparent",
                    color: "#ED2727"
                  }
                  }>Home</MenuItem>
                </Link>
                <Link to='/profile'>
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
                }
                  onClick={() => {
                    dispatch(removeUser());
                    navigate('/')
                  }}
                >Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </chakra.header>
      <Center bg={"#e2e2e2"} hideFrom='lg'>
        <SearchBar />
      </Center>
    </React.Fragment >
  );
};


export default Header