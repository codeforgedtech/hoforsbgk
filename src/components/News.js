import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import ReactPaginate from 'react-paginate';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaArrowCircleRight } from "react-icons/fa";
import 'swiper/swiper-bundle.css';
import SEO from './SEO';

// Styled Components
const NewsContainer = styled.div`
  padding: 40px;
  margin: 40px;
  min-height: 60vh;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
    margin: 20px;
  }
`;

const HeroSection = styled.div`
  margin-bottom: 40px;
  position: relative; /* Needed for the absolute positioning of the swipe indicator */
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  position: relative;
  display: block;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 1.5em;
    color: #C37A47;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2em;
    margin-bottom: 20px;
  }

  a {
    display: inline-block;
    padding: 10px 20px;
    background-color: #E94E1B;
    color: white;
    border-radius: 5px;
    text-decoration: none;

    &:hover {
      background-color: #D4411B;
    }
  }
`;

const SwipeIndicator = styled.div`
  position: relative;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: rgba(233, 78, 27, 0.8); /* Semi-transparent background for contrast */
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 50px; /* Rounded corners */
  text-align: center;
  z-index: 10;
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: auto;
    bottom: 20px; /* Adjusted distance from the bottom */
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const NewsItem = styled.div`
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 40px;
  font-size: 3em;
  color: #C37A47;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1.2px;

`;

const TitleRubrik = styled.h2`
  font-size: 1.5em;
  color: black;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin: 20px 0;
  border-radius: 10px;
`;

const ReadMoreLink = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  padding: 12px 24px;
  background-color: #E94E1B;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;

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
  const [newsPerPage] = useState(5);

  useEffect(() => {
    const fetchNews = async () => {
      const newsCollection = collection(firestore, 'news');
      const q = query(newsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const newsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched news:', newsData); // Log news data
      setNews(newsData);
    };

    fetchNews();
  }, []);

  const handlePageClick = (event) => {
    console.log('Selected page:', event.selected); // Log selected page
    setCurrentPage(event.selected);
  };

  // The offset for pagination is based on the currentPage, but starting after the first 3 items
  const offset = currentPage * newsPerPage;
  const remainingNews = news.slice(3); // Remove the first 3 news for pagination
  const currentNews = remainingNews.slice(offset, offset + newsPerPage);
  
  console.log('Current page news:', currentNews); // Log current page news
  const latestNews = news.slice(0, 3); // The first three news to be shown in the hero section

  return (
    <>
      <SEO title="Nyheter" description="Senaste nyheterna från vår klubb" keywords="nyheter, klubb, senaste nyheter" />
      <NewsContainer>
        <Title>Senaste Nytt</Title>
        <HeroSection>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              }
            }}
          >
            {latestNews.map(item => (
              <SwiperSlide key={item.id}>
                <HeroImage src={item.image1} alt={item.title} />
                <SwipeIndicator>Swipa för mera</SwipeIndicator>
                <HeroContent>
                  <h1>{item.title}</h1>
                  <p>{item.excerpt || "Läs de senaste nyheterna från vår klubb."}</p>
                  <Link to={`/news/${item.id}`}>Läs mer</Link>
                </HeroContent>
              </SwiperSlide>
            ))}
          </Swiper>
        </HeroSection>
        
        <NewsGrid>
          {currentNews.map(item => (
            <NewsItem key={item.id}>
              <TitleRubrik>{item.title}</TitleRubrik>
              {item.image1 && <Image src={item.image1} alt="news" />}
              <ReadMoreLink to={`/news/${item.id}`}>Läs hela nyheten</ReadMoreLink>
            </NewsItem>
          ))}
        </NewsGrid>

        {remainingNews.length > newsPerPage && (
          <PaginateContainer>
            <ReactPaginate
              previousLabel={'<<'}
              nextLabel={'>>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={Math.ceil(remainingNews.length / newsPerPage)}
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
              breakLinkClassName={'page-link'}
            />
          </PaginateContainer>
        )}
      </NewsContainer>
    </>
  );
};

export default News;







