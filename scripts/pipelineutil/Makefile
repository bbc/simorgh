venv:
	test -d venv || virtualenv --no-site-packages venv

activate: 
	./venv/bin/activate

mac-install:
	brew update
	brew install libgit2
	pip3 install -r requirements.txt

run:
	python pipelineutil.py