Ok so what's the plan.

The goal is we want to be able to put in a text and then do a rewrite level by level what's the user experience.

TO DOS:
set up API route to fetch a specific level of nodes

**\_\_\_\_**SOME OLD NOTES**\_\_**
Step 1: create book

there's some page where we are going to copy paste the book into the text entry and then what it will do is create a book. Hmm is it better ot have it just automatically parse all into nodes

ok so on the db side what do we have. On the db side, we have a list of nodes

ok so db side let's tsart there

DB:

UUID, book

ok so the overall structure is we are going to have a single table with every single node

for a given node we are going to have

- node ID
- path hmmm that's the problem as you create a new node you have to update the path for all of the other nodes. ugh ugh ugh ugh ugh.
- content

-ok so I think the most dirty straightforward fast hack is to get the text and then do a whole tree construction (use the old method) and then convert that into a set of DB entries - maybe we need recursion - cool exciting.

ok so what are we going to do.

OK so DB is going to store all the text nodes each node will have

Ok but the tree isn't extensible that is kind of annoying. b ut it's not that hard to just say keep constructing the tree until there is only one. that is pretty easy to do.

1. take in raw text
2. use the python method to create a summary tree of that text (represented as a tree because it's idiomatic?)
3. Convert it into materialized path using [3,4,5,1] kind of format. Where the first number is going to be the root and last is the node. like a normal path concept.
4. When we render we can select a specific level (length of array) and then we do some kind of nested div thing - probably it looks like some kind of recursion. on the left we have all of the

ALTERNATE OPTION

1. Take in raw text
2. first level is [1] [2] [3] [4] etc. the problem is every new level needs to modify the previous levels. Let's just stick with the tree plan. Tree firs tand then convert those into arrays.

- node ID a123asdf12123
- full path 0/2/1

- Ok let's think through page layout. Home page is some kind of login or something probably. Anyway you login and you get taken to library page that's like your personal home page. And then from there you can click something that says add book.
