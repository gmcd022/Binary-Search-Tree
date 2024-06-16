function Node(data) {
    this.data = data
    this.left = null;
    this.right = null;
}

function Tree(array) {
    const tree = {
        root: buildTree(array),

        insert(value) {
            const newNode = new Node(value);
            
            if (this.root === null) {
                this.root = newNode;
                return;
            }
    
            let currentNode = this.root;
    
            while(true) {
                if (value === currentNode.data) {
                    return console.log("value already exists");
                }
                if (value < currentNode.data) {
                    if (currentNode.left === null) {
                        currentNode.left = newNode;
                        return;
                    }
                    currentNode = currentNode.left;
                } else {
                    if (currentNode.right === null) {
                        currentNode.right = newNode;
                        return;
                    }
                    currentNode = currentNode.right;
                }
            }
        },

        delete(value) {
            this.root = deleteNode(this.root, value);
        },

        find(value) {
            let currentNode = this.root;

            while (currentNode !== null) {
                if(currentNode.data === value) {
                    return currentNode;
                } else if (value < currentNode.data) {
                    currentNode = currentNode.left;
                } else if (value > currentNode.data) {
                    currentNode = currentNode.right;
                }
            } return null;
        },

        levelOrder(callback) {
            if(this.root === null) return;
            const queue = [this.root];
            const result = [];

            while (queue.length > 0) {
                const currentNode = queue.shift();

                if (callback) {
                    callback(currentNode);
                } else {
                    result.push(currentNode.data);
                }

                if (currentNode.left !== null) { 
                    queue.push(currentNode.left)
                } if (currentNode.right !== null) { 
                    queue.push(currentNode.right)
                }
            }
            return result;

        },

        inOrder(callback) {
            return inOrderTraversal(this.root, callback);
        },

        preOrder(callback) {
            return preOrderTraversal(this.root, callback);
        },

        postOrder(callback) {
            return postOrderTraversal(this.root, callback);
        },

        height(node = this.root) {
            if (node instanceof Node) {
                if (node === null) return -1;
                const leftHeight = this.height(node.left);
                const rightHeight = this.height(node.right);
                return Math.max(leftHeight, rightHeight) + 1;
            }   else return null;
        },

        depth(node = this.root) {
            if (node instanceof Node) {
                let depth = 0;
                let currentNode = this.root;

                while (currentNode !== null) {
                    if (currentNode === node) return depth;
                    if (node.data < currentNode.data) {
                        currentNode = currentNode.left
                    } else {
                        currentNode = currentNode.right;
                    }
                    depth++
                }
            } else return null;
        },

        isBalanced() {
            const isBalancedSubTree = (node) => {
                if (node === null) return true;

                const leftHeight = this.height(node.left);
                const rightHeight = this.height(node.right);

                let heightDif =  (Math.max(leftHeight, rightHeight) - Math.min(leftHeight, rightHeight));
                if (heightDif > 1) return false

                return isBalancedSubTree(node.left) && isBalancedSubTree(node.right);
                
            };
            return isBalancedSubTree(this.root);
        },

        rebalance() {
            const tempArray = this.inOrder();
            this.root = buildTree(tempArray);
        }

    }

    function buildTree(array) {
        const sortedArray = [...new Set(array)].sort((a,b) => a - b);

        if (sortedArray.length === 0) return null;

        const mid = Math.floor(sortedArray.length / 2);
        const root = new Node(sortedArray[mid]);

        root.left = buildTree(sortedArray.slice(0, mid));
        root.right = buildTree(sortedArray.slice(mid + 1));

        return root;

    }

    function deleteNode(root, value) {
        if (root === null) return null;

        if (value < root.data) {
            root.left = deleteNode(root.left, value)
        
        } else if (value > root.data) {  
            root.right = deleteNode(root.right, value)
        } else {
            if (root.left === null && root.right === null) return null;

            if (root.left === null) return root.right;
            if (root.right === null) return root.left;

            const minRight = findMin(root.right);
            root.data = minRight.data;
            root.right = deleteNode(root.right, minRight.data);
        }
        return root;

    }

    function inOrderTraversal(node, callback) {
        let result = [];
        if (node !== null) {
            result = result.concat(inOrderTraversal(node.left, callback));
            if (callback) {
                callback(node);
            } else {
                result.push(node.data);
            }
            result = result.concat(inOrderTraversal(node.right, callback));
         }
         return result;
    }

    function preOrderTraversal(node, callback) {
        let result = [];
        if (node !== null) {
            if (callback) {
                callback(node);
            } else {
                result.push(node.data);
            }
            result = result.concat(preOrderTraversal(node.left, callback));
            result = result.concat(preOrderTraversal(node.right, callback))
        }
        return result
    }

    function postOrderTraversal(node, callback) {
        let result = [];
        if (node !== null) {  
            result = result.concat(preOrderTraversal(node.left, callback));
            result = result.concat(preOrderTraversal(node.right, callback));
            if (callback) {
                callback(node);
            } else {
                result.push(node.data);
            }
        }
        return result
    }

    function findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

return tree;

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

function DriverScript() {

    const randomArray = () => {
        let emptyArray = [];
        for (let i = 0; i < 20; i++ ) {
        emptyArray.push(Math.round(Math.random()*100))
        }
        return emptyArray;
    }

    const randomTree = new Tree(randomArray());

    console.log('is balanced', randomTree.isBalanced());
    console.log('level order', randomTree.levelOrder());
    console.log('pre order', randomTree.preOrder());
    console.log('post order', randomTree.postOrder());
    console.log('in order', randomTree.inOrder());
    
    randomTree.insert(101);
    randomTree.insert(105);
    randomTree.insert(110);
    randomTree.insert(115);
    console.log('101, 105, 110, 115 inserted')

    console.log('is balanced', randomTree.isBalanced());
    randomTree.rebalance();
    console.log('is balanced', randomTree.isBalanced());


    console.log('level order', randomTree.levelOrder());
    console.log('pre order', randomTree.preOrder());
    console.log('post order', randomTree.postOrder());
    console.log('in order', randomTree.inOrder());
}