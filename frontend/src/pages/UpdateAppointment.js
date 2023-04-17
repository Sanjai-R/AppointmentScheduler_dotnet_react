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
import { updateAppointment, getAppointmentById } from '../API/appointment';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const UpdateAppointmentPage = () => {
  const { id } = useParams();
  console.log(id);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const isOutOfDate = () => {
    const currentDate = moment();
    const appointmentDate = moment(formData.date);
    if (appointmentDate.isBefore(currentDate)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointment = await getAppointmentById(id);
        const { title, description, date, time } = appointment;
        setFormData({ title, description, date, time });
        // setFormData(appointment);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate form inputs
    const { title, description, date, time } = formData;
    if (!title || !description || !date || !time) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    const data = await updateAppointment(id, {
      ...formData,
      status: isOutOfDate ? 'Missed' : 'Scheduled',
      date: moment(formData.date).format('YYYY-MM-DD'),
      time: moment(formData.time, 'HH:mm:ss').format('HH:mm:ss'),
    });
    if (data.status) {
      setErrorMessage('');
      navigate('/');
    }
    console.log(formData);
  };

  return (
    <Center w="100%">
      <Box rounded={'lg'} bg="white" boxShadow={'lg'} w="420px" p={6}>
        <Heading mb={6} size="lg" textAlign="center">
          Update Appointment
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
                value={
                  key === 'date'
                    ? moment(formData[key]).format('YYYY-MM-DD')
                    : formData[key]
                }
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
            Update Appointment
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default UpdateAppointmentPage;
