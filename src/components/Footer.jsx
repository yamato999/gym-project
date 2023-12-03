import { Box, Stack, Typography } from "@mui/material";

import Logo from "../assets/images/Logo-1.png";

function Footer() {
  return (
    <Box mt="80px" bgColor="#fff3f4" mb="60px">
      <Stack gap="40px" alignItems="center" px="40px" pt="24px">
        <img src={Logo} alt="logo" width="200px" height="40px"></img>
      </Stack>
    </Box>
  );
}

export default Footer;
