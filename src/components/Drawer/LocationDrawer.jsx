import React, {useEffect, useState} from 'react'
import { Text,Drawer,DrawerBody,DrawerFooter,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure,Button,DrawerHeader,Grid,GridItem, Image, Box, Input, useToast} from '@chakra-ui/react'
import { apiPostPinCodeUrl } from '../../utils/url';
import LocationCard from '../Cards/LocationCard';
import { useGlobalData } from '../../context/GlobalContext';

export default function LocationDrawer() {
    const {globalData} = useGlobalData();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [pinCode,setPinCode] = useState(null);
    const [avaliableLocations,setAvaliableLocations] = useState([]);
    const toast = useToast();
    const btnLocationRef = React.useRef()
    // 
    const checkAvaliableLocations = () =>{
        setAvaliableLocations([]);
        if(pinCode){
            fetch(apiPostPinCodeUrl+`/${pinCode}`)
            .then(res=>res.json())
            .then(data=>{
                if(data[0].Status === "Success"){
                    setAvaliableLocations(data[0].PostOffice)
                    toast({
                        description:"Your location is avaliable",
                        duration:3000,
                        variant:'subtle',
                        status:'success',
                        isClosable:true
                    })
                }
            })
        }
        else{
            toast({
                description:"Please enter the PinCode to check !",
                duration:3000,
                variant:'subtle',
                status:'error',
                isClosable:true
            })
        }
    }
    const parentHandleCallback = (childData)=>{
        if(childData){
            onClose();
        }
    }
    return (
        <React.Fragment>
            <Button colorScheme='white' variant='unstyled'  ref={btnLocationRef} onClick={onOpen} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <i className="bi bi-geo-alt-fill" style={{fontSize:'1rem',marginRight:'0.5rem'}}></i>
                <span className='mobile-hide' style={{fontSize:'0.90rem',fontWeight:'initial'}}>{
                    globalData.location?(globalData.location):('Select Location')
                }</span>
                <span className='mobile-hide' style={{fontSize:'0.90rem',fontWeight:'revert',marginLeft:'8px',marginRight:'0.5rem'}}>{globalData.pincode}</span>
                <i className="bi bi-caret-down-fill" style={{fontSize:'0.8rem'}}></i>
            </Button >
            <Drawer
                isOpen={isOpen}
                placement='right'
                size={'sm'}
                onClose={onClose}
                finalFocusRef={btnLocationRef}
                className="z-index-9"
            >
                <DrawerOverlay  />
                <DrawerContent>

                    <DrawerCloseButton fontSize={'lg'} />
                    <DrawerHeader p={8}>
                        <Text fontSize={'2xl'} as={'b'} >Choose your Location</Text>
                    </DrawerHeader>

                    <DrawerBody p={8}>
                        <Text fontSize={'small'} ml={'1'} mb={'1'} color={'gray.600'} fontWeight={'light'} >Enter Pincode to check avaliablity</Text>
                        <Box w={'100%'} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                            <Input onChange={(e)=>setPinCode(e.target.value)} type='number' placeholder='Enter PinCode..' fontSize={'sm'} />
                            <Button onClick={()=>checkAvaliableLocations()} variant={'solid'} colorScheme={'teal'}>Check</Button>
                        </Box>
                        {
                            avaliableLocations.length>0?(
                                avaliableLocations.map((e,i)=>(
                                    <LocationCard parentCallBack={parentHandleCallback} name={e.Name} district={e.District} pincode={e.Pincode} state={e.State} key={i} />
                                ))
                            ):(null)
                        }
                    </DrawerBody>

                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    )
}
