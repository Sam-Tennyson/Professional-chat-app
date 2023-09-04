
import React from 'react';
import EmojiPicker from 'emoji-picker-react';
 
export default function ReactEmoji(props) {
   
    const {onEmojiClick} = props;
 
    return (
        <>
            {/* <Picker onEmojiClick={onEmojiClick} /> */}
            <EmojiPicker
                height={500} 
                width={"100%"} 
                emojiStyle='google'
                lazyLoadEmojis={true}
                onEmojiClick={onEmojiClick}
            />
        </>
    );
};