import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, TextField, Button } from '@mui/material';
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

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [percentage,setPercentage] = useState(null);

  const handlePercentage = () =>{
    const data = {
      "percentage" : percentage,
      "method" : "_PUT"
    }
    dispatch(updatePercent(data))
  }

  useEffect(()=>{
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
            <AppWidgetSummary title="Invetory" total={10000} icon={'fa-solid:store'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Users" total={10} color="info" icon={'bx:user-circle'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Percentage" total={3} color="warning" icon={'ant-design:percentage-outlined'} />
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

          <Button variant="outlined" sx={{ml:2}} onClick={handlePercentage}>Add</Button>

        </Grid>
        
      </Container>
    </Page>
  );
}
