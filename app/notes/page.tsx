"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { plantCatalog } from "../../lib/plant/catalog";
import { NOTES_STORAGE_KEY, readNotes, saveNote, type PlantNote } from "../../lib/notes";

export default function NotesPage() {
  const [notes,setNotes]=useState<PlantNote[]>([]);
  const [query,setQuery]=useState("");
  const [editing,setEditing]=useState<string|null>(null);
  const [draft,setDraft]=useState("");

  useEffect(()=>{
    const sync=()=>setNotes(readNotes());
    sync();
    window.addEventListener("storage",sync);
    window.addEventListener("dravyaguna-notes-changed",sync);
    return ()=>{window.removeEventListener("storage",sync);window.removeEventListener("dravyaguna-notes-changed",sync)};
  },[]);

  const items=useMemo(()=>notes.map(note=>({note,plant:plantCatalog.find(p=>p.id===note.plantId)})).filter(x=>x.plant && (!query || [x.plant!.identity.botanicalName,...(x.plant!.names.sanskrit||[]),x.note.text].join(" ").toLowerCase().includes(query.toLowerCase()))).sort((a,b)=>b.note.updatedAt.localeCompare(a.note.updatedAt)),[notes,query]);

  function update(note:PlantNote){
    const next=saveNote(notes,note.plantId,draft);
    window.localStorage.setItem(NOTES_STORAGE_KEY,JSON.stringify(next));
    setNotes(next); setEditing(null); setDraft("");
    window.dispatchEvent(new CustomEvent("dravyaguna-notes-changed"));
  }
  function remove(plantId:string){
    const next=saveNote(notes,plantId,"");
    window.localStorage.setItem(NOTES_STORAGE_KEY,JSON.stringify(next));
    setNotes(next);
  }

  return <main className="shell page">
    <header className="page-heading"><span className="eyebrow">PERSONAL STUDY NOTES</span><h1>My Notes</h1><p>View, search, edit and delete your plant-specific revision notes. Notes are stored locally on this device.</p></header>
    <div className="filters"><input aria-label="Search notes" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search plants or notes..." /></div>
    {items.length ? <section className="grid" aria-label="Plant notes">{items.map(({note,plant})=><article className="feature-card" key={note.id}>
      <span className="eyebrow">UPDATED {new Date(note.updatedAt).toLocaleString()}</span>
      <h2><i>{plant!.identity.botanicalName}</i></h2><p>{plant!.names.sanskrit?.join(" · ")}</p>
      {editing===note.id ? <><textarea rows={7} value={draft} onChange={e=>setDraft(e.target.value)} aria-label="Edit note" /><div className="actions"><button onClick={()=>update(note)}>Save</button><button className="button secondary" onClick={()=>{setEditing(null);setDraft("")}}>Cancel</button></div></> : <><p className="note-preview">{note.text}</p><div className="actions"><Link className="button secondary" href={"/plants/"+plant!.slug}>Open plant</Link><button className="button secondary" onClick={()=>{setEditing(note.id);setDraft(note.text)}}>Edit</button><button className="button secondary" onClick={()=>remove(plant!.id)}>Delete</button></div></>}
    </article>)}</section> : <section className="notice"><h2>{query?"No matching notes":"No notes yet"}</h2><p>{query?"Try another search term.":"Open any plant dossier and add notes to build your revision notebook."}</p><Link className="button" href="/plants">Browse plants →</Link></section>}
  </main>;
}
