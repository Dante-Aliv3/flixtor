#!/usr/bin/env python3

# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
# Author:       Ash Searle
# Date:         06Jun23
# Reason:       1.      keep uniform pattern when making commits to make search easier
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

##################
# libraries needed for script
##################
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

############
# Functions
############

# write new commit msg
# w+ won't get contents so had to split that out
########################
def reformatCommitMsg(initials, branch, content):
	####################
	with open(COMMIT_MSG_PATH, 'w+') as f:
		f.write("%s %s: %s" % (initials, branch, content))


#######
# MAIN
#######

if ENABLE_HOOK:
	ghp.printArguments("commit.py")
	branch_ = ghp.getBranch(DEBUG)
	author_ = ghp.getAuthor(DEBUG)
	initials_ = ghp.getInitials(author_, DEBUG)
	commitMsg = ghp.getCommitMsg(DEBUG)

	reformatCommitMsg(initials_, branch_, commitMsg)
else:
	print("commit.py: hook disabled")
