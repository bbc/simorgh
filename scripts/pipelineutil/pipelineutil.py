from pygit2 import Repository, GIT_STATUS_INDEX_MODIFIED, GIT_STATUS_WT_MODIFIED, GIT_DELTA_ADDED


def is_doc(path):
  return path.endswith('.md')

def get_files(repo, ref):
  difference = repo.diff(ref)
  files = [patch.delta.new_file.path for patch in difference]
  return files

def test_files(files):
  for f in files:
    if not is_doc(f):
      return False

  return True


repo = Repository('.')
head = repo.head
print(head.shorthand)


files = get_files(repo, head)
print(files)

result = test_files(files)

print(result)

