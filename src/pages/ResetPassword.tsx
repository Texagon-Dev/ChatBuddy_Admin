import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Container,
  Box,
  Stack,
  Text,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  useToast,
  Image,
  FormControl,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import logo from "../assets/logo.svg";
import { passwordValidationSchema } from "../utils/Validations";
import { supabaseClient } from "../utils/Supabase";
import { AuthButton } from "../components/AuthButton";

export const ResetPassword: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  const handleSubmitPassword = async (values: any) => {
    setIsLoading(true);
    const { error } = await supabaseClient.auth.updateUser({
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
      toast({
        title: "Success",
        description: "Your password set successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setIsLoading(false);
      navigate("/");
    }
  };

  return (
    <>
      <Box
        pt={20}
        h="80vh"
        bg="linear-gradient(180deg, #003DF5 -100%, #003DF5 1%, rgba(255, 255, 255, 0) 100%)"
      >
        <Container
          w={["95%", "95%", "50%", "28%"]}
          h={["50vh", "50vh", "50vh", "50vh"]}
          mt={20}
          borderRadius={"10px"}
          boxShadow={"lg"}
          bg={"white"}
          justifyContent={"center"}
        >
          <Formik
            initialValues={{ password: "" }}
            validationSchema={passwordValidationSchema}
            onSubmit={handleSubmitPassword}
          >
            <Form>
              <Stack spacing="4" h={["80vh", "80vh", "75vh", "75vh"]}>
                <Stack alignItems="center">
                  <Stack mt={5}>
                    <Image src={logo} w={["36", "36", "36", "40"]} h={"20"} />
                  </Stack>
                  <Text fontSize="22px" fontWeight="600" color="brand.text">
                    Enter email to reset password
                  </Text>
                </Stack>
                <Box borderRadius={{ base: "none", sm: "xl" }} my={5} px={4}>
                  <Stack spacing="10">
                    <Stack spacing="2">
                      <Field name="password">
                        {({ field }: { field: any }) => (
                          <div>
                            <FormControl color={"brand.greyLight"} mb={5}>
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
                                  placeholder="Enter password"
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
                                <ErrorMessage name="password" component="div" />
                              </Box>
                            </FormControl>
                          </div>
                        )}
                      </Field>
                      <AuthButton
                        name="Reset Password"
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
                        onClick={() => navigate("/")}
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
        </Container>
      </Box>
    </>
  );
};
