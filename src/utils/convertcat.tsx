export const convertCat = (name) => {
    if (name === "Healthcare"){
        return "Medical"
    } else if(name === "Sales") {
        return "Sales"
    } else if (name === "Customer") {
        return "Customer Service"
    } else if (name === "IT") {
        return "IT"
    } else {
        return undefined;
    }
}