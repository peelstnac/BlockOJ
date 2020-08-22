#include <stdio.h>
#include <unistd.h>
int main() {
    //setvbuf(stdout, NULL, _IONBF, 0);
    for (int i=0; i<10; i++) {
        fprintf(stdout, "%d\n", i);
        sleep(5);
    }
}