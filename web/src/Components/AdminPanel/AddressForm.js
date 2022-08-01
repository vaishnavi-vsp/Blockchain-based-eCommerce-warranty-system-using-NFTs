import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from 'react-bootstrap';

export default function AddressForm() {
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="assetName"
                        name="assetName"
                        label="Asset Name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="assetPrice"
                        name="assetPrice"
                        label="Asset Price in Matic"
                        fullWidth
                        autoComplete="asset price in matic"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="desc"
                        name="desc"
                        label="Asset Description"
                        fullWidth
                        autoComplete="asset description"
                        variant="standard"
                    />
                </Grid>
                <Grid>
                    <input
                        id="btn-upload"
                        name="btn-upload"
                        style={{ display: 'none' }}
                        type="file"
                        accept="image/*"
                        onChange={''} />
                    <Button
                        className="btn-choose"
                        variant="outlined"
                        component="span" >
                        Choose Image
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}