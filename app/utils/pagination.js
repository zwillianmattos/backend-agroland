module.exports = {
    getPagination(page, size){
        const limit = size ? +size : 5;
        const offset = page ? page * limit : 0;

        return {limit, offset}
    },
    
    getPagingData(data,limit,page){
        const {count:totalItems,rows:items} = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems/limit);

        return {currentPage, totalPages, totalItems, items}
    }



}