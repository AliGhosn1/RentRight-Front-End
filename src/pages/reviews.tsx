import React from 'react'

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


import { Add } from "@mui/icons-material";
import { useList } from "@pankod/refine-core";
import { Box, Typography, Stack } from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";

import { CustomButton } from "components";

const Reviews = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useList({
    resource: 'reviews'
  });

  const allReviews = data?.data  ?? [];

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Something went wrong</div>

  const lightTheme = createTheme({
    palette: {
       mode: "light"
    },
 });

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box>
        <Box mt='20px' sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3
        }}>
          <Stack direction='column' width='100%'>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <Typography fontSize={25} fontWeight={700} color='#11142d'>
                All Reviews
              </Typography>
              <CustomButton title="Add Review" handleClick={() => navigate('/reviews/create')} backgroundColor='#475be8' color='#fcfcfc' icon={<Add />} />
            </Stack>
          </Stack>
        </Box>

        <Box mt='20px' 
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            backgroundColor: '#fcfcfc'
          }}
        >
          {
            allReviews.map((review) => (
              <Stack>{ review.message }</Stack>
            ))
          }
        </Box>        
      </Box>
    </ThemeProvider>
  )
}

export default Reviews