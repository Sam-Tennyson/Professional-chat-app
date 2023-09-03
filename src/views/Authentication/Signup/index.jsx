// libs
import { NavLink, useNavigate } from 'react-router-dom';
import Snackbar from '../../../shared/Snackbar';
import React, { useState } from 'react';

// firebase
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage"
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, storage } from '../../../firebase';

// constant
import { COLLECTIONS, STRINGS_DATA } from '../../../shared/Constants';
import { ROUTES_CONSTANT } from '../../../shared/Routes';
import CommonUploadButton from '../../../components/atoms/CommonUploadButton';
import { useDispatch } from 'react-redux';
import { startLoader, stopLoader } from '../../../redux/Actions/Auth';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState(STRINGS_DATA.EMPTY_STRING)
    const [password, setPassword] = useState(STRINGS_DATA.EMPTY_STRING);
    const [img, setImg] = useState(STRINGS_DATA.EMPTY_STRING)
    const [displayName, setDisplayName] = useState(STRINGS_DATA.EMPTY_STRING)

    const resetData = () => {
        setPassword(STRINGS_DATA.EMPTY_STRING)
        setImg(STRINGS_DATA.EMPTY_STRING)
        setEmail(STRINGS_DATA.EMPTY_STRING)
        setDisplayName(STRINGS_DATA.EMPTY_STRING)
    }

    const getImageURL = async (data) => {
        
        if (!displayName) {
            Snackbar.error("User name is required");
            return
        }

        dispatch(startLoader())
        try {
            const date_Id = new Date().getTime();
            const storageRef = ref(storage, `${displayName}_${date_Id}`) // image name
            const uploadTaskSnapshot = await uploadBytesResumable(storageRef, data[0]);
            const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
            dispatch(stopLoader())
            setImg(downloadURL)
        } catch (error) {
            dispatch(stopLoader())
            Snackbar.error(error.message);
        }
    }
    
    const onSubmit = async (e) => {
        e.preventDefault()

        if (!img || !email || !password || !displayName) {
            Snackbar.error("Required fields are missing")
            return
        };
        
        try {
            dispatch(startLoader())
            const res = await createUserWithEmailAndPassword(auth, email, password);
    
            //Update profile
            await updateProfile(res.user, {
                displayName,
                photoURL: img,
            });
    
            let obj_Data = {
                uid: res.user.uid,
                displayName,
                photoURL: img,
                createdAt: serverTimestamp(),
                email,
            }
            
            //create user on firestore
            await setDoc(doc(db, COLLECTIONS.REGISTER_USER, res.user.uid), obj_Data);
            await setDoc(doc(db, COLLECTIONS.USER_CHAT_DATA, res.user.uid), {});
            dispatch(stopLoader())
            navigate({ pathname: ROUTES_CONSTANT.LOGIN })
            resetData()
            
        } catch (error) {
            resetData()
            Snackbar.error(error.message);
            dispatch(stopLoader())
        }

    }

    return (
        < >
            {/* <section> */}
                <div className="mt-4 commonBox p-3 ">
                    <div className="row">
                        <div className="col-12 m-auto">
                            <div className="card-group mb-0">
                                <div className="card p-4">
                                    <div className="card-body login-class">
                                    <h1> Sign up </h1>
                                    <p>Registration new account</p>
                                    <form id="registration">
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                label="Username"
                                                id={"username"}
                                                className='form-control'
                                                value={displayName}
                                                onChange={(e) => setDisplayName(e.target.value)}
                                                required
                                                placeholder="Enter your username"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="email"
                                                id="email-address"
                                                label="Email address"
                                                className='form-control'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="password"
                                                label="Create password"
                                                id={"password"}
                                                className='form-control'
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                placeholder="Enter your password"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <CommonUploadButton
                                                imageUrl={img}
                                                id={'image_data'}
                                                name={'image_data'}
                                                handleDelete={() => {
                                                    setImg(null)
                                                }}
                                                handleView={() => window.open(img, '_blank')}
                                                onChange={(e) => {
                                                    let selectedFile = e.target.files;
                                                    console.log(selectedFile);
                                                    if (selectedFile?.length) {
                                                        // setImg(selectedFile)
                                                        getImageURL(selectedFile)
                                                    }
                                                }}
                                            
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className='my-btn'
                                            id={"submit-button"}
                                            onClick={onSubmit}
                                        >
                                            Sign up
                                        </button>

                                    </form>

                                    </div>
                                </div>
                                <div className="card text-white side-color py-5 d-none d-sm-block make-flex-center" >
                                    <div className="card-body text-center">
                                        <div>
                                            <h2>Welcome</h2>
                                            <p>
                                                Already have an account?{' '}
                                            </p>
                                                <button
                                                    type="button"
                                                    onClick={() => navigate({ pathname: ROUTES_CONSTANT.LOGIN })}
                                                    className="my-btn mt-3"
                                                >{STRINGS_DATA.LOGIN}
                                                </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* </section> */}
        </>
    )
}

export default Signup