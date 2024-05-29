// import { Badge } from "@/components/ui/badge"

interface TopicMetadataProps {
  badges: string[]
}

export default function TopicMetadata({ badges }: TopicMetadataProps) {
  return (
    <article className="prose prose-gray max-w-6xl mx-auto">
      <div className="flex items-center space-x-4 bg-white p-4 bg-white shadow rounded-lg p-4 rounded-md dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <ClockIcon className="text-gray-500" />
          <span className="text-sm font-medium">3 min read</span>
        </div>
        <div className="flex items-center space-x-2">
          {badges.map((badge, index) => (
            // <button key={index}><Badge variant="secondary">{badge}</Badge></button>
            <button key={index}><a>{badge}</a></button>
          ))}
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          <button><TwitterIcon className="text-blue-500" /></button>
        </div>
      </div>
    </article>
  )
}


function ClockIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function TwitterIcon(props: any) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
