import React, { useCallback, useReducer, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import PageContainer from '../components/PageContainer';
import PageTitle from '../components/PageTitle';
import ProfileImage from '../components/ProfileImage';
import Input from '../components/Input';
import { reducer } from '../utils/reducers/formReducer';
import { updateChatData } from '../utils/actions/chatActions';
import colors from '../constants/colors';
import SubmitButton from '../components/SubmitButton';
import { validateInput } from '../utils/actions/formActions';

const ChatSettingsScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const chatId = props.route.params.chatId;
    const chatData = useSelector(state => state.chats.chatsData[chatId]);
    const userData = useSelector(state => state.auth.userData);

    const initialState = {
        inputValues: {
            chatName: chatData.chatName
        },
        inputValidities: { chatName: undefined },
        formIsValid: false
    }

    const [formState, dispatchFormState] = useReducer(reducer, initialState);

    const inputChangedHandler = useCallback((inputId, inputValue) => {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({ inputId, validationResult: result, inputValue })
    }, [dispatchFormState]);

    const saveHandler = useCallback(async () => {
        const updatedValues = formState.inputValues;

        try {
            setIsLoading(true);
            await updateChatData(chatId, userData.userId, updatedValues);

            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 4000);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }

    }, [formState]);

    const hasChanges = () => {
        const currentValues = formState.inputValues;

        return currentValues.chatName != chatData.chatName;
    }
    
    return (
        <PageContainer>
            <PageTitle text="Chat Settings" />

            <ScrollView contentContainerStyle={styles.scrollView}>
                <ProfileImage
                    showEditButton={true}
                    size={80}
                    chatId={chatId}
                    userId={userData.userId}
                    uri={chatData.chatImage}
                />
                <Input
                    id="chatName"
                    label="Chat Name"
                    autoCapitalize="none"
                    initialValue={chatData.chatName}
                    allowEmpty={false}
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities["chatName"]}
                />

                {
                    isLoading ? 
                    <ActivityIndicator size={'small'} color={colors.primary} /> :
                    hasChanges() && <SubmitButton 
                        title="Save Changes"
                        color={colors.primary}
                        onPress={saveHandler}
                        disabled={!formState.formIsValid}
                    />
                }

            </ScrollView>
        </PageContainer>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollView: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ChatSettingsScreen;