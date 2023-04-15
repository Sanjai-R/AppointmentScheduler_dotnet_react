import React from 'react';
import {
  Box,
  Text,
  Badge,
  Flex,
  Heading,
  Icon,
} from '@chakra-ui/react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const AppointmentCard = ({
  title,
  date,
  time,
  status,
  location,
  username,
  userRole,
}) => {
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
            {date}
          </Text>
        </Flex>
        <Flex align="center" mb={4}>
          <Icon as={FaClock} boxSize={4} color="gray.500" />
          <Text ml={2} fontSize="sm" color="gray.500">
            {time}
          </Text>
        </Flex>
        <Badge colorScheme={status === 'Confirmed' ? 'green' : 'red'}>
          {status}
        </Badge>
        <Text fontSize="sm" color="gray.500" mt={2}>
          {location}
        </Text>
        {/* <Text fontSize="sm" color="gray.500" mt={2}>
          Patient: {username}
        </Text>
        <Text fontSize="sm" color="gray.500" mt={2}>
          Role: {userRole}
        </Text> */}
      </Box>
    </Box>
  );
};

export default AppointmentCard;
