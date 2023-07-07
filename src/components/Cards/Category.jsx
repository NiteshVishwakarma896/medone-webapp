import React from 'react'
import { Image,Text, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function Category(props) {
  const navigate = useNavigate();
  return (
    <Button onClick={()=>navigate(`/search/categories/${props.text}`,{state:{name:props.text}})} variant='ghost' boxSize='sm' w={'160px'} h={'fit-content'} mt={'2'} mb={'2'} shadow={'sm'} border={'1px'} borderColor={'ButtonShadow'} borderRadius={'lg'} p={'2'} style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Image src={props.image} boxSize='120px' objectFit='contain'  />
        <Text fontSize='12px' noOfLines={1} pb={'2'} fontWeight={'medium'} >{props.text}</Text>
    </Button>
  )
}
