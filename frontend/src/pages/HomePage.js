import React from 'react';
import AppointmentCard from '../components/AppointmentCard';
import { Box, SimpleGrid } from '@chakra-ui/react';

const AppointmentsList = () => {
  // Assume you have an array of appointments
    const appointment = {
      title: 'Training meeting',
      date: 'April 30, 2023',
      time: '10:00 AM - 11:00 AM',
      status: 'Cancelled',
      location: '1234 Main St, Suite 567, New York, NY',
      username: 'John Smith',
      userRole: 'Patient',
    };

  // Define onDelete and onEdit callbacks for handling delete and edit actions
  const handleDelete = appointmentId => {
    // Implement logic for deleting appointment with appointmentId
    console.log(`Deleting appointment with ID: ${appointmentId}`);
  };

  const handleEdit = appointmentId => {
    // Implement logic for editing appointment with appointmentId
    console.log(`Editing appointment with ID: ${appointmentId}`);
  };

  return (
    <Box w="100%">
      <h1>Appointments</h1>
      <SimpleGrid
        spacing={2}
        templateColumns="repeat(auto-fill, minmax(290px, 1fr))"
      >
        <AppointmentCard
          title={appointment.title}
          date={appointment.date}
          time={appointment.time}
          status={appointment.status}
          location={appointment.location}
          username={appointment.username}
          userRole={appointment.userRole}
        />
        <AppointmentCard
          title={appointment.title}
          date={appointment.date}
          time={appointment.time}
          status={appointment.status}
          location={appointment.location}
          username={appointment.username}
          userRole={appointment.userRole}
        />
        <AppointmentCard
          title={appointment.title}
          date={appointment.date}
          time={appointment.time}
          status={appointment.status}
          location={appointment.location}
          username={appointment.username}
          userRole={appointment.userRole}
        />
      </SimpleGrid>
    </Box>
  );
};

export default AppointmentsList;
