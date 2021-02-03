export async function getChats(props){
    return [
        {chatId: '123', chatName: "JR Devs", latestMessage: {username: 'Gal', text: "Hi there Group"} }, // Group chat
        {chatId: '456', withUser:{userId: 'abc', gender: 'm', username:"Dan"}, latestMessage: {username:'Amit', text: "Welcome to the club, Private chat"}}, // Private
        {chatId: undefined, withUser:{userId: 'defgeddd', gender: 'm', username:"Ben"}} // Private, no chats yet
    ]
}

export async function getChat(props){
    let {chatId, userId, withUserId} = props;
    // chat already exist
    if(chatId){

    } else { // chat doesn't exsist
        // create new private chat between userId and withUserId
    }

    return [{text: "hello", user:"Gil", userId:"123"}, {text: "hi", user:"Dana", userId:"456"}, {text: "hi", user:"Gil", userId:"123"}]
}

export async function addMessage(props){
    let {message, chatId, fromUserId, toUserId} = props
    return
}