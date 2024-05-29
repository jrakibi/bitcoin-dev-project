import Link from "next/link"
import Image from "next/image"

export default function RelatedTopic() {
  return (
    <div className="bg-white rounded-lg mb-6 mt-14">
      <h2 className="text-xl font-bold mb-2">Related Topics</h2>
      <div className="border border-gray-400 rounded-lg p-4" style={{ borderColor: 'gainsboro' }}>
        <h3 className="text-lg font-semibold">Common Input Ownership Heuristic</h3>
        <p className="text-gray-700" style={{ fontFamily: 'Roboto' }}>
        cdsvsfdgd
        </p> dfds

         <img
           alt="PayJoin Diagram"
           className="mt-4"
           src="https://miro.medium.com/v2/resize:fit:1400/1*dnXuS0443F6Mx-n519WbpA.png"
          //  src="https://bitcoinmagazine.com/.image/t_share/MTg1Nzk2NTQ1NjUwOTU5NzY0/image13.png"
           style={{
             objectFit: "cover",
           }}
         />
         <p className="text-yellow-600 font-bold mt-2">⚠ INTERACTION</p>
       </div>
     </div>
  )
}
