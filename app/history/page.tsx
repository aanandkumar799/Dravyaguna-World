"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { plantCatalog } from "../../lib/plant/catalog";
import { ACTIVITY_STORAGE_KEY, readActivity, type PlantActivity } from "../../lib/activity";

const labels: Record<PlantActivity["type"], string> = {
  viewed:"Viewed", mcq:"MCQ", flashcard:"Flashcard", viva:"Viva", bookmarked:"Saved", noted:"Note updated"
};

export default function HistoryPage() {
  const [activity,setActivity]=useState<PlantActivity[]>([]);
  const [filter,setFilter]=useState<"all"|PlantActivity["type"]>("all");
  useEffect(()=>{
    const sync=()=>setActivity(readActivity());
    sync();
    window.addEventListener("storage",sync);
    window.addEventListener("dravyaguna-activity-changed",sync);
    return ()=>{window.removeEventListener("storage",sync);window.removeEventListener("dravyaguna-activity-changed",sync)};
  },[]);
  const visible=useMemo(()=>activity.filter(a=>filter==="all"||a.type===filter).map(a=>({...a,plant:plantCatalog.find(p=>p.id===a.plantId)})).filter(a=>a.plant),[activity,filter]);
  const clear=()=>{window.localStorage.removeItem(ACTIVITY_STORAGE_KEY);setActivity([]);window.dispatchEvent(new CustomEvent("dravyaguna-activity-changed"));};
  return <main className="shell page">
    <header className="page-heading"><span className="eyebrow">STUDY HISTORY</span><h1>Recently Viewed & Activity</h1><p>Review your recent plant study activity. This history is stored locally on this device.</p></header>
    <div className="actions" role="toolbar" aria-label="Activity filters">
      {(["all","viewed","mcq","flashcard","viva","bookmarked","noted"] as const).map(item=><button key={item} className={"button secondary"+(filter===item?" active":"")} aria-pressed={filter===item} onClick={()=>setFilter(item)}>{item==="all"?"All":labels[item]}</button>)}
      {activity.length>0&&<button className="button secondary" onClick={clear}>Clear history</button>}
    </div>
    {visible.length?<section className="grid" aria-label="Study history">{visible.map(a=><article className="feature-card" key={a.id}>
      <span className="eyebrow">{labels[a.type]} · {new Date(a.occurredAt).toLocaleString()}</span>
      <h2><i>{a.plant!.identity.botanicalName}</i></h2>
      <p>{a.plant!.names.sanskrit?.join(" · ")}</p>
      <p>{a.plant!.taxonomy.family || "Family pending review"}</p>
      <Link className="button" href={"/plants/"+a.plant!.slug}>Open dossier →</Link>
    </article>)}</section>:<section className="notice"><h2>No activity found</h2><p>{filter==="all"?"Open a plant or start a study session to build your history.":"There are no recorded activities of this type yet."}</p><Link className="button" href="/plants">Browse plants →</Link></section>}
  </main>;
}
