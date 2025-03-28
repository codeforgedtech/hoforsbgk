import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { storage, firestore, auth } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Sidebar from './Sidebar';
import { FaTrash } from 'react-icons/fa';

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
  width: 100%;  // Default width for smaller screens

  @media (min-width: 768px) {
    width: 60%;  // For larger screens
    margin-left: 0;
  }
`;
const FormContainer = styled.div`
background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  text-align: center;
  margin-bottom: 20px;
`;

const CourseListContainer = styled.div`
  width: 50%;
  max-width: 600px;
  margin-top: 40px;
  flex-grow: 1; // Gör så att denna växer på större skärmar för att ta upp utrymme

  @media (min-width: 768px) {
    margin-left: 40px;  // Ge ett mellanrum mellan formuläret och nyhetslistan
    width: 35%; // Nyheterna ska ta upp 35% av utrymmet på större skärmar
  }
`;

const Input = styled.input`
    width: 95%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;
const Title = styled.h2`
  margin-bottom: 20px;
  color: #333333;
  font-size: 24px;
`;
const Button = styled.button`
    padding: 10px 15px;
    background-color: #c37a47;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #b2693b;
    }
`;

const CourseItem = styled.div`
   display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;
const GolfTitle = styled.span`
  flex-grow: 1;
  margin-left: 10px;
  color: #333;
`;

const GolfCourseUpload = () => {
    const [courseName, setCourseName] = useState('');
    const [courseType, setCourseType] = useState('');
    const [holeCount, setHoleCount] = useState('');
    const [handicap, setHandicap] = useState('');
    const [tip, setTip] = useState('');
    const [file, setFile] = useState(null);
    const [tipImage, setTipImage] = useState(null); // Ny state för tipbild
    const [courses, setCourses] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const fetchCourses = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'golf_courses'));
            const fetchedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCourses(fetchedCourses);
        };
        fetchCourses();
    }, []);

    const handleUpload = async () => {
        if (!file || !courseName || !courseType || !holeCount || !handicap || !tip || !tipImage) {
            alert('Fyll i alla fält och välj både en bild och en tipsbild.');
            return;
        }

        try {
            // Ladda upp själva golfbanebilden
            const courseStorageRef = ref(storage, `golf_courses/${file.name}`);
            const courseUploadTask = uploadBytesResumable(courseStorageRef, file);

            await courseUploadTask;
            const courseDownloadURL = await getDownloadURL(courseUploadTask.snapshot.ref);

            // Ladda upp tipsbilden
            const tipStorageRef = ref(storage, `golf_courses/tips/${tipImage.name}`);
            const tipUploadTask = uploadBytesResumable(tipStorageRef, tipImage);

            await tipUploadTask;
            const tipDownloadURL = await getDownloadURL(tipUploadTask.snapshot.ref);

            // Lägg till golfbanan med URL:erna för både banan och tipsbilden
            await addDoc(collection(firestore, 'golf_courses'), {
                name: courseName,
                type: courseType,
                holes: Number(holeCount),
                handicap: Number(handicap),
                tip,
                imageUrl: courseDownloadURL,  // URL för golfbanebilden
                tipImageUrl: tipDownloadURL,  // URL för tipsbilden
                userId: user.uid
            });

            alert('Bana tillagd!');
        } catch (error) {
            console.error('Uppladdningsfel:', error);
            alert('Något gick fel vid uppladdningen.');
        }
    };

    return (
        <Container>
            <Sidebar />
            <MainContent>
            <FormContainer>
                <h2>Lägg till Golfbana</h2>
                <Input type="text" placeholder="Bananamn" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
                <Input type="text" placeholder="Bantyp" value={courseType} onChange={(e) => setCourseType(e.target.value)} />
                <Input type="number" placeholder="Nummer på hål" value={holeCount} onChange={(e) => setHoleCount(e.target.value)} />
                <Input type="number" placeholder="Handikapp" value={handicap} onChange={(e) => setHandicap(e.target.value)} />
                <Input type="text" placeholder="Tips" value={tip} onChange={(e) => setTip(e.target.value)} />
                <p>Bild på banan</p>
                <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <p>Tipsbild</p>
                <Input type="file" onChange={(e) => setTipImage(e.target.files[0])} /> {/* Nytt fält för att ladda upp tipsbild */}
                <Button onClick={handleUpload}>Lägg till</Button>
            </FormContainer>

            <CourseListContainer>
                <Title>Golfbanor</Title>
                {courses.map(course => (
                    <CourseItem key={course.id}>
                        <GolfTitle>{course.holes} - {course.name}</GolfTitle>
                        
                        <FaTrash onClick={() => alert(`Ta bort ${course.name}`)} style={{ color: 'red', cursor: 'pointer' }} />
                    </CourseItem>
                ))}
            </CourseListContainer>
            </MainContent>
        </Container>
    );
};

export default GolfCourseUpload;








