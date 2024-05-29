import Link from "next/link"
import Image from "next/image"
import { Card } from "./ui/card"

export default function RelatedTopics() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Related topics</h2>
      <div className="grid grid-cols-4 gap-4">
        <Card className="border p-4 grid grid-rows-[auto,1fr,auto]">
          <div className="flex justify-center items-center mb-4">
            <Image 
              src="https://bitcoinmagazine.com/.image/t_share/MTg1Nzk2NTQ1NjUwOTU5NzY0/image13.png"
              alt="Thumbnail 1"
              layout="responsive"
              width={200}
              height={150}
              className="object-cover w-full"
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Coin Join</h3>
          </div>
          <Link className="text-indigo-600 hover:text-indigo-700 inline-flex items-center" href="#">
            Learn More
            <ArrowRightIcon className="ml-1 w-4 h-4" />
          </Link>
        </Card>
        <Card className="border p-4 grid grid-rows-[auto,1fr,auto]">
          <div className="flex justify-center items-center mb-4">
            <Image 
              src="https://allprivatekeys.com/static/img/anonymizer.png"
              alt="Thumbnail 2"
              layout="responsive"
              width={200}
              height={150}
              className="object-cover w-full"
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Common Input Ownership Heuristic</h3>
          </div>
          <Link className="text-indigo-600 hover:text-indigo-700 inline-flex items-center" href="#">
            Learn More
            <ArrowRightIcon className="ml-1 w-4 h-4" />
          </Link>
        </Card>
        <Card className="border p-4 grid grid-rows-[auto,1fr,auto]">
          <div className="flex justify-center items-center mb-4">
            <Image 
              src="https://miro.medium.com/v2/resize:fit:1400/1*dnXuS0443F6Mx-n519WbpA.png"
              alt="Thumbnail 3"
              layout="responsive"
              width={200}
              height={150}
              className="object-cover w-full"
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Partially Signed Bitcoin Transactions (PSBT)</h3>
          </div>
          <Link className="text-indigo-600 hover:text-indigo-700 inline-flex items-center" href="#">
            Learn More
            <ArrowRightIcon className="ml-1 w-4 h-4" />
          </Link>
        </Card>
        <Card className="border p-4 grid grid-rows-[auto,1fr,auto]">
          <div className="flex justify-center items-center mb-4">
            <Image 
              src="https://www.mdpi.com/electronics/electronics-13-00076/article_deploy/html/images/electronics-13-00076-g001.png"
              alt="Thumbnail 4"
              layout="responsive"
              width={200}
              height={150}
              className="object-cover w-full"
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Adaptor Signature</h3>
          </div>
          <Link className="text-indigo-600 hover:text-indigo-700 inline-flex items-center" href="#">
            Learn More
            <ArrowRightIcon className="ml-1 w-4 h-4" />
          </Link>
        </Card>
        {/* <Card className="border p-4 grid grid-rows-[auto,1fr,auto]">
          <div className="flex justify-center items-center mb-4">
            <Image 
              src="https://image.binance.vision/editor-uploads/3862b14074034f5ba73600717ff8e119.png"
              alt="Thumbnail 5"
              layout="responsive"
              width={200}
              height={150}
              className="object-cover w-full"
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Topic 5</h3>
          </div>
          <Link className="text-indigo-600 hover:text-indigo-700 inline-flex items-center" href="#">
            Learn More
            <ArrowRightIcon className="ml-1 w-4 h-4" />
          </Link>
        </Card> */}
      </div>
      <div className="flex justify-between items-center mt-8">
      {/* <span className="text-xs">Submit Feedback</span> */}
      {/* <Button className="bg-[#24292e] text-white px-6 py-2 rounded-full flex items-center shadow-md hover:bg-[#3f4448]">
      <span className="text-xs mr-2">Submit Feedback</span>
    </Button> */}
      </div>
    </div>
  )
}

function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
