import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const GameCreationForm = () => {
    const [formData, setFormData] = useState({
        intitule: '',
        dateDebut: '',
        duree: '',
        nombreDeTicket: '',
        code_game: '',
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/admin/jeux_concours`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setResponseMessage(response.data.message);
            setShowModal(true);
        } catch (error) {
            setResponseMessage('Erreur lors de la création du jeu concours.');
            setShowModal(true);
            console.error('Erreur:', error);
        }
    };



    return (
        <div className='startgame'>
            <Form onSubmit={handleSubmit}>
                <h1>CREATION DE JEU</h1>
                <Form.Group controlId="intitule">
                    <Form.Label>Intitulé</Form.Label>
                    <Form.Control
                        type="text"
                        name="intitule"
                        value={formData.intitule}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="dateDebut">
                    <Form.Label>Date de Début</Form.Label>
                    <Form.Control
                        type="text"
                        name="dateDebut"
                        value={formData.dateDebut}
                        onChange={handleChange}
                        placeholder="(ex : 12-06-2024)"
                    />
                </Form.Group>

                <Form.Group controlId="duree">
                    <Form.Label>Durée</Form.Label>
                    <Form.Control
                        type="text"
                        name="duree"
                        value={formData.duree}
                        onChange={handleChange}
                        placeholder="(en jours)"
                    />
                </Form.Group>

                <Form.Group controlId="nombreDeTicket">
                    <Form.Label>Nombre de Tickets</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombreDeTicket"
                        value={formData.nombreDeTicket}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="code_game">
                    <Form.Label>Code du Jeu</Form.Label>
                    <Form.Control
                        type="text"
                        name="code_game"
                        value={formData.code_game}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    CREER
                </Button>
            </Form>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Résultat</Modal.Title>
                </Modal.Header>
                <Modal.Body>{responseMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GameCreationForm;
