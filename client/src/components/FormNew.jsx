import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row, Form, Button, Stack, Table } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormNew = () => {
    const title = useRef();
    const desc = useRef();
    const [file, setFile] = useState(null);
    const [allUsers, setAllUsers] = useState();
    const navigate = useNavigate();


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    //create user data
    const handleSubmit = async () => {

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;

            data.append('name', fileName);
            data.append('file', file);

            try {
                const res = await axios.post("http://localhost:8800/api/upload", data);

                if (res.status === 200) {
                    const user = {
                        title: title.current.value,
                        desc: desc.current.value,
                        image: fileName
                    };
                    const userRes = await axios.post("http://localhost:8800/api/user", user);
                    console.log(userRes.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const update = (id) => {
        navigate(`/update/${id}`);
    }

    //get all user data
    useEffect(() => {
        const getAll = async () => {
            try {
                const all = await axios.get("http://localhost:8800/api/user/getData");
                setAllUsers(all.data);
            } catch (err) {
                console.log(err);
            }
        }
        getAll();
    }, []);

    //delete all user data
    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8800/api/user/${id}`);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Container fluid >
                <Row style={{ minHeight: "100vh" }}>
                    <Col lg={3} style={{ backgroundColor: "#d9d9d9" }}></Col>
                    <Col lg={6} style={{ display: "flex", flexDirection: "column", justifyContent: "center", overflowY: "auto" }}>
                        <h2 style={{ marginTop: 20 }}>Post New Feed</h2>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-4 mt-4">
                                <Row className="align-items-center">
                                    <Col lg={3}>
                                        <Form.Label>Title</Form.Label>
                                    </Col>
                                    <Col lg={9}>
                                        <Form.Control type="text" ref={title} required />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Row className="align-items-center">
                                    <Col lg={3}>
                                        <Form.Label>Description</Form.Label>
                                    </Col>
                                    <Col lg={9}>
                                        <Form.Control as="textarea" rows={3} ref={desc} required />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Row className="align-items-center">
                                    <Col lg={3}>
                                        <Form.Label>Image</Form.Label>
                                    </Col>
                                    <Col lg={9}>
                                        <Form.Control type="file" onChange={handleFileChange} required />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <div className="d-flex justify-content-center mt-3">
                                <Button variant="primary" type="submit">Post Feed</Button>
                            </div>
                        </Form>

                        <Stack gap={3} className="mt-4">
                            <h3 style={{ marginTop: 20 }}>Feed Details</h3>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Image</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers && allUsers.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.title}</td>
                                            <td>{item.image}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
                                                    <Button variant="primary">
                                                        <EditIcon style={{ color: "black" }} onClick={() => update(item._id)} />
                                                    </Button>
                                                    <Button variant="danger">
                                                        <DeleteIcon style={{ color: "black" }} onClick={() => deleteUser(item._id)} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>
                        </Stack>
                    </Col>
                    <Col lg={3} style={{ backgroundColor: "#8eaadb" }}></Col>
                </Row>
            </Container>
        </div>
    );
};

export default FormNew;
