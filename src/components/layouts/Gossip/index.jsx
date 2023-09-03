import React from 'react'
import { motion } from "framer-motion";
import "./style.css"

const Gossip = () => {
	return (
		<>
			<motion.div className="text-center gossip-class mt-4"

				// initial={{  y: 50}}
				// animate={{ y: -10 }}
				// transition={{  type: "spring", stiffness: 120 }}	

			>
				Gossip ...!
			</motion.div>
		</>
	)
}

export default Gossip