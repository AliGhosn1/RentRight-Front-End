import { useGetIdentity, useList } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { useNavigate } from "@pankod/refine-react-router-v6";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Box, Typography, FormControl, FormHelperText, TextField, TextareaAutosize, Stack, 
Select, MenuItem } from "@pankod/refine-mui";

import { CustomButton } from "components";

const CreateProperty = () => {
  const navigatge = useNavigate();
  const {data: user} = useGetIdentity();
  const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm();

  const { data, isLoading, isError } = useList({
    resource: 'properties'
  });

  const allPropertis = data?.data  ?? [];

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Something went wrong</div>

  const onFinishHandler = async (data: FieldValues) => {
    await onFinish({...data, email: user.email});
    navigatge('/properties');
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
        <Typography fontSize={25} fontWeight={700} color='#11142d'>Add a Review</Typography>

        <Box mt={2.5} borderRadius='15px' padding='20px' bgcolor='#fcfcfc'>
          <form style={{
            marginTop: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'}}
            onSubmit={
              handleSubmit(onFinishHandler)
            }
            >
                <FormControl sx={{ flex: 1 }}>
                    <FormHelperText sx={{
                        fontWeight: 500,
                        margin: '10px 0',
                        fontSize: 16,
                        color: '#11142d'
                    }}>
                        Select a Property
                    </FormHelperText>
                    <Select
                        variant="outlined"
                        color='info'
                        displayEmpty
                        required
                        inputProps={{ 'aria-label': 'Wiyhout label' }}
                        placeholder='Select a Property'
                        {...register('propertyId', { required: true })}
                    >
                        {
                            allPropertis.map((property) => <MenuItem value={property._id}>{ property.title }</MenuItem>)
                        }
                    </Select>
                </FormControl>
              <FormControl>
                <FormHelperText sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d'
                }}>Rate The Property</FormHelperText>
                <Select
                    variant="outlined"
                    color='info'
                    displayEmpty
                    required
                    inputProps={{ 'aria-label': 'Wiyhout label' }}
                    placeholder="Rating"
                    {...register('rating', { required: true })}
                >
                    {
                        [1, 2, 3, 4, 5].map((rating) => <MenuItem value={rating}>{ rating }</MenuItem>)
                    }
                </Select>
              </FormControl>

              <FormControl>
                <FormHelperText sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: '#11142d'
                }}>Write Your Review</FormHelperText>
                <TextareaAutosize 
                  minRows={5}
                  placeholder="Write Your Review"
                  required
                  color="info"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    fontSize: '16px',
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                    borderRadius: 6,
                    padding: 10,
                    color: '#919191'
                  }}
                  {...register('message', { required: true })}
                />
              </FormControl>
            <CustomButton type='submit' title={formLoading ? 'Submitting...' : 'Submit'} backgroundColor="#475be8" color='#fcfcfc' />
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default CreateProperty;