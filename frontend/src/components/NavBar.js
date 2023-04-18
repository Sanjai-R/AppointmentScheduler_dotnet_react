import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Link as ReactLink } from 'react-router-dom';

const NavBarProject = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (JSON.parse(userData)) {
      setIsLogged(true);
    }
  }, []);

  const handleLogout = () => {
    onClose(); // Close the logout confirmation modal
    localStorage.clear('userData');
    window.location.reload();
  };

  return (
    <Flex
      direction="column"
      bg="#fff"
      px="10"
      py="2"
      w="100%"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex justify="space-between" alignItems="center">
        <Heading as="h1" fontWeight="900" fontSize="2xl">
          Appointment Scheduler
        </Heading>
        <Flex gap={5} alignItems="baseline">
          {isLogged ? (
            <>
              <Button onClick={onOpen}>Logout</Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Logout Confirmation</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>Are you sure you want to logout?</Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleLogout}>
                      Logout
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          ) : (
            <>
              <Button
                as={ReactLink}
                to="/login"
                variant="ghost"
                colorScheme="blue"
              >
                Sign in
              </Button>
              <Button as={ReactLink} to="/signup" colorScheme="blue">
                Register
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      <Flex w="100%">
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default NavBarProject;
