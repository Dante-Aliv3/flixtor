#!/usr/bin/env python3

# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
# Author:		Ash Searle
# Date:			 03Mar22
# Updated:	  12Jun23
# Reason:		1.	prevent devs from merging test/pre into master
#					 2.	update merge live commits
#					 3. append merge conflict files to commit description
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

##############################
# libraries needed for script
##############################
import gitHooksPackage as ghp

############
# Arguments
############
COMMIT_MSG_PATH = ghp.COMMIT_MSG_PATH
ACTION = ghp.ACTION
COMMIT_MSG = ghp.COMMIT_MSG

############
# Variables
############
DEBUG = 1
ENABLE_HOOK = 1
# list of branches that cant be merged into master
FORBIDDEN_BRANCHES = ["test", "preview", "LIVE"]
abortMerge = False

############
# Functions
############

# prevent merging FORBIDDEN_BRANCHES into master or branch
#############################
def branchClearedForMerge(debug=False):
	#########################
	for badBranch in FORBIDDEN_BRANCHES:
		mergeBadBranchIntoBranch = True if "'"+badBranch+"' into" in COMMIT_MSG else False
		if mergeBadBranchIntoBranch:
			if debug: print("branchClearedForMerge: FALSE")
			return False
	if debug: print("branchClearedForMerge: TRUE")
	return True


####################
# MAIN
####################
if ENABLE_HOOK:
	ghp.printArguments("merge.py")
	ghp.isMergeConflict(DEBUG)
	is_merging_into_master = ghp.isMergingIntoMaster(DEBUG)
	get_source_branch = ghp.getSourceBranch(DEBUG)
	branch_cleared_for_merge = branchClearedForMerge(DEBUG)

	if is_merging_into_master:
		ghp.updateMergeToMasterCommit(get_source_branch, DEBUG)

	if ghp.isMergeConflict():
		ghp.replaceCommitMsgHashtags(DEBUG)
		#ghp.makeTempFile(ghp.getCommitMsg(), True)

	if not branch_cleared_for_merge:
		ghp.abortMerge(DEBUG)
else:
	print("merge.py: hook disabled")
