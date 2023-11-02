import sys, os

############
# Arguments
############
COMMIT_MSG_PATH = sys.argv[1] if len(sys.argv) >= 2 else ""
ACTION = sys.argv[2] if len(sys.argv) >= 3 else ""
COMMIT_MSG = sys.argv[3] if len(sys.argv) >= 4 else ""

############
# Variables
############
DEFAULT_REPLACEMENT_CHAR = '>'
DEFAULT_PRINT_ARG_PREFIX = '>'
DEFAULT_TEMP_FILE_PREFIX = "githooks_"

###################
# Global Functions
###################

###############################
def getCommitMsg(debug=False):
	###########################
	with open(COMMIT_MSG_PATH, 'r+') as f:
		rtn = f.read()
	if debug: print(f"getCommitMsg: \n{rtn}")
	return rtn

# you merged wrong, abort
###################
def abortMerge(debug=False):
	###############
	if debug: print("ABORTING MERGE")
	os.system("git reset --merge")
	sys.exit(1)
