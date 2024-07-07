import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import noteFoundImg from "../../assets/images/noteFound.png";
import backgroundImg from "../../assets/images/backgroundImg.png";

const NoteFound = () => {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate("/");
    };

    const reloadPage = () => {
        navigate(-1);
    };

    return (
        <Box
            sx={{
                background: `url(${backgroundImg}) `,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    padding: "20px",
                    borderRadius: "8px",
                }}
            >
                <Box sx={{ marginBottom: "16px" }}>
                    <img src={noteFoundImg} alt="site note found img" style={{ maxWidth: "100%" }} />
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={goToHomePage}
                        sx={{ marginRight: "12px", backgroundColor: "#6200ea", color: "white" }}
                    >
                        Go Home Page
                    </Button>
                    <Button
                        variant="outlined"
                        disableElevation
                        onClick={reloadPage}
                        sx={{ borderColor: "#6200ea", color: "#6200ea" }}
                    >
                        Reload Page
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default NoteFound;
