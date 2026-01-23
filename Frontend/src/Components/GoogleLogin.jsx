import { Button, Box } from "@mui/material";
import { loginWithGoogle } from "../Service/api";

const GoogleLogin = () => {
  return (
    <Box sx={{ mb: 3 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={loginWithGoogle}
      >
        Login with Google
      </Button>
    </Box>
  );
};

export default GoogleLogin;
