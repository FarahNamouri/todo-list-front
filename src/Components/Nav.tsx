import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const Nav = () => {
  const [usermail, setUsermail] = useState("");
  const [password, setPassword] = useState("");

  const HandleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    axios.post('http://localhost:5000/', {
        usermail: usermail,
        password: password,
    })
    .then ((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
  }

  return (
    <FormControl isRequired p={"4"} m="5">
      <FormLabel>Email address</FormLabel>
      <Input
        type="email"
        onChange={(e) => {
          setUsermail(e.target.value);
        }}
      />
      <FormHelperText>We'll never share your email.</FormHelperText>
      <FormLabel>Password</FormLabel>
      <Input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
          console.log(usermail, password);
        }}
      />
      <FormHelperText>Type a strong one.</FormHelperText>
      <Center>
        <Button colorScheme="teal" variant="outline" onSubmit={HandleSubmit}>
          Submit
        </Button>
      </Center>
    </FormControl>
  );
};

export default Nav;
