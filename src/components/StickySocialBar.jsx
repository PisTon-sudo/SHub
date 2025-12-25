import React, {useEffect, useState} from 'react';
import { EnvelopeIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

export default function StickySocialBar(){
  return (
    <div className="hidden md:flex flex-col gap-3 fixed left-4 top-1/3 z-40" aria-hidden="false">
      <a aria-label="Visit our Facebook" href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-white dark:bg-slate-800 p-2 rounded shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-orange-300">
        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z"/></svg>
      </a>
      <a aria-label="Visit our Twitter" href="https://twitter.com" target="_blank" rel="noreferrer" className="bg-white dark:bg-slate-800 p-2 rounded shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-orange-300">
        <svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.9c-.6.3-1.2.5-1.9.6.7-.4 1.1-1 1.3-1.7-.6.4-1.3.6-2.1.8C18.5 4.9 17.6 4.5 16.6 4.5c-1.7 0-3 1.4-3 3 0 .2 0 .4.1.6-2.5-.1-4.7-1.4-6.2-3.3-.3.6-.5 1.4-.5 2.1 0 1.4.7 2.6 1.8 3.4-.5 0-1-.2-1.5-.4v.1c0 2 1.4 3.6 3.2 4-.4.1-.8.1-1.3.1-.3 0-.6 0-.9-.1.6 2 2.3 3.5 4.2 3.6-1.5 1.2-3.4 1.9-5.4 1.9-.4 0-.7 0-1.1-.1C6.8 21 9.4 22 12.2 22c7.3 0 11.3-6 11.3-11.3 0-.2 0-.5 0-.7.8-.6 1.4-1.4 2-2.3-.7.3-1.4.5-2.2.6z"/></svg>
      </a>
      <a aria-label="Email us" href="mailto:hello@example.com" className="bg-white dark:bg-slate-800 p-2 rounded shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-orange-300">
        <EnvelopeIcon className="w-5 h-5 text-rose-500" />
      </a>
      <a aria-label="Open chat" href="#chat" className="bg-white dark:bg-slate-800 p-2 rounded shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-orange-300">
        <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-500" />
      </a>
    </div>
  );
}
