import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import {Box,Accordion,AccordionItem,AccordionButton,AccordionPanel,AccordionIcon,Button,Input} from '@chakra-ui/react'
import { HamburgerIcon,AddIcon,ExternalLinkIcon, RepeatIcon,EditIcon ,ChevronDownIcon } from '@chakra-ui/icons' 
import Link from 'next/link'
import styles from'./Header.module.css'

const enable = async () => {
  const provider = await detectEthereumProvider({ mustBeMetaMask: true });
  if (provider && window.ethereum?.isMetaMask) {
    alert('Welcome to MetaMask User🎉');
    await window.ethereum.enable();
    web3 = new Web3(Web3.givenProvider);
    web3.eth.defaultChain = "Shibuya";
    const accounts = await web3.eth.requestAccounts();
    console.log(accounts)
  } else {
    console.log('Please Install MetaMask🙇‍♂️')
  }
}


export default function Header(){
  return( 
  <>
    <Accordion allowToggle>
      <AccordionItem bg="#17a2b8">
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          <Link href='/'>
            <a className={styles.title}>EUW</a>
          </Link>
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
        <br></br>
        <label className={styles.label}>
          <Input className='input-File' color='white' type="file" height='30px' width='100%' borderColor='white' />
          画像を選択
        </label>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
</>
)}