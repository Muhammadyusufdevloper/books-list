import { useEffect, useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRegisterUserMutation } from '../../context/api/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../context/slices/authSlice';
let initialValues = {
    username: 'john_32',
    password: '12345678',
    confirmPassword: '12345678'
}
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const [userCreate, { isLoading, isSuccess }] = useRegisterUserMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required')
    });
    useEffect(() => {
        if (isSuccess) {
            navigate("/")
            dispatch((setUser(initialValues)))
        }
    }, [isSuccess])
    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const { confirmPassword, ...userData } = values;
            userCreate(userData);
        }
    });
    const handelUserCreate = () => {

    }
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
                    }}
                >
                    <Typography component="h1" sx={{ fontSize: "32px", fontWeight: 700, lineHeight: "45.18px", color: "#151515", mb: "36px" }}>
                        Sign up
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
                            label="Enter your password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="new-password"
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Enter your confirm password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <IoIosEyeOff /> : <IoIosEye />}
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
                            onClick={handelUserCreate}
                            disabled={isLoading}
                        >
                            Submit
                        </Button>
                        <Box textAlign="center">
                            Already signed up?
                            <Link to={"/login"} variant="body2" style={{ fontSize: "14px", fontWeight: 300, lineHeight: "16.8px", color: "#1B28BC" }}>
                                Go to sign in.
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </section>
    );
};

export default Register;
