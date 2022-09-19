import React, {ReactNode, useContext, useEffect} from "react";
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList, Button, Center,
} from "@chakra-ui/react";
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from "react-icons/fi";
import {IconType} from "react-icons";
import {ReactText} from "react";
import {AddIcon, PlusSquareIcon} from "@chakra-ui/icons";
import {useHistory, Link as RLink, NavLink} from "react-router-dom";
import {useAdmin, useAuth} from "../../hooks/useAuth";
import {FcLibrary, HiOutlineLibrary} from "react-icons/all";
import {AdminContext} from "../../providers/AdminSettingProvider";
import AppService from "../../service/AppService";


const LinkItems = [
    //window.location.pathname
    {name: "Assigned Quiz", icon: FiHome, href: "/admin/assigned"},
    {name: "Report", icon: FiTrendingUp, href: "/admin/report"},
    {name: "Library", icon: HiOutlineLibrary, href: "/admin/library"},
    {name: "Explore", icon: FiCompass, href: "/admin/explore"},
    {name: "Favourites", icon: FiStar, href: "/admin/favourites"},
    {name: "Settings", icon: FiSettings, href: "/admin/setting"},
];

export default function SidebarWithHeader({children}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {user} = useAuth();
    const {fullMode} = useAdmin();

    return (
        <>

            <Box w={'100%'} minH="100vh" bg={'gray.100'}>
                {fullMode && <SidebarContent
                    onClose={() => onClose}
                    display={{base: "none", md: "block"}}
                />}
                <Drawer
                    autoFocus={false}
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="full"
                >
                    <DrawerContent>
                        <SidebarContent onClose={onClose}/>
                    </DrawerContent>
                </Drawer>
                {/* mobilenav */}
                <MobileNav fullMode={fullMode} onOpen={onOpen} avt={user.avt}/>
                <Box ml={{base: 0, md: fullMode && 60}} p="4">
                    {children}
                </Box>
            </Box>
        </>
    );
}


const SidebarContent = ({onClose, ...rest}) => {
    const history = useHistory();
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{base: "full", md: 60}}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" cursor={'pointer'} onClick={
                    () => history.replace('/')
                }>
                    Dashboard
                </Text>
                <CloseButton
                    display={{base: "flex", md: "none"}}
                    onClick={onClose}
                />
            </Flex>
            {LinkItems.map((link, index) => (
                <NavItem link={link.href} key={index} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};


const NavItem = ({icon, children, link, ...rest}) => {
    return (
        <NavLink
            // href={link}
            activeStyle={{
                color: 'blueviolet',
                fontWeight: 'bold',
                textDecoration: 'underline'
            }}
            activeClassName="navUl__active"
            to={link}
            style={{textDecoration: "none"}}>
            <Flex
                // bg={window.location.pathname===link?'teal':'white'}
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "cyan.400",
                    color: "white",
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: "white",
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </NavLink>
    );
};


const MobileNav = ({onOpen, avt, fullMode, ...rest}) => {
    const history = useHistory();
    const {logout, user} = useAuth();
    return (
        <Flex
            // ml={{base: 0, md: !fullMode && 60}}
            px={{base: 4, md: 4}}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent={{base: "space-between", md: "flex-end"}}
            {...rest}
        >
            <IconButton
                display={{base: "flex", md: "none"}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <Text
                display={{base: "flex", md: "none"}}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Quiz Exam
            </Text>

            <HStack spacing={{base: "0", md: "6"}}>

                <Button
                    onClick={() => {
                        history.push("/admin/quiz/new")
                    }}
                    colorScheme={'teal'} leftIcon={<AddIcon/>}>
                    Create Quiz
                </Button>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell/>}
                />
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{boxShadow: "none"}}
                        >
                            <HStack>

                                <Avatar
                                    size={"sm"}
                                    src={
                                        AppService.getImage(user.avt) || "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                    }
                                />
                                <VStack
                                    display={{base: "none", md: "flex"}}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    {/*USERNAME*/}
                                    <Text fontSize="sm">{user.username}</Text>
                                    {/*ROLE*/}
                                    <Text fontSize="xs" color="gray.600">
                                        {/*{user.roles[0].name === "ROLE_ADMIN" ? "Teacher" : "Student"}*/}
                                        Student
                                    </Text>
                                </VStack>
                                <Box display={{base: "none", md: "flex"}}>
                                    <FiChevronDown/>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue("white", "gray.900")}
                            borderColor={useColorModeValue(
                                "gray.200",
                                "gray.700"
                            )}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider/>
                            <MenuItem onClick={() => {
                                logout();
                                history.replace('/login')
                            }}>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
