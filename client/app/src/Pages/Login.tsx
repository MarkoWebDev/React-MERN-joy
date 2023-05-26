import { FC, useState } from "react";
import {
  Box,
  InputGroup,
  Input,
  Text,
  Image,
  Heading,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import char2 from "../assets/images/char2.jpg";
import { useFormik } from "formik";

interface LoginProps {}

interface Values {
  name: string;
  email: string;
  password: string;
}

const Login: FC<LoginProps> = () => {
  const initialValues: Values = {
    name: "",
    email: "",
    password: "",
  };

  const validate = (values: {}) => {};

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("values");
  };

  const formik = useFormik({ initialValues, onSubmit, validate });

  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  return (
    <div>
      <Box className="flex items-center justify-center h-screen bg-slate-700">
        <Box className="grid grid-cols-2 w-[950px] bg-slate-200 rounded-lg ">
          <Box className="flex flex-col w-full pl-4">
            <Heading as="h2" size="lg" className="py-4">
              Login 🔑
            </Heading>
            <Text fontSize="md" className="text-gray-400">
              One step to the best goal you gonna achive. Login in and check
              what is new.
            </Text>
            <Box className="py-2">
              <FormControl isRequired className="py-2">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  variant="outline"
                  focusBorderColor="gray.400"
                  placeholder="Enter your email address"
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Box className="py-4">
                <Button colorScheme="teal" variant="ghost">
                  Login
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className="w-full h-full pl-4">
            <Box className="w-full h-full">
              <Image
                className="w-full h-full rounded-r-lg"
                src={char2}
                alt="Register profile"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
