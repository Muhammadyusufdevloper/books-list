import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/header/Header";
import { memo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./Home.scss";
import ModalCreate from "../../components/modal/Modal";
import BookCard from "../../components/book-card/BookCard";
import { useGetBooksQuery } from "../../context/api/booksApi";

// const booksData = [
//     { title: "Raspberry Pi User Guide", pages: 221, published: 2012, isbn: "9781118464465", status: "New", cover: "http://url.to.book.cover" },
//     { title: "Raspberry Pi User Guide", pages: 221, published: 2012, isbn: "9781118464465", status: "Reading", cover: "http://url.to.book.cover" },
//     { title: "Raspberry Pi User Guide", pages: 221, published: 2012, isbn: "9781118464465", status: "Finished", cover: "http://url.to.book.cover" }
// ];

const Home = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);
    const { data } = useGetBooksQuery()
    console.log(data);
    return (
        <section>
            <Header />
            <Box className="container" sx={{ mt: "36px" }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: "36px" }}>
                    <Box>
                        <Typography variant="h1" sx={{ fontSize: '36px', fontWeight: 700, lineHeight: '45.18px', color: "#FEFEFE", mb: "12px" }}>
                            You’ve got <span style={{ color: "#6200EE" }}>7 book</span>
                        </Typography>
                        <Typography sx={{ fontSize: '20px', fontWeight: 400, lineHeight: '25.1px', color: "#FEFEFE" }}>Your books today</Typography>
                    </Box>
                    <Button onClick={handleOpen} sx={{ display: "flex", alignItems: "center", gap: "12px", background: "#6200EE" }} variant="contained" disableElevation>
                        <span>+</span> Create a book
                    </Button>
                </Box>
                <Box display="grid" gridTemplateColumns={"1fr 1fr 1fr"} gap={3}>
                    {data?.slice(0,6).map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </Box>
                <ModalCreate open={open} setOpen={setOpen} handleClose={handleClose} />
            </Box>
        </section>
    );
}

Home.propTypes = {
    books: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            pages: PropTypes.number.isRequired,
            published: PropTypes.number.isRequired,
            isbn: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            cover: PropTypes.string.isRequired
        })
    )
};

export default memo(Home);
