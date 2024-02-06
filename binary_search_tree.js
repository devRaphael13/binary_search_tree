class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(nodeClass) {
        this.nodeClass = nodeClass;
        this.root = null;
    }

    buildTree(arr) {
        let [lo, hi] = [0, arr.length - 1];
        if (lo > hi) return null;

        const mid = parseInt((lo + hi) / 2);
        const root = new this.nodeClass(arr[mid]);
        root.left = this.buildTree(arr.slice(lo, mid));
        root.right = this.buildTree(arr.slice(mid + 1));
        this.root = root
        return this.root
    }

    insert(root, value) {
        if (root == null) return new Node(value);
        else if (root.value > value) root.left = this.insert(root.left, value);
        else root.right = this.insert(root.right, value);
        this.root = root
        return this.root
    }

    delete(root, value) {
        if (root === null) return root;
        else if (root.value > value) {
            root.left = this.delete(root.left, value);
        } else if (root.value < value) {
            root.right = this.delete(root.right, value);
        } else {
            if (!root.left) return root.right;
            else if (!root.right) return root.left;
            else {
                let curr = root.right;
                while (curr.left) {
                    curr = curr.left;
                }
                root.value = curr.value;
                root.right = this.delete(root.right, curr.value);
            }
        }

        return root;
    }

    find(node, value) {
        if (node === null) return null;
        else if (node.value > value) return this.find(node.left, value);
        else if (node.value < value) return this.find(node.right, value);
        else return node;
    }

    levelOrder(node, callback = null) {
        const queue = [node];
        const result = [];

        while (queue.length) {
            let [root] = queue.splice(0, 1);
            result.push(callback ? callback(root) : root);

            if (root.left) queue.push(root.left);
            if (root.right) queue.push(root.right);
        }
        return result;
    }

    inOrder(node, callback = null) {
        if (!node) return []
        return [...this.inOrder(node.left, callback), callback ? callback(node.value) : node.value, ...this.inOrder(node.right, callback)];
    }

    preOrder(node, callback = null) {
        if (!node) return [];
        return [callback ? callback(node.value) : node.value, ...this.inOrder(node.left, callback), ...this.inOrder(node.right, callback)];
    }

    postOrder(node, callback = null) {
        if (!node) return [];
        return [...this.inOrder(node.left, callback), ...this.inOrder(node.right, callback), callback ? callback(node.value) : node.value];
    }

    height(node) {
        if (node === null) return 0;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    depth(root, node) {
        if (root === null) return 0;
        else if (root === node) return root;
        else if (root.value > node.value) return 1 + this.depth(root.left, node);
        else return 1 + this.depth(root.right, node);
    }

    isBalanced(node) {
        if (node === null) return true;
        const l_height = this.height(node.left);
        const r_height = this.height(node.right);

        if (Math.abs(l_height - r_height) > 1) return false;
        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance() {
        this.root = this.buildTree(this.inOrder(this.root))
        return this.root
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// let tree = new Tree(Node);
// const node = tree.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

// console.log("Level order", tree.levelOrder(node));
// console.log("In order", tree.inOrder(node));
// console.log("Pre order", tree.preOrder(node));
// console.log("Post order", tree.postOrder(node));
// tree.insert(node, 15);
// tree.insert(node, 18);
// tree.insert(node, 35);
// tree.insert(node, 50);
// console.log(prettyPrint(tree.root)); 
// console.log("Is balanced", tree.isBalanced(tree.root))
// console.log(tree.rebalance())

// console.log(prettyPrint(tree.root));
// console.log("Is balanced", tree.isBalanced(tree.root))

