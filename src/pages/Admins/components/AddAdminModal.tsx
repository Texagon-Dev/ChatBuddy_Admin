
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    Text,
    Input,
    Box,
} from '@chakra-ui/react'
const AddAdminModal = ({ isOpen, onClose }: any) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Admin Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4} alignItems={"flex-start"}>
                            <Text color="GrayText">
                                Add an admin account to chatbuddy.io
                            </Text>
                            <Box w={"full"} >
                                <Text>Name</Text>
                                <Input placeholder="Admin Name" />
                            </Box>
                            <Box w={"full"}>
                                <Text>Email</Text>
                                <Input type='email' placeholder="Admin Email" />
                            </Box>
                            <Button bg={"#0641FB"} colorScheme='blue' mr={3} onClick={onClose}>
                                Add Admin
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddAdminModal
