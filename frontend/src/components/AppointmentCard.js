import React, { useState } from 'react';
import {
  Box,
  Text,
  Badge,
  Flex,
  Heading,
  Icon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { Link as ReactLink } from 'react-router-dom';
import moment from 'moment';
import { deleteAppointment } from '../API/appointment';

const AppointmentCard = ({ appointment, onDelete, onEdit }) => {
  const { appointmentID, title, description, date, time } = appointment;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isOutOfDate = () => {
    const currentDate = moment();
    const appointmentDateTime = moment(
      `${date} ${time}`,
      'YYYY-MM-DD HH:mm:ss'
    );
    if (appointmentDateTime.isBefore(currentDate)) {
      return true;
    }
    return false;
  };

  const handleDelete = async () => {
    const res = await deleteAppointment(appointmentID);
    console.log(res);
    if (res.status) {
      onClose();
      window.location.reload();
    }
    // onClose();
  };

  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg="white"
    >
      <Box p={6}>
        <Heading as="h2" size="md" mb={2}>
          {title}
        </Heading>
        <Flex align="center" mb={2}>
          <Icon as={FaCalendarAlt} boxSize={4} color="gray.500" />
          <Text ml={2} fontSize="sm" color="gray.500">
            {moment(date).format('MMM Do YY')}
          </Text>
        </Flex>
        <Flex align="center" mb={4}>
          <Icon as={FaClock} boxSize={4} color="gray.500" />
          <Text ml={2} fontSize="sm" color="gray.500">
            {moment(time, 'HH:mm:ss').format('HH:mm:ss')}
          </Text>
        </Flex>
        <Badge colorScheme={isOutOfDate() ? 'red' : 'green'}>
          {isOutOfDate() ? 'Missed' : 'Scheduled'}
        </Badge>
        <Text mt={4}>{description}</Text>
        <Flex justify="flex-end" mt={4}>
          <Button
            variant="outline"
            colorScheme="blue"
            size="sm"
            mr={2}
            onClick={onEdit}
            as={ReactLink}
            to={`/update/${appointmentID}`}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            colorScheme="red"
            size="sm"
            onClick={onOpen}
          >
            Delete
          </Button>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Appointment</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this appointment?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AppointmentCard;
