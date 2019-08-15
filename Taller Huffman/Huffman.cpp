#include <iostream>
#include <stdlib.h>
#include <vector>
#include <queue>

using namespace std;

struct Nodo { 

	char dato; 

	unsigned freq; 

	Nodo *izq, *der; 

	Nodo(char dato, unsigned freq) 

	{ 

		izq = der = NULL; 
		this->dato = dato; 
		this->freq = freq; 
	} 
}; 


struct comparar { 

	bool operator()(Nodo* izq, Nodo* der) 

	{ 
		return (izq->freq > der->freq); 
	} 
}; 


void imprimirArbol(struct Nodo* root, string str) 
{ 

	if (!root) 
		return; 

	if (root->dato != '$') 
		cout << root->dato << ": " << str << "\n"; 

	imprimirArbol(root->izq, str + "0"); 
	imprimirArbol(root->der, str + "1"); 
} 


void crearArbol(char dato[], int freq[], int size) 
{ 
	struct Nodo *izq, *der, *top; 

	priority_queue<Nodo*, vector<Nodo*>, comparar> nodo; 

	for (int i = 0; i < size; ++i) 
		nodo.push(new Nodo(dato[i], freq[i])); 


	while (nodo.size() != 1) { 

		izq = nodo.top(); 
		nodo.pop(); 

		der = nodo.top(); 
		nodo.pop(); 

		top = new Nodo('$', izq->freq + der->freq); 

		top->izq = izq; 
		top->der = der; 

		nodo.push(top); 
	} 
	imprimirArbol(nodo.top(), ""); 
} 

int main() 
{ 

	char arr[] = { 'a', 'b', 'c', 'd', 'e', 'f' }; 
	int freq[] = { 5, 9, 12, 13, 16, 45 }; 

	int size = sizeof(arr) / sizeof(arr[0]); 

	crearArbol(arr, freq, size); 

	return 0; 
} 
