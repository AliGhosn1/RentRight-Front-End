import { useList } from "@pankod/refine-core";
import { useState, useEffect } from "react";

import{
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopAgent  
} from 'components'

import { Typography, Box, Stack } from "@pankod/refine-mui";


const Home = () => {
  const [propertiesInfo, setPropertiesInfo] = useState({ numberOfProperties: 0, numberOfLocations: 0, avgPrice: 0 });

  const { data, isLoading, isError } = useList({
    resource: 'properties',
  })

  useEffect(() => {
    
    if(data){
      const locations = new Set();
      let totalPrice = 0;
      data.data.forEach((property) => {
        console.log(property)
        locations.add(property.location)
        totalPrice += property.price;
      })

      const propertyData = {
        numberOfProperties: data.data.length,
        numberOfLocations: locations.size,
        avgPrice: Math.round((totalPrice / data.data.length) * 100) / 100
      }
      setPropertiesInfo(propertyData);
    }

  }, [data])

  let latestProperties = data?.data.slice(data.data.length-4 > 0 ? data.data.length-4 : 0, data.data.length).reverse() ?? []; 

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error</div>

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142d' >
        Dashboard
      </Typography>

      <Box mt='20px' display='flex' flexWrap='wrap' gap={4}>
        <PieChart 
          title='Properties Available'
          value={propertiesInfo.numberOfProperties}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart 
          title='Locations'
          value={propertiesInfo.numberOfLocations}
          series={[60, 40]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart 
          title='Current Average Price'
          value={propertiesInfo.avgPrice}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart 
          title='Properties for Cities'
          value={555}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
      </Box>

      <Stack mt='25px' width='100%' direction={{ xs: 'column', lg: 'row'}} gap={4}>
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>

      <Box
        flex={1}
        borderRadius='15px'
        padding='20px'
        bgcolor='#fcfcfc'
        display='flex'
        flexDirection='column'
        minWidth='100%'
        mt='25px'
      >
        <Typography fontSize='18px' fontWeight={600} color='#11142d'>Latest Properties</Typography>

        <Box mt={2.5} sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4
        }}>
          {
            latestProperties.map((property) => (
              <PropertyCard 
                key={property._id}
                id={property._id}
                title={property.title}
                location={property.location}
                price={property.price}
                photo={property.photo}
              />
            ))
          }
        </Box>
      </Box>
    </Box>
  )
}

export default Home