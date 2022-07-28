import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { textAlign } from "@mui/system";

export default function AllProducts() {
    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: '40px' }}><h1>All Products</h1></div>

            <div className="productsDiv" style={{ display: "flex" }}>

                <Card sx={{ maxWidth: 345, marginRight: '30px' }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image=""
                        alt="NFT 1"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            NFT 1
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="big">Learn More</Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345, marginRight: '30px' }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image=""
                        alt="NFT 2"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            NFT 2
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="big">Learn More</Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345, marginRight: '30px' }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image=""
                        alt="NFT 3"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            NFT 3
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="big">Learn More</Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345, marginRight: '30px' }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image=""
                        alt="NFT 4"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            NFT 4
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="big">Learn More</Button>
                    </CardActions>
                </Card>




            </div></div>


    );
}

