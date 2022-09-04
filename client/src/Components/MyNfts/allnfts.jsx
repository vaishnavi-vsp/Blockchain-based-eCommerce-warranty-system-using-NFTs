import React, { useEffect } from 'react'
import { NftCard } from './nftcard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ethers } from 'ethers';
import { useState } from 'react';
import { Box } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import axios from 'axios';


export const Allnfts = ({contract,provider,account}) => {
  console.log("This is the contract from all NFTS")
  console.log(contract)
  const [purchases,setPurchases] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(async ()=>{
    var data = contract.filters.CreateNFT(null,null,account,null)
    var transfered = contract.filters.Transfer(account,null,null)
    
    const block = await provider.getBlockNumber()
    const results = await contract.queryFilter(data,block-1000)
    const results2 = await contract.queryFilter(transfered,block-1000)
    console.log("these are the transfered NFTS")
    console.log(results2)
    console.log("Results from allNft")
    console.log(results)
    const ids = await Promise.all(results2.map(async i=>{
      i=i.args
      const id = parseInt(i['tokenId']._hex,16)
      return id
    }))
    const purchases = await Promise.all(results.map(async i => {
      // fetch arguments from each result
      i = i.args
      console.log(i)
      // get uri url from nft contract
      const id = parseInt(i['_tokenId']._hex,16)
      console.log("This is the id")
      console.log(id)
      console.log("ethers")
      console.log(ethers.utils.formatEther(i[0]))
      console.log(ethers.utils.formatEther(i[3]))
      const metaData = await contract.getNFTMetaData(id)
      const uri = i['_tokenURI']
      console.log("This is the meta data")
      console.log(metaData)
      console.log(uri)
      var flag = true
      for(var j=0;j<ids.length;j++){
        if(ids[j]==id){
          flag = false
        }
      }
      console.log("This is the data finally")
      console.log(i['_tokenURI'])
      console.log(i['duration'])
      if(flag){
        let purchasedItem = {
          uri,
          order_at:i.issue_time,
          expires_at:i.duration,
          product:i.name
        }
        return purchasedItem
      }
      
    }))
    var received = contract.filters.Transfer(null,account,null)
    const results3 = await contract.queryFilter(received,block-1000)
    console.log("this is the result of nfts sent to me")
    console.log(results3)
    const receivedIds = await Promise.all(results3.map(async i=>{
      i=i.args
      if(i['from']!='0x0000000000000000000000000000000000000000'){
        const id = parseInt(i['tokenId']._hex,16)
        return id
      }
      
    }))
    console.log(receivedIds)
    for(var j=0;j<receivedIds.length;j++){
      
      if(receivedIds[j]){
        console.log(receivedIds[j],j)
        const response = await axios.get(
          `http://localhost:8000/order/token/${receivedIds[j]-1}`
        );
        
        let order = response['data']['order']
        let product = response['data']['product']
        let purchasedItem = {
          uri:order['nft_image'] ,
          order_at:order['ordered_at'].split("T")[0] +" "+ order['ordered_at'].split("T")[1].substring(0,5),
          expires_at:order['warranty_period'].split("T")[0] +" "+ order['warranty_period'].split("T")[1].substring(0,5),
          product:product['shortTitle']
        }
        purchases.push(purchasedItem)
      }
      
    }
    
    // console.log("this is the response")
    // console.log(response)
    
    console.log("These are the purchases")
    console.log(purchases)
    setPurchases(purchases)
    setLoading(false)
  },[])
  return (
    
    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
      {
        loading?
        <Box sx={{ display: 'flex' }} style={{margin:'80px',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
        <CircularProgress />
        <Typography component="h4" variant="h6" align="center" margin='10px'>Connecting to MetaMask</Typography>
        </Box>
        :
        <>
        {
          purchases.map((item,index)=>{
            if(item){
              return <NftCard status='Active' product={item.product} start = {item.order_at} end ={item.expires_at} src={item.uri} />
            }
          })
        }
         {/*  */}
        
        </>
       
      }
    </div>
    
  )
}
