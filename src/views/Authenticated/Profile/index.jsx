import React, { useEffect, useState } from 'react'
import { COLLECTIONS, RESPONSIVE, STRINGS_DATA } from '../../../shared/Constants'
import CommonUploadButton from '../../../components/atoms/CommonUploadButton'
import Snackbar from '../../../shared/Snackbar'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData, startLoader, stopLoader } from '../../../redux/Actions/Auth'
import { updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db, storage } from '../../../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Profile = (props) => {

	const {setProfileClick, setSelectedUser = () =>{}} = props

	const dispatch = useDispatch();

	const dataRed = useSelector((state) => state?.auth?.user_data)

	const [img, setImg] = useState(dataRed?.photoURL)
	const [displayName, setDisplayName] = useState(dataRed?.displayName)

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
		try {
			let obj_Data = {
				uid: dataRed.uid,
				displayName,
				photoURL: img,
				createdAt: serverTimestamp(),
			}
			
			if (!img) {
				delete obj_Data[photoURL]
			}


			if (!displayName) {
				delete obj_Data[displayName]
			}
			
			//create user on firestore
			dispatch(startLoader())
			
			//Update profile
            await updateProfile(dataRed, {
                displayName,
                photoURL: img,
            });
			
			dispatch(stopLoader())
		} catch(error) {
			Snackbar.error(error.message)
			dispatch(stopLoader())
		}

	}

	const [isMobile, setIsMobile] = useState(false)
    const handleWindowDimensions = () => {
		if (window.innerWidth <= RESPONSIVE.BREAKPOINT_MOBILE.MAX_WIDTH) {
			setIsMobile(true)
            return;
		}
        setIsMobile(false)
	}

	useEffect(() => {
		handleWindowDimensions()
	}, [])

	return (
		<>
			<div className="d-flex justify-content-end text-right">
				{/* <a className="btn btn-outline-info mx-2"><i className="fa fa-cogs"><FontAwesomeIcon icon={faCogs} /></i></a> */}

				<a className={`btn btn-outline-danger ${isMobile ? "": "d-none"} `} id="back-button"
					onClick={() => {
						setProfileClick(false)
						setSelectedUser(STRINGS_DATA.EMPTY_STRING)
					}}
				><i className="fa fa-cogs" > 
					<FontAwesomeIcon icon={faClose} />
				</i></a>
			</div>
			<div className="mt-4  ">
				<div className="row">
					<div className="col-12 m-auto">
						<div className="card-group mb-0">
							<div className="card p-4">
								<div className="card-body login-class">
									<h1> Profile </h1>
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
											disabled={!img && !displayName}
										>
											Update
										</button>

									</form>

								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile