import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { State } from "../../Context/Provider";
import { URL } from "../../Urls";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  // // clearing localStorage
  // localStorage.clear();

  const handleClick = () => {
    setShow(!show);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const submitHandler = async () => {
    const loadingToastId = toast({
      title: "Connecting to the server...",
      duration: null, // Set duration to null for indefinite duration
      status: "info",
      isClosable: false,
      position: "top",
    });
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
        duration: 2000,
        status: "warning",
        isClosable: true,
        position: "top",
      });
      toast.close(loadingToastId);
      return;
    }
    if (!validateEmail(email)) {
      toast({
        title: "Invalid email address",
        duration: 2000,
        status: "warning",
        isClosable: true,
        position: "top",
      });
      toast.close(loadingToastId);
      return;
    }
    try {
      const data = await axios.post(`${URL}/seller/login`, {
        email,
        password,
      });
      console.log(data);
      toast({
        title: "Login Successful",
        duration: 1500,
        status: "success",
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("hotelInfo", JSON.stringify(data));
      localStorage.setItem("restaurantId", data.data.id);
      navigate("/SellerMain");
      toast.close(loadingToastId);
      return;
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: err.response.data.message,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      toast.close(loadingToastId);
      return;
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="restaurant" isRequired>
        <FormLabel> Email </FormLabel>
        <Input
          placeholder="Enter Your Email Address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="email"
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel> Password </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="teal"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
