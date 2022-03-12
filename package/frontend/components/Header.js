import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import {Box,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,Button,Input} from '@chakra-ui/react'
import { HamburgerIcon,AddIcon,ExternalLinkIcon, RepeatIcon,EditIcon ,ChevronDownIcon } from '@chakra-ui/icons' 
import Link from 'next/link'
import styles from'./Header.module.css'
import {abi} from '../../contract/abi.json'
import React from 'react'

const contractAddress ='0x6271aeBBb875E0667A34c776eFe76A7B5F0C1F3E'
let connectingAccounts,web3 

const enable = async () => {
  const provider = await detectEthereumProvider({ mustBeMetaMask: true });
  if (provider && window.ethereum?.isMetaMask) {
    console.log('connect to wallet');
    await window.ethereum.enable();
    web3 = new Web3(Web3.givenProvider);
    web3.eth.defaultChain = "Shibuya";
    //env 設定
    //console.log(process.env.KOLCONTRACTADDRESS)
    connectingAccounts = await web3.eth.requestAccounts();
    console.log(connectingAccounts)
  } else {
    alert('Please Install MetaMask🙇‍♂️')
  }
}

const mintNFT = async() => {
  if(connectingAccounts){
    const contract =  new web3.eth.Contract(abi,contractAddress);
    contract.methods.safeMint(connectingAccounts[0]).send({from: connectingAccounts[0]}, function(err,res){
    if(res){
      console.log(`res ${res} `)
      console.log(res)
    }else{
        console.log(`err ${err}`)
      }
    })
  }else{
    alert('Please Conect Wallet🙇‍♂️')
  }
}

export default function Header(){
  return( 
  <>
    <Accordion allowToggle>
      <AccordionItem bg="#2D3748">
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          <Link href='/'>
            <a className={styles.title}>KOL</a>
          </Link>
        </Box>
        <Box flex='1' textAlign='right' >
          {connectingAccounts && <p>GoodMorning</p>}
        </Box>
        <Button colorScheme='#ffffff' variant='outline' borderColor='#ffffff'  >
          <HamburgerIcon color='#ffffff'  />
        </Button>
      </AccordionButton>
      <AccordionPanel pb={4} >
        <Box textAlign='center'>
        <Link href=''>
          <Button className={styles.login} color='white' variant='outline' borderColor='white' width='90%' onClick={enable} > 
            Connect Wallet
          </Button>
        </Link>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
  <br></br>
  <Box textAlign='center'>
    <h2>Contract Address:{contractAddress}</h2>
    <br></br>
    <Button bg='blue' color='white' textAlign='center' width='60%' onClick={mintNFT}>
      Mint NFT
    </Button>
  </Box>
</>
)}
