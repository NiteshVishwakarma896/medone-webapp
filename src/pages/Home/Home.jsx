import React, { useEffect } from 'react'
import Navbar from '../../components/Navigation/Navbar'
import MainHeader from '../../components/Headers/MainHeader'
import Banners from '../../components/Carousels/Banners'
import { Box, Container } from '@chakra-ui/react';
import PrescriptionUpload from '../../components/Cards/PrescriptionUpload';
import Categories from '../../components/Carousels/Categories';
import Reviews from '../../components/Carousels/Reviews';
import HomeProducts from '../../components/Carousels/HomeProducts';
import Footer from '../../components/Navigation/Footer';
import HomeFeatureSection from '../../components/Sections/HomeFeatureSection';
import { ScrollRestoration } from 'react-router-dom';

export default function Home() {
    useEffect(() => {
      document.title = "MedOne | Your all in one pharmacy"
    }, [])
    
    return (
      <React.Fragment>
        <Navbar />
        <MainHeader/>
        <Container maxW={'8xl'} h={'fit-content'} mt={6}>
          <Banners />
          <PrescriptionUpload/>
          <Box className='shop-category-container'>
            <Categories />
            <HomeFeatureSection/>
            <HomeProducts title="Trending Products" description="Find trending products near you.." />
            <Banners />
            <HomeProducts title="Featured Products" description="Pick from our featured products..." />
          </Box>
          <Box className='shop-review-container'>
            <Reviews />
          </Box>
        </Container>
        <Footer/>
        <ScrollRestoration />
      </React.Fragment>
    )
}
