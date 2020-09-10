const router =  require('express').Router();
const File = require('../models/file')

router.get('/:uuid',async (req,res)=>{
    console.log("Came to Download");
    const file = await File.findOne({ uuid: req.params.uuid });
    if(!file){
        console.log("File not Found");
        return res.render('download', { error :'Link Has Been Expires'});
    }

    const filePath = `${__dirname}/../${file.path}`;
    res.download(filePath);
});

module.exports = router;