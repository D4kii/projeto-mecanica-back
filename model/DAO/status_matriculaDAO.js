/***********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipiulação de dados dos status referente às no banco de dados
 * Data: 11/06/2023
 * Autora: Yasmin Gonçalves
 * Versão: 1.0
 **********************************************************************************************************/

//Import da biblioteca PrismaClient
var { PrismaClient } = require('@prisma/client')

//Instancia do prisma
var prisma = new PrismaClient()

const insertStatusMatricula = async function (dadosStatus) {
    let sql = `insert into tbl_status_matricula (
                        status
                    ) values (
                        "${dadosStatus.status}"
                    )`

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}


const updateStatusMatricula = async function (dadosStatus) {
    let sql = `update tbl_status_matricula set 
                    status = "${dadosStatus.status}"
                    
                    where id = ${dadosStatus.id}
                            `

    //Executa o scriptSQL do bd
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true
    } else {
        return false
    }
}

const selectByIdStatusMatricula = async function (id) {
    let sql = `select * from tbl_status_matricula where id = ${id}`

    let rsMatricula = await prisma.$queryRawUnsafe(sql)

    if (rsMatricula.length > 0) {
        return rsMatricula
    } else {
        return false
    }
}

const deleteStatusMatricula = async function (id) {
    let sql = `delete from tbl_status_matricula where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus) {
        return true 
    } else {
        return false
    }
}

const selectAllStatusMatriculas = async function () {
    let sql = `select * from tbl_status_matricula`

    let rsMatricula = await prisma.$queryRawUnsafe(sql)

    if (rsMatricula.length > 0) {
        return rsMatricula
    } else {
        return false
    }
}


//Retorna o ultimo ID inserido no BD
const selectLastId = async function (){
    let sql = 'select * from tbl_status_matricula order by id desc limit 1;'

    let rsMatricula = await prisma.$queryRawUnsafe(sql)

    if(rsMatricula.length > 0){
        return rsMatricula
    } else {
        return false
    }

}

module.exports = {
    insertStatusMatricula,
    selectByIdStatusMatricula,
    updateStatusMatricula,
    deleteStatusMatricula,
    selectAllStatusMatriculas,
    selectLastId
}