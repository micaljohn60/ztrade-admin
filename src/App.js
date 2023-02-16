// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/user_actions';
import { fetchUserCount } from './redux/actions/staff_actions';

// ----------------------------------------------------------------------

export default function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadUser())
    dispatch(fetchUserCount())
  },[])

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
