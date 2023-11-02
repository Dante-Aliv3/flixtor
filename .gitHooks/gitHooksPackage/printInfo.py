from .gitHooks import *
from subprocess import check_output

#####################################################
def printArguments(prefix=DEFAULT_PRINT_ARG_PREFIX):
	#################################################
	print(f"\n{prefix}: print arguments:")
	count = 0
	for x in sys.argv:
		tempCount = str(count)
		print("\t" + tempCount + ".) " + x)
		count = count + 1
	print("\n")

################
def getBranch(debug=False):
	############
	branch = check_output(['git', 'symbolic-ref', '--short', 'HEAD']).strip().decode("utf-8")
	if debug: print(f"getBranch: {branch}")
	return branch

# get author name and print it
################
def getAuthor(debug=False):
	############
	author = check_output(['git', 'config', '--global', '--get', 'user.name']).strip().decode("utf-8")
	if debug: print(f"getAuthor: {author}")
	return author

# get initials from author name and print it
#########################
def getInitials(author, debug=False):
	#####################
	author_ = ""
	for letter in author.split():
		author_ = author_ + letter[0]
	if debug: print(f"getInitials: {author_}")
	return author_
