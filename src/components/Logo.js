import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, CardMedia } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // const logo = <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />

  const logo = (
    <Box sx={{ width: 100, height: 100,ml:10 }}
      display="flex"
      alignItems="center"
      justifyContent="center" >
        <CardMedia
        component="img"
        sx={{ width: 300}}
        image='https://appstaging.ztrademm.com/storage/site_setting/web_register_icon.jpg'
        />
        {/* <svg width="40" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" fill="white"/>
          <path d="M20 1L26.5674 5.14286L34 8.25L33.1348 15.5L34 22.75L26.5674 25.8571L20 30L13.4327 25.8571L6 22.75L6.86532 15.5L6 8.25L13.4327 5.14286L20 1Z" fill="#1B458D"/>
          <mask id="path-3-inside-1_31_11" fill="white">
          <ellipse cx="20" cy="15.5" rx="13" ry="12.5"/>
          </mask>
          <ellipse cx="20" cy="15.5" rx="13" ry="12.5" fill="#D9D9D9"/>
          <path d="M13 15.5C13 10.6258 16.8806 8 20 8V48C37.4788 48 53 34.1813 53 15.5H13ZM20 8C23.1194 8 27 10.6258 27 15.5H-13C-13 34.1813 2.52117 48 20 48V8ZM27 15.5C27 20.3742 23.1194 23 20 23V-17C2.52117 -17 -13 -3.18132 -13 15.5H27ZM20 23C16.8806 23 13 20.3742 13 15.5H53C53 -3.18132 37.4788 -17 20 -17V23Z" fill="white" mask="url(#path-3-inside-1_31_11)"/>
          <ellipse cx="20" cy="15.5" rx="8" ry="7.5" fill="#1B458D"/>
          <path d="M9.334 39.077C8.608 39.077 7.94067 38.9083 7.332 38.571C6.73067 38.2337 6.25033 37.7643 5.891 37.163C5.539 36.5543 5.363 35.8723 5.363 35.117C5.363 34.3617 5.539 33.6833 5.891 33.082C6.25033 32.4807 6.73067 32.0113 7.332 31.674C7.94067 31.3367 8.608 31.168 9.334 31.168C10.06 31.168 10.7237 31.3367 11.325 31.674C11.9337 32.0113 12.4103 32.4807 12.755 33.082C13.107 33.6833 13.283 34.3617 13.283 35.117C13.283 35.8723 13.107 36.5543 12.755 37.163C12.403 37.7643 11.9263 38.2337 11.325 38.571C10.7237 38.9083 10.06 39.077 9.334 39.077ZM9.334 37.361C9.95 37.361 10.4413 37.1557 10.808 36.745C11.182 36.3343 11.369 35.7917 11.369 35.117C11.369 34.435 11.182 33.8923 10.808 33.489C10.4413 33.0783 9.95 32.873 9.334 32.873C8.71067 32.873 8.212 33.0747 7.838 33.478C7.47133 33.8813 7.288 34.4277 7.288 35.117C7.288 35.799 7.47133 36.3453 7.838 36.756C8.212 37.1593 8.71067 37.361 9.334 37.361ZM23.0745 31.278V39H21.1935V34.369L19.4665 39H17.9485L16.2105 34.358V39H14.3295V31.278H16.5515L18.7185 36.624L20.8635 31.278H23.0745ZM31.3351 39H29.4541L26.3081 34.237V39H24.4271V31.278H26.3081L29.4541 36.063V31.278H31.3351V39ZM33.6446 32.224C33.3146 32.224 33.0433 32.1287 32.8306 31.938C32.6253 31.74 32.5226 31.498 32.5226 31.212C32.5226 30.9187 32.6253 30.6767 32.8306 30.486C33.0433 30.288 33.3146 30.189 33.6446 30.189C33.9673 30.189 34.2313 30.288 34.4366 30.486C34.6493 30.6767 34.7556 30.9187 34.7556 31.212C34.7556 31.498 34.6493 31.74 34.4366 31.938C34.2313 32.1287 33.9673 32.224 33.6446 32.224ZM34.5796 32.862V39H32.6986V32.862H34.5796Z" fill="#1B458D"/>
        </svg> */}
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
