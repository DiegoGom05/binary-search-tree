class Node{
    constructor(val){
        this.data = val;
        this.left = null;
        this.right = null;
    }
} 
class NodeTree {
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
    find(value){ 
        let root = this.root;
        while(root && root.data !== value){
            if(value < root.data){
                root = root.left
            } else{
                root = root.right;
            }

        }
        return root;
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
    preOrder(callback = null, root) {
        if (root === null) {
            return [];
        }
        
        const stack = [];
        const result = [];
        let currentNode = root;
    
        while (currentNode || stack.length > 0) {
            if (currentNode) {
                if (callback !== null) {
                    callback(currentNode.data);
                } else {
                    result.push(currentNode.data);
                }
                if (currentNode.right) {
                    stack.push(currentNode.right);
                }
                currentNode = currentNode.left;
            } else {
                currentNode = stack.pop();
            }
        }
    
        return result;
    }
    inOrder(callback = null, root){
        if(root === null){
            return [];
        }
        const result = [];
        const stack = [];
        let currentNode = root;

        while(currentNode || stack.length > 0){            
            while(currentNode){
                stack.push(currentNode);
                currentNode = currentNode.left;
            } 

            currentNode = stack.pop()
            if(callback !== null){
                callback(currentNode.data);
            }else{
                result.push(currentNode.data);
            }
            currentNode = currentNode.right

             
        }
    }
    postOrder(callback = null, root) {
        const result = [];
        if (!root) return result;
    
        const stack = [];
        let prev = null;
    
        do {
            while (root !== null) {
                stack.push(root);
                root = root.left;
            }
    
            while (root === null && stack.length > 0) {
                root = stack[stack.length - 1];
                if (root.right === null || root.right === prev) {
                    result.push(root.data);
                    stack.pop();
                    if (callback) {
                        callback(root.data);
                    }
                    prev = root;
                    root = null;
                } else {
                    root = root.right;
                }
            }
        } while (stack.length > 0);
    
        return result;
    }
    height(value){
        let root = this.find(value);
        let height = -1;
        let queue=[];
    
        if (!root) {
            console.log('Node not found.');
            return -1;  
        }
    
        queue.push(root);
        queue.push(null);
        while(queue.length > 0){
            let temp = queue.shift();
             
            if(temp === null){
                height += 1;
                if(queue.length > 0){
                    queue.push(null);
                }
            } else {
                if(temp.left){
                    queue.push(temp.left);
                }
                if(temp.right){
                    queue.push(temp.right);
                }
            }
        }
        console.log(`Node's height: ${height}`);
        return height;
    }
    depth(value){
        let depth = 0
        let root = this.root;
        while(root && root.data !== value){
            if(value < root.data){
                root = root.left
                depth++;
            } else{
                root = root.right;
                depth++;
            }

        }
        console.log('Node\'s depth: ',depth);
    }
    isBalanced(root){
        return this.checkHeight(root) !== -1;
    }
          
   
    checkHeight(node) {
        if (node === null) {
            return 0;
        }
        
        let leftHeight = this.checkHeight(node.left);
  
        if (leftHeight === -1) return -1;  

        let rightHeight = this.checkHeight(node.right);
        if (rightHeight === -1) return -1;  
        
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;  
        } else {
            return Math.max(leftHeight, rightHeight) + 1;  
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

arr = [5, 3, 7, 2, 4, 6, 8, 1];


arr = sort(arr);
arr = removeDuplicates(arr);
nodeTree = new NodeTree();
nodeTree.buildTree(arr);
// nodeTree.insert(50);
// nodeTree.insert(30);
// nodeTree.insert(20);
// nodeTree.insert(40);
// nodeTree.insert(70);
// nodeTree.insert(60);
// nodeTree.insert(80);
console.log(prettyPrint(nodeTree.root))
 