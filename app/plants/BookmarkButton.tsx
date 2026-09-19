"use client";
import {useEffect,useState} from "react";
import {BOOKMARKS_STORAGE_KEY,isBookmarked,readBookmarks,toggleBookmark} from "../../lib/bookmarks";
import {logPlantActivity} from "../../lib/activity-client";
export default function BookmarkButton({plantId}:{plantId:string}){
 const [saved,setSaved]=useState(false);
 useEffect(()=>{setSaved(isBookmarked(readBookmarks(),plantId));},[plantId]);
 function handleClick(){const next=toggleBookmark(readBookmarks(),plantId);window.localStorage.setItem(BOOKMARKS_STORAGE_KEY,JSON.stringify(next));setSaved(next.includes(plantId));logPlantActivity(plantId,"bookmarked");window.dispatchEvent(new CustomEvent("dravyaguna-bookmarks-changed"));}
 return <button className="button secondary" type="button" onClick={handleClick} aria-pressed={saved}>{saved?"★ Saved":"☆ Save plant"}</button>;
}