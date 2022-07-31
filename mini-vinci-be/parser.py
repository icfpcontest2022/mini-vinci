from ctypes.wintypes import LCTYPE
from tree_sitter import Language, Parser
import enum 

Language.build_library(
  # Store the library in the `build` directory
  'build/my-languages.so',

  # Include one or more languages
  [
    'tree-sitter-minivinci'
  ]
)

MV_LANGUAGE = Language('build/my-languages.so', 'minivinci')
parser = Parser()
parser.set_language(MV_LANGUAGE)

# class Instructions(enum.Enum):
# 	"""
# 	Enum for the different instructions
# 	"""
# 	LCUT_MOVE = 'lcut_move'
# 	PCUT_MOVE = 'pcut_move'
# 	COLOR_MOVE = 'color_move'
# 	SWAP_MOVE = 'swap_move'
# 	MERGE_MOVE = 'merge_move'

# 	def __str__(self):
# 		return self.name

# 	def __repr__(self):
# 		return self.name

class PCUT_MOVE():
	block = None
	pos_x = None
	pos_y = None

	def __init__(self, pcut_move):
		for spec in pcut_move:
			if spec.type == 'ERROR':
				raise Exception('error in pcut_move')
			elif spec.type == 'block':
				self.block = spec.children[1].text.decode('utf-8').split('.')
				if not self.block[0]:
					raise Exception('error in pcut_move: not specified block')
			elif spec.type == 'position':
				self.pos_x = spec.children[1].text.decode("utf-8")
				self.pos_y = spec.children[3].text.decode("utf-8")
				if not self.pos_x or not self.pos_y:
					raise Exception('error in pcut_move: not specified pos_x or pos_y')

class LCUT_MOVE():
	block = None
	orientation = None
	line = None

	def __init__(self, lcut_move):
		for spec in lcut_move:
			if spec.type == 'ERROR':
				raise Exception('error in lcut_move')
			elif spec.type == 'block':
				self.block = spec.children[1].text.decode('utf-8').split('.')
				if not self.block[0]:
					raise Exception('error in lcut_move: not specified block')
			elif spec.type == 'orientation':
				self.orientation = spec.children[1].text.decode("utf-8").lower()
				if not self.orientation:
					raise Exception('error in lcut_move: not specified orientation')
			elif spec.type == 'line':
				self.line = spec.children[1].text.decode("utf-8")
				if not self.line:
					raise Exception('error in lcut_move: not specified line')

class COLOR_MOVE():
	block = None
	color = None
	
	def __init__(self, color_move):
		for idx, spec in enumerate(color_move):
			if spec.type == 'ERROR':
				raise Exception('error in color_move')
			elif spec.type == 'block':
				self.block = spec.children[1].text.decode('utf-8').split('.')
				if not self.block[0]:
					raise Exception('error in color_move: not specified block')
			elif spec.type == 'color' and idx != 0:
				self.color = spec.text.decode("utf-8")[1:-1].split(',')

class SWAP_MOVE():
	firstBlock = None
	secondBlock = None

	def __init__(self, swap_move):
		for idx, spec in enumerate(swap_move):
			if spec.type == 'ERROR':
				raise Exception('error in swap_move')
			elif spec.type == 'block' and idx == 1:
				self.firstBlock = spec.children[1].text.decode('utf-8').split('.')
				if not self.firstBlock[0]:
					raise Exception('error in swap_move: not specified firstBlock')
			elif spec.type == 'block' and idx == 2:
				self.secondBlock = spec.children[1].text.decode('utf-8').split('.')
				if not self.secondBlock[0]:
					raise Exception('error in swap_move: not specified secondBlock')

class MERGE_MOVE():
	firstBlock = None
	secondBlock = None

	def __init__(self, merge_move):
		for idx, spec in enumerate(merge_move):
			if spec.type == 'ERROR':
				raise Exception('error in merge_move')
			elif spec.type == 'block' and idx == 1:
				self.firstBlock = spec.children[1].text.decode('utf-8').split('.')
				if not self.firstBlock[0]:
					raise Exception('error in merge_move: not specified firstBlock')
			elif spec.type == 'block' and idx == 2:
				self.secondBlock = spec.children[1].text.decode('utf-8').split('.')
				if not self.secondBlock[0]:
					raise Exception('error in merge_move: not specified secondBlock')


tree = parser.parse(bytes("""
cut [5] [2,3]
cut [16.2] [V] [999]
color [5.42.400] [32, 42, 52, 255]
swap [4.2.1] [1.2.4.8]
merge [82] [192.168.1.1]
""", "utf8"))

if tree.root_node.type != 'program':
	raise Exception('Expected root node to be a program')

# moves is a list of Move objects
moves = list()
program = tree.root_node.children

for move in program:
	if move.type != 'move':
		raise Exception('Expected to be a move')

	moveSpec = move.children[0]
	if moveSpec.type == 'pcut_move':
		pcut_move = moveSpec.children
		pcut_move = PCUT_MOVE(pcut_move)
		moves.append(pcut_move)
	elif moveSpec.type == 'lcut_move':
		lcut_move = moveSpec.children
		lcut_move = LCUT_MOVE(lcut_move)
		moves.append(lcut_move)
	elif moveSpec.type == 'color_move':
		color_move = moveSpec.children
		color_move = COLOR_MOVE(color_move)
		moves.append(color_move)
	elif moveSpec.type == 'swap_move':
		swap_move = moveSpec.children
		swap_move = SWAP_MOVE(swap_move)
		moves.append(swap_move)
	elif moveSpec.type == 'merge_move':
		merge_move = moveSpec.children
		merge_move = MERGE_MOVE(merge_move)
		moves.append(merge_move)
	else:
		raise Exception('Another move type encountered')

