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
    insert(val){
        const newNode = new Node(val);

        if(this.root === null) this.root = newNode;
        else{
            this.insertNode(this.root, newNode);
        }  
    }
    insertNode(node, newNode){
        if(newNode.data < node.data){
            if(node.left === null){
                node.left = newNode;
            } else{
                this.insertNode(node.left, newNode)
            }
        } else{
            if(node.right === null){
                node.right = newNode;
            } else{
                this.insertNode(node.right, newNode)
            }
        }
    }
    find(value, node){ 
        if(node  !== null){
            this.find(value, node.left)
            if(value === node.data){
                console.log(node)
            }
            this.find(value, node.right)
        }
    }
    levelOrder(callback = null, root){
        if (root === null) {
            return [];
        }
    
        const queue = [];  
        const result = [];  
    
        queue.push(root);

        while(queue.length > 0){
            const currentNode = queue.shift();
            if(callback !== null){
                callback(currentNode.data);
            } else{
                result.push(currentNode.data);
            }

            if(currentNode.left !== null){
                queue.push(currentNode.left);
            } 
            if(currentNode.right !== null){
                queue.push(currentNode.right);
            }
        }
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
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
// nodeTree.buildTree(arr);

// console.log(prettyPrint(nodeTree.root))
nodeTree.insert(50);
nodeTree.insert(30);

nodeTree.insert(20);
nodeTree.insert(40);
nodeTree.insert(70);
nodeTree.insert(60);
nodeTree.insert(80);

nodeTree.levelOrder((data) => console.log(data), nodeTree.root);
console.log(prettyPrint(nodeTree.root))
