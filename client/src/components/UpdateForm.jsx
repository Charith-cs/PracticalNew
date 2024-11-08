import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateForm = () => {
    const title = useRef();
    const desc = useRef();
    const [file, setFile] = useState(null);
    const [single, setSingle] = useState();

    const location = useLocation();
    const id = (location.pathname.split("/")[2]);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    //create user data
    const handleSubmit = async (e) => {
        e.preventDefault();

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
                    navigate("/");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    //get single user data
    useEffect(() => {
        const getSingle = async () => {
            try {
                const user = await axios.get(`http://localhost:8800/api/user/single/${id}`);
                setSingle(user.data);
            } catch (err) {
                console.log(err);
            }
        }
        getSingle();
    }, []);

    return (
        <div>
            <Container fluid style={{ height: "100vh" }}>
                <Row style={{ height: "100%" }}>
                    <Col lg={3} style={{ backgroundColor: "#d9d9d9", height: "100%" }}></Col>
                    <Col lg={6} style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <h2 style={{ marginTop: 20 }}>Post New Feed</h2>

                        <Form onSubmit={handleSubmit}>
                            {single && (
                                <>
                                    <Form.Group className="mb-4 mt-4">
                                        <Row className="align-items-center">
                                            <Col lg={3}>
                                                <Form.Label>Title</Form.Label>
                                            </Col>
                                            <Col lg={9}>
                                                <Form.Control type="text" ref={title} required placeholder={single.title} />
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Row className="align-items-center">
                                            <Col lg={3}>
                                                <Form.Label>Description</Form.Label>
                                            </Col>
                                            <Col lg={9}>
                                                <Form.Control as="textarea" rows={3} ref={desc} required placeholder={single.description} />
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Row className="align-items-center">
                                            <Col lg={3}>
                                                <Form.Label>Image</Form.Label>
                                            </Col>
                                            <Col lg={9}>
                                                <Form.Control type="file" onChange={handleFileChange} required placeholder={single.image} />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </>
                            )}

                            <div className="d-flex justify-content-center mt-3">
                                <Button variant="primary" type="submit"> Update Post Feed</Button>
                            </div>
                        </Form>
                    </Col>
                    <Col lg={3} style={{ backgroundColor: "#8eaadb", height: "100%" }}></Col>
                </Row>
            </Container>
        </div>
    )
}

export default UpdateForm