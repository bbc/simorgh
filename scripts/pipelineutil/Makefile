venv:
	test -d venv || virtualenv --no-site-packages venv

activate: 
	source ./venv/bin/activate

install:
	pip3 install -r requirements.txt

mac-install:
	brew update
	brew install libgit2
	pip3 install -r requirements.txt

run:
	python pipelineutil.py