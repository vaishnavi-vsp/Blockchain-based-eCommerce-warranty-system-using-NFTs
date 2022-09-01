import React, { useEffect } from 'react'
import { NftCard } from './nftcard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ethers } from 'ethers';
import { useState } from 'react';


export const Allnfts = ({contract,provider,account}) => {
  console.log("This is the contract from all NFTS")
  console.log(contract)
  const [purchases,setPurchases] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(async ()=>{
    var data = contract.filters.CreateNFT(null,null,account,null)
    const block = await provider.getBlockNumber()
    const results = await contract.queryFilter(data,block-1000)
    console.log("Results from allNft")
    console.log(results)
    const purchases = await Promise.all(results.map(async i => {
      // fetch arguments from each result
      i = i.args
      // get uri url from nft contract
      const id = parseInt(i['_tokenId']._hex,16)
      console.log("This is the id")
      console.log(id)
      console.log("ethers")
      console.log(ethers.utils.formatEther(i[0]))
      console.log(ethers.utils.formatEther(i[3]))
      const metaData = await contract.getNFTMetaData(id)
      const uri = await contract.tokenURI(id)
      console.log("This is the meta data")
      console.log(metaData)
      console.log(uri)

      // use uri to fetch the nft metadata stored on ipfs 
      
      // get total price of item (item price + fee)
      // const totalPrice = await co.getTotalPrice(i.itemId)
      // define listed item object
      let purchasedItem = {
        uri,
        order_at:metaData['_issueTime'],
        expires_at:metaData['_duration'],
        product:'product'
      }
      return purchasedItem
    }))
    setPurchases(purchases)
    setLoading(false)
  },[])
  return (
    
    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
      {
        loading?"Please wait loading":
        <>
        {
          purchases.map((item,index)=>{
            return <NftCard status='Active' product={item.product} start = {item.order_at} end ={item.expires_at} src={item.uri} />
          })
        }
         {/*  */}
        
        </>
       
      }
        
        
    </div>
    
  )
}
