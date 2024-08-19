import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text } from '@chakra-ui/react';
import axios from "axios";

const ListUser = () => {
    const [listUser, setlistUser] = useState([]);

    const fetchUserGain = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API}/api/admin/export_data_for_emailing`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            // Extraire le tableau 'data_for_emailing' de la réponse
            if (response.data && Array.isArray(response.data.data_for_emailing)) {
                setlistUser(response.data.data_for_emailing);
            } else {
                console.error("La clé 'data_for_emailing' est manquante ou n'est pas un tableau :", response.data);
            }

        } catch (error) {
            console.error("Erreur lors de la récupération des gains :", error);
        }
    };

    useEffect(() => {
        fetchUserGain();
    }, []);

    return (
        <>
            {listUser.length > 0 ? (
                <Box w="100%" p={4} overflowX="auto">
                    <Table variant="simple" size="md">
                        <Thead bg="gray.200">
                            <Tr>
                                <Th>Nom</Th>
                                <Th>Prénom</Th>
                                <Th>Email</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {listUser.map((item, index) => (
                                <Tr key={index} bg={index % 2 === 0 ? 'gray.50' : 'white'}>
                                    <Td>
                                        <Text fontWeight="bold">{item.nom}</Text>
                                    </Td>
                                    <Td>{item.prenom}</Td>
                                    <Td>{item.email}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            ) : (
                <Text>Aucun utilisateur trouvé.</Text>
            )}
        </>
    );
};

export default ListUser;
