interface SummaryProps {
  summary: string;
}

export default function Summary( {summary} : SummaryProps ) {
  return (
    <div className="bg-[#faf9f7] p-4 rounded-lg border-l-4 border-[#e77429] mb-6">
      <div className="flex items-start space-x-2">
        <div className="flex items-center">
          <TextIcon className="text-[#e77429] w-5 h-5" />
        </div>
        <div>
          <h5 className="text-lg font-semibold text-[#000]">Quick Summary</h5>
          <p className="text-sm">
            {summary}
          </p>
        </div>
      </div>
    </div>
  )
}

function TextIcon(props: any) {
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
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  )
}
