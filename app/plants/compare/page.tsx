"use client";

import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {plantCatalog} from "../../../lib/plant/catalog";
import type {Plant} from "../../../lib/plant/types";

export default function PlantComparePage(){
 const [selected,setSelected]=useState<string[]>(plantCatalog.slice(0,2).map((p)=>p.slug));

 useEffect(()=>{
  const value=new URLSearchParams(window.location.search).get("plants");
  if(!value)return;
  const requested=value.split(",").map((item)=>item.trim()).filter(Boolean);
  const valid=requested.filter((slug)=>plantCatalog.some((plant)=>plant.slug===slug)).slice(0,4);
  if(valid.length)setSelected(valid);
 },[]);

 const plants=useMemo<Plant[]>(()=>selected.map((slug)=>plantCatalog.find((p)=>p.slug===slug)).filter((plant):plant is Plant=>Boolean(plant)),[selected]);

 function toggle(slug:string){
  setSelected((current)=>current.includes(slug)?current.filter((item)=>item!==slug):current.length<4?[...current,slug]:current);
 }

 return <main className="shell page"><Link href="/plants">← Plant Catalog</Link><header className="page-heading"><span className="eyebrow">STUDY TOOL</span><h1>Plant Comparison</h1><p>Select up to four plants and compare identity, taxonomy, useful parts and Dravyaguna profile in one view.</p></header><section className="filters" aria-label="Choose plants">{plantCatalog.map((plant)=><label className="chip" key={plant.slug}><input type="checkbox" checked={selected.includes(plant.slug)} onChange={()=>toggle(plant.slug)}/> {plant.names.sanskrit?.[0]||plant.identity.botanicalName}</label>)}</section><div className="comparison-grid">{plants.map((plant)=><article className="feature-card" key={plant.id}><span className="eyebrow">{plant.status}</span><h2><i>{plant.identity.botanicalName}</i></h2><p><strong>Family:</strong> {plant.taxonomy.family||"Pending"}</p><p><strong>Useful parts:</strong> {plant.study?.usefulParts?.join(", ")||"Pending"}</p><p><strong>Rasa:</strong> {plant.study?.rasa?.join(" · ")||"Pending"}</p><p><strong>Guna:</strong> {plant.study?.guna?.join(" · ")||"Pending"}</p><p><strong>Virya:</strong> {plant.study?.virya||"Pending"}</p><p><strong>Vipaka:</strong> {plant.study?.vipaka||"Pending"}</p><p><strong>Karma:</strong> {plant.study?.karma?.join(" · ")||"Pending"}</p><Link href={"/plants/"+plant.slug}>Open dossier →</Link></article>)}</div></main>;
}