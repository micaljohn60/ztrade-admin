import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, login, userCleanUp } from '../../../redux/actions/user_actions';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },

  } = methods;

  const onSubmit = async () => {
    navigate('/', { replace: true });
    setLoading(false)
  };

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const state = useSelector((state) => state.user.state);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const loginUser = () => {
    setLoading(true)
    const data = { 'email': email, 'password': values.password }
    dispatch(login(data))    
    
  }

  const isError = useSelector((state) => state.user.error);
  
  const message = useSelector((state) => state.user.errorMessage);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if(isError){
      setOpen(true)
      setLoading(false)
    
  }
  if(state === 'yay'){
    setLoading(true)
    dispatch(loadUser())
    navigate('/dashboard/app', { replace: true });
    setLoading(false)
  }
  return()=>{
    setTimeout(() => {            
        dispatch(userCleanUp())
        setLoading(false)
    }, 1000);
  }


  }
    , [isError,state])


    return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Collapse in={open}>
          <Alert
            severity='warning'
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                x
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {message.message}
          </Alert>
        </Collapse>
        <Stack spacing={3}>

          <TextField
            required
            id="outlined-required"
            label="Email"
            onChange={e => { setEmail(e.target.value) }}
          />

          <FormControl sx={{ m: 1,  }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}

                    edge="end"
                  >
                    {values.showPassword ? <Icon icon="ic:baseline-remove-red-eye" width={28} height={28} /> :  <Icon icon="mdi:eye-off" width={28} height={28} />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Stack>

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <RHFCheckbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack> */}

        <LoadingButton fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained" onClick={loginUser} loading={isSubmitting}>
         {loading ? "Loading" : "Login"}
        </LoadingButton>
      </FormProvider>
    );
  


}
