import b from "./index"
import * as mock from './a'

describe("index.js",()=>{
 
    it("b  function",()=>{
        console.log(mock)
        jest.spyOn(mock,'default').mockImplementation(()=>{
            console.log("test")
        })
        b()
    })
})