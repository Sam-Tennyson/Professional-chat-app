// libs
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// firebase
import {
    onSnapshot,
    doc,
} from "firebase/firestore";
import { db } from "../../../firebase";

// constants
import { COLLECTIONS, STRINGS_DATA } from "../../../shared/Constants";
import { setChatId } from "../../../redux/Actions/Auth";

const ChatHistory = () => {

    const dispatch = useDispatch();
    const mountRef = useRef(true);

    const userReducer = useSelector((state => state?.auth.user_data))
    const chat_Id_Red = useSelector((state) => state?.auth?.chat_id)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        // Scroll to the bottom when new messages are added
        document.querySelector("#ul-chat-history").scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

   
    useEffect(() => {
        // const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        if (chat_Id_Red) {
            const unsubscribe = onSnapshot(doc(db, COLLECTIONS.CONVERSATIONS, chat_Id_Red), (doc) => {
                setMessages(doc.data()?.messages)
                // doc.exists() && setVisible(true)
            });
            return () => unsubscribe;
        }
    }, [chat_Id_Red]);

    return (
        <>
            <ul className="m-b-0" id="ul-chat-history">
                {messages?.length ? (<>
                    {messages.map((item) => (
                        <li className="clearfix" key={item?.id}>
                            <div className={`message other-message  ${ userReducer?.uid === item?.senderId?"float-right": ""}`}> {item?.content} </div>
                        </li>
                    ))}
                </>):<div className="text-center">Be the first to start conversation</div>}
            </ul>
        </>
    )
}

export default ChatHistory