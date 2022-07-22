---
layout: article
title: ICFP Contest 2022
subtitle: ISL Specification V0.0
author: Alperen Keles
---

# ISL Specification

ISL code is a set of *moves* over a canvas.

We start with a description of ISL grammar.

## ISL Grammar

```BNF
<program>               ::=     <move> | <move> <newline> <program>
<move>                  ::=     <pcut-move> | <lcut-move> | <color-move> | <swap-move> | <merge-move>
<pcut-move>             ::=     "cut" <block> <point>
<lcut-move>             ::=     "cut" <block> <orientation> <line-number>
<color-move>            ::=     "color" <block> <color>
<swap-move>             ::=     "swap" <block> <block>
<merge-move>            ::=     "merge" <block> <block>
<orientation>           ::=     "x" | "y"
<block>                 ::=     "[" <block-id> "]"
<point>                 ::=     "[" <x> "," <y> "]"
<color>                 ::=     "[" <r> "," <g> "," <b> "," <a> "]" 
<block-id>              ::=     <id> | <id> "." <block-id>
<x> | <y>               ::=     "0", "1", "2"...
<id> | <line-number>    ::=     "0", "1", "2"...
<r> | <g> | <b> | <a>   ::=     "0", "1", "2"..."255"
<newline>               ::=     "\n"
```

