import React from 'react'
import { motion } from "framer-motion";
import "./style.css"
import { IMAGES } from '../../../shared/Images';

const Gossip = () => {
	return (
		<>
			<motion.div className="text-center gossip-class mb-0"

				// initial={{  y: 50}}
				// animate={{ y: -10 }}
				// transition={{  type: "spring", stiffness: 120 }}	

			>
				{/* Gossip ...! */}
				{/* <img src={IMAGES.gossip_image} alt="gossip_image" /> */}
			</motion.div>
		</>
	)
}

export default Gossip