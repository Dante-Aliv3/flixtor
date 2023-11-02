from .gitHooks import *

# is git action a commit or merge?
##########################
def isMerge(debug=False):
	######################
	rtn = True if ACTION.split('/')[-1] == "merge" else False
	if debug: print(f"isMerge: {rtn}")
	return rtn

###########################
def isCommit(debug=False):
	#######################
	rtn = True if ACTION.split('/')[-1] == "message" else False
	if debug: print(f"isCommit: {rtn}")
	return rtn

# see if there is a merge conflict in commit message
##################################
def isMergeConflict(debug=False):
	##############################
	rtn = True if "Conflicts" in getCommitMsg() else False
	if debug: print(f"isMergeConflict: {rtn}")
	return rtn

######################################
def isMergingIntoMaster(debug=False):
	##################################
	rtn = True if "into" not in getCommitMsg() else False
	if debug: print(f"isMergingIntoMaster: {rtn}")
	return rtn
