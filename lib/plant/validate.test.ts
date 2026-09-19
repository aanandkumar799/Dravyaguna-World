import {describe,it,expect} from "vitest";
import {validatePlantRecord} from "./validate";
describe("plant validation",()=>{it("rejects missing identity",()=>expect(validatePlantRecord({} as any).length).toBeGreaterThan(0));it("accepts required identity fields",()=>expect(validatePlantRecord({id:"plant-x",slug:"x",identity:{botanicalName:"X"},names:{},taxonomy:{},status:"draft",sources:[],images:[]} as any)).toEqual([]));});
