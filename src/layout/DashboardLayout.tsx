import { Outlet, useNavigate } from "react-router-dom";

import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeIcon from '@mui/icons-material/Home';

import { Link } from "react-router-dom";
import { LoginApi } from "../api/Login.api";
import { LocalStorage } from "../util/LocalStorage";
import { UserType } from "../model/user";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function DashboardLayout() {
    const theme = useTheme();

    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => setOpen(true);

    const handleDrawerClose = () => setOpen(false);

    const navigate = useNavigate();
    
    const loginApi = React.useMemo(() => new LoginApi(),[]);
   
    const verifyToken = async () => {
        await loginApi.verifyToken()
        .then((_) => { navigate('/dashboard') })
        .catch((_) => { navigate('/login') })
    }

    React.useEffect(()=>{
        //verifyToken()
    },[]);

    let menus = [
        { icon: <HomeIcon />, text: "Página inicial", link: "/" },
        { icon: <DashboardIcon />, text: "Perfil", link: "/dashboard" },
        { icon: <DesignServicesIcon />, text: "Serviços", link: "/dashboard/job" },
        { icon: <MonetizationOnIcon />, text: "Transações", link: "/dashboard/transation" },
    ];

    const person = LocalStorage.getItemPerson();

    if( person.type == UserType.PROVIDER){
        menus = [
            { icon: <HomeIcon />, text: "Página inicial", link: "/" },
            { icon: <DashboardIcon />, text: "Perfil", link: "/dashboard" },
            { icon: <PeopleIcon />, text: "Clientes", link: "/dashboard/customer" },
            { icon: <SupervisedUserCircleIcon />, text: "Provedores", link: "/dashboard/provider" },
            { icon: <DesignServicesIcon />, text: "Serviços", link: "/dashboard/job" },
            { icon: <MonetizationOnIcon />, text: "Transações", link: "/dashboard/transation" },
        ];
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start"
                        sx={{ marginRight: 5, ...(open && { display: 'none' }), }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">Panel de control</Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menus.map((menu, index) => (
                        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                            <Link to={menu.link}>
                                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>{menu.icon}</ListItemIcon>
                                    <ListItemText primary={menu.text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
}
