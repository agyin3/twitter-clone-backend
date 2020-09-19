module.exports = (req, res, next) => {
    const { id } = req.params
    const user = res.locals.decodedJWT.subject

    if(id !== user){
        res.status(403).json({message: "Provided user id and token subject don't match"})
    }else{
        next()
    }
}