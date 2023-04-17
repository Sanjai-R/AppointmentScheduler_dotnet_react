import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Center,
  Box,
  Stack,
  Button,
  Select,
  Heading,
  HStack,
  Text,
  Link,
} from '@chakra-ui/react';
import { Signup } from '../../API/user';
import { useNavigate } from 'react-router-dom';
import { Link as ReactLink } from 'react-router-dom';
export const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    Password: '',
    Role: '',
    RecoveryQuestion: '',
    RecoveryAnswer: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Perform validation logic
    const newErrors = {};
    if (!formData.UserName) {
      newErrors.UserName = 'UserName is required';
    }
    if (!formData.Email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.Password) {
      newErrors.Password = 'Password is required';
    }
    if (!formData.Role) {
      newErrors.Role = 'Role is required';
    }
    if (Object.keys(newErrors).length === 0) {
      const data = await Signup(formData);
      if (data.status) {
        console.log(data.data);
        localStorage.setItem('userData', JSON.stringify(data.data));
        navigate('/');
        window.location.reload();
      }
    }
    setErrors(newErrors);
  };
  const inputFields = [
    {
      label: 'UserName',
      name: 'UserName',
      placeholder: 'Enter your UserName',
      type: 'text',
    },
    {
      label: 'Email',
      name: 'Email',
      placeholder: 'Enter your email',
      type: 'email',
    },
    {
      label: 'Password',
      name: 'Password',
      placeholder: 'Enter your password',
      type: 'password',
    },
    { label: 'Role', name: 'Role', placeholder: 'Enter your role' },
  ];
  const recoveryQuestions = [
    'What is your favorite color?',
    "What is your mother's maiden name?",
    'What was the name of your first pet?',
    'In what city were you born?',
  ];

  return (
    <Center w="100%">
      <Box rounded={'lg'} bg="white" boxShadow={'lg'} px={6} py={4}>
        <Heading mb={2} size="lg" textAlign="center">
          Create Account
        </Heading>
        <Stack spacing={1}>
          {inputFields.map(inputField => (
            <FormControl
              key={inputField.name}
              isInvalid={Boolean(errors[inputField.name])}
            >
              <FormLabel htmlFor={inputField.name}>
                {inputField.label}
              </FormLabel>
              <Input
                id={inputField.name}
                name={inputField.name}
                type={inputField.type || 'text'}
                placeholder={inputField.placeholder}
                value={formData[inputField.name]}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors[inputField.name]}</FormErrorMessage>
            </FormControl>
          ))}
          <FormControl
            id="recoveryAnswer"
            isInvalid={Boolean(errors.recoveryAnswer1)}
          >
            <FormLabel>Recovery Question</FormLabel>
            <HStack>
              <Select
                name="RecoveryQuestion"
                value={formData.RecoveryQuestion}
                onChange={handleChange}
                placeholder="Select a recovery question"
              >
                {recoveryQuestions.map((question, index) => (
                  <option key={index} value={question}>
                    {question}
                  </option>
                ))}
              </Select>
              <Input
                type="text"
                name="RecoveryAnswer"
                value={formData.RecoveryAnswer}
                onChange={handleChange}
                placeholder="Enter your recovery answer"
              />
            </HStack>
            <FormErrorMessage>{errors.recoveryAnswer1}</FormErrorMessage>
          </FormControl>
          <Stack>
            <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
              Sign up
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};
