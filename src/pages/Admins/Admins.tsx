import { Button, Card, Checkbox, HStack, Image, Input, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure } from '@chakra-ui/react'
import { AccountNavbar } from '../../components/AccountNavbar'
import filter from "../../assets/filter.svg";
import download from "../../assets/download.svg";
import tableuser from "../../assets/tableuser.svg";
import AddAdminModal from './components/AddAdminModal';


const admins = [
    { name: "Guy Hawkins", email: "harry@gmail.com", },
    { name: "Guy Hawkins 2", email: "email2@gmail.com", },
    { name: "Guy Hawkins 3", email: "email2@gmail.com", },
    { name: "Guy Hawkins 4", email: "email3@gmail.com", },

]

const Admins = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Stack h={"auto"} w={"100%"}>
            <AccountNavbar routeName={""} dashboard={true} />
            <VStack
                mx={"auto"}
                h={"auto"}
                w={["100%", "100%", "90%", "90%"]}
                gap={2}
                mt={["8rem", "8rem", "6rem", "6rem"]}
                mb={2}
                align={["start", "start", "end", "end"]}
            >
                <Stack
                    direction={"row"}
                    w={"85%"}
                    h={"9vh"}
                    mt={5}
                    px={4}
                    justify={"space-between"}
                    align={"center"}
                    border={"1px solid rgba(120, 116, 134, 0.1)"}
                >
                    <HStack
                        w={"100%"}
                        justifyContent={"space-between"}
                    >
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
                        <Button
                            colorScheme='blue'
                            bg={"#0641FB"}
                            onClick={onOpen}
                        >
                            Add Admin
                        </Button>
                    </HStack>

                </Stack>
                <AddAdminModal isOpen={isOpen} onClose={onClose} />

                <Stack w={"85%"} h={"auto"} mt={5}>
                    <Card>
                        <TableContainer>
                            <Table variant="simple">
                                <colgroup>
                                    <col style={{ width: "5%" }} />
                                    <col style={{ width: "40%" }} />
                                    <col style={{ width: "40%" }} />
                                    <col style={{ width: "15%" }} />
                                </colgroup>
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
                                        <Th>
                                            Name
                                        </Th>
                                        <Th>E-mail</Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {admins?.map((admin, index) => (
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
                                                    <Text>{admin.name}</Text>
                                                </HStack>
                                            </Td>
                                            <Td>{admin.email}</Td>

                                            <Td>
                                                <Button
                                                    variant={"ghost"}
                                                    w={["100%", "100%", "80%", "80%"]}
                                                    cursor={"pointer"}
                                                    // onClick={() => onOpen()}
                                                    fontSize={"18px"}
                                                    fontWeight={400}
                                                    color={"GrayText"}
                                                >
                                                    Delete
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Stack>
            </VStack>
        </Stack>
    )
}

export default Admins
