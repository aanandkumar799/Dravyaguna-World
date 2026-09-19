"use client";
import {useEffect,useState} from "react";
import {NOTES_STORAGE_KEY,readNotes,saveNote} from "../../../lib/notes";
import {logPlantActivity} from "../../../lib/activity-client";
export default function PlantNotes({plantId}:{plantId:string}){
 const [text,setText]=useState(""); const [saved,setSaved]=useState(false);
 useEffect(()=>{setText(readNotes().find((n)=>n.plantId===plantId)?.text||"");},[plantId]);
 function persist(){const next=saveNote(readNotes(),plantId,text);window.localStorage.setItem(NOTES_STORAGE_KEY,JSON.stringify(next));setText(next.find((n)=>n.plantId===plantId)?.text||"");logPlantActivity(plantId,"noted");setSaved(true);window.setTimeout(()=>setSaved(false),1800);}
 return <section className="notice" aria-label="Personal plant notes"><h2>My notes</h2><p>Keep your own revision notes for this plant. Notes are stored locally on this device.</p><textarea value={text} onChange={(e)=>setText(e.target.value)} rows={6} placeholder="Add key points, mnemonics, exam notes, or questions for revision..." aria-label="Plant notes"/><div className="actions"><button type="button" onClick={persist}>{saved?"Saved":"Save notes"}</button>{text&&<button type="button" className="button secondary" onClick={()=>{setText("");const next=saveNote(readNotes(),plantId,"");window.localStorage.setItem(NOTES_STORAGE_KEY,JSON.stringify(next));}}>Clear</button>}</div></section>;
}