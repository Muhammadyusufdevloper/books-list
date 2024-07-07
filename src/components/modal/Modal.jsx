import { Box, IconButton, TextField, Typography, Modal, Button } from "@mui/material";
import { IoCloseCircleOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { useCallback } from "react";

const ModalCreate = ({ setOpen, open }) => {
    const handleClose = useCallback(() => setOpen(false), [setOpen]);

    return (
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
                        Create a book
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <IoCloseCircleOutline />
                    </IconButton>
                </Box>
                <TextField
                    label="ISBN"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: "12px" }}>
                    <Button variant="outlined" sx={{ flexGrow: "1" }} onClick={handleClose}>Close</Button>
                    <Button variant="contained" sx={{ background: "#6200EE", flexGrow: "1" }}>Submit</Button>
                </Box>
            </Box>
        </Modal>
    );
}

ModalCreate.propTypes = {
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default ModalCreate;
