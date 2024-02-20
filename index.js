class Node{
    constructor(val){
        this.data = val;
        this.left = null;
        this.right = null;
    }
} 
class NodeTree{
    constructor(){
        this.root =null;
    }
    buildTree(arr){
        this.root = binarySearch(0, arr.length-1, arr)
    }
}

function sort(arr){
    let sorted = arr.sort((a, b) => a -b);
    return sorted;
}

function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

function binarySearch(start, end, arr){
    if(start > end) return null;
    let mid = Math.floor((start + end)/2);
    let root = new Node(arr[mid]);
   
    root.left = binarySearch(start, mid-1, arr)
    root.right = binarySearch(mid+1, end, arr)
     
    return root;
}

arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
arr = sort(arr);
arr = removeDuplicates(arr);
nodeTree = new NodeTree();
nodeTree.buildTree(arr);
console.log(nodeTree.root)
console.log(nodeTree) 