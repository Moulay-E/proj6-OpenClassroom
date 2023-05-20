
export function fetchThemAll(url){
    return fetch(url)
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

// export function fetchWork(){
//     return fetch('http://localhost:5678/api/works')
//     .then(response=> response.json()
//     .catch(error => {
//         console.log(error)
//     }));
// }