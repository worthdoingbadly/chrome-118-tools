import json
import sys
with open(sys.argv[1]) as infile:
    indata = infile.read().split("\n")

outdata = {}
current_function = None
for line in indata:
    if line.startswith("0"):
        current_function = line[line.find(" <") + 2: line.find(">:")]
        outdata[current_function] = []
    elif ":" in line and current_function:
        outdata[current_function].append("0x" + line.split()[1])
for i in outdata:
    print("[{}],".format(", ".join(outdata[i])))
    #print("\"{}\": [{}],".format(i, ", ".join(outdata[i])))
