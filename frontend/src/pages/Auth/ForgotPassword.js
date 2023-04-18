import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { BASE_URL } from '../../utils/constant';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}/User/SendOtp/email=${email}`
      );
      setIsLoading(false);
      if (response.status === 200) {
        setShowOtp(true);
        toast({
          title: 'OTP sent',
          description: 'An OTP has been sent to your email address.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      setIsLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };

  const verifyOtp = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}/User/VerifyOtp/otp=${otp}/email=${email}`
      );
      console.log(response);
      setIsLoading(false);
      if (response.status === 204) {
        navigate('/changePassword', { state: { email: email } });
      }
    } catch (error) {
      setIsLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <Flex align="center" justify="center" w="100vw" px={4}>
      <Box maxW="md" p={8} bg="white" rounded="lg" boxShadow="lg">
        <Heading mb={6}>Forgot Password</Heading>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormControl>
        {showOtp && (
          <FormControl mb={4}>
            <FormLabel>OTP</FormLabel>
            <Input
              placeholder="Enter the Otp"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              borderColor={error ? 'red.500' : 'gray.300'}
            />
          </FormControl>
        )}
        {error && (
          <Text color="red.500" mb={4}>
            {error}
          </Text>
        )}
        <Button
          onClick={() => (showOtp ? verifyOtp : handleSubmit)()}
          colorScheme="blue"
          isLoading={isLoading}
          loadingText="Submitting..."
          mb={4}
        >
          {showOtp ? 'Verify OTP' : 'Send OTP'}
        </Button>
        {!showOtp && (
          <Text fontSize="sm">
            Don't have an account?{' '}
            <Link to="/signup" color="blue.500">
              Sign up
            </Link>
          </Text>
        )}
      </Box>
    </Flex>
  );
};
export default ForgotPasswordPage;
