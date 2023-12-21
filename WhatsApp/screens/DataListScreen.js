import React, { useEffect } from "react";
import { FlatList, Text } from "react-native";
import PageContainer from "../components/PageContainer";
import { Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import DataItem from "../components/DataItem";

const DataListScreen = props => {

    const storedUsers = useSelector(state => state.users.storedUsers);
    const userData = useSelector(state => state.auth.userData);

    const { title, data, type, chatId } = props.route.params;

    useEffect(() => {
        props.navigation.setOptions({ headerTitle: title })
    }, [title])

    return (
        <PageContainer>
            <FlatList
                data={data}
                keyExtractor={item => item}
                renderItem={(itemData) => {
                    let key, onPress, image, title, subtitle, itemType;

                    if (type === "users") {
                        const uid = itemData.item;
                        const currentUser = storedUsers[uid];

                        if (!currentUser) return;

                        const isLoggedInUser = uid === userData.userId;

                        key = uid;
                        image = currentUser.profilePicture;
                        title = `${currentUser.firstName} ${currentUser.lastName}`;
                        subtitle = currentUser.about;
                        itemType = isLoggedInUser ? undefined : "link";
                        onPress = isLoggedInUser ? undefined : () => props.navigation.navigate("Contact", { uid, chatId });
                    }

                    return <DataItem
                        key={key}
                        onPress={onPress}
                        image={image}
                        title={title}
                        subtitle={subtitle}
                        type={itemType}
                    />
                }}
            />
        </PageContainer>
    )
};

export default DataListScreen;