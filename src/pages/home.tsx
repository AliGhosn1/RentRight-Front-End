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
  const [propertiesInfo, setPropertiesInfo] = useState({ numberOfProperties: 0, numberOfLocations: 0, avgPrice: 0, 
    propertyTypes: {apartments: 0, villas: 0, farmhouses: 0, condos: 0, other: 0}
  });

  const { data, isLoading, isError } = useList({
    resource: 'properties',
  })

  const { data: userData, isLoading: isUserLoading, isError: isUserError } = useList({
    resource: 'users',
  })

  useEffect(() => {
    
    if(data){
      const locations = new Set();

      const types = {apartments: 0, villas: 0, farmhouses: 0, condos: 0, other: 0}

      let totalPrice = 0;
      data.data.forEach((property) => {
        locations.add(property.location)
        totalPrice += property.price;

        switch(property.propertyType){
          case 'apartment': 
            types.apartments++;
            break;
          case 'villa': 
            types.villas++;
            break;
          case 'farmhouse': 
            types.farmhouses++;
            break;
          case 'condos': 
            types.condos++;
            break;
          default:
            types.other++;
        }
      })

      const propertyData = {
        numberOfProperties: data.data.length,
        numberOfLocations: locations.size,
        avgPrice: Math.round((totalPrice / data.data.length) * 100) / 100,
        propertyTypes: {apartments: Math.round((types.apartments / data.data.length) * 100), villas: Math.round((types.villas / data.data.length) * 100), farmhouses: Math.round((types.farmhouses / data.data.length) * 100), condos: Math.round((types.condos / data.data.length) * 100), other: Math.round((types.other / data.data.length) * 100)}
      }
      setPropertiesInfo(propertyData);
    }

  }, [data])

  let latestProperties = data?.data.slice(data.data.length-4 > 0 ? data.data.length-4 : 0, data.data.length).reverse() ?? []; 
  let users = userData?.data ?? [];

  if(isLoading || isUserLoading) return <div>Loading...</div>
  if(isError || isUserError) return <div>Error</div>

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
          title='Number of Agents'
          value={users.length}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
      </Box>

      <Stack mt='25px' width='100%' direction={{ xs: 'column', lg: 'row'}} gap={4}>
        <TotalRevenue />
        <PropertyReferrals propertyTypes={[{title: 'Apartments', percentage: propertiesInfo.propertyTypes.apartments, color: '#475be8'},
                                           {title: 'Villas', percentage: propertiesInfo.propertyTypes.villas, color: '#475be8'},
                                           {title: 'Farmhouses', percentage: propertiesInfo.propertyTypes.farmhouses, color: '#475be8'},
                                           {title: 'Condos', percentage: propertiesInfo.propertyTypes.condos, color: '#475be8'},
                                           {title: 'Others', percentage: propertiesInfo.propertyTypes.other, color: '#475be8'},
        ]}/>
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