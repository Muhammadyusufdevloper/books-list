import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";

const BookCard = ({ book }) => {
    const statusColor = useMemo(() => {
        switch (book.status) {
            case "New": return "#FF0000";
            case "Reading": return "#FFEC43";
            case "Finished": return "#00FF29";
            default: return "#FFFFFF";
        }
    }, [book.status]);

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
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "16px", fontWeight: 600, mb: "6px" }}>{book.title}</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>Cover: <a href={book.cover}>{book.cover}</a></Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>Pages: {book.pages}</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>Published: {book.published}</Typography>
                    <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>ISBN: {book.isbn}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: "16px" }}>
                        <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>{book.published} / Eben Upton</Typography>
                        <Typography sx={{ fontSize: "16px", fontWeight: 700, p: "2px 12px", color: "#FFFFFF", background: statusColor, borderRadius: "8.5px" }}>{book.status}</Typography>
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
                <IconButton aria-label="delete" sx={{ background: "#FF4D4F", padding: "8px", color: "#fff", borderRadius: "6px 6px 6px 0", boxShadow: "0px 6px 32px 0px #1515157A", "&:hover": { background: "#FF4D4F" } }}>
                    <RiDeleteBin6Line />
                </IconButton>
                <IconButton sx={{ background: "#6200EE", padding: "8px", color: "#fff", borderRadius: "0 6px 6px 6px", boxShadow: "0px 6px 32px 0px #1515157A", "&:hover": { background: "#6200EE" } }}>
                    <FiEdit3 />
                </IconButton>
            </Box>
        </Box>
    );
};

BookCard.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string.isRequired,
        pages: PropTypes.number.isRequired,
        published: PropTypes.number.isRequired,
        isbn: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired
    }).isRequired
};

export default memo(BookCard);
