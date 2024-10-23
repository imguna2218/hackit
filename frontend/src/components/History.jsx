import React, { useEffect, useState } from 'react'

export default function ChatInterface({ data }) {


  return (
    <div className="bg-gray-900 p-6 mx-auto rounded-lg shadow-lg w-full">
      <h1 className="text-2xl font-bold text-center mb-4 text-white">Conversation History</h1>
      <div className="space-y-4">
        {data?.map((item, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <div className="flex justify-end">
              <div className="bg-green-700 text-white p-3 rounded-lg shadow-md max-w-xs">
                {/* <p className="text-sm font-semibold mb-1">User</p> */}
                <p>{item.prompt}</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-black text-white p-3 rounded-lg shadow-md max-w-xs">
                {/* <p className="text-sm font-semibold mb-1">AI</p> */}
                <p>{item.response}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}