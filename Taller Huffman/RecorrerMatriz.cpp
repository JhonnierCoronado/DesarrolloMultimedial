#include <iostream>
using namespace std;
#define c 4


void imprimir(int [][c], int, int);

int main()
{
    int m[][4] = { {1,  2,  3,  4},
                   {6,  7,  8,  9},             
                   {11, 12, 13, 14},             
                   {16, 17, 18, 19}};

    imprimir(m, 4, 4);
    cout << endl;
}

void imprimir(int M[][c], int n, int m)
{
    int fila = 0, columna = 0; 
    bool incrementar = 0; 
  
    int mn = min(m, n); 
    for (int i = 1; i <= mn; ++i) { 
        for (int j = 0; j < i; ++j) { 
            cout << M[fila][columna] << " "; 
  
            if (j + 1 == i) 
                break;  

            if (incrementar) 
                fila ++, columna --; 
            else
                fila --, columna ++; 
        } 
  
        if (i == mn) 
            break; 
  
        if (incrementar) {
            fila ++;
            incrementar = false; 
            }
        else{
            columna ++;
            incrementar = true; 
            }
    } 
  
    if (fila == 0) { 
        if (columna == m - 1) 
            fila ++; 
        else
            columna ++; 
        incrementar = 1; 
    } 
    else { 
        if (fila == n - 1) 
            columna ++; 
        else
            fila ++; 
        incrementar = 0; 
    } 

    int MAX = max(m, n) - 1; 
    for (int i, diagonal = MAX; diagonal > 0; --diagonal) { 
  
        if (diagonal > mn) 
            i = mn; 
        else
            i = diagonal; 
  
        for (int j = 0; j < i; ++j) { 
            cout << M[fila][columna] << " "; 
  
            if (j + 1 == i) 
                break; 
  
            if (incrementar) {
                fila ++; 
                columna --;
                } 
            else{
                columna ++;
                fila --; 
                }
        } 
  
        if (fila == 0 || columna == m - 1) { 
            if (columna == m - 1) 
                fila ++; 
            else
                columna ++; 
  
            incrementar = true; 
        } 
  
        else if (columna == 0 || fila == n - 1) { 
            if (fila == n - 1) 
                columna ++; 
            else
                fila ++; 
  
            incrementar = false; 
        } 
    } 
}