import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import ReactPaginate from 'react-paginate';
import SEO from './SEO';
const NewsContainer = styled.div`
    padding: 20px;
    margin: 20px;
    min-height: 60vh;
    background-color: #FFF;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      padding: 10px;
      margin: 10px;
    }
  `;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const NewsItem = styled.div`
 
  padding: 20px;
  border-radius: 10px;
  
  text-align: center;

  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px;
  }
`;

const Title = styled.h1`
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 2em;
  color: #C37A47;
  text-align: center;
`;

const TitleRubrik = styled.h2`
  color: black;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin: 10px 0;
  border-radius: 10px;

  @media (max-width: 768px) {
    margin: 5px 0;
    max-width: 90%;
  }
`;

const ReadMoreLink = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #E94E1B;
  color: white;
  border-radius: 5px;
  text-decoration: none;

  &:hover {
    background-color: #D4411B;
  }
`;

const PaginateContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;

    .page-item {
      margin: 0 5px;
      cursor: pointer;
      padding: 10px 15px;
      border: 1px solid #ccc;
      border-radius: 5px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #E94E1B;
        color: white;
      }

      &.active {
        background-color: #E94E1B;
        color: white;
        font-weight: bold;
      }
    }
  }
`;

const News = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [newsPerPage] = useState(6); // Show 6 items per page

  useEffect(() => {
    const fetchNews = async () => {
      const newsCollection = collection(firestore, 'news');
      const q = query(newsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const newsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNews(newsData);
    };

    fetchNews();
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * newsPerPage;
  const currentNews = news.slice(offset, offset + newsPerPage);

  return (
    <><SEO title="Nyheter" description="Senaste nyheterna från vår klubb" keywords="nyheter, klubb, senaste nyheter" /><NewsContainer>

      <Title>Nyheter</Title>
      <NewsGrid>
        {currentNews.map(item => (
          <NewsItem key={item.id}>
            <TitleRubrik>{item.title}</TitleRubrik>
            {item.image1 && <Image src={item.image1} alt="news" />}
            <ReadMoreLink to={`/news/${item.id}`}>Läs hela nyheten</ReadMoreLink>
          </NewsItem>
        ))}
      </NewsGrid>
      <PaginateContainer>
        <ReactPaginate
          previousLabel={'Föregående'}
          nextLabel={'Nästa'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(news.length / newsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          pageClassName={'page-item'}

          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
          breakLinkClassName={'page-link'} />
      </PaginateContainer>
    </NewsContainer></>
  );
};

export default News;




