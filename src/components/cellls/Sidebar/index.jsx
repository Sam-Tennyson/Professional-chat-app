// libs
import { faCircle, faSearch, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { v4 as uuid } from "uuid";

// firebase
import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { signOut } from 'firebase/auth';

// constants && utils
import { COLLECTIONS, STRINGS_DATA } from '../../../shared/Constants';
import { UTILIES } from '../../../shared/utils';

// actions
import { setChatId, setUpdatedToken, setUserData } from '../../../redux/Actions/Auth';
import CommonSearch from '../../atoms/CommonSearch';

// styles
import "./style.css"
import Snackbar from '../../../shared/Snackbar';

const Sidebar = (props) => {

    const { setSelectedUser, setProfileClick } = props
    const dispatch = useDispatch();

    const [data, setData] = useState([])
    const [search, setSearch] = useState("");
    const dataRed = useSelector((state) => state?.auth?.user_data) || []
    const sender_Id_Red = useSelector((state) => state?.auth?.sender_id)

    const resetAuth = () => {
        dispatch(setUserData(STRINGS_DATA.EMPTY_STRING))
        dispatch(setUpdatedToken(STRINGS_DATA.EMPTY_STRING))
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth); // Sign out the user
            resetAuth()
            console.log("User signed out");
            // Perform any other tasks you want after signing out, such as redirecting to a different page.
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    useEffect(() => {
        const q = query(
            collection(db, COLLECTIONS.REGISTER_USER),
            where('uid', '!=', sender_Id_Red),
            orderBy("uid"),
            limit(50)
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });
            const sortedMessages = fetchedMessages.toSorted(
                (a, b) => a.createdAt - b.createdAt
            );
            setData(sortedMessages);
        });
        return () => unsubscribe;
    }, []);

    useEffect(() => {
        const getChannels = () => {
            const unsub = onSnapshot(doc(db, COLLECTIONS.USER_CHAT_DATA, dataRed?.uid), (doc) => {
                console.log(doc.data())
                let dataa = doc.data()
                console.log(Object.entries(dataa))
                // setData(Object.entries(dataa))
                // doc.exists() && setVisible(true)
            });
            return () => {
                unsub();
            };
        };
        dataRed?.uid && getChannels();
    }, [dataRed?.uid]);

    const handleClick = async (data) => {
        setSelectedUser(data)
        // const combinedId = `${sender_Id_Red}_${data?.uid}`
        const combinedId = sender_Id_Red > data?.uid
            ? sender_Id_Red + data?.uid
            : data?.uid + sender_Id_Red

        let payload = {
            receiver_id: data?.uid,
            chat_id: combinedId
        }
        dispatch(setChatId(payload))
        console.log(combinedId, combinedId.includes(sender_Id_Red), combinedId.includes(data?.uid));
        try {

            const res = await getDoc(doc(db, COLLECTIONS.CONVERSATIONS, combinedId)); // com_id
            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, COLLECTIONS.CONVERSATIONS, combinedId), { messages: [] });

                // create user chats
                await updateDoc(doc(db, COLLECTIONS.USER_CHAT_DATA, dataRed?.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: data?.uid,
                        displayName: data?.displayName,
                        photoURL: data?.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) { 
            Snackbar.error(err?.message)
        }
    }

    const handleSearch = async () => {
        debugger;
        const q = query(
            collection(db, COLLECTIONS.REGISTER_USER),
            search && where("displayName", "==", search)
        )
        try {
            const fetchedMessages = [];
            const querySnapShot = await getDocs(q)
            querySnapShot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.uid });
            });
            console.log(fetchedMessages);
            const sortedMessages =  Array.isArray(fetchedMessages) && fetchedMessages?.length && fetchedMessages?.toSorted(
                (a, b) => a.createdAt - b.createdAt
            );
            setData(sortedMessages);

        } catch (e) {
            console.log(e);
        }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    console.log(data);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap profile-header mb-2">
                <i
                    onClick={() => {
                        setSelectedUser(STRINGS_DATA.EMPTY_STRING)
                        setProfileClick(true)
                    }}
                >
                    <img
                        src={dataRed?.photoURL}
                        alt="user-photo"
                    />
                </i>
                <i className="fa fa-signout rounded border px-3 cursor-pointer"
                    onClick={handleSignOut}
                ><FontAwesomeIcon icon={faSignOut} /></i>

            </div>
            <CommonSearch
                handleKey={handleKey}
                onChange={(e) => setSearch(e.target.value)}
                search={search}
                handleSearch={() => search && handleSearch}
            />

            <ul className="list-unstyled chat-list mt-2 mb-0">
                {data?.length ? (<>
                    {data?.map((data) => (
                        <li className="clearfix d-flex justify-content-start align-items-center" key={data?.id}
                            onClick={() => handleClick(data)}
                        >
                            <img src={data?.photoURL} alt="avatar" />
                            <div className="about">
                                <div className="name">{data?.displayName}</div>
                                <div className="status"> <FontAwesomeIcon icon={faCircle} /> {moment(UTILIES.secondsToDate(data?.createdAt?.seconds)).format("LT")}
                                    &nbsp;{moment(UTILIES.secondsToDate(data?.createdAt?.seconds)).fromNow()}</div>
                            </div>
                        </li>
                    ))}
                </>) : (<div className='d-flex justify-content-center align-items-center'>No user found</div>)}

                {/* {data?.length ? (<>
                    {data?.map((data) => (
                        <>
                            <li className="clearfix d-flex justify-content-start align-items-center" key={data?.id}
                                onClick={() => handleClick(data)}
                            >
                                <img src={data?.[1]?.userInfo?.photoURL} alt="avatar" />
                                <div className="about">
                                    <div className="name">{data?.[1]?.userInfo?.displayName}</div>
                                    <div className="status"> <FontAwesomeIcon icon={faCircle} /> {moment(UTILIES.secondsToDate(data?.[1]?.date?.seconds)).format("LT")}
                                        &nbsp;{moment(UTILIES.secondsToDate(data?.createdAt?.seconds)).fromNow()}</div>
                                </div>
                            </li> 
                        </>
                    ))}
                </>) : (<div className='d-flex justify-content-center align-items-center'>No user found</div>)} */}


            </ul>

        </>
    )
}

export default Sidebar