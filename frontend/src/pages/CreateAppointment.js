import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Center,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FaCalendar, FaClock, FaSave } from 'react-icons/fa';
import { createAppointment } from '../API/appointment';
import { useNavigate } from 'react-router-dom';

const CreateAppointmentPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (JSON.parse(!userData)) {
      navigate('/login');
    }
  }, []);
  const handleSubmit = async () => {
    // Validate form inputs
    const { title, description, date, time } = formData;
    if (!title || !description || !date || !time) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    const data = await createAppointment(formData);
    if (data.status) {
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
      });
      setErrorMessage('');
      navigate('/');
    }
    console.log(formData);
  };

  return (
    <Center w="100%">
      <Box rounded={'lg'} bg="white" boxShadow={'lg'} w="420px" p={6}>
        <Heading mb={6} size="lg" textAlign="center">
          Create Appointment
        </Heading>
        {errorMessage && (
          <Alert status="error" mb={6}>
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
        <Stack spacing={3}>
          {Object.keys(formData).map(key => (
            <FormControl key={key}>
              <FormLabel htmlFor={key}>{key}</FormLabel>
              <Input
                id={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={`Enter appointment ${key}`}
                type={key === 'date' || key === 'time' ? key : 'text'}
                icon={
                  key === 'date' ? (
                    <FaCalendar />
                  ) : key === 'time' ? (
                    <FaClock />
                  ) : undefined
                }
              />
            </FormControl>
          ))}
          <Button
            colorScheme="blue"
            size="lg"
            rightIcon={<FaSave />}
            onClick={handleSubmit}
          >
            Create Appointment
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default CreateAppointmentPage;
