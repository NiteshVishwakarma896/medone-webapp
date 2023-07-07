import React from 'react'
import { IconButton,Drawer,DrawerBody,DrawerFooter,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure} from '@chakra-ui/react'
import { List } from "react-bootstrap-icons";

export default function NavigationDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    return (
        <React.Fragment>
            <IconButton ref={btnRef} onClick={onOpen} className='desktop-hide' aria-label='Menu' color={'black'} icon={<List />} />
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay  />
                <DrawerContent>
                    <DrawerCloseButton />

                    <DrawerBody>
                    
                    </DrawerBody>

                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    )
}
