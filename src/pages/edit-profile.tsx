import { useState } from 'react';
import { useGetIdentity } from '@pankod/refine-core';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';
import Form from 'components/common/Form';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Box, Typography, FormControl, FormHelperText, TextField, TextareaAutosize, Stack, 
Select, MenuItem, Button, width } from "@pankod/refine-mui";

import { FormProps } from "interfaces/common";
import { CustomButton } from "components";

const EditProfile = () => {
  const { data: user } = useGetIdentity();
  const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm();

  const onFinishHandler = async (data: FieldValues) => {
    await onFinish({ ...data, email: user.email });
  };

  const lightTheme = createTheme({
    palette: {
       mode: "light"
    },
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box>
        <Typography fontSize={25} fontWeight={700} color='#11142d'>Edit your information</Typography>

        <Box mt={2.5} borderRadius='15px' padding='20px' bgcolor='#fcfcfc'>
          <form style={{
            marginTop: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'}}
            onSubmit={handleSubmit(onFinishHandler)}
            >
              <FormControl>
                <FormHelperText sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d'
                }}>Your Address</FormHelperText>
                <TextField 
                  fullWidth
                  required
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  {...register('address', { required: true })}
                />
              </FormControl>

              <FormControl>
                    <FormHelperText sx={{
                      fontWeight: 500,
                      margin: '10px 0',
                      fontSize: 16,
                      color: '#11142d'
                    }}>Your Phone Number</FormHelperText>
                    <TextField 
                      fullWidth
                      required
                      id="outlined-basic"
                      color="info"
                      variant="outlined"
                      {...register('number', { required: true })}
                    />
                  </FormControl>
                  <CustomButton type='submit' title={formLoading ? 'Submitting...' : 'Submit'} backgroundColor="#475be8" color='#fcfcfc' />
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EditProfile;