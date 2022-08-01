import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import NProgress from "nprogress";
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import toast, { Toaster } from 'react-hot-toast';
import './style.css';
import "./nprogress.css";

const theme = createTheme();

export default function AddProduct() {
    const [file, setFile] = useState(); 
    const [checked, setChecked] = React.useState(false);
    const [title,setTitle] = useState('');
    const [longTitle,setlongTitle] = useState('');
    const [desc,setDesc] = useState('');
    const [mrp, setMrp] = useState('');
    const [discount, setDiscount] = useState('');
    const [tag,setTag] = useState('');
    const [cat,setCat] = useState('');
    const [ details,setDetails] = useState('');
    const [radiovalue, setradioValue] = React.useState('soulbound');

    const handleRadioChange = (event) => {
        setradioValue(event.target.value);
    };

    const handleCheckbox = (event) => {
        setChecked(event.target.checked);
    };
    
    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };
    
    const longTitleChangeHandler = (event) => {
        setlongTitle(event.target.value);
    };

    const descChangeHandler = (event) => {
        setDesc(event.target.value);
    };

    const mrpChangeHandler = (event) => {
        setMrp(event.target.value);
    };

    const discountChangeHandler = (event) => {
        setDiscount(event.target.value);
    };
    
    const TagChangeHandler = (event) => {
        setTag(event.target.value);
    };

    const catChangeHandler = (event) => {
        setCat(event.target.value);
    };

    const deatilsChangeHandler = (event) => {
        setDetails(event.target.value);
    };
    
    const handleUpload = (event) => {
        setFile(event.target.value);
    };

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        NProgress.start();
        let final_price = parseInt(mrp) - (parseInt(mrp)*((parseInt(discount)/100)))
        let send_data = {
            "shortTitle":title,
            "longTitle":longTitle,
            "description":desc,
            "mrp":mrp,
            "discount":discount,
            "tagline":tag,
            "category":cat,
            "hasWarranty":checked,
            "price":final_price,
            "cover":file,
            "created_by":"62dd2b8111c9525364586018"
        }
        if(checked){
            send_data['warranty_details'] = details;
        }else{
            send_data['warranty_details'] = null;
        }
     
        const response = await axios.post(`http://localhost:8000/product`,send_data);
        if(response.data.success){
          console.log('success');
          
          NProgress.done();
          showNotification({
            title: 'Response notification',
            message: 'Form Submitted Successfully!',
          })
          toast.success('Product Listed successfully!')
        }else{
          console.log('error');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Toaster/>
            <Container component="main" maxWidth="lg" sx={{mb: 12}}>
                <Paper variant="outlined" sx={{ my: { xs: 6, md: 12 }, p: { xs: 3, md: 4 }, margin: 'auto',align:'center'}}>
                    <Typography component="h4" variant="h6" align="center" margin='10px'>
                        List a New Product
                    </Typography>
                    <div className="list_in_row">
                    <div className="list_in_column">
                        <TextField id="filled-basic" required label="Title" variant="filled" className="textInput" onChange={titleChangeHandler}/>
                        <TextField id="filled-basic" required label="Describe Title" variant="filled" className="textInput" onChange={longTitleChangeHandler}/>
                    </div>
                    <div className="list_in_column">
                        <TextField
                            label="MRP Amount"
                            required
                            id="outlined-start-adornment"
                            sx={{ m: 1}}
                            className="textInput"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            }}
                            onChange={mrpChangeHandler}
                        />
                        <TextField
                            label="Discount"
                            required
                            id="outlined-start-adornment"
                            sx={{ m: 1}}
                            className="textInput"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                            onChange={discountChangeHandler}
                        />
                    </div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        required
                        multiline
                        rows={3}
                        defaultValue="Description"
                        className="textInput"
                        style = {{width: '60%'}}
                        onChange = {descChangeHandler}
                    />
                    <TextField id="outlined-basic" label="Tagline" variant="outlined" className="textInput" onChange={TagChangeHandler}/>
                    <div className="textInput">
                    <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Categories"
                        defaultValue={'DayDeals'}
                        onChange= {catChangeHandler}
                        required
                    >
                        <MenuItem value={'DayDeals'}>Deals of the Day</MenuItem>
                        <MenuItem value={'FlashDeals'}>Flash Deals</MenuItem>
                        <MenuItem value={'Discounts'}>On Discounts</MenuItem>
                    </Select>
                    </div>
                    <FormControlLabel control={<Checkbox checked={checked} onChange={handleCheckbox}/>} label="Product has warranty" className="textInput"/>
                    {checked?
                    <div> 
                        <TextField id="filled-basic" required label="Warranty Details URL" variant="filled" className="textInput" onChange={deatilsChangeHandler}></TextField>
                        <FormControl className="textInput">
                        <FormLabel id="demo-row-radio-buttons-group-label">Type of Warranty</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={radiovalue}
                            onChange={handleRadioChange}
                            width={100}
                        >
                            <FormControlLabel value="soulbound" control={<Radio />} label="Soulbound" />
                            <FormControlLabel value="transferable" control={<Radio />} label="Transferable" />
                            
                        </RadioGroup>
                        </FormControl>
                        {radiovalue=="soulbound" ?<>
                        <TextField id="filled-basic" disabled label="Number of Transfer" variant="filled" className="textInput" defaultValue="0"></TextField>
                        </>:<>
                        <TextField id="filled-basic" required label="Number of Transfer" variant="filled" className="textInput" defaultValue="0"></TextField>
                        </>}
                        </div>
                        :
                        <></>
                    }
                    
                    <br />
                    <div className="file_upload textInput">
                        <img src={file} />
                        <TextField id="outlined-basic" label="Image URL" variant="outlined" onChange={handleUpload}/>
                    </div>
                    </div>
                    <Stack direction="row" spacing={2} style={{marginTop:'20px',justifyContent:'center'}}>
                        <Button variant="contained" startIcon={<SendIcon />} onClick={formSubmitHandler}>
                            Submit
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
