const {Router}=require('express');
const router=Router();
const rentalinfo=require('../Rentalinfo');


//  Get rentalinfo
router.get('/',(req,res)=>{
    res.json(rentalinfo)
})
module.exports=router;
