import {
    Avatar,
    Box,
    Flex,
    FormLabel,
    Icon,
    Select,
    SimpleGrid,
    useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
    MdAddTask,
    MdAttachMoney,
    MdBarChart,
    MdFileCopy,
} from "react-icons/md";
import CheckTable from "./components/CheckTable";
import ComplexTable from "./components/ComplexTable";
import PieCard from "./components/PieCard";
import {
    columnsDataCheck,
    columnsDataComplex,
} from "./variables/columnsData";
import React, { useState, useEffect } from "react";

import axios from "axios";

export default function UserReports() {
    const [listGame, setlistGame] = useState([]);
    const [gameStats, setGameStats] = useState([]);


    const fetchListGame = async () => {


        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API}/api/admin/getAllGames`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setlistGame(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des games:", error);
        }

    };

    const fetchStatsForGames = async (items) => {
        const statsArray = [];

        for (const item of items) {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/api/admin/getStatsGames/${item.id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                statsArray.push(response.data);
                //console.log("data", statsArray)
            } catch (error) {
                console.error(`Erreur lors de la récupération des stats pour le jeu ${item.id}:`, error);
            }
        }
        setGameStats(statsArray);
    };

    useEffect(() => {
        fetchListGame();

    }, []);

    useEffect(() => {
        if (listGame.length > 0) {
            fetchStatsForGames(listGame);
        }

    }, [listGame]);
    console.log("data", gameStats)
    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            {listGame.map((item) => (
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
                    gap='20px'
                    mb='20px'>
                    <MiniStatistics
                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={
                                    <Icon w='32px' h='32px' as={MdAddTask} color={brandColor} />
                                }
                            />
                        }
                        name='Id Jeu'
                        value={item.id}
                    />
                    <MiniStatistics
                        name='durée du jeu'
                        value={item.duree}
                    />
                    <MiniStatistics name='nombre de ticket' value={item.nombreDeTicket} />
                    <MiniStatistics
                        endContent={
                            <Flex me='-16px' mt='10px'>
                                <Select
                                    id='balance'
                                    variant='mini'
                                    mt='5px'
                                    me='0px'
                                    defaultValue='usd'>
                                    <option value='usd'>USD</option>
                                    <option value='eur'>EUR</option>
                                    <option value='gba'>GBA</option>
                                </Select>
                            </Flex>
                        }
                        name='Nom'
                        value={item.intitule}
                    />
                    <MiniStatistics
                        name='date de debut'
                        value={item.dateDeDebut}
                    />
                    <MiniStatistics
                        name='fin du jeu'
                        value={item.dateDeFinDuJeux}
                    />

                </SimpleGrid>))}
            {listGame.map((item, index) => (
                <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
                    <CheckTable columnsData={columnsDataCheck} tableData={listGame} />
                    {gameStats.length > index && (
                        <ComplexTable
                            columnsData={columnsDataComplex}
                            tableData={gameStats}
                        />)}
                </SimpleGrid>))}
            <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>

                <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
                    <PieCard />
                    <MiniCalendar h='100%' minW='100%' selectRange={false} />
                </SimpleGrid>
            </SimpleGrid>
        </Box>
    );
}