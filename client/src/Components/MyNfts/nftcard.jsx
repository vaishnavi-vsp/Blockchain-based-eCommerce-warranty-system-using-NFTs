import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './nftcss.css'


export const NftCard = ({product,start,end,status,src}) => {
  return (
    <Card className='nohover'  style={{ width: '18rem' , display:'block',marginTop:'5rem',textAlign:'center',pointerEvents:'none'}}>
        
      <Card.Img style={{width:'10rem',borderRadius:'10px',marginBottom:"5px",textAlign: "center" }} variant="top" src={src} />
      <Card.Body>
        <Card.Title style={{fontWeight:'bold',fontSize:'1rem'}}> {product} </Card.Title>
        <hr className='style-six' />
        <Card.Text style={{textAlign:'left'}}>
            <p className='text-para'><strong>Order at: </strong>{start}</p>
            <p className='text-para'><strong>Expires at: </strong> {end}</p>
            <p className='text-para'><strong>Status: </strong> {status}</p>
           
          
        </Card.Text>
        <Button style={{marginTop:'8%',pointerEvents:'all' ,cursor:'pointer'}}  variant="primary">View warranty</Button>
      </Card.Body>
    </Card>
  )
}
