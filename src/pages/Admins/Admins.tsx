import React, { useEffect, useState } from "react";
import {
  HStack,
  Input,
  Stack,
  Text,
  Image,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
  Button,
  Box,
  useMediaQuery,
  Spinner,
  Menu,
} from "@chakra-ui/react";
import filter from "../../assets/filter.svg";
import download from "../../assets/download.svg";
import tableuser from "../../assets/avatar.svg";
import AddAdminModal from "./components/AddAdminModal";
import { supabaseClient } from "../../utils/Supabase";
import { useAuth } from "../../utils/Auth";
import { FilterDropdown } from "../dashboard/components/FilterAlert";
import { convertAdminsToCSV } from "../../utils/Functions";
import { CustomCheckbox } from "../../components/CustomCheckbox";
import { AuthButton } from "../../components/AuthButton";
import DeleteAccountModal from "../../components/DeleteAccountModal";
import add from "../../assets/add.svg";
import { NewPagination } from "../../components/NewPagination";

export const Admins: React.FC = () => {
  const {
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
    isOpen: isDeleteOpen,
  } = useDisclosure();

  const { user } = useAuth();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [isLargerThan600] = useMediaQuery("(min-width: 800px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const itemsPerPage = 7;
  const [filteredData, setFilteredData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const currentData = filteredData?.slice(startIndex, endIndex);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectType, setSelectType] = useState<boolean>(false);
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const handleApply = () => {
    if (selectedTypes?.length === 0) {
      setFilteredData(data);
    }
    const filteredData =
      selectedTypes?.length > 0
        ? data?.filter((item: any) => selectedTypes?.includes(item.plan_id))
        : data;
    setFilteredData(filteredData);
    setSelectType(!selectType);
  };
  const toggleSelectAll = () => {
    if (selectedLinks?.length === filteredData?.length) {
      setSelectedLinks([]);
    } else {
      const allLeadIds = filteredData?.map((lead: any) => lead?.email);
      setSelectedLinks(allLeadIds);
    }
  };
  const handleCheckboxForLinksChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    email: string
  ) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedLinks([...selectedLinks, email]);
    } else {
      setSelectedLinks(
        selectedLinks.filter((selectedLink) => selectedLink !== email)
      );
    }
  };
  const handleURLFilters = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === "") {
      setFilteredData(data);
      return;
    }
    const filteredData = data?.filter((item: any) =>
      item?.email?.toLowerCase().includes(value?.toLowerCase())
    );
    setFilteredData(filteredData);
  };
  const availableTypes = Array.from(
    new Set(data.map((item: any) => item.plan_id))
  );
  const downloadLeadsAsCSV = () => {
    if (!currentData) return;
    const csvContent = convertAdminsToCSV(currentData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const fileName = `leads_${Date.now()}_${Math.floor(
      Math.random() * 1000
    )}.csv`;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const userid = user?.id;
        if (userid) {
          const response = await supabaseClient
            .from("customer")
            .select("*")
            .eq("isAdmin", true);
          if (response) {
            setLoading(false);
            setData(response?.data);
            setFilteredData(response?.data);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchDetails();
  }, [check]);
  const getUserMetadata = async (uuid: string) => {
    const { data: fetchUser, error } =
      await supabaseClient.auth.admin.getUserById(uuid);

    if (error) {
      console.error("Error fetching user metadata:", error);
      return { fullName: "N/A", avatarUrl: "" };
    }

    return {
      fullName: fetchUser?.user?.user_metadata?.full_name || "N/A",
      avatarUrl: fetchUser?.user?.user_metadata?.avatar_url || "",
    };
  };
  const [fullNames, setFullNames] = useState<{ [key: string]: string | null }>(
    {}
  );
  const [userImages, setUserImages] = useState<{
    [key: string]: string | null;
  }>({});

  useEffect(() => {
    const fetchUserData = async () => {
      for (const plan of filteredData) {
        if (plan.uuid) {
          const { fullName, avatarUrl } = await getUserMetadata(plan.uuid);
          setFullNames((prevFullNames) => ({
            ...prevFullNames,
            [plan.uuid]: fullName,
          }));
          setUserImages((prevUserImages) => ({
            ...prevUserImages,
            [plan.uuid]: avatarUrl,
          }));
        }
      }
    };

    fetchUserData();
  }, [filteredData]);

  return (
    <Stack h={"full"} w={"100%"}>
      <DeleteAccountModal
        onClose={onDeleteClose}
        isOpen={isDeleteOpen}
        userIdToDelete={userIdToDelete}
      />
      <AddAdminModal isOpen={isOpen} onClose={onClose} setCheck={setCheck} />
      <Stack h={"full"} w={"100%"}>
        <Stack
          direction={["column", "column", "row", "row"]}
          minH={"90vh"}
          w={["100%"]}
          gap={2}
          my={isLargerThan600 ? 0 : 10}
        >
          <Stack w={"full"} h={"auto"} px={8} pt={3}>
            <Stack
              direction={"row"}
              w={"full"}
              h={"9vh"}
              mt={5}
              justify={"space-between"}
              align={"center"}
            >
              <HStack w={"100%"} justifyContent={"space-between"}>
                <HStack>
                  <Input
                    type="text"
                    placeholder="Search by name, E-Mail..."
                    onChange={handleURLFilters}
                  />
                  <Menu>
                    <HStack
                      h="5.5vh"
                      border="2px dashed rgba(226, 232, 240, 1)"
                      borderRadius="8px"
                      justifyContent="center"
                      alignItems="center"
                      gap={5}
                      minW="min-content"
                      minH="min-content"
                      px={4}
                      mr={3}
                    >
                      <Image src={filter} w="5" h="5" />
                      <FilterDropdown
                        selectedTypes={selectedTypes}
                        setSelectedTypes={setSelectedTypes}
                        availableTypes={availableTypes}
                        handleApply={handleApply}
                      />
                    </HStack>
                  </Menu>
                  <Button
                    variant={"outline"}
                    borderColor={"gray.100"}
                    gap={2}
                    minW={"max-content"}
                    onClick={downloadLeadsAsCSV}
                  >
                    <Image src={download} />
                    <Text>Download</Text>
                  </Button>
                </HStack>
                <AuthButton
                  name="Add Admin"
                  width={["35%", "35%", "13%", "13%"]}
                  height="5.5vh"
                  border="none"
                  bg="black"
                  color="rgba(255, 255, 255, 1)"
                  hoverBg="black"
                  hoverColor="white"
                  fontSize={["14px", "14px", "17px", "17px"]}
                  fontWeight={500}
                  borderRadius="6px"
                  image={add}
                  imageheight="5"
                  imagewidth="4"
                  hoverBorder="none"
                  onClick={onOpen}
                />
                Add Admin
              </HStack>
            </Stack>
            <Box
              w={"full"}
              h={"66vh"}
              borderRadius={"8px"}
              border={"1px solid rgb(226, 232, 240, 1)"}
              overflowY="auto"
            >
              {loading ? (
                <Stack
                  w={"full"}
                  h={"full"}
                  justify={"center"}
                  align={"center"}
                >
                  <Spinner />
                </Stack>
              ) : currentData?.length > 0 ? (
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>
                          <CustomCheckbox
                            isChecked={
                              selectedLinks?.length === filteredData?.length
                            }
                            onChange={toggleSelectAll}
                          />
                        </Th>
                        <Th
                          justifyContent={"start"}
                          alignItems={"center"}
                          display={"flex"}
                        >
                          Name
                        </Th>
                        <Th
                          color={"rgba(0, 0, 0, 1)"}
                          fontWeight={500}
                          fontSize={"15px"}
                        >
                          Email
                        </Th>
                        <Th
                          color={"rgba(0, 0, 0, 1)"}
                          fontWeight={500}
                          fontSize={"15px"}
                        >
                          Settings
                        </Th>
                      </Tr>
                    </Thead>
                    {currentData.map((plan: any, index: any) => (
                      <Tbody>
                        <Tr key={index}>
                          <Td>
                            <CustomCheckbox
                              isChecked={selectedLinks.includes(plan.email)}
                              onChange={(e: any) =>
                                handleCheckboxForLinksChange(e, plan.email)
                              }
                            />
                          </Td>
                          <Td>
                            <HStack>
                              <Image
                                src={userImages[plan.uuid] || tableuser}
                                w={"10"}
                                h={"10"}
                                alt="tableuser"
                                borderRadius={"full"}
                              />
                              <Text key={index}>{fullNames[plan.uuid]}</Text>
                            </HStack>
                          </Td>
                          <Td>{plan.email}</Td>
                          <Td>
                            <Button
                              variant={"ghost"}
                              w={["auto"]}
                              cursor={"pointer"}
                              fontSize={"18px"}
                              fontWeight={400}
                              color={"GrayText"}
                              onClick={() => {
                                setUserIdToDelete(plan.uuid);
                                onDeleteOpen();
                              }}
                            >
                              Delete
                            </Button>
                          </Td>
                        </Tr>
                      </Tbody>
                    ))}
                  </Table>
                </TableContainer>
              ) : (
                <Stack
                  w={"full"}
                  h={"full"}
                  justify={"center"}
                  align={"center"}
                >
                  <Text
                    fontWeight={500}
                    fontSize={"24px"}
                    color={"rgba(120, 116, 134, 1)"}
                  >
                    No admins found
                  </Text>
                </Stack>
              )}
            </Box>
            {/* PAGINATION */}
            <NewPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              allData={filteredData}
              itemsPerPage={itemsPerPage}
              currentData={currentData}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
