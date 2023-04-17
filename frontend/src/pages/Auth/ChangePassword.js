import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';

const ChangePasswordPage = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Perform validation logic
    const newErrors = {};
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current Password is required';
    }
    if (!formData.newPassword) {
      newErrors.newPassword = 'New Password is required';
    }
    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Confirm New Password is required';
    }
    if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'New Passwords do not match';
    }
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call to update password
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast({
          title: 'Password updated',
          description: 'Your password has been successfully updated.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }, 2000);
    }
    setErrors(newErrors);
  };

  return (
    <Grid
      templateColumns={{ sm: '1fr', md: 'repeat(2, 1fr)' }}
      gap={6}
      px={6}
      py={4}
      bg="white"
    >
      <GridItem colSpan={{ sm: 1, md: 2 }}>
        <Heading mb={6} size="lg">
          Change Password
        </Heading>
        <FormControl isInvalid={Boolean(errors.currentPassword)} mb={3}>
          <FormLabel htmlFor="currentPassword">Current Password</FormLabel>
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.currentPassword}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.newPassword)} mb={3}>
          <FormLabel htmlFor="newPassword">New Password</FormLabel>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.confirmNewPassword)} mb={3}>
          <FormLabel htmlFor="confirmNewPassword">
            Confirm New Password
          </FormLabel>
          <Input
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors.confirmNewPassword}</FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="blue"
          isLoading={isSubmitting}
          onClick={handleSubmit}
          mb={3}
        >
          Change Password
        </Button>
        {isSubmitted && (
          <Box color="green.500" mt={2}>
            Password changed successfully!
          </Box>
        )}
      </GridItem>
    </Grid>
  );
};

export default ChangePasswordPage;
