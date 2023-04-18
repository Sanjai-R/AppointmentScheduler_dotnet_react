import React, { useState } from 'react';
import {
  useHistory,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';

const ResetPasswordPage = () => {
  const toast = useToast();
  const location = useLocation();

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate('/login');
  const email = location.state && location.state.email;
  const handleChange = event => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);
    console.log(email);
    try {
      const response = await fetch(
        'http://localhost:5024/api/User/ResetPassword',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Email: email, Password: password }),
        }
      );

      if (response.ok) {
        toast({
          title: 'Password Reset',
          description: 'Your password has been reset successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to reset password.');
      }
    } catch (error) {
      setError('Failed to reset password. Please try again later.');
    }

    setIsLoading(false);
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
          Reset Password
        </Heading>
        <Box>
          <FormControl isInvalid={Boolean(error)} mb={3}>
            <FormLabel htmlFor="password">New Password</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="blue"
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ResetPasswordPage;
