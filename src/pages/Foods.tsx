import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import Container from '../components/Container'
import { FoodCardSection } from '../components/foods/FoodCardSection'


export const Foods: React.FC = () => {
  return (
    <>
      <Container className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex flex-col gap-6">
        <Navbar />
       <FoodCardSection/>
       
        <Footer />
      </Container>


    </>
  )
}
