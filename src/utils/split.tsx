export const splitArray = (array) => {
    let array1 = array.slice(0, 5);
    let array2 = array.slice(5, 10);
    let array3 =  array.slice(10,15);
    let array4 = array.slice(15, 20);
    let array5 = array.slice(20, 25);
    let array6 = array.slice(25, 30);



    return [array1,array2,array3,array4,array5,array6];
}

export const splitArray2 = (items) => {
    const [array1, array2] = items.reduce(
        ([arr1, arr2], item, index) => {
          if (index % 2 === 0) {
            arr1.push(item);  // Add to first array for even indices
          } else {
            arr2.push(item);  // Add to second array for odd indices
          }
          return [arr1, arr2];
        },
        [[], []]  // Initial value with two empty arrays
      );

      return [array1,array2];
}