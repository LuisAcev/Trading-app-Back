import { response } from "express";

export const calculatorController = (req, res= response) =>{

    res.json({
        msn: "calulator API !!!"
    })
}