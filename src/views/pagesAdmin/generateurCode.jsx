import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const GenerateurCode = () => {


    const [inputValue, setInputValue] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [showModal, setShowModal] = useState(false);


    const handleChangeForm2 = (e) => {
        setInputValue(e.target.value);
    };

    // Gestion de la soumission pour le deuxième formulaire
    const handleSubmitForm2 = async (e) => {
        e.preventDefault();

        if (inputValue.length <= 6) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/participation/caisse_98/${inputValue}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                setResponseMessage(response.data.message);
                setShowModal(true);
            } catch (error) {
                setResponseMessage('Erreur lors de la participation.');
                setShowModal(true);
                console.error('Erreur:', error);
            }
        } else {
            setResponseMessage('La valeur entrée dépasse 6 caractères.');
            setShowModal(true);
        }
    };

    return (
        <div className='startgame'>

            <div>
                <Form onSubmit={handleSubmitForm2} className="mt-4">
                    <h1>VISUALISATION DE CODE</h1>
                    <Form.Group controlId="inputValue">
                        <Form.Label>Participation Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="inputValue"
                            value={inputValue}
                            onChange={handleChangeForm2}
                            placeholder="Entrer le code (max 6 caractères)"
                            maxLength="6"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        VOIR
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
        </div>
    );
};

export default GenerateurCode;
