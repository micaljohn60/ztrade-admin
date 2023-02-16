import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPercent,updatePercent } from '../redux/actions/percent_actions';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import { fetchProducts } from '../redux/actions/product_actions';
import { fetchRolesAndPermissions } from 'src/redux/actions/role_and_permissions_actions';
import { fetchUserCount } from 'src/redux/actions/staff_actions';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [percentage,setPercentage] = useState(null);
  const products = useSelector((state) => state.product.length);
  const percent = useSelector((state) => state.percent.percent);
  const percentLoading = useSelector((state) => state.percent.loading);
  const [addLoading,setAddLoading] = useState(false);


  const [hasPercentEditPermission, setHasPercentEditPermission] = useState(false);
  const [haPercentListPermission, setHasPercentListPermission] = useState(false);

  const staffLoading = useSelector((state) => state.user.isLoading);
  const staff = useSelector((state) => state.user.user);
  const userLoading = useSelector((state) => state.staff.loading);
  const userCount = useSelector((state) => state.staff.count);

  const setUserPermission = (permissions) => {
    for (let i = 0; i < permissions.length; i++) {

      if (permissions[i].name == "percent-edit") {
        setHasPercentEditPermission(true)
      }
      if (permissions[i].name == "percent-list") {
        setHasPercentListPermission(true)
      }
}


    }

  


  
  const handlePercentage = () =>{
    const data = {
      "percentage" : percentage,
      "method" : "_PUT"
    }
    if(percentage === null || percentage.length <= 0){
      alert("No data in percentage input")
    }
    else{
      setAddLoading(true)
    dispatch(updatePercent(data))
    }
  }

  useEffect(()=>{
    dispatch(fetchPercent())
    dispatch(fetchProducts())
    dispatch(fetchPercent())
    dispatch(fetchRolesAndPermissions())
    
    if (!staffLoading) {
      console.log(staff.permissions)
      setUserPermission(staff.permissions)
    }
  },[staff && staff.permissions])

  return (
    <Page title="Dashboard">
      {staffLoading || userLoading?
      
    "Loading"
    :
    <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Invetory" total={products} icon={'fa-solid:store'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Users/Staffs" total={userCount.staffs} color="info" icon={'bx:user-circle'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Percentage" total={percentLoading ? '0' : percent.data.percentage} color="warning" icon={'ant-design:percentage-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Customers" total={userCount.user} color="info" icon={'mdi:user-group'} />
          </Grid>

          
        </Grid>

        {
          !hasPercentEditPermission ?
          ""
          :
          <>
          <Typography variant="h4" sx={{ mb: 5, mt:5 }} >
          Add Your Percentage
        </Typography>

        <Grid container spacing={1}>
          
          <TextField
            id="outlined-number"
            label="Enter your percentage"
            type="number"
            onChange={(e)=>setPercentage(e.target.value)}
          />
          {
            addLoading ?
            <CircularProgress/>
            :
            <Button variant="outlined" sx={{ml:2}} onClick={handlePercentage}>Add</Button>
          }
          

        </Grid>
          </>
        }
        
        
      </Container>
      }
    </Page>
  );
}
