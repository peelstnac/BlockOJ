## Scripts
`npm run serve` - Start the frontend development server and opens the home page in the default browser. Runs on port 1234 by default. Supports HMR.

`npm run dev` - Compiles source files and starts the web server. Runs on port 8000 by default.

## How to run judge.c
Compile if haven't already (if on linux, may have to use cc)
```
gcc judge.c -o judge.out
```
Then execute following on node.js (on linux, keep ./; on windows remove)
```
./judge.out [PATH TO USER OUTPUT] [PATH TO FOLDER WITH OFFICIAL OUTPUT] [TOTAL # OF TEST CASES]
```
ie.
```
./judge.out Judging/Output/P1.txt Judging/Tests/P1/ 2
```
