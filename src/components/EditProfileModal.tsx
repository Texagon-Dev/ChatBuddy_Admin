import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Button,
  VStack,
  Input,
  Divider,
  Select,
  useToast,
  Box,
  HStack,
  Image,
} from "@chakra-ui/react";
import { supabaseClient } from "../utils/Supabase";
import avatar from "../assets/avatar.svg";
import { AuthButton } from "./AuthButton";

export const EditProfileModal: React.FC<any> = ({ isOpen, onClose, uuid }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const toast = useToast();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [credits, setCredits] = useState("");
  const [sourcesLimit, setSourcesLimit] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState<string>("");

  const handleNameChange = async () => {
    if (credits || sourcesLimit) {
      setLoading(true);
      const { data: customer } = await supabaseClient
        .from("customer")
        .select("")
        .eq("uuid", uuid)
        .single();
      if (customer) {
        const { error: updateError, data } = await supabaseClient
          .from("customer")
          .update({
            allowed_msg_credits: credits,
            source_links_allowed: sourcesLimit,
          })
          .eq("uuid", uuid)
          .select();
        if (updateError) {
          console.error("Error updating name:", updateError.message);
          return;
        }
        if (data) {
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
        const { data } = await supabaseClient
          .from("customer")
          .update({ plan_id: selectedValue })
          .eq("uuid", uuid)
          .select();

        if (data) {
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
          const { data: userData } = await supabaseClient
            .from("customer")
            .select("email,allowed_msg_credits,source_links_allowed,plan_id")
            .eq("uuid", uuid)
            .single();
          const { data: fetchUser } =
            await supabaseClient.auth.admin.getUserById(uuid);
          if (userData) {
            setImageUrl(fetchUser?.user?.user_metadata?.avatar_url || "");
            setName(fetchUser?.user?.user_metadata?.full_name || "");
            setEmail(userData?.email);
            setCredits(userData?.allowed_msg_credits);
            setSourcesLimit(userData?.source_links_allowed);
            setSelectedValue(userData?.plan_id);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [uuid]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (!imageFile) {
      toast({
        title: "Error",
        description: "No image selected",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    const imageSizeInMB = imageFile.size / 1024 / 1024;
    if (imageSizeInMB > 2) {
      toast({
        title: "Error",
        description: "Image size should be less than 2 MB",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    const invalidFileTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (invalidFileTypes.includes(imageFile.type)) {
      toast({
        title: "Error",
        description: "Invalid file type. Please select an image",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
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
            const { error: updateError } = await supabaseClient.auth.updateUser(
              {
                data: { avatar_url: data?.publicUrl },
              }
            );
            const newMetadata = { avatar_url: data?.publicUrl };

            await supabaseClient.auth.admin.updateUserById(uuid, {
              user_metadata: {
                ...newMetadata,
              },
            });
            if (updateError) {
              console.error(
                "Error updating user profile:",
                updateError.message
              );
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
            }
          }
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleUserNameChange = async () => {
    if (name && uuid) {
      setLoading(true);
      const newMetadata = { full_name: name };
      const { error } = await supabaseClient.auth.admin.updateUserById(uuid, {
        user_metadata: {
          ...newMetadata,
        },
      });
      if (error) {
        console.error("Error updating name:", error.message);
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
  };

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
                Update your account's profile information and email address.
              </Text>
            </VStack>
            <Box>
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
                  <Button
                    bg={"rgba(241, 245, 249, 1)"}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Select a New Photo
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
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
                    borderRadius={"6px"}
                    h={"6vh"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Box w={"full"} mb={3}>
                  <Text fontSize={"14px"} fontWeight={500}>
                    Email
                  </Text>
                  <Input
                    borderRadius={"6px"}
                    h={"6vh"}
                    value={email}
                    readOnly={true}
                  />
                </Box>
                <AuthButton
                  name=" Update Profile"
                  width={["60%", "60%", "27%", "27%"]}
                  height="5.8vh"
                  border="none"
                  bg={"brand.main"}
                  color="white"
                  hoverBg="brand.mainHover"
                  hoverBorder="none"
                  fontSize={["16px"]}
                  fontWeight={500}
                  borderRadius="8px"
                  isLoading={loading}
                  onClick={handleUserNameChange}
                />
              </VStack>
            </Box>
          </Box>
          {/* PASSWORD SECTION */}
          <VStack px={"20px"} maxW={624} alignItems={"flex-start"}>
            <Divider my={5} />
            <VStack alignItems={"flex-start"} mb={3}>
              <Text fontSize={"16px"} fontWeight={"medium"}>
                Reset Password
              </Text>
              <Text fontSize={"14px"} color={"GrayText"}>
                Send the subscriber an email to reset the password.
              </Text>
            </VStack>
            <AuthButton
              name="Send Reset Password"
              width={["50%", "50%", "30%", "30%"]}
              height="5.8vh"
              border="1px solid black"
              bg={"white"}
              color="black"
              hoverBg="none"
              hoverBorder="2px solid black"
              fontSize={["16px"]}
              fontWeight={500}
              borderRadius="8px"
              onClick={handleSubmitEmail}
              isLoading={loading}
            />
          </VStack>
          {/* CHANGE PLAN SECTION */}
          <VStack p={"24px"} maxW={624} alignItems={"flex-start"}>
            <Divider my={5} />
            <VStack alignItems={"flex-start"}>
              <Text fontSize={"16px"} fontWeight={"medium"}>
                Change Plan
              </Text>
              <Text fontSize={"14px"} color={"GrayText"}>
                Change the subscriber’s plan or send more message credits.
              </Text>
            </VStack>
            <Select value={selectedValue} onChange={handleSelectChange} mb={3}>
              <option value="1">Free</option>
              <option value="2">Startup</option>
              <option value="3">Pro</option>
              <option value="4">Business</option>
            </Select>
            <AuthButton
              name=" Change Plan"
              width={["40%", "40%", "24%", "24%"]}
              height="5.8vh"
              border="1px solid black"
              bg={"white"}
              color="black"
              hoverBg="none"
              hoverBorder="2px solid black"
              fontSize={["16px"]}
              fontWeight={500}
              borderRadius="8px"
              onClick={handlePlanChange}
              isLoading={loading}
            />
          </VStack>
          {/* UPDATE CREDITS SECTION */}
          <VStack px={"20px"} maxW={624} alignItems={"flex-start"}>
            <Divider my={5} />
            <VStack alignItems={"flex-start"}>
              <Text fontSize={"16px"} fontWeight={"medium"}>
                Update Credits
              </Text>
              <Text fontSize={"14px"} color={"GrayText"}>
                Increase the subscriber’s message credits.
              </Text>
            </VStack>
            <Input
              mb={3}
              placeholder="Enter Credits"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
            />
            <AuthButton
              name="Update Credits"
              width={["40%", "40%", "24%", "24%"]}
              height="5.8vh"
              border="none"
              bg={"rgba(255, 203, 47, 1)"}
              color="black"
              hoverBg="rgba(255, 203, 47, 0.7)"
              hoverBorder="none"
              fontSize={["16px"]}
              fontWeight={500}
              borderRadius="8px"
              onClick={handleNameChange}
              isLoading={loading}
            />
          </VStack>
          {/* UPDATE SOURCE LINKS SECTION */}
          <VStack px={"20px"} maxW={624} alignItems={"flex-start"}>
            <Divider my={5} />
            <VStack alignItems={"flex-start"}>
              <Text fontSize={"16px"} fontWeight={"medium"}>
                Update Source Links
              </Text>
              <Text fontSize={"14px"} color={"GrayText"}>
                Change the source links limitation from the subscribers.
              </Text>
            </VStack>
            <Input
              mb={3}
              placeholder="Enter Credits"
              value={sourcesLimit}
              onChange={(e) => setSourcesLimit(e.target.value)}
            />
            <AuthButton
              name="Update"
              width={["30%", "30%", "18%", "18%"]}
              height="5.8vh"
              border="none"
              bg={"rgba(255, 203, 47, 1)"}
              color="black"
              hoverBg="rgba(255, 203, 47, 0.7)"
              hoverBorder="none"
              fontSize={["16px"]}
              fontWeight={500}
              borderRadius="8px"
              onClick={handleNameChange}
              isLoading={loading}
            />
          </VStack>
          {/*DELETE ACCOUNT SECTION */}
          <VStack alignItems={"flex-start"} px={"20px"} maxW={624}>
            <Divider my={5} />
            <Text fontSize={"16px"} fontWeight={"medium"}>
              Delete Account
            </Text>
            <Text fontSize={"14px"} color={"GrayText"} mb={5}>
              Permanently delete your account.
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
