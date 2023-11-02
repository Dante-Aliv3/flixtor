from .gitHooks import *
import tempfile, subprocess, os

# make tmp file to pass info roo other hooks
#####################################################################
def makeTempFile(msg, debug=False, prefix=DEFAULT_TEMP_FILE_PREFIX):
	#################################################################
	with tempfile.NamedTemporaryFile(delete=False, prefix=prefix) as tf:
		commitMsgInBytes = bytes(msg, encoding='utf-8')
		tf.write(commitMsgInBytes)
	tmpFilePath = tf.name
	if debug: print(f"makeTempFile: file path: {tmpFilePath}")
	return tmpFilePath

#######################################################################
# noinspection SpellCheckingInspection
def getTempFileContents(debug=False, prefix=DEFAULT_TEMP_FILE_PREFIX):
	###################################################################
	# set search command
	searchCommand = f"find /tmp -name '{prefix}*'"
	if debug: print(f"getTempFileContents: searchCommand: {searchCommand}")

	# Execute search command using subprocess and capture the output
	process = subprocess.Popen(searchCommand, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
	output, error = process.communicate()
	results = [output, error]

	# decode the output from bytes to string and split it into separate lines
	output = results[0].decode()
	error = results[1].decode()
	file_paths = output.strip().split('\n')
	errors = error.strip().split('\n')
	if debug: print(f"getTempFileContents: search results: \n{file_paths}")
	if debug: print(f"getTempFileContents: search errors: \n{errors}")

	# Check if any file paths were found
	matchingFilePaths = file_paths[0] if file_paths else False
	if debug: print(f"getTempFileContents: found temp files: \n{matchingFilePaths}")

	if matchingFilePaths:
		# Get conflicting files written in temp file
		with open(matchingFilePaths, 'r+') as f:
			tmpFilemsg = f.read()
		if debug: print(f"getTempFileContents: file contents: \n{tmpFilemsg}")

		# delete temp file
		os.remove(matchingFilePaths)
		if debug: print(f"getTempFileContents: delete temp file: {matchingFilePaths}")
		return tmpFilemsg
	else:
		return False
