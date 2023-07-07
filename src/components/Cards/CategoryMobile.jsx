import React from 'react'
import { Image,Text, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function CategoryMobile(props) {
  const navigate = useNavigate();
  return (
    <React.Fragment>
        <Button onClick={()=>navigate(`/search/categories/${props.text}`,{state:{name:props.text}})} variant='ghost' boxSize='sm' w={{base:'110px',lg:'150px'}} h={{base:'110px',lg:'150px'}} mt={'2'} mb={'2'} shadow={'sm'} border={'1px'} borderColor={'ButtonShadow'} borderRadius={'lg'} p={'2'} style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <Image src={props.image} boxSize={{base:'80px',lg:'100px'}} objectFit='contain' pb={'2'}  />
        </Button>
        <Text fontSize={{base:'10px',lg:'12px'}} textAlign={'center'} textOverflow={'ellipsis'} pb={'2'} fontWeight={'medium'} >{props.text}</Text>
    </React.Fragment>
  )
}
