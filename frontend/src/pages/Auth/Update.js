import React, { useState, useEffect } from 'react';
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

import { getUserById } from '../../API/user';

export const EditSignupPage = () => {
  const userId = 6;
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',

    Role: '',
    RecoveryQuestion: '',
    RecoveryAnswer: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserById(userId);
        if (user.status) {
          console.log(user.data);

          setFormData({
            UserName: user.data.userName,
            Email: user.data.email,

            Role: user.data.role,
            RecoveryQuestion: user.data.recoveryQuestion,
            RecoveryAnswer: user.data.recoveryAnswer,
          });
        } else {
          console.error(user.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
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
      <Box
        rounded={'lg'}
        bg="white"
        boxShadow={'lg'}
        w={{ base: '90%', sm: '80%', md: '70%', lg: '50%' }}
        p={8}
        mt={8}
      >
        <Heading as="h1" textAlign="center" mb={6}>
          Edit Signup
        </Heading>
        <Stack spacing={4}>
          {inputFields.map(input => (
            <FormControl key={input.name} isInvalid={!!errors[input.name]}>
              <FormLabel htmlFor={input.name}>{input.label}</FormLabel>
              <Input
                type={input.type || 'text'}
                id={input.name}
                name={input.name}
                value={formData[input.name]}
                onChange={handleChange}
                placeholder={input.placeholder}
              />
              <FormErrorMessage>{errors[input.name]}</FormErrorMessage>
            </FormControl>
          ))}
          <FormControl isInvalid={!!errors.RecoveryQuestion}>
            <FormLabel htmlFor="RecoveryQuestion">Recovery Question</FormLabel>
            <Select
              id="RecoveryQuestion"
              name="RecoveryQuestion"
              value={formData.RecoveryQuestion}
              onChange={handleChange}
              placeholder="Select recovery question"
            >
              {recoveryQuestions.map(question => (
                <option key={question} value={question}>
                  {question}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.RecoveryQuestion}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.RecoveryAnswer}>
            <FormLabel htmlFor="RecoveryAnswer">Recovery Answer</FormLabel>
            <Input
              type="text"
              id="RecoveryAnswer"
              name="RecoveryAnswer"
              value={formData.RecoveryAnswer}
              onChange={handleChange}
              placeholder="Enter recovery answer"
            />
            <FormErrorMessage>{errors.RecoveryAnswer}</FormErrorMessage>
          </FormControl>
          <Button colorScheme="teal" onClick={handleSubmit}>
            Update
          </Button>
          <HStack mt={4}>
            <Text>Already have an account?</Text>
            <Link color="teal.500" href="/login">
              Login
            </Link>
          </HStack>
        </Stack>
      </Box>
    </Center>
  );
};

export default EditSignupPage;
