import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './nftcss.css'
import { Link } from "react-router-dom";

export const NftCard = ({product,start,end,status,src,id}) => {
  return (
    <Card className='nohover'  style={{ width: '18rem' , display:'block',marginTop:'5rem',textAlign:'center',pointerEvents:'none'}}>
      <div style={{height:'10rem'}}>
        <Card.Img style={{width:'10rem',borderRadius:'10px',marginBottom:"5px",textAlign: "center" }} variant="top" src={src} />
      </div>
      <Card.Body>
        <div style={{height:"3rem"}}>
        <Card.Title style={{fontWeight:'bold',fontSize:'1rem'}}> {product} </Card.Title>
        </div>
        
        <hr className='style-six' />
        <Card.Text style={{textAlign:'left'}}>
            <p className='text-para'><strong>Order at: </strong>{start}</p>
            <p className='text-para'><strong>Expires at: </strong> {end}</p>
            <p className='text-para'><strong>Status: </strong> {status}</p>
           
          
        </Card.Text>
        <Link to={`/warranty/${id}`}> <Button style={{marginTop:'8%',pointerEvents:'all' ,cursor:'pointer'}}  variant="primary">View warranty</Button></Link>
      </Card.Body>
    </Card>
  )
}
