import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Container,
  Box,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  HStack,
  useToast,
  Image,
  Switch,
} from "@chakra-ui/react";
import { supabaseClient as supabase } from "../../utils/Supabase";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { AuthButton } from "../../components/AuthButton";
import {
  loginValidationSchema,
  sentEmailValidationSchema,
} from "../../utils/Validations";
import logo from "../../assets/newlogo.svg";

export const AuthLogin: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forgot, setForgot] = useState<boolean>(false);

  const handleClick = () => setShow(!show);
  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };
  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
    } else {
      if (data) {
        const { data: userData } = await supabase
          .from("customer")
          .select("isAdmin")
          .eq("uuid", data?.user?.id)
          .single();

        if (userData?.isAdmin === true) {
          navigate("/dashboard/subscribers");
          toast({
            title: "Success",
            description: "You are logged in successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setIsLoading(false);
        } else {
          toast({
            title: "Error",
            description: "You are not an admin",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setIsLoading(false);
        }
      }
    }
  };

  const handleSubmitEmail = async (values: any) => {
    setIsLoading(true);
    const redirectUrl = import.meta.env.VITE_FRONTEND_URL;
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${redirectUrl}reset-password`,
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
    } else {
      toast({
        title: "Success",
        description: "Check your email for reset password link",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box
        height={"100svh"}
        display={"flex"}
        alignItems={"center"}
        overflow={"clip"}
      >
        {!forgot ? (
          <>
            <Container
              w={["95vw", "95vw", "40vw"]}
              h={"70vh"}
              mt={10}
              borderRadius={"10px"}
              bg={"white"}
            >
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginValidationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Stack spacing="4" w={"full"}>
                    <Stack alignItems="center">
                      <Stack mb={5}>
                        <Image src={logo} w={"8"} h={"8"} />
                      </Stack>
                      <Text fontSize="23px" fontWeight="600" color="brand.text">
                        Admin login
                      </Text>
                    </Stack>
                    <Box
                      borderRadius={{ base: "none", sm: "xl" }}
                      my={5}
                      px={4}
                    >
                      <Stack spacing="10">
                        <Stack spacing="2">
                          <Field name="email">
                            {({ field }: { field: any }) => (
                              <FormControl color={"brand.greyLight"}>
                                <FormLabel
                                  fontSize={"14px"}
                                  fontWeight={500}
                                  color={"rgba(102, 102, 102, 1)"}
                                  htmlFor="email"
                                >
                                  Email
                                </FormLabel>
                                <Input
                                  {...field}
                                  id="email"
                                  type="email"
                                  bg={"brand.greyLight"}
                                  color={"black"}
                                  h={"6vh"}
                                  borderRadius={"6px"}
                                />
                                <Box color={"red"}>
                                  <ErrorMessage name="email" component="div" />
                                </Box>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="password">
                            {({ field }: { field: any }) => (
                              <div>
                                <FormLabel
                                  fontSize={"14px"}
                                  fontWeight={500}
                                  color={"rgba(102, 102, 102, 1)"}
                                  htmlFor="password"
                                >
                                  Password
                                </FormLabel>
                                <InputGroup
                                  size="md"
                                  color={"rgba(253, 253, 253, 0.39)"}
                                >
                                  <Input
                                    {...field}
                                    pr="4.5rem"
                                    type={show ? "text" : "password"}
                                    bg={"brand.greyLight"}
                                    color={"black"}
                                    h={"6vh"}
                                    borderRadius={"6px"}
                                  />
                                  <InputRightElement
                                    width="4.5rem"
                                    color={"brand.grey"}
                                    h={"6vh"}
                                  >
                                    {show ? (
                                      <VisibilityOutlinedIcon
                                        onClick={handleClick}
                                      />
                                    ) : (
                                      <VisibilityOffOutlinedIcon
                                        onClick={handleClick}
                                      />
                                    )}
                                  </InputRightElement>
                                </InputGroup>
                                <Box color={"red"}>
                                  <ErrorMessage
                                    name="password"
                                    component="div"
                                  />
                                </Box>
                              </div>
                            )}
                          </Field>
                          <HStack justify="space-between" mb={"10"}>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={4}
                            >
                              <Switch
                                size="sm"
                                colorScheme="blue"
                                isChecked={isChecked}
                                onChange={toggleChecked}
                              />
                              <Text>Remember me</Text>
                            </Stack>
                            <Text
                              color={"brand.main"}
                              fontWeight={400}
                              fontSize="14px"
                              cursor={"pointer"}
                              onClick={() => setForgot(true)}
                            >
                              Forgot password?
                            </Text>
                          </HStack>
                          <AuthButton
                            name="Sign In"
                            width="100%"
                            height="6vh"
                            bg={"brand.main"}
                            color="white"
                            hoverBg="white"
                            hoverColor="black"
                            fontSize={["15px"]}
                            fontWeight={700}
                            isLoading={isLoading}
                            type="submit"
                          />
                        </Stack>
                      </Stack>
                    </Box>
                  </Stack>
                </Form>
              </Formik>
            </Container>
          </>
        ) : (
          <>
            <Box
              w={["95vw", "95vw", "30vw"]}
              h={["50vh", "50vh", "50vh", "50vh"]}
              mt={20}
              borderRadius={"10px"}
              boxShadow={"lg"}
              bg={"white"}
              justifyContent={"center"}
            >
              <Formik
                initialValues={{ email: "" }}
                validationSchema={sentEmailValidationSchema}
                onSubmit={handleSubmitEmail}
              >
                <Form>
                  <Stack
                    spacing="4"
                    w={"full"}
                    //  h={["80vh", "80vh", "75vh", "75vh"]}
                  >
                    <Stack alignItems="center">
                      <Stack mt={5}>
                        <Image
                          src={logo}
                          w={["36", "36", "36", "40"]}
                          h={"20"}
                        />
                      </Stack>
                      <Text fontSize="22px" fontWeight="600" color="brand.text">
                        Enter email to reset password
                      </Text>
                    </Stack>
                    <Box
                      borderRadius={{ base: "none", sm: "xl" }}
                      my={5}
                      px={4}
                    >
                      <Stack spacing="10">
                        <Stack spacing="2">
                          <Field name="email">
                            {({ field }: { field: any }) => (
                              <FormControl color={"brand.greyLight"} mb={5}>
                                <FormLabel
                                  fontSize={"14px"}
                                  fontWeight={500}
                                  color={"rgba(102, 102, 102, 1)"}
                                  htmlFor="email"
                                >
                                  Email
                                </FormLabel>
                                <Input
                                  {...field}
                                  id="email"
                                  type="email"
                                  bg={"brand.greyLight"}
                                  color={"black"}
                                  h={"6vh"}
                                  borderRadius={"6px"}
                                  placeholder="Email or Phone number"
                                />
                                <Box color={"red"}>
                                  <ErrorMessage name="email" component="div" />
                                </Box>
                              </FormControl>
                            )}
                          </Field>
                          <AuthButton
                            name="Send Email"
                            width="100%"
                            height="6vh"
                            bg={"brand.main"}
                            color="white"
                            mb={2}
                            hoverBg="white"
                            hoverColor="black"
                            fontSize={["15px"]}
                            fontWeight={700}
                            isLoading={isLoading}
                            type="submit"
                          />
                          <Stack
                            justify={"center"}
                            align={"center"}
                            fontSize={"16px"}
                            fontWeight={500}
                            color={"rgba(102, 102, 102, 1)"}
                            onClick={() => setForgot(false)}
                            cursor={"pointer"}
                          >
                            <Text>Go back</Text>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Box>
                  </Stack>
                </Form>
              </Formik>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};
