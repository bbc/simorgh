import fire
from pygit2 import Repository, GIT_STATUS_INDEX_MODIFIED, GIT_STATUS_WT_MODIFIED, GIT_DELTA_ADDED

def is_doc(path):
  return path.endswith('.md')

def get_files(repo, ref):
  difference = repo.diff(ref)
  files = [patch.delta.new_file.path for patch in difference]
  files.remove(".env")
  return files

def print_files(files):
  print('-----------------------------------')
  print('FILES CHANGED')
  print('-----------------------------------')
  
  for f in files:
    print(f)

  print('-----------------------------------')

def test_files(files):
  for f in files:
    if not is_doc(f):
      return False

  return True

def log_start():
  print("doc-change")
  print("This script will check for changes in the current git repository")
  print("I will check if you only changed markdown files (.md)")

def log_result(outcome):
  if outcome:
    print("Only markdown files have been changed")
    print("No need to run any tests")
  else:
    print("Files other than markdown were changed")
    print("Tests are necessary")


class Doc:
  def doc_change(self):
    log_start()
    repo = Repository('.')
    head = repo.head
    print("Branch: %s" % head.shorthand)


    files = get_files(repo, head)
    print_files(files)

    result = test_files(files)

    log_result(result)

    print("Outcome: %s" % result)
    return result

if __name__ == '__main__':
  fire.Fire(Doc)
