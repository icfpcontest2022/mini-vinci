#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 13
#define STATE_COUNT 50
#define LARGE_STATE_COUNT 2
#define SYMBOL_COUNT 34
#define ALIAS_COUNT 0
#define TOKEN_COUNT 13
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 0
#define MAX_ALIAS_SEQUENCE_LENGTH 7
#define PRODUCTION_ID_COUNT 1

enum {
  anon_sym_cut = 1,
  anon_sym_color = 2,
  anon_sym_swap = 3,
  anon_sym_merge = 4,
  anon_sym_LBRACK = 5,
  anon_sym_RBRACK = 6,
  anon_sym_H = 7,
  anon_sym_V = 8,
  anon_sym_COMMA = 9,
  anon_sym_DOT = 10,
  aux_sym_x_token1 = 11,
  aux_sym_r_token1 = 12,
  sym_program = 13,
  sym_move = 14,
  sym_pcut_move = 15,
  sym_lcut_move = 16,
  sym_color_move = 17,
  sym_swap_move = 18,
  sym_merge_move = 19,
  sym_orientation = 20,
  sym_orientation_type = 21,
  sym_block = 22,
  sym_position = 23,
  sym_color = 24,
  sym_block_id = 25,
  sym_line = 26,
  sym_x = 27,
  sym_y = 28,
  sym_id = 29,
  sym_r = 30,
  sym_g = 31,
  sym_b = 32,
  aux_sym_program_repeat1 = 33,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [anon_sym_cut] = "cut",
  [anon_sym_color] = "color",
  [anon_sym_swap] = "swap",
  [anon_sym_merge] = "merge",
  [anon_sym_LBRACK] = "[",
  [anon_sym_RBRACK] = "]",
  [anon_sym_H] = "H",
  [anon_sym_V] = "V",
  [anon_sym_COMMA] = ",",
  [anon_sym_DOT] = ".",
  [aux_sym_x_token1] = "x_token1",
  [aux_sym_r_token1] = "r_token1",
  [sym_program] = "program",
  [sym_move] = "move",
  [sym_pcut_move] = "pcut_move",
  [sym_lcut_move] = "lcut_move",
  [sym_color_move] = "color_move",
  [sym_swap_move] = "swap_move",
  [sym_merge_move] = "merge_move",
  [sym_orientation] = "orientation",
  [sym_orientation_type] = "orientation_type",
  [sym_block] = "block",
  [sym_position] = "position",
  [sym_color] = "color",
  [sym_block_id] = "block_id",
  [sym_line] = "line",
  [sym_x] = "x",
  [sym_y] = "y",
  [sym_id] = "id",
  [sym_r] = "r",
  [sym_g] = "g",
  [sym_b] = "b",
  [aux_sym_program_repeat1] = "program_repeat1",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [anon_sym_cut] = anon_sym_cut,
  [anon_sym_color] = anon_sym_color,
  [anon_sym_swap] = anon_sym_swap,
  [anon_sym_merge] = anon_sym_merge,
  [anon_sym_LBRACK] = anon_sym_LBRACK,
  [anon_sym_RBRACK] = anon_sym_RBRACK,
  [anon_sym_H] = anon_sym_H,
  [anon_sym_V] = anon_sym_V,
  [anon_sym_COMMA] = anon_sym_COMMA,
  [anon_sym_DOT] = anon_sym_DOT,
  [aux_sym_x_token1] = aux_sym_x_token1,
  [aux_sym_r_token1] = aux_sym_r_token1,
  [sym_program] = sym_program,
  [sym_move] = sym_move,
  [sym_pcut_move] = sym_pcut_move,
  [sym_lcut_move] = sym_lcut_move,
  [sym_color_move] = sym_color_move,
  [sym_swap_move] = sym_swap_move,
  [sym_merge_move] = sym_merge_move,
  [sym_orientation] = sym_orientation,
  [sym_orientation_type] = sym_orientation_type,
  [sym_block] = sym_block,
  [sym_position] = sym_position,
  [sym_color] = sym_color,
  [sym_block_id] = sym_block_id,
  [sym_line] = sym_line,
  [sym_x] = sym_x,
  [sym_y] = sym_y,
  [sym_id] = sym_id,
  [sym_r] = sym_r,
  [sym_g] = sym_g,
  [sym_b] = sym_b,
  [aux_sym_program_repeat1] = aux_sym_program_repeat1,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [anon_sym_cut] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_color] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_swap] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_merge] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_LBRACK] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RBRACK] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_H] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_V] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_COMMA] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_DOT] = {
    .visible = true,
    .named = false,
  },
  [aux_sym_x_token1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_r_token1] = {
    .visible = false,
    .named = false,
  },
  [sym_program] = {
    .visible = true,
    .named = true,
  },
  [sym_move] = {
    .visible = true,
    .named = true,
  },
  [sym_pcut_move] = {
    .visible = true,
    .named = true,
  },
  [sym_lcut_move] = {
    .visible = true,
    .named = true,
  },
  [sym_color_move] = {
    .visible = true,
    .named = true,
  },
  [sym_swap_move] = {
    .visible = true,
    .named = true,
  },
  [sym_merge_move] = {
    .visible = true,
    .named = true,
  },
  [sym_orientation] = {
    .visible = true,
    .named = true,
  },
  [sym_orientation_type] = {
    .visible = true,
    .named = true,
  },
  [sym_block] = {
    .visible = true,
    .named = true,
  },
  [sym_position] = {
    .visible = true,
    .named = true,
  },
  [sym_color] = {
    .visible = true,
    .named = true,
  },
  [sym_block_id] = {
    .visible = true,
    .named = true,
  },
  [sym_line] = {
    .visible = true,
    .named = true,
  },
  [sym_x] = {
    .visible = true,
    .named = true,
  },
  [sym_y] = {
    .visible = true,
    .named = true,
  },
  [sym_id] = {
    .visible = true,
    .named = true,
  },
  [sym_r] = {
    .visible = true,
    .named = true,
  },
  [sym_g] = {
    .visible = true,
    .named = true,
  },
  [sym_b] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_program_repeat1] = {
    .visible = false,
    .named = false,
  },
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static const uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(15);
      if (lookahead == ',') ADVANCE(24);
      if (lookahead == '.') ADVANCE(25);
      if (lookahead == '0') ADVANCE(28);
      if (lookahead == '1') ADVANCE(28);
      if (lookahead == '2') ADVANCE(26);
      if (lookahead == 'H') ADVANCE(22);
      if (lookahead == 'V') ADVANCE(23);
      if (lookahead == '[') ADVANCE(20);
      if (lookahead == ']') ADVANCE(21);
      if (lookahead == 'c') ADVANCE(8);
      if (lookahead == 'm') ADVANCE(4);
      if (lookahead == 's') ADVANCE(14);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      if (('3' <= lookahead && lookahead <= '9')) ADVANCE(28);
      END_STATE();
    case 1:
      if (lookahead == '0') ADVANCE(29);
      if (lookahead == '1') ADVANCE(33);
      if (lookahead == '2') ADVANCE(30);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(1)
      if (('3' <= lookahead && lookahead <= '9')) ADVANCE(32);
      END_STATE();
    case 2:
      if (lookahead == 'H') ADVANCE(22);
      if (lookahead == 'V') ADVANCE(23);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(2)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(28);
      END_STATE();
    case 3:
      if (lookahead == 'a') ADVANCE(10);
      END_STATE();
    case 4:
      if (lookahead == 'e') ADVANCE(11);
      END_STATE();
    case 5:
      if (lookahead == 'e') ADVANCE(19);
      END_STATE();
    case 6:
      if (lookahead == 'g') ADVANCE(5);
      END_STATE();
    case 7:
      if (lookahead == 'l') ADVANCE(9);
      END_STATE();
    case 8:
      if (lookahead == 'o') ADVANCE(7);
      if (lookahead == 'u') ADVANCE(13);
      END_STATE();
    case 9:
      if (lookahead == 'o') ADVANCE(12);
      END_STATE();
    case 10:
      if (lookahead == 'p') ADVANCE(18);
      END_STATE();
    case 11:
      if (lookahead == 'r') ADVANCE(6);
      END_STATE();
    case 12:
      if (lookahead == 'r') ADVANCE(17);
      END_STATE();
    case 13:
      if (lookahead == 't') ADVANCE(16);
      END_STATE();
    case 14:
      if (lookahead == 'w') ADVANCE(3);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(anon_sym_cut);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(anon_sym_color);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(anon_sym_swap);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(anon_sym_merge);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(anon_sym_LBRACK);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(anon_sym_RBRACK);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(anon_sym_H);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(anon_sym_V);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(anon_sym_COMMA);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(anon_sym_DOT);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(aux_sym_x_token1);
      if (lookahead == '5') ADVANCE(27);
      if (('6' <= lookahead && lookahead <= '9')) ADVANCE(28);
      if (('0' <= lookahead && lookahead <= '4')) ADVANCE(28);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(aux_sym_x_token1);
      if (('6' <= lookahead && lookahead <= '9')) ADVANCE(28);
      if (('0' <= lookahead && lookahead <= '5')) ADVANCE(28);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(aux_sym_x_token1);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(28);
      END_STATE();
    case 29:
      ACCEPT_TOKEN(aux_sym_r_token1);
      END_STATE();
    case 30:
      ACCEPT_TOKEN(aux_sym_r_token1);
      if (lookahead == '5') ADVANCE(31);
      if (('6' <= lookahead && lookahead <= '9')) ADVANCE(29);
      if (('0' <= lookahead && lookahead <= '4')) ADVANCE(32);
      END_STATE();
    case 31:
      ACCEPT_TOKEN(aux_sym_r_token1);
      if (('0' <= lookahead && lookahead <= '5')) ADVANCE(29);
      END_STATE();
    case 32:
      ACCEPT_TOKEN(aux_sym_r_token1);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(29);
      END_STATE();
    case 33:
      ACCEPT_TOKEN(aux_sym_r_token1);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(32);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 0},
  [2] = {.lex_state = 0},
  [3] = {.lex_state = 0},
  [4] = {.lex_state = 0},
  [5] = {.lex_state = 2},
  [6] = {.lex_state = 0},
  [7] = {.lex_state = 0},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 0},
  [10] = {.lex_state = 0},
  [11] = {.lex_state = 0},
  [12] = {.lex_state = 0},
  [13] = {.lex_state = 0},
  [14] = {.lex_state = 0},
  [15] = {.lex_state = 2},
  [16] = {.lex_state = 2},
  [17] = {.lex_state = 0},
  [18] = {.lex_state = 0},
  [19] = {.lex_state = 0},
  [20] = {.lex_state = 0},
  [21] = {.lex_state = 0},
  [22] = {.lex_state = 0},
  [23] = {.lex_state = 0},
  [24] = {.lex_state = 0},
  [25] = {.lex_state = 1},
  [26] = {.lex_state = 0},
  [27] = {.lex_state = 1},
  [28] = {.lex_state = 0},
  [29] = {.lex_state = 0},
  [30] = {.lex_state = 1},
  [31] = {.lex_state = 2},
  [32] = {.lex_state = 2},
  [33] = {.lex_state = 0},
  [34] = {.lex_state = 0},
  [35] = {.lex_state = 0},
  [36] = {.lex_state = 0},
  [37] = {.lex_state = 0},
  [38] = {.lex_state = 0},
  [39] = {.lex_state = 0},
  [40] = {.lex_state = 0},
  [41] = {.lex_state = 0},
  [42] = {.lex_state = 0},
  [43] = {.lex_state = 0},
  [44] = {.lex_state = 0},
  [45] = {.lex_state = 0},
  [46] = {.lex_state = 0},
  [47] = {.lex_state = 0},
  [48] = {.lex_state = 0},
  [49] = {.lex_state = 0},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [anon_sym_cut] = ACTIONS(1),
    [anon_sym_color] = ACTIONS(1),
    [anon_sym_swap] = ACTIONS(1),
    [anon_sym_merge] = ACTIONS(1),
    [anon_sym_LBRACK] = ACTIONS(1),
    [anon_sym_RBRACK] = ACTIONS(1),
    [anon_sym_H] = ACTIONS(1),
    [anon_sym_V] = ACTIONS(1),
    [anon_sym_COMMA] = ACTIONS(1),
    [anon_sym_DOT] = ACTIONS(1),
    [aux_sym_x_token1] = ACTIONS(1),
    [aux_sym_r_token1] = ACTIONS(1),
  },
  [1] = {
    [sym_program] = STATE(39),
    [sym_move] = STATE(2),
    [sym_pcut_move] = STATE(10),
    [sym_lcut_move] = STATE(10),
    [sym_color_move] = STATE(10),
    [sym_swap_move] = STATE(10),
    [sym_merge_move] = STATE(10),
    [aux_sym_program_repeat1] = STATE(2),
    [ts_builtin_sym_end] = ACTIONS(3),
    [anon_sym_cut] = ACTIONS(5),
    [anon_sym_color] = ACTIONS(7),
    [anon_sym_swap] = ACTIONS(9),
    [anon_sym_merge] = ACTIONS(11),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 7,
    ACTIONS(5), 1,
      anon_sym_cut,
    ACTIONS(7), 1,
      anon_sym_color,
    ACTIONS(9), 1,
      anon_sym_swap,
    ACTIONS(11), 1,
      anon_sym_merge,
    ACTIONS(13), 1,
      ts_builtin_sym_end,
    STATE(3), 2,
      sym_move,
      aux_sym_program_repeat1,
    STATE(10), 5,
      sym_pcut_move,
      sym_lcut_move,
      sym_color_move,
      sym_swap_move,
      sym_merge_move,
  [27] = 7,
    ACTIONS(15), 1,
      ts_builtin_sym_end,
    ACTIONS(17), 1,
      anon_sym_cut,
    ACTIONS(20), 1,
      anon_sym_color,
    ACTIONS(23), 1,
      anon_sym_swap,
    ACTIONS(26), 1,
      anon_sym_merge,
    STATE(3), 2,
      sym_move,
      aux_sym_program_repeat1,
    STATE(10), 5,
      sym_pcut_move,
      sym_lcut_move,
      sym_color_move,
      sym_swap_move,
      sym_merge_move,
  [54] = 1,
    ACTIONS(29), 6,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_merge,
      anon_sym_LBRACK,
  [63] = 4,
    ACTIONS(33), 1,
      aux_sym_x_token1,
    STATE(42), 1,
      sym_x,
    STATE(45), 1,
      sym_orientation_type,
    ACTIONS(31), 2,
      anon_sym_H,
      anon_sym_V,
  [77] = 1,
    ACTIONS(35), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_merge,
  [85] = 1,
    ACTIONS(37), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_merge,
  [93] = 1,
    ACTIONS(39), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_merge,
  [101] = 1,
    ACTIONS(41), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_merge,
  [109] = 1,
    ACTIONS(43), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_merge,
  [117] = 1,
    ACTIONS(45), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_merge,
  [125] = 1,
    ACTIONS(47), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_merge,
  [133] = 1,
    ACTIONS(49), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_merge,
  [141] = 1,
    ACTIONS(51), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_merge,
  [149] = 3,
    ACTIONS(53), 1,
      aux_sym_x_token1,
    STATE(23), 1,
      sym_id,
    STATE(35), 1,
      sym_block_id,
  [159] = 3,
    ACTIONS(53), 1,
      aux_sym_x_token1,
    STATE(23), 1,
      sym_id,
    STATE(37), 1,
      sym_block_id,
  [169] = 3,
    ACTIONS(55), 1,
      anon_sym_LBRACK,
    STATE(12), 1,
      sym_position,
    STATE(24), 1,
      sym_orientation,
  [179] = 2,
    ACTIONS(57), 1,
      anon_sym_LBRACK,
    STATE(14), 1,
      sym_block,
  [186] = 2,
    ACTIONS(59), 1,
      anon_sym_LBRACK,
    STATE(13), 1,
      sym_color,
  [193] = 2,
    ACTIONS(57), 1,
      anon_sym_LBRACK,
    STATE(11), 1,
      sym_block,
  [200] = 1,
    ACTIONS(61), 2,
      anon_sym_RBRACK,
      anon_sym_DOT,
  [205] = 2,
    ACTIONS(57), 1,
      anon_sym_LBRACK,
    STATE(19), 1,
      sym_block,
  [212] = 2,
    ACTIONS(63), 1,
      anon_sym_RBRACK,
    ACTIONS(65), 1,
      anon_sym_DOT,
  [219] = 2,
    ACTIONS(67), 1,
      anon_sym_LBRACK,
    STATE(9), 1,
      sym_line,
  [226] = 2,
    ACTIONS(69), 1,
      aux_sym_r_token1,
    STATE(34), 1,
      sym_r,
  [233] = 2,
    ACTIONS(57), 1,
      anon_sym_LBRACK,
    STATE(17), 1,
      sym_block,
  [240] = 2,
    ACTIONS(71), 1,
      aux_sym_r_token1,
    STATE(48), 1,
      sym_b,
  [247] = 2,
    ACTIONS(57), 1,
      anon_sym_LBRACK,
    STATE(18), 1,
      sym_block,
  [254] = 2,
    ACTIONS(57), 1,
      anon_sym_LBRACK,
    STATE(20), 1,
      sym_block,
  [261] = 2,
    ACTIONS(73), 1,
      aux_sym_r_token1,
    STATE(44), 1,
      sym_g,
  [268] = 2,
    ACTIONS(53), 1,
      aux_sym_x_token1,
    STATE(38), 1,
      sym_id,
  [275] = 2,
    ACTIONS(75), 1,
      aux_sym_x_token1,
    STATE(41), 1,
      sym_y,
  [282] = 1,
    ACTIONS(77), 1,
      anon_sym_COMMA,
  [286] = 1,
    ACTIONS(79), 1,
      anon_sym_COMMA,
  [290] = 1,
    ACTIONS(81), 1,
      anon_sym_RBRACK,
  [294] = 1,
    ACTIONS(83), 1,
      anon_sym_LBRACK,
  [298] = 1,
    ACTIONS(85), 1,
      anon_sym_RBRACK,
  [302] = 1,
    ACTIONS(87), 1,
      anon_sym_RBRACK,
  [306] = 1,
    ACTIONS(89), 1,
      ts_builtin_sym_end,
  [310] = 1,
    ACTIONS(91), 1,
      anon_sym_RBRACK,
  [314] = 1,
    ACTIONS(93), 1,
      anon_sym_RBRACK,
  [318] = 1,
    ACTIONS(95), 1,
      anon_sym_COMMA,
  [322] = 1,
    ACTIONS(97), 1,
      anon_sym_COMMA,
  [326] = 1,
    ACTIONS(99), 1,
      anon_sym_COMMA,
  [330] = 1,
    ACTIONS(101), 1,
      anon_sym_RBRACK,
  [334] = 1,
    ACTIONS(103), 1,
      anon_sym_COMMA,
  [338] = 1,
    ACTIONS(105), 1,
      anon_sym_RBRACK,
  [342] = 1,
    ACTIONS(107), 1,
      anon_sym_RBRACK,
  [346] = 1,
    ACTIONS(109), 1,
      anon_sym_RBRACK,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(2)] = 0,
  [SMALL_STATE(3)] = 27,
  [SMALL_STATE(4)] = 54,
  [SMALL_STATE(5)] = 63,
  [SMALL_STATE(6)] = 77,
  [SMALL_STATE(7)] = 85,
  [SMALL_STATE(8)] = 93,
  [SMALL_STATE(9)] = 101,
  [SMALL_STATE(10)] = 109,
  [SMALL_STATE(11)] = 117,
  [SMALL_STATE(12)] = 125,
  [SMALL_STATE(13)] = 133,
  [SMALL_STATE(14)] = 141,
  [SMALL_STATE(15)] = 149,
  [SMALL_STATE(16)] = 159,
  [SMALL_STATE(17)] = 169,
  [SMALL_STATE(18)] = 179,
  [SMALL_STATE(19)] = 186,
  [SMALL_STATE(20)] = 193,
  [SMALL_STATE(21)] = 200,
  [SMALL_STATE(22)] = 205,
  [SMALL_STATE(23)] = 212,
  [SMALL_STATE(24)] = 219,
  [SMALL_STATE(25)] = 226,
  [SMALL_STATE(26)] = 233,
  [SMALL_STATE(27)] = 240,
  [SMALL_STATE(28)] = 247,
  [SMALL_STATE(29)] = 254,
  [SMALL_STATE(30)] = 261,
  [SMALL_STATE(31)] = 268,
  [SMALL_STATE(32)] = 275,
  [SMALL_STATE(33)] = 282,
  [SMALL_STATE(34)] = 286,
  [SMALL_STATE(35)] = 290,
  [SMALL_STATE(36)] = 294,
  [SMALL_STATE(37)] = 298,
  [SMALL_STATE(38)] = 302,
  [SMALL_STATE(39)] = 306,
  [SMALL_STATE(40)] = 310,
  [SMALL_STATE(41)] = 314,
  [SMALL_STATE(42)] = 318,
  [SMALL_STATE(43)] = 322,
  [SMALL_STATE(44)] = 326,
  [SMALL_STATE(45)] = 330,
  [SMALL_STATE(46)] = 334,
  [SMALL_STATE(47)] = 338,
  [SMALL_STATE(48)] = 342,
  [SMALL_STATE(49)] = 346,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_program, 0),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(26),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [9] = {.entry = {.count = 1, .reusable = true}}, SHIFT(28),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(29),
  [13] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_program, 1),
  [15] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_program_repeat1, 2),
  [17] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_program_repeat1, 2), SHIFT_REPEAT(26),
  [20] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_program_repeat1, 2), SHIFT_REPEAT(22),
  [23] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_program_repeat1, 2), SHIFT_REPEAT(28),
  [26] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_program_repeat1, 2), SHIFT_REPEAT(29),
  [29] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_block, 3),
  [31] = {.entry = {.count = 1, .reusable = true}}, SHIFT(49),
  [33] = {.entry = {.count = 1, .reusable = true}}, SHIFT(46),
  [35] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_color, 7),
  [37] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_position, 5),
  [39] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_line, 3),
  [41] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_lcut_move, 4),
  [43] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_move, 1),
  [45] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_merge_move, 3),
  [47] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_pcut_move, 3),
  [49] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_color_move, 3),
  [51] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_swap_move, 3),
  [53] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
  [55] = {.entry = {.count = 1, .reusable = true}}, SHIFT(5),
  [57] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [59] = {.entry = {.count = 1, .reusable = true}}, SHIFT(25),
  [61] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_id, 1),
  [63] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_block_id, 1),
  [65] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [67] = {.entry = {.count = 1, .reusable = true}}, SHIFT(31),
  [69] = {.entry = {.count = 1, .reusable = true}}, SHIFT(33),
  [71] = {.entry = {.count = 1, .reusable = true}}, SHIFT(47),
  [73] = {.entry = {.count = 1, .reusable = true}}, SHIFT(43),
  [75] = {.entry = {.count = 1, .reusable = true}}, SHIFT(40),
  [77] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_r, 1),
  [79] = {.entry = {.count = 1, .reusable = true}}, SHIFT(30),
  [81] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_block_id, 3),
  [83] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_orientation, 3),
  [85] = {.entry = {.count = 1, .reusable = true}}, SHIFT(4),
  [87] = {.entry = {.count = 1, .reusable = true}}, SHIFT(8),
  [89] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [91] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_y, 1),
  [93] = {.entry = {.count = 1, .reusable = true}}, SHIFT(7),
  [95] = {.entry = {.count = 1, .reusable = true}}, SHIFT(32),
  [97] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_g, 1),
  [99] = {.entry = {.count = 1, .reusable = true}}, SHIFT(27),
  [101] = {.entry = {.count = 1, .reusable = true}}, SHIFT(36),
  [103] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_x, 1),
  [105] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_b, 1),
  [107] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [109] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_orientation_type, 1),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_minivinci(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
