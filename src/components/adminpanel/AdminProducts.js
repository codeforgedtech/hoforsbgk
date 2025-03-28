import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { storage, firestore, auth } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Sidebar from './Sidebar';
import { FaEdit, FaTrash, FaImage } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: col;
  min-height: 60vh;

  @media (min-width: 768px) {
    flex-direction: col; // Sätt flexbox-raden när skärmen är större än 768px
  }
`;

const MainContent = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 20px;
  margin: 20px;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex-grow: 1;

  @media (min-width: 768px) {
    width: 60%;  // För större skärmar ska detta ta upp 60% av bredden
    margin-left: 0;  // Ta bort margin-left på desktop för att centrera
  }
`;

const UploadContainer = styled.div`
 background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-top: 10px;
  background-color: #c37a47;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  margin-right: 5px;

  &:hover {
    background-color: #b2693b;
  }
`;

const ImgIcon = styled(FaImage)`
cursor: pointer;
color: green;
margin-left: 10px;

&:hover {
  color: green;
}
  
`;

const ProductListContainer = styled.div`
width: 50%;
  max-width: 600px;
  margin-top: 40px;
  flex-grow: 1; // Gör så att denna växer på större skärmar för att ta upp utrymme

  @media (min-width: 768px) {
    margin-left: 40px;  // Ge ett mellanrum mellan formuläret och nyhetslistan
    width: 35%; // Nyheterna ska ta upp 35% av utrymmet på större skärmar
  }
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
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
const FolderTitle = styled.span`
  flex-grow: 1;
  margin-left: 10px;
  color: #333;
`;
const Title = styled.h2`
  margin-bottom: 20px;
  color: #333333;
  font-size: 24px;
`;
const StoreUpload = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [user] = useAuthState(auth);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'products'));
      const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  const handleUpload = async () => {
    if (!file || !productName || !productPrice || !productDescription) {
      alert('Fyll i alla fält och välj en bild.');
      return;
    }

    const storageRef = ref(storage, `products/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      null,
      (error) => console.error('Upload error:', error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        await addDoc(collection(firestore, 'products'), {
          name: productName,
          price: Number(productPrice),
          description: productDescription,
          imageUrl: downloadURL,
          userId: user.uid
        });

        alert('Produkt tillagd!');
      }
    );
  };

  const handleDelete = async (id, imageUrl) => {
    await deleteDoc(doc(firestore, 'products', id));
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEdit = (product) => {
    alert(`Edit product: ${product.name}`);
  };

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <UploadContainer>
          <h2>Lägg till Produkt</h2>
          <Input type="text" placeholder="Produktnamn" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <Input type="number" placeholder="Pris" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          <Input type="text" placeholder="Beskrivning" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
          <p>Bild på produkt</p>
          <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <Button onClick={handleUpload}>Lägg till</Button>
        </UploadContainer>

        <ProductListContainer>
          <Title>Produkter</Title>
          {products.map(product => (
            <ProductItem key={product.id}>
              <FolderTitle>{product.name} - {product.price} SEK</FolderTitle>
              <Actions>
                <IconContainer>
                  <ImgIcon href={product.imageUrl} target="_blank" rel="noopener noreferrer">Bild</ImgIcon>
                  <EditIcon onClick={() => handleEdit(product)} />
                  <DeleteIcon onClick={() => handleDelete(product.id, product.imageUrl)} />
                </IconContainer>
              </Actions>
            </ProductItem>
          ))}
        </ProductListContainer>
      </MainContent>
    </Container>
  );
};

export default StoreUpload;
