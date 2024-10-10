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
  useToast,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import logo from "../../assets/nav_logo.svg";
import google from "../../assets/google.svg";
import { supabaseClient } from "../../utils/Supabase";
import {
  loginValidationSchema,
  sentEmailValidationSchema,
} from "../../utils/Validations";
import { AuthButton } from "../../components/AuthButton";

export const AuthLogin: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forgot, setForgot] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    const { error, data } = await supabaseClient.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      toast({
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        variant: "left-accent",
        containerStyle: {
          width: "600px",
          maxWidth: "100%",
        },
      });
      setIsLoading(false);
    } else {
      if (data) {
        const { data: userData } = await supabaseClient
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
    const { error } = await supabaseClient.auth.resetPasswordForEmail(
      values.email,
      {
        redirectTo: `${redirectUrl}reset-password`,
      }
    );
    if (error) {
      toast({
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        variant: "left-accent",
        containerStyle: {
          width: "600px",
          maxWidth: "100%",
        },
      });
      setIsLoading(false);
    } else {
      toast({
        description: `Check your email for reset password link`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        variant: "left-accent",
        containerStyle: {
          width: "600px",
          maxWidth: "100%",
        },
      });
      setIsLoading(false);
    }
  };
  const handleOAuthGoogleLogin = async () => {
    const provider = "google";
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window?.location?.origin}/dashboard/subscribers`,
      },
    });
    if (error) {
      toast({
        description: `Error in login`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        variant: "left-accent",
        containerStyle: {
          width: "600px",
          maxWidth: "100%",
        },
      });
    }
  };
  return (
    <>
      {!forgot ? (
        <>
          <Container
            borderRadius={"10px"}
            bg={"white"}
            mx={"auto"}
            w={["100%", "95%", "90%"]}
          >
            <Box
              bg="white"
              borderRadius="12px"
              boxShadow="0px 8px 16px 0px #00000014, 0px 0px 4px 0px #0000000A"
              p={6}
            >
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={loginValidationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Stack spacing="4" h={["auto"]}>
                    <Stack alignItems="center">
                      <Stack mb={3}>
                        <Image src={logo} w={"8"} h={"8"} />
                      </Stack>
                      <Text fontSize="22px" fontWeight="700" color="#1A1A1A">
                        Login to Chatbuddy
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
                          <Box mt={2}>
                            <AuthButton
                              name="Login"
                              width="100%"
                              height="6vh"
                              bg={"#0641FB"}
                              color="#FFFFFF"
                              hoverBg="brand.mainHover"
                              hoverColor="white"
                              mb={2}
                              fontSize={["15px"]}
                              fontWeight={500}
                              border="none"
                              isLoading={isLoading}
                              type="submit"
                            />
                            <AuthButton
                              name="Or sign in with Google"
                              width="100%"
                              height="6vh"
                              bg={"rgba(15, 20, 21, 1)"}
                              color="#FFFFFF"
                              mb={6}
                              hoverBg="rgba(0, 0, 0, 0.7)"
                              hoverColor="white"
                              fontSize={["15px"]}
                              fontWeight={500}
                              border="none"
                              image={google}
                              imageheight={"5"}
                              imagewidth={"5"}
                              onClick={() => handleOAuthGoogleLogin()}
                            />
                          </Box>
                          <Stack justify={"center"} align={"center"} mb={2}>
                            <Text
                              color={"#535353"}
                              fontWeight={400}
                              fontSize="14px"
                              cursor={"pointer"}
                              onClick={() => setForgot(true)}
                            >
                              Forgot password?
                            </Text>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Box>
                  </Stack>
                </Form>
              </Formik>
            </Box>
          </Container>
        </>
      ) : (
        <>
          <Container
            h={["50vh", "50vh", "50vh", "50vh"]}
            borderRadius={"10px"}
            bg={"white"}
            justifyContent={"center"}
          >
            <Box
              bg="white"
              borderRadius="12px"
              boxShadow="0px 8px 16px 0px #00000014, 0px 0px 4px 0px #0000000A"
              p={6}
            >
              <Formik
                initialValues={{ email: "" }}
                validationSchema={sentEmailValidationSchema}
                onSubmit={handleSubmitEmail}
              >
                <Form>
                  <Stack spacing="4" h={["auto"]}>
                    <Stack alignItems="center">
                      <Stack my={3}>
                        <Image src={logo} w={"10"} h={"10"} />
                      </Stack>
                      <Text fontSize="22px" fontWeight="700" color="#1A1A1A">
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
                                  placeholder=""
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
                            hoverBg="rgba(0, 0, 0, 0.7)"
                            hoverColor="white"
                            fontSize={["15px"]}
                            fontWeight={500}
                            border="none"
                            bg={"rgba(15, 20, 21, 1)"}
                            color="white"
                            mb={2}
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
          </Container>
        </>
      )}
    </>
  );
};
