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
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import char2 from "../assets/images/char2.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

interface LoginProps {}

interface Values {
  email: string;
  password: string;
}

const Login: FC<LoginProps> = () => {
  const initialValues: Values = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
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
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          mode: "cors",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formik.values),
      });
      const response = await res.json();
      if (res.status === 200) {
        toast.success(response, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(response, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log("err", err);
    }
    console.log("formik", formik);
  };

  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  return (
    <div>
      <Box className="flex items-center justify-center h-screen bg-slate-100">
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
              <form onSubmit={onSubmit}>
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
                <Box className="py-4">
                  <Button
                    type="submit"
                    colorScheme="teal"
                    variant="solid"
                    isDisabled={
                      Object.keys(formik.errors).length > 0 ||
                      formik.values.email === "" ||
                      formik.values.password === ""
                        ? true
                        : false
                    }
                  >
                    Login
                  </Button>
                </Box>
              </form>
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
