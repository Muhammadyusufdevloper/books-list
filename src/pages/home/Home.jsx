import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/header/Header";
import { memo, useState, useCallback, useEffect } from "react";
import BookCard from "../../components/book-card/BookCard";
import { useGetBooksQuery } from "../../context/api/booksApi";
import ModalCreate from "../../components/modal/Modal";

const Home = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("")
    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);
    const { data, refetch } = useGetBooksQuery({ title: search.trim() });

    useEffect(() => {
        refetch();
    }, [data, refetch]);

    return (
        <div className="pages">
            <Header search={search} setSearch={setSearch} />
            <Box className="container" sx={{ mt: "36px" }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: "36px" }}>
                    <Box>
                        <Typography variant="h1" sx={{ fontSize: '36px', fontWeight: 700, lineHeight: '45.18px', color: "#FEFEFE", mb: "12px" }}>
                            You’ve got <span style={{ color: "#6200EE" }}>{data ? data.length : 0} books</span>
                        </Typography>
                        <Typography sx={{ fontSize: '20px', fontWeight: 400, lineHeight: '25.1px', color: "#FEFEFE" }}>Your books today</Typography>
                    </Box>
                    <Button onClick={handleOpen} sx={{ display: "flex", alignItems: "center", gap: "12px", background: "#6200EE" }} variant="contained" disableElevation>
                        <span>+</span> Create a book
                    </Button>
                </Box>
                <Box display="grid" gridTemplateColumns={"1fr 1fr 1fr"} gap={3}>
                    {data ? data.slice(0, 9).map((book) => (
                        <BookCard key={book.id} book={book} />
                    )) : null}
                </Box>
                <ModalCreate open={open} setOpen={setOpen} />
            </Box>
        </div>
    );
}


export default memo(Home);
