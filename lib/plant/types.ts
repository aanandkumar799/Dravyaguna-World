export type PlantStatus = "draft"|"review"|"verified"|"deprecated";
export type PlantPart = "whole-plant"|"root"|"stem"|"bark"|"leaf"|"flower"|"fruit"|"seed"|"rhizome"|"bulb"|"tuber"|"latex"|"resin"|"other";
export interface PlantNameSet { sanskrit?:string[]; common?:string[]; regional?:string[]; synonyms?:string[] }
export interface PlantSource { id:string; title:string; type:"classical"|"modern"|"taxonomic"|"image"|"other"; author?:string; year?:number; locator?:string; url?:string; verification:"unverified"|"reviewed"|"verified" }
export interface PlantImage { id:string; part:string; url?:string; alt:string; sourceId?:string; license?:string; verification:"unverified"|"reviewed"|"verified"|"rejected" }
export interface Plant {
 id:string; slug:string;
 identity:{botanicalName:string; authority?:string; acceptedNameStatus?:string};
 names:PlantNameSet;
 taxonomy:{kingdom?:string;family?:string;genus?:string;species?:string};
 status:PlantStatus;
 parts?:PlantPart[];
 study?:{habit?:string;morphology?:string;habitat?:string;distribution?:string;identificationFeatures?:string[];usefulParts?:string[];rasa?:string[];guna?:string[];virya?:string;vipaka?:string;karma?:string[];dosha?:string[]};
 sources:PlantSource[];
 images:PlantImage[];
}