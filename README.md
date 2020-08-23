# BlockOJ
> Boundless creativity.

## What is BlockOJ?
BlockOJ is an online judge built around Google's Blockly library that teaches children how to code. The library allows us to implement a code editor which lets the user program with various blocks (function blocks, variable blocks, etc.).

![Figure 1. Image of BlockOJ Editor](https://i.imgur.com/UOmBhL4.png)

On BlockOJ, users can sign up and use our lego-like code editor to solve instructive programming challenges! Solutions can be verified by pitting them against numerous test cases hidden in our servers :) -- simply click the "submit" button and we'll take care of the rest.

Our lightning fast judge, painstakingly written in C, will provide instantaneous feedbeck on the correctness of your solution (ie. how many of the test cases did your program evaluate correctly?).

INSERT IMAGE HERE

## Inspiration and Design Motivation

Back in late June, our team came across the article announcing the "[new Ontario elementary math curriculum to include coding starting in Grade 1](https://www.thestar.com/politics/provincial/2020/06/23/new-ontario-elementary-math-curriculum-to-include-coding-starting-in-grade-1.html)." During Hack The 6ix, we wanted to build a practical application that can aid our hard working elementary school teachers deliver the coding aspect of this new curriculum.

We wanted a tool that was
1. Intuitive to use,
2. Instructive, and most important of all
3. Engaging

Using the Blockly library, we were able to use a code editor which resembles building with LEGO: the block-by-block assembly process is **procedural** and children can easily look at the **big picture** of programming by looking at how the blocks interlock with each other.

Our programming challenges aim to gameify learning. Not only will children using BlockOJ **learn by doing**, but they will also slowly accumulate basic programming know-how through our carefully designed sequence of problems.

Finally, not all our problems are easy. Some are hard (in fact, the problem in our demo is extremely difficult for elementary students). In our opinion, it is beneficial to mix in one or two difficult challenges in problemsets, for they give children the opportunity to gain valuable problem solving experience. Difficult problems also pave room for students to engage with teachers.

## How we built it

Here's the tl;dr version.
- AWS EC2
- Postgresql
- NodeJS
- Express
- ...and last but not least, our beloved trio, HTML/CSS/JavaScript