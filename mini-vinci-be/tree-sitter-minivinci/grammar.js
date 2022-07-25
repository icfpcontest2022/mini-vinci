module.exports = grammar({
    name: 'minivinci',
  
    rules: {
        // program := repeat(<move>)
        // we might use repeat1 to specify that the program must be at least one move long
        program: $ => repeat($.move),

        // move := <pcut-move> | <lcut-move> | <color-move> | <swap-move> | <join-move>
        move: $ => choice(
            $.pcut_move,
            $.lcut_move,
            $.color_move,
            $.swap_move,
            $.join_move
        ),

        // pcut_move := "cut" <block> <position>
        pcut_move: $ => seq(
            'cut',
            $.block,
            $.position
        ),

        // lcut_move := "cut" <block> <orientation> <line>
        lcut_move: $ => seq(
            'cut',
            $.block,
            $.orientation,
            $.line
        ),

        // "color" <block> <color>
        color_move: $ => seq(
            'color',
            $.block,
            $.color
        ),

        // swap_move := "swap" <block> <block>
        swap_move: $ => seq(
            'swap',
            $.block,
            $.block
        ),

        // join_move := "join" <block> <block>
        join_move: $ => seq(
            'join',
            $.block,
            $.block
        ),
        
        // orientation := "h" | "v"
        orientation: $ => choice(
            'h',
            'v'
        ),

        // block := "[" <block-id> "]"
        block: $ => seq(
            '[',
            $.block_id,
            ']'
        ),

        // position := "[" <x> "," <y> "]"
        position: $ => seq(
            '[',
            $.x,
            ',',
            $.y,
            ']'
        ),

        // color := "[" <r> "," <g> "," <b> "]"
        color: $ => seq(
            '[',
            $.r,
            ',',
            $.g,
            ',',
            $.b,
            ']'
        ),

        // block_id := <id> | <id> "." <block-id>
        block_id: $ => choice(
            $.id,
            seq($.id, '.', $.block_id)
        ),

        // <x> | <y> := all positive integers including 0
        x: $ => /[0-9]+/,
        y: $ => /[0-9]+/,

        // <id> | <line> := all positive integers including 0
        id: $ => /[0-9]+/,
        line: $ => /[0-9]+/,

        // <r> | <g> | <b> := [0-255]
        r: $ => /([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])/,
        g: $ =>/([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])/,
        b: $ => /([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])/
    }
  });