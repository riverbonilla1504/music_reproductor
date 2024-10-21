class Node<T> {
  data: T;
  next: Node<T> | null = null;
  prev: Node<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class DoublyLinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;
  current: Node<T> | null = null; 

  append(data: T) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode; 
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
  }

  getCurrent(): Node<T> | null {
    return this.current; 
  }

  next(): Node<T> | null {
    if (this.current && this.current.next) {
      this.current = this.current.next; 
    }
    return this.current; 
  }

  previous(): Node<T> | null {
    if (this.current && this.current.prev) {
      this.current = this.current.prev; 
    }
    return this.current; 
  }

  delete(data: T) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.data === data) {
        if (currentNode === this.head && currentNode === this.tail) {
          this.head = null;
          this.tail = null;
        } else if (currentNode === this.head) {
          this.head = currentNode.next;
          this.head!.prev = null;
        } else if (currentNode === this.tail) {
          this.tail = currentNode.prev;
          this.tail!.next = null;
        } else {
          currentNode.prev!.next = currentNode.next;
          currentNode.next!.prev = currentNode.prev;
        }
      }
      currentNode = currentNode.next;
    }
  }
}
