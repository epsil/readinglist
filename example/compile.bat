@echo off
pandoc -S --template html.template -f markdown -t html -s example.md -o example.html
