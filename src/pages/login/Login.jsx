import { useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSignInQuery } from '../../context/api/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../context/slices/authSlice';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data, isSuccess, isLoading } = useSignInQuery();

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setErrors }) => {
            if (data) {
                const user = data.find(el => el.username === values.username && el.password === values.password);
                if (user) {
                    navigate("/");
                    dispatch(setUser(values));
                } else {
                    setErrors({
                        username: 'Invalid username or password',
                        password: 'Invalid username or password'
                    });
                }
            }
        }
    });

    return (
        <section style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box width={430}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: "48px 28px",
                        borderRadius: 2,
                        boxShadow: 3,
                        height: "480px"
                    }}
                >
                    <Typography component="h1" sx={{ fontSize: "32px", fontWeight: 700, lineHeight: "45.18px", color: "#151515", mb: "36px" }}>
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: '#6200ea' }}
                            disabled={isLoading}
                        >
                            Sign In
                        </Button>
                        <Box textAlign="center">
                            Already signed up?
                            <Link to={"/register"} variant="body2" style={{ fontSize: "14px", fontWeight: 300, lineHeight: "16.8px", color: "#1B28BC" }}>
                                Go to sign up.
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </section>
    );
};

export default Login;
