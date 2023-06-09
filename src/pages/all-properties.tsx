import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { useMemo } from "react";
import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";
import { Box, Typography, Stack, TextField, Select, MenuItem, Menu } from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";

import { PropertyCard, CustomButton } from "components";

const AllProperties = () => {
  const navigate = useNavigate();
  const { tableQueryResult: { data, isLoading, isError }, current, 
          setCurrent, setPageSize, pageCount, sorter, setSorter, 
          filters, setFilters } = useTable();

  const allProperties = data?.data ?? [];

  const currentPrice = sorter.find((item) => item.field === 'price')?.order;

  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc' }]);
  }

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => ('field' in item ? item : []));

    return{
      title: logicalFilters.find((item) => item.field === 'title')?.value || '',
      propertyType: logicalFilters.find((item) => item.field === 'propertyType')?.value || '',
    }
  }, [filters])

  if(isLoading) return <Typography>Is loading...</Typography>
  if(isError) return <Typography>Error...</Typography>

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
                {allProperties.length ? 'All Properties' : 'There are no properties'}
              </Typography>
              <CustomButton title="Add Property" handleClick={() => navigate('/properties/create')} backgroundColor='#475be8' color='#fcfcfc' icon={<Add />} />
            </Stack>
            <Box mb={2} mt={3} display='flex' width='84%' justifyContent='center' alignItems='center' flexWrap='wrap' margin='20px auto 0 auto'>
              <Box display='flex' gap={2} flexWrap='wrap' mb={{xs: '20px', sm: 0}}> 
                <Box display={{xs:'none', sm: 'inline-block'}}>
                  <CustomButton 
                    title={`Sort Price ${ currentPrice === 'asc' ? '↑' : '↓'}`}
                    color='#fcfcfc'
                    backgroundColor="#475be8"
                    handleClick={ () => toggleSort('price') }
                  />
                </Box>
                <TextField variant="outlined" color='info' placeholder="Search by title" value={ currentFilterValues.title } 
                  onChange={(e) => {
                    setFilters([
                      {
                        field: 'title',
                        operator: 'contains',
                        value: e.currentTarget.value ? e.currentTarget.value : undefined
                      }
                    ])
                  }}
                />
                <Select variant="outlined" color="info" displayEmpty required inputProps={{'aria-label': 'Without label'}} defaultValue='' value={ currentFilterValues.propertyType } 
                  onChange={(e) => {
                    setFilters([
                      {
                        field: 'propertyType',
                        operator: 'eq',
                        value: e.target.value
                      }
                    ], 'replace')
                  }}>
                  <MenuItem value=''>All</MenuItem>
                  {
                    ['Apartment', 'Villa', 'Farmhouse', 'Condos', 'Townhouse', 'Duplex', 'Studio', 'Chalet'].map((type) => (
                      <MenuItem key={type} value={ type.toLowerCase() }>{ type }</MenuItem>
                    ))
                  }
                </Select>
              </Box>
            </Box>
          </Stack>

        </Box>

        <Box mt='20px' sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3
        }}>
          {
            allProperties.map((property) => (
              <PropertyCard 
                key={property._id}
                id={property._id}
                title={property.title}
                price={property.price}
                location={property.location}
                photo={property.photo}
              /> 
            ))
          }
        </Box>

        {allProperties.length > 0 &&
        <Box>
          <Box display='flex' gap={2} mt={3} flexWrap='wrap' color='#11142d' justifyContent='center'>
            <CustomButton title="Previous" handleClick={() => setCurrent(prev => prev-1)} backgroundColor="#475be8" color="#fcfcfc" disabled={!(current > 1)} />
            <Box 
              display={{xs: 'none', sm:'flex'}}
              alignItems='center'
              gap='5px'
            >
              Page{` `}<strong>{ current } of { pageCount }</strong>
            </Box>
            <CustomButton title="Next" handleClick={() => setCurrent(prev => prev+1)} backgroundColor="#475be8" color="#fcfcfc" disabled={(current === pageCount)} />
          </Box>
          <Box margin='10px auto 0' width='fit-content'>
            <Select variant="outlined" color="info" displayEmpty required inputProps={{'aria-label': 'Without label'}} defaultValue={10} onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)}>
              {
                [10, 20, 30, 40, 50].map((size) => <MenuItem key={size} value={size}>Show { size }</MenuItem>)
              }
            </Select>
          </Box>
        </Box>
        }
      </Box>
    </ThemeProvider>
  )
}

export default AllProperties