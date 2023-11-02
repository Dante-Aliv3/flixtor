from .gitHooks import *
import re
####################################
def setCommitMsg(msg, debug=False):
	################################
	with open(COMMIT_MSG_PATH, 'w+') as f:
		f.write(msg)
	if debug: print(f"setCommitMsg: new commit msg: \n{getCommitMsg()}")

#######################################
def appendCommitMsg(msg, debug=False):
	###################################
	with open(COMMIT_MSG_PATH, 'a') as f:
		f.write("%s" % msg)
	if debug: print(f"appendCommitMsg: new commit msg: \n{getCommitMsg()}")

# gitkraken doesnt register commented out lines in commit message
#####################################################################################
def replaceCommitMsgHashtags(debug=False, replacementChar=DEFAULT_REPLACEMENT_CHAR):
	#################################################################################
	if debug: print(f"replaceCommitMsgHashtags: commit msg prior replacing {replacementChar}: \n{getCommitMsg()}")
	newCommitMsg = getCommitMsg().replace("#", replacementChar)
	setCommitMsg(newCommitMsg)
	if debug: print(f"replaceCommitMsgHashtags: commit msg after replacing {replacementChar}: \n{getCommitMsg()}")

# parse commit message for merge from branch
#######################
def getSourceBranch(debug=False):
	###################
	findBranch = re.findall(r"'(.*?)'", getCommitMsg())
	rtn = findBranch[0]
	if debug: print(f"getSourceBranch: {rtn}")
	return rtn

#################################
def updateMergeToMasterCommit(sourceBranch, debug=False):
	#############################
	originalCommitMsg = getCommitMsg()
	if debug: print(f"updateMergeToMasterCommit: original commit msg:\n{originalCommitMsg}")
	setCommitMsg(f"Merge branch '{sourceBranch}' into LIVE\n\n")
	if debug: print(f"updateMergeToMasterCommit: modified commit summary:\n{getCommitMsg()}")
	originalCommitMsgMinusSummary = originalCommitMsg.split("\n", 2)[2]
	appendCommitMsg(originalCommitMsgMinusSummary)
	if debug: print(f"updateMergeToMasterCommit: appending rest of msg (if any):\n{getCommitMsg()}")
