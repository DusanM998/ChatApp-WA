import React, { useRef } from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../constants/colors';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import uuid from 'react-native-uuid';
import * as Clipboard from 'expo-clipboard';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { starMessage } from '../utils/actions/chatActions';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

function formatAmPm(dateString) {
    const date = new Date(dateString);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
}

const MenuItem = props => {

    const Icon = props.iconPack ?? Feather;

    return (
        <MenuOption onSelect={props.onSelect}>
            <View style={styles.menuItemContainer}>
                <Text style={styles.menuText}>{props.text}</Text>
                <Icon name={props.icon} size={18} />
            </View>
        </MenuOption>
    )
}

const Bubble = props => {
    const { text, type, messageId, chatId, userId, date, setReply, replyingTo, name, imageUrl } = props;

    const starredMessages = useSelector(state => state.messages.starredMessages[chatId] ?? {});
    const storedUsers = useSelector(state => state.users.storedUsers);

    const bubbleStyle = { ...styles.container };
    const textStyle = { ...styles.text };
    const wrapperStyle = { ...styles.wrapperStyle }

    const menuRef = useRef(null);
    const id = useRef(uuid.v4());

    let Container = View;
    let isUserMessage = false;
    const dateString = date && formatAmPm(date);

    switch (type) {
        case "system":
            textStyle.color = '#65644A';
            bubbleStyle.backgroundColor = colors.beige;
            bubbleStyle.alignItems = 'center';
            bubbleStyle.marginTop = 10;
            break;
        case "error":
            bubbleStyle.backgroundColor = colors.red;
            textStyle.color = 'white';
            bubbleStyle.marginTop = 10;
            break;
        case "myMessage":
            wrapperStyle.justifyContent = 'flex-end';
            bubbleStyle.backgroundColor = '#E7FED6';
            bubbleStyle.maxWidth = '90%';
            bubbleStyle.marginTop = 10;
            Container = TouchableWithoutFeedback;
            isUserMessage = true;
            break;
        case "otherMessages":
            wrapperStyle.justifyContent = 'flex-start';
            bubbleStyle.maxWidth = '90%';
            bubbleStyle.marginTop = 10;
            Container = TouchableWithoutFeedback;
            isUserMessage = true;
            break;
        case "reply":
            bubbleStyle.backgroundColor = "#f2f2f2";
            break;
        case "info":
            bubbleStyle.backgroundColor = "white";
            bubbleStyle.alignItems = "center";
            textStyle.color = colors.textColor;
            break;
        default:
            break;
    }

    const copyToClipboard = async text => {
        try {
            await Clipboard.setStringAsync(text);
        } catch (error) {
            console.log(error);
        }
        
    }

    const isStarred = isUserMessage && starredMessages[messageId] !== undefined;
    const replyingToUser = replyingTo && storedUsers[replyingTo.sendBy];

    return (
        <View style={wrapperStyle}>
            <Container onLongPress={() => menuRef.current.props.ctx.menuActions.openMenu(id.current)} style={{width: '100%'}}>
                <View style={bubbleStyle}>

                    {
                        name && type !== "info" &&
                        <Text style={styles.name}>{name}</Text>
                    }

                    {
                        replyingToUser &&
                        <Bubble
                            type='reply'
                            text={replyingTo.text}
                            name={`${replyingToUser.firstName} ${replyingToUser.lastName}`}
                        />
                    }

                    {
                        !imageUrl &&
                        <Text style={textStyle}>
                            {text}
                        </Text>
                    }
                    

                    {
                        imageUrl &&
                        <Image source={{ uri: imageUrl }} style={styles.image} />
                    }

                    {
                        dateString && type !== "info" &&
                        <View style={styles.timeContainer}>
                            {isStarred && <AntDesign name='star' size={14} color={colors.yellow} style={{margin:2}} />}
                            <Text style={styles.time}>{dateString}</Text>
                        </View>
                    }

                    <Menu name={id.current} ref={menuRef}>
                        <MenuTrigger />
                        <MenuOptions>
                            <MenuItem text='Copy' icon={'copy'} onSelect={() => copyToClipboard(text)} />
                            <MenuItem
                                text={`${isStarred ? "Unfavorite" : "Favorite"} message`}
                                icon={isStarred ? 'staro' : 'star'}
                                iconPack={AntDesign}
                                onSelect={() => starMessage(messageId, chatId, userId)} />
                            <MenuItem text='Reply'
                                icon={'reply'}
                                iconPack={Entypo}
                                onSelect={setReply} />
                        </MenuOptions>
                    </Menu>
                </View>
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 5,
        marginBottom: 10,
        borderColor: '#E2DACC',
        borderWidth: 1
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    text: {
        fontFamily: 'regular',
        letterSpacing: 0.3
    },
    menuItemContainer: {
        flexDirection: "row",
        padding: 5,
    },
    menuText: {
        flex: 1,
        fontFamily: 'regular',
        letterSpacing: 0.3,
        fontSize: 16,
    },
    time: {
        fontFamily: 'regular',
        letterSpacing: 0.3,
        color: colors.grey,
        fontSize: 12,
        margin: 2
    },
    name: {
        fontFamily: "medium",
        letterSpacing: 0.3,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 5,
    }
})

export default Bubble;