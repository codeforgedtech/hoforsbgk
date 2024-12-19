import React from 'react';
import styled from 'styled-components';

const FullProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 40px 20px;
  margin: 20px;
  background: linear-gradient(135deg, #f3f4f6, #ffffff);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
`;

const ProductsBox = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 15px;
  width: 100%;
  max-width: 800px;
  text-align: left;
`;

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 30px;
  font-size: 2.5em;
  color: #C37A47;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
`;

const ProductsList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const ProductItem = styled.li`
  background-color: #ffffff;
  border: 1px solid #ececec;
  border-radius: 10px;
  padding: 15px;
  width: calc(25% - 20px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }
  @media (max-width: 480px) {
    width: calc(100% - 20px);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 15px;
`;

const ProductName = styled.h2`
  font-size: 1.5em;
  margin: 10px 0 5px;
  color: #C37A47;
  font-weight: bold;
`;

const ProductPrice = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  color: #666;
  margin: 5px 0;
`;

const ProductDescription = styled.p`
  font-size: 0.95em;
  color: #777;
  margin: 10px 0 15px;
  line-height: 1.4;
`;

const StyledLink = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 12px 30px;
  font-size: 16px;
  background-color: #C37A47;
  color: white;
  border-radius: 30px;
  text-decoration: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #b2693f;
    transform: translateY(-2px);
  }
`;

const Products = () => (
  <FullProductsContainer>
    <Title>Våra Produkter</Title>
    <ProductsList>
      {[
        { id: 1, name: 'Keps', price: 199, description: 'En stilren keps med hög komfort, perfekt för alla tillfällen.', image: '/products/product1.jpg' },
        { id: 2, name: 'Kylduk', price: 100, description: 'En svalkande kylduk, idealisk för varma dagar eller träning.', image: '/products/product2.jpg' },
        { id: 3, name: 'Mugg', price: 175, description: 'En klassisk mugg med stilren design, perfekt för kaffeälskaren.', image: '/products/product3.jpg' },
        { id: 4, name: 'Mössa', price: 150, description: 'En varm och bekväm mössa för kyliga dagar. Uppvikt skärm.', image: '/products/product4.jpg' },
        { id: 5, name: 'Mössa', price: 175, description: 'En trendig mössa som kombinerar stil och funktionalitet. Tätare material och är varmare.', image: '/products/product5.jpg' },
      ].map((product) => (
        <ProductItem key={product.id}>
          <ProductImage src={product.image} alt={product.name} />
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price} SEK</ProductPrice>
          <ProductDescription>{product.description}</ProductDescription>
        </ProductItem>
      ))}
    </ProductsList>
    <p style={{ textAlign: 'center', color: '#555', marginTop: '30px', fontSize: '1.1em' }}>
      Vid köp Swishas beloppet till 1234467825, skriv Keps, Kylduk, Mugg, Mössa, osv.
    </p>
    <StyledLink href="/">Tillbaka</StyledLink>
  </FullProductsContainer>
);

export default Products;


