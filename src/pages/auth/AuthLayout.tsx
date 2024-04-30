import { Box, Image } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <Box
            height={"100svh"}
            display={"flex"}
            alignItems={"center"}
            overflow={"clip"}
        >
            <Box
                w={["50", "50%", "50%", "60%"]}
                h={"100%"}
                bg={"linear-gradient(180deg, #003DF5 0%, rgba(255, 255, 255, 0) 100%)"}
                display={['none', 'none', 'flex']}
                flexDir={"column"}
                alignItems={"flex-start"}
                justifyContent={"flex-end"}
            >
                <Image
                    src="/src/assets/phone.png"
                    alt="phone"
                    objectFit={"contain"}
                    objectPosition={"center"}
                    w={['100%', '100%', '85%']}
                />
            </Box>
            <Box
                flex={1}
                h={"100%"}
                bg={"white"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"start"}
            // w={["100%"]}
            >
                <Outlet />
            </Box>

        </Box>
    )
}

export default AuthLayout
