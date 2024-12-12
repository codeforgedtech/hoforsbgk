import React from 'react';
import styled from 'styled-components';

const FullProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 20px;
  margin: 20px;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProductsBox = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  text-align: left;
`;

const Title = styled.h1`
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 2em;
  color: #C37A47;
  text-align: center;
`;

const ProductsList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProductItem = styled.li`
  margin: 10px;
  width: calc(33% - 20px); /* Adjust for 3 items per row */
  @media (max-width: 768px) {
    width: calc(50% - 20px); /* Adjust for 2 items per row on smaller screens */
  }
  @media (max-width: 480px) {
    width: calc(100% - 20px); /* Adjust for 1 item per row on very small screens */
  }
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
`;

const ProductName = styled.h2`
  margin: 10px 0 5px;
  font-size: 1.2em;
  color: #333;
`;

const ProductPrice = styled.p`
  margin: 0;
  font-size: 1em;
  color: #666;
`;

const StyledLink = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #C37A47;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #C37A47;
  }
`;

const Products = () => (
  <FullProductsContainer>
    <Title>Produkter</Title>
    <ProductsList>
      {[
        { id: 1, name: 'Keps', price: 199, image: '/products/product1.jpg' },
        { id: 2, name: 'Tvättduk', price: 100, image: '/products/product2.jpg' },
        { id: 3, name: 'Mugg', price: 75, image: '/products/product3.jpg' },
      ].map((product) => (
        <ProductItem key={product.id}>
          <ProductImage 
            src={product.image}
            alt={product.name} 
          />
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price} SEK</ProductPrice>
        </ProductItem>
      ))}
    </ProductsList>
    Vid köp Swishas beloppet till 1234467825, skriv Keps, Tvättduk, Mugg osv , 
    <StyledLink href="/">Tillbaka</StyledLink>
  </FullProductsContainer>
);

export default Products;

