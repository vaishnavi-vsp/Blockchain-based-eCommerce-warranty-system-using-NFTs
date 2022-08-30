import React from 'react'
import { NftCard } from './nftcard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Allnfts = () => {
  return (
    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
        <NftCard status='Active' product='product 1' start = '10-12-2022 12:30' end = '11-12-2022 13:30' src="https://images.wsj.net/im-491398?width=700&height=699" />
        <NftCard status='Active' product='product 2' start = '10-12-2022 12:30' end = '11-12-2022 13:30' src="https://images.wsj.net/im-491398?width=700&height=699" />
        <NftCard status='Active' product='product 3' start = '10-12-2022 12:30' end = '11-12-2022 13:30' src="https://images.wsj.net/im-491398?width=700&height=699" />
        <NftCard status='Active' product='product 4' start = '10-12-2022 12:30' end = '11-12-2022 13:30' src="https://images.wsj.net/im-491398?width=700&height=699" />
        <NftCard status='Active' product='product 5' start = '10-12-2022 12:30' end = '11-12-2022 13:30' src="https://images.wsj.net/im-491398?width=700&height=699" />
        <NftCard status='Active' product='product 6' start = '10-12-2022 12:30' end = '11-12-2022 13:30' src="https://images.wsj.net/im-491398?width=700&height=699" />
        <NftCard status='Active' product='product 7' start = '10-12-2022 12:30' end = '11-12-2022 13:30' src="https://images.wsj.net/im-491398?width=700&height=699" />
        
    </div>
    
  )
}
