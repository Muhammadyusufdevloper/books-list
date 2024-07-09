import { useState, useCallback, useEffect } from "react";
import { Box, IconButton, TextField, Typography, Modal, Button, Snackbar, Alert } from "@mui/material";
import { IoCloseCircleOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { useUpdateBooksMutation } from "../../context/api/booksApi";

const initialState = {
    isbn: "",
    title: "",
    cover: "",
    author: "",
    published: "",
    pages: "",
    status: ""
};

const ModalEdit = ({ setOpen, open, setEdit, edit }) => {
    const [formValues, setFormValues] = useState(initialState);
    const handleClose = useCallback(() => setOpen(false), [setOpen]);
    const [updateBooks, { isSuccess, error }] = useUpdateBooksMutation();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    useEffect(() => {
        if (edit) {
            setFormValues(edit);
        }
    }, [edit]);

    useEffect(() => {
        if (isSuccess) {
            setSnackbarMessage("Book updated successfully");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            handleClose();
            setTimeout(() => {
                handleClose();
            }, 2000);
            setFormValues(initialState);
            setEdit(null);
        } else if (error) {
            setSnackbarMessage("Failed to update book");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    }, [isSuccess, error, handleClose, setEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = () => {
        updateBooks({ id: edit.id, body: formValues });
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ bgcolor: "transparent" }}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 430,
                    bgcolor: 'background.paper',
                    border: 'none',
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 2
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit Book
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <IoCloseCircleOutline />
                        </IconButton>
                    </Box>
                    <TextField
                        name="title"
                        label="Title"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formValues.title}
                        onChange={handleChange}
                    />
                    <TextField
                        name="cover"
                        label="Cover"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formValues.cover}
                        onChange={handleChange}
                    />
                    <TextField
                        name="pages"
                        label="Pages"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formValues.pages}
                        onChange={handleChange}
                    />
                    <TextField
                        name="published"
                        label="Published"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formValues.published}
                        onChange={handleChange}
                    />
                    <TextField
                        name="isbn"
                        label="Isbn"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formValues.isbn}
                        onChange={handleChange}
                    />
                    <TextField
                        name="author"
                        label="Author"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formValues.author}
                        onChange={handleChange}
                    />
                    <TextField
                        name="status"
                        label="Status"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formValues.status}
                        onChange={handleChange}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: "12px" }}>
                        <Button variant="outlined" sx={{ flexGrow: "1" }} onClick={handleClose}>Close</Button>
                        <Button variant="contained" sx={{ background: "#6200EE", flexGrow: "1" }} onClick={handleSubmit}>Save</Button>
                    </Box>
                </Box>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '320px', background: "#52C41A", color: "#FEFEFE" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

ModalEdit.propTypes = {
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    edit: PropTypes.object,
    setEdit: PropTypes.func.isRequired,
};

export default ModalEdit;
