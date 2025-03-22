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
    const CourseListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
    
    `;

    const CourseItem = styled.div`
    background: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 600px;
    `;

    const CourseName = styled.h3`
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

    const GolfCourseUpload = () => {
    const [courseName, setCourseName] = useState('');
    const [courseType, setCourseType] = useState('');
    const [holeCount, setHoleCount] = useState('');
    const [handicap, setHandicap] = useState('');
    const [tip, setTip] = useState('');
    const [file, setFile] = useState(null);
    const [tipImage, setTipImage] = useState(null);
    const [courses, setCourses] = useState([]);
    const [user] = useAuthState(auth);

    // Fetch courses when the component mounts
    useEffect(() => {
        const fetchCourses = async () => {
        const querySnapshot = await getDocs(collection(firestore, 'golf_courses'));
        const fetchedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
        // Sort the courses by hole count (ascending order)
        const sortedCourses = fetchedCourses.sort((a, b) => a.holes - b.holes);
        
        setCourses(sortedCourses);
        };
        fetchCourses();
    }, []);

    const handleUpload = async () => {
        if (!file || !courseName || !courseType || !holeCount || !handicap || !tip) {
        alert('Fyll i alla fält och välj en bild.');
        return;
        }

        const storageRef = ref(storage, `golf_courses/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
        'state_changed',
        null,
        (error) => console.error('Upload error:', error),
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            let tipImageUrl = '';
            
            if (tipImage) {
            const tipImageRef = ref(storage, `golf_courses/tips/${tipImage.name}`);
            const tipUploadTask = uploadBytesResumable(tipImageRef, tipImage);
            await tipUploadTask;
            tipImageUrl = await getDownloadURL(tipUploadTask.snapshot.ref);
            }

            await addDoc(collection(firestore, 'golf_courses'), {
            name: courseName,
            type: courseType,
            holes: Number(holeCount),
            handicap: Number(handicap),
            tip,
            tipImageUrl,
            imageUrl: downloadURL,
            userId: user.uid
            });

            alert('Bana tillagd!');
        }
        );
    };

    const handleDelete = async (id, imageUrl) => {
        await deleteDoc(doc(firestore, 'golf_courses', id));
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
        setCourses(courses.filter(course => course.id !== id));
    };

    const handleEdit = (course) => {
        alert(`Edit course: ${course.name}`);
    };

    return (
        <Container>
        <Sidebar />
        <MainContent>
            <UploadContainer>
            <h2>Lägg till Golfbana</h2>
            <Input type="text" placeholder="Bananamn" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
            <Input type="text" placeholder="Bantyp" value={courseType} onChange={(e) => setCourseType(e.target.value)} />
            <Input type="number" placeholder="Nummer på hål" value={holeCount} onChange={(e) => setHoleCount(e.target.value)} />
            <Input type="number" placeholder="Handikapp" value={handicap} onChange={(e) => setHandicap(e.target.value)} />
            <Input type="text" placeholder="Tips" value={tip} onChange={(e) => setTip(e.target.value)} />
            <p>Bild på banan</p>
            <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <p>Bild på tips</p>
            <Input type="file" onChange={(e) => setTipImage(e.target.files[0])} />
            <Button onClick={handleUpload}>Lägg till</Button>
            </UploadContainer>

            <CourseListContainer>
            <h2>Golfbanor</h2>
            {courses.map(course => (
                <CourseItem key={course.id}>
                <CourseName>{course.holes} - {course.name}</CourseName>
                <Actions>
                    <IconContainer>
                    
                        <LinkButton href={course.imageUrl} target="_blank" rel="noopener noreferrer">Bana</LinkButton>
                    
                        <LinkButton href={course.tipImageUrl} target="_blank" rel="noopener noreferrer">Tips</LinkButton>
            
                    <EditIcon onClick={() => handleEdit(course)} />
                    <DeleteIcon onClick={() => handleDelete(course.id, course.imageUrl)} />
                    </IconContainer>
                </Actions>
                </CourseItem>
            ))}
            </CourseListContainer>
        </MainContent>
        </Container>
    );
    };

    export default GolfCourseUpload;







