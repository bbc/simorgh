from pygit2 import Repository
repo = Repository('.')

index = repo.diff
print(index)

print("Hello there")