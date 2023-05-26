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
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import char1 from "../assets/images/char1.jpg";
import { useFormik } from "formik";

interface RegisterProps {}

interface Values {
  name: string;
  email: string;
  password: string;
  checked: boolean;
}

const Register: FC<RegisterProps> = () => {
  const initialValues: Values = {
    name: "",
    email: "",
    password: "",
    checked: false,
  };

  const validate = (values: any) => {};

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    console.log("formik", formik);
  };

  const formik = useFormik({ initialValues, onSubmit, validate });

  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  return (
    <Box className="flex items-center justify-center h-screen bg-slate-700">
      <Box className="grid grid-cols-2 w-[950px] bg-slate-200 rounded-lg ">
        <Box className="flex flex-col w-full pl-4">
          <Heading as="h2" size="lg" className="py-4">
            Register 🔐
          </Heading>
          <Text fontSize="md" className="text-gray-400">
            Join our TEAM and let's build something awsome. Register and
            procceed to the next step
          </Text>
          <Box className="py-2">
            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your First name"
                  variant="outline"
                  focusBorderColor="gray.400"
                />
              </FormControl>
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
              <Stack className="pt-4" spacing={5} direction="row">
                <Checkbox colorScheme="blue" defaultChecked>
                  <Text fontSize="sm"> Accept Terms of Agreement</Text>
                </Checkbox>
              </Stack>
              <Box className="py-4">
                <Button type="submit" colorScheme="teal" variant="ghost">
                  Register
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
        <Box className="w-full h-full pl-4">
          <Box className="w-full h-full">
            <Image
              className="w-full h-full rounded-r-lg"
              src={char1}
              alt="Register profile"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
