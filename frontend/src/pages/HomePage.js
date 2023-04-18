import React, { useState, useEffect } from 'react';
import AppointmentCard from '../components/AppointmentCard';
import {
  Box,
  SimpleGrid,
  Button,
  ButtonGroup,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Link as ReactLink } from 'react-router-dom';
import sortBy from 'sort-by';
// import sortBy from 'sort-by';
import { matchSorter } from 'match-sorter';
import { BsSearch } from 'react-icons/bs';
import { getAppointments } from '../API/appointment';
const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (!JSON.parse(userData)) {
      navigate('/login');
    }
  }, []);

  // Fetch appointments data from API
  const fetchData = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response);
      console.log(appointments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  // Sort appointments based on sortCriteria and sortOrder
 const sortAppointments = () => {
   if (sortCriteria === 'upcoming') {
     const currentDate = new Date();
     return appointments.filter(appointment => {
       const appointmentDate = new Date(appointment.date);
       return appointmentDate >= currentDate;
     });
   } else {
     let sortedAppointments = [...appointments].sort(sortBy(sortCriteria));
     if (sortOrder === 'desc') {
       sortedAppointments.reverse();
     }
     console.log(matchSorter(sortedAppointments, query, { keys: ['title'] }));
     return sortedAppointments;
   }
 };


  // Handle filter button click
  const handleFilterClick = (criteria, order) => {
    if (criteria === 'upcoming') {
      setSortCriteria(criteria);
    } else {
      setSortCriteria(criteria);
      setSortOrder(order);
    }
  };
  const filterBtnData = [
    { title: 'date' },
    { title: 'time' },
    { title: 'upcoming' },
  ];
  return (
    <Box w="100%">
      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <Box>
          <Flex gap={3}>
            <InputGroup size="md">
              <InputLeftElement pointerEvents="none" children={<BsSearch />} />
              <Input
                bg="white"
                // variant='outline'
                placeholder="Enter query"
                onChange={e => setQuery(e.target.value)}
              />
            </InputGroup>
            <ButtonGroup mb={4}>
              {filterBtnData.map((item, index) => (
                <Button
                  size="md"
                  variant="outline"
                  colorScheme={sortCriteria === item.title ? 'blue' : 'gray'}
                  onClick={() =>
                    handleFilterClick(
                      item.title,
                      sortOrder === 'asc' ? 'desc' : 'asc'
                    )
                  }
                >
                  {item.title === 'upcoming'
                    ? 'Upcoming'
                    : `Sort by ${item.title}`}

                  {sortCriteria === item.title && (
                    <Box ml={1} as="span" fontSize="sm">
                      {sortOrder === 'asc' ? (
                        <span>&#8593;</span>
                      ) : (
                        <span>&#8595;</span>
                      )}
                    </Box>
                  )}
                </Button>
              ))}
              <Button colorScheme="blue" as={ReactLink} to="/create">
                Create
              </Button>
            </ButtonGroup>
          </Flex>
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
              {sortAppointments().map(appointment => (
                <AppointmentCard
                  key={appointment.appointmentID}
                  appointment={appointment}
                />
              ))}
            </SimpleGrid>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AppointmentsList;
