import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firestore, storage } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaTrash, FaEdit } from 'react-icons/fa';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Resizer from 'react-image-file-resizer';

const CreateNewsContainer = styled.div`
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

const CreateNewsBox = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333333;
  font-size: 24px;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  margin: 10px;
  
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    border-color: #E94E1B;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #E94E1B;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  width: calc(100% - 20px);

  &:hover {
    background-color: #D4411B;
  }
`;

const NewsListContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;
const Space = styled.p`
  margin-bottom:40px;
`;
const NewsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const NewsTitle = styled.span`
  flex-grow: 1;
  margin-left: 10px;
  color: #333;
`;

const DeleteIcon = styled(FaTrash)`
  cursor: pointer;
  color: #E94E1B;

  &:hover {
    color: #D4411B;
  }
`;

const EditIcon = styled(FaEdit)`
  cursor: pointer;
  color: #007bff;
  margin-left: 10px;

  &:hover {
    color: #0056b3;
  }
`;

const CreateNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [competitionLink, setCompetitionLink] = useState('');
  const [news, setNews] = useState([]);
  const [editingId, setEditingId] = useState(null); // Keep track of the news item being edited

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const newsCollection = collection(firestore, 'news');
    const newsSnapshot = await getDocs(newsCollection);
    const newsList = newsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setNews(newsList);
  };

  const handleCreateNews = async () => {
    const newsCollection = collection(firestore, 'news');
  
    // Function to resize image
    const resizeImage = (image) => {
      return new Promise((resolve) => {
        Resizer.imageFileResizer(
          image,
          1440,
          810,
          'JPEG',
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          'blob'
        );
      });
    };
  
    // Function to upload image
    const uploadImage = async (image) => {
      const resizedImage = await resizeImage(image);
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, resizedImage);
      return getDownloadURL(imageRef);
    };
  
    const image1URL = image1 ? await uploadImage(image1) : null;
    const image2URL = image2 ? await uploadImage(image2) : null;
  
    if (editingId) {
      // Update existing news
      const newsDoc = doc(firestore, 'news', editingId);
      await updateDoc(newsDoc, {
        title,
        content,
        image1: image1URL || image1,
        image2: image2URL || image2,
        competitionLink,
        updatedAt: new Date()
      });
      setEditingId(null); // Reset editing state
    } else {
      // Create new news
      await addDoc(newsCollection, {
        title,
        content,
        image1: image1URL,
        image2: image2URL,
        competitionLink,
        createdAt: new Date()
      });
    }

    // Clear the form after submission
    setTitle('');
    setContent('');
    setImage1(null);
    setImage2(null);
    setCompetitionLink('');
    fetchNews();
  };

  const handleDeleteNews = async (id) => {
    await deleteDoc(doc(firestore, 'news', id));
    fetchNews();
  };

  const handleEditNews = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setContent(item.content);
    setCompetitionLink(item.competitionLink || '');
    setImage1(item.image1 || null);
    setImage2(item.image2 || null);
  };

  return (
    <CreateNewsContainer>
      <CreateNewsBox>
        <Title>{editingId ? 'Redigera Nyhet' : 'Skapa Nyhet'}</Title>
        <Input 
          type="text" 
          placeholder="Titel" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <Space>
        <ReactQuill 
          value={content} 
          onChange={(value) => setContent(value)} 
          placeholder="Innehåll" 
          style={{ margin: '10px', height: '180px' }} 
        />
      </Space>
        <Input 
          type="file" 
          onChange={(e) => setImage1(e.target.files[0])} 
        />
        <Input 
          type="file" 
          onChange={(e) => setImage2(e.target.files[0])} 
        />
        <Input 
          type="text" 
          placeholder="Länk" 
          value={competitionLink} 
          onChange={(e) => setCompetitionLink(e.target.value)} 
        />
        <Button onClick={handleCreateNews}>
          {editingId ? 'Uppdatera Nyhet' : 'Skapa Nyhet'}
        </Button>
      </CreateNewsBox>
      
      <NewsListContainer>
        <Title>Inlagda Nyheter</Title>
        {news.map((item) => (
          <NewsItem key={item.id}>
            <NewsTitle>{item.title}</NewsTitle>
            <div>
              <EditIcon onClick={() => handleEditNews(item)} />
              <DeleteIcon onClick={() => handleDeleteNews(item.id)} />
            </div>
          </NewsItem>
        ))}
      </NewsListContainer>
    </CreateNewsContainer>
  );
};

export default CreateNews;

