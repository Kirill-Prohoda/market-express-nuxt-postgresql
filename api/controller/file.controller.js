const db = require('../conf/db.conf')



class FileController {

    async FileLoad(req, res) {
      
        console.log( req.file.destination +'/'+req.file.filename )
        

        res.send('фаил загружен')



    }

    

}

module.exports = new FileController()

