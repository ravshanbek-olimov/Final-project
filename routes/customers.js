const {Router}=require('express');
const router=Router();
const books=require('../Customers');
const uuid=require('uuid');
const customers = require('../Customers');

//  Get all customers
router.get('/',(req,res)=>{
    res.json(customers)
})

// Get one book by id
router.get(`/:id`,(req,res)=>{
    const isExist=customers.some(customer=>customer.id===parseInt(req.params.id))

    if(isExist){
        res.json(customers.filter(customer=>customer.id===parseInt(req.params.id)))
        
    }else{
        res.status(404).json({massage:`siz qidirgan ${req.params.id} idlik mijoz topilmadi`})
    }
})
// Post
router.post('/',(req,res)=>{
    const newCustomer={
        id:uuid.v4(),
        fistname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone,
        birth_date:req.body.birth_date,
        addres:req.body.addres
    }

    if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.phone || !req.body.birth_date || !req.body.addres){
        return res.status(400).json({massage:'Ilitimos hamma malumotlarni kiriting'})
    }

    books.push(newCustomer)
    res.json(customers)
}) 

// Edit customer by id
router.put(`/:id`,(req,res)=>{
    const isExist=customers.some(customer=>customer.id===parseInt(req.params.id))

    if(isExist){
        const updateCustomer=req.body

        customers.forEach(customers=>{
            if(customer.id===parseInt(req.params.id)){
               customer.firstname=updateCustomer.firstname ? updateCustomer.firstname:customer.firstname
               customer.lastname=updateCustomer.lastname ? updateCustomer.lastname:customer.lastname
               customer.email=updateCustomer.email ? updateCustomer.email:customer.email
               customer.phone=updateCustomer.phone ? updateCustomer.phone:customer.phone
               customer.birth_date=updateCustomer.birth_date ? updateCustomer.birth_date:customer.birth_date
               customer.addres=updateCustomer.addres ? updateCustomer.addres:customer.addres
               res.status(200).json({massage:'kitob malumotlari yangilandi',customer})
            }
        })
        
    }else{
        res.status(404).json({massage:`siz qidirgan ${req.params.id} idlik mijoz topilmadi`})
    }
})

// Delete book by id
router.get(`/:id`,(req,res)=>{
    const isExist=customers.some(customer=>customer.id===parseInt(req.params.id))

    if(isExist){
       
        res.json(
            {
                massage:'Kitob ochirib yuborildi',
                customers:customers.filter(customer=>customer.id !== parseInt(req.params.id))
                
            }
        )
        
    }else{
        res.status(404).json({massage:`siz qidirgan ${req.params.id} idlik kitob topilmadi`})
    }
})

module.exports=router;
