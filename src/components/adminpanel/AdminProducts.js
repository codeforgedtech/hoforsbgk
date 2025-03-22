import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { storage, firestore, auth } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Sidebar from './Sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f4f4f4;
  width: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  margin-left: 200px;
`;

const UploadContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
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

const LinkButton = styled.a`
  background-color: #E94E1B;
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  margin-right: 10px;

  &:hover {
    background-color: #D4411B;
  }
`;

const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const ProductItem = styled.div`
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 600px;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const EditIcon = styled(FaEdit)`
  color: #4caf50;
  cursor: pointer;
  font-size: 1.5rem;
`;

const DeleteIcon = styled(FaTrash)`
  color: #f44336;
  cursor: pointer;
  font-size: 1.5rem;
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
          <h2>Produkter</h2>
          {products.map(product => (
            <ProductItem key={product.id}>
              <ProductName>{product.name} - {product.price} SEK</ProductName>
              <Actions>
                <IconContainer>
                  <LinkButton href={product.imageUrl} target="_blank" rel="noopener noreferrer">Bild</LinkButton>
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
