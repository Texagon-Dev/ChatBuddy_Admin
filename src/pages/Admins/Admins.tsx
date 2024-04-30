// import { Button, Card, Checkbox, HStack, Image, Input, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure } from '@chakra-ui/react'
// import { AccountNavbar } from '../../components/AccountNavbar'
// import filter from "../../assets/filter.svg";
// import download from "../../assets/download.svg";
// import tableuser from "../../assets/tableuser.svg";
// import AddAdminModal from './components/AddAdminModal';

// const Admins = () => {
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     return (
//         <Stack h={"auto"} w={"100%"}>
//             <AccountNavbar routeName={""} dashboard={true} />
//             <VStack
//                 mx={"auto"}
//                 h={"auto"}
//                 w={["100%", "100%", "90%", "90%"]}
//                 gap={2}
//                 mt={["8rem", "8rem", "6rem", "6rem"]}
//                 mb={2}
//                 align={["start", "start", "end", "end"]}
//             >

//                 <AddAdminModal isOpen={isOpen} onClose={onClose} />

//                 <Stack w={"85%"} h={"auto"} mt={5}>
//                     <Card>
//                         <TableContainer>
//                             <Table variant="simple">
//                                 <colgroup>
//                                     <col style={{ width: "5%" }} />
//                                     <col style={{ width: "40%" }} />
//                                     <col style={{ width: "40%" }} />
//                                     <col style={{ width: "15%" }} />
//                                 </colgroup>
//                                 <Thead>
//                                     <Tr>
//                                         <Th>
//                                             <Checkbox
//                                                 colorScheme="blue"
//                                                 size="lg"
//                                                 borderColor={"rgba(120, 116, 134, 0.1)"}
//                                                 mx={2}
//                                             />
//                                         </Th>
//                                         <Th>
//                                             Name
//                                         </Th>
//                                         <Th>E-mail</Th>
//                                         <Th></Th>
//                                     </Tr>
//                                 </Thead>
//                                 <Tbody>
//                                     {admins?.map((admin, index) => (
//                                         <Tr key={index}>
//                                             <Td>
//                                                 <Checkbox
//                                                     colorScheme="blue"
//                                                     size="lg"
//                                                     borderColor={"rgba(120, 116, 134, 0.1)"}
//                                                     mx={2}
//                                                 />
//                                             </Td>
//                                             <Td>
//                                                 <HStack>
//                                                     <Image
//                                                         src={tableuser}
//                                                         w={"10"}
//                                                         h={"10"}
//                                                         alt="tableuser"
//                                                     />
//                                                     <Text>{admin.name}</Text>
//                                                 </HStack>
//                                             </Td>
//                                             <Td>{admin.email}</Td>

//                                             <Td>
//                                                 <Button
//                                                     variant={"ghost"}
//                                                     w={["100%", "100%", "80%", "80%"]}
//                                                     cursor={"pointer"}
//                                                     // onClick={() => onOpen()}
//                                                     fontSize={"18px"}
//                                                     fontWeight={400}
//                                                     color={"GrayText"}
//                                                 >
//                                                     Delete
//                                                 </Button>
//                                             </Td>
//                                         </Tr>
//                                     ))}
//                                 </Tbody>
//                             </Table>
//                         </TableContainer>
//                     </Card>
//                 </Stack>
//             </VStack>
//         </Stack>
//     )
// }

// export default Admins
import React, { useState } from "react";
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
  Checkbox,
  Button,
  Box,
  useMediaQuery,
  Select,
  Spinner,
} from "@chakra-ui/react";
import filter from "../../assets/filter.svg";
import download from "../../assets/download.svg";
import tableuser from "../../assets/tableuser.svg";
import AddAdminModal from "./components/AddAdminModal";
import { AccountNavbar } from "../../components/AccountNavbar";

export const Admins: React.FC = () => {
  const data = [
    { name: "Guy Hawkins", email: "harry@gmail.com" },
    { name: "Guy Hawkins 2", email: "email2@gmail.com" },
    { name: "Guy Hawkins 3", email: "email2@gmail.com" },
    { name: "Guy Hawkins 4", email: "email3@gmail.com" },
  ];
  const [isLargerThan600] = useMediaQuery("(min-width: 800px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const currentData = data?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 1;
    if (totalPages <= maxPagesToShow * 2 + 1) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            bg={currentPage === i ? "rgba(226, 232, 240, 1)" : "none"}
          >
            {i}
          </Button>
        );
      }
    } else {
      let startPage = Math.max(1, currentPage - maxPagesToShow);
      let endPage = Math.min(totalPages, currentPage + maxPagesToShow);
      if (currentPage <= maxPagesToShow) {
        endPage = 2 * maxPagesToShow + 1;
      } else if (currentPage >= totalPages - maxPagesToShow) {
        startPage = totalPages - 2 * maxPagesToShow;
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            border={"1px solid rgba(226, 232, 240, 1)"}
          >
            {i}
          </Button>
        );
      }
    }
    return pageNumbers;
  };
  return (
    <Stack h={"full"} w={"100%"}>
      <AccountNavbar routeName={""} dashboard={true} />
      <AddAdminModal isOpen={isOpen} onClose={onClose} />
      <Stack
        h={"auto"}
        w={"100%"}
        justifyContent={"flex-end"}
        mt={isLargerThan600 ? "6rem" : "4rem"}
        alignItems={["flex-start", "flex-start", "flex-end", "flex-end"]}
      >
        <Stack
          direction={["column", "column", "row", "row"]}
          minH={"87vh"}
          w={["100%", "100%", "85%", "85%"]}
          gap={2}
          my={isLargerThan600 ? 0 : 10}
        >
          <Stack w={"full"} h={"auto"} px={8} pt={3}>
            <Stack
              direction={"row"}
              w={"full"}
              h={"9vh"}
              mt={5}
              px={4}
              justify={"space-between"}
              align={"center"}
              border={"1px solid rgba(120, 116, 134, 0.1)"}
            >
              <HStack w={"100%"} justifyContent={"space-between"}>
                <HStack>
                  <Input
                    type="text"
                    placeholder="Search by name, E-Mail..."
                    borderLeft="none"
                  />
                  <Button
                    variant={"outline"}
                    borderColor={"gray.100"}
                    gap={2}
                    minW={"max-content"}
                  >
                    <Image src={filter} />
                    <Text>Type</Text>
                  </Button>
                  <Button
                    variant={"outline"}
                    borderColor={"gray.100"}
                    gap={2}
                    minW={"max-content"}
                  >
                    <Image src={download} />
                    <Text>Download</Text>
                  </Button>
                </HStack>
                <Button colorScheme="blue" bg={"#0641FB"} onClick={onOpen}>
                  Add Admin
                </Button>
              </HStack>
            </Stack>
            <Box
              w={"full"}
              h={"60vh"}
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
              ) : currentData.length > 0 ? (
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>
                          <Checkbox
                            colorScheme="blue"
                            size="lg"
                            borderColor={"rgba(120, 116, 134, 0.1)"}
                            mx={2}
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
                            <Checkbox
                              colorScheme="blue"
                              size="lg"
                              borderColor={"rgba(120, 116, 134, 0.1)"}
                              mx={2}
                            />
                          </Td>
                          <Td>
                            <HStack>
                              <Image
                                src={tableuser}
                                w={"10"}
                                h={"10"}
                                alt="tableuser"
                              />
                              <Text>{plan.name}</Text>
                            </HStack>
                          </Td>
                          <Td>{plan.email}</Td>
                          <Td>
                            <Button
                              variant={"ghost"}
                              w={["auto"]}
                              cursor={"pointer"}
                              onClick={() => onOpen()}
                              fontSize={"18px"}
                              fontWeight={400}
                              color={"GrayText"}
                            >
                              Settings
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
            <HStack
              justify={"space-between"}
              w={["80%", "80%", "full", "full"]}
              mb={2}
            >
              <Stack w={"30%"}>
                <Text
                  color={"rgba(15, 23, 42, 1)"}
                  fontWeight={500}
                  fontSize={"15px"}
                >
                  {data?.length > 0 ? data?.length : 0} Total Admins
                </Text>
              </Stack>
              <HStack
                w={["55%", "55%", "45%", "45%"]}
                justify={"space-between"}
              >
                <Stack direction={"row"} align={"center"} w={"full"}>
                  <Text
                    color={"rgba(15, 23, 42, 1)"}
                    fontWeight={500}
                    fontSize={"15px"}
                  >
                    Urls per page
                  </Text>
                  <Select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    w={["full", "full", "20%", "20%"]}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </Select>
                  <Text
                    color={"rgba(15, 23, 42, 1)"}
                    fontWeight={500}
                    fontSize={"15px"}
                  >
                    page {currentPage} of {totalPages}
                  </Text>
                </Stack>
                <HStack>
                  <Button
                    disabled={currentPage === 1}
                    onClick={() => {
                      if (currentPage !== 1) {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                    border={"1px solid rgba(226, 232, 240, 1)"}
                    bg={"white"}
                  >
                    {/* <Image w={14} h={24} src={leftarrow} /> */}
                  </Button>
                  {renderPageNumbers()}
                  <Button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      if (currentPage !== totalPages) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                    border={"1px solid rgba(226, 232, 240, 1)"}
                    bg={"white"}
                  >
                    {/* <Image w={14} h={14} src={rightarrow} /> */}
                  </Button>
                </HStack>
              </HStack>
            </HStack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
