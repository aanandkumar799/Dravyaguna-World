"use client";

import { useEffect, useState } from "react";

export default function OfflineStatus() {
  const [online,setOnline]=useState(true);
  useEffect(()=>{const update=()=>setOnline(navigator.onLine);update();window.addEventListener("online",update);window.addEventListener("offline",update);return()=>{window.removeEventListener("online",update);window.removeEventListener("offline",update)}},[]);
  if(online)return null;
  return <div className="offline-banner" role="status">You’re offline. Saved plants, notes and study history remain available on this device.</div>;
}
