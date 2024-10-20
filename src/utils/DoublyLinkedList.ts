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
  current: Node<T> | null = null; // Nodo actual para la reproducción

  append(data: T) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode; // Establecer el primer nodo como actual
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
  }

  getCurrent(): Node<T> | null {
    return this.current; // Retorna el nodo actual
  }

  next(): Node<T> | null {
    if (this.current && this.current.next) {
      this.current = this.current.next; // Mover al siguiente nodo
    }
    return this.current; // Retorna el nuevo nodo actual
  }

  previous(): Node<T> | null {
    if (this.current && this.current.prev) {
      this.current = this.current.prev; // Mover al nodo anterior
    }
    return this.current; // Retorna el nuevo nodo actual
  }
}
