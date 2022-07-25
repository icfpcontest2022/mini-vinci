#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 13
#define STATE_COUNT 46
#define LARGE_STATE_COUNT 2
#define SYMBOL_COUNT 33
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
  anon_sym_join = 4,
  anon_sym_h = 5,
  anon_sym_v = 6,
  anon_sym_LBRACK = 7,
  anon_sym_RBRACK = 8,
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
  sym_join_move = 19,
  sym_orientation = 20,
  sym_block = 21,
  sym_position = 22,
  sym_color = 23,
  sym_block_id = 24,
  sym_x = 25,
  sym_y = 26,
  sym_id = 27,
  sym_line = 28,
  sym_r = 29,
  sym_g = 30,
  sym_b = 31,
  aux_sym_program_repeat1 = 32,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [anon_sym_cut] = "cut",
  [anon_sym_color] = "color",
  [anon_sym_swap] = "swap",
  [anon_sym_join] = "join",
  [anon_sym_h] = "h",
  [anon_sym_v] = "v",
  [anon_sym_LBRACK] = "[",
  [anon_sym_RBRACK] = "]",
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
  [sym_join_move] = "join_move",
  [sym_orientation] = "orientation",
  [sym_block] = "block",
  [sym_position] = "position",
  [sym_color] = "color",
  [sym_block_id] = "block_id",
  [sym_x] = "x",
  [sym_y] = "y",
  [sym_id] = "id",
  [sym_line] = "line",
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
  [anon_sym_join] = anon_sym_join,
  [anon_sym_h] = anon_sym_h,
  [anon_sym_v] = anon_sym_v,
  [anon_sym_LBRACK] = anon_sym_LBRACK,
  [anon_sym_RBRACK] = anon_sym_RBRACK,
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
  [sym_join_move] = sym_join_move,
  [sym_orientation] = sym_orientation,
  [sym_block] = sym_block,
  [sym_position] = sym_position,
  [sym_color] = sym_color,
  [sym_block_id] = sym_block_id,
  [sym_x] = sym_x,
  [sym_y] = sym_y,
  [sym_id] = sym_id,
  [sym_line] = sym_line,
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
  [anon_sym_join] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_h] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_v] = {
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
  [sym_join_move] = {
    .visible = true,
    .named = true,
  },
  [sym_orientation] = {
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
  [sym_line] = {
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
      if (eof) ADVANCE(14);
      if (lookahead == ',') ADVANCE(23);
      if (lookahead == '.') ADVANCE(24);
      if (lookahead == '0') ADVANCE(27);
      if (lookahead == '1') ADVANCE(27);
      if (lookahead == '2') ADVANCE(25);
      if (lookahead == '[') ADVANCE(21);
      if (lookahead == ']') ADVANCE(22);
      if (lookahead == 'c') ADVANCE(6);
      if (lookahead == 'h') ADVANCE(19);
      if (lookahead == 'j') ADVANCE(7);
      if (lookahead == 's') ADVANCE(12);
      if (lookahead == 'v') ADVANCE(20);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      if (('3' <= lookahead && lookahead <= '9')) ADVANCE(27);
      END_STATE();
    case 1:
      if (lookahead == '0') ADVANCE(28);
      if (lookahead == '1') ADVANCE(32);
      if (lookahead == '2') ADVANCE(29);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(1)
      if (('3' <= lookahead && lookahead <= '9')) ADVANCE(31);
      END_STATE();
    case 2:
      if (lookahead == 'a') ADVANCE(9);
      END_STATE();
    case 3:
      if (lookahead == 'i') ADVANCE(5);
      END_STATE();
    case 4:
      if (lookahead == 'l') ADVANCE(8);
      END_STATE();
    case 5:
      if (lookahead == 'n') ADVANCE(18);
      END_STATE();
    case 6:
      if (lookahead == 'o') ADVANCE(4);
      if (lookahead == 'u') ADVANCE(11);
      END_STATE();
    case 7:
      if (lookahead == 'o') ADVANCE(3);
      END_STATE();
    case 8:
      if (lookahead == 'o') ADVANCE(10);
      END_STATE();
    case 9:
      if (lookahead == 'p') ADVANCE(17);
      END_STATE();
    case 10:
      if (lookahead == 'r') ADVANCE(16);
      END_STATE();
    case 11:
      if (lookahead == 't') ADVANCE(15);
      END_STATE();
    case 12:
      if (lookahead == 'w') ADVANCE(2);
      END_STATE();
    case 13:
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(13)
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(27);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(anon_sym_cut);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(anon_sym_color);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(anon_sym_swap);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(anon_sym_join);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(anon_sym_h);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(anon_sym_v);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(anon_sym_LBRACK);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(anon_sym_RBRACK);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(anon_sym_COMMA);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(anon_sym_DOT);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(aux_sym_x_token1);
      if (lookahead == '5') ADVANCE(26);
      if (('6' <= lookahead && lookahead <= '9')) ADVANCE(27);
      if (('0' <= lookahead && lookahead <= '4')) ADVANCE(27);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(aux_sym_x_token1);
      if (('6' <= lookahead && lookahead <= '9')) ADVANCE(27);
      if (('0' <= lookahead && lookahead <= '5')) ADVANCE(27);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(aux_sym_x_token1);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(27);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(aux_sym_r_token1);
      END_STATE();
    case 29:
      ACCEPT_TOKEN(aux_sym_r_token1);
      if (lookahead == '5') ADVANCE(30);
      if (('6' <= lookahead && lookahead <= '9')) ADVANCE(28);
      if (('0' <= lookahead && lookahead <= '4')) ADVANCE(31);
      END_STATE();
    case 30:
      ACCEPT_TOKEN(aux_sym_r_token1);
      if (('0' <= lookahead && lookahead <= '5')) ADVANCE(28);
      END_STATE();
    case 31:
      ACCEPT_TOKEN(aux_sym_r_token1);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(28);
      END_STATE();
    case 32:
      ACCEPT_TOKEN(aux_sym_r_token1);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(31);
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
  [5] = {.lex_state = 0},
  [6] = {.lex_state = 0},
  [7] = {.lex_state = 0},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 0},
  [10] = {.lex_state = 0},
  [11] = {.lex_state = 0},
  [12] = {.lex_state = 0},
  [13] = {.lex_state = 0},
  [14] = {.lex_state = 0},
  [15] = {.lex_state = 13},
  [16] = {.lex_state = 13},
  [17] = {.lex_state = 1},
  [18] = {.lex_state = 0},
  [19] = {.lex_state = 0},
  [20] = {.lex_state = 0},
  [21] = {.lex_state = 1},
  [22] = {.lex_state = 13},
  [23] = {.lex_state = 13},
  [24] = {.lex_state = 0},
  [25] = {.lex_state = 0},
  [26] = {.lex_state = 0},
  [27] = {.lex_state = 0},
  [28] = {.lex_state = 0},
  [29] = {.lex_state = 1},
  [30] = {.lex_state = 13},
  [31] = {.lex_state = 0},
  [32] = {.lex_state = 0},
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
  [45] = {.lex_state = 13},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [anon_sym_cut] = ACTIONS(1),
    [anon_sym_color] = ACTIONS(1),
    [anon_sym_swap] = ACTIONS(1),
    [anon_sym_join] = ACTIONS(1),
    [anon_sym_h] = ACTIONS(1),
    [anon_sym_v] = ACTIONS(1),
    [anon_sym_LBRACK] = ACTIONS(1),
    [anon_sym_RBRACK] = ACTIONS(1),
    [anon_sym_COMMA] = ACTIONS(1),
    [anon_sym_DOT] = ACTIONS(1),
    [aux_sym_x_token1] = ACTIONS(1),
    [aux_sym_r_token1] = ACTIONS(1),
  },
  [1] = {
    [sym_program] = STATE(36),
    [sym_move] = STATE(2),
    [sym_pcut_move] = STATE(10),
    [sym_lcut_move] = STATE(10),
    [sym_color_move] = STATE(10),
    [sym_swap_move] = STATE(10),
    [sym_join_move] = STATE(10),
    [aux_sym_program_repeat1] = STATE(2),
    [ts_builtin_sym_end] = ACTIONS(3),
    [anon_sym_cut] = ACTIONS(5),
    [anon_sym_color] = ACTIONS(7),
    [anon_sym_swap] = ACTIONS(9),
    [anon_sym_join] = ACTIONS(11),
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
      anon_sym_join,
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
      sym_join_move,
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
      anon_sym_join,
    STATE(3), 2,
      sym_move,
      aux_sym_program_repeat1,
    STATE(10), 5,
      sym_pcut_move,
      sym_lcut_move,
      sym_color_move,
      sym_swap_move,
      sym_join_move,
  [54] = 1,
    ACTIONS(29), 8,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_join,
      anon_sym_h,
      anon_sym_v,
      anon_sym_LBRACK,
  [65] = 1,
    ACTIONS(31), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_join,
  [73] = 1,
    ACTIONS(33), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_join,
  [81] = 1,
    ACTIONS(35), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_join,
  [89] = 1,
    ACTIONS(37), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_join,
  [97] = 1,
    ACTIONS(39), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_join,
  [105] = 1,
    ACTIONS(41), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_join,
  [113] = 4,
    ACTIONS(45), 1,
      anon_sym_LBRACK,
    STATE(14), 1,
      sym_position,
    STATE(23), 1,
      sym_orientation,
    ACTIONS(43), 2,
      anon_sym_h,
      anon_sym_v,
  [127] = 1,
    ACTIONS(47), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_join,
  [135] = 1,
    ACTIONS(49), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_join,
  [143] = 1,
    ACTIONS(51), 5,
      ts_builtin_sym_end,
      anon_sym_cut,
      anon_sym_color,
      anon_sym_swap,
      anon_sym_join,
  [151] = 3,
    ACTIONS(53), 1,
      aux_sym_x_token1,
    STATE(20), 1,
      sym_id,
    STATE(34), 1,
      sym_block_id,
  [161] = 3,
    ACTIONS(53), 1,
      aux_sym_x_token1,
    STATE(20), 1,
      sym_id,
    STATE(35), 1,
      sym_block_id,
  [171] = 2,
    ACTIONS(55), 1,
      aux_sym_r_token1,
    STATE(33), 1,
      sym_r,
  [178] = 1,
    ACTIONS(57), 2,
      anon_sym_RBRACK,
      anon_sym_DOT,
  [183] = 2,
    ACTIONS(59), 1,
      anon_sym_LBRACK,
    STATE(27), 1,
      sym_block,
  [190] = 2,
    ACTIONS(61), 1,
      anon_sym_RBRACK,
    ACTIONS(63), 1,
      anon_sym_DOT,
  [197] = 2,
    ACTIONS(65), 1,
      aux_sym_r_token1,
    STATE(44), 1,
      sym_b,
  [204] = 2,
    ACTIONS(67), 1,
      aux_sym_x_token1,
    STATE(41), 1,
      sym_x,
  [211] = 2,
    ACTIONS(69), 1,
      aux_sym_x_token1,
    STATE(8), 1,
      sym_line,
  [218] = 2,
    ACTIONS(59), 1,
      anon_sym_LBRACK,
    STATE(11), 1,
      sym_block,
  [225] = 2,
    ACTIONS(59), 1,
      anon_sym_LBRACK,
    STATE(12), 1,
      sym_block,
  [232] = 2,
    ACTIONS(59), 1,
      anon_sym_LBRACK,
    STATE(13), 1,
      sym_block,
  [239] = 2,
    ACTIONS(71), 1,
      anon_sym_LBRACK,
    STATE(5), 1,
      sym_color,
  [246] = 2,
    ACTIONS(59), 1,
      anon_sym_LBRACK,
    STATE(26), 1,
      sym_block,
  [253] = 2,
    ACTIONS(73), 1,
      aux_sym_r_token1,
    STATE(40), 1,
      sym_g,
  [260] = 2,
    ACTIONS(75), 1,
      aux_sym_x_token1,
    STATE(38), 1,
      sym_y,
  [267] = 2,
    ACTIONS(59), 1,
      anon_sym_LBRACK,
    STATE(25), 1,
      sym_block,
  [274] = 1,
    ACTIONS(77), 1,
      anon_sym_COMMA,
  [278] = 1,
    ACTIONS(79), 1,
      anon_sym_COMMA,
  [282] = 1,
    ACTIONS(81), 1,
      anon_sym_RBRACK,
  [286] = 1,
    ACTIONS(83), 1,
      anon_sym_RBRACK,
  [290] = 1,
    ACTIONS(85), 1,
      ts_builtin_sym_end,
  [294] = 1,
    ACTIONS(87), 1,
      anon_sym_RBRACK,
  [298] = 1,
    ACTIONS(89), 1,
      anon_sym_RBRACK,
  [302] = 1,
    ACTIONS(91), 1,
      anon_sym_COMMA,
  [306] = 1,
    ACTIONS(93), 1,
      anon_sym_COMMA,
  [310] = 1,
    ACTIONS(95), 1,
      anon_sym_COMMA,
  [314] = 1,
    ACTIONS(97), 1,
      anon_sym_COMMA,
  [318] = 1,
    ACTIONS(99), 1,
      anon_sym_RBRACK,
  [322] = 1,
    ACTIONS(101), 1,
      anon_sym_RBRACK,
  [326] = 1,
    ACTIONS(103), 1,
      aux_sym_x_token1,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(2)] = 0,
  [SMALL_STATE(3)] = 27,
  [SMALL_STATE(4)] = 54,
  [SMALL_STATE(5)] = 65,
  [SMALL_STATE(6)] = 73,
  [SMALL_STATE(7)] = 81,
  [SMALL_STATE(8)] = 89,
  [SMALL_STATE(9)] = 97,
  [SMALL_STATE(10)] = 105,
  [SMALL_STATE(11)] = 113,
  [SMALL_STATE(12)] = 127,
  [SMALL_STATE(13)] = 135,
  [SMALL_STATE(14)] = 143,
  [SMALL_STATE(15)] = 151,
  [SMALL_STATE(16)] = 161,
  [SMALL_STATE(17)] = 171,
  [SMALL_STATE(18)] = 178,
  [SMALL_STATE(19)] = 183,
  [SMALL_STATE(20)] = 190,
  [SMALL_STATE(21)] = 197,
  [SMALL_STATE(22)] = 204,
  [SMALL_STATE(23)] = 211,
  [SMALL_STATE(24)] = 218,
  [SMALL_STATE(25)] = 225,
  [SMALL_STATE(26)] = 232,
  [SMALL_STATE(27)] = 239,
  [SMALL_STATE(28)] = 246,
  [SMALL_STATE(29)] = 253,
  [SMALL_STATE(30)] = 260,
  [SMALL_STATE(31)] = 267,
  [SMALL_STATE(32)] = 274,
  [SMALL_STATE(33)] = 278,
  [SMALL_STATE(34)] = 282,
  [SMALL_STATE(35)] = 286,
  [SMALL_STATE(36)] = 290,
  [SMALL_STATE(37)] = 294,
  [SMALL_STATE(38)] = 298,
  [SMALL_STATE(39)] = 302,
  [SMALL_STATE(40)] = 306,
  [SMALL_STATE(41)] = 310,
  [SMALL_STATE(42)] = 314,
  [SMALL_STATE(43)] = 318,
  [SMALL_STATE(44)] = 322,
  [SMALL_STATE(45)] = 326,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_program, 0),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(24),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [9] = {.entry = {.count = 1, .reusable = true}}, SHIFT(28),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(31),
  [13] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_program, 1),
  [15] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_program_repeat1, 2),
  [17] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_program_repeat1, 2), SHIFT_REPEAT(24),
  [20] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_program_repeat1, 2), SHIFT_REPEAT(19),
  [23] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_program_repeat1, 2), SHIFT_REPEAT(28),
  [26] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_program_repeat1, 2), SHIFT_REPEAT(31),
  [29] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_block, 3),
  [31] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_color_move, 3),
  [33] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_color, 7),
  [35] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_position, 5),
  [37] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_lcut_move, 4),
  [39] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_line, 1),
  [41] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_move, 1),
  [43] = {.entry = {.count = 1, .reusable = true}}, SHIFT(45),
  [45] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [47] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_join_move, 3),
  [49] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_swap_move, 3),
  [51] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_pcut_move, 3),
  [53] = {.entry = {.count = 1, .reusable = true}}, SHIFT(18),
  [55] = {.entry = {.count = 1, .reusable = true}}, SHIFT(32),
  [57] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_id, 1),
  [59] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [61] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_block_id, 1),
  [63] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [65] = {.entry = {.count = 1, .reusable = true}}, SHIFT(43),
  [67] = {.entry = {.count = 1, .reusable = true}}, SHIFT(42),
  [69] = {.entry = {.count = 1, .reusable = true}}, SHIFT(9),
  [71] = {.entry = {.count = 1, .reusable = true}}, SHIFT(17),
  [73] = {.entry = {.count = 1, .reusable = true}}, SHIFT(39),
  [75] = {.entry = {.count = 1, .reusable = true}}, SHIFT(37),
  [77] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_r, 1),
  [79] = {.entry = {.count = 1, .reusable = true}}, SHIFT(29),
  [81] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_block_id, 3),
  [83] = {.entry = {.count = 1, .reusable = true}}, SHIFT(4),
  [85] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [87] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_y, 1),
  [89] = {.entry = {.count = 1, .reusable = true}}, SHIFT(7),
  [91] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_g, 1),
  [93] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
  [95] = {.entry = {.count = 1, .reusable = true}}, SHIFT(30),
  [97] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_x, 1),
  [99] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_b, 1),
  [101] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [103] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_orientation, 1),
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
