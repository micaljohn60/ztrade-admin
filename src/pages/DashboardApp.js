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

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [percentage,setPercentage] = useState(null);
  const products = useSelector((state) => state.product.products);
  const percent = useSelector((state) => state.percent.percent);
  const percentLoading = useSelector((state) => state.percent.loading);
  const [addLoading,setAddLoading] = useState(false);

  
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
  },[])

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Invetory" total={products.length} icon={'fa-solid:store'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Users" total={10} color="info" icon={'bx:user-circle'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Percentage" total={percentLoading ? '0' : percent.data.percentage} color="warning" icon={'ant-design:percentage-outlined'} />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

          
        </Grid>
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
        
      </Container>
    </Page>
  );
}
