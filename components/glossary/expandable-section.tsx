'use client';
import React, { useState } from "react";

interface ExpandableContentProps {
  title: string;
  preview: string;
  children: React.ReactNode;
}

export default function ExpandableSection({ title, preview, children }: ExpandableContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mx-auto mb-4">
      <div className="border-l-4 border-[#635FC7] bg-[#F7F8FA] p-6 rounded-lg">
      <div>
            <h4 className="mt-0 mb-0" style={{display: 'flex'}}><BookIcon className="text-[#635FC7] mr-3" /> {title}</h4>

            </div>
        <div className="flex items-start space-x-4">

          
          <div>
            <p>{preview}</p>
          </div>
        </div>
        {isExpanded && <div className="mt-4">{children}</div>}
        <button className="text-blue-500 underline focus:outline-none" onClick={handleToggle}>
          {isExpanded ? 'See Less' : 'See More'}
        </button>
      </div>
    </div>
  );
}


export function BookIcon(props: any) {
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
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    );
  }
  