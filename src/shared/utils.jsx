export const UTILIES = {
    secondsToDate: (seconds) => {
        const milliseconds = seconds * 1000; // Convert seconds to milliseconds
        const date = new Date(milliseconds);
        return date;
    },
    
    getTimeInSeconds: () => new Date().getTime(),

    fetchChatForUsers: async (chatId, user1Id, user2Id) => {
        const chatData = await getChatData(chatId);
        
        if (chatData && (chatData.participants.includes(user1Id) || chatData.participants.includes(user2Id))) {
          const messages = await getChatMessages(chatId);
          return { chatData, messages };
        }
      
        return null; // Chat not found or user not part of the chat
    }
}

