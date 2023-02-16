import { Grid, Paper, Box, Button, Typography, TextField, CardMedia } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSiteSetting, updateSiteSetting } from "src/redux/actions/site_setting_action";
import Iconify from "src/components/Iconify";
import Loading from "src/share/Loading/Loading";

const Input = styled('input')({
    display: 'none',
});

export default function SiteSetting() {
    const dispatch = useDispatch();
    const [mobileLoginIcon, change1] = useState(null);
    const [webLoginicon, change2] = useState(null);
    const [mobileLoadingIcon, change3] = useState(null);
    const [webRegiserIcon, change4] = useState(null);
    const [webIcon, change5] = useState(null);
    const [webTabIcon, change6] = useState(null);
    const [facebookUrl, setFacebookUrl] = useState(null);
    const [instagramUrl, setInstagramUrl] = useState(null);
    const [youtubeUrl, setYoutubeUrl] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [address, setAddress] = useState(null);
    const [short_description, setShortDescription] = useState(null);
    const [email, setEmail] = useState(null);

    const updateData = () => {
        const formData = new FormData();
        formData.append("mobile_login_icon", mobileLoginIcon);
        formData.append("web_login_icon", webLoginicon);
        formData.append("mobile_loading_icon", mobileLoadingIcon);
        formData.append("web_register_icon", webRegiserIcon);
        formData.append("web_icon", webIcon);
        formData.append("web_tab_icon", webTabIcon);
        formData.append("facebook_url", facebookUrl);
        formData.append("instagram_url", instagramUrl);
        formData.append("youtube_url", youtubeUrl);
        formData.append("phonenumber", phoneNumber);
        formData.append("address", address);
        formData.append("short_description", short_description);
        formData.append("email", email);
        console.log(facebookUrl)
        dispatch(updateSiteSetting(formData))
    }
    const urls = [
        "https://appstaging.ztrademm.com/storage/site_setting/mobile_login_icon.jpg",
        "https://appstaging.ztrademm.com/storage/site_setting/web_login_icon.jpg",
        "https://appstaging.ztrademm.com/storage/site_setting/mobile_loading_icon.jpg",
        "https://appstaging.ztrademm.com/storage/site_setting/web_register_icon.jpg",
        "https://appstaging.ztrademm.com/storage/site_setting/web_tab_icon.jpg"
    ]
    const names = ["mobile_login_icon", "web_login_icon", "mobile_loading_icon", "web_register_icon", "web_tab_icon"]

    const siteSettingLoading = useSelector((state) => state.siteSetting.loading);
    const siteSettingData = useSelector((state) => state.siteSetting.site_setting);

    useEffect(() => {
        dispatch(fetchSiteSetting())
    }, [])

    return (
        <>
            {
                siteSettingLoading ?
                    <Loading />
                    :
                    <div className="">
                        <div className="">
                            <h1>Icons</h1>
                            <Button
                                variant="contained"
                                onClick={updateData}
                                startIcon={<Iconify icon="eva:plus-fill" />}
                            >
                                Confirm
                            </Button>


                            <Grid container spacing={2}>
                                <Grid item>
                                    <Grid container justifyContent="center" spacing={3}>
                                        {[0, 1, 2, 3, 4].map((value) => (
                                            <Grid key={value} item>
                                                <Box sx={{ boxShadow: 1 }}>
                                                    <Paper
                                                        sx={{
                                                            height: 300,
                                                            width: 180,
                                                            backgroundColor:
                                                                '#fff',
                                                        }}
                                                    >
                                                        <Box display="flex"
                                                            justifyContent="end"
                                                            flexDirection="column"
                                                            alignSelf="center"
                                                            alignItems="center"

                                                            sx={{ mt: 2, height: 250 }}
                                                        >

                                                            <CardMedia
                                                                component="img"
                                                                sx={{ width: 100,mb:2 }}
                                                                image={urls[value]}
                                                                alt="category_image"
                                                            />
                                                            
                                                            
                                                            


                                                            <Box sx={{ boxShadow: 0 }}>
                                                                <label htmlFor={"contained-button-file"+value}>
                                                                    <Input accept="image/jpeg" id={"contained-button-file"+value} type="file"

                                                                        onChange={
                                                                            value == 0 ?
                                                                                (e) => change1(e.target.files[0])
                                                                                :
                                                                                value == 1 ?
                                                                                    (e) => change2(e.target.files[0])
                                                                                    :
                                                                                    value == 2 ?
                                                                                        (e) => change3(e.target.files[0])
                                                                                        :
                                                                                        value == 3 ?
                                                                                            (e) => change4(e.target.files[0])
                                                                                            :
                                                                                            value == 4 ?
                                                                                                (e) => change5(e.target.files[0])
                                                                                                :
                                                                                                (e) => change6(e.target.files[0])
                                                                        }

                                                                    />
                                                                    <Button variant="contained" component="span" sx={{ boxShadow: 'none' }}>
                                                                        <Icon icon="carbon:add-filled" />
                                                                    </Button>



                                                                </label>
                                                            </Box>

                                                            <Box >
                                                                <Typography variant="body1" gutterBottom>
                                                                    {names[value]}

                                                                </Typography>
                                                                <Typography variant="body2" gutterBottom>
                                                                    (JPG only)                                                                    
                                                                </Typography>
                                                            </Box>

                                                            <CardMedia
                                                                component="img"
                                                                sx={{ width: 100 }}
                                                                image={
                                                                    value == 0 ?
                                                                        mobileLoginIcon && URL.createObjectURL(mobileLoginIcon)
                                                                        :
                                                                        value == 1 ?
                                                                            webLoginicon && URL.createObjectURL(webLoginicon)
                                                                            :
                                                                            value == 2 ?
                                                                                mobileLoadingIcon && URL.createObjectURL(mobileLoadingIcon)
                                                                                :
                                                                                value == 3 ?
                                                                                    webRegiserIcon && URL.createObjectURL(webRegiserIcon)
                                                                                    :
                                                                                    value == 4 ?
                                                                                        webIcon && URL.createObjectURL(webIcon)
                                                                                        :
                                                                                        webTabIcon && URL.createObjectURL(webTabIcon)


                                                                }
                                                                alt=""
                                                            />


                                                        </Box>


                                                    </Paper>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Typography variant="h3" sx={{ mt: 4 }}>Social Medias</Typography>

                            <Box display="flex" flexDirection="row">
                                <TextField id="outlined-basic" defaultValue={siteSettingData[0].facebook_url} label="Facebook Url" onChange={(e) => setFacebookUrl
                                    (e.target.value)} variant="outlined" sx={{ width: "500px", m: 1 }} />
                                <TextField id="outlined-basic" defaultValue={siteSettingData[0].instagram_url} label="Instagram Url" onChange={(e) => setInstagramUrl
                                    (e.target.value)} variant="outlined" sx={{ width: "500px", m: 1 }} />
                            </Box>
                            <Box display="flex" flexDirection="row">
                                <TextField id="outlined-basic" defaultValue={siteSettingData[0].youtube_url} label="Youtube Url" onChange={(e) => setYoutubeUrl(e.target.value)} variant="outlined" sx={{ width: "500px", m: 1 }} />
                                <TextField id="outlined-basic" label="Linkedin Url" variant="outlined" sx={{ width: "500px", m: 1 }} />
                            </Box>

                            <Typography variant="h3" sx={{ mt: 4 }}>Compnay Information</Typography>

                            <Box display="flex" flexDirection="row">
                                <TextField id="outlined-basic" label="Phone Number" defaultValue={siteSettingData[0].phonenumber} onChange={(e) => setPhoneNumber
                                    (e.target.value)} variant="outlined" sx={{ width: "500px", m: 1 }} />
                                <TextField id="outlined-basic" label="Address" defaultValue={siteSettingData[0].address} onChange={(e) => setAddress(e.target.value)} variant="outlined" sx={{ width: "500px", m: 1 }} />
                            </Box>
                            <Box display="flex" flexDirection="row">
                                <TextField id="outlined-basic" label="Short Description" defaultValue={siteSettingData[0].short_description} onChange={(e) => setShortDescription(e.target.value)} variant="outlined" sx={{ width: "500px", m: 1 }} />
                                <TextField id="outlined-basic" label="Email" variant="outlined" defaultValue={siteSettingData[0].email} onChange={(e) => setEmail(e.target.value)} sx={{ width: "500px", m: 1 }} />
                            </Box>



                        </div>
                    </div>
            }
        </>
    )
}