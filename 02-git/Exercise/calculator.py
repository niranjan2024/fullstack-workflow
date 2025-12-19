def sum(a,b):
	return a+b
def sub(a,b):
	return a-b
def mult(a,b):
	return a*b
def div(a,b):
	if b==0:
		raise ValuError("cannot divide by zero")
	return a/b


