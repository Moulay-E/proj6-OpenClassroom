//mettre en asynch
export function fetchThemAll(url, parameter ={}){


    return fetch(url,parameter)
    .then(response => response.json()
    .then(data => {
        console.dir(data)
        console.log('ggg')
        return data;
    })
    .catch(error =>{
        console.log(error);
    }));
}

