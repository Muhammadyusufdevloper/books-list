import { Box, Card, CardContent, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { memo, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { useDeleteBooksMutation } from "../../context/api/booksApi";
import ModalEdit from "../modal/EditModal";

const BookCard = ({ book }) => {
    const [deleteBooks] = useDeleteBooksMutation();
    const [openDialog, setOpenDialog] = useState(false);
    const [edit, setEdit] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);

    // Convert pages and published to number
    const pages = Number(book.pages);
    const published = Number(book.published);

    const statusColor = useMemo(() => {
        switch (book.status?.toLowerCase()) {
            case "new": return "#FF0000";
            case "reading": return "#FFEC43";
            case "finished": return "#00FF29";
            default: return "#FFFFFF";
        }
    }, [book.status]);

    const handleDelete = () => {
        deleteBooks(book.id);
        setOpenDialog(false);
    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    return (
        <Box
            sx={{
                position: "relative",
                "&:hover .hover-buttons": {
                    opacity: 1
                }
            }}
        >
            <Card sx={{ borderRadius: "12px" }}>
                <CardContent sx={{ padding: "32px" }}>
                    <Typography sx={{
                        fontFamily: "Montserrat", fontSize: "16px", fontWeight: 600, mb: "6px", overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                    }}>{book.title}</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>Cover: <a href={book.cover}>{book.cover}</a></Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>Pages: {pages}</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>Published: {published}</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>ISBN: {book.isbn}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: "16px" }}>
                        <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>{published} / Eben Upton</Typography>
                        <Typography sx={{ fontSize: "16px", fontWeight: 700, p: "2px 12px", color: "#FFFFFF", background: statusColor, borderRadius: "8.5px" }}>{book.status.slice(0, 1).toUpperCase() + book.status.slice(1).toLowerCase()}</Typography>
                    </Box>
                </CardContent>
            </Card>
            <Box
                className="hover-buttons"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    top: "16px",
                    right: "-40px",
                    zIndex: 2,
                    gap: "2px",
                    opacity: 0,
                    transition: "opacity 0.3s"
                }}
            >
                <IconButton onClick={handleDialogOpen} aria-label="delete" sx={{ background: "#FF4D4F", padding: "8px", color: "#fff", borderRadius: "6px 6px 6px 0", boxShadow: "0px 6px 32px 0px #1515157A", "&:hover": { background: "#FF4D4F" } }}>
                    <RiDeleteBin6Line />
                </IconButton>
                <IconButton onClick={() => { setEdit(book); setOpenEditModal(true); }} sx={{ background: "#6200EE", padding: "8px", color: "#fff", borderRadius: "0 6px 6px 6px", boxShadow: "0px 6px 32px 0px #1515157A", "&:hover": { background: "#6200EE" } }}>
                    <FiEdit3 />
                </IconButton>
            </Box>
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    "& .MuiPaper-root": {
                        borderRadius: "12px",
                        padding: "16px",
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Book"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this book?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        No
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <ModalEdit
                open={openEditModal}
                setOpen={setOpenEditModal}
                edit={edit}
                setEdit={setEdit}
            />
        </Box>
    );
};

BookCard.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string.isRequired,
        pages: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        published: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        isbn: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }).isRequired
};

export default memo(BookCard);
