import React, {useEffect} from 'react';

import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image, Tag, Badge,
} from '@chakra-ui/react';
import quizApi from "../../../api/quizApi";
import {useHistory} from "react-router-dom";
import QuizService from "../../../service/QuizService";

const IMAGE =
    'https://cdn-icons-png.flaticon.com/512/4193/4193243.png';

const QuizInfo = ({quizInfo, ...rest}) => {
    const history = useHistory();

    const handleJoinQuiz = async () => {
        try {
            const data = await QuizService.getQuizByCode(quizInfo.code);
            console.log(data);
            history.push(`/join/quiz/${quizInfo.code}`);
        } catch (e) {
            console.log(e.response.message);
        }
    }
    return (
        <Center {...rest} cursor={'pointer'}>
            <Box
                onClick={() => handleJoinQuiz()}
                minW={'min'}
                boxShadow={'md'}
                role={'group'}
                p={2}
                bg={useColorModeValue('white', 'gray.800')}
                // boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                {/*Image*/}
                <Box
                    rounded={'lg'}
                    pos={'relative'}

                >
                    <Image
                        p={2}
                        rounded={'lg'}
                        height={160}
                        width={160}
                        objectFit={'cover'}
                        src={IMAGE}
                    />
                </Box>
                {/*End of Image*/}

                <Stack align={'center'} pb={2}>
                    {/*<Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>*/}
                    {/*    Brand*/}
                    {/*</Text>*/}
                    <Badge colorScheme={'purple'}>{quizInfo.subject || ''}</Badge>
                    <Heading fontSize={'md'} fontFamily={'body'} fontWeight={500}>
                        {quizInfo.title}
                    </Heading>
                    {/*<Stack direction={'row'} align={'center'}>*/}
                    {/*    <Text fontWeight={800} fontSize={'xl'}>*/}
                    {/*        $57*/}
                    {/*    </Text>*/}
                    {/*    <Text textDecoration={'line-through'} color={'gray.600'}>*/}
                    {/*        $199*/}
                    {/*    </Text>*/}
                    {/*</Stack>*/}
                </Stack>

                {/*<Box bg={'red'} top={0} left={5} position={'absolute'}>*/}
                {/*    df*/}
                {/*</Box>*/}
            </Box>
        </Center>
    );
};
export default QuizInfo;
