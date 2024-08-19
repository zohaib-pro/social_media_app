const getQuery = (url:string)=>{
    const parts = new URL(url).pathname.split("/");
    return parts[parts.length-1];
}

export {getQuery}