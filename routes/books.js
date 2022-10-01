const {Router}=require('express');
const router=Router();
const books=require('../Books');
const uuid=require('uuid');

//  Get all books
router.get('/',(req,res)=>{
    res.json(books)
})

// Get one book by id
router.get(`/:id`,(req,res)=>{
    const isExist=books.some(book=>book.id===parseInt(req.params.id))

    if(isExist){
        res.json(books.filter(book=>book.id===parseInt(req.params.id)))
        
    }else{
        res.status(404).json({massage:`siz qidirgan ${req.params.id} idlik kitob topilmadi`})
    }
})
// Post
router.post('/',(req,res)=>{
    const newBook={
        id:uuid.v4(),
        name:req.body.name,
        author:req.body.author,
        pages:req.body.pages
    }

    if(!req.body.name || !req.body.author || !req.body.pages){
        return res.status(400).json({massage:'Ilitimos hamma malumotlarni kiriting'})
    }

    books.push(newBook)
    res.json(books)
}) 

// Edit book by id
router.put(`/:id`,(req,res)=>{
    const isExist=books.some(book=>book.id===parseInt(req.params.id))

    if(isExist){
        const updateBook=req.body

        books.forEach(books=>{
            if(book.id===parseInt(req.params.id)){
               book.name=updateBook.name ? updateBook.name:book.name
               book.author=updateBook.author ? updateBook.author:book.author
               book.pages=updateBook.pages ? updateBook.pages:book.pages

               res.status(200).json({massage:'kitob malumotlari yangilandi',book})
            }
        })
        
    }else{
        res.status(404).json({massage:`siz qidirgan ${req.params.id} idlik kitob topilmadi`})
    }
})

// Delete book by id
router.get(`/:id`,(req,res)=>{
    const isExist=books.some(book=>book.id===parseInt(req.params.id))

    if(isExist){
       
        res.json(
            {
                massage:'Kitob ochirib yuborildi',
                books:books.filter(book=>book.id !== parseInt(req.params.id))
                
            }
        )
        
    }else{
        res.status(404).json({massage:`siz qidirgan ${req.params.id} idlik kitob topilmadi`})
    }
})

module.exports=router;
