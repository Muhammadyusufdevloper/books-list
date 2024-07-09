import { Link } from "react-router-dom";
import steLogo from "../../assets/images/logo.svg";
import { BiSearchAlt } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState, useRef, useEffect, memo } from "react";
import userImg from "../../assets/images/user-image.png";
import callImg from "../../assets/images/call.svg";
import { Avatar, Box, Badge, InputBase, IconButton, Menu, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../context/slices/authSlice";

const Header = () => {
    const [searchChange, setSearchChange] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const searchFormRef = useRef();
    const dispatch = useDispatch()
    const handleClickOutside = (event) => {
        if (searchFormRef.current && !searchFormRef.current.contains(event.target)) {
            setSearchChange(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);

    };
    const handelLogout = () => {
        handleMenuClose(),
            dispatch(logout())
    }
    return (
        <header style={{ padding: " 12px 0" }}>
            <Box className="container" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <Link>
                        <img src={steLogo} alt="site logo svg" />
                    </Link>
                    <Box
                        component="form"
                        ref={searchFormRef}
                        onClick={() => { setSearchChange(true) }}
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            width: '380px',
                            padding: '0 10px',
                            overflow: 'hidden',
                            borderRadius: '6px',
                            gap: '12px',
                            backgroundColor: searchChange ? '#fefefe' : 'transparent',
                            transition: 'all 0.5s ease',
                        }}
                    >
                        <IconButton type="button">
                            <BiSearchAlt style={{ color: searchChange ? '#333333' : '#fefefe' }} />
                        </IconButton>
                        <InputBase
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            sx={{
                                padding: '10px 0',
                                flexGrow: 1,
                                backgroundColor: 'transparent',
                                border: 'none',
                                outline: 'none',
                                fontFamily: 'Mulish',
                                fontSize: '16px',
                                fontWeight: '400',
                                lineHeight: '20.08px',
                                letterSpacing: '0.01em',
                                textAlign: 'left',
                                color: searchChange ? '#151515' : '#fefefe59',
                                '::placeholder': {
                                    color: searchChange ? '#151515' : '#fefefe59',
                                },
                            }}
                            placeholder="Search for any training you want"
                        />
                        {searchChange && (
                            <IconButton onClick={() => setSearchValue("")} type="button">
                                <IoCloseCircleOutline style={{ color: '#333333' }} />
                            </IconButton>
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <Badge color="secondary" sx={{ cursor: "pointer" }}>
                        <img src={callImg} alt="call icon" />
                    </Badge>
                    <Avatar alt="User Avatar" sx={{ cursor: "pointer" }} src={userImg} onClick={handleMenuOpen} />
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handelLogout}>Log Out</MenuItem>
                    </Menu>
                </Box>
            </Box>
        </header>
    );
};

export default memo(Header);

