import React, { useState, useEffect } from "react";
import { Card, Row, Col, Badge } from 'react-bootstrap';
import axios from "axios";

const OrderCard = () => {
    const [listGain, setlistGain] = useState([]);

    const fetchUserGain = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API}/api/customer/view_prizes`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            // Assurez-vous que la réponse est un tableau
            if (Array.isArray(response.data)) {
                setlistGain(response.data);
            } else {
                setlistGain([]); // ou une gestion d'erreur
                console.error("La réponse de l'API n'est pas un tableau :", response.data);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des gains :", error);
            setlistGain([]); // En cas d'erreur, on peut définir un tableau vide
        }
    };

    useEffect(() => {
        fetchUserGain();
    }, []);

    return (
        <>
            {listGain.length > 0 ? (
                listGain.map((gain, index) => (
                    <Card key={index} className="mb-3 list-gain" border='primary'>
                        <Card.Header>
                            <b>{gain.ticket.code}</b>
                            <small className="float-end">Order ID: {gain.ticket.id}</small>
                        </Card.Header>
                        <Row className="p-2">
                            <Col xs={3} sm={2}>
                                <Card.Img variant="top" src={""} />
                            </Col>
                            <Col>
                                <Card.Body>
                                    <Card.Title>{gain.ticket.jeuConcour.intitule}</Card.Title>
                                    <Card.Text>
                                        <Badge pill bg="success">
                                            {gain.ticket.gain.TypeDeGain}
                                        </Badge>
                                    </Card.Text>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                ))
            ) : (
                <p>Aucun gain trouvé.</p> // Message à afficher si listGain est vide ou null
            )}
        </>
    );
};

export default OrderCard;
