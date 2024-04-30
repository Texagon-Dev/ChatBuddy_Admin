import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  HStack,
  Image,
  Button,
  Box,
  VStack,
  Input,
  Divider,
  Select,
  useToast,
} from "@chakra-ui/react";
import avatar from "../assets/user.svg";
import { supabaseClient } from "../utils/Supabase";
import { updateSubscriberPlan } from "../api-helper/Apis";

export const EditProfileModal: React.FC<any> = ({ isOpen, onClose, uuid }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (!imageFile) return;
    try {
      if (uuid) {
        const bucket = "Image";
        const fileName = imageFile.name;
        const { error } = await supabaseClient.storage
          .from(bucket)
          .upload(fileName, imageFile, {
            upsert: true,
          });
        if (error) {
          console.error("Upload error:", error);
        } else {
          const { data } = supabaseClient.storage
            .from(bucket)
            .getPublicUrl(fileName);
          if (data?.publicUrl) {
            setImageUrl(data?.publicUrl);
            const { data: customer } = await supabaseClient
              .from("customer")
              .select("metadata")
              .eq("uuid", uuid)
              .single();
            if (customer) {
              const updatedMetadata = {
                ...customer.metadata,
                avatar_url: data?.publicUrl,
              };
              const { error: updateError } = await supabaseClient
                .from("customer")
                .update({ metadata: updatedMetadata })
                .eq("uuid", uuid);
              if (updateError) {
                console.error(
                  "Error updating user profile:",
                  updateError.message
                );
                return;
              } else {
                toast({
                  title: "Success",
                  description: "Subscriber profile updated successfully",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                  position: "top-right",
                });
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleNameChange = async () => {
    if (name) {
      setLoading(true);
      const { data: customer } = await supabaseClient
        .from("customer")
        .select("metadata")
        .eq("uuid", uuid)
        .single();
      if (customer) {
        const updatedMetadata = {
          ...customer.metadata,
          full_name: name,
        };
        const { error: updateError } = await supabaseClient
          .from("customer")
          .update({ metadata: updatedMetadata })
          .eq("uuid", uuid);
        if (updateError) {
          console.error("Error updating name:", updateError.message);
          return;
        } else {
          toast({
            title: "Success",
            description: "Your profile updated successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top-right",
          });
          setLoading(false);
        }
      }
    }
  };
  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value);
  };
  const handlePlanChange = async () => {
    try {
      setLoading(true);
      if (selectedValue) {
        const response = await updateSubscriberPlan(uuid, selectedValue);
        if (response) {
          toast({
            title: "Subscriber plan updated successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
          setLoading(false);
        }
      }
    } catch (error) {
      console.clear();
      setLoading(false);
      toast({
        title: "Error updating plan",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      throw error;
    }
  };

  const handleSubmitEmail = async () => {
    const redirectUrl = import.meta.env.VITE_FRONTEND_URL;
    if (email) {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
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
      } else {
        toast({
          title: "Success",
          description: "Check your email for reset password link",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (uuid) {
          const userData = await supabaseClient
            .from("customer")
            .select("metadata,email")
            .eq("uuid", uuid)
            .single();
          if (userData) {
            setImageUrl(userData?.data?.metadata?.avatar_url);
            setName(userData?.data?.metadata?.full_name);
            setEmail(userData?.data?.email);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [uuid]);
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={"3xl"}
    >
      <ModalOverlay />
      <ModalContent
        borderRadius={"12px"}
        h={"auto"}
        border={"1px solid rgba(226, 232, 240, 1)"}
        p={3}
      >
        <ModalBody>
          <Box maxW={624} p={"24px"}>
            <VStack alignItems={"flex-start"}>
              <Text fontSize={"16px"} fontWeight={"medium"}>
                Profile Information
              </Text>
              <Text fontSize={"14px"} color={"GrayText"}>
                Update subscriber account's profile information and email
                address.
              </Text>
            </VStack>
            <Box>
              {/* Profile Information Form */}
              <Box my={4}>
                <Text fontSize={"14px"} ml={1} mb={2} fontWeight={500}>
                  Photo
                </Text>
                <HStack gap={8}>
                  <Image
                    src={imageUrl ? imageUrl : avatar}
                    alt="file-detect"
                    w={"14"}
                    h={"14"}
                    borderRadius={"full"}
                  />
                  <Input
                    type="file"
                    w={"full"}
                    placeholder="Select a Photo"
                    py={1}
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                </HStack>
              </Box>

              <VStack alignItems={"flex-start"} mt={10} w={"full"}>
                <Box w={"full"}>
                  <Text fontSize={"14px"} fontWeight={500}>
                    Name
                  </Text>
                  <Input
                    placeholder="Anima Agarwal"
                    borderRadius={"6px"}
                    h={"6vh"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Box w={"full"}>
                  <Text fontSize={"14px"} fontWeight={500}>
                    Email
                  </Text>
                  <Input
                    placeholder="example-email.com"
                    borderRadius={"6px"}
                    h={"6vh"}
                    value={email}
                    readOnly={true}
                  />
                </Box>
                <Button
                  colorScheme="blue"
                  bg={"#0641FB"}
                  mt={8}
                  onClick={handleNameChange}
                  disabled={loading}
                >
                  Update Profile
                </Button>
              </VStack>
            </Box>
          </Box>
          {/* PASSWORD SECTION */}
          <section>
            <VStack p={"24px"} maxW={624} alignItems={"flex-start"}>
              <Divider my={12} />
              <VStack alignItems={"flex-start"}>
                <Text fontSize={"16px"} fontWeight={"medium"}>
                  Reset Password
                </Text>
                <Text fontSize={"14px"} color={"GrayText"}>
                  Send the subscriber an email to reset the password.
                </Text>
              </VStack>
              <Button
                variant={"outline"}
                mt={3}
                borderColor={"black"}
                onClick={handleSubmitEmail}
              >
                Send Reset Password
              </Button>
            </VStack>
          </section>

          {/* CHANGE PLAN SECTION */}
          <section>
            <VStack p={"24px"} maxW={624} alignItems={"flex-start"}>
              <Divider my={12} />
              <VStack alignItems={"flex-start"}>
                <Text fontSize={"16px"} fontWeight={"medium"}>
                  Change Plan
                </Text>
                <Text fontSize={"14px"} color={"GrayText"}>
                  Change the subscriber’s plan or send more message credits.
                </Text>
              </VStack>
              <Select value={selectedValue} onChange={handleSelectChange}>
                <option value="starter">Starter</option>
                <option value="startup">Startup</option>
                <option value="pro">Pro</option>
                <option value="business">Business</option>
              </Select>
              <Button
                variant={"outline"}
                mt={3}
                borderColor={"black"}
                onClick={handlePlanChange}
              >
                Change Plan
              </Button>
            </VStack>
          </section>
          {/* UPDATE CREDITS SECTION */}
          <section>
            <VStack p={"24px"} maxW={624} alignItems={"flex-start"}>
              <Divider my={12} />
              <VStack alignItems={"flex-start"}>
                <Text fontSize={"16px"} fontWeight={"medium"}>
                  Update Credits
                </Text>
                <Text fontSize={"14px"} color={"GrayText"}>
                  Increase the subscriber’s message credits.
                </Text>
              </VStack>
              <Input placeholder="Enter Credits" />
              <Button
                variant={"fill"}
                bg={"#FFCB2F"}
                mt={3}
                borderColor={"black"}
              >
                Update Credits
              </Button>
            </VStack>
          </section>

          {/* UPDATE SOURCE LINKS SECTION */}
          <section>
            <VStack p={"24px"} maxW={624} alignItems={"flex-start"}>
              <Divider my={12} />
              <VStack alignItems={"flex-start"}>
                <Text fontSize={"16px"} fontWeight={"medium"}>
                  Update Source Links
                </Text>
                <Text fontSize={"14px"} color={"GrayText"}>
                  Change the source links limitation from the subscribers.
                </Text>
              </VStack>
              <Input placeholder="Enter Credits" />
              <Button
                variant={"fill"}
                bg={"#FFCB2F"}
                mt={3}
                borderColor={"black"}
              >
                Update
              </Button>
            </VStack>
          </section>

          <Divider my={12} />

          <VStack alignItems={"flex-start"}>
            <Text fontSize={"16px"} fontWeight={"medium"}>
              Delete Account
            </Text>
            <Text fontSize={"14px"} color={"GrayText"}>
              Permanently delete your account.
            </Text>

            <Text fontSize={"14px"} color={"GrayText"} mt={8} mb={4}>
              Once your account is deleted, all of its resources and data will
              be permanently deleted. Before deleting your account, please
              download any data or information that you wish to retain.
            </Text>

            <Button
              variant={"outline"}
              colorScheme="red"
              bg={"transparent"}
              border={"1px solid #FF0000"}
              _hover={{
                bg: "red.500",
                color: "white",
              }}
            >
              Delete Account
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
