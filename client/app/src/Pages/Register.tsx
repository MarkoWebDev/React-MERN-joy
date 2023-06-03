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
  Stack,
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import char1 from "../assets/images/char1.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";

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
    checked: true,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .max(15, "Name is too long")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .matches(
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        "Invalid email address"
      )
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password can onyl contain letters"),
    checked: Yup.boolean().oneOf([true], "This field must be checked"),
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    console.log("formik", formik);
    console.log("obj", Object.keys(formik.errors).length);
  };

  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  return (
    <Box className="flex items-center justify-center h-screen bg-slate-100">
      <Box className="grid grid-cols-2 w-[950px] bg-slate-200 rounded-lg ">
        <Box className="flex flex-col w-full pl-4">
          <Heading as="h2" size="lg" className="py-4">
            Register 🔐
          </Heading>
          <Text fontSize="md" className="text-gray-400">
            Join our TEAM and let's build something awesome. Register and
            procceed to the next step.
          </Text>
          <Box className="py-2">
            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  isInvalid={
                    formik.touched.name && formik.errors.name ? true : false
                  }
                  errorBorderColor="crimson"
                  focusBorderColor="gray"
                  id="name"
                  type="text"
                  placeholder="Enter your First name"
                  variant="outline"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <FormHelperText color="crimson">
                    {formik.errors.name}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Email */}
              <FormControl isRequired className="py-2">
                <FormLabel>Email address</FormLabel>
                <Input
                  isInvalid={
                    formik.touched.email && formik.errors.email ? true : false
                  }
                  errorBorderColor="crimson"
                  focusBorderColor="gray"
                  id="email"
                  type="email"
                  variant="outline"
                  placeholder="Enter your email address"
                  {...formik.getFieldProps("email")}
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
                {formik.touched.email && formik.errors.email && (
                  <FormHelperText color="crimson">
                    {formik.errors.email}
                  </FormHelperText>
                )}
              </FormControl>
              {/* Password */}
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    isInvalid={
                      formik.touched.password && formik.errors.password
                        ? true
                        : false
                    }
                    errorBorderColor="crimson"
                    focusBorderColor="gray"
                    id="password"
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    {...formik.getFieldProps("password")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.touched.password && formik.errors.password && (
                  <FormHelperText color="crimson">
                    {formik.errors.password}
                  </FormHelperText>
                )}
              </FormControl>
              {/* Checkbox */}
              <FormControl>
                <Stack className="pt-4" spacing={5} direction="row">
                  <Checkbox
                    defaultChecked
                    id="checked"
                    colorScheme="blue"
                    isInvalid={formik.errors.checked ? true : false}
                    {...formik.getFieldProps("checked")}
                  >
                    <Text fontSize="sm"> Accept Terms of Agreement</Text>
                  </Checkbox>
                </Stack>
                {formik.touched.checked && formik.errors.checked && (
                  <FormHelperText color="crimson">
                    {formik.errors.checked}
                  </FormHelperText>
                )}
              </FormControl>
              <Box className="py-4">
                <Button
                  type="submit"
                  colorScheme="teal"
                  variant="solid"
                  isDisabled={
                    Object.keys(formik.errors).length > 0 ||
                    formik.values.name === "" ||
                    formik.values.email === "" ||
                    formik.values.password === ""
                      ? true
                      : false
                  }
                >
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
