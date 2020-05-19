export class Data{

    formatDate(data) {
        return (data.substr(0, 10).split('-').reverse().join('/'));    
    }
}



