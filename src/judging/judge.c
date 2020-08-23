#include <stdio.h>
#include <setjmp.h>
#include <errno.h>

#define TRY do{ jmp_buf ex_buf__; if( !setjmp(ex_buf__) ){
#define CATCH } else {
#define ETRY } }while(0)
#define THROW longjmp(ex_buf__, 1)

typedef enum { false, true } bool;

#include <string.h>

int main(int argc, char* argv[]) {
    // argv[1] is the path to the output file
    // argv[2] is the path to the folder with solution cases (end with /)
    if(argc != 4) {
        fprintf(stderr, "FAILED1 argc != 4 but is %d\n", argc);
        return 1;
    }
    // Total number of test cases
    int total;

    if(sscanf(argv[3], "%d", &total) != 1) {
        fprintf(stderr, "FAILED2 argv[3] is not an integer but is %s\n", argv[2]);
    }

    TRY {
        FILE* in = fopen(argv[1], "r");
        bool skip = false;
        for(int p=1; p<=total; p++) {
            char end[50];
            sprintf(end, "%d.txt", p);
            char path[500];
            strcpy(path, argv[2]);
            strcat(path, end);
            FILE* sol = fopen(path, "r");
            char c1, c2;
            for(;;) {
                if(!skip) c1 = fgetc(in);
                else skip = false;
                c2 = fgetc(sol);
                // Complete doubl EOF condition
                if (c1 == EOF && c2 == EOF && p != total) {
                    printf("WA\n");
                    return 0;
                }
                if (c1 == EOF && c2 == EOF && p == total) {
                    printf("AC %d\nAC 0\n", p);
                    return 0;
                }
                // Check c1 EOF
                if (c1 == EOF && c2 != EOF) {
                    printf("WA\n");
                    return 0;
                }
                // Check c2 EOF from different files
                if (c1 != EOF && c2 == EOF && p == total) {
                    printf("WA\n");
                    return 0;
                }
                if (c1 != EOF && c2 == EOF && p != total) {
                    printf("AC %d\n", p);
                    skip = true;
                    break;
                }
                // Check no EOF
                if (c1 != c2) {
                    printf("WA\n");
                    return 0; 
                }
            }
        }
    }
    CATCH {
        perror("FAILED3");
    } ETRY;
}