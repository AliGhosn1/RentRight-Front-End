/* eslint-disable no-restricted-globals */
import { Typography, Box, Stack, borderRadius, ThemeProvider, CssBaseline, createTheme } from '@pankod/refine-mui';
import { useDelete, useGetIdentity, useShow } from '@pankod/refine-core';
import { useParams, useNavigate } from '@pankod/refine-react-router-v6';
import { ChatBubble, Delete, Edit, Phone, Place, Star } from '@mui/icons-material';

import { CustomButton } from 'components';

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { queryResult } = useShow();
  const { mutate } = useDelete();
  const { id } = useParams();

  const { data, isLoading, isError } = queryResult;

  const propertyDetails = data?.data ?? {};
  console.log(propertyDetails)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const isCurrentUser = user.email === propertyDetails.creator.email;

  let stars = 0;
  if(propertyDetails?.allReviews.length ?? 0 ){
    propertyDetails.allReviews.forEach((review: any) => {stars += review.rating});
  }

  stars = Math.round(stars / propertyDetails.allReviews.length);
  
  const starArray = [];

  for(var i=0; i < stars; i++){
    starArray.push(<Star key={`star-${i}`} sx={{ color: '#F2C94C' }} />);
  }

  for(var i=stars; i < 5; i++){
    starArray.push(<Star key={`star-${i}`} sx={{ color: 'grey' }} />);
  }

  const handleDeleteProperty = () => {
    const response = confirm('Are you sure you want to delete this property?');
    if (response) {
      mutate({
        resource: 'properties',
        id: id as string,
      }, {
        onSuccess: () => {
          navigate('/properties');
        },
      });
    }
  };

  const lightTheme = createTheme({
    palette: {
       mode: "light"
    },
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box
        borderRadius="15px"
        padding="20px"
        bgcolor="#FCFCFC"
        width="100%"
      >
        <Typography fontSize={25} fontWeight={700} color="#11142D">Details</Typography>

        <Box mt="20px" display="flex" flexDirection={{ xs: 'column', lg: 'row' }} justifyContent='space-around' marginX={{xs: 'auto', lg:'0'}}width={{xs: '80vw', lg:'100%'}}>

          <Box flex={1} maxWidth={764}>
            <img
              src={propertyDetails.photo}
              alt="property_details-img"
              height={546}
              style={{ objectFit: 'cover', borderRadius: '10px' }}
              className="property_details-img"
            />

            <Box mt="15px">
              <Stack direction="row" justifyContent="space-between" flexWrap="wrap" alignItems="center">
                <Typography fontSize={18} fontWeight={500} color="#11142D" textTransform="capitalize">{propertyDetails.propertyType}</Typography>
                <Box>
                  {
                    starArray
                  }
                </Box>
              </Stack>

              <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={2}>
                <Box>
                  <Typography fontSize={22} fontWeight={600} mt="10px" color="#11142D">{propertyDetails.title}</Typography>
                  <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                    <Place sx={{ color: '#808191' }} />
                    <Typography fontSize={14} color="#808191">{propertyDetails.location}</Typography>
                  </Stack>
                </Box>

                <Box>
                  <Typography fontSize={16} fontWeight={600} mt="10px" color="#11142D">Price</Typography>
                  <Stack direction="row" alignItems="flex-end" gap={1}>
                    <Typography fontSize={25} fontWeight={700} color="#475BE8">${propertyDetails.price}</Typography>
                    <Typography fontSize={14} color="#808191" mb={0.5}>for one day</Typography>
                  </Stack>
                </Box>
              </Stack>

              <Stack mt="25px" direction="column" gap="10px">
                <Typography fontSize={18} color="#11142D">Description</Typography>
                <Typography fontSize={14} color="#808191" maxHeight='250px' overflow='auto'>
                  {propertyDetails.description}
                </Typography>
              </Stack>
            </Box>
          </Box>

          <Box width="100%" flex={1} maxWidth={326} display="flex" flexDirection="column" gap="20px" marginX={{xs: 'auto', lg:'0'}} justifyContent='space-around' mt='20px'>
            <Stack
              width="100%"
              p={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
              border="1px solid #E4E4E4"
              borderRadius={2}
            >

              <Stack mt={2} justifyContent="center" alignItems="center" textAlign="center">
                <img
                  src={propertyDetails.creator.avatar}
                  width={90}
                  height={90}
                  style={{ borderRadius: '100%', objectFit: 'cover' }}
                  alt='img'
                />

                <Box mt="15px">
                  <Typography fontSize={18} fontWeight={600} color="#11142D">{propertyDetails.creator.name}</Typography>
                  <Typography mt="5px" fontSize={14} fontWeight={400} color="#808191">Agent</Typography>
                </Box>

                <Stack mt="15px" direction="row" alignItems="center" gap={1}>
                  <Place sx={{ color: '#808191' }} />
                  <Typography fontSize={14} fontWeight={400} color="#808191">{ propertyDetails.creator.address }</Typography>
                </Stack>

                <Typography mt={1} fontSize={16} fontWeight={600} color="#11142D">{propertyDetails.creator.allProperties.length} {propertyDetails.creator.allProperties.length === 1 ? 'Property' : 'Properties'}</Typography>
              </Stack>

              <Stack width="100%" mt="25px" direction="row" flexWrap="wrap" gap={2}>
                <CustomButton
                  title={!isCurrentUser ? 'Message' : 'Edit'}
                  backgroundColor="#475BE8"
                  color="#FCFCFC"
                  fullWidth
                  icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                  handleClick={() => {
                    if (isCurrentUser) {
                      navigate(`/properties/edit/${propertyDetails._id}`);
                    }
                  }}
                />
                <CustomButton
                  title={!isCurrentUser ? 'Call' : 'Delete'}
                  backgroundColor={!isCurrentUser ? '#2ED480' : '#d42e2e'}
                  color="#FCFCFC"
                  fullWidth
                  icon={!isCurrentUser ? <Phone /> : <Delete />}
                  handleClick={() => {
                    if (isCurrentUser) handleDeleteProperty();
                  }}
                />
              </Stack>
            </Stack>

            <Stack>
              <img
                src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
                width="100%"
                height={306}
                style={{ borderRadius: 10, objectFit: 'cover' }}
                alt='img'
              />
              <Box mt='20px'>
              <CustomButton
                title="Book Now"
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
              />
            </Box>
            </Stack>
          </Box>
        </Box>
        
        <Typography fontSize={20} fontWeight={600} color="#11142D" mt='30px'>Reviews</Typography>

        <Box>
          {
            propertyDetails.allReviews.slice(0).reverse().map((review: any) => {
              
              const starArray = [];
              for(var i=0; i < review.rating; i++){
                starArray.push(<Star key={`star-${i}`} sx={{ color: '#F2C94C' }} />);
              }
              for(var j=review.rating; i < 5; i++){
                starArray.push(<Star key={`star-${j}`} sx={{ color: 'grey' }} />);
              }

              return(
                <Box display='flex' flexDirection='row' padding='10px' height='200px' alignItems='center' key={review._id}>
                  <Box textAlign='center' mr='20px' fontWeight={800} display='flex' flexDirection='column'>
                    <img src={review.user.avatar} alt='Review user' style={{ borderRadius: '10px', height: '80px', width: '80px', margin: '0 auto' }}/>
                    {review.user.name}
                    <Box display='flex' >
                      {starArray}
                    </Box>
                  </Box>
                  <Box maxHeight='80%' overflow='auto'>
                  { review.message }
                  </Box>
                </Box>
              )
            }
            )
          }  
        </Box>  
      </Box>
    </ThemeProvider>

  );
};

export default PropertyDetails;